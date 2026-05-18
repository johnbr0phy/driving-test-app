import { randomBytes } from "node:crypto";

export const PARENT_PAY_TOKEN_TTL_DAYS = 14;

export type ParentPayStatus = "pending" | "paid" | "cancelled" | "expired";

export interface ParentPayRequest {
  teenUid: string;
  createdAt: string; // ISO
  expiresAt: string; // ISO
  status: ParentPayStatus;
  // Set after a successful Stripe checkout webhook fires.
  paidAt?: string;
  paidStripeCustomerId?: string;
  paidStripePaymentIntentId?: string;
}

export function generateParentPayToken(): string {
  // 12 hex chars (~72 bits) — enough entropy for a single-purpose, expiring link.
  return randomBytes(6).toString("hex");
}

export function buildParentPayUrl(siteUrl: string, token: string): string {
  return `${siteUrl.replace(/\/$/, "")}/pay/${token}`;
}

export function buildSmsShareBody(siteUrl: string, token: string): string {
  // Lowercase, no salutation — works for whoever the teen sends it to.
  return `hey can you unlock this for me, im studying for my DMV permit test. $9.99 one time → ${buildParentPayUrl(siteUrl, token)}`;
}

export function buildEmailShareSubject(): string {
  return "can you unlock this for me?";
}

export function buildEmailShareBody(siteUrl: string, token: string): string {
  const link = buildParentPayUrl(siteUrl, token);
  return [
    "hey,",
    "",
    "im using tigertest to study for my DMV permit test and i need premium to keep going with the rest of the practice questions.",
    "",
    `can you unlock it for me? its $9.99 one time, no subscription. heres the link → ${link}`,
    "",
    "thanks!",
  ].join("\n");
}

// Counts every question the teen has interacted with — used on the parent
// landing page to show "your teen has practiced X questions". Prefers the
// `_stats` denormalized counters written by the web client's saveToFirestore;
// falls back to recomputing from raw fields if `_stats` is missing.
export function countQuestionsPracticed(userData: Record<string, unknown>): number {
  const stats = userData._stats as
    | { trainingQuestionsAnswered?: number; testQuestionsAnswered?: number }
    | undefined;
  if (stats && (stats.trainingQuestionsAnswered != null || stats.testQuestionsAnswered != null)) {
    return (stats.trainingQuestionsAnswered ?? 0) + (stats.testQuestionsAnswered ?? 0);
  }

  let total = 0;

  const training = (userData.training as Record<string, unknown> | undefined) ?? {};
  const onboardingMastered = (training.masteredQuestionIds as unknown[] | undefined) ?? [];
  total += onboardingMastered.length;

  const trainingSets = (userData.trainingSets as Record<string, Record<string, unknown>> | undefined) ?? {};
  // Tolerate both numeric ("1") and number-typed keys defensively — admin uses
  // the same dual lookup, and an older code path wrote sets with number keys.
  for (const setId of [1, 2, 3, 4]) {
    const s = trainingSets[String(setId)] || trainingSets[setId as unknown as string] || {};
    total += ((s.masteredIds as unknown[] | undefined) ?? []).length;
    total += ((s.wrongQueue as unknown[] | undefined) ?? []).length;
  }

  const completedTests = (userData.completedTests as Record<string, unknown>[] | undefined) ?? [];
  for (const t of completedTests) {
    const answers = t.answers as unknown[] | Record<string, unknown> | undefined;
    if (Array.isArray(answers)) total += answers.length;
    else if (answers && typeof answers === "object") total += Object.keys(answers).length;
    else total += (t.totalQuestions as number) || 0;
  }

  const currentTests = (userData.currentTests as Record<string, Record<string, unknown>> | undefined) ?? {};
  for (const ct of Object.values(currentTests)) {
    const answers = ct.answers as Record<string, unknown> | undefined;
    if (answers) total += Object.keys(answers).length;
  }

  return total;
}
