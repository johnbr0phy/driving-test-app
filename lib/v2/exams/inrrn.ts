import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// RRB JE (Junior Engineer and Depot Material Superintendent, Level 6 of the
// 7th CPC pay matrix), the 1st stage Computer Based Test (CBT 1), as set out
// in the Railway Recruitment Boards' Detailed Centralised Employment Notice
// CEN 04/2026 (indicative notice 25.07.2026; applications 14.08.2026 to
// 13.09.2026), para 13.1, which repeats CEN 05/2025: 100 objective
// multiple-choice questions in 90 minutes, Mathematics 30, General
// Intelligence and Reasoning 25, General Awareness 15 and General Science 30
// (physics, chemistry and life sciences up to the 10th standard CBSE
// syllabus), one mark each, with 1/3 mark deducted for each wrong answer.
// The notice calls the section split "only indicative". Minimum percentage
// for eligibility: UR and EWS 40, OBC (NCL) 30, SC 30, ST 25. CBT 1 is of a
// screening nature: its normalised score is used only to shortlist for CBT 2
// (15 times the community-wise vacancies). Calculators are not allowed in
// CBT 1. Practice tests are full length at the real pace: one 100-question
// module in 90 minutes, grouped by subject in the notice's order. Negative
// marking is explained in the copy, not scored. Drills: maths split into
// arithmetic and other topics, reasoning into verbal and logical, science into
// physics, chemistry and biology (per test 15/15, 13/12, 15, 10/10/10; the
// split inside each subject is Tigertest's). Sources:
// tools/next100/inrrn/sources.md.
const minutes = (n: number) => n * 60;

export const INRRN: ExamV2Config = {
  id: "inrrn",
  slug: "/rrb-je",
  landingPath: "/rrb-je-practice-test",
  name: "RRB JE CBT 1 Practice Test",
  shortName: "RRB JE",
  fullName: "RRB JE (Junior Engineer) CBT 1",
  tagline: "100 questions in 90 minutes on the RRB JE CBT 1 pattern: Mathematics, Reasoning, General Awareness and General Science.",
  icon: "building",
  theme: { brand: "271 85% 20%", brandDark: "271 85% 15%", brandLight: "271 85% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbt",
      name: "CBT 1",
      shortName: "CBT 1",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(90) }],
      directions: "100 questions in 90 minutes, the real RRB JE CBT 1 length, grouped by subject in the notice's order: Mathematics (1 to 30), General Intelligence and Reasoning (31 to 55), General Awareness (56 to 70) and General Science (71 to 100). No calculator. You can move between questions and flag them. The real exam takes away 1/3 mark for each wrong answer; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(100),
      domains: ["inrrnArith", "inrrnMaths", "inrrnVerbal", "inrrnLogical", "inrrnGA", "inrrnPhysics", "inrrnChemistry", "inrrnBiology"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    inrrnArith: "Mathematics: Arithmetic",
    inrrnMaths: "Mathematics: Numbers, Algebra and Geometry",
    inrrnVerbal: "Reasoning: Verbal",
    inrrnLogical: "Reasoning: Logical",
    inrrnGA: "General Awareness",
    inrrnPhysics: "General Science: Physics",
    inrrnChemistry: "General Science: Chemistry",
    inrrnBiology: "General Science: Biology",
  },
  drills: [
    { key: "arithmetic", name: "Arithmetic", section: "cbt", domains: ["inrrnArith"], blurb: "Percentages, profit and loss, interest, ratio, averages, ages, time and work, pipes, trains, boats and mixtures." },
    { key: "maths", name: "Numbers, Algebra and Geometry", section: "cbt", domains: ["inrrnMaths"], blurb: "BODMAS, LCM and HCF, fractions, roots, algebra, angles, mensuration, trigonometry and statistics." },
    { key: "verbal", name: "Verbal Reasoning", section: "cbt", domains: ["inrrnVerbal"], blurb: "Analogies, series, coding and decoding, mathematical operations, classification and jumbled words." },
    { key: "logical", name: "Logical Reasoning", section: "cbt", domains: ["inrrnLogical"], blurb: "Relationships, directions, syllogisms, ranking, seating, calendar, clock, data sufficiency and statements." },
    { key: "awareness", name: "General Awareness", section: "cbt", domains: ["inrrnGA"], blurb: "History and the freedom struggle, polity, geography, the economy, environment, culture and sports." },
    { key: "physics", name: "Physics", section: "cbt", domains: ["inrrnPhysics"], blurb: "Motion, force, work and power, electricity, light, sound and magnetism to class 10." },
    { key: "chemistry", name: "Chemistry", section: "cbt", domains: ["inrrnChemistry"], blurb: "Reactions, acids, bases and salts, metals, carbon compounds, the periodic table and the atom." },
    { key: "biology", name: "Biology", section: "cbt", domains: ["inrrnBiology"], blurb: "Cells, life processes, control and coordination, reproduction, heredity, health and the environment." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "The minimum for UR and EWS",
    50: "Above the minimum",
    60: "A solid score",
    70: "Competitive for CBT 2 shortlisting",
    80: "A strong score",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Eight drills, two full mock tests. Start with Arithmetic.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both tests. Keep your speed up.",
    ],
    sourceLine: "Original practice questions on the RRB JE CBT 1 syllabus in CEN 04/2026. Not affiliated with or endorsed by the Railway Recruitment Boards or Indian Railways.",
    scoreNote: "Percent correct, with no negative marking. The real RRB JE CBT 1 deducts 1/3 mark for each wrong answer, so a blind guess among four options gains nothing on average, while ruling out even one option makes a guess worth taking. The notice's minimum percentages are 40 for UR and EWS, 30 for OBC (NCL) and SC and 25 for ST, but CBT 1 is a screening test: candidates are called to CBT 2 on normalised marks, 15 times the vacancies in each community, so the score needed is usually much higher.",
  },
};
