// Landing-page screenshots for new exams, matching the existing public/landing/*.png framing.
//   Desktop: /<slug>/test/<idBase+1> at 1215x790 @1x (the practice-test question view).
//   Mobile:  /<slug>/training?set=1 at 384x640 @2x (the training question view).
//
// Usage (needs a running server, e.g. `PORT=3123 npm start` after `npm run build`, and
// `playwright` installed somewhere node can resolve it; Chromium is preinstalled):
//   node shoot_landing.js http://localhost:3123 public/landing <id>:<slug-without-slash>:<idBase+1> [...]
//   e.g. node shoot_landing.js http://localhost:3123 public/landing forklift:forklift:3301
const { chromium } = require("playwright");
const path = require("path");
const [base, outDir, ...pairs] = process.argv.slice(2);
if (!base || !outDir || pairs.length === 0) {
  console.error("usage: node shoot_landing.js <baseUrl> <outDir> id:slug:testId [...]");
  process.exit(2);
}
(async () => {
  const browser = await chromium.launch();
  for (const pair of pairs) {
    const [id, slug, tid] = pair.split(":");
    let ctx = await browser.newContext({ viewport: { width: 1215, height: 790 }, deviceScaleFactor: 1 });
    let page = await ctx.newPage();
    await page.goto(`${base}/${slug}/dashboard`, { waitUntil: "networkidle" });
    await page.goto(`${base}/${slug}/test/${tid}`, { waitUntil: "networkidle" });
    await page.waitForSelector("text=A)", { timeout: 30000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `${id}-desktop.png`) });
    await ctx.close();

    ctx = await browser.newContext({ viewport: { width: 384, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    page = await ctx.newPage();
    await page.goto(`${base}/${slug}/dashboard`, { waitUntil: "networkidle" });
    await page.goto(`${base}/${slug}/training?set=1`, { waitUntil: "networkidle" });
    await page.waitForSelector("text=A)", { timeout: 30000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `${id}-mobile.png`) });
    await ctx.close();
    console.log("shot", id);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
