/**
 * Films mistake explainers into 720x1280 MP4s with their voice, frame by
 * frame from /explainers/frame (every animation is a function of the clock,
 * so no frame is dropped). Needs a running site and ffmpeg.
 *
 *   node scripts/film-mistake-explainers.mjs [--base http://localhost:3000] [--fps 30] [--out dir] [--at 12.5] [--design 3] [ids...]
 *
 * --at writes one PNG at that second instead of a video (for checking a frame).
 * --design 4 films the dark design (/explainers/frame3?d=4), mixed like 3;
 * --design khan|osmosis|cartoon films a whole-frame style try (?s=<name>).
 * --design 3 films the premium pass (/explainers/frame3) and mixes the music
 * bed (ducked under the voice) and the scene's sound cues from
 * public/mistake-explainers/sfx/.
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
const design = opt("--design", "2");
// any other design name is a whole-frame style try: /explainers/frame3?s=<name>
const styleTry = !["2", "3", "4"].includes(design);
const route = design === "2" ? "frame" : "frame3";
const routeQuery = design === "4" ? "&d=4" : styleTry ? `&s=${design}` : "";
const G = design === "2" ? "__mx" : "__mx3";
const ids = args.length ? args : ["dmv-double-arrow", "dmv-pennant", "part107-class-b", "part107-metar"];
mkdirSync(out, { recursive: true });

// CHROME_PATH points at a browser when the installed Playwright has none of its own.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1 });
for (const id of ids) {
  await page.goto(`${base}/explainers/${route}?v=${id}${routeQuery}`, { waitUntil: "networkidle" });
  await page.waitForFunction((g) => !!window[g], G, { timeout: 60000 });
  // Hide the dev server's overlay badge when filming from next dev.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important} html,body{overflow:hidden!important} ::-webkit-scrollbar{display:none}" });
  const frame = page.locator("#mx-frame");
  if (at !== null) {
    await page.evaluate(([g, t]) => window[g].setT(t), [G, Number(at)]);
    await page.waitForTimeout(150);
    await frame.screenshot({ path: join(out, `${id}-${at}.png`) });
    console.log(`${id}: frame at ${at}s`);
    continue;
  }
  const duration = await page.evaluate((g) => window[g].manifest.duration, G);
  const cues = await page.evaluate((g) => window[g].cues ?? [], G);
  const dir = mkdtempSync(join(tmpdir(), `mx-${id}-`));
  const n = Math.ceil(duration * fps);
  // Let the tiger images load once before the run.
  await page.evaluate((g) => window[g].setT(1), G);
  await page.waitForTimeout(800);
  for (let i = 0; i < n; i++) {
    await page.evaluate(([g, t]) => window[g].setT(t), [G, i / fps]);
    await frame.screenshot({ path: join(dir, `f${String(i).padStart(5, "0")}.png`) });
    if (i % (fps * 5) === 0) process.stdout.write(`\r${id}: ${(i / fps).toFixed(0)}/${duration.toFixed(0)}s`);
  }
  const mp4 = join(out, design === "3" ? `${id}-premium.mp4` : design === "2" ? `${id}.mp4` : `${id}-${design === "4" ? "v4" : design}.mp4`);
  // Audio: the voice alone, or (premium) voice + ducked music bed + cues.
  const sfx = "public/mistake-explainers/sfx";
  const audioIn = ["-i", `public/mistake-explainers/${id}.mp3`];
  let audioArgs = ["-af", "apad,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000"];
  if (design !== "2") {
    audioIn.push("-i", `${sfx}/bed.mp3`);
    for (const c of cues) audioIn.push("-i", `${sfx}/${c.s}.mp3`);
    const GAIN = { pop: 0.22, pencil: 0.26, chime: 0.4 };
    const parts = [
      "[1:a]aresample=48000,apad,asplit=2[v][vsc]",
      // the bed: quiet, a little room, ducked whenever the voice speaks
      `[2:a]aresample=48000,volume=0.16,aecho=0.8:0.6:70|140:0.25|0.15,afade=t=out:st=${Math.max(0, duration - 2.5).toFixed(2)}:d=2.5[bedr]`,
      "[bedr][vsc]sidechaincompress=threshold=0.02:ratio=4:attack=30:release=600[bed]",
    ];
    const labels = ["[v]", "[bed]"];
    cues.forEach((c, i) => {
      const ms = Math.max(0, Math.round(c.t * 1000));
      parts.push(`[${3 + i}:a]aresample=48000,volume=${(GAIN[c.s] * (c.gain ?? 1)).toFixed(3)},adelay=${ms}|${ms}[c${i}]`);
      labels.push(`[c${i}]`);
    });
    parts.push(`${labels.join("")}amix=inputs=${labels.length}:normalize=0:duration=first,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[a]`);
    audioArgs = ["-filter_complex", parts.join(";"), "-map", "0:v", "-map", "[a]"];
  }
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error",
    "-framerate", String(fps), "-i", join(dir, "f%05d.png"),
    ...audioIn,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium",
    // Stereo 48 kHz at -16 LUFS: mono AAC plays silent in some phone and in-app players.
    "-c:a", "aac", "-b:a", "160k", "-ac", "2", ...audioArgs,
    "-t", String(duration), "-movflags", "+faststart", mp4,
  ]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`\r${id}: ${mp4} (${duration.toFixed(1)}s)`);
}
await browser.close();
