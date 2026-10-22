import { test, expect, type Page } from "@playwright/test";
import "../../lib/banks/cdl";
import { getExamById } from "../../lib/exams";
import { getExamTrainingSetQuestions } from "../../lib/examTestGenerator";
import { getTrainingSetQuestions } from "../../lib/testGenerator";

const cdl = getExamById("cdl")!;
const examples = [
  { name: "DMV set", route: "/practice/2", dashboard: "/dmv/dashboard", setId: 2, rowId: "training-2", questions: getTrainingSetQuestions(2, "CA") },
  { name: "CDL split part", route: "/cdl/practice/2?part=1", dashboard: "/cdl/dashboard", setId: 122, rowId: "training-2-1", questions: getExamTrainingSetQuestions(cdl, 2, 1) },
];

test.beforeEach(async ({ page }) => {
  // Real routes and local guest state only. Do not contact external accounts or APIs.
  await page.route("**/*", route => {
    const url = new URL(route.request().url());
    return url.hostname === "127.0.0.1" && !url.pathname.startsWith("/api/") ? route.continue() : route.abort();
  });
  await page.setViewportSize({ width: 390, height: 844 });
});

async function seed(page: Page, state: Record<string, unknown>) {
  await page.addInitScript((saved) => {
    // Reopening a route must use the progress earned by the previous page.
    if (!localStorage.getItem("driving-test-storage")) {
      localStorage.setItem("driving-test-storage", JSON.stringify({ version: 2, state: {
        isGuest: true, selectedState: "CA", language: "en",
        training: { questionsAnswered: [], correctCount: 10, incorrectCount: 0, totalCorrectAllTime: 10, currentStreak: 0, bestStreak: 0, masteredQuestionIds: [], lastQuestionId: null },
        ...saved,
      } }));
    }
  }, state);
}

async function masteredIds(page: Page, setId: number): Promise<string[]> {
  return page.evaluate(id => JSON.parse(localStorage.getItem("driving-test-storage")!).state.trainingSets[id].masteredIds, setId);
}

for (const example of examples) {
  test(`${example.name}: an earned result focuses its heading and returns to the real green row`, async ({ page }) => {
    await seed(page, { trainingSets: { [example.setId]: { masteredIds: example.questions.slice(0, -1).map(q => q.questionId), wrongQueue: [] } } });
    await page.goto(example.route);
    const last = example.questions[example.questions.length - 1];
    const answer = page.locator("button[aria-pressed]").nth("ABCD".indexOf(last.correctAnswer));
    await expect(answer).toHaveAttribute("aria-disabled", "false");
    await answer.click();
    await page.getByRole("button", { name: "Next Question", exact: true }).click();
    const dialog = page.getByRole("dialog");
    const heading = dialog.getByRole("heading", { name: "You turned this step green!", exact: true });
    await expect(page.locator('[data-achievement="earned"]')).toBeVisible();
    await expect(heading).toBeFocused();
    await page.keyboard.press("Tab");
    const progress = dialog.getByRole("link", { name: "See your progress", exact: true });
    await expect(progress).toBeFocused();
    if (example.setId === 122) {
      await expect(progress).toHaveAttribute("href", "/cdl/dashboard?completed=training:2&part=1");
      await expect(dialog).toContainText("You finished this part.");
      await expect(dialog.getByRole("link", { name: /Next: Braking Systems/ })).toBeVisible();
      await expect(dialog.getByRole("button", { name: /share/i })).toHaveCount(0);
    }
    await progress.click();
    await expect(page).toHaveURL(new RegExp(`${example.dashboard}$`));
    const row = page.locator(`#${example.rowId}`);
    await expect(row.locator("a, button").first()).toBeFocused();
    await expect(row).toHaveClass(/ring-green-500/);
    await expect(row).toContainText("Complete");
    if (example.setId === 122) {
      await expect(page.locator("#training-2-2")).not.toContainText("Complete");
      await expect(page.locator("#training-2-2")).not.toHaveClass(/ring-green-500/);
    }
    await page.goBack();
    await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
    await expect(page.locator('[data-achievement="earned"]')).toHaveCount(0);
    await expect(page.locator("canvas")).toHaveCount(0);
    expect((await masteredIds(page, example.setId)).length).toBe(example.questions.length);
  });

  test(`${example.name}: restored completion stays still and Cancel keeps mastery`, async ({ page }) => {
    const ids = example.questions.map(q => q.questionId);
    await seed(page, { trainingSets: { [example.setId]: { masteredIds: ids, wrongQueue: [] } } });
    await page.goto(example.route);
    await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Try Again", exact: true }).click();
    if (example.setId === 122) await expect(dialog).toContainText("this part only");
    await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(dialog.getByRole("button", { name: "Reset", exact: true })).toHaveCount(0);
    await expect(dialog.getByRole("button", { name: "Try Again", exact: true })).toBeFocused();
    expect(await masteredIds(page, example.setId)).toEqual(ids);
    await page.reload();
    await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
  });
}

test("split-part markers cannot highlight an unfinished part or claim a full green set", async ({ page }) => {
  await seed(page, { trainingSets: { 122: { masteredIds: examples[1].questions.map(q => q.questionId), wrongQueue: [] } } });
  await page.goto("/cdl/dashboard?completed=training:2&part=2");
  await expect(page).toHaveURL(/\/cdl\/dashboard$/);
  await expect(page.locator("#training-2-1")).toContainText("Complete");
  await expect(page.locator("#training-2-2")).not.toContainText("Complete");
  await expect(page.locator(".ring-green-500")).toHaveCount(0);
  await page.goto("/cdl/dashboard?completed=training:2");
  await expect(page).toHaveURL(/\/cdl\/dashboard$/);
  await expect(page.locator(".ring-green-500")).toHaveCount(0);
});

for (const score of [35, 40]) test(`DMV test marker uses the dashboard pass threshold (${score}/50)`, async ({ page }) => {
  await seed(page, { testAttempts: [{ testNumber: 1, state: "CA", bestScore: score, attemptCount: 1, firstScore: score, lastAttemptDate: "2026-01-01T00:00:00.000Z" }] });
  await page.goto("/dmv/dashboard?completed=test:1");
  await expect(page).toHaveURL(/\/dmv\/dashboard$/);
  if (score === 40) {
    await expect(page.locator("#test-1")).toHaveClass(/ring-green-500/);
    await expect(page.locator("#test-1 a, #test-1 button").first()).toBeFocused();
  } else {
    await expect(page.locator("#test-1")).not.toHaveClass(/ring-green-500/);
    await expect(page.locator("#test-1 a, #test-1 button").first()).not.toBeFocused();
  }
});

test("localized restored completion fits 320px and remains still with reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await seed(page, { language: "zh", trainingSets: { 2: { masteredIds: examples[0].questions.map(q => q.questionId), wrongQueue: [] } } });
  await page.goto("/practice/2");
  await expect(page.getByRole("link", { name: "查看你的进度", exact: true })).toBeVisible();
  await expect(page.locator('[data-achievement="saved"]')).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
