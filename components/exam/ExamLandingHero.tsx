"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useExamStarted } from "@/hooks/useExamStarted";
import { getExamByPath } from "@/lib/exams";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Language } from "@/i18n";

// The homepage hero (components/HomeHero.tsx) for a non-DMV test: short
// subtitle, black pill CTA that turns into "Go to Dashboard" once there is a
// session, a quiet secondary link, then the two product screenshots.
// Everything here is free and needs no account, so the CTA always goes
// straight to the dashboard.
// Fresh visitors become guests on their way in, exactly like the homepage's
// "Try it first": that is what shows the "Sign up to save" prompts and
// protects their progress if they later sign in to an existing account.
// "Go to Dashboard" only once this exam was started: being a guest is
// site-wide, so another exam's start must not count here.
// A translated landing passes `lang`: its copy is in that language and the
// CTA switches the app to it, so /es/examen-practica-cdl opens CDL in Spanish.
const COPY = {
  en: {
    start: "Start practicing",
    dashboard: "Go to Dashboard",
    how: "See how it works",
    mobile: "Train on mobile",
    desktop: "Test on desktop",
    mobileAlt: (name: string) => `TigerTest ${name} practice test training mode on mobile`,
    desktopAlt: (name: string) => `TigerTest ${name} practice test on desktop`,
  },
  es: {
    start: "Empezar a practicar",
    dashboard: "Ir a mi panel",
    how: "Cómo funciona",
    mobile: "Practica en el celular",
    desktop: "Haz el examen en la computadora",
    mobileAlt: (name: string) => `Práctica por tema del examen ${name} de TigerTest en el celular`,
    desktopAlt: (name: string) => `Examen de práctica ${name} de TigerTest en la computadora`,
  },
};
type CopyLang = keyof typeof COPY;

function useStartCta(dashboardHref: string, lang?: Language) {
  const { user, loading } = useAuth();
  const { setLanguage } = useTranslation();
  const isGuest = useStore((state) => state.isGuest);
  const startGuestSession = useStore((state) => state.startGuestSession);
  const started = useExamStarted(getExamByPath(dashboardHref)?.id ?? "");
  const hasSession = (!!user || isGuest) && started;
  const onStart = () => {
    if (lang) setLanguage(lang);
    if (!loading && !user && !isGuest) startGuestSession();
  };
  const copy = COPY[(lang ?? "en") as CopyLang] ?? COPY.en;
  return { hasSession, onStart, copy };
}

export function ExamLandingHero({
  dashboardHref,
  subtitle,
  shortName,
  shots,
  lang,
}: {
  dashboardHref: string;
  subtitle: string;
  shortName: string;
  shots: { mobile: string; desktop: string };
  lang?: Language;
}) {
  const { hasSession, onStart, copy } = useStartCta(dashboardHref, lang);

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">{subtitle}</p>

      <div className="flex flex-col items-center gap-3">
        <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
          <Link href={dashboardHref} onClick={onStart}>
            {hasSession ? copy.dashboard : copy.start}
          </Link>
        </Button>
        {!hasSession && (
          <a href="#how-it-works" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline">
            {copy.how}
          </a>
        )}
      </div>

      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Image
              src={shots.mobile}
              alt={copy.mobileAlt(shortName)}
              width={384}
              height={640}
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">{copy.mobile}</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Image
              src={shots.desktop}
              alt={copy.desktopAlt(shortName)}
              width={1215}
              height={790}
              className="w-[320px] md:w-[500px]"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">{copy.desktop}</p>
        </div>
      </div>
    </>
  );
}

export function ExamLandingCTA({ dashboardHref, lang }: { dashboardHref: string; lang?: Language }) {
  const { hasSession, onStart, copy } = useStartCta(dashboardHref, lang);

  return (
    <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
      <Link href={dashboardHref} onClick={onStart}>
        {hasSession ? copy.dashboard : copy.start}
      </Link>
    </Button>
  );
}
