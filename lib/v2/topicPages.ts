/**
 * Topic question pages for v2 exams, the twin of lib/topicPages.ts: one page
 * per drill at "/questions/<exam slug>/<topic>" (served by the same
 * app/questions/[exam]/[topic] route, so no new dynamic route), with ten
 * printable questions from that drill's domains, answers and explanations,
 * for searches like "asvab arithmetic reasoning practice test" that one
 * landing per exam cannot answer. Held-out tests are never shown.
 *
 * Config only (no bank import), so the sitemap and llms.txt can list the
 * pages; the page itself loads the bank. Add an id to grow the set.
 */
import { EXAMS_V2, getExamV2 } from "./registry";
import type { ExamV2Config } from "./types";

export const TOPIC_V2_EXAM_IDS = ["asvab", "teas", "hesi", "ged", "sat", "act", "nclex", "nclexpn", "emt"] as const;

export interface ExamTopicV2 {
  /** The drill key, or "afqt" for the ASVAB's composite page. */
  key: string;
  label: string;
  slug: string;
  /** Page title (the search phrase it targets). */
  title: string;
  domains: string[];
  /** Section the questions come from; unset = any section (the AFQT page). */
  section?: string;
  /** The drill this page links to; unset = the dashboard. */
  drillKey?: string;
  /** One line on what the area covers. */
  blurb: string;
}

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Slugs and titles chosen for what people search ("math knowledge", not "mathematics knowledge"). */
const OVERRIDES: Record<string, Record<string, { slug?: string; title?: string }>> = {
  asvab: {
    mk: { slug: "math-knowledge", title: "ASVAB Math Knowledge Practice Test" },
    ei: { slug: "electronics", title: "ASVAB Electronics Information Practice Test" },
    as: { slug: "auto-and-shop", title: "ASVAB Auto and Shop Practice Test" },
    mc: { slug: "mechanical-comprehension" },
  },
};

/**
 * Drills left without a page because too few of their questions print as
 * plain HTML (long passages, data tables, case studies, figures).
 * tests/topic-pages-v2.test.cjs fails if a listed page has under five.
 */
const SKIP: Record<string, string[]> = {
  act: ["keyIdeas", "craftIntegration", "interpretation", "investigation", "evaluation"],
  nclex: ["health", "comfort"],
};

/** Extra pages that span several drills. */
const EXTRA: Record<string, ExamTopicV2[]> = {
  asvab: [
    {
      key: "afqt",
      label: "AFQT",
      slug: "afqt",
      title: "AFQT Practice Test",
      domains: ["asvabArithmetic", "asvabWordKnowledge", "asvabParagraph", "asvabMathKnowledge"],
      blurb:
        "The Armed Forces Qualification Test score that decides whether you can enlist comes from four ASVAB subtests only: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension and Mathematics Knowledge.",
    },
  ],
};

export function topicExamsV2(): ExamV2Config[] {
  return TOPIC_V2_EXAM_IDS.map((id) => EXAMS_V2.find((e) => e.id === id)).filter((e): e is ExamV2Config => !!e);
}

export const topicExamSlugV2 = (exam: ExamV2Config) => exam.slug.slice(1);

export function topicExamBySlugV2(slug: string): ExamV2Config | undefined {
  return topicExamsV2().find((e) => topicExamSlugV2(e) === slug);
}

export function examTopicsV2(exam: ExamV2Config): ExamTopicV2[] {
  const name = exam.english?.shortName ?? exam.shortName;
  const seen = new Set<string>();
  const fromDrills = exam.drills.filter((d) => !SKIP[exam.id]?.includes(d.key)).map((d) => {
    const o = OVERRIDES[exam.id]?.[d.key] ?? {};
    return {
      key: d.key,
      label: d.name,
      slug: o.slug ?? slugify(d.name),
      title: o.title ?? `${name} ${d.name} Practice Test`,
      domains: d.domains,
      section: d.section,
      drillKey: d.key,
      blurb: d.blurb,
    };
  });
  return [...(EXTRA[exam.id] ?? []), ...fromDrills].filter((t) => {
    if (!t.slug || t.slug === "most-missed" || seen.has(t.slug)) return false;
    seen.add(t.slug);
    return true;
  });
}

export const topicPathV2 = (exam: ExamV2Config, topic: ExamTopicV2) => `/questions/${topicExamSlugV2(exam)}/${topic.slug}`;

export function hasTopicPagesV2(examId: string): boolean {
  return (TOPIC_V2_EXAM_IDS as readonly string[]).includes(examId);
}

export function topicExamV2(examId: string): ExamV2Config | undefined {
  return hasTopicPagesV2(examId) ? getExamV2(examId) : undefined;
}
