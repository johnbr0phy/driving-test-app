"use client";

import { useEffect, useRef } from "react";
import { GuestSaveCard } from "@/components/GuestSaveCard";
import { useTranslation } from "@/contexts/LanguageContext";

/** The sign-up ask shown in place of a question in training sets and drills
 *  (timing in hooks/useGuestPrompt). Skipping is one tap, same size as signing up. */
export function GuestPromptStep({
  signupHref,
  answered,
  where,
  dataTheme,
  onSkip,
}: {
  signupHref: string;
  answered: number;
  where: string;
  dataTheme?: string;
  onSkip: () => void;
}) {
  const { t } = useTranslation();
  // It replaces the question whose Next button had focus, so take focus like a new question card does.
  const kicker = useRef<HTMLParagraphElement>(null);
  useEffect(() => { kicker.current?.focus({ preventScroll: true }); }, []);
  return (
    <div className="animate-in fade-in duration-200">
      <p ref={kicker} tabIndex={-1} className="text-center text-sm font-bold text-brand-dark mb-2 outline-none"><span aria-hidden="true">🔥 </span>{t("guestSave.streakKicker")}</p>
      <GuestSaveCard signupHref={signupHref} answered={answered} dataTheme={dataTheme} promptSource={where}/>
      <button
        type="button"
        onClick={onSkip}
        className="mt-3 w-full h-11 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        {t("guestSave.keepPracticing")}
      </button>
    </div>
  );
}
