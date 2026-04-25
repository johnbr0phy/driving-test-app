/**
 * Download official MUTCD road sign SVGs from Wikimedia Commons into
 * /public/signs/, overwriting any existing files.
 *
 * Run locally — Wikimedia is blocked from CI/sandboxed environments:
 *   npx tsx scripts/download-mutcd-signs.ts
 *
 * Optional flags:
 *   ONLY=stop,yield   Only download these signIds
 *   FORCE=0           Skip files that already exist (default: overwrite)
 *
 * Wikimedia's Special:FilePath endpoint redirects to the actual file URL.
 * Their User-Agent policy requires a contact string.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "signs");
const ONLY = process.env.ONLY?.split(",").map((s) => s.trim());
const FORCE = process.env.FORCE !== "0";

// signId (matches lib/signImages.ts) -> Wikimedia filename
const MUTCD_FILENAMES: Record<string, string> = {
  stop: "MUTCD_R1-1.svg",
  yield: "MUTCD_R1-2.svg",
  "speed-limit": "MUTCD_R2-1.svg",
  "do-not-enter": "MUTCD_R5-1.svg",
  "wrong-way": "MUTCD_R5-1a.svg",
  "one-way": "MUTCD_R6-1R.svg",
  "no-u-turn": "MUTCD_R3-4.svg",
  "no-turn-on-red": "MUTCD_R10-11.svg",
  "school-zone": "MUTCD_S1-1.svg",
  "railroad-crossbuck": "MUTCD_R15-1.svg",
  "railroad-crossing-circle": "MUTCD_W10-1.svg",
  "warning-diamond": "MUTCD_W1-2_R.svg",
  "construction-zone": "MUTCD_W21-1.svg",
  "regulatory-rect": "MUTCD_R7-1.svg",
  "no-passing-pennant": "MUTCD_W14-3.svg",
  "curve-left": "MUTCD_W1-2_L.svg",
  "two-way-traffic": "MUTCD_W6-3.svg",
  merge: "MUTCD_W4-1.svg",
  "deer-crossing": "MUTCD_W11-3.svg",
  "slippery-road": "MUTCD_W8-5.svg",
  "steep-grade": "MUTCD_W7-1.svg",
  "divided-highway": "MUTCD_W6-1.svg",
  bumps: "MUTCD_W8-1.svg",
  crosswalk: "MUTCD_W11-2.svg",
  "handicap-parking": "MUTCD_R7-8.svg",
  "hov-lane": "MUTCD_R3-10.svg",
  "keep-right": "MUTCD_R4-7.svg",
  "lane-ends": "MUTCD_W4-2.svg",
  "winding-road": "MUTCD_W1-5.svg",
  "side-road": "MUTCD_W2-2.svg",
  "stop-ahead": "MUTCD_W3-1.svg",
  "signal-ahead": "MUTCD_W3-3.svg",
  chevron: "MUTCD_W1-8.svg",
  "low-clearance": "MUTCD_W12-2.svg",
  "bike-lane": "MUTCD_D11-1.svg",
  // signal-flashing-red and signal-flashing-yellow are signal heads, not signs.
  // Wikimedia doesn't have direct MUTCD entries for these — they stay as the
  // existing hand-coded SVGs unless you replace them manually.
};

const USER_AGENT =
  "TigerTest-AssetDownloader/1.0 (https://tigertest.io; admin@tigertest.io)";

async function downloadOne(signId: string, filename: string) {
  const outPath = join(OUT_DIR, `${signId}.svg`);
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "image/svg+xml,*/*" },
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const text = await res.text();
  if (!text.includes("<svg")) {
    throw new Error("response is not SVG");
  }

  await writeFile(outPath, text);
  return text.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const ids = ONLY ?? Object.keys(MUTCD_FILENAMES);
  console.log(`Downloading ${ids.length} MUTCD signs to ${OUT_DIR}\n`);

  let ok = 0;
  let fail = 0;

  for (const id of ids) {
    const filename = MUTCD_FILENAMES[id];
    if (!filename) {
      console.warn(`  ${id}: no MUTCD mapping — skipping`);
      continue;
    }

    process.stdout.write(`  ${id} (${filename})... `);
    try {
      const bytes = await downloadOne(id, filename);
      console.log(`ok (${(bytes / 1024).toFixed(1)}kb)`);
      ok++;
    } catch (err) {
      console.log(`FAILED — ${(err as Error).message}`);
      fail++;
    }

    // Be polite to Wikimedia
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(`\nDone. ${ok} ok, ${fail} failed.`);
  if (!FORCE) {
    console.log("(FORCE=0 was set, but this script always overwrites)");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
