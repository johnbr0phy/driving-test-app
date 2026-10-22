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

type EnrollRecord = { browserId: string; seen: string[]; sent: Record<string, string[]>; linkedUid?: string };

function load(): EnrollRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<EnrollRecord>) : {};
    const storedId = typeof parsed.browserId === "string" ? parsed.browserId : "";
    const hadId = storedId.length > 0;
    const rec: EnrollRecord = {
      browserId: hadId ? storedId : crypto.randomUUID(),
      seen: Array.isArray(parsed.seen) ? parsed.seen : [],
      sent: parsed.sent && typeof parsed.sent === "object" ? parsed.sent : {},
      linkedUid: typeof parsed.linkedUid === "string" ? parsed.linkedUid : undefined,
    };
    // Persist a new id immediately so a later answer flush uses the same one.
    if (!hadId) save(rec);
    return rec;
  } catch {
    // Storage blocked: skip rather than count the same browser on every answer.
    return null;
  }
}

/** Stable logged-out id for this browser. Same id enrollments already use. */
export function getBrowserId(): string | null {
  return load()?.browserId ?? null;
}

function save(rec: EnrollRecord) {
  try {
    localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {
    // Best effort.
  }
}

const inFlight = new Set<string>();
let linkInFlight = false;

async function send(exams: string[], link = false) {
  if (typeof window === "undefined") return;
  const user = auth.currentUser;
  if (isInternalBrowser(user?.email)) return;
  const rec = load();
  if (!rec) return;
  const identity = user?.uid ?? "guest";
  const sent = new Set(rec.sent[identity] ?? []);
  for (const e of exams) if (!rec.seen.includes(e)) rec.seen.push(e);
  save(rec);
  const todo = exams.filter((e) => !sent.has(e) && !inFlight.has(`${identity}:${e}`));
  // Signup links this browser to the account even when every exam was already sent.
  const needLink = link && !!user && rec.linkedUid !== user.uid && !linkInFlight;
  if (todo.length === 0 && !needLink) return;
  todo.forEach((e) => inFlight.add(`${identity}:${e}`));
  if (needLink) linkInFlight = true;
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
      if (todo.length > 0) {
        latest.sent[identity] = [...new Set([...(latest.sent[identity] ?? []), ...todo])];
      }
      if (needLink && user) latest.linkedUid = user.uid;
      save(latest);
    }
  } catch {
    // Retried on the next answer in that exam, or the next sign-in.
  } finally {
    todo.forEach((e) => inFlight.delete(`${identity}:${e}`));
    if (needLink) linkInFlight = false;
  }
}

/** First answer in an exam on this browser, per signed-in identity. */
export function trackEnrollment(examKey: string) {
  void send([examKey], !!auth.currentUser);
}

/**
 * On sign-in: move every exam this browser answered as a guest onto the
 * account, and link the browser id to the uid so Weekly Active Learners
 * counts that person once.
 */
export function claimEnrollments() {
  const user = auth.currentUser;
  const rec = typeof window === "undefined" ? null : load();
  if (!user || !rec || isInternalBrowser(user.email)) return;
  const needLink = rec.linkedUid !== user.uid;
  if (rec.seen.length === 0 && !needLink) return;
  void send(rec.seen, needLink);
}
