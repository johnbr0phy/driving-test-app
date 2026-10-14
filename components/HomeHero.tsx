"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";
import { useExamStarted } from "@/hooks/useExamStarted";

// "Go to Dashboard" only once the DMV test was started (a state picked in
// onboarding). Being a guest is site-wide, so a guest who only started CDL
// still gets the DMV's "Start practicing" here.
function useHomeCta() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const firestoreLoaded = useStore((state) => state.firestoreLoaded);
  const dmvStarted = useExamStarted("dmv");
  // `user` is set as soon as Firebase restores the session, but `loading`
  // stays true until Firestore data finishes loading. Decide on `user` so a
  // signed-in visitor never sees the signup CTA during (or after a failed)
  // load; only a loaded account with no state is sent to pick one.
  const signedInNoState = !!user && firestoreLoaded && !dmvStarted;
  const hasSession = (!!user && !signedInNoState) || (isGuest && dmvStarted);

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return { hasSession, signedInNoState, loading, handleTryFree };
}

export function HomeHero() {
  const { hasSession, signedInNoState, loading, handleTryFree } = useHomeCta();
  const { t } = useTranslation();

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        {t("landing.heroSubtitle")}
      </p>

      {hasSession ? (
        <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
          <Link href="/dashboard">
            {t("common.goToDashboard")}
          </Link>
        </Button>
      ) : signedInNoState ? (
        <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
          <Link href="/onboarding/select-state">
            {t("common.startPracticing")}
          </Link>
        </Button>
      ) : loading ? (
        <div className="h-[104px]" aria-hidden />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
            <Link href="/signup">
              {t("common.startPracticing")}
            </Link>
          </Button>
          <button
            onClick={handleTryFree}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
          >
            {t("common.tryItFirst")}
          </button>
        </div>
      )}

      {/* Product Screenshots */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Image
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
            <Image
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
  const { hasSession, signedInNoState, loading, handleTryFree } = useHomeCta();
  const { t } = useTranslation();

  return (
    <>
      {hasSession ? (
        <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
          <Link href="/dashboard">
            {t("common.goToDashboard")}
          </Link>
        </Button>
      ) : signedInNoState ? (
        <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
          <Link href="/onboarding/select-state">
            {t("common.startPracticing")}
          </Link>
        </Button>
      ) : loading ? (
        <div className="h-[104px]" aria-hidden />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
            <Link href="/signup">
              {t("common.startPracticing")}
            </Link>
          </Button>
          <button
            onClick={handleTryFree}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
          >
            {t("common.tryItFirst")}
          </button>
        </div>
      )}
    </>
  );
}
