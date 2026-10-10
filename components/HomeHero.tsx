"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useTranslation } from "@/contexts/LanguageContext";

export function HomeHero() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const { t } = useTranslation();
  // `user` is set as soon as Firebase restores the session, but `loading`
  // stays true until Firestore data finishes loading. Decide on `user` so a
  // signed-in visitor never sees the signup CTA during (or after a failed) load.
  const hasSession = !!user || isGuest;

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        {t("landing.heroSubtitle")}
      </p>

      {hasSession ? (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
      ) : loading ? (
        <div className="h-[104px]" aria-hidden />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Link href="/signup">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
              {t("common.startPracticing")}
            </Button>
          </Link>
          <button
            onClick={handleTryFree}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {t("common.tryItFirst")}
          </button>
        </div>
      )}

      {/* Product Screenshots */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/mobile.png"
              alt="TigerTest mobile DMV practice test training mode"
              width={280}
              height={560}
              className="w-[200px] md:w-[240px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">{t("landing.trainOnMobile")}</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/desktop.png"
              alt="TigerTest desktop DMV practice test interface"
              width={700}
              height={480}
              className="w-[320px] md:w-[500px]"
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">{t("landing.testOnDesktop")}</p>
        </div>
      </div>
    </>
  );
}

export function HomeCTA() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const { t } = useTranslation();
  // `user` is set as soon as Firebase restores the session, but `loading`
  // stays true until Firestore data finishes loading. Decide on `user` so a
  // signed-in visitor never sees the signup CTA during (or after a failed) load.
  const hasSession = !!user || isGuest;

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <>
      {hasSession ? (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
      ) : loading ? (
        <div className="h-[104px]" aria-hidden />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Link href="/signup">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
              {t("common.startPracticing")}
            </Button>
          </Link>
          <button
            onClick={handleTryFree}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {t("common.tryItFirst")}
          </button>
        </div>
      )}
    </>
  );
}
