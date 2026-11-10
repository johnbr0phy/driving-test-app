/**
 * How close are accounts to Firestore's 1 MiB document limit?
 *
 *   FIREBASE_SERVICE_ACCOUNT_KEY='{...}' npx tsx scripts/user-doc-sizes.ts [--top 20]
 *
 * Read-only. A user doc past 1 MiB cannot be saved, so that account's progress
 * stops reaching it. Prints how many accounts are over 50%, 75% and 90% of the
 * limit, the largest ones with what fills them, and what each would weigh
 * once its finished tests are stored the compact way (lib/testHistoryCompact.ts),
 * which happens on that account's next save.
 */
import { getAdminDb } from "@/lib/firebase-admin";
import { compactCompletedTests } from "@/lib/testHistoryCompact";

const LIMIT = 1_048_576;
const bytes = (v: unknown) => Buffer.byteLength(JSON.stringify(v ?? null));
const kb = (n: number) => `${Math.round(n / 1024)} KB`;

async function main() {
  const topArg = process.argv.indexOf("--top");
  const top = topArg > 0 ? Number(process.argv[topArg + 1]) || 20 : 20;
  const db = getAdminDb();
  const rows: { uid: string; size: number; tests: number; testsBytes: number; history: number; historyBytes: number; after: number }[] = [];
  let last: FirebaseFirestore.QueryDocumentSnapshot | undefined;
  let scanned = 0;

  for (;;) {
    let q = db.collection("users").orderBy("__name__").limit(200);
    if (last) q = q.startAfter(last);
    const page = await q.get();
    if (page.empty) break;
    for (const doc of page.docs) {
      const d = doc.data();
      const size = bytes(d);
      scanned++;
      if (size < LIMIT / 4) continue;
      const tests = Array.isArray(d.completedTests) ? d.completedTests : [];
      const testsBytes = bytes(tests);
      const history = Array.isArray(d.trainingAnswerHistory) ? d.trainingAnswerHistory : [];
      rows.push({
        uid: doc.id,
        size,
        tests: tests.length,
        testsBytes,
        history: history.length,
        historyBytes: bytes(history),
        after: size - testsBytes + bytes(compactCompletedTests(tests)),
      });
    }
    last = page.docs[page.docs.length - 1];
  }

  rows.sort((a, b) => b.size - a.size);
  const over = (f: number) => rows.filter((r) => r.size >= LIMIT * f).length;
  const overAfter = (f: number) => rows.filter((r) => r.after >= LIMIT * f).length;
  console.log(`${scanned} accounts read (sizes are JSON bytes, close to what Firestore counts)`);
  console.log(`                 now   after compaction`);
  for (const f of [0.5, 0.75, 0.9, 1]) {
    console.log(`over ${String(Math.round(f * 100)).padStart(3)}%:   ${String(over(f)).padStart(6)}   ${String(overAfter(f)).padStart(6)}`);
  }
  console.log(`\nLargest ${Math.min(top, rows.length)}:`);
  for (const r of rows.slice(0, top)) {
    console.log(
      `${r.uid}  ${kb(r.size)} -> ${kb(r.after)}   ${r.tests} finished tests (${kb(r.testsBytes)}), ${r.history} training answers (${kb(r.historyBytes)})`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
