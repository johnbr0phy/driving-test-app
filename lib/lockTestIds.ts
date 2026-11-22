// Shared by the client (lib/lockTest.ts) and the server routes that record
// the v1 lock share test: no client imports here.
//
// Ended Nov 22 2026: the 50% arm became LOCKED_SHARE for everyone
// (lib/examLocks.ts). Kept so old payments and the A/B tab card still read.
//
// Half of browsers saw the usual v1 exam locks (the last quarter of the
// dashboard, arm "25"), half see the last half locked (arm "50"), to learn
// whether locking more sells more Premium per visitor. v1 registry exams only;
// the DMV and v2 exams keep their own rules.
export const LOCK_TEST_ID = "lockShare1";
export const LOCK_ARMS = ["25", "50"] as const;
export type LockArm = (typeof LOCK_ARMS)[number];

/** Share of a v1 dashboard's steps that need Premium in each arm. */
export const LOCK_ARM_SHARE: Record<LockArm, number> = { "25": 0.25, "50": 0.5 };

export const isLockArm = (v: unknown): v is LockArm =>
  typeof v === "string" && (LOCK_ARMS as readonly string[]).includes(v);
