// Landing content in a language other than English, for the pages that quote
// an exam outside its own landing: a country homepage in that language lists
// each test with its landing's facts answer ("Über jede Prüfung"). Server only.
// Register a landing here when its country homepage is in its language: a
// native exam's base landing (detheorie.de) and a translation that becomes its
// country's page language (esdgt.es, ptimt.pt).

/** One exam landing in one language (lib/landings/<examId>.<lang>.json),
 *  rendered by components/exam/TranslatedExamLanding.tsx. */
export interface TranslatedLandingContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  breadcrumb: { home: string; allTests: string; current: string };
  h1: string;
  subtitle: string;
  facts: {
    h2: string;
    answer: string;
    tigertest: string;
    rows: { label: string; value: string }[];
    footnote: string;
    /** The official source in this language; defaults to EXAM_FACTS[id].source (English). */
    source?: { name: string; url: string };
  };
  howItWorks: { h2: string; cards: { h3: string; p: string }[] };
  topics: { h2: string; p: string; items: string[] };
  howToPass: { h2: string; steps: { h3: string; p: string }[] };
  faqTitle: string;
  faqs: { q: string; a: string }[];
  finalCta: { h2: string; p: string };
}
import detheorieDe from "@/lib/landings/detheorie.de.json";
import esdgtEs from "@/lib/landings/esdgt.es.json";
import ptimtPt from "@/lib/landings/ptimt.pt.json";

const LANDINGS: Record<string, TranslatedLandingContent> = {
  "detheorie.de": detheorieDe as TranslatedLandingContent,
  "esdgt.es": esdgtEs as TranslatedLandingContent,
  "ptimt.pt": ptimtPt as TranslatedLandingContent,
};

/** The landing content of `examId` in `lang`, if one is registered. */
export function landingContent(examId: string, lang: string): TranslatedLandingContent | undefined {
  return LANDINGS[`${examId}.${lang}`];
}
