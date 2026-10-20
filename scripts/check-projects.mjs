import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import assert from 'node:assert/strict';
// Run against a running site. CHROMIUM_PATH optionally selects a system browser.
const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
let checked = 0;
for (const width of [320, 1280])
    for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({ viewport: { width, height: 900 } });
        await context.addInitScript(t => localStorage.setItem('debbaweb.theme', t), theme);
        for (const route of ['/it/projects/', '/it/projects/tabularis/', '/en/projects/melicum/', '/it/projects/gitdeck/']) {
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', e => errors.push(e.message));
            const res = await page.goto(BASE_URL + route, { waitUntil: 'load' });
            assert.equal(res.status(), 200);
            await page.evaluate(() => document.fonts.ready);
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow ${route} ${width}`);
            const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
            assert.deepEqual(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${route} ${width} ${theme}`);
            assert.ok(await page.locator('video').count() <= 1, 'At most one video per project');
            for (const video of await page.locator('video').all()) {
                assert.equal(await video.getAttribute('preload'), 'none');
                assert.equal(await video.getAttribute('autoplay'), null);
            }
            if (route.includes('tabularis')) {
                assert.equal(await page.locator('#project-gallery-title + p + div figure').first().locator('source').getAttribute('src'), '/media/projects/tabularis/overview.mp4');
                const thumb = page.getByRole('button', { name: /Ingrandisci immagine/ }).first();
                await thumb.click();
                // The command palette adds a second, closed dialog to every page.
                const dialog = page.locator('dialog:not([data-command-palette])');
                assert.equal(await dialog.evaluate(d => d.open), true);
                await page.keyboard.press('ArrowRight');
                await page.getByText('2 / 4', { exact: true }).waitFor();
                await page.keyboard.press('ArrowLeft');
                await page.getByText('1 / 4', { exact: true }).waitFor();
                await page.getByRole('link', { name: /Apri immagine originale/ }).waitFor();
                // Native dialogs allow the browser chrome, but keep background page controls inert.
                for (let i = 0; i < 8; i++) {
                    await page.keyboard.press('Tab');
                    assert.equal(await dialog.evaluate(d => !document.hasFocus() || d.contains(document.activeElement)), true, 'Focus escapes modal');
                }
                const modalAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
                assert.deepEqual(modalAxe.violations.map(v => v.id), []);
                await page.keyboard.press('Escape');
                assert.equal(await dialog.evaluate(d => d.open), false);
                assert.equal(await thumb.evaluate(b => document.activeElement === b), true, 'Focus not restored');
                const video = page.locator('video').first();
                await video.evaluate(async (v) => { await v.play(); v.pause(); });
                assert.ok(await video.evaluate(v => v.duration > 0 && v.videoWidth > 0));
            }
            assert.deepEqual(errors, []);
            checked++;
            console.log(`OK ${route} ${width} ${theme}`);
            await page.close();
        }
        await context.close();
    }
// Check every listed project in both languages, including documentation fallbacks.
const context = await browser.newContext({ viewport: { width: 320, height: 720 }, reducedMotion: 'reduce' });
for (const locale of ['it', 'en']) {
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/${locale}/projects/`);
    const cards = page.locator('ul.bento > li');
    const routes = [];
    for (const card of await cards.all()) {
        assert.equal(await card.locator('[role=group] a').count(), 2, 'Every card has GitHub and website/documentation links');
        routes.push(await card.locator('a').first().getAttribute('href'));
    }
    for (const route of routes) {
        await page.goto(BASE_URL + route);
        assert.equal(await page.locator('article [role=group] a').count(), 2, `Missing links: ${route}`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow: ${route}`);
        assert.ok(await page.locator('video').count() <= 1);
        for (const image of await page.locator('[aria-labelledby="project-gallery-title"] figure img').all()) {
            await image.scrollIntoViewIfNeeded();
            await image.evaluate(image => image.decode());
            assert.ok(await image.evaluate(image => image.naturalWidth > 0), `Broken screenshot: ${route}`);
        }

        for (const video of await page.locator('video').all()) {
            assert.equal(await video.evaluate(v => v.paused && !v.autoplay && v.controls && v.preload === 'none'), true);
            // Validate media decoding separately from automatic loading.
            await video.evaluate(async (v) => { await v.play(); v.pause(); });
            assert.ok(await video.evaluate(v => v.videoWidth > 0 && v.duration > 0));
        }
    }
    await page.close();
}
// A short landscape viewport and 200% text stress the dialog and reflow.
const page = await context.newPage();
await page.setViewportSize({ width: 667, height: 375 });
await page.goto(`${BASE_URL}/it/projects/tabularis/`);
await page.getByRole('button', { name: /Ingrandisci immagine/ }).first().click();
const bounds = await page.locator('dialog:not([data-command-palette])').boundingBox();
assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 375, 'Dialog exceeds landscape viewport');
await page.keyboard.press('Escape');
await page.setViewportSize({ width: 320, height: 720 });
await page.addStyleTag({ content: 'html {font-size:200% !important}' });
assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Overflow at 200% text');
await page.close();
await context.close();
await browser.close();
console.log(`${checked} layout/accessibility checks passed, gallery keyboard navigation and overview video playback verified.`);
