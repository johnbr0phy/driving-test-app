// Headless Chrome harness for "Drive the Question".
//
// Plays every scene down every decision branch and saves a screenshot at each
// decision point, in the middle of each outcome, and at each result card:
//   shots/drive/<rule>/<branch>/{decision-1,outcome,result}.png
// plus shots/drive/stats.json with draw calls, triangles and fps per branch.
//
//   npm run dev                      (in another terminal; the flag is on in dev)
//   node tools/drive-shoot.mjs       all scenes, phone portrait
//   node tools/drive-shoot.mjs --only=double-arrow --landscape --scale=2
//   BASE=https://<preview>.vercel.app node tools/drive-shoot.mjs
//
// Headless Chrome draws WebGL in software, so the fps here is a floor for a
// laptop CPU, not a phone measurement. Draw calls and triangles are exact.

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")).map(([k, v]) => [k, v ?? true]));
const BASE = process.env.BASE || "http://localhost:3000";
const OUT = path.resolve(args.out || "shots/drive");
const landscape = Boolean(args.landscape);
const viewport = landscape ? { width: 844, height: 390 } : { width: 390, height: 844 };

// Each scene, plus the record variants worth looking at.
const TARGETS = [
  { rule: "no-passing-zone" },
  { rule: "double-arrow" },
  { rule: "rough-road" },
  { rule: "flashing-signals" },
  { rule: "parking-clearance" },
  { rule: "parking-clearance", query: "q=U-079", name: "parking-clearance-hydrant" },
  { rule: "parking-clearance", query: "state=OR", name: "parking-clearance-OR" },
].filter((t) => !args.only || t.rule === args.only || t.name === args.only);

const SHOT = { style: "nextjs-portal{display:none!important}" }; // hide the Next.js dev badge
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(page, target) {
  await page.goto(`${BASE}/drive/${target.rule}${target.query ? `?${target.query}` : ""}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-drive-start]", { timeout: 60000 });

}

async function state(page) {
  return page.evaluate(() => window.__drive.state());
}

/** Every path through the scene, read from the live script. */
async function branchesOf(page) {
  return page.evaluate(() => {
    const script = window.__drive.script;
    const out = [];
    const walk = (segmentId, choices) => {
      const next = script.segments[segmentId].next;
      if (next.result) return out.push({ choices, ok: next.result.ok });
      for (const option of script.decisions[next.decision].options) walk(option.segment, [...choices, option.id]);
    };
    walk(script.start, []);
    return out;
  });
}

async function waitFor(page, test, timeout = 90000) {
  const started = Date.now();
  for (;;) {
    const s = await state(page);
    if (test(s)) return s;
    if (Date.now() - started > timeout) throw new Error(`timed out in ${s.seg} (${s.phase})`);
    await sleep(60);
  }
}

async function playBranch(page, target, branch, stats) {
  const name = target.name || target.rule;
  const dir = path.join(OUT, name, branch.choices.join("+") + (branch.ok ? "=ok" : "=fail"));
  fs.mkdirSync(dir, { recursive: true });
  await open(page, target);
  await page.click("[data-drive-start]");
  for (let i = 0; i < branch.choices.length; i++) {
    const script = await page.evaluate(() => window.__drive.script.segments);
    // Wait until time has stopped at the decision, then shoot it.
    await waitFor(page, (s) => s.phase === "decide" && s.t >= script[s.seg].duration - 1e-3);
    await sleep(250);
    await page.screenshot({ ...SHOT, path: path.join(dir, `decision-${i + 1}.png`) });
    await page.click(`[data-drive-option="${branch.choices[i]}"]`);
    const outcome = await waitFor(page, (s) => s.seg.endsWith(`:${branch.choices[i]}`));
    const duration = script[outcome.seg].duration;
    // Shoot the consequence: just after the near miss if the outcome has one, else its middle.
    const hit = (script[outcome.seg].cues || []).find((c) => c.id === "shake");
    const at = hit ? hit.at + 0.1 : duration * 0.5;
    await waitFor(page, (s) => s.seg !== outcome.seg || s.t >= at);
    await page.screenshot({ ...SHOT, path: path.join(dir, i === branch.choices.length - 1 ? "outcome.png" : `outcome-${i + 1}.png`) });
  }
  await waitFor(page, (s) => s.phase === "result");
  await sleep(350);
  await page.screenshot({ ...SHOT, path: path.join(dir, "result.png") });
  stats.push({ scene: name, branch: branch.choices.join("+"), ok: branch.ok, viewport, ...(await page.evaluate(() => window.__drive.stats())) });
}

// CHROME_PATH points at a Chrome when the project's Playwright has no browser of its own.
const executablePath = process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH) ? process.env.CHROME_PATH : undefined;
const browser = await chromium.launch({ executablePath, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const context = await browser.newContext({ viewport, deviceScaleFactor: Number(args.scale || 1), hasTouch: true, isMobile: true });
// Answer the cookie banner up front so it is not in every picture.
await context.addCookies([{ name: "tt-consent", value: "denied", url: BASE }]);
const page = await context.newPage();
page.on("pageerror", (error) => console.error("page error:", error.message));
const stats = [];
let failed = 0;
for (const target of TARGETS) {
  await open(page, target);
  const branches = await branchesOf(page);
  for (const branch of branches) {
    try {
      await playBranch(page, target, branch, stats);
      console.log(`ok   ${target.name || target.rule}  ${branch.choices.join(" > ")}  ${branch.ok ? "(right)" : "(wrong)"}`);
    } catch (error) {
      failed++;
      console.error(`FAIL ${target.name || target.rule}  ${branch.choices.join(" > ")}: ${error.message}`);
    }
  }
}
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, landscape ? "stats-landscape.json" : "stats.json"), JSON.stringify(stats, null, 2));
await browser.close();
console.log(`${stats.length} branches shot to ${OUT}${failed ? `, ${failed} failed` : ""}`);
process.exit(failed ? 1 : 0);
