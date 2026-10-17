/**
 * Drives /api/admin/backfill-questions to completion. Each call scans one
 * time-boxed chunk of users and returns { done: false } until the last one;
 * { busy: true } means another tab holds the run, so wait and try again.
 * Resolves true once the seed has written its history, false if it gave up
 * (the next admin page load picks the run up where it stopped).
 */
const MAX_CALLS = 60;
const BUSY_WAIT_MS = 5_000;

export async function runQuestionsBackfill(getIdToken: () => Promise<string>): Promise<boolean> {
  for (let i = 0; i < MAX_CALLS; i++) {
    const res = await fetch("/api/admin/backfill-questions", {
      method: "POST",
      headers: { Authorization: `Bearer ${await getIdToken()}` },
    });
    if (!res.ok) return false;
    const body = (await res.json().catch(() => ({}))) as { done?: boolean; busy?: boolean };
    if (body.done) return true;
    if (body.busy) await new Promise((r) => setTimeout(r, BUSY_WAIT_MS));
  }
  return false;
}
