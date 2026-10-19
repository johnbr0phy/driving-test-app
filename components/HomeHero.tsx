"use client";

import Link from "next/link";
import { ThemedScreenshot } from "@/components/ThemedScreenshot";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";
import { useExamStarted } from "@/hooks/useExamStarted";

// The DMV dashboard is open to everyone and asks for the state at the top, so
// the CTA always goes straight there, like the exam landings
// (components/exam/ExamLandingHero.tsx). Fresh visitors become guests on the
// way in. "Go to Dashboard" only once the DMV was started (a state picked):
// being a guest is site-wide, so a guest who only started CDL still gets
// "Start practicing" here.
function useHomeCta() {
  const { user, loading } = useAuth();
  const isGuest = useStore((state) => state.isGuest);
  const startGuestSession = useStore((state) => state.startGuestSession);
  const dmvStarted = useExamStarted("dmv");
  const hasSession = (!!user || isGuest) && dmvStarted;
  const onStart = () => {
    if (!loading && !user && !isGuest) startGuestSession();
  };
  return { hasSession, onStart };
}

function StartButton() {
  const { hasSession, onStart } = useHomeCta();
  const { t } = useTranslation();
  return (
    <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
      <Link href="/dmv/dashboard" onClick={onStart}>
        {hasSession ? t("common.goToDashboard") : t("common.startPracticing")}
      </Link>
    </Button>
  );
}

export function HomeHero() {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        {t("landing.heroSubtitle")}
      </p>

      <StartButton />

      {/* Product Screenshots */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <ThemedScreenshot
              src="/mobile.png"
              alt="TigerTest mobile DMV practice test training mode"
              width={280}
              height={560}
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">{t("landing.trainOnMobile")}</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <ThemedScreenshot
              src="/desktop.png"
              alt="TigerTest desktop DMV practice test interface"
              width={700}
              height={480}
              className="w-[320px] md:w-[500px]"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">{t("landing.testOnDesktop")}</p>
        </div>
      </div>
    </>
  );
}

export function HomeCTA() {
  return <StartButton />;
}
