import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";

// ─── Enrolled per exam ───────────────────────────────────────────────────────
// "Enrolled" on the /admin Growth tab = distinct people who answered at least one question
// in an exam. Each (exam, person) is one doc in the enrollments collection,
// keyed by uid when signed in or by a random browser id for guests, so the
// count is unique by construction. Signing in claims the browser's guest
// docs (the server deletes them and writes the uid's), so a guest who signs
// up counts once. A localStorage record keeps each pair to one request.

const KEY = "tigertest-enrolled";

type EnrollRecord = { browserId: string; seen: string[]; sent: Record<string, string[]> };

function load(): EnrollRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<EnrollRecord>) : {};
    return {
      browserId: typeof parsed.browserId === "string" ? parsed.browserId : crypto.randomUUID(),
      seen: Array.isArray(parsed.seen) ? parsed.seen : [],
      sent: parsed.sent && typeof parsed.sent === "object" ? parsed.sent : {},
    };
  } catch {
    // Storage blocked: skip rather than count the same browser on every answer.
    return null;
  }
}

function save(rec: EnrollRecord) {
  try {
    localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {
    // Best effort.
  }
}

const inFlight = new Set<string>();

async function send(exams: string[]) {
  if (typeof window === "undefined" || exams.length === 0) return;
  const user = auth.currentUser;
  if (isInternalBrowser(user?.email)) return;
  const rec = load();
  if (!rec) return;
  const identity = user?.uid ?? "guest";
  const sent = new Set(rec.sent[identity] ?? []);
  for (const e of exams) if (!rec.seen.includes(e)) rec.seen.push(e);
  save(rec);
  const todo = exams.filter((e) => !sent.has(e) && !inFlight.has(`${identity}:${e}`));
  if (todo.length === 0) return;
  todo.forEach((e) => inFlight.add(`${identity}:${e}`));
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (user) headers.Authorization = `Bearer ${await user.getIdToken()}`;
    const res = await fetch("/api/analytics/enrollment", {
      method: "POST",
      headers,
      body: JSON.stringify({ exams: todo, browserId: rec.browserId }),
      keepalive: true,
    });
    if (res.ok) {
      const latest = load() ?? rec;
      latest.sent[identity] = [...new Set([...(latest.sent[identity] ?? []), ...todo])];
      save(latest);
    }
  } catch {
    // Retried on the next answer in that exam.
  } finally {
    todo.forEach((e) => inFlight.delete(`${identity}:${e}`));
  }
}

/** First answer in an exam on this browser, per signed-in identity. */
export function trackEnrollment(examKey: string) {
  void send([examKey]);
}

/** On sign-in: move every exam this browser answered as a guest onto the account. */
export function claimEnrollments() {
  const rec = typeof window === "undefined" ? null : load();
  if (rec && rec.seen.length > 0) void send(rec.seen);
}
