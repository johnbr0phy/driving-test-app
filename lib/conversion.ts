// The Conversion tab on /admin: how close is an account to paying?
//
// The server (lib/server/conversion.ts) sends one small row per account that
// has answered a question, seen a paywall or paid. Everything on the tab is
// worked out from those rows by the pure functions below, in the browser, so
// the filters (test, signup period) re-cut every card at once. The server
// uses the same functions to rank the warm leads.
//
// One rule runs through all of it: a buyer is measured AT THE MOMENT THEY
// PAID (questions answered, tests finished, days active before the purchase),
// everyone else as they are now. So "reached 100 questions without paying"
// counts the buyers who paid at 100 or later plus the unpaid accounts at 100
// or more, and the share who went on to pay is a forward-looking rate.

/** One account, as the server packs it (see `unpack`). */
export type PackedRow = number[];

export interface ConvRow {
  paid: boolean;
  /** Questions answered: before the purchase for a buyer, so far for the rest. */
  answers: number;
  /** Practice tests finished, same rule. */
  tests: number;
  /** Days with any activity, same rule (never below 1). */
  activeDays: number;
  /** Paywall opens while signed in. */
  paywallViews: number;
  /** Different paywalls seen. */
  paywalls: number;
  /** Index into the payload's `exams`. */
  exam: number;
  /** Days since 1970 (UTC), -1 when unknown. */
  signupDay: number;
  lastActiveDay: number;
  /** Buyers: whole days from signup to purchase (0 = same day), -1 unknown. */
  daysToBuy: number;
  /** Buyers: questions answered and days active after paying. */
  answersAfter: number;
  activeDaysAfter: number;
  /** Buyers: index into the payload's `paywalls` of the one that sold, -1 unknown. */
  soldBy: number;
  /** Index into the payload's `markets`. */
  market: number;
  /** Day of the latest paywall view (days since 1970), -1 when none. */
  lastPaywallDay: number;
}

export const pack = (r: ConvRow): PackedRow => [
  r.paid ? 1 : 0, r.answers, r.tests, r.activeDays, r.paywallViews, r.paywalls, r.exam,
  r.signupDay, r.lastActiveDay, r.daysToBuy, r.answersAfter, r.activeDaysAfter, r.soldBy, r.market, r.lastPaywallDay,
];

export const unpack = (p: PackedRow): ConvRow => ({
  paid: p[0] === 1, answers: p[1], tests: p[2], activeDays: p[3], paywallViews: p[4], paywalls: p[5], exam: p[6],
  signupDay: p[7], lastActiveDay: p[8], daysToBuy: p[9], answersAfter: p[10], activeDaysAfter: p[11], soldBy: p[12],
  market: p[13] ?? 0, lastPaywallDay: p[14] ?? -1,
});

export const dayNumber = (day: string | null | undefined): number => {
  if (!day) return -1;
  const t = Date.parse(`${day.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(t) ? -1 : Math.floor(t / 86_400_000);
};

// ─── The four ways to measure "how far in" ─────────────────────────────────
export type Dimension = "answers" | "tests" | "activeDays" | "paywallViews";

export const DIMENSIONS: Record<Dimension, { label: string; unit: string; steps: number[] }> = {
  answers: { label: "Questions answered", unit: "questions", steps: [0, 10, 25, 50, 100, 200, 400, 800] },
  tests: { label: "Practice tests finished", unit: "tests", steps: [0, 1, 2, 3, 5, 8] },
  activeDays: { label: "Days active", unit: "days", steps: [1, 2, 3, 5, 8, 15] },
  paywallViews: { label: "Paywall views", unit: "views", steps: [0, 1, 2, 3, 5, 10] },
};

export interface LadderStep {
  min: number;
  /** Accounts that got to `min` without having paid. */
  reached: number;
  /** Of those, the ones who went on to pay. */
  paid: number;
  rate: number;
}

/** For each step: of the accounts that got that far unpaid, how many paid. */
export function ladder(rows: ConvRow[], dim: Dimension): LadderStep[] {
  return DIMENSIONS[dim].steps.map((min) => {
    let reached = 0;
    let paid = 0;
    for (const r of rows) {
      if (r[dim] < min) continue;
      reached++;
      if (r.paid) paid++;
    }
    return { min, reached, paid, rate: reached ? paid / reached : 0 };
  });
}

export interface Bucket {
  from: number;
  /** Inclusive; null = no upper end. */
  to: number | null;
  count: number;
  share: number;
}

/** How many rows sit in each gap between steps (where buyers were when they paid). */
export function distribution(rows: ConvRow[], dim: Dimension): Bucket[] {
  const steps = DIMENSIONS[dim].steps;
  const out: Bucket[] = steps.map((from, i) => ({ from, to: i + 1 < steps.length ? steps[i + 1] - 1 : null, count: 0, share: 0 }));
  let total = 0;
  for (const r of rows) {
    const v = Math.max(r[dim], steps[0]);
    let i = steps.length - 1;
    while (i > 0 && v < steps[i]) i--;
    out[i].count++;
    total++;
  }
  for (const b of out) b.share = total ? b.count / total : 0;
  return out;
}

export const bucketLabel = (b: { from: number; to: number | null }) =>
  b.to === null ? `${b.from}+` : b.to === b.from ? String(b.from) : `${b.from} to ${b.to}`;

/** The q-th quantile (0 to 1) of a list, null when it is empty. */
export function quantile(values: number[], q: number): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))];
}

// ─── Questions x paywall views ─────────────────────────────────────────────
export const GRID_ANSWERS = [0, 25, 100, 200, 400];
export const GRID_VIEWS = [0, 1, 2, 3, 5];

export interface GridCell {
  reached: number;
  paid: number;
  rate: number;
}

/** cells[a][v]: accounts with at least GRID_ANSWERS[a] questions AND GRID_VIEWS[v] paywall views. */
export function grid(rows: ConvRow[]): GridCell[][] {
  return GRID_ANSWERS.map((minA) =>
    GRID_VIEWS.map((minV) => {
      let reached = 0;
      let paid = 0;
      for (const r of rows) {
        if (r.answers < minA || r.paywallViews < minV) continue;
        reached++;
        if (r.paid) paid++;
      }
      return { reached, paid, rate: reached ? paid / reached : 0 };
    }),
  );
}

/** A cell needs this many accounts before its rate is believed. */
export const MIN_CELL = 25;

const lastAtMost = (steps: number[], v: number) => {
  let i = steps.length - 1;
  while (i > 0 && v < steps[i]) i--;
  return i;
};

/**
 * The chance an unpaid account pays, read off the grid: the rate of the cell
 * it has reached, stepping back to a broader cell while the sample is thin.
 */
export function payChance(cells: GridCell[][], r: Pick<ConvRow, "answers" | "paywallViews">): number {
  let a = lastAtMost(GRID_ANSWERS, r.answers);
  let v = lastAtMost(GRID_VIEWS, r.paywallViews);
  while (cells[a][v].reached < MIN_CELL && (a > 0 || v > 0)) {
    if (a > 0) a--;
    else v--;
  }
  return cells[a][v].rate;
}

/** Unpaid, seen a paywall, and active in the last `days` days. */
export const isLive = (r: ConvRow, today: number, days = 14) =>
  !r.paid && r.paywallViews > 0 && r.lastActiveDay >= 0 && today - r.lastActiveDay <= days;

// ─── Buyers ────────────────────────────────────────────────────────────────
export const TIME_TO_BUY: { label: string; from: number; to: number | null }[] = [
  { label: "Same day", from: 0, to: 0 },
  { label: "Next day", from: 1, to: 1 },
  { label: "2 to 3 days", from: 2, to: 3 },
  { label: "4 to 7 days", from: 4, to: 7 },
  { label: "8 to 30 days", from: 8, to: 30 },
  { label: "Over 30 days", from: 31, to: null },
];

export function timeToBuy(buyers: ConvRow[]): { label: string; count: number; share: number }[] {
  const known = buyers.filter((b) => b.daysToBuy >= 0);
  return TIME_TO_BUY.map((t) => {
    const count = known.filter((b) => b.daysToBuy >= t.from && (t.to === null || b.daysToBuy <= t.to)).length;
    return { label: t.label, count, share: known.length ? count / known.length : 0 };
  });
}

// ─── The whole tab from one set of rows ────────────────────────────────────
export interface ConversionSummary {
  accounts: number;
  sawPaywall: number;
  buyers: number;
  /** Buyers per account, the base rate every lift is measured against. */
  baseRate: number;
  /** Buyers among accounts that saw a paywall. */
  paywallRate: number;
  medianAnswers: number | null;
  medianTests: number | null;
  medianActiveDays: number | null;
  medianDaysToBuy: number | null;
  medianViews: number | null;
  /** Buyers who paid the first time a paywall opened (one view or none recorded). */
  firstViewBuyers: number;
  /** Buyers who answered at least one question after paying. */
  keptGoing: number;
  medianAnswersAfter: number | null;
  /** Unpaid accounts that saw a paywall and were active in the last 14 days. */
  live: number;
  /** Live accounts at twice the base rate or better. */
  warm: number;
}

export function summarize(rows: ConvRow[], today: number): ConversionSummary {
  const buyers = rows.filter((r) => r.paid);
  const cells = grid(rows);
  const baseRate = rows.length ? buyers.length / rows.length : 0;
  const saw = rows.filter((r) => r.paywallViews > 0);
  const live = rows.filter((r) => isLive(r, today));
  const med = (f: (r: ConvRow) => number, from = buyers) => quantile(from.map(f), 0.5);
  return {
    accounts: rows.length,
    sawPaywall: saw.length,
    buyers: buyers.length,
    baseRate,
    paywallRate: saw.length ? saw.filter((r) => r.paid).length / saw.length : 0,
    medianAnswers: med((r) => r.answers),
    medianTests: med((r) => r.tests),
    medianActiveDays: med((r) => r.activeDays),
    medianDaysToBuy: med((r) => r.daysToBuy, buyers.filter((b) => b.daysToBuy >= 0)),
    medianViews: med((r) => r.paywallViews),
    firstViewBuyers: buyers.filter((b) => b.paywallViews <= 1).length,
    keptGoing: buyers.filter((b) => b.answersAfter > 0).length,
    medianAnswersAfter: med((r) => r.answersAfter),
    live: live.length,
    warm: live.filter((r) => baseRate > 0 && payChance(cells, r) >= 2 * baseRate).length,
  };
}

const pct = (n: number, digits = 1) => `${(n * 100).toFixed(n > 0 && n < 0.1 ? digits : 0)}%`;

/**
 * Plain sentences drawn from the numbers, most useful first. Each one is only
 * written when there is enough behind it to be worth reading.
 */
export function insights(rows: ConvRow[], today: number): string[] {
  const out: string[] = [];
  const s = summarize(rows, today);
  if (s.buyers < 5) return ["Too few purchases in this slice to say anything yet."];
  const buyers = rows.filter((r) => r.paid);

  // Does doing more make paying more likely? Find the step with the best lift.
  let best: { dim: Dimension; step: LadderStep; lift: number } | null = null;
  for (const dim of ["answers", "tests", "activeDays"] as const) {
    for (const step of ladder(rows, dim).slice(1)) {
      if (step.reached < 40 || step.paid < 5) continue;
      const lift = s.baseRate ? step.rate / s.baseRate : 0;
      if (!best || lift > best.lift) best = { dim, step, lift };
    }
  }
  if (best && best.lift >= 1.3) {
    const what =
      best.dim === "answers" ? `answer ${best.step.min} questions` : best.dim === "tests" ? `finish ${best.step.min} practice test${best.step.min === 1 ? "" : "s"}` : `come back on ${best.step.min} different days`;
    out.push(
      `Doing more does make paying more likely. Accounts that ${what} without paying go on to pay ${pct(best.step.rate)} of the time, ${best.lift.toFixed(1)}x the ${pct(s.baseRate)} of all accounts.`,
    );
  } else {
    out.push(`More practice does not clearly lift the odds of paying in this slice: no milestone beats the ${pct(s.baseRate)} base rate by much.`);
  }

  const q1 = quantile(buyers.map((b) => b.answers), 0.25);
  const q3 = quantile(buyers.map((b) => b.answers), 0.75);
  if (s.medianAnswers !== null && q1 !== null && q3 !== null) {
    out.push(
      `The typical buyer had answered ${s.medianAnswers} questions when they paid (half were between ${q1} and ${q3})${
        s.medianTests !== null ? ` and finished ${s.medianTests} practice test${s.medianTests === 1 ? "" : "s"}` : ""
      }.`,
    );
  }

  const time = timeToBuy(buyers);
  const fast = time[0].share + time[1].share;
  if (time.some((t) => t.count > 0)) {
    out.push(
      fast >= 0.5
        ? `Buying is fast: ${pct(fast)} of buyers pay on the day they sign up or the day after. Someone who has not paid by day 3 rarely does later, so the first sessions are where the sale is won.`
        : `Buying takes a while: only ${pct(fast)} pay on the day they sign up or the day after, and ${pct(time[4].share + time[5].share)} take more than a week. Reminders to people who saw a paywall have room to work.`,
    );
  }

  const views = ladder(rows, "paywallViews");
  const one = views.find((v) => v.min === 1);
  const three = views.find((v) => v.min === 3);
  if (one && three && three.reached >= 30 && one.rate > 0) {
    out.push(
      three.rate > one.rate * 1.2
        ? `Seeing the paywall again helps: ${pct(three.rate)} of accounts with 3 or more views paid, against ${pct(one.rate)} of everyone who saw one.`
        : `Repeat paywall views do not add much: ${pct(three.rate)} of accounts with 3 or more views paid, against ${pct(one.rate)} of everyone who saw one. ${pct(s.firstViewBuyers / s.buyers)} of buyers paid on their first view.`,
    );
  }

  if (s.live > 0) {
    out.push(
      `${s.live} unpaid account${s.live === 1 ? " has" : "s have"} seen a paywall and been active in the last 14 days; ${s.warm} of them look like buyers (twice the base rate or better). They are listed at the bottom.`,
    );
  }

  if (s.buyers >= 10) {
    out.push(
      `After paying, ${pct(s.keptGoing / s.buyers)} of buyers answered more questions${
        s.medianAnswersAfter ? ` (${s.medianAnswersAfter} for the typical one)` : ""
      }.`,
    );
  }
  return out;
}

// ─── Who pays, by market or by test ────────────────────────────────────────
export interface GroupRow {
  /** Index into the payload's `markets` or `exams`. */
  index: number;
  accounts: number;
  sawPaywall: number;
  /** Paid, among the accounts that saw a paywall or paid. */
  paid: number;
  /** Paid per account that was asked to pay: the propensity to pay. */
  rate: number;
  /** Unpaid, saw a paywall in the last 30 days. */
  open: number;
}

/**
 * Pay rate per market or per test. Someone who paid was asked to pay, even
 * when no paywall view was recorded for them (older accounts), so they count
 * on both sides of the rate.
 */
export function byGroup(rows: ConvRow[], key: "market" | "exam", today: number): GroupRow[] {
  const out = new Map<number, GroupRow>();
  for (const r of rows) {
    let g = out.get(r[key]);
    if (!g) out.set(r[key], (g = { index: r[key], accounts: 0, sawPaywall: 0, paid: 0, rate: 0, open: 0 }));
    g.accounts++;
    if (r.paywallViews > 0 || r.paid) g.sawPaywall++;
    if (r.paid) g.paid++;
    else if (r.lastPaywallDay >= 0 && today - r.lastPaywallDay < 30) g.open++;
  }
  for (const g of out.values()) g.rate = g.sawPaywall ? g.paid / g.sawPaywall : 0;
  return [...out.values()].sort((a, b) => b.sawPaywall - a.sawPaywall);
}

// ─── More paywall traffic: where did it come from, and did it sell? ────────
/** One purchase: [day (days since 1970), paywall index or -1, market index, US cents]. */
export type Sale = [number, number, number, number];

export interface WallChange {
  index: number;
  before: number;
  now: number;
  soldBefore: number;
  soldNow: number;
}

export interface PeriodChange {
  days: number;
  hitsBefore: number;
  hitsNow: number;
  salesBefore: number;
  salesNow: number;
  centsBefore: number;
  centsNow: number;
  /** Every paywall with hits or sales in either period, biggest rise first. */
  walls: WallChange[];
}

const dayKeyOf = (n: number) => new Date(n * 86_400_000).toISOString().slice(0, 10);

/**
 * The last `days` days against the `days` before them. Today is left out of
 * both (it is not over yet), so "now" ends yesterday.
 */
export function comparePeriods(
  wallDaily: Record<string, number>[],
  hitsDaily: Record<string, number>,
  sales: Sale[],
  today: number,
  days: number,
): PeriodChange {
  const nowFrom = today - days;
  const beforeFrom = today - 2 * days;
  const sum = (map: Record<string, number> | undefined, from: number) => {
    let n = 0;
    for (let d = from; d < from + days; d++) n += map?.[dayKeyOf(d)] ?? 0;
    return n;
  };
  const walls = new Map<number, WallChange>();
  const wall = (index: number) => {
    let w = walls.get(index);
    if (!w) walls.set(index, (w = { index, before: 0, now: 0, soldBefore: 0, soldNow: 0 }));
    return w;
  };
  wallDaily.forEach((daily, index) => {
    const before = sum(daily, beforeFrom);
    const now = sum(daily, nowFrom);
    if (before || now) Object.assign(wall(index), { before, now });
  });
  const out: PeriodChange = {
    days, hitsBefore: sum(hitsDaily, beforeFrom), hitsNow: sum(hitsDaily, nowFrom),
    salesBefore: 0, salesNow: 0, centsBefore: 0, centsNow: 0, walls: [],
  };
  for (const [day, index, , cents] of sales) {
    if (day >= nowFrom && day < today) {
      out.salesNow++;
      out.centsNow += cents;
      wall(index).soldNow++;
    } else if (day >= beforeFrom && day < nowFrom) {
      out.salesBefore++;
      out.centsBefore += cents;
      wall(index).soldBefore++;
    }
  }
  out.walls = [...walls.values()].sort((a, b) => b.now - b.before - (a.now - a.before) || b.now - a.now);
  return out;
}
