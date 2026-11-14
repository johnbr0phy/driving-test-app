/**
 * Topic question pages: "/questions/<exam>/<topic>" shows ten bank questions
 * on one content area of an exam, with answers and explanations, for searches
 * like "CNA infection control questions" that the one landing per exam cannot
 * answer. "/questions/<exam>/most-missed" shows the questions real users miss
 * most (Common Mistakes, lib/communityStats.ts) once the exam has the data.
 *
 * Only the exams listed here get pages: US and international career and
 * licensing exams, where one more useful page per topic earns its place.
 * Add an id to grow the set; the page, sitemap and landing links follow.
 */
import { EXAMS, ExamConfig, getExamById } from "./exams";

export const TOPIC_EXAM_IDS = [
  "realestate", "insurance", "pnc", "sie", "series7", "series63", "series65", "nmls", "txadjuster", "fladjuster", "notary",
  "cpafar", "cpareg", "cpaaud", "cfal1", "accafa", "phr", "cisa", "cssgb", "sfadmin", "llqp", "cemap",
  "cna", "ptcb", "phleb", "ccma", "cma", "cet", "danb", "cpc", "cca", "ccs", "rbt", "arrt", "nptepta", "rdexam", "vtne", "nasm",
  "aswb", "aswbclin", "nce",
  "cdl", "cdlx", "jelec", "nhie", "epa608", "foodmgr", "barber", "cosmetology", "moto", "civics", "part107",
] as const;

export const MOST_MISSED_SLUG = "most-missed";
/** Questions shown on a topic page. */
export const TOPIC_PAGE_SIZE = 10;
/** Most-missed questions shown in full; the rest stay in the Premium Common Mistakes tab. */
export const MOST_MISSED_SHOWN = 5;

export interface ExamTopic {
  key: string;
  label: string;
  slug: string;
  /** Questions of this topic on each practice test. */
  perTest: number;
  /** Page title when the search phrase differs from "<exam> <topic> Practice Questions". */
  title?: string;
}

/**
 * Titles in the words people search, per exam and category key. The CDL
 * endorsements are searched one at a time ("cdl hazmat practice test").
 */
const TOPIC_TITLES: Record<string, Record<string, string>> = {
  cdlx: {
    hazmatEndorsement: "CDL HazMat Endorsement Practice Test",
    airBrakes: "CDL Air Brakes Practice Test",
    combinationVehicles: "CDL Combination Vehicles Practice Test",
    tankVehicles: "CDL Tanker Endorsement Practice Test",
    passengerTransport: "CDL Passenger Endorsement Practice Test",
  },
};

/** Another exam's topic pages a landing also links to (the CDL landing lists the endorsements). */
export const TOPIC_ALSO: Record<string, string[]> = { cdl: ["cdlx"] };

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function topicExams(): ExamConfig[] {
  return TOPIC_EXAM_IDS.map((id) => getExamById(id)).filter((e): e is ExamConfig => !!e && EXAMS.includes(e));
}

/** The exam segment of the URL: the exam's own slug without its slash ("real-estate"). */
export const topicExamSlug = (exam: ExamConfig) => exam.slug.slice(1);

export function topicExamBySlug(slug: string): ExamConfig | undefined {
  return topicExams().find((e) => topicExamSlug(e) === slug);
}

export function examTopics(exam: ExamConfig): ExamTopic[] {
  const seen = new Set<string>();
  return Object.entries(exam.blueprint).flatMap(([key, perTest]) => {
    const label = exam.categoryLabels[key];
    const slug = label ? slugify(label) : "";
    // A topic needs enough questions to be worth a page: the tests alone draw perTest x testCount.
    if (!slug || slug === MOST_MISSED_SLUG || seen.has(slug) || perTest * exam.testCount < 5) return [];
    seen.add(slug);
    const title = TOPIC_TITLES[exam.id]?.[key];
    return [{ key, label, slug, perTest, ...(title ? { title } : {}) }];
  });
}

export const topicPath = (exam: ExamConfig, topic: ExamTopic) => `/questions/${topicExamSlug(exam)}/${topic.slug}`;
export const mostMissedPath = (exam: ExamConfig) => `/questions/${topicExamSlug(exam)}/${MOST_MISSED_SLUG}`;

/** Whether an exam has topic pages, for the links on its landing. */
export function hasTopicPages(examId: string): boolean {
  return (TOPIC_EXAM_IDS as readonly string[]).includes(examId);
}
