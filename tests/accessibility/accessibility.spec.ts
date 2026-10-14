import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { build } from 'esbuild';
let fixtureJS:string;
let css:string;
test.beforeAll(async ({browser})=>{
 fixtureJS=(await build({entryPoints:['tests/accessibility/fixture.tsx'],bundle:true,write:false,jsx:'automatic',define:{'process.env':'{}','process.env.NODE_ENV':'"development"'},tsconfig:'tsconfig.json'})).outputFiles[0].text;
 const page=await browser.newPage(); await page.route('**/api/**', r=>r.abort()); await page.goto('http://127.0.0.1:3100/sat');
 css=await page.locator('link[rel=stylesheet]').evaluateAll(nodes=>nodes.map(n=>(n as HTMLLinkElement).outerHTML).join(''));
 await page.close();
});
test.beforeEach(async({page})=>{
 await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1' && !new URL(route.request().url()).pathname.startsWith('/api/')?route.continue():route.abort());
 await page.addInitScript(()=>localStorage.setItem('driving-test-storage',JSON.stringify({state:{isGuest:true,selectedState:'CA'},version:2})));
});
async function fixture(page:Page,mode:string){
 await page.route('**/__a11y-fixture**',route=>route.fulfill({contentType:'text/html',body:`<!doctype html><html lang="en"><head><title>Accessibility regression</title>${css}</head><body><div class="v2-shell" id="root"></div><script>${fixtureJS.replace(/<\/script/gi,'<\\/script')}</script></body></html>`}));
 await page.goto('/__a11y-fixture?mode='+mode);
 await expect(page.getByRole('heading',{name:'Accessibility fixture'})).toBeVisible();
}
async function scan(page:Page){ await page.waitForTimeout(250); const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze(); expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]); }
for(const mode of ['training','test']) test(`${mode}: keyboard, pointer and touch activate once and lock selection`,async({page,browser})=>{
 await fixture(page,mode);await page.waitForTimeout(350);
 const choices=page.getByRole('group').getByRole('button');
 await page.keyboard.press('Tab');await expect(choices.first()).toBeFocused();
 expect(await choices.first().evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
 await page.keyboard.press('Space');await expect(page.getByLabel('Selections')).toHaveText('1');
 await page.keyboard.press('Enter');await choices.nth(1).click({force:true});await expect(page.getByLabel('Selections')).toHaveText('1');
 await expect(choices.first()).toHaveAttribute('aria-pressed','true');
 if(mode==='training') await expect(page.locator('div[role=status]')).toContainText('second choice');
 await fixture(page,mode);await page.waitForTimeout(350);await page.getByRole('group').getByRole('button').nth(1).click();await expect(page.getByLabel('Answer')).toHaveText('"B"');
 const context=await browser.newContext({hasTouch:true,viewport:{width:390,height:844}});const touch=await context.newPage();await fixture(touch,mode);await touch.waitForTimeout(350);await touch.getByRole('group').getByRole('button').nth(2).tap();await expect(touch.getByLabel('Answer')).toHaveText('"C"');await context.close();
});
for(const mode of ['single','multi','numeric','order','matrix','bowtie','highlight','cloze']) test(`${mode}: specialised question semantics and keyboard activation`,async({page})=>{
 await fixture(page,mode);await scan(page);
 if(mode==='numeric'){await page.getByRole('textbox').fill('1/0');await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid','true');await page.getByRole('textbox').fill('4');await expect(page.locator('math')).toHaveCount(1);}
 else if(mode==='cloze'){await page.getByLabel('Blank 1').focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await page.getByLabel('Blank 2').selectOption('0');}
 else if(mode==='order'){await page.getByRole('button',{name:'First choice',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Second choice',exact:true})).toBeFocused();await page.getByRole('button',{name:'Remove step 1: First choice'}).press('Space');await expect(page.getByRole('button',{name:'First choice',exact:true})).toBeFocused();}
 else {const button= mode==='matrix'?page.getByRole('group',{name:'First row'}).getByRole('button',{name:'Yes'}):mode==='bowtie'?page.getByRole('button',{name:'Action one'}):mode==='highlight'?page.getByRole('button',{name:'first phrase'}):page.getByRole('button',{name:/A First choice/});await button.focus();await page.keyboard.press('Enter');await expect(button).toHaveAttribute('aria-pressed','true');}
 await page.getByRole('button',{name:'Check',exact:true}).click();const before=await page.getByLabel('Selections').textContent();await expect(page.locator('div[role=status]').last()).not.toBeEmpty();await scan(page);expect(await page.getByLabel('Selections').textContent()).toBe(before);
});
test('figure: focus enters, Tab stays inside, Escape restores opener',async({page})=>{
 await fixture(page,'figure');const opener=page.getByRole('button',{name:/Open figure full size/});await opener.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('button',{name:'Close',exact:true})).toBeFocused();await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Close',exact:true})).toBeFocused();await scan(page);await page.keyboard.press('Escape');await expect(opener).toBeFocused();
});
test('paywall: named dialog and keyboard close',async({page})=>{await fixture(page,'paywall');await page.getByRole('button',{name:'Open premium'}).click();await expect(page.getByRole('dialog')).toHaveAccessibleName(/Study smart/i);await scan(page);await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);});
test('collapsed quiz removes hidden choices from Tab order',async({page})=>{await fixture(page,'quiz');await expect(page.getByRole('button',{name:/First choice/})).toHaveCount(0);await page.getByRole('button',{name:/Which choice is safe/}).press('Space');await page.getByRole('button',{name:/Second choice/}).press('Enter');await expect(page.locator('div[role=status]')).toContainText('Correct');});
test('timer expiration fires once despite rerender and clock ticks',async({page})=>{await fixture(page,'timer');await page.waitForTimeout(1600);await expect(page.getByLabel('Expirations')).toHaveText('1');await expect(page.locator('span[role=status]')).toHaveText('Time is up.');});
test('calculator result is announced',async({page})=>{await fixture(page,'calculator');await page.getByLabel('Calculator expression').fill('2+2');await page.keyboard.press('Enter');await expect(page.locator('div[role=status]')).toHaveText('4');await scan(page);});
for(const route of ['/','/tests','/login','/signup','/dashboard','/training?set=1','/test/1','/sat','/sat/test/1','/nclex','/sat/test/1/results']) test(`route scan ${route}`,async({page})=>{await page.goto(route);await page.waitForTimeout(1000);expect(new URL(page.url()).pathname).toBe(route.split('?')[0]);await scan(page);});
test('password reset modal has a label, traps focus and restores trigger',async({page})=>{await page.goto('/login');const trigger=page.getByRole('button',{name:/Forgot password/i});await trigger.click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog').getByRole('textbox',{name:'Email'})).toBeFocused();await scan(page);await page.keyboard.press('Escape');await expect(trigger).toBeFocused();});
test('untimed exam persists mode, keeps chrome out of tab order and uses focused shortcuts',async({page})=>{
 await page.goto('/sat/test/1');await page.getByLabel('Untimed practice (recorded with your result)').check();await page.getByRole('button',{name:'Start module'}).click();await expect(page.getByRole('button',{name:/remaining.*timer/})).toHaveCount(0);await expect(page.locator('.skip-link')).toHaveAttribute('inert','');
 const answer=page.locator('[data-exam-shortcuts] [aria-pressed]').first();await answer.focus();await page.keyboard.press('Enter');await expect(answer).toHaveAttribute('aria-pressed','true');await page.getByRole('button',{name:'Next question',exact:true}).click();await expect(page.locator('[id$="-stem"]')).toBeFocused();const palette=page.getByRole('button',{name:/Questions/});await palette.click();await expect(page.getByRole('dialog',{name:/Questions/})).toBeVisible();await page.keyboard.press('Escape');await expect(palette).toBeFocused();
});
