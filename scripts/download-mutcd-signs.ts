/**
 * Download official MUTCD road sign SVGs from Wikimedia Commons into
 * /public/signs/.
 *
 * Run locally — Wikimedia is blocked from sandboxed environments:
 *   npx tsx scripts/download-mutcd-signs.ts
 *
 * Behavior:
 *   - Skips signs that already have a "real" SVG on disk (>4kb), so re-runs
 *     after a partial / rate-limited run only fetch what's missing.
 *   - 1.5s delay between requests, retries 429s with backoff (10s, 30s, 90s).
 *   - On 404 (filename mismatch), logs and moves on so you can paste the list
 *     back to me to fix the mapping.
 *
 * Optional flags:
 *   ONLY=stop,yield   Only attempt these signIds
 *   FORCE=1           Re-download even if a real SVG already exists
 */

import { writeFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "signs");
const ONLY = process.env.ONLY?.split(",").map((s) => s.trim());
const FORCE = process.env.FORCE === "1";

// Hand-coded SVGs are all <2kb. Real Wikimedia MUTCD SVGs are 5–80kb.
// Anything over this threshold is treated as already-downloaded.
const REAL_SVG_MIN_BYTES = 4096;

const REQUEST_DELAY_MS = 1500;
const RETRY_BACKOFFS_MS = [10_000, 30_000, 90_000];

// signId (matches lib/signImages.ts) -> ordered list of Wikimedia filenames to try.
// Wikimedia is inconsistent about underscore vs no-underscore for L/R variants,
// so we list candidates and use the first that returns 200.
const MUTCD_FILENAMES: Record<string, string[]> = {
  stop: ["MUTCD_R1-1.svg"],
  yield: ["MUTCD_R1-2.svg"],
  "speed-limit": ["MUTCD_R2-1.svg"],
  "do-not-enter": ["MUTCD_R5-1.svg"],
  "wrong-way": ["MUTCD_R5-1a.svg"],
  "one-way": ["MUTCD_R6-1R.svg", "MUTCD_R6-1_R.svg", "MUTCD_R6-2R.svg"],
  "no-u-turn": ["MUTCD_R3-4.svg"],
  "no-turn-on-red": ["MUTCD_R10-11.svg"],
  "school-zone": ["MUTCD_S1-1.svg"],
  "railroad-crossbuck": ["MUTCD_R15-1.svg"],
  "railroad-crossing-circle": ["MUTCD_W10-1.svg"],
  // Iconic yellow diamond — use the simple right-turn warning.
  "warning-diamond": ["MUTCD_W1-1R.svg", "MUTCD_W1-1_R.svg", "MUTCD_W1-1.svg"],
  // "Road Work Ahead" is the most recognizable orange diamond; W21-1 is "Workers".
  "construction-zone": ["MUTCD_W20-1.svg", "MUTCD_W21-1.svg", "MUTCD_W21-1a.svg"],
  "regulatory-rect": ["MUTCD_R7-1.svg"],
  "no-passing-pennant": ["MUTCD_W14-3.svg"],
  "curve-left": ["MUTCD_W1-2L.svg", "MUTCD_W1-2_L.svg"],
  "two-way-traffic": ["MUTCD_W6-3.svg"],
  merge: ["MUTCD_W4-1.svg", "MUTCD_W4-1R.svg"],
  "deer-crossing": ["MUTCD_W11-3.svg"],
  "slippery-road": ["MUTCD_W8-5.svg"],
  "steep-grade": ["MUTCD_W7-1.svg", "MUTCD_W7-1a.svg"],
  "divided-highway": ["MUTCD_W6-1.svg"],
  bumps: ["MUTCD_W8-1.svg"],
  crosswalk: ["MUTCD_W11-2.svg"],
  "handicap-parking": ["MUTCD_R7-8.svg"],
  "hov-lane": ["MUTCD_R3-10.svg", "MUTCD_R3-10a.svg"],
  "keep-right": ["MUTCD_R4-7.svg", "MUTCD_R4-7a.svg"],
  "lane-ends": ["MUTCD_W4-2.svg", "MUTCD_W4-2R.svg"],
  "winding-road": ["MUTCD_W1-5.svg", "MUTCD_W1-5R.svg"],
  "side-road": ["MUTCD_W2-2.svg", "MUTCD_W2-2R.svg"],
  "stop-ahead": ["MUTCD_W3-1.svg"],
  "signal-ahead": ["MUTCD_W3-3.svg"],
  chevron: ["MUTCD_W1-8.svg", "MUTCD_W1-8R.svg"],
  "low-clearance": ["MUTCD_W12-2.svg"],
  "bike-lane": ["MUTCD_D11-1.svg", "MUTCD_R3-17.svg"],
  // signal-flashing-red / signal-flashing-yellow are signal heads, not signs;
  // they have no MUTCD code and stay as their hand-coded versions.
};

const USER_AGENT =
  "TigerTest-AssetDownloader/1.0 (https://tigertest.io; admin@tigertest.io)";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function alreadyDownloaded(signId: string): Promise<boolean> {
  if (FORCE) return false;
  try {
    const s = await stat(join(OUT_DIR, `${signId}.svg`));
    return s.size > REAL_SVG_MIN_BYTES;
  } catch {
    return false;
  }
}

async function fetchWithRetry(url: string): Promise<string> {
  let lastErr: Error | null = null;

  for (let attempt = 0; attempt <= RETRY_BACKOFFS_MS.length; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "image/svg+xml,*/*" },
      redirect: "follow",
    });

    if (res.ok) {
      const text = await res.text();
      if (!text.includes("<svg")) {
        throw new Error("response is not SVG");
      }
      return text;
    }

    // Don't retry 404s — that's a wrong filename, not a transient error
    if (res.status === 404) {
      throw new Error("HTTP 404");
    }

    lastErr = new Error(`HTTP ${res.status}`);
    const backoff = RETRY_BACKOFFS_MS[attempt];
    if (backoff === undefined) break;

    process.stdout.write(`(${res.status}, retry in ${backoff / 1000}s) `);
    await sleep(backoff);
  }

  throw lastErr ?? new Error("unknown error");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const ids = ONLY ?? Object.keys(MUTCD_FILENAMES);
  console.log(`Checking ${ids.length} MUTCD signs in ${OUT_DIR}\n`);

  let ok = 0;
  let skipped = 0;
  const failed: Array<{ id: string; tried: string[]; reason: string }> = [];

  for (const id of ids) {
    const candidates = MUTCD_FILENAMES[id];
    if (!candidates || candidates.length === 0) {
      console.warn(`  ${id}: no MUTCD mapping — skipping`);
      continue;
    }

    if (await alreadyDownloaded(id)) {
      console.log(`  ${id}: already downloaded, skipping`);
      skipped++;
      continue;
    }

    process.stdout.write(`  ${id}... `);

    let downloaded = false;
    let lastReason = "";
    const tried: string[] = [];

    for (const filename of candidates) {
      tried.push(filename);
      const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

      try {
        const text = await fetchWithRetry(url);
        await writeFile(join(OUT_DIR, `${id}.svg`), text);
        console.log(`ok via ${filename} (${(text.length / 1024).toFixed(1)}kb)`);
        ok++;
        downloaded = true;
        break;
      } catch (err) {
        lastReason = (err as Error).message;
        if (lastReason !== "HTTP 404") {
          // Non-404 (likely transient) — don't burn through other candidates
          break;
        }
        // 404: try the next candidate
        await sleep(REQUEST_DELAY_MS);
      }
    }

    if (!downloaded) {
      console.log(`FAILED — ${lastReason} (tried: ${tried.join(", ")})`);
      failed.push({ id, tried, reason: lastReason });
    }

    await sleep(REQUEST_DELAY_MS);
  }

  console.log(
    `\n${ok} downloaded, ${skipped} already had real SVGs, ${failed.length} failed.`,
  );

  if (failed.length > 0) {
    console.log("\nFailures (paste this back if any are 404s):");
    for (const f of failed) {
      console.log(`  ${f.id} (${f.reason}) — tried: ${f.tried.join(", ")}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
