import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// RRB NTPC (Railway Recruitment Boards, Non-Technical Popular Categories)
// CBT 1, the common screening test for the graduate and undergraduate levels,
// as notified in CEN 05/2024 and CEN 06/2024 (the 2025 sittings) and kept in
// CEN 06/2025 and CEN 07/2025 (CBT 1 held in 2026): 100 multiple-choice questions in
// 90 minutes (120 for eligible PwBD candidates with a scribe), General
// Awareness 40, Mathematics 30, General Intelligence and Reasoning 30, one
// mark each with 1/3 mark deducted for a wrong answer. Minimum qualifying
// marks: UR and EWS 40%, OBC (non-creamy layer) and SC 30%, ST 25%; CBT 1
// marks only shortlist for CBT 2 (after normalisation) and do not count in
// the final merit. Practice tests are full length: one 100-question module
// in 90 minutes, grouped by subject. Negative marking is
// explained in the copy, not scored. Drills: GA split into history and
// culture, geography, polity and economy, general science; maths into
// arithmetic and number/algebra/geometry; reasoning into verbal and logical
// (per test 10/10/10/10, 18/12, 15/15). GA is static facts only, no current
// affairs and no office-holders. Sources: tools/rrbntpc/sources.md.
const minutes = (n: number) => n * 60;

export const RRBNTPC: ExamV2Config = {
  id: "rrbntpc",
  slug: "/rrb-ntpc",
  landingPath: "/rrb-ntpc-practice-test",
  name: "RRB NTPC Practice Test",
  shortName: "RRB NTPC",
  fullName: "RRB NTPC CBT 1 (Railway Non-Technical Popular Categories)",
  tagline: "100 questions in 90 minutes on the RRB NTPC CBT 1 pattern: General Awareness, Mathematics and Reasoning.",
  icon: "building",
  theme: { brand: "350 50% 46%", brandDark: "350 50% 37%", brandLight: "350 50% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbt",
      name: "CBT 1",
      shortName: "CBT 1",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(90) }],
      directions: "100 questions in 90 minutes, the real CBT 1 length, grouped by subject: General Awareness (1 to 40), Mathematics (41 to 70), then General Intelligence and Reasoning (71 to 100). You can move between questions and flag them. The real exam takes away 1/3 mark for each wrong answer; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(100),
      domains: ["ntpcHistory", "ntpcGeography", "ntpcPolity", "ntpcScience", "ntpcArithmetic", "ntpcMaths", "ntpcVerbal", "ntpcLogical"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ntpcHistory: "General Awareness: History, Culture and Sports",
    ntpcGeography: "General Awareness: Geography",
    ntpcPolity: "General Awareness: Polity and Economy",
    ntpcScience: "General Awareness: General Science",
    ntpcArithmetic: "Mathematics: Arithmetic",
    ntpcMaths: "Mathematics: Numbers, Algebra and Geometry",
    ntpcVerbal: "Reasoning: Verbal",
    ntpcLogical: "Reasoning: Logical",
  },
  drills: [
    { key: "history", name: "History and Culture", section: "cbt", domains: ["ntpcHistory"], blurb: "Ancient, medieval and modern India, the freedom struggle, dance, monuments and sports." },
    { key: "geography", name: "Geography", section: "cbt", domains: ["ntpcGeography"], blurb: "Rivers, dams, passes, lakes, states, soils, climate and India's neighbours." },
    { key: "polity", name: "Polity and Economy", section: "cbt", domains: ["ntpcPolity"], blurb: "The Constitution, Parliament, the Union and states, banking and taxes." },
    { key: "science", name: "General Science", section: "cbt", domains: ["ntpcScience"], blurb: "Physics, chemistry and biology to class 10, plus computer basics." },
    { key: "arithmetic", name: "Arithmetic", section: "cbt", domains: ["ntpcArithmetic"], blurb: "Percentages, profit and loss, interest, ratio, averages, work, trains and boats." },
    { key: "maths", name: "Numbers, Algebra and Geometry", section: "cbt", domains: ["ntpcMaths"], blurb: "LCM and HCF, simplification, algebra, mensuration, trigonometry and statistics." },
    { key: "verbal", name: "Verbal Reasoning", section: "cbt", domains: ["ntpcVerbal"], blurb: "Analogies, odd one out, number and letter series, coding-decoding and sign swaps." },
    { key: "logical", name: "Logical Reasoning", section: "cbt", domains: ["ntpcLogical"], blurb: "Blood relations, directions, syllogisms, ranking, seating, calendar and clock." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "The qualifying minimum for UR and EWS",
    50: "Above the qualifying minimum",
    60: "A solid score",
    70: "Competitive for CBT 2 shortlisting",
    80: "A strong, safe score",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full CBT 1.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for CBT 1.",
    ],
    sourceLine: "Original practice questions on the RRB NTPC CBT 1 syllabus (CEN 05/2024 and 06/2024, kept in CEN 06/2025 and 07/2025). Not affiliated with or endorsed by the Railway Recruitment Boards or Indian Railways.",
    scoreNote: "Percent correct, with no negative marking. The real CBT 1 deducts 1/3 mark for each wrong answer, so a blind guess among four options gains nothing on average, while ruling out even one option makes a guess worth taking. Qualifying minimums are 40% (UR, EWS), 30% (OBC, SC) and 25% (ST), but CBT 2 shortlisting goes by normalised marks and usually needs much more.",
  },
};
