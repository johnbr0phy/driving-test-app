import Link from "next/link";
import { practiceLabel } from "@/lib/practiceLabel";
import { TEST_CATALOG, relatedTests } from "@/lib/testCatalog";
import { CommunityUpsell } from "@/components/CommunityUpsell";
import { regionHomePath, regionInfo, regionOfTest } from "@/lib/region";
import { LANGUAGES, type Language } from "@/i18n";
import { examBaseLanguage, getExamById } from "@/lib/exams";
import { TOPIC_ALSO, examTopics, hasTopicPages, topicPath } from "@/lib/topicPages";
import { examTopicsV2, topicExamV2, topicPathV2 } from "@/lib/v2/topicPages";
import { COUNTRY_NAMES } from "@/components/home/homeCopy";

const RELATED_COPY: Partial<Record<Language, { title: string; sub: string; country: (name: string) => string; all: (n: number) => string }>> = {
  en: {
    title: "Related practice tests",
    sub: "Every test on Tigertest is free to start, with no account needed.",
    country: (name) => `Free practice tests for ${name}`,
    all: (n) => `See all ${n} practice tests`,
  },
  es: {
    title: "Otros exámenes de práctica",
    sub: "Todos los exámenes de Tigertest son gratis y no necesitas cuenta para empezar.",
    country: (name) => `Exámenes de práctica gratis: ${name}`,
    all: (n) => `Ver los ${n} exámenes de práctica`,
  },
  de: {
    title: "Weitere Übungstests",
    sub: "Jeder Test auf Tigertest ist kostenlos und ohne Konto startklar.",
    country: (name) => `Kostenlose Übungstests: ${name}`,
    all: (n) => `Alle ${n} Übungstests ansehen`,
  },
  fr: {
    title: "Autres tests d'entraînement",
    sub: "Tous les tests de Tigertest sont gratuits et sans compte pour commencer.",
    country: (name) => `Tests d'entraînement gratuits\u00a0: ${name}`,
    all: (n) => `Voir les ${n} tests d'entraînement`,
  },
  it: {
    title: "Altri test di esercitazione",
    sub: "Tutti i test di Tigertest sono gratuiti e non serve un account per iniziare.",
    country: (name) => `Test di esercitazione gratuiti: ${name}`,
    all: (n) => `Vedi tutti i ${n} test`,
  },
  pl: {
    title: "Podobne testy próbne",
    sub: "Każdy test na Tigertest jest darmowy i nie wymaga konta.",
    country: (name) => `Darmowe testy próbne: ${name}`,
    all: (n) => `Zobacz wszystkie testy (${n})`,
  },
  nl: {
    title: "Andere oefentoetsen",
    sub: "Elke toets op Tigertest is gratis en je hebt geen account nodig om te beginnen.",
    country: (name) => `Gratis oefentoetsen: ${name}`,
    all: (n) => `Bekijk alle ${n} oefentoetsen`,
  },
  pt: {
    title: "Outros testes de treino",
    sub: "Todos os testes do Tigertest são gratuitos e não é preciso conta para começar.",
    country: (name) => `Testes de treino gratuitos: ${name}`,
    all: (n) => `Ver os ${n} testes de treino`,
  },
  sv: {
    title: "Fler övningsprov",
    sub: "Alla prov på Tigertest är gratis och du behöver inget konto för att börja.",
    country: (name) => `Gratis övningsprov: ${name}`,
    all: (n) => `Se alla ${n} övningsprov`,
  },
  da: {
    title: "Andre øvelsesprøver",
    sub: "Alle prøver på Tigertest er gratis, og du skal ikke have en konto for at begynde.",
    country: (name) => `Gratis øvelsesprøver: ${name}`,
    all: (n) => `Se alle ${n} øvelsesprøver`,
  },
  fi: {
    title: "Lisää harjoituskokeita",
    sub: "Kaikki Tigertestin kokeet ovat ilmaisia, eikä aloittamiseen tarvita tiliä.",
    country: (name) => `Ilmaiset harjoituskokeet: ${name}`,
    all: (n) => `Katso kaikki ${n} harjoituskoetta`,
  },
  hu: {
    title: "További gyakorló tesztek",
    sub: "A Tigertesten minden teszt ingyenes, és a kezdéshez nem kell fiók.",
    country: (name) => `Ingyenes gyakorló tesztek: ${name}`,
    all: (n) => `Mind a(z) ${n} gyakorló teszt megtekintése`,
  },
  ro: {
    title: "Alte teste de exersare",
    sub: "Pe Tigertest fiecare test e gratuit și nu ai nevoie de cont ca să începi.",
    country: (name) => `Teste de exersare gratuite: ${name}`,
    all: (n) => `Vezi toate testele de exersare (${n})`,
  },
  el: {
    title: "Περισσότερα τεστ εξάσκησης",
    sub: "Όλα τα τεστ του Tigertest είναι δωρεάν και δεν χρειάζεσαι λογαριασμό για να ξεκινήσεις.",
    country: (name) => `Δωρεάν τεστ εξάσκησης: ${name}`,
    all: (n) => `Δες και τα ${n} τεστ εξάσκησης`,
  },
};

/**
 * "Questions by topic" links on the landing of an exam that has topic pages
 * (lib/topicPages.ts): the crawlable path from the landing to each of them.
 */
function ExamTopicLinks({ examId, lang }: { examId: string; lang: Language }) {
  const exam = lang === "en" && hasTopicPages(examId) ? getExamById(examId) : undefined;
  const v2 = lang === "en" && !exam ? topicExamV2(examId) : undefined;
  if (v2) {
    const name = v2.english?.shortName ?? v2.shortName;
    return (
      <section aria-labelledby="topic-questions" className="max-w-5xl mx-auto px-6 pt-12 md:pt-16">
        <h2 id="topic-questions" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-2">
          {name} practice questions by section
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">Ten questions on each area of the exam, with the answers explained.</p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {examTopicsV2(v2).map((t) => (
            <li key={t.slug}>
              <Link href={topicPathV2(v2, t)} className="text-brand-dark underline underline-offset-2">
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (!exam) return null;
  return (
    <section aria-labelledby="topic-questions" className="max-w-5xl mx-auto px-6 pt-12 md:pt-16">
      <h2 id="topic-questions" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-2">
        {practiceLabel(exam.shortName)} practice questions by topic
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">Ten questions on each area of the exam, with the answers explained.</p>
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {examTopics(exam).map((t) => (
          <li key={t.slug}>
            <Link href={topicPath(exam, t)} className="text-brand-dark underline underline-offset-2">
              {t.title ?? t.label}
            </Link>
          </li>
        ))}
      </ul>
      {(TOPIC_ALSO[examId] ?? []).map((id) => {
        const other = getExamById(id);
        if (!other || !hasTopicPages(id)) return null;
        return (
          <ul key={id} aria-label={`${other.name} practice questions`} className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {examTopics(other).map((t) => (
              <li key={t.slug}>
                <Link href={topicPath(other, t)} className="text-brand-dark underline underline-offset-2">
                  {t.title ?? `${other.shortName}: ${t.label}`}
                </Link>
              </li>
            ))}
          </ul>
        );
      })}
    </section>
  );
}

/**
 * Plain links from a landing to the same test's landings in other languages
 * (the header switcher is a menu crawlers do not open), so each translated
 * landing has a link from its English twin and back.
 */
function ExamLanguageLinks({ examId, lang }: { examId: string; lang: Language }) {
  const exam = getExamById(examId);
  if (!exam) return null;
  const base = examBaseLanguage(exam);
  const pages = [
    ...(exam.landingPath ? [{ code: base, path: exam.landingPath }] : []),
    ...Object.entries(exam.translations ?? {}).map(([code, tr]) => ({ code: code as Language, path: tr.landingPath })),
  ].filter((p) => p.code !== lang && p.path);
  if (pages.length === 0) return null;
  return (
    <p className="max-w-5xl mx-auto px-6 pt-8 text-center text-sm text-gray-600 dark:text-gray-300">
      {pages.map((p, i) => {
        const l = LANGUAGES.find((x) => x.code === p.code);
        return (
          <span key={p.code}>
            {i > 0 && " · "}
            <Link href={p.path} hrefLang={p.code} className="text-brand-dark underline underline-offset-2">
              {l ? `${l.flag} ${l.label}` : p.code}
            </Link>
          </span>
        );
      })}
    </p>
  );
}

// "Related practice tests" block for an exam landing: the rest of the exam's
// hub group (nursing, IT, driving...) plus a link to the hub. This is the
// cross-linking that lets new landings share authority with their neighbours.
// Every landing renders it, so it also carries the exam's "Short on time?"
// Common Mistakes upsell, which appears once the exam has enough answers.
export function ExamRelatedTests({ examId, lang = "en" }: { examId: string; lang?: Language }) {
  const copy = RELATED_COPY[lang] ?? RELATED_COPY.en!;
  const tests = relatedTests(examId);
  // A country's exam links up to that country's homepage (/ph, /uk...), the
  // hub that collects its tests, so the country page earns links from them.
  const region = regionOfTest(examId);
  const country = region === "US" || region === "GLOBAL" ? null : regionInfo(region);
  if (tests.length === 0) return <><ExamTopicLinks examId={examId} lang={lang} /><CommunityUpsell examId={examId} /></>;

  return (
    <>
    <ExamTopicLinks examId={examId} lang={lang} />
    <ExamLanguageLinks examId={examId} lang={lang} />
    <CommunityUpsell examId={examId} />
    <section aria-labelledby="related-tests" className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <h2 id="related-tests" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-2">
        {copy.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">{copy.sub}</p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <li key={test.id}>
            <Link
              href={test.href}
              className="block h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-brand hover:shadow-sm transition-colors"
            >
              <span className="block font-semibold text-gray-900 dark:text-gray-50">{test.nativeName && test.language === lang ? test.nativeName : test.name}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">{test.org}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
        {country && (
          <Link href={regionHomePath(country.code)} className="text-brand-dark font-medium hover:underline">
            {copy.country(lang === "en" ? country.inName : COUNTRY_NAMES[lang]?.[country.code] ?? country.name)}
          </Link>
        )}
        <Link href="/tests" className="text-brand-dark font-medium hover:underline">
          {copy.all(TEST_CATALOG.length)}
        </Link>
      </p>
    </section>
    </>
  );
}
