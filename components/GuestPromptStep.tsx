"use client";

import { useEffect, useRef } from "react";
import { useGuestGoogleSignup } from "@/components/GuestSaveCard";
import { useTranslation } from "@/contexts/LanguageContext";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { trackGuestPrompt } from "@/lib/analytics";
import { trackGuestPromptTest, type GuestPromptVariant } from "@/lib/guestPromptTest";
import { GUEST_PROMPT_DESIGNS } from "@/components/guestPrompt/designs";
import { COPY, EN, StreakCard } from "@/components/guestPrompt/StreakCard";
import type { DesignProps } from "@/components/guestPrompt/types";

// The sign-up ask shown in place of a question in training sets and drills
// (timing in hooks/useGuestPrompt). Design v2 (Nov 12 2026, GUEST_PROMPT_DESIGN
// in lib/analytics): the account is the obvious next step, framed around the
// streak and what the visitor stands to lose, with Google full width; skipping
// stays one tap but is a quiet text link instead of a button as big as sign-up.
// Signed-in people are likelier to buy Premium at a paywall, so this is the ask.
// Its own strings, like ReportExamQuestion; languages other than English are
// machine translations pending native review. English readers instead get one
// of ten test designs (components/guestPrompt/designs, lib/guestPromptTest),
// v01 being this card.

export function GuestPromptStep({
  signupHref,
  answered,
  where,
  dataTheme,
  onSkip,
  test,
}: {
  signupHref: string;
  answered: number;
  where: string;
  dataTheme?: string;
  onSkip: () => void;
  /** The message test design for this showing (English only, from useGuestPrompt). */
  test?: { variant: GuestPromptVariant; position: number } | null;
}) {
  const { t, language } = useTranslation();
  const isNative = useIsNativeApp();
  const { signUp, busy, error } = useGuestGoogleSignup();
  // It replaces the question whose Next button had focus, so take focus like a new question card does.
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);

  const tap = (action: "google" | "email") => {
    trackGuestPrompt(action, where, test?.variant);
    if (test) void trackGuestPromptTest(action, test.variant, test.position);
  };
  const props: DesignProps = {
    n: answered,
    headingRef: heading,
    isNative,
    busy,
    onGoogle: () => { tap("google"); void signUp(); },
    signupHref,
    onEmail: () => tap("email"),
    onLater: onSkip,
  };

  const Design = test ? GUEST_PROMPT_DESIGNS[test.variant] : null;
  return (
    <div data-theme={dataTheme} className="animate-in fade-in duration-200">
      {Design ? <Design {...props} /> : <StreakCard {...props} c={COPY[language] ?? EN} />}
      {error && (
        <p role="alert" className="mt-2 text-center text-xs text-red-700 dark:text-red-300">{t("guestSave.googleFailed")}</p>
      )}
    </div>
  );
}

