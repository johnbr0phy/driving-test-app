/**
 * Cron: source watch. Schedule: daily at 04:10 UTC (vercel.json).
 *
 * The official pages each bank was written from (lib/examSources.json, built
 * from tools/**\/sources.md and lib/examFreshness.json by
 * tools/build_exam_sources.py) are fetched a seventh a day, so every page is
 * read once a week. Each page is reduced to its sentences of 40+ characters,
 * hashed one by one; a page counts as changed when 5% or more of those
 * sentences are new or gone since the last baseline, which ignores the dates
 * and news widgets that change on every visit. A PDF or other file is
 * compared by its bytes. Results live in sourceWatch/{sha1(url)}: the
 * baseline, the latest check, changed (until someone marks it reviewed on
 * the /admin Questions tab, which takes the latest as the new baseline) and
 * failures in a row.
 */
import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import SOURCES from "@/lib/examSources.json";

export const maxDuration = 300;
const CHANGE_RATIO = 0.05;
const MAX_SENTENCES = 3000;
const CONCURRENCY = 8;
const TIMEOUT_MS = 20_000;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

const sha1 = (s: string | Buffer) => createHash("sha1").update(s).digest("hex");

function sentences(html: string): string[] {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<(br|\/p|\/li|\/h\d|\/td|\/tr|\/div)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#?\w+;/g, " ");
  const out = new Set<string>();
  for (const part of text.split(/(?<=[.!?])\s+|\n+/)) {
    const s = part.replace(/\s+/g, " ").trim();
    if (s.length >= 40) out.add(sha1(s.toLowerCase()).slice(0, 10));
    if (out.size >= MAX_SENTENCES) break;
  }
  return [...out];
}

interface Fingerprint {
  kind: "text" | "bytes";
  hash: string;
  sentences?: string[];
}

async function fingerprint(url: string): Promise<{ ok: true; fp: Fingerprint; status: number } | { ok: false; status: number; error: string }> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "TigertestSourceWatch/1.0 (+https://www.tigertest.io/about)", accept: "text/html,application/pdf;q=0.9,*/*;q=0.5" },
    });
    if (!res.ok) return { ok: false, status: res.status, error: `HTTP ${res.status}` };
    const type = res.headers.get("content-type") || "";
    if (type.includes("html") || type.includes("text/plain")) {
      const list = sentences(await res.text());
      return { ok: true, status: res.status, fp: { kind: "text", hash: sha1(list.join(",")), sentences: list } };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return { ok: true, status: res.status, fp: { kind: "bytes", hash: sha1(buf) } };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message.slice(0, 120) : "fetch failed" };
  }
}

/** Share of sentences added or removed (0 to 1). */
function changeRatio(a: Fingerprint, b: Fingerprint): number {
  if (a.kind !== b.kind) return 1;
  if (a.hash === b.hash) return 0;
  if (a.kind === "bytes" || !a.sentences || !b.sentences) return 1;
  const A = new Set(a.sentences);
  const B = new Set(b.sentences);
  let diff = 0;
  for (const s of A) if (!B.has(s)) diff++;
  for (const s of B) if (!A.has(s)) diff++;
  const union = new Set([...A, ...B]).size || 1;
  return diff / union;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminDb();
  const all: { exam: string; url: string }[] = [];
  for (const [exam, urls] of Object.entries(SOURCES as Record<string, string[]>)) {
    for (const url of urls) all.push({ exam, url });
  }
  // ?all=1 checks everything at once (first run); otherwise today's seventh.
  const slice = req.nextUrl.searchParams.get("all") === "1" ? null : new Date().getUTCDay();
  const today = slice === null ? all : all.filter((s) => parseInt(sha1(s.url).slice(0, 4), 16) % 7 === slice);

  let changed = 0;
  let failed = 0;
  let baselined = 0;
  const now = new Date().toISOString();
  const queue = [...today];
  const work = async () => {
    for (let item = queue.shift(); item; item = queue.shift()) {
      const ref = db.collection("sourceWatch").doc(sha1(item.url));
      const [snap, result] = await Promise.all([ref.get(), fingerprint(item.url)]);
      const prev = snap.data() as { baseline?: Fingerprint; exams?: string[]; failures?: number; changed?: boolean } | undefined;
      const exams = [...new Set([...(prev?.exams || []), item.exam])];
      if (!result.ok) {
        failed++;
        await ref.set({ url: item.url, exams, checkedAt: now, status: result.status, error: result.error, failures: (prev?.failures || 0) + 1 }, { merge: true });
        continue;
      }
      if (!prev?.baseline) {
        baselined++;
        await ref.set({ url: item.url, exams, baseline: result.fp, baselineAt: now, latest: result.fp, checkedAt: now, status: result.status, error: null, failures: 0, changed: false, ratio: 0 });
        continue;
      }
      const ratio = changeRatio(prev.baseline, result.fp);
      const isChanged = ratio >= CHANGE_RATIO;
      if (isChanged && !prev.changed) changed++;
      await ref.set(
        {
          url: item.url,
          exams,
          latest: result.fp,
          checkedAt: now,
          status: result.status,
          error: null,
          failures: 0,
          ratio: Math.round(ratio * 1000) / 1000,
          changed: isChanged || prev.changed === true,
          ...(isChanged && !prev.changed && { changedAt: now }),
        },
        { merge: true },
      );
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, work));
  console.log(`[source-watch] checked ${today.length} of ${all.length}: ${changed} newly changed, ${baselined} new, ${failed} failed`);
  return NextResponse.json({ checked: today.length, of: all.length, newlyChanged: changed, baselined, failed });
}
