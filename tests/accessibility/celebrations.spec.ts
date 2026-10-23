import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { build } from "esbuild";

let fixtureJS: string;
let fixtureCSS: string;
let appCSS: string;
test.beforeAll(async ({ browser }) => {
  const bundle = await build({ entryPoints: ["tests/accessibility/celebration-fixture.tsx"], outdir: "fixture", bundle: true, write: false, jsx: "automatic", define: { "process.env": "{}", "process.env.NODE_ENV": '"development"' }, tsconfig: "tsconfig.json" });
  fixtureJS = bundle.outputFiles.find(f => f.path.endsWith(".js"))!.text;
  fixtureCSS = bundle.outputFiles.find(f => f.path.endsWith(".css"))!.text;
  const page = await browser.newPage();
  await page.route("**/*", r => {
    const u = new URL(r.request().url());
    return u.hostname === "127.0.0.1" && !u.pathname.startsWith("/api/") ? r.continue() : r.abort();
  });
  await page.goto("/times-tables/dashboard");
  appCSS = await page.locator('link[rel=stylesheet]').evaluateAll(nodes => nodes.map(n => (n as HTMLLinkElement).outerHTML).join(""));
  await page.close();
});

async function fixture(page: Page, mode: string) {
  await page.route("**/*", r => {
    const u = new URL(r.request().url());
    return u.hostname === "127.0.0.1" && !u.pathname.startsWith("/api/") ? r.continue() : r.abort();
  });
  await page.route("**/__celebration-fixture**", r => r.fulfill({ contentType: "text/html", body: `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Celebration regression</title>${appCSS}<style>${fixtureCSS}</style></head><body><div class="v2-shell" id="root"></div><script>${fixtureJS.replace(/<\/script/gi, "<\\/script")}</script></body></html>` }));
  await page.goto(`/__celebration-fixture?mode=${mode}`);
  await expect(page.getByRole("heading", { name: "All your basics are green!" })).toBeVisible();
}

test("saved achievements stay still, earned ones announce the heading once", async ({ page }) => {
  await fixture(page, "saved");
  const heading = page.getByRole("heading", { name: "All your basics are green!" });
  await expect(page.locator("[data-achievement]")).toHaveAttribute("data-achievement", "saved");
  await expect(heading).not.toBeFocused();
  expect(await page.locator("img").evaluate(n => getComputedStyle(n).animationName)).toBe("none");
  await fixture(page, "earned");
  await expect(heading).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "See your progress" })).toBeFocused();
  await page.getByRole("button", { name: "Rerender", exact: true }).click();
  await expect(page.getByRole("button", { name: "Rerender", exact: true })).toBeFocused();
  await expect(page.locator("[data-achievement]")).toHaveAttribute("data-achievement", "earned");
});

test("reduced motion keeps the celebration and disables decorative motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await fixture(page, "earned");
  expect(await page.locator("img").evaluate(n => getComputedStyle(n).animationName)).toBe("none");
  await expect(page.getByRole("link", { name: "See your progress" })).toBeVisible();
  await fixture(page, "fireworks");
  await expect(page.getByLabel("Fireworks completed")).toHaveText("1");
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("fireworks finish once despite repeated inline callback renders", async ({ page }) => {
  await fixture(page, "fireworks");
  await expect(page.locator("canvas")).toHaveAttribute("aria-hidden", "true");
  await expect(page.getByLabel("Fireworks completed")).toHaveText("1", { timeout: 6000 });
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.waitForTimeout(700);
  await expect(page.getByLabel("Fireworks completed")).toHaveText("1");
});

test("a queued result can only celebrate once, and saved results cannot create an event", async ({ page }) => {
  await fixture(page, "saved");
  await page.getByRole("button", { name: "Claim completion" }).click();
  await expect(page.getByLabel("Completion claimed")).toHaveText("false");
  await page.getByRole("button", { name: "Queue completion" }).click();
  await page.getByRole("button", { name: "Claim completion" }).click();
  await expect(page.getByLabel("Completion claimed")).toHaveText("true");
  await page.getByRole("button", { name: "Claim completion" }).click();
  await expect(page.getByLabel("Completion claimed")).toHaveText("false");
  await page.reload();
  await page.getByRole("button", { name: "Claim completion" }).click();
  await expect(page.getByLabel("Completion claimed")).toHaveText("false");
});

for (const dark of [false, true]) test(`achievement card is accessible at 320px (${dark ? "dark" : "light"})`, async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await fixture(page, "earned");
  if (dark) await page.locator("html").evaluate(el => el.classList.add("dark"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.failureSummary) }))).toEqual([]);
});
