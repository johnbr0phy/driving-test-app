// Shared by the client (lib/lockTest.ts) and the server routes that record
// the v1 lock share test: no client imports here.
//
// Half of browsers see the usual v1 exam locks (the last quarter of the
// dashboard, arm "25"), half see the last half locked (arm "50"), to learn
// whether locking more sells more Premium per visitor. v1 registry exams only;
// the DMV and v2 exams keep their own rules.
export const LOCK_TEST_ID = "lockShare1";
export const LOCK_ARMS = ["25", "50"] as const;
export type LockArm = (typeof LOCK_ARMS)[number];

/** Share of a v1 dashboard's steps that need Premium in each arm. */
export const LOCK_ARM_SHARE: Record<LockArm, number> = { "25": 0.25, "50": 0.5 };

/** The largest share any arm locks: content that must be free for everyone (landing cards) stays below it. */
export const LOCK_MAX_SHARE = Math.max(...Object.values(LOCK_ARM_SHARE));

export const isLockArm = (v: unknown): v is LockArm =>
  typeof v === "string" && (LOCK_ARMS as readonly string[]).includes(v);
