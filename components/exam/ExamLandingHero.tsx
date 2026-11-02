"use client";

import Link from "next/link";
import { LandingIntro } from "@/components/exam/LandingIntro";
import { ThemedScreenshot } from "@/components/ThemedScreenshot";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useExamStarted } from "@/hooks/useExamStarted";
import { getExamByPath } from "@/lib/exams";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Language } from "@/i18n";

// The homepage hero (components/HomeHero.tsx) for a non-DMV test: short
// subtitle, black pill CTA that turns into "Go to Dashboard" once there is a
// session, then the two product screenshots.
// Everything here is free and needs no account, so the CTA always goes
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
  const copy = COPY[(lang ?? "en") as CopyLang] ?? COPY.en;
  return { hasSession, onStart, copy };
}

export function ExamLandingHero({
  dashboardHref,
  subtitle,
  shortName,
  shots,
  lang,
}: {
  dashboardHref: string;
  subtitle: string;
  shortName: string;
  shots: { mobile: string; desktop: string };
  lang?: Language;
}) {
  const { hasSession, onStart, copy } = useStartCta(dashboardHref, lang);

  return (
    <LandingIntro subtitle={subtitle} action={
        <Button asChild className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
          <Link href={dashboardHref} onClick={onStart}>
            {hasSession ? copy.dashboard : copy.start}
          </Link>
        </Button>
      }>
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
