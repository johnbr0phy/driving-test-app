import { test, expect, type Page } from '@playwright/test';
import { TIMESTABLES } from '../../lib/v2/exams/timestables';
import { drillQuestions } from '../../lib/v2/training';
import type { QuestionV2 } from '../../lib/v2/types';
import skills from '../../data/v2/basics/timestables.json';
import questions from '../../data/v2/timestables/questions.json';

// Real routes, guest-only local state. Never contact account, analytics or API services.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' && !url.pathname.startsWith('/api/') ? route.continue() : route.abort();
  });
  await page.setViewportSize({ width: 390, height: 844 });
});

async function seed(page: Page, overrides: Record<string, unknown> = {}) {
  await page.addInitScript((saved) => {
    // Do not overwrite earned progress on reload or browser Back.
    if (!localStorage.getItem('tigertest-v2')) {
      localStorage.setItem('tigertest-v2', JSON.stringify({
        state: { sessions: {}, results: [], drills: {}, basics: {}, goals: {}, syncedUid: null, ...saved }, version: 1,
      }));
      localStorage.setItem('driving-test-storage', JSON.stringify({ state: { isGuest: true, selectedState: 'CA' }, version: 2 }));
    }
  }, overrides);
}

async function completeLesson(page: Page, skillId: string) {
  const skill = skills.find((item) => item.id === skillId)!;
  // Use the lesson's supported reading alternative, then answer the real quiz.
  await page.getByRole('button', { name: 'Read it', exact: true }).click();
  await page.getByRole('button', { name: `Got it, try ${skill.questions.length} questions`, exact: true }).click();
  for (const [index, question] of skill.questions.entries()) {
    await page.getByRole('button', { name: question.options[question.answer], exact: true }).click();
    await page.getByRole('button', { name: index === skill.questions.length - 1 ? 'Finish' : 'Next', exact: true }).click();
  }
}

async function assertDashboardReturn(page: Page, kind: 'basics' | 'drill', complete: boolean) {
  await page.getByRole('link', { name: 'See your progress', exact: true }).click();
  await expect(page).toHaveURL(/\/times-tables\/dashboard$/);
  const row = page.locator(`[id="progress-${kind}:twoFiveTen"]`);
  await expect(row).toBeFocused();
  if (complete) {
    await expect(row).toContainText('Complete!');
    await expect(row.locator('.bg-green-500')).toBeVisible();
  } else {
    await expect(row).not.toContainText('Complete!');
  }
  return row;
}

for (const savedGoal of [undefined, 60, 80, 90]) {
  test(`Times Tables ${savedGoal === undefined ? 'new learner' : `saved ${savedGoal} target`}: Start here opens the first lesson`, async ({ page }) => {
    await seed(page, { goals: savedGoal === undefined ? {} : { timestables: savedGoal } });
    await page.goto('/times-tables/dashboard');
    await expect(page.getByRole('heading', { name: 'Complete all 16 steps', exact: true })).toBeVisible();
    await expect(page.getByText('What score are you aiming for?', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Change', exact: true })).toHaveCount(0);
    await expect(page.getByText('100%', { exact: true })).toBeVisible();
    const start = page.getByRole('link', { name: /Start here/ });
    await expect(start).toHaveAttribute('href', '/times-tables/practice/1?skill=ttGroupsOf');
    await start.click();
    await expect(page).toHaveURL(/\/times-tables\/practice\/1\?skill=ttGroupsOf$/);
    await expect(page.getByRole('dialog', { name: 'Times means lots of walkthrough' })).toBeVisible();
    await expect(page.getByText('Walk through it · step 1 of 4', { exact: true })).toBeVisible();
  });
}

test('newly learned skill celebrates once, persists partial progress and returns focus', async ({ page }) => {
  await seed(page, { goals: { timestables: 60 } });
  await page.goto('/times-tables/practice/1?skill=ttGroupsOf');
  await completeLesson(page, 'ttGroupsOf');
  await expect(page.locator('[data-achievement="earned"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'One more skill is green!', exact: true })).toBeFocused();
  const row = await assertDashboardReturn(page, 'basics', false);
  await expect(row).toContainText('1/4 skills learned');
  await expect(page.getByText('0/16', { exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
  await expect(page.locator('[data-achievement="earned"]')).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('button', { name: 'Learn it again', exact: true }).click();
  await completeLesson(page, 'ttGroupsOf');
  await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('tigertest-v2')!).state);
  expect(stored.basics['timestables:ttGroupsOf'].done).toBe(true);
  expect(stored.goals.timestables).toBe(60);
});

test('last basics lesson celebrates the full step, returns to green row and does not replay on reload', async ({ page }) => {
  const basics = Object.fromEntries(['ttGroupsOf', 'ttTwos', 'ttFives'].map((id) => [
    `timestables:${id}`, { done: true, firstTry: 2, total: 2, completedAt: '2026-01-01T00:00:00.000Z' },
  ]));
  await seed(page, { basics, goals: { timestables: 80 } });
  await page.goto('/times-tables/practice/1?skill=ttTens');
  await completeLesson(page, 'ttTens');
  await expect(page.getByRole('heading', { name: 'All your basics are green!', exact: true })).toBeFocused();
  await expect(page.locator('[data-achievement="earned"]')).toContainText('4 of 4 basics skills learned');
  await page.screenshot({ path: '/tmp/tigertest-basics-earned.png', fullPage: true });
  const row = await assertDashboardReturn(page, 'basics', true);
  await expect(row).toContainText('4/4 skills learned');
  await expect(page.getByText('1/16', { exact: true })).toBeVisible();
  await page.screenshot({ path: '/tmp/tigertest-basics-dashboard.png', fullPage: true });
  await page.reload();
  await expect(page.getByText('1/16', { exact: true })).toBeVisible();
  await expect(row).not.toBeFocused();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.goto('/times-tables/practice/1?skill=ttTens');
  await expect(page.locator('[data-achievement="saved"]')).toContainText('Basics complete');
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('last drill answer celebrates mastery, focuses its green step and preserves it on revisit', async ({ page }) => {
  const drill = TIMESTABLES.drills[0];
  const pool = drillQuestions(questions as QuestionV2[], drill, TIMESTABLES);
  const last = pool[pool.length - 1];
  await seed(page, {
    goals: { timestables: 90 },
    drills: { 'timestables:twoFiveTen': { masteredIds: pool.slice(0, -1).map((q) => q.id), wrongQueue: [], seen: pool.length - 1, correct: pool.length - 1 } },
  });
  await page.goto('/times-tables/practice/1?level=exam');
  expect(last.format).toBe('numeric');
  await page.getByRole('textbox').fill(last.numeric!.answers[0]);
  await page.getByRole('button', { name: 'Check', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'You did it! All green!', exact: true })).toBeFocused();
  await expect(page.locator('[data-achievement="earned"]')).toContainText('20 of 20 questions mastered');
  await page.screenshot({ path: '/tmp/tigertest-drill-earned.png', fullPage: true });
  await assertDashboardReturn(page, 'drill', true);
  await expect(page.getByText('1/16', { exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('button', { name: 'Practise again', exact: true }).click();
  await expect(page.getByRole('alertdialog', { name: 'Reset this drill?' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.locator('[data-achievement="saved"]')).toContainText('20 of 20 questions mastered');
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('tigertest-v2')!).state.drills['timestables:twoFiveTen']);
  expect(stored.masteredIds).toHaveLength(20);
});
