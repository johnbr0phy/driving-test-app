"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { AdminLink } from "@/components/AdminLink";
import { TeachLink } from "@/components/TeachLink";
import { useHydration } from "@/hooks/useHydration";
import { useTranslation } from "@/contexts/LanguageContext";
import Image from "next/image";
import { BarChart3 } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TestSwitcher } from "@/components/TestSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EXAMS } from "@/lib/exams";
import { useExamStarted } from "@/hooks/useExamStarted";
import { getStateBySlug, states } from "@/data/states";
import { BrandLockup } from "@/components/BrandLockup";

const DMV_APP_PREFIXES = ["/dmv/", "/dashboard", "/stats", "/drill", "/practice", "/training", "/test/", "/onboarding", "/dmv-practice-test", "/practice-tests-by-state"];
const DMV_LOCALE_HUBS = ["/es/examenes-practica-por-estado", "/ko/juibyeol-dmv-pilgi-siheom", "/vi/thi-thu-dmv-theo-tieu-bang"];

/** DMV pages wear the "DMV Practice Test" title like every exam wears its own;
 *  the hub, settings and sign-in pages keep the tigertest.io wordmark. */
function isDmvPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (DMV_APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p.endsWith("/") ? p : `${p}/`))) return true;
  if (DMV_LOCALE_HUBS.includes(pathname)) return true;
  return !!dmvLandingState(pathname);
}

/** The state a DMV state page is about: /california-dmv-practice-test and the es/ko/vi equivalents. */
function dmvLandingState(pathname: string | null) {
  const m = pathname?.match(/^\/(?:(?:es|ko|vi)\/)?([a-z-]+?)-(?:dmv-practice-test|examen-practica-dmv|dmv-pilgi-siheom|thi-thu-dmv)$/);
  return m ? getStateBySlug(m[1]) : undefined;
}

export function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const guest = useStore((state) => state.isGuest);
  const hydrated = useHydration();
  // Guest of the DMV test only: a guest who started another exam has no DMV
  // dashboard or stats yet, so they see "Sign In" here, not "Sign up to save".
  const dmvStarted = useExamStarted("dmv");
  const isGuest = guest && dmvStarted;
  const subscription = useStore((state) => state.subscription);
  const isPremium = hydrated && !guest && !!user && subscription?.isPremium === true;
  const { t, language } = useTranslation();

  const displayPhotoURL = photoURL || user?.photoURL;
  const selectedState = useStore((state) => state.selectedState);

  // Under the wordmark, DMV pages name the state test: the page's own state, else the
  // reader's chosen one (English only, other languages keep the plain title).
  const dmvState = dmvLandingState(pathname) ?? (hydrated ? states.find((s) => s.code === selectedState) : undefined);
  const dmvSubtitle = !isDmvPath(pathname)
    ? null
    : dmvState && language === "en"
      ? `${dmvState.name} DMV Practice Test`
      : t("common.dmvHeaderTitle");

  // Hide header on test and training pages (DMV and registry exams)
  const hideHeader =
    pathname?.startsWith("/test/") ||
    pathname === "/training" ||
    pathname?.startsWith("/practice/") ||
    EXAMS.some((e) => pathname?.startsWith(`${e.slug}/test`) || pathname?.startsWith(`${e.slug}/practice/`));

  // Hide sign up prompt on onboarding pages (too early in flow)
  const isOnboarding = pathname?.startsWith("/onboarding");
  // The dashboard's own save card (GuestSaveCard) already offers Google, email and
  // sign in once a state is chosen, so the header leaves that ask to it.
  const dashboardHasSaveCard = pathname === "/dmv/dashboard" && hydrated && !!selectedState;

  // Language toggle lives in the header only on the DMV landing; the footer renders it elsewhere.
  const isHomepage = pathname === "/dmv-practice-test";

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={user || isGuest ? "/dmv/dashboard" : "/"} className="flex items-center gap-2 group flex-shrink-0">
            <BrandLockup
              icon={<Image src={isPremium ? "/tiger_face_01.png" : "/tiger.png"} alt="tigertest.io" width={40} height={40} className="w-10 h-10" />}
              subtitle={dmvSubtitle}
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <TestSwitcher />
            <ThemeToggle />

            {/* Language Toggle - shown only on the homepage; other pages render it in the footer */}
            {isHomepage && <LanguageSwitcher />}

            {(user || isGuest) && (
              <Link
                href="/stats"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                title={t("stats.yourStats")}
              >
                <BarChart3 className="h-5 w-5 stats-icon" />
              </Link>
            )}

            {user ? (
              <>
                <TeachLink />
                <AdminLink />
                <Link href="/settings" aria-label="Profile and settings">
                  <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={displayPhotoURL || undefined} alt="Profile" />
                    <AvatarFallback className="text-lg">😊</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : dashboardHasSaveCard && guest ? null : isGuest && !isOnboarding ? (
              <>
                <Link href="/login" className="hidden sm:inline text-sm font-semibold text-gray-700 dark:text-gray-200 hover:underline">
                  {t("common.signIn")}
                </Link>
                <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold">
                  <Link href="/signup">
                    {t("common.signUpToSave")}
                  </Link>
                </Button>
              </>
            ) : !(guest && isOnboarding) ? (
              <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Link href="/login">{t("common.signIn")}</Link>
              </Button>
            ) : null}
          </div>
        </div>
    </header>
  );
}
