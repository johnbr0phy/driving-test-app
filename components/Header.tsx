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
import { BarChart3, Users } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TestSwitcher } from "@/components/TestSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EXAMS } from "@/lib/exams";
import { useExamStarted } from "@/hooks/useExamStarted";
import { BrandLockup } from "@/components/BrandLockup";
import { useCommunityAvailable } from "@/hooks/useCommunityStats";
import { COMMUNITY_DMV_KEY } from "@/lib/communityStats";

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
  const { t } = useTranslation();
  // Common Mistakes appears once the DMV has enough answers (lib/communityStats.ts).
  const communityOn = useCommunityAvailable(COMMUNITY_DMV_KEY);

  const displayPhotoURL = photoURL || user?.photoURL;
  const selectedState = useStore((state) => state.selectedState);

  // Hide header on test and training pages (DMV, registry exams and quizzes)
  const hideHeader =
    pathname?.startsWith("/test/") ||
    /^\/q\/[^/]+\/(practice|test|flashcards)(\/|$)/.test(pathname ?? "") ||
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
        <BrandLockup />

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
                aria-label={t("stats.yourStats")}
              >
                <BarChart3 className="h-5 w-5 stats-icon" />
              </Link>
            )}
            {/* On a phone a guest's header already holds "Sign up to save" */}
            {(user || isGuest) && communityOn && (
              <Link
                href="/stats?tab=community"
                className={`${user ? "flex" : "hidden sm:flex"} h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50`}
                title={t("stats.commonMistakes")}
                aria-label={t("stats.commonMistakes")}
              >
                <Users className="h-5 w-5" />
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
              <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold">
                <Link href="/signup">
                  {t("common.signUpToSave")}
                </Link>
              </Button>
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
