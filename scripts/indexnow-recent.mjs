#!/usr/bin/env node
// Sends the live site's recently changed pages to IndexNow (Bing, which
// ChatGPT search reads). Run by .github/workflows/indexnow.yml after every
// production deploy, so new exam landings reach Bing within minutes instead
// of waiting for the nightly cron.
//
// Needs no secrets: it reads the public sitemap and the public IndexNow key
// (/api/indexnow/key, the same value Bing verifies at /<key>.txt).
//
//   node scripts/indexnow-recent.mjs            # lastmod within 2 days
//   node scripts/indexnow-recent.mjs --days 7
//   node scripts/indexnow-recent.mjs --dry-run

import { createRequire } from "node:module";
import { join } from "node:path";
import { lastRunFields, mergeSent, runRecord, RUNS_COLLECTION, SENT_COLLECTION, SENT_DOC } from "../lib/indexNowSent.mjs";

const SITE = process.env.SITE_URL || "https://www.tigertest.io";
const args = process.argv.slice(2);
const daysArg = args.indexOf("--days");
const days = daysArg >= 0 ? Number(args[daysArg + 1]) : Number(process.env.INDEXNOW_DAYS || 2);
const dryRun = args.includes("--dry-run");
const MAX_URLS = 10_000;

async function text(url) {
  const res = await fetch(url, { headers: { "User-Agent": "TigertestIndexNow/1.0" } });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return res.text();
}

function tags(xml, tag) {
  return [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map((m) => m[1].trim());
}

function entries(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    url: tags(m[1], "loc")[0],
    lastmod: (tags(m[1], "lastmod")[0] || "").slice(0, 10),
  }));
}

const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);

const index = await text(`${SITE}/sitemap.xml`);
const segments = tags(index, "loc");
const urls = new Set();
for (const segment of segments) {
  for (const e of entries(await text(segment))) {
    if (e.url && e.lastmod >= cutoff) urls.add(e.url);
  }
}
const list = [...urls].slice(0, MAX_URLS);
console.log(`${list.length} URLs with lastmod on or after ${cutoff} across ${segments.length} sitemaps`);
for (const u of list.slice(0, 50)) console.log(`  ${u}`);
if (list.length > 50) console.log(`  ...and ${list.length - 50} more`);

if (list.length === 0 || dryRun) process.exit(0);

const key = (await text(`${SITE}/api/indexnow/key`)).trim();
if (!/^[0-9a-fA-F]{8,128}$/.test(key)) throw new Error("IndexNow key not served");

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList: list,
  }),
});
console.log(`IndexNow answered ${res.status}`);
await record(list, res.status, res.ok);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}

// Keeps the run for the /admin New tests tab (lib/indexNowSent.mjs). Needs
// FIREBASE_SERVICE_ACCOUNT_KEY and firebase-admin installed in
// FIREBASE_ADMIN_DIR (the workflow installs it); without them it is skipped,
// and a failed write never fails the run, since the pages have gone to Bing.
async function record(urls, status, ok) {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const dir = process.env.FIREBASE_ADMIN_DIR;
  if (!key || !dir) {
    console.log("Not recorded: FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_ADMIN_DIR not set");
    return;
  }
  try {
    const req = createRequire(join(dir, "noop.js"));
    const { initializeApp, cert } = req("firebase-admin/app");
    const { getFirestore } = req("firebase-admin/firestore");
    const creds = JSON.parse(key);
    const db = getFirestore(initializeApp({ credential: cert(creds), projectId: creds.project_id }));
    const at = new Date().toISOString();
    const sentRef = db.collection(SENT_COLLECTION).doc(SENT_DOC);
    if (ok) {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(sentRef);
        tx.set(sentRef, { urls: mergeSent(snap.get("urls") || {}, urls, at), updatedAt: at }, { merge: true });
      });
    }
    const source = process.env.GITHUB_EVENT_NAME === "workflow_dispatch" ? "manual" : "deploy";
    const run = runRecord({ source, urls, status, ok, at, days, sha: process.env.GITHUB_SHA || null });
    await db.collection(RUNS_COLLECTION).add(run);
    await sentRef.set(lastRunFields(source, run), { merge: true });
    console.log(`Recorded ${urls.length} pages for /admin`);
  } catch (e) {
    console.log(`Not recorded: ${e instanceof Error ? e.message : e}`);
  }
}
