/**
 * Films mistake explainers into 720x1280 MP4s with their voice, frame by
 * frame from /explainers/frame (every animation is a function of the clock,
 * so no frame is dropped). Needs a running site and ffmpeg.
 *
 *   node scripts/film-mistake-explainers.mjs [--base http://localhost:3000] [--fps 30] [--out dir] [--at 12.5] [ids...]
 *
 * --at writes one PNG at that second instead of a video (for checking a frame).
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  if (i < 0) return def;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const base = opt("--base", "http://localhost:3000");
const fps = Number(opt("--fps", "30"));
const out = resolve(opt("--out", "out/mistake-explainers"));
const at = opt("--at", null);
const ids = args.length ? args : ["dmv-double-arrow", "dmv-pennant", "part107-class-b", "part107-metar"];
mkdirSync(out, { recursive: true });

// CHROME_PATH points at a browser when the installed Playwright has none of its own.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1 });
for (const id of ids) {
  await page.goto(`${base}/explainers/frame?v=${id}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => !!window.__mx, null, { timeout: 60000 });
  // Hide the dev server's overlay badge when filming from next dev.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  const frame = page.locator("#mx-frame");
  if (at !== null) {
    await page.evaluate((t) => window.__mx.setT(t), Number(at));
    await page.waitForTimeout(150);
    await frame.screenshot({ path: join(out, `${id}-${at}.png`) });
    console.log(`${id}: frame at ${at}s`);
    continue;
  }
  const duration = await page.evaluate(() => window.__mx.manifest.duration);
  const dir = mkdtempSync(join(tmpdir(), `mx-${id}-`));
  const n = Math.ceil(duration * fps);
  // Let the tiger images load once before the run.
  await page.evaluate(() => window.__mx.setT(1));
  await page.waitForTimeout(800);
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.__mx.setT(t), i / fps);
    await frame.screenshot({ path: join(dir, `f${String(i).padStart(5, "0")}.png`) });
    if (i % (fps * 5) === 0) process.stdout.write(`\r${id}: ${(i / fps).toFixed(0)}/${duration.toFixed(0)}s`);
  }
  const mp4 = join(out, `${id}.mp4`);
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-framerate", String(fps), "-i", join(dir, "f%05d.png"),
    "-i", `public/mistake-explainers/${id}.mp3`,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "medium",
    "-c:a", "aac", "-b:a", "128k", "-af", "apad",
    "-t", String(duration), "-movflags", "+faststart", mp4,
  ]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`\r${id}: ${mp4} (${duration.toFixed(1)}s)`);
}
await browser.close();
