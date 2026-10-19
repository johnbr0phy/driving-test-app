"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { useTestTheme } from "@/contexts/TestThemeContext";
import { Truck, Bike, Flag, Plane, Radio, Thermometer, HeartPulse, Pill, Syringe, Stethoscope, Activity, SmilePlus, Siren, Utensils, House, Umbrella, Stamp, GraduationCap, Cloud, Cpu, ChefHat, Sailboat, Target, LockKeyhole, BookOpenCheck, Medal, Bandage, HardHat, Forklift, Wine, PencilLine, BadgeCheck, LifeBuoy, Building2, Microscope, Scissors, ShieldCheck } from "lucide-react";
import { examLandingPath, examLanguage, examLanguages, getExamById, getExamVariants } from "@/lib/exams";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/contexts/LanguageContext";
import { createT, type Language } from "@/i18n";
import Image from "next/image";
import { TestSwitcher } from "@/components/TestSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdminLink } from "@/components/AdminLink";
import { TeachLink } from "@/components/TeachLink";
import { useExamStarted } from "@/hooks/useExamStarted";

export function CDLHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const photoURL = useStore((state) => state.photoURL);
  const theme = useTestTheme();
  // Guest of this exam only: starting another exam must not show
  // "Sign Up to Save" here before this one is started.
  const guest = useStore((state) => state.isGuest);
  const isGuest = useExamStarted(theme.id) && guest;
  const hydrated = useHydration();

  const displayPhotoURL = photoURL || user?.photoURL;
  // English unless this exam is offered in the person's language (CDL in
  // Spanish); a translated landing (/es/examen-practica-cdl) is in its own.
  const { language, setLanguage } = useTranslation();
  const router = useRouter();
  const exam = getExamById(theme.id);
  const landingLang = Object.entries(exam?.translations ?? {}).find(([, tr]) => tr.landingPath === pathname)?.[0] as
    | Language
    | undefined;
  const contentLang: Language = landingLang ?? (exam ? examLanguage(exam, language) : "en");
  const t = createT(contentLang);
  // The logo goes to the landing in the language the person is using, so
  // choosing Spanish and then tapping the logo lands on the Spanish page.
  const logoHref =
    (contentLang !== "en" && exam?.translations?.[contentLang as Exclude<Language, "en">]?.landingPath) || theme.logoHome;
  // A translated exam's landings carry the DMV homepage's language switcher:
  // each language is its own URL, so picking one goes there (and sets the app
  // language for the dashboard behind it).
  const onLanding = !!exam && (pathname === examLandingPath(exam) || !!landingLang);
  const landingLangs = exam ? examLanguages(exam) : [];
  const pageLang: Language = landingLang ?? "en";
  const goToLanding = (lang: Language) => {
    if (!exam) return;
    setLanguage(lang);
    const href = lang === "en" ? examLandingPath(exam) : exam.translations?.[lang as Exclude<Language, "en">]?.landingPath;
    if (href && href !== pathname) router.push(href);
  };

  // State variants (/real-estate/ca) run their tests under the family's header.
  const bases = [theme.routeBase, ...getExamVariants(theme.id).map((v) => v.slug)];
  const hideHeader = bases.some((b) => pathname?.startsWith(`${b}/test`) || pathname?.startsWith(`${b}/practice/`));

  if (hideHeader) {
    return null;
  }

  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={logoHref} className="flex items-center gap-2 group flex-shrink-0">
          {theme.logoIcon ? (
            <Image src={theme.logoIcon} alt={theme.name} width={40} height={40} className="w-10 h-10" />
          ) : (
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              {(() => {
                const icon = getExamById(theme.id)?.icon;
                if (icon === "bike") return <Bike className="h-6 w-6 text-white" />;
                if (icon === "flag") return <Flag className="h-6 w-6 text-white" />;
                if (icon === "plane") return <Plane className="h-6 w-6 text-white" />;
                if (icon === "radio") return <Radio className="h-6 w-6 text-white" />;
                if (icon === "thermometer") return <Thermometer className="h-6 w-6 text-white" />;
                if (icon === "heart") return <HeartPulse className="h-6 w-6 text-white" />;
                if (icon === "pill") return <Pill className="h-6 w-6 text-white" />;
                if (icon === "syringe") return <Syringe className="h-6 w-6 text-white" />;
                if (icon === "stethoscope") return <Stethoscope className="h-6 w-6 text-white" />;
                if (icon === "activity") return <Activity className="h-6 w-6 text-white" />;
                if (icon === "tooth") return <SmilePlus className="h-6 w-6 text-white" />;
                if (icon === "siren") return <Siren className="h-6 w-6 text-white" />;
                if (icon === "utensils") return <Utensils className="h-6 w-6 text-white" />;
                if (icon === "house") return <House className="h-6 w-6 text-white" />;
                if (icon === "umbrella") return <Umbrella className="h-6 w-6 text-white" />;
                if (icon === "stamp") return <Stamp className="h-6 w-6 text-white" />;
                if (icon === "graduation") return <GraduationCap className="h-6 w-6 text-white" />;
                if (icon === "cloud") return <Cloud className="h-6 w-6 text-white" />;
                if (icon === "cpu") return <Cpu className="h-6 w-6 text-white" />;
                if (icon === "chef") return <ChefHat className="h-6 w-6 text-white" />;
                if (icon === "sailboat") return <Sailboat className="h-6 w-6 text-white" />;
                if (icon === "target") return <Target className="h-6 w-6 text-white" />;
                if (icon === "lock") return <LockKeyhole className="h-6 w-6 text-white" />;
                if (icon === "book") return <BookOpenCheck className="h-6 w-6 text-white" />;
                if (icon === "medal") return <Medal className="h-6 w-6 text-white" />;
                if (icon === "bandage") return <Bandage className="h-6 w-6 text-white" />;
                if (icon === "hardhat") return <HardHat className="h-6 w-6 text-white" />;
                if (icon === "forklift") return <Forklift className="h-6 w-6 text-white" />;
                if (icon === "wine") return <Wine className="h-6 w-6 text-white" />;
                if (icon === "pencil") return <PencilLine className="h-6 w-6 text-white" />;
                if (icon === "badge") return <BadgeCheck className="h-6 w-6 text-white" />;
                if (icon === "lifebuoy") return <LifeBuoy className="h-6 w-6 text-white" />;
                if (icon === "building") return <Building2 className="h-6 w-6 text-white" />;
                if (icon === "microscope") return <Microscope className="h-6 w-6 text-white" />;
                if (icon === "scissors") return <Scissors className="h-6 w-6 text-white" />;
                if (icon === "shield") return <ShieldCheck className="h-6 w-6 text-white" />;
                return <Truck className="h-6 w-6 text-white" />;
              })()}
            </div>
          )}
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-50 group-hover:opacity-80 transition-opacity hidden sm:inline">
            {theme.headerTitle}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <TestSwitcher />
          <ThemeToggle />
          {onLanding && landingLangs.length > 1 && (
            <LanguageSwitcher languages={landingLangs} current={pageLang} onSelect={goToLanding} />
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
          ) : isGuest ? (
            <>
              <Link href={theme.loginPath} className="hidden sm:inline text-sm font-semibold text-gray-700 dark:text-gray-200 hover:underline">
                {t("common.signIn")}
              </Link>
              <Button asChild variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold">
                <Link href={theme.signupPath}>
                  {t("common.signUpToSave")}
                </Link>
              </Button>
            </>
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
