"use client";

import Link from "next/link";
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

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        {t("landing.heroSubtitle")}
      </p>

      {!loading && (user || isGuest) ? (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
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

export function HomeCTA() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const startGuestSession = useStore((state) => state.startGuestSession);
  const isGuest = useStore((state) => state.isGuest);
  const { t } = useTranslation();

  const handleTryFree = () => {
    startGuestSession();
    router.push("/onboarding/select-state");
  };

  return (
    <>
      {!loading && (user || isGuest) ? (
        <Link href="/dashboard">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full">
            {t("common.goToDashboard")}
          </Button>
        </Link>
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
