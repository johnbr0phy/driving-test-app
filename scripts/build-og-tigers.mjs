#!/usr/bin/env node
// Small copies of every tiger face for the OG image functions.
//
// The score card (app/api/og/score-card) and the exam OG card (app/og/[examId])
// draw a tiger at 360-420 px, but public/tigers/ holds 512 px PNGs and grows by
// a set with every new exam. Tracing public/tigers into those functions pushed
// them over Vercel's 250 MB limit, so they read these copies instead, from
// assets/og-tigers/ (outside public/, so they are never served or traced by
// anything else):
//
//   public/tigers/<set>/tiger_face_NN.png -> assets/og-tigers/<set>/tiger_face_NN.png
//   public/tiger_face_NN.png              -> assets/og-tigers/site/tiger_face_NN.png
//
// Usage:
//   node scripts/build-og-tigers.mjs           build missing or out-of-date copies
//   node scripts/build-og-tigers.mjs --force   rebuild everything
//   node scripts/build-og-tigers.mjs --check   exit 1 if any face has no copy (or a copy of a deleted face)

import { readdir, mkdir, stat, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SIZE = 256;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "assets", "og-tigers");
const FACE = /^tiger_face_0[1-8]\.png$/;

const args = new Set(process.argv.slice(2));
const check = args.has("--check");
const force = args.has("--force");

/** Every [source, destination] pair the OG routes may ask for. */
async function pairs() {
  const list = [];
  for (const f of (await readdir(PUBLIC)).filter(f => FACE.test(f)).sort()) {
    list.push([join(PUBLIC, f), join(OUT, "site", f)]);
  }
  const sets = (await readdir(join(PUBLIC, "tigers"), { withFileTypes: true }))
    .filter(d => d.isDirectory()).map(d => d.name).sort();
  for (const set of sets) {
    for (const f of (await readdir(join(PUBLIC, "tigers", set))).filter(f => FACE.test(f)).sort()) {
      list.push([join(PUBLIC, "tigers", set, f), join(OUT, set, f)]);
    }
  }
  return list;
}

/** Copies in assets/og-tigers whose source face is gone. */
async function orphans(expected) {
  if (!existsSync(OUT)) return [];
  const want = new Set(expected.map(([, d]) => d));
  const found = [];
  for (const dir of await readdir(OUT, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const f of await readdir(join(OUT, dir.name))) {
      const p = join(OUT, dir.name, f);
      if (!want.has(p)) found.push(p);
    }
  }
  return found;
}

async function isStale(src, dst) {
  if (!existsSync(dst)) return true;
  return (await stat(src)).mtimeMs > (await stat(dst)).mtimeMs;
}

const list = await pairs();
const extra = await orphans(list);
const rel = p => relative(ROOT, p);

if (check) {
  const missing = list.filter(([, d]) => !existsSync(d));
  // One line per set: a new set is eight missing files, not eight errors.
  const bySet = new Map();
  for (const [s] of missing) {
    const set = rel(dirname(s));
    bySet.set(set, [...(bySet.get(set) ?? []), s.slice(-6, -4)]);
  }
  for (const [set, faces] of bySet) console.error(`missing small copies: ${set} (faces ${faces.join(", ")})`);
  for (const p of extra) console.error(`orphaned small copy: ${rel(p)}`);
  if (missing.length || extra.length) {
    console.error("\nRun: node scripts/build-og-tigers.mjs");
    process.exit(1);
  }
  console.log(`OK: ${list.length} tiger faces have small copies in assets/og-tigers/`);
  process.exit(0);
}

let built = 0;
for (const [src, dst] of list) {
  if (!force && !(await isStale(src, dst))) continue;
  await mkdir(dirname(dst), { recursive: true });
  await sharp(src)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ palette: true, colors: 256, dither: 1, compressionLevel: 9, effort: 10 })
    .toFile(dst);
  built++;
}
for (const p of extra) await rm(p);
console.log(`Built ${built} of ${list.length} faces at ${SIZE}px; removed ${extra.length} orphans.`);
