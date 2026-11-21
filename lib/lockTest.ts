// The v1 lock share test (lib/lockTestIds.ts), browser side. Each browser is
// assigned an arm once and keeps it; `?locks=25` or `?locks=50` pins it (for
// previewing). A browser counts once it opens a v1 exam page while not
// Premium (recordLockExposure, from hooks/useExamLocks.ts), and the arm rides
// on the Stripe checkout so the payment records which lock share sold it.
// Results are on the /admin A/B tests tab.

import { auth } from "@/lib/firebase";
import { isInternalBrowser } from "@/lib/internal";
import { LOCK_ARM_SHARE, LOCK_TEST_ID, isLockArm, type LockArm } from "@/lib/lockTestIds";

const KEY = "tigertest-lock-test";

type Stored = { test: string; arm: LockArm; seen?: boolean };

// Used when localStorage is unavailable, so one page view stays consistent.
let memory: Stored | null = null;
// One counted view per exam per page load.
const counted = new Set<string>();

function load(): Stored | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as Stored | null;
    if (parsed?.test === LOCK_TEST_ID && isLockArm(parsed.arm)) return parsed;
  } catch {
    // Fall through to memory.
  }
  return memory;
}

function save(rec: Stored) {
  memory = rec;
  try {
    localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {
    // Memory keeps it for this page view.
  }
}

/** This browser's arm, assigned at random on first call ("25" on the server). */
export function lockArm(): LockArm {
  if (typeof window === "undefined") return "25";
  let rec = load();
  const pinned = new URLSearchParams(window.location.search).get("locks");
  if (isLockArm(pinned) && rec?.arm !== pinned) {
    rec = { test: LOCK_TEST_ID, arm: pinned, seen: rec?.seen };
    save(rec);
  }
  if (!rec) {
    rec = { test: LOCK_TEST_ID, arm: Math.random() < 0.5 ? "25" : "50" };
    save(rec);
  }
  return rec.arm;
}

/** Share of a v1 dashboard this browser sees locked. */
export const lockShare = (): number => LOCK_ARM_SHARE[lockArm()];

/** The arm to send with a checkout, only once this browser has opened a v1 exam page. */
export function lockArmForCheckout(): LockArm | undefined {
  if (typeof window === "undefined") return undefined;
  const rec = load();
  return rec?.seen ? rec.arm : undefined;
}

/** Count one view of a v1 exam page by a browser that is not Premium (and the browser's first, once). */
export async function recordLockExposure(examId: string) {
  if (typeof window === "undefined" || counted.has(examId)) return;
  counted.add(examId);
  const arm = lockArm();
  const rec = load() ?? { test: LOCK_TEST_ID, arm };
  const first = !rec.seen;
  save({ ...rec, arm, seen: true });
  if (isInternalBrowser(auth.currentUser?.email)) return;
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const user = auth.currentUser;
    if (user) {
      try {
        headers.Authorization = `Bearer ${await user.getIdToken()}`;
      } catch {
        // Record as an anonymous view.
      }
    }
    await fetch("/api/analytics/lock-test", {
      method: "POST",
      headers,
      body: JSON.stringify({ test: LOCK_TEST_ID, arm, first, exam: examId }),
      keepalive: true,
    });
  } catch {
    // Analytics must never surface errors to the user.
  }
}
