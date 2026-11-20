"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LandingIntro } from "@/components/exam/LandingIntro";
import { ThemedScreenshot } from "@/components/ThemedScreenshot";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useExamStarted } from "@/hooks/useExamStarted";
import { getExamByPath } from "@/lib/exams";
import { useTranslation } from "@/contexts/LanguageContext";
import { pageEnglishLocale } from "@/lib/pageLanguage";
import type { Language } from "@/i18n";
import { LandingTryQuestion } from "@/components/exam/LandingTryQuestion";
import { LANDING_TRY_INIT_SCRIPT, noteLandingTryEnrolled } from "@/lib/landingTryTest";
import type { LandingTryQuestion as TryQuestion } from "@/lib/landingTryQuestion";

// The homepage hero (components/HomeHero.tsx) for a non-DMV test: short
// subtitle, black pill CTA that turns into "Go to Dashboard" once there is a
// session, then the two product screenshots (hidden while the try card shows).
// Everything here is free to start and needs no account, so the CTA always goes
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
    orFull: "Or start the full practice set",
    dashboard: "Go to Dashboard",
    mobile: "Train on mobile",
    desktop: "Test on desktop",
    mobileAlt: (name: string) => `Tigertest ${name} practice test training mode on mobile`,
    desktopAlt: (name: string) => `Tigertest ${name} practice test on desktop`,
  },
  es: {
    start: "Empezar a practicar",
    dashboard: "Ir a mi panel",
    mobile: "Practica en el celular",
    desktop: "Haz el examen en la computadora",
    mobileAlt: (name: string) => `Práctica por tema del examen ${name} de Tigertest en el celular`,
    desktopAlt: (name: string) => `Examen de práctica ${name} de Tigertest en la computadora`,
  },
  vi: {
    start: "Bắt đầu luyện tập",
    dashboard: "Đến bảng điều khiển",
    mobile: "Luyện tập trên điện thoại",
    desktop: "Thi thử trên máy tính",
    mobileAlt: (name: string) => `Chế độ luyện tập bài thi thử ${name} của Tigertest trên điện thoại`,
    desktopAlt: (name: string) => `Bài thi thử ${name} của Tigertest trên máy tính`,
  },
  ko: {
    start: "연습 시작하기",
    dashboard: "대시보드로 가기",
    mobile: "휴대폰으로 연습",
    desktop: "컴퓨터로 시험",
    mobileAlt: (name: string) => `휴대폰에서 보는 Tigertest ${name} 연습 시험 연습 모드`,
    desktopAlt: (name: string) => `컴퓨터에서 보는 Tigertest ${name} 연습 시험`,
  },
  zh: {
    start: "开始练习",
    dashboard: "前往我的面板",
    mobile: "在手机上练习",
    desktop: "在电脑上考试",
    mobileAlt: (name: string) => `Tigertest ${name} 模拟考试手机练习模式`,
    desktopAlt: (name: string) => `Tigertest ${name} 电脑模拟考试`,
  },
  de: {
    start: "Jetzt üben",
    dashboard: "Zur Übersicht",
    mobile: "Auf dem Handy üben",
    desktop: "Am Computer testen",
    mobileAlt: (name: string) => `Tigertest ${name}: Trainingsmodus auf dem Handy`,
    desktopAlt: (name: string) => `Tigertest ${name}: Übungstest am Computer`,
  },
  fr: {
    start: "Commencer à s'entraîner",
    dashboard: "Aller au tableau de bord",
    mobile: "Entraînez-vous sur mobile",
    desktop: "Passez le test sur ordinateur",
    mobileAlt: (name: string) => `Tigertest ${name}\u00a0: mode entraînement sur mobile`,
    desktopAlt: (name: string) => `Tigertest ${name}\u00a0: test d'entraînement sur ordinateur`,
  },
  it: {
    start: "Inizia a esercitarti",
    dashboard: "Vai alla dashboard",
    mobile: "Esercitati sullo smartphone",
    desktop: "Fai il test al computer",
    mobileAlt: (name: string) => `Tigertest ${name}: modalità allenamento sullo smartphone`,
    desktopAlt: (name: string) => `Tigertest ${name}: test di esercitazione al computer`,
  },
  pl: {
    start: "Zacznij ćwiczyć",
    dashboard: "Przejdź do panelu",
    mobile: "Ćwicz na telefonie",
    desktop: "Rozwiąż test na komputerze",
    mobileAlt: (name: string) => `Tigertest ${name}: tryb treningu na telefonie`,
    desktopAlt: (name: string) => `Tigertest ${name}: test próbny na komputerze`,
  },
  nl: {
    start: "Begin met oefenen",
    dashboard: "Naar je overzicht",
    mobile: "Oefen op je telefoon",
    desktop: "Maak de toets op de computer",
    mobileAlt: (name: string) => `Tigertest ${name}: trainingsmodus op de telefoon`,
    desktopAlt: (name: string) => `Tigertest ${name}: oefentoets op de computer`,
  },
  pt: {
    start: "Começar a praticar",
    dashboard: "Ir para o painel",
    mobile: "Treinar no telemóvel",
    desktop: "Fazer o teste no computador",
    mobileAlt: (name: string) => `Tigertest ${name}: modo de treino no telemóvel`,
    desktopAlt: (name: string) => `Tigertest ${name}: teste de treino no computador`,
  },
  sv: {
    start: "Börja öva",
    dashboard: "Till översikten",
    mobile: "Öva i mobilen",
    desktop: "Gör provet på datorn",
    mobileAlt: (name: string) => `Tigertest ${name}: träningsläge i mobilen`,
    desktopAlt: (name: string) => `Tigertest ${name}: övningsprov på datorn`,
  },
  da: {
    start: "Begynd at øve",
    dashboard: "Til din oversigt",
    mobile: "Øv på din telefon",
    desktop: "Tag prøven på computeren",
    mobileAlt: (name: string) => `Tigertest ${name}: træning på telefonen`,
    desktopAlt: (name: string) => `Tigertest ${name}: øvelsesprøve på computeren`,
  },
  fi: {
    start: "Aloita harjoittelu",
    dashboard: "Yleisnäkymään",
    mobile: "Harjoittele puhelimella",
    desktop: "Tee koe tietokoneella",
    mobileAlt: (name: string) => `Tigertest ${name}: harjoittelutila puhelimessa`,
    desktopAlt: (name: string) => `Tigertest ${name}: harjoituskoe tietokoneella`,
  },
  hu: {
    start: "Gyakorlás indítása",
    dashboard: "Az áttekintéshez",
    mobile: "Gyakorolj a telefonodon",
    desktop: "Írd meg a tesztet számítógépen",
    mobileAlt: (name: string) => `Tigertest ${name}: gyakorló mód telefonon`,
    desktopAlt: (name: string) => `Tigertest ${name}: gyakorló teszt számítógépen`,
  },
  ro: {
    start: "Începe să exersezi",
    dashboard: "Mergi la panou",
    mobile: "Exersează pe telefon",
    desktop: "Dă testul pe computer",
    mobileAlt: (name: string) => `Tigertest ${name}: modul de exersare pe telefon`,
    desktopAlt: (name: string) => `Tigertest ${name}: test de exersare pe computer`,
  },
  el: {
    start: "Ξεκίνα την εξάσκηση",
    dashboard: "Στον πίνακα",
    mobile: "Εξασκήσου στο κινητό",
    desktop: "Κάνε το τεστ στον υπολογιστή",
    mobileAlt: (name: string) => `Tigertest ${name}: εξάσκηση στο κινητό`,
    desktopAlt: (name: string) => `Tigertest ${name}: τεστ εξάσκησης στον υπολογιστή`,
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
  const baseCopy = COPY[(lang ?? "en") as CopyLang] ?? COPY.en;
  const copy = (!lang || lang === "en") && pageEnglishLocale(dashboardHref) === "en-GB"
    ? { ...baseCopy, start: "Start practising" } : baseCopy;
  return { hasSession, loading, onStart, copy };
}

export function ExamLandingHeroClient({
  dashboardHref,
  subtitle,
  shortName,
  shots,
  lang,
  tryQuestion,
}: {
  dashboardHref: string;
  subtitle: string;
  shortName: string;
  shots: { mobile: string; desktop: string };
  lang?: Language;
  /** A playable question under the Start button (lib/landingTryQuestion.ts). */
  tryQuestion?: TryQuestion | null;
}) {
  const { hasSession, loading, onStart, copy } = useStartCta(dashboardHref, lang);
  // Answering the try card starts a guest session, which would turn
  // "Start practicing" into "Go to Dashboard" and shift the page while the
  // visitor reads. Hold the label it had when they answered.
  const [heldLabel, setHeldLabel] = useState<string | null>(null);
  const label = heldLabel ?? (hasSession ? copy.dashboard : copy.start);

  // Answering the card counts as starting the exam, so next visit gets "Go to
  // Dashboard" rather than the same question again.
  const markExamStarted = useStore((state) => state.markExamStarted);
  const hold = () => {
    setHeldLabel((h) => h ?? label);
    const id = getExamByPath(dashboardHref)?.id;
    if (id) markExamStarted(id);
  };
  const startPill = (
    <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
      <Link href={dashboardHref} onClick={onStart}>
        {label}
      </Link>
    </Button>
  );
  // Someone who already started this exam (signed in or guest) gets only
  // "Go to Dashboard": the question is for new visitors.
  const returning = hasSession && !heldLabel;
  // New visitors join the layout test (lib/landingTryTest.ts) once auth has
  // settled, so a returning visitor is never counted.
  const tryExam = tryQuestion?.examId;
  useEffect(() => {
    if (tryExam && !loading && !hasSession) noteLandingTryEnrolled(tryExam);
  }, [tryExam, loading, hasSession]);

  // The question comes first (both arms of landingTry2): the inline script
  // picks the arm before paint and CSS hides arm a's Start link for arm b.
  if (tryQuestion && !returning) {
    return (
      <>
        <script dangerouslySetInnerHTML={{ __html: LANDING_TRY_INIT_SCRIPT }} />
        {/* Lets globals.css tighten the page's H1 on phones so the options fit above the fold. */}
        <span data-try-first hidden />
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        <LandingTryQuestion q={tryQuestion} lang={lang} onAnswer={hold} />
        <div className="landing-try-start mt-6 flex flex-col items-center gap-3">
          <Link href={dashboardHref} onClick={onStart} className="text-base font-medium text-gray-700 dark:text-gray-200 underline underline-offset-4 decoration-gray-400 hover:text-gray-900 dark:hover:text-white">
            {(copy as { orFull?: string }).orFull ?? copy.start}
          </Link>
        </div>
      </>
    );
  }

  if (tryQuestion) return <LandingIntro subtitle={subtitle} action={startPill} />;

  return (
    <LandingIntro subtitle={subtitle} action={startPill}>
      {/* Pages with no question keep the screenshots. */}
      {(
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <ThemedScreenshot
              src={shots.mobile}
              alt={copy.mobileAlt(shortName)}
              width={384}
              height={640}
              className="w-[200px] md:w-[240px]"
              sizes="(min-width: 768px) 240px, 200px"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">{copy.mobile}</p>
        </div>

        <div className="relative">
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <ThemedScreenshot
              src={shots.desktop}
              alt={copy.desktopAlt(shortName)}
              width={1215}
              height={790}
              className="w-[320px] md:w-[500px]"
              sizes="(min-width: 768px) 500px, 320px"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">{copy.desktop}</p>
        </div>
      </div>
      )}
    </LandingIntro>
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
