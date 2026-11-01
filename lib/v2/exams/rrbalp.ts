import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// RRB ALP (Assistant Loco Pilot, Level 2 of the 7th CPC pay matrix), the
// First Stage Computer Based Test (CBT 1), as notified in Centralised
// Employment Notice CEN 01/2026 (11,127 posts; applications 15 May to
// 14 June 2026; CBT 1 reported for 3 to 5 November 2026): 75 multiple-choice
// questions in 60 minutes on Mathematics, General Intelligence and Reasoning
// (Mental Ability) and General Science (physics, chemistry and life sciences
// to 10th standard CBSE level), one mark each with 1/3 mark deducted for a
// wrong answer. CEN 01/2026 dropped General Awareness and Current Affairs,
// which CEN 01/2024 and 01/2025 had in CBT 1 (as consistent exam-guide
// summaries report; the notice PDF could not be opened). No agreed per-subject
// split has been published; the 25/25/25 split here is Tigertest's.
// Minimum qualifying marks (as reported from the notice, unchanged from
// earlier ALP notices): UR and EWS 40%, OBC (non-creamy layer) and SC 30%,
// ST 25%. CBT 1 is a screening test: its marks do not count in the final
// merit; candidates are shortlisted for CBT 2 (Part A and the trade Part B)
// and then the computer based aptitude test. Practice tests are full length
// at the real pace: one 75-question module in 60 minutes, grouped by subject.
// Negative marking is explained in the copy, not scored. Drills: maths split
// into arithmetic and number/algebra/geometry; reasoning into verbal and
// logical; science into physics, chemistry and biology (per test 13/12,
// 13/12, 9/8/8). Sources: tools/next100/rrbalp/sources.md.
const minutes = (n: number) => n * 60;

export const RRBALP: ExamV2Config = {
  id: "rrbalp",
  slug: "/rrb-alp",
  landingPath: "/rrb-alp-practice-test",
  name: "RRB ALP Practice Test",
  shortName: "RRB ALP",
  fullName: "RRB ALP (Assistant Loco Pilot) CBT 1",
  tagline: "75 questions in 60 minutes on the RRB ALP CBT 1 pattern: Mathematics, Mental Ability and General Science.",
  icon: "building",
  theme: { brand: "355 55% 32%", brandDark: "355 55% 24%", brandLight: "355 55% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbt",
      name: "CBT 1",
      shortName: "CBT 1",
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(60) }],
      directions: "75 questions in 60 minutes, the real ALP CBT 1 length, grouped by subject: Mathematics (1 to 25), General Intelligence and Reasoning (26 to 50), then General Science (51 to 75). No agreed per-subject split has been published. You can move between questions and flag them. The real exam takes away 1/3 mark for each wrong answer; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(75),
      domains: ["rrbalpArithmetic", "rrbalpMaths", "rrbalpVerbal", "rrbalpLogical", "rrbalpPhysics", "rrbalpChemistry", "rrbalpBiology"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    rrbalpArithmetic: "Mathematics: Arithmetic",
    rrbalpMaths: "Mathematics: Numbers, Algebra and Geometry",
    rrbalpVerbal: "Reasoning: Verbal",
    rrbalpLogical: "Reasoning: Logical",
    rrbalpPhysics: "General Science: Physics",
    rrbalpChemistry: "General Science: Chemistry",
    rrbalpBiology: "General Science: Biology",
  },
  drills: [
    { key: "arithmetic", name: "Arithmetic", section: "cbt", domains: ["rrbalpArithmetic"], blurb: "Percentages, profit and loss, interest, ratio, averages, ages, work, pipes, trains, boats and mixtures." },
    { key: "maths", name: "Numbers, Algebra and Geometry", section: "cbt", domains: ["rrbalpMaths"], blurb: "BODMAS, LCM and HCF, roots, algebra, angles, mensuration, trigonometry and statistics." },
    { key: "verbal", name: "Verbal Reasoning", section: "cbt", domains: ["rrbalpVerbal"], blurb: "Analogies, odd one out, number and letter series, coding-decoding, sign swaps and word puzzles." },
    { key: "logical", name: "Logical Reasoning", section: "cbt", domains: ["rrbalpLogical"], blurb: "Blood relations, directions, syllogisms, ranking, seating, calendar, clock and statements." },
    { key: "physics", name: "Physics", section: "cbt", domains: ["rrbalpPhysics"], blurb: "Motion, force, gravitation, work and power, pressure, sound, light, electricity and magnetism to class 10." },
    { key: "chemistry", name: "Chemistry", section: "cbt", domains: ["rrbalpChemistry"], blurb: "Reactions and equations, acids and bases, metals, carbon compounds, the periodic table and the atom." },
    { key: "biology", name: "Biology", section: "cbt", domains: ["rrbalpBiology"], blurb: "Life processes, control and coordination, reproduction, heredity, health and the environment." },
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
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full CBT 1.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for ALP CBT 1.",
    ],
    sourceLine: "Original practice questions on the RRB ALP CBT 1 syllabus (CEN 01/2026). Not affiliated with or endorsed by the Railway Recruitment Boards or Indian Railways.",
    scoreNote: "Percent correct, with no negative marking. The real ALP CBT 1 deducts 1/3 mark for each wrong answer, so a blind guess among four options gains nothing on average, while ruling out even one option makes a guess worth taking. The qualifying minimums reported for the notice are 40% for UR and EWS, 30% for OBC and SC and 25% for ST, but CBT 1 is a screening test: candidates are called to CBT 2 by normalised marks against cut-offs set by each board, which are usually much higher.",
  },
};
