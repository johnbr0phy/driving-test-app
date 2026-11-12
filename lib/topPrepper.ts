// The "top prepper" email (/api/cron/top-prepper): someone who has answered
// more questions than most people on Tigertest, saw a paywall and did not buy,
// gets their own numbers and a link that opens the unlock. The rules live
// here, apart from Firestore, so tests can pin them.

/** Fewer answers than this is never "top", whatever the percentile says. */
export const TOP_PREPPER_MIN_ANSWERS = 100;
/** They must have answered more than this share of people who practise. */
export const TOP_PREPPER_MIN_PCT = 75;
/** One account in this many gets no email, to measure what the email adds. */
export const TOP_PREPPER_HOLDOUT_ONE_IN = 10;
/** A purchase within this many days of the send (or holdout stamp) counts. */
export const TOP_PREPPER_WINDOW_DAYS = 7;

/**
 * Share (0 to 100) of the population with strictly fewer answers.
 * `sortedAscending` is every account's answer count, zero answers left out.
 */
export function percentBelow(sortedAscending: number[], answers: number): number {
  if (sortedAscending.length === 0) return 0;
  let lo = 0;
  let hi = sortedAscending.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sortedAscending[mid] < answers) lo = mid + 1;
    else hi = mid;
  }
  return (lo / sortedAscending.length) * 100;
}

/**
 * The claim the email may make, or null when the person is not a top
 * prepper. Rounded down and capped at 99, so it never overstates.
 */
export function topPrepperPct(sortedAscending: number[], answers: number): number | null {
  if (answers < TOP_PREPPER_MIN_ANSWERS) return null;
  const pct = Math.min(99, Math.floor(percentBelow(sortedAscending, answers)));
  return pct >= TOP_PREPPER_MIN_PCT ? pct : null;
}

/** Stable per account: the same uid is always in or out of the holdout. */
export function inTopPrepperHoldout(uid: string): boolean {
  let h = 2166136261;
  for (let i = 0; i < uid.length; i++) {
    h ^= uid.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % TOP_PREPPER_HOLDOUT_ONE_IN === 0;
}

export type TopPrepperGroup = "sent" | "holdout";

export interface TopPrepperResult {
  sent: number;
  sentPaid: number;
  /** Still inside the window, so not yet a fair comparison. */
  sentOpen: number;
  holdout: number;
  holdoutPaid: number;
  holdoutOpen: number;
}

/** One account's stamp and purchase time, folded into the running result. */
export function tallyTopPrepper(
  into: TopPrepperResult,
  group: TopPrepperGroup,
  at: number,
  purchasedAt: number | null,
  now: number,
): void {
  const windowMs = TOP_PREPPER_WINDOW_DAYS * 86_400_000;
  const paid = purchasedAt !== null && purchasedAt >= at && purchasedAt <= at + windowMs;
  const open = !paid && now < at + windowMs;
  if (group === "sent") {
    into.sent++;
    if (paid) into.sentPaid++;
    if (open) into.sentOpen++;
  } else {
    into.holdout++;
    if (paid) into.holdoutPaid++;
    if (open) into.holdoutOpen++;
  }
}

export const emptyTopPrepperResult = (): TopPrepperResult =>
  ({ sent: 0, sentPaid: 0, sentOpen: 0, holdout: 0, holdoutPaid: 0, holdoutOpen: 0 });
