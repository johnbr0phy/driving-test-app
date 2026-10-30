"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTestTheme } from "@/contexts/TestThemeContext";
import { examLandingPath, examLanguage, examLanguages, getExamById, getExamVariants } from "@/lib/exams";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/contexts/LanguageContext";
import { createT, type Language } from "@/i18n";
import { TestSwitcher } from "@/components/TestSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminLink } from "@/components/AdminLink";
import { TeachLink } from "@/components/TeachLink";
import { useExamStarted } from "@/hooks/useExamStarted";
import { BrandLockup } from "@/components/BrandLockup";
import { BarChart3, Users } from "lucide-react";
import { useCommunityAvailable } from "@/hooks/useCommunityStats";

export function CDLHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const theme = useTestTheme();
  // Guest of this exam only: starting another exam must not show
  // "Sign Up to Save" here before this one is started.
  const guest = useStore((state) => state.isGuest);
  const started = useExamStarted(theme.id);
  const isGuest = started && guest;
  const hydrated = useHydration();

  const displayPhotoURL = photoURL || user?.photoURL;
  // English unless this exam is offered in the person's language (CDL in
  // Spanish); a translated landing (/es/examen-practica-cdl) is in its own.
  const { language } = useTranslation();
  const exam = getExamById(theme.id);
  const landingLang = Object.entries(exam?.translations ?? {}).find(([, tr]) => tr.landingPath === pathname)?.[0] as
    | Language
    | undefined;
  const contentLang: Language = landingLang ?? (exam ? examLanguage(exam, language) : "en");
  const t = createT(contentLang);
  // A translated exam's landings carry the DMV homepage's language switcher:
  // each language is its own URL, so each option is a real link there (crawlers
  // follow it) and a click also sets the app language for the dashboard behind it.
  const onLanding = !!exam && (pathname === examLandingPath(exam) || !!landingLang);
  const landingLangs = exam ? examLanguages(exam) : [];
  const pageLang: Language = landingLang ?? "en";
  // The page's own language stays a button (it only sets the app language).
  const landingHrefs: Partial<Record<Language, string>> = {};
  if (exam) {
    for (const lang of landingLangs) {
      if (lang === pageLang) continue;
      const href = lang === "en" ? examLandingPath(exam) : exam.translations?.[lang as Exclude<Language, "en">]?.landingPath;
      if (href) landingHrefs[lang] = href;
    }
  }

  // State variants (/real-estate/ca) run their tests under the family's header.
  const variants = getExamVariants(theme.id);
  const bases = [theme.routeBase, ...variants.map((v) => v.slug)];
  // The dashboard's own save card (GuestSaveCard) already offers Google, email and
  // sign in to a guest, so the header leaves that ask to it.
  const onDashboard = bases.some((b) => pathname === `${b}/dashboard`);
  const hideHeader = bases.some((b) => pathname?.startsWith(`${b}/test`) || pathname?.startsWith(`${b}/practice/`));
  // Stats and Common Mistakes for the exam on screen: a state version's own
  // pages when inside one (/real-estate/ca/...), else the family's. Common
  // Mistakes appears once that exam has enough answers (lib/communityStats.ts).
  const variant = variants.find((v) => pathname === v.slug || pathname?.startsWith(`${v.slug}/`));
  const statsBase = variant?.slug ?? theme.routeBase;
  const communityOn = useCommunityAvailable(variant?.id ?? theme.id);

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
          {onLanding && landingLangs.length > 1 && (
            <LanguageSwitcher languages={landingLangs} current={pageLang} hrefs={landingHrefs} />
          )}
          {/* Guests are sent to sign up from Your Stats, and on a phone their
              header already holds "Sign Up to Save", so the icons are for
              accounts (Common Mistakes also shows to guests on wider screens). */}
          {user && (
            <Link
              href={`${statsBase}/stats`}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              title={t("stats.yourStats")}
              aria-label={t("stats.yourStats")}
            >
              <BarChart3 className="h-5 w-5 stats-icon" />
            </Link>
          )}
          {(user || isGuest) && communityOn && (
            <Link
              href={`${statsBase}/stats?tab=community`}
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
          ) : guest && onDashboard ? null : isGuest ? (
            <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold">
              <Link href={theme.signupPath}>
                {t("common.signUpToSave")}
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Link href={theme.loginPath}>
                {t("common.signIn")}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
