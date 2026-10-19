// Landing-page screenshots for exams, matching the existing public/landing/*.png framing.
// Each exam gets a light pair and a dark pair (<id>-desktop.png, <id>-mobile.png,
// <id>-desktop-dark.png, <id>-mobile-dark.png); the landing hero swaps to the dark pair
// when the site is in dark mode.
//   Desktop: the practice-test question view at 1215x790 @1x.
//   Mobile:  the training question view at 384x640 @2x.
//
// v1 exams: id:slug:testId (testId = idBase+1), shot at /<slug>/test/<testId> and
//   /<slug>/training?set=1.
// v2 exams: id:slug:v2:drillKey, shot at /<slug>/test/1 and
//   /<slug>/train?drill=<drillKey>&level=exam.
//
// Usage (needs a running server, e.g. `PORT=3123 npm start` after `npm run build`, and
// `playwright` or `playwright-core` resolvable by node; set CHROME_CHANNEL=chrome to use the
// installed Google Chrome instead of Playwright's Chromium):
//   node shoot_landing.js http://localhost:3123 public/landing <pair> [...]
//   e.g. node shoot_landing.js http://localhost:3123 public/landing forklift:forklift:3301
//        node shoot_landing.js http://localhost:3123 public/landing sat:sat:v2:advanced
// THEMES=dark (or light) shoots only that theme; default is both.
// SHOT_LANG=es (or vi, ko) shoots the translated app and names files <id>-mobile-es.png and so on,
// the paths TranslatedExamLanding uses.
let pw;
try { pw = require("playwright"); } catch { pw = require("playwright-core"); }
const { chromium } = pw;
const path = require("path");
const [base, outDir, ...pairs] = process.argv.slice(2);
if (!base || !outDir || pairs.length === 0) {
  console.error("usage: node shoot_landing.js <baseUrl> <outDir> id:slug:testId|id:slug:v2:drill [...]");
  process.exit(2);
}
const themes = (process.env.THEMES || "light,dark").split(",");
const lang = process.env.SHOT_LANG || "";

// Hide the Next.js dev badge in case the server is `next dev`.
const NAV = { waitUntil: "load", timeout: 120000 };
const HIDE_DEV = "nextjs-portal{display:none!important}";

async function open(browser, theme, opts) {
  const ctx = await browser.newContext({ ...opts, colorScheme: theme });
  await ctx.addInitScript(([t, l]) => {
    try {
      localStorage.setItem("tigertest-theme", t);
      if (l && !localStorage.getItem("driving-test-storage"))
        localStorage.setItem("driving-test-storage", JSON.stringify({ state: { language: l }, version: 2 }));
    } catch {}
  }, [theme, lang]);
  const page = await ctx.newPage();
  return { ctx, page };
}

async function settle(page, selector) {
  await page.waitForSelector(selector, { timeout: 180000 });
  await page.addStyleTag({ content: HIDE_DEV });
  await page.waitForTimeout(1000);
  // The question heading takes focus for screen readers; drop the ring from the picture.
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  await page.waitForTimeout(200);
}

(async () => {
  const browser = await chromium.launch(process.env.CHROME_CHANNEL ? { channel: process.env.CHROME_CHANNEL } : {});
  for (const pair of pairs) {
    const [id, slug, a, b] = pair.split(":");
    const v2 = a === "v2";
    for (const theme of themes) {
      const suffix = (lang ? `-${lang}` : "") + (theme === "dark" ? "-dark" : "");

      let { ctx, page } = await open(browser, theme, { viewport: { width: 1215, height: 790 }, deviceScaleFactor: 1 });
      if (v2) {
        await page.goto(`${base}/${slug}/test/1`, NAV);
        // Get past the intro screen to the first question.
        await page.waitForSelector("text=/Start module|Begin|Question 1/", { timeout: 120000 });
        const start = page.getByRole("button", { name: /^(start|begin)/i }).first();
        if (await start.isVisible().catch(() => false)) await start.click();
        await settle(page, "text=/Question 1/");
      } else {
        await page.goto(`${base}/${slug}/dashboard`, NAV);
        await page.goto(`${base}/${slug}/test/${a}`, NAV);
        await settle(page, "text=A)");
      }
      await page.screenshot({ path: path.join(outDir, `${id}-desktop${suffix}.png`) });
      await ctx.close();

      ({ ctx, page } = await open(browser, theme, { viewport: { width: 384, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));
      if (v2) {
        await page.goto(`${base}/${slug}/train?drill=${b}&level=exam`, NAV);
        await settle(page, "text=/Tap an answer|Check/");
      } else {
        await page.goto(`${base}/${slug}/dashboard`, NAV);
        await page.goto(`${base}/${slug}/training?set=1`, NAV);
        await settle(page, "text=A)");
      }
      await page.screenshot({ path: path.join(outDir, `${id}-mobile${suffix}.png`) });
      await ctx.close();
      console.log("shot", id, theme);
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
