"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { trackFunnelStep } from "@/lib/funnel";
import { getExamByStateCode, isExamQuestionId } from "@/lib/exams";
import { useStore } from "@/store/useStore";
import type { TestSession } from "@/types";

/** Answers and finished tests a signed-out visitor has on this browser for
 *  one v1 exam (a DMV state code or a registry exam's pseudo state code). */
export function v1GuestCounts(
  stateCode: string | null,
  completedTests: TestSession[],
  history: { questionId: string }[]
) {
  const tests = completedTests.filter((t) => t.state === stateCode);
  const exam = stateCode ? getExamByStateCode(stateCode) : undefined;
  const trained = history.filter((a) =>
    exam ? a.questionId.startsWith(exam.questionIdPrefix) : !isExamQuestionId(a.questionId)
  ).length;
  return { answered: trained + tests.reduce((n, t) => n + t.answers.length, 0), tests: tests.length };
}

const IGNORED_GOOGLE_ERRORS = ["auth/popup-closed-by-user", "auth/cancelled-popup-request", "auth/user-cancelled"];

interface Props {
  signupHref: string;
  /** Questions answered so far on this browser; 0 shows the first-visit copy. */
  answered?: number;
  /** Finished practice tests on this browser. */
  tests?: number;
  /** Results page: the score this card offers to save. */
  score?: { score: number; total: number };
  /** v2 dashboards sit outside a themed wrapper, so they pass their exam id. */
  dataTheme?: string;
  className?: string;
}

/**
 * The sign-up ask for signed-out visitors on every dashboard and the v1
 * results page: their own numbers as what they stand to lose, Google in one
 * tap (AuthContext converts the guest's progress when the popup returns, so
 * this page just re-renders signed in), and email via the signup page.
 */
export function GuestSaveCard({ signupHref, answered = 0, tests = 0, score, dataTheme, className = "" }: Props) {
  const { t } = useTranslation();
  const { loginWithGoogle } = useAuth();
  const isNative = useIsNativeApp();
  const setEmailConsent = useStore((s) => s.setEmailConsent);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const title = score
    ? t("guestSave.titleScore").replace("{{score}}", String(score.score)).replace("{{total}}", String(score.total))
    : answered > 0
      ? t(tests > 0 ? "guestSave.titleAnswersTests" : "guestSave.titleAnswers").replace("{{n}}", String(answered))
      : t("guestSave.titleFresh");

  const handleGoogle = async () => {
    setError(false);
    setBusy(true);
    // The funnel's "opened signup" step, so one-tap signups still show up
    // between first answer and account created.
    trackFunnelStep("signup_view");
    // Same default as the signup page's Google button.
    setEmailConsent(true);
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      if (!IGNORED_GOOGLE_ERRORS.includes(code)) setError(true);
    } finally {
      setBusy(false);
    }
  };

  const benefits = [t("guestSave.benefitDevices"), t("guestSave.benefitSafe"), t("guestSave.benefitMisses")];

  return (
    <div
      data-theme={dataTheme}
      className={`rounded-xl border border-brand-border-light bg-gradient-to-r from-brand-light to-brand-gradient-to p-4 sm:p-5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/60 flex items-center justify-center shrink-0">
          <Cloud className="w-5 h-5 text-brand-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-gray-50 leading-snug">{title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{t("guestSave.sub")}</p>
          <ul className="mt-2 grid gap-1 sm:grid-cols-3 sm:gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-200">
                <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        {/* Hidden in the native app, like the signup page (Google blocks
            OAuth in WebViews; offering it on iOS would need Apple sign-in). */}
        {!isNative && (
          <div className="sm:flex-1">
            <WebViewGoogleWarning onGoogleSignIn={handleGoogle} disabled={busy} />
          </div>
        )}
        <Button asChild className="sm:flex-1 bg-brand text-white hover:bg-brand-hover">
          <Link href={signupHref}>{isNative ? t("guestSave.createCta") : t("guestSave.emailCta")}</Link>
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700 dark:text-red-300">{t("guestSave.googleFailed")}</p>
      )}
      <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">{t("guestSave.free")}</p>
    </div>
  );
}
