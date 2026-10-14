import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { build } from 'esbuild';
let fixtureJS: string;
let css: string;
test.beforeAll(async ({ browser }) => {
    fixtureJS = (await build({ entryPoints: ['tests/accessibility/fixture.tsx'], bundle: true, write: false, jsx: 'automatic', define: { 'process.env': '{}', 'process.env.NODE_ENV': '"development"' }, tsconfig: 'tsconfig.json' })).outputFiles[0].text;
    const page = await browser.newPage();
    await page.route('**/api/**', r => r.abort());
    await page.goto('http://127.0.0.1:3100/sat');
    css = await page.locator('link[rel=stylesheet]').evaluateAll(nodes => nodes.map(n => (n as HTMLLinkElement).outerHTML).join(''));
    await page.close();
});
test.beforeEach(async ({ page }) => {
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' && !new URL(route.request().url()).pathname.startsWith('/api/') ? route.continue() : route.abort());
    await page.addInitScript(() => localStorage.setItem('driving-test-storage', JSON.stringify({ state: { isGuest: true, selectedState: 'CA' }, version: 2 })));
});
async function fixture(page: Page, mode: string) {
    await page.route('**/__a11y-fixture**', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html lang="en"><head><title>Accessibility regression</title>${css}</head><body><div class="v2-shell" id="root"></div><script>${fixtureJS.replace(/<\/script/gi, '<\\/script')}</script></body></html>` }));
    await page.goto('/__a11y-fixture?mode=' + mode);
    await expect(page.getByRole('heading', { name: 'Accessibility fixture' })).toBeVisible();
}
async function scan(page: Page) { await page.waitForTimeout(250); const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze(); expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]); }
for (const mode of ['training', 'test'])
    test(`${mode}: keyboard, pointer and touch activate once and lock selection`, async ({ page, browser }) => {
        await fixture(page, mode);
        await page.waitForTimeout(350);
        const choices = page.getByRole('group').getByRole('button');
        await page.keyboard.press('Tab');
        await expect(choices.first()).toBeFocused();
        expect(await choices.first().evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
        await page.keyboard.press('Space');
        await expect(page.getByLabel('Selections')).toHaveText('1');
        await page.keyboard.press('Enter');
        await choices.nth(1).click({ force: true });
        await expect(page.getByLabel('Selections')).toHaveText('1');
        await expect(choices.first()).toHaveAttribute('aria-pressed', 'true');
        if (mode === 'training')
            await expect(page.locator('div[role=status]')).toContainText('second choice');
        await fixture(page, mode);
        await page.waitForTimeout(350);
        await page.getByRole('group').getByRole('button').nth(1).click();
        await expect(page.getByLabel('Answer')).toHaveText('"B"');
        const context = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 } });
        const touch = await context.newPage();
        await fixture(touch, mode);
        await touch.waitForTimeout(350);
        await touch.getByRole('group').getByRole('button').nth(2).tap();
        await expect(touch.getByLabel('Answer')).toHaveText('"C"');
        await context.close();
    });
for (const mode of ['single', 'multi', 'numeric', 'order', 'matrix', 'bowtie', 'highlight', 'cloze'])
    test(`${mode}: specialised question semantics and keyboard activation`, async ({ page }) => {
        await fixture(page, mode);
        await scan(page);
        if (mode === 'numeric') {
            await page.getByRole('textbox').fill('1/0');
            await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
            await page.getByRole('textbox').fill('4');
            await expect(page.locator('math')).toHaveCount(1);
        }
        else if (mode === 'cloze') {
            await page.getByLabel('Blank 1').focus();
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
            await page.getByLabel('Blank 2').selectOption('0');
        }
        else if (mode === 'order') {
            await page.getByRole('button', { name: 'First choice', exact: true }).focus();
            await page.keyboard.press('Enter');
            await expect(page.getByRole('button', { name: 'Second choice', exact: true })).toBeFocused();
            await page.getByRole('button', { name: 'Remove step 1: First choice' }).press('Space');
            await expect(page.getByRole('button', { name: 'First choice', exact: true })).toBeFocused();
        }
        else {
            const button = mode === 'matrix' ? page.getByRole('group', { name: 'First row' }).getByRole('button', { name: 'Yes' }) : mode === 'bowtie' ? page.getByRole('button', { name: 'Action one' }) : mode === 'highlight' ? page.getByRole('button', { name: 'first phrase' }) : page.getByRole('button', { name: /A First choice/ });
            await button.focus();
            await page.keyboard.press('Enter');
            await expect(button).toHaveAttribute('aria-pressed', 'true');
        }
        await page.getByRole('button', { name: 'Check', exact: true }).click();
        const before = await page.getByLabel('Selections').textContent();
        await expect(page.locator('div[role=status]').last()).not.toBeEmpty();
        await scan(page);
        expect(await page.getByLabel('Selections').textContent()).toBe(before);
    });
test('figure: focus enters, Tab stays inside, Escape restores opener', async ({ page }) => {
    await fixture(page, 'figure');
    const opener = page.getByRole('button', { name: /Open figure full size/ });
    await opener.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
    await scan(page);
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
});
test('paywall: named dialog and keyboard close', async ({ page }) => { await fixture(page, 'paywall'); await page.getByRole('button', { name: 'Open premium' }).click(); await expect(page.getByRole('dialog')).toHaveAccessibleName(/Study smart/i); await scan(page); await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); });
test('collapsed quiz removes hidden choices from Tab order', async ({ page }) => { await fixture(page, 'quiz'); await expect(page.getByRole('button', { name: /First choice/ })).toHaveCount(0); await page.getByRole('button', { name: /Which choice is safe/ }).press('Space'); await page.getByRole('button', { name: /Second choice/ }).press('Enter'); await expect(page.locator('div[role=status]')).toContainText('Correct'); });
test('timer expiration fires once despite rerender and clock ticks', async ({ page }) => { await fixture(page, 'timer'); await page.waitForTimeout(1600); await expect(page.getByLabel('Expirations')).toHaveText('1'); await expect(page.locator('span[role=status]')).toHaveText('Time is up.'); });
test('calculator result is announced', async ({ page }) => { await fixture(page, 'calculator'); await page.getByLabel('Calculator expression').fill('2+2'); await page.keyboard.press('Enter'); await expect(page.locator('div[role=status]')).toHaveText('4'); await scan(page); });
for (const route of ['/', '/tests', '/login', '/signup', '/dashboard', '/training?set=1', '/test/1', '/sat', '/sat/test/1', '/nclex', '/sat/test/1/results'])
    test(`route scan ${route}`, async ({ page }) => { await page.goto(route); await page.waitForTimeout(1000); expect(new URL(page.url()).pathname).toBe(route.split('?')[0]); await scan(page); });
test('password reset modal has a label, traps focus and restores trigger', async ({ page }) => { await page.goto('/login'); const trigger = page.getByRole('button', { name: /Forgot password/i }); await trigger.click(); await expect(page.getByRole('dialog')).toBeVisible(); await expect(page.getByRole('dialog').getByRole('textbox', { name: 'Email' })).toBeFocused(); await scan(page); await page.keyboard.press('Escape'); await expect(trigger).toBeFocused(); });
test('untimed exam persists mode, keeps chrome out of tab order and keeps shortcuts after a click', async ({ page }) => {
    await page.goto('/sat/test/1');
    await page.getByLabel('Untimed practice (recorded with your result)').check();
    await page.getByRole('button', { name: 'Start module' }).click();
    await expect(page.getByRole('button', { name: /remaining.*timer/ })).toHaveCount(0);
    await expect(page.locator('.skip-link')).toHaveAttribute('inert', '');
    const answer = page.locator('[role="group"][aria-labelledby$="-stem"] button[aria-pressed]').first();
    await answer.focus();
    await page.keyboard.press('Enter');
    await expect(answer).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Next question', exact: true }).click();
    await expect(page.locator('[id$="-stem"]')).toBeFocused();
    // Shortcuts still work with focus on a just-clicked answer.
    const counter = page.getByRole('button', { name: /^Questions: / });
    await expect(counter).toHaveAccessibleName(/^Questions: 2 \//);
    await page.locator('[role="group"][aria-labelledby$="-stem"] button[aria-pressed]').first().click();
    await page.keyboard.press('ArrowRight');
    await expect(counter).toHaveAccessibleName(/^Questions: 3 \//);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('b');
    await expect(page.locator('[role="group"][aria-labelledby$="-stem"] button[aria-pressed]').nth(1)).toHaveAttribute('aria-pressed', 'true');
    const palette = page.getByRole('button', { name: /Questions/ });
    await palette.click();
    await expect(page.getByRole('dialog', { name: /Questions/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(palette).toBeFocused();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('tigertest-v2')!).state.sessions['sat:1']);
    expect(saved.timing).toBe('untimed');
    expect(saved.stages[0].runningSince).toBeUndefined();
    await page.reload();
    await expect(page.getByRole('button', { name: /remaining.*timer/ })).toHaveCount(0);
    await expect(page.locator('[id$="-stem"]')).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('tigertest-v2')!).state.sessions['sat:1'])).toEqual(saved);
});
test('DMV practice test: repeated keyboard answers advance once and complete to results', async ({ page }) => {
    await page.goto('/test/1');
    for (let i = 0; i < 50; i++) {
        const heading = page.getByRole('heading', { level: 2 }).first();
        await expect(heading).toBeFocused();
        const old = await heading.textContent();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        if (i < 49)
            await expect(heading).not.toHaveText(old!);
    }
    await expect(page).toHaveURL(/\/test\/1\/results/);
    await scan(page);
});
for (const width of [390, 320])
    test(`reflow ${width}px with mobile touch`, async ({ browser }) => {
        const context = await browser.newContext({ hasTouch: true, viewport: { width, height: 844 } });
        await context.route('**/*', r => { const u = new URL(r.request().url()); return u.hostname === '127.0.0.1' && !u.pathname.startsWith('/api/') ? r.continue() : r.abort(); });
        const page = await context.newPage();
        for (const route of ['/', '/tests', '/login', '/sat', '/nclex']) {
            await page.goto('http://127.0.0.1:3100' + route);
            await page.waitForTimeout(700);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route).toBe(true);
            await scan(page);
        }
        await context.close();
    });
test('dark mode and appearance keyboard controls', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('tigertest-theme', 'dark'));
    for (const route of ['/', '/tests', '/login', '/dashboard', '/sat', '/nclex']) {
        await page.goto(route);
        await page.waitForTimeout(700);
        await scan(page);
    }
    await page.getByRole('button', { name: /Appearance:/ }).first().click();
    await page.getByRole('button', { name: 'Light', exact: true }).press('Enter');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
});
test('standard timing stays the default and starts the clock', async ({ page }) => {
    await page.goto('/sat/test/1');
    await expect(page.getByLabel('Untimed practice (recorded with your result)')).not.toBeChecked();
    await page.getByRole('button', { name: 'Start module' }).click();
    await expect(page.getByRole('button', { name: /remaining.*timer/ })).toBeVisible();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('tigertest-v2')!).state.sessions['sat:1']);
    expect(saved.timing).not.toBe('untimed');
    expect(saved.stages[0].runningSince).toBeTruthy();
});
test('untimed accommodation preserves SAT scoring and adaptive routing', async () => {
    const { SAT } = await import('../../lib/v2/exams/sat');
    const { readdirSync, readFileSync } = await import('node:fs');
    const { createSession, scoreSession, resolveAdaptive, remainingNow } = await import('../../lib/v2/session');
    const bank: import('../../lib/v2/types').QuestionV2[] = readdirSync('data/v2/sat').filter(name => name.endsWith('.json')).flatMap(name => JSON.parse(readFileSync(`data/v2/sat/${name}`, 'utf8')));
    const byId = new Map(bank.map(question => [question.id, question]));
    const standard = createSession(SAT, bank, 1);
    for (const stage of standard.stages)
        for (const id of stage.questionIds)
            stage.answers[id] = byId.get(id)?.format === 'numeric' ? '0' : [0];
    const untimed = { ...structuredClone(standard), timing: 'untimed' as const };
    const standardResult = scoreSession(SAT, standard, byId);
    const untimedResult = scoreSession(SAT, untimed, byId);
    expect(standardResult.timing).toBe('standard');
    expect(untimedResult.timing).toBe('untimed');
    expect(untimedResult.sections).toEqual(standardResult.sections);
    expect(untimedResult.items).toEqual(standardResult.items);
    expect(untimedResult.composite).toBe(standardResult.composite);
    const nextStandard = resolveAdaptive(SAT, bank, standard, 1, byId);
    const nextUntimed = resolveAdaptive(SAT, bank, untimed, 1, byId);
    expect(nextUntimed.variant).toEqual(nextStandard.variant);
    expect(nextUntimed.questionIds).toEqual(nextStandard.questionIds);
    const stage = standard.stages[0];
    expect(remainingNow({ ...stage, runningSince: new Date(0).toISOString() }, 5000)).toBe(stage.remaining - 5);
    expect(remainingNow(untimed.stages[0], 5000)).toBe(stage.remaining);
});


test('ordering review names include position correctness instead of a remove action', async ({ page }) => {
    await fixture(page, 'order');
    await page.getByRole('button', { name: 'Second choice', exact: true }).click();
    await page.getByRole('button', { name: 'Third choice', exact: true }).click();
    await page.getByRole('button', { name: 'Check', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Step 1: Second choice. Correct position', exact: true })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Step 2: Third choice. Incorrect position', exact: true })).toBeDisabled();
    await expect(page.getByRole('button', { name: /^Remove step/ })).toHaveCount(0);
});

test('muted copy contrast preserves dark completion surfaces and hover feedback', async ({ page }) => {
    await fixture(page, 'contrast');
    await scan(page);
    const light = page.getByRole('button', { name: 'Light surface action' });
    const dark = page.getByRole('button', { name: 'Dark surface action' });
    await expect(light).toHaveCSS('color', 'rgb(107, 114, 128)');
    await expect(dark).toHaveCSS('color', 'rgb(156, 163, 175)');
    await light.hover();
    await expect(light).toHaveCSS('color', 'rgb(55, 65, 81)');
    await dark.hover();
    await expect(dark).toHaveCSS('color', 'rgb(255, 255, 255)');
});

test('calculator side tool allows desktop answers and traps focus only on mobile', async ({ page }) => {
    await page.goto('/sat/test/1');
    await expect(page.getByRole('button', { name: 'Start module' })).toBeVisible();
    await page.evaluate(() => {
        const stored = JSON.parse(localStorage.getItem('tigertest-v2')!);
        stored.state.sessions['sat:1'].stage = 2;
        localStorage.setItem('tigertest-v2', JSON.stringify(stored));
    });
    await page.reload();
    await page.getByRole('button', { name: 'Start module' }).click();
    const trigger = page.getByRole('button', { name: 'Calculator', exact: true });
    await trigger.click();
    await page.getByLabel('Calculator expression').fill('2+2');
    await page.keyboard.press('Enter');
    const answer = page.locator('[role="group"][aria-labelledby$="-stem"] button[aria-pressed]').first();
    await answer.click();
    await expect(answer).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('dialog', { name: 'Calculator', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await page.setViewportSize({ width: 390, height: 844 });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Calculator', exact: true });
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await dialog.getByRole('button', { name: 'Close', exact: true }).focus();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
});
