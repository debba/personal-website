import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {AxeBuilder} from '@axe-core/playwright';

const base = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const browser = await chromium.launch({headless: true, ...(process.env.CHROMIUM_PATH ? {executablePath: process.env.CHROMIUM_PATH} : {})});
try {
    for (const locale of ['it', 'en']) {
        const context = await browser.newContext();
        // Make the timestamp stale without waiting days; the fixture is still newer than the build.
        const updatedAt = new Date(Date.now() + 60_000).toISOString();
        await context.addInitScript(now => {Date.now = () => now;}, Date.now() + 2 * 24 * 60 * 60_000);
        let fail = false;
        const fixture = {version: 1, updatedAt, projects: [{
            repository: 'debba/cache-refresh-test', name: 'Fresh activity', updatedAt,
            summary: {it: 'Attività aggiornata senza rigenerare la home.', en: 'Activity refreshed independently of the home page.'},
        }]};
        await context.route('**/api/github-activity', route => route.fulfill({
            status: fail ? 503 : 200, contentType: 'application/json', body: JSON.stringify(fail ? {error: 'Unavailable'} : fixture),
        }));
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${base}/${locale === 'it' ? 'it/' : ''}`);
        const tile = page.locator('section[aria-labelledby="github-activity-title"]');
        await tile.getByText(fixture.projects[0].summary[locale], {exact: true}).waitFor();
        fail = true;
        await Promise.all([
            page.waitForResponse(response => response.url().endsWith('/api/github-activity') && response.status() === 503),
            page.evaluate(() => document.dispatchEvent(new Event('visibilitychange'))),
        ]);
        await tile.getByRole('status').waitFor();
        assert.equal(await tile.getByText(fixture.projects[0].summary[locale], {exact: true}).count(), 1, 'Transient failure discards last successful feed');
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => Promise.all(document.getAnimations()
            .filter(animation => animation.effect?.getTiming().iterations !== Infinity)
            .map(animation => animation.finished.catch(() => undefined))));
        const audit = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        assert.deepEqual(audit.violations.map(v => ({id: v.id, nodes: v.nodes.map(n => ({target:n.target, summary:n.failureSummary}))})), [], 'Stale activity must remain accessible');
        // Recovery replaces the content and clears the stale warning.
        fail = false;
        fixture.updatedAt = new Date(Date.now() + 2 * 24 * 60 * 60_000).toISOString();
        fixture.projects[0].summary[locale] = locale === 'it' ? 'Aggiornamento ripristinato.' : 'Updates recovered.';
        await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
        await tile.getByText(fixture.projects[0].summary[locale], {exact: true}).waitFor();
        assert.equal(await tile.getByRole('status').count(), 0);
        assert.deepEqual(errors, []);
        await context.close();
        console.log(`OK live activity refresh, stale preservation and recovery: ${locale}`);
    }
    const context = await browser.newContext();
    const response = await context.request.post(`${base}/api/github-activity`);
    assert.equal(response.status(), 405);
    assert.equal(response.headers().allow, 'GET');
    await context.close();
} finally {
    await browser.close();
}
