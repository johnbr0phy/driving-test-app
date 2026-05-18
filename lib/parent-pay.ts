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
  return `hey can you unlock this for me, im studying for my permit test. $9.99 one time → ${buildParentPayUrl(siteUrl, token)}`;
}

export function buildEmailShareSubject(): string {
  return "your teen is studying for their permit test — can you help?";
}

export function buildEmailShareBody(siteUrl: string, token: string): string {
  const link = buildParentPayUrl(siteUrl, token);
  return [
    "Hi,",
    "",
    "Your teen is studying for their permit test using TigerTest and asked you to unlock the full study material.",
    "",
    `Tap here to see what they've been working on and unlock it: ${link}`,
    "",
    "$9.99 one-time, no subscription, secure Stripe checkout.",
    "",
    "— TigerTest",
  ].join("\n");
}

// Counts every question the teen has interacted with — used on the parent
// landing page to show "your teen has practiced X questions". Mirrors the
// per-user math in app/api/admin/users/route.ts so the numbers match.
export function countQuestionsPracticed(userData: Record<string, unknown>): number {
  let total = 0;

  const training = (userData.training as Record<string, unknown> | undefined) ?? {};
  const onboardingMastered = (training.masteredQuestionIds as unknown[] | undefined) ?? [];
  total += onboardingMastered.length;

  const trainingSets = (userData.trainingSets as Record<string, Record<string, unknown>> | undefined) ?? {};
  for (const setId of ["1", "2", "3", "4"]) {
    const s = trainingSets[setId] || {};
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
