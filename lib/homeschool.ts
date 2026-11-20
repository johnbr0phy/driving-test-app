/**
 * The /homeschool hub: free school tests grouped by grade band for parents
 * who homeschool. Every test here is free (school, college-entrance and
 * children's tests are never sold), so the page may say so.
 */
import { TEST_CATALOG, type TestCatalogEntry } from "./testCatalog";

export const HOMESCHOOL_PATH = "/homeschool";

export interface HomeschoolBand {
  id: string;
  title: string;
  intro: string;
  /** Exam id and who usually takes it, from that exam's docs/exams file. */
  tests: { id: string; who: string }[];
}

export const HOMESCHOOL_BANDS: HomeschoolBand[] = [
  {
    id: "elementary",
    title: "Grades 2 to 5",
    intro: "Math, reading and language checks, and gifted program screening.",
    tests: [
      { id: "mapgrowth", who: "Grades 2 to 5: math, reading and language usage" },
      { id: "cogat", who: "Grades 3 to 6: verbal and quantitative reasoning" },
    ],
  },
  {
    id: "middle",
    title: "Grades 5 to 8",
    intro: "Private and selective school entrance tests, and first high school courses.",
    tests: [
      { id: "ssat", who: "Grades 5 to 7, Middle Level" },
      { id: "isee", who: "Grades 7 and 8, Middle Level" },
      { id: "hspt", who: "Grade 8, Catholic high school entrance" },
      { id: "shsat", who: "Grades 8 and 9, NYC specialized high schools" },
      { id: "staaralg1", who: "Grade 8 or 9, an Algebra I course check" },
    ],
  },
  {
    id: "high",
    title: "High school",
    intro: "Course checks, college entrance tests, AP exams and the high school equivalency tests.",
    tests: [
      { id: "staareng1", who: "An English I course check" },
      { id: "staarbio", who: "A Biology course check" },
      { id: "psat", who: "Grades 10 and 11, also for National Merit" },
      { id: "sat", who: "College entrance" },
      { id: "act", who: "College entrance" },
      { id: "apcalcab", who: "AP course and exam" },
      { id: "apbio", who: "AP course and exam" },
      { id: "apush", who: "AP course and exam" },
      { id: "aplang", who: "AP course and exam" },
      { id: "apworld", who: "AP course and exam" },
      { id: "apgov", who: "AP course and exam" },
      { id: "aphug", who: "AP course and exam" },
      { id: "appsych", who: "AP course and exam" },
      { id: "apcsp", who: "AP course and exam" },
      { id: "ged", who: "High school equivalency" },
      { id: "hiset", who: "High school equivalency" },
    ],
  },
];

export function homeschoolBandTests(band: HomeschoolBand): { test: TestCatalogEntry; who: string }[] {
  return band.tests.flatMap(({ id, who }) => {
    const test = TEST_CATALOG.find((t) => t.id === id);
    return test ? [{ test, who }] : [];
  });
}

export const HOMESCHOOL_TEST_IDS = HOMESCHOOL_BANDS.flatMap((b) => b.tests.map((t) => t.id));

export const HOMESCHOOL_FAQS: { q: string; a: string }[] = [
  {
    q: "Do homeschoolers have to take standardized tests?",
    a: "It depends on your state. Some states have no testing rule for homeschoolers, some ask for a yearly standardized test or an evaluation, and some only in certain grades. Your state's education department or homeschool law has the current rule and the list of tests that count.",
  },
  {
    q: "Which standardized tests do homeschoolers take?",
    a: "Common choices are the Iowa Assessments, the Stanford Achievement Test, the CAT, TerraNova, NWEA MAP Growth and the Classic Learning Test (CLT). Tigertest has free MAP Growth practice for grades 2 to 5. The other tests on this page are practice for entrance, course and college tests, and they show your child's strong and weak topics either way.",
  },
  {
    q: "Are these homeschool practice tests free?",
    a: "Yes. Every school, entrance and college test on Tigertest is free, with no account needed. Each one has short topic drills where missed questions come back until they stick, plus full practice tests with explanations.",
  },
  {
    q: "Can I use these to check my child's grade level?",
    a: "As a rough check, yes. A practice test shows which topics your child has down and which need more work. It is practice, not an official score: it gives no grade equivalent or percentile, and it does not replace a test your state requires.",
  },
  {
    q: "Can I track more than one child?",
    a: "Yes. Make a free family class for a test, send each child the link, and each one joins with their first name. Your class page shows who practiced, their practice test scores and the topics and questions they miss most. Make one class per test.",
  },
  {
    q: "Do my kids need accounts?",
    a: "No. A child can practice as a guest or join your family class with just a name. You need a free account to make the class. An account for a child is optional and keeps their progress across devices.",
  },
  {
    q: "Can I make a quiz from our own curriculum?",
    a: "Yes. With a free account you can turn a chapter, a unit or your own notes into a Tigertest quiz, using your own ChatGPT or Claude, and limit it to your family class.",
  },
];
