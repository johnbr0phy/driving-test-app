"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, ChevronDown, Plus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AdminLink } from "@/components/AdminLink";
import { BrandLockup } from "@/components/BrandLockup";
import { FLAGS } from "@/components/CountryPills";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TestSearchSheet } from "@/components/TestSearchSheet";
import { currentClassCode, rememberCurrentClass, useStudentClass, useTeacherClasses, useTeaches } from "@/components/TeachLink";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { TestThemeProvider, themes } from "@/contexts/TestThemeContext";
import { useExamStarted } from "@/hooks/useExamStarted";
import { useHydration } from "@/hooks/useHydration";
import { useThemePath } from "@/hooks/useThemePath";
import { states } from "@/data/states";
import { createT, DMV_LANGUAGES, type Language } from "@/i18n";
import { examBaseLanguage, examLandingPath, examLanguages, getExamByPath, getExamVariants } from "@/lib/exams";
import { useTestLanguage } from "@/hooks/useTestLanguage";
import { isDmvPath } from "@/lib/pageLanguage";
import { classExamHome } from "@/lib/classes";
import { REGIONS, regionHomePath, regionOfTest } from "@/lib/region";
import { getCatalogEntry, type TestCatalogEntry } from "@/lib/testCatalog";
import { v2DarkThemeStyle } from "@/lib/v2/darkTheme";
import { getExamV2ByPath, v2Routes } from "@/lib/v2/registry";
import { useStore } from "@/store/useStore";
import { useV2Store } from "@/store/useV2Store";

// Pages that are the search for a test themselves, so they carry no test chip.
const HOME_PATHS = new Set(["/tests", ...REGIONS.map((r) => regionHomePath(r.code))]);
// English homepages open on the big wordmark and search box (SearchHome), so
// the header there drops its border.
const SEARCH_HOMES = new Set(REGIONS.filter((r) => r.lang === "en").map((r) => regionHomePath(r.code)));

/**
 * True on the full-screen pages where someone is answering questions: tests,
 * training sets, drills and quiz play. Those draw their own FocusBar (or the
 * v2 runners' bar) instead of the site header. Results pages keep the header.
 */
export function isRunnerPath(path: string | null | undefined): boolean {
  if (!path || /\/results\/?$/.test(path)) return false;
  if (path === "/training" || path.startsWith("/test/") || path.startsWith("/practice/")) return true;
  if (/^\/q\/[^/]+\/(practice|test|flashcards)(\/|$)/.test(path)) return true;
  const exam = getExamByPath(path);
  const bases = exam ? [exam.slug, ...getExamVariants(exam.id).map((v) => v.slug)] : [];
  const v2 = getExamV2ByPath(path);
  if (v2) bases.push(v2.slug);
  return bases.some((b) => path.startsWith(`${b}/test/`) || path.startsWith(`${b}/practice/`));
}

const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50";
const pill = "rounded-full px-3 sm:px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors";

/**
 * The one header on every page that is not a test runner: full width, the
 * tiger (to the homepage), then either a pill naming the test on screen (it
 * opens the test search) or the class on screen (a teacher's class page), or,
 * on every other page, the TESTS / TEACH tabs (TEACH reads CLASSES for a
 * teacher or a class's student), then Your Stats and the account. It replaced the DMV, exam and v2 headers and the All
 * tests menu (Nov 2026).
 */
export function SiteHeader() {
  const realPath = usePathname();
  const themePath = useThemePath();
  const exam = getExamByPath(themePath);
  const examV2 = exam ? undefined : getExamV2ByPath(themePath);

  if (isRunnerPath(realPath)) return null;

  const bar = <HeaderBar path={realPath ?? "/"} themePath={themePath ?? "/"} examId={exam?.id} v2Id={examV2?.id} />;
  if (exam) return <TestThemeProvider theme={exam.id}>{bar}</TestThemeProvider>;
  if (examV2) {
    // The dark tints ride along for the header's brand-colored controls.
    const style = {
      "--brand": examV2.theme.brand,
      "--brand-dark": examV2.theme.brandDark,
      "--brand-light": examV2.theme.brandLight,
      ...v2DarkThemeStyle(examV2.theme),
    } as CSSProperties;
    return <div style={style}>{bar}</div>;
  }
  return bar;
}

function HeaderBar({ path, themePath, examId, v2Id }: { path: string; themePath: string; examId?: string; v2Id?: string }) {
  const { user } = useAuth();
  const { t: pageT } = useTranslation();
  const hydrated = useHydration();
  const guest = useStore((s) => s.isGuest);
  const selectedState = useStore((s) => s.selectedState);
  const [searchOpen, setSearchOpen] = useState(false);
  const teaches = useTeaches();
  const studentClass = useStudentClass();
  const classCode = path.match(/^\/teach\/classes\/([^/]+)/)?.[1]?.toUpperCase();
  const [lastClass, setLastClass] = useState<string | null>(null);
  useEffect(() => {
    if (classCode) rememberCurrentClass(classCode);
    setLastClass(currentClassCode());
  }, [classCode]);

  const exam = examId ? getExamByPath(themePath) : undefined;
  const examV2 = v2Id ? getExamV2ByPath(themePath) : undefined;
  const dmv = !exam && !examV2 && isDmvPath(themePath);
  // On a v1 exam the labels follow the test's language (a translated landing, its own).
  const landingLang = exam
    ? (Object.entries(exam.translations ?? {}).find(([, tr]) => tr?.landingPath === path)?.[0] as Language | undefined)
    : undefined;
  const { lang: testLang } = useTestLanguage(exam?.id ?? "", exam ? examLanguages(exam) : ["en"], exam ? examBaseLanguage(exam) : "en");
  const t = exam ? createT(landingLang ?? testLang) : pageT;
  const searchHome = SEARCH_HOMES.has(path);
  const onTeach = path === "/teach" || path.startsWith("/teach/");

  // Started-ness decides "Sign up to save" and Your Stats for guests.
  const dmvStarted = useExamStarted("dmv");
  const examStarted = useExamStarted(examId ?? "dmv");
  const v2Progress = useV2Store(
    (s) =>
      !!v2Id &&
      (s.results.some((r) => r.examId === v2Id) ||
        Object.keys(s.drills).some((k) => k.startsWith(`${v2Id}:`)) ||
        Object.keys(s.questionStats?.[v2Id] ?? {}).length > 0),
  );

  // The pill: the test this page belongs to; none on the search pages or
  // pages that belong to no test, which show the tabs instead.
  const pageTest: TestCatalogEntry | undefined = exam
    ? getCatalogEntry(exam.id)
    : examV2
      ? getCatalogEntry(examV2.id)
      : dmv
        ? getCatalogEntry("dmv")
        : undefined;
  const chipTest = HOME_PATHS.has(path) || classCode ? undefined : pageTest;
  const classPill = !!classCode && !!user;

  // TEACH becomes CLASSES once this browser teaches or is in a class: a
  // teacher goes back to the class they last opened, a student to their class's test.
  const classesTab = teaches || !!studentClass;
  const teachHref = teaches ? (lastClass ? `/teach/classes/${lastClass}` : "/teach") : studentClass ? classExamHome(studentClass.examId) : "/teach";
  const stateName = states.find((s) => s.code === selectedState)?.name;
  const chipLabel = chipTest ? (chipTest.id === "dmv" && stateName ? `DMV · ${stateName}` : chipTest.shortName) : "";
  const chipRegion = chipTest ? regionOfTest(chipTest.id) : "GLOBAL";

  // Your Stats for the test on screen.
  let statsPath: string | null = null;
  if (dmv && (user || (guest && dmvStarted))) statsPath = "/stats";
  if (exam && user) {
    const variant = getExamVariants(exam.id).find((v) => path === v.slug || path.startsWith(`${v.slug}/`));
    statsPath = `${variant?.slug ?? exam.slug}/stats`;
  }
  if (examV2 && hydrated && (user || v2Progress)) statsPath = v2Routes(examV2).stats;

  // A signed-out visitor's ask. Each dashboard's own save card (GuestSaveCard)
  // already offers Google, email and sign in, so the header leaves it to them.
  let signIn: ReactNode = null;
  if (!user) {
    const onboarding = path.startsWith("/onboarding");
    let href = "/login";
    let label = t("common.signIn");
    let show = true;
    if (dmv) {
      if (path === "/dmv/dashboard" && hydrated && !!selectedState && guest) show = false;
      else if (guest && onboarding) show = false;
      else if (guest && dmvStarted) [href, label] = ["/signup", t("common.signUpToSave")];
    } else if (exam) {
      const theme = themes[exam.id];
      const bases = [exam.slug, ...getExamVariants(exam.id).map((v) => v.slug)];
      if (guest && bases.some((b) => path === `${b}/dashboard`)) show = false;
      else if (guest && examStarted) [href, label] = [theme?.signupPath ?? "/signup", t("common.signUpToSave")];
      else href = theme?.loginPath ?? "/login";
    } else if (examV2) {
      if (path === `${examV2.slug}/dashboard`) show = false;
      else href = `/login?redirect=${examV2.slug}/dashboard`;
    }
    if (show) {
      signIn = (
        <Link href={href} className={`${pill} ml-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400`}>
          {label}
        </Link>
      );
    }
  }

  // Languages: the DMV landing and a translated exam's landings switch by URL here.
  let languages: ReactNode = null;
  if (path === "/dmv-practice-test") languages = <LanguageSwitcher languages={DMV_LANGUAGES} />;
  if (exam) {
    const onLanding = path === examLandingPath(exam) || !!landingLang;
    const langs = examLanguages(exam);
    if (onLanding && langs.length > 1) {
      const pageLang: Language = landingLang ?? examBaseLanguage(exam);
      const hrefs: Partial<Record<Language, string>> = {};
      for (const lang of langs) {
        if (lang === pageLang) continue;
        const href = lang === examBaseLanguage(exam) ? examLandingPath(exam) : exam.translations?.[lang]?.landingPath;
        if (href) hrefs[lang] = href;
      }
      languages = <LanguageSwitcher languages={langs} current={pageLang} hrefs={hrefs} />;
    }
  }

  return (
    <header className={searchHome ? "bg-white dark:bg-gray-950" : "border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"}>
      <div className="flex h-14 items-center gap-1.5 px-3 sm:gap-3 sm:px-6">
        <BrandLockup />

        {!chipTest && !classPill && (
          <nav aria-label="Site" className="ml-1 flex self-stretch items-stretch gap-5 sm:gap-6 text-sm font-semibold tracking-wide">
            <TabLink href="/" active={!onTeach}>TESTS</TabLink>
            <TabLink href={teachHref} active={onTeach}>{classesTab ? "CLASSES" : "TEACH"}</TabLink>
          </nav>
        )}

        {classPill && classCode && <ClassPill code={classCode} />}

        {chipTest && (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={`Switch test, currently ${chipLabel}`}
            className="ml-0.5 sm:ml-1 flex h-9 min-w-0 max-w-[16rem] items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-2.5 pr-2 text-sm font-semibold text-gray-900 dark:text-gray-50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span aria-hidden className="text-base leading-none">{chipRegion === "GLOBAL" ? "🌐" : FLAGS[chipRegion]}</span>
            <span className="truncate">{chipLabel}</span>
            <ChevronDown className="hidden h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400 min-[360px]:block" aria-hidden />
          </button>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-1">
          {languages}
          {statsPath && (
            <Link
              href={statsPath}
              aria-current={path === statsPath ? "page" : undefined}
              className={`${iconLink} ${path === statsPath ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : "text-gray-600 dark:text-gray-300"}`}
              title={t("stats.yourStats")}
              aria-label={t("stats.yourStats")}
            >
              <BarChart3 className="h-5 w-5 stats-icon" />
            </Link>
          )}
          {user ? (
            <>
              <AdminLink />
              <AccountMenu />
            </>
          ) : (
            signIn
          )}
        </div>
      </div>
      <TestSearchSheet open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function ClassPill({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  const classes = useTeacherClasses(true);
  const name = classes?.find((c) => c.code === code)?.name ?? code;
  const item = "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Switch class, currently ${name}`}
        className="ml-1 flex h-9 min-w-0 max-w-[16rem] items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-3 pr-2 text-sm font-semibold text-gray-900 dark:text-gray-50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Users className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" aria-hidden />
        <span className="truncate">{name}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="start" collisionPadding={12} className="w-72 max-h-[min(28rem,calc(100dvh-6rem))] overflow-y-auto rounded-2xl p-1.5">
        {classes?.map((c) => (
          <Link
            key={c.code}
            href={`/teach/classes/${c.code}`}
            onClick={() => setOpen(false)}
            aria-current={c.code === code ? "page" : undefined}
            className={`${item} ${c.code === code ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""}`}
          >
            <span className="min-w-0 flex-1 truncate">{c.name}</span>
            <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{c.memberCount}</span>
          </Link>
        ))}
        <div className={classes?.length ? "mt-1 border-t border-gray-100 dark:border-gray-800 pt-1" : ""}>
          <Link href="/teach" onClick={() => setOpen(false)} className={item}>
            All classes
          </Link>
          <Link href="/teach/new" onClick={() => setOpen(false)} className={item}>
            <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden />
            New class
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TabLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center ${active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"}`}
    >
      {children}
      {active && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
    </Link>
  );
}

function AccountMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const photoURL = useStore((s) => s.photoURL);
  const teaches = useTeaches();
  const [open, setOpen] = useState(false);
  const photo = photoURL || user?.photoURL;
  const item = "block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger aria-label="Your account" className="ml-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src={photo || undefined} alt="" />
          <AvatarFallback className="text-lg">😊</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" collisionPadding={12} className="w-60 rounded-2xl p-1.5">
        <div className="px-3 pb-2 pt-1.5 text-sm">
          <p className="truncate font-semibold text-gray-900 dark:text-gray-50">{user?.displayName || "Your account"}</p>
          {user?.email && <p className="truncate text-gray-500 dark:text-gray-400">{user.email}</p>}
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-1">
          <Link href="/settings" onClick={() => setOpen(false)} className={item}>
            Settings
          </Link>
          {teaches && (
            <Link href="/teach" onClick={() => setOpen(false)} className={item}>
              Your classes
            </Link>
          )}
          <button
            type="button"
            className={item}
            onClick={async () => {
              setOpen(false);
              await logout();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
