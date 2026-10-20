// Accessibility check: runs axe-core (WCAG 2.2 AA rules) against the public routes
// in light and dark themes, at desktop and 320px mobile widths.
// Usage: start the site (`pnpm build && pnpm start`), then `pnpm test:a11y`.
// BASE_URL overrides the target (default http://localhost:3000).
//
// Automated checks supplement manual keyboard, zoom and screen reader testing; they don't replace it.

import {chromium} from "playwright";
import {AxeBuilder} from "@axe-core/playwright";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const THEME_STORAGE_KEY = "debbaweb.theme";

const ROUTES = [
    "/",
    "/en/",
    "/projects/",
    "/en/projects/",
    "/about/",
    "/en/about/",
    "/contacts/",
    "/en/contacts/",
    "/projects/gitdeck/",
    "/en/projects/gitdeck/",
    "/projects/free-my-arch/",
    "/this-page-does-not-exist/",
];
const THEMES = ["light", "dark"];
const VIEWPORTS = [
    {name: "desktop", width: 1280, height: 900},
    {name: "mobile", width: 320, height: 720},
];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const browser = await chromium.launch();
let failures = 0;

for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
        const context = await browser.newContext({viewport: {width: viewport.width, height: viewport.height}});
        await context.addInitScript(([key, value]) => {
            try {
                localStorage.setItem(key, value);
            } catch {
                // Ignore: the page falls back to the device theme.
            }
        }, [THEME_STORAGE_KEY, theme]);

        for (const route of ROUTES) {
            const page = await context.newPage();
            const label = `${route} [${theme}, ${viewport.name}]`;
            // Third-party embeds keep the network busy, so wait for load and fonts instead of network idle.
            const response = await page.goto(BASE_URL + route, {waitUntil: "load"});
            await page.evaluate(() => document.fonts.ready);
            // Let entrance animations finish so contrast is checked on the final colors.
            await page.evaluate(() => Promise.all(document.getAnimations()
                .filter(animation => animation.effect?.getTiming().iterations !== Infinity)
                .map(animation => animation.finished.catch(() => undefined))));

            const problems = [];
            const expectedStatus = route.includes("does-not-exist") ? 404 : 200;
            if (response?.status() !== expectedStatus) problems.push(`expected HTTP ${expectedStatus}, got ${response?.status()}`);

            const appliedTheme = await page.evaluate(() => document.documentElement.dataset.theme);
            if (appliedTheme !== theme) problems.push(`expected data-theme="${theme}", got "${appliedTheme}"`);

            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
            if (overflow > 0) problems.push(`horizontal overflow of ${overflow}px`);

            const results = await new AxeBuilder({page})
                .withTags(TAGS)
                .analyze();

            for (const violation of results.violations) {
                problems.push(`${violation.id} (${violation.impact}): ${violation.help}`);
                for (const node of violation.nodes.slice(0, 5)) {
                    problems.push(`    ${node.target.join(" ")}`);
                }
            }

            if (problems.length) {
                failures++;
                console.log(`✗ ${label}`);
                problems.forEach(problem => console.log(`  ${problem}`));
            } else {
                console.log(`✓ ${label}`);
            }
            await page.close();
        }
        await context.close();
    }
}

await browser.close();

if (failures) {
    console.error(`\n${failures} page/theme/viewport combination(s) failed.`);
    process.exit(1);
}
console.log("\nNo accessibility violations found.");
