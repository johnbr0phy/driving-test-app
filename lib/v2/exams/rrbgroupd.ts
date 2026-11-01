import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// RRB Group D (Level 1 posts of the 7th CPC pay matrix: Track Maintainer
// Grade IV, Assistant (Points, Workshop, Bridge, Track Machine...), Hospital
// Assistant and the like), the single-stage Computer Based Test, as notified
// in CEN 08/2024 (CBT held November 2025 to early 2026) and kept in
// CEN 09/2025: 100 multiple-choice questions in 90 minutes (120 for eligible
// PwBD candidates with a scribe), General Science 25, Mathematics 25, General
// Intelligence and Reasoning 30, General Awareness and Current Affairs 20,
// one mark each with 1/3 mark deducted for a wrong answer. Minimum qualifying
// marks: UR and EWS 40%, OBC (non-creamy layer), SC and ST 30%, confirmed
// in the CEN 09/2025 notice (updated 30.01.2026). Shortlisting for the Physical Efficiency Test
// goes by normalised CBT marks; the PET (qualifying), document verification
// and a medical examination follow. Practice tests are full length: one
// 100-question module in 90 minutes, grouped by subject (the order of
// subjects on the real paper is not modelled). Negative marking is explained
// in the copy, not scored. Drills: maths split into arithmetic and
// number/algebra/geometry; reasoning into verbal and logical; science into
// physics, chemistry and biology; GA as one (per test 15/10, 15/15, 9/8/8,
// 20). GA is static facts only, no current affairs and no office-holders.
// Sources: tools/next100/rrbgroupd/sources.md.
const minutes = (n: number) => n * 60;

export const RRBGROUPD: ExamV2Config = {
  id: "rrbgroupd",
  slug: "/rrb-group-d",
  landingPath: "/rrb-group-d-practice-test",
  name: "RRB Group D Practice Test",
  shortName: "RRB Group D",
  fullName: "RRB Group D (Level 1) Computer Based Test",
  tagline: "100 questions in 90 minutes on the RRB Group D CBT pattern: Mathematics, Reasoning, General Science and General Awareness.",
  icon: "building",
  theme: { brand: "6 45% 36%", brandDark: "6 45% 28%", brandLight: "6 45% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbt",
      name: "CBT",
      shortName: "CBT",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(90) }],
      directions: "100 questions in 90 minutes, the real Group D CBT length, grouped by subject: Mathematics (1 to 25), General Intelligence and Reasoning (26 to 55), General Science (56 to 80), then General Awareness (81 to 100). You can move between questions and flag them. The real exam takes away 1/3 mark for each wrong answer; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(100),
      domains: ["rrbgdArithmetic", "rrbgdMaths", "rrbgdVerbal", "rrbgdLogical", "rrbgdPhysics", "rrbgdChemistry", "rrbgdBiology", "rrbgdGA"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    rrbgdArithmetic: "Mathematics: Arithmetic",
    rrbgdMaths: "Mathematics: Numbers, Algebra and Geometry",
    rrbgdVerbal: "Reasoning: Verbal",
    rrbgdLogical: "Reasoning: Logical",
    rrbgdPhysics: "General Science: Physics",
    rrbgdChemistry: "General Science: Chemistry",
    rrbgdBiology: "General Science: Biology",
    rrbgdGA: "General Awareness",
  },
  drills: [
    { key: "arithmetic", name: "Arithmetic", section: "cbt", domains: ["rrbgdArithmetic"], blurb: "Percentages, profit and loss, interest, ratio, averages, ages, work, trains, boats and mixtures." },
    { key: "maths", name: "Numbers, Algebra and Geometry", section: "cbt", domains: ["rrbgdMaths"], blurb: "BODMAS, LCM and HCF, roots, algebra, angles, mensuration, trigonometry and statistics." },
    { key: "verbal", name: "Verbal Reasoning", section: "cbt", domains: ["rrbgdVerbal"], blurb: "Analogies, odd one out, number and letter series, coding-decoding, sign swaps and word puzzles." },
    { key: "logical", name: "Logical Reasoning", section: "cbt", domains: ["rrbgdLogical"], blurb: "Blood relations, directions, syllogisms, ranking, seating, calendar, clock and decision making." },
    { key: "physics", name: "Physics", section: "cbt", domains: ["rrbgdPhysics"], blurb: "Motion, force, work and energy, gravitation, sound, light and electricity to class 10." },
    { key: "chemistry", name: "Chemistry", section: "cbt", domains: ["rrbgdChemistry"], blurb: "Atoms, acids and bases, metals and non-metals, carbon compounds and everyday chemicals." },
    { key: "biology", name: "Biology", section: "cbt", domains: ["rrbgdBiology"], blurb: "The human body, nutrition, diseases, plants, heredity and ecology." },
    { key: "awareness", name: "General Awareness", section: "cbt", domains: ["rrbgdGA"], blurb: "Static facts on history, geography, polity, economy, sports, culture and the railways." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "The qualifying minimum for UR and EWS",
    50: "Above the qualifying minimum",
    60: "A solid score",
    70: "Competitive for PET shortlisting",
    80: "A strong, safe score",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full CBT.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the Group D CBT.",
    ],
    sourceLine: "Original practice questions on the RRB Group D (Level 1) CBT syllabus (CEN 08/2024, kept in CEN 09/2025). Not affiliated with or endorsed by the Railway Recruitment Boards, the Railway Recruitment Cells or Indian Railways.",
    scoreNote: "Percent correct, with no negative marking. The real Group D CBT deducts 1/3 mark for each wrong answer, so a blind guess among four options gains nothing on average, while ruling out even one option makes a guess worth taking. The qualifying minimums are 40% for UR and EWS and 30% for OBC, SC and ST, but candidates are called to the Physical Efficiency Test by normalised marks against zone-wise cut-offs, which are usually much higher.",
  },
};
