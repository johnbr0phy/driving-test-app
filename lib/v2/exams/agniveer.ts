import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Agniveer (General Duty), Indian Army: the Online Common Entrance
// Examination (CEE) that is the first phase of Agnipath recruitment. The
// Army's notice for the 2026 cycle (registration from 13 February 2026, to 1
// April per a state government notice, extended to 10 April per news reports;
// CEE tentatively from 1 June 2026) points to
// joinindianarmy.nic.in, which could not be read from here; an Army
// Recruiting Office press release for 2025-26 confirms the CEE is held in 13
// languages and that a candidate may apply for two categories. The GD paper's
// pattern is from guides, which agree on it: 50 multiple-choice questions for
// 100 marks in 60 minutes, General Knowledge 15, General Science 15,
// Mathematics 15 and Logical Reasoning 5, 2 marks each with 0.5 deducted for
// a wrong answer, 35 marks to pass (one guide says 32). Shortlisted
// candidates go on to the recruitment rally (physical fitness and
// measurement, an adaptability test) and a medical examination; none of that
// is modelled.
// Practice tests are full length: one 50-question module in 60 minutes in the
// order GK, Science, Maths, Reasoning. Drills split GK into three (history,
// culture and defence; Constitution, economy and sports; geography), science
// into three, maths into two, plus reasoning: 9 drills and 2 tests, 11 steps.
// GK is static facts only, no current affairs and no office-holders.
// Negative marking is explained in the copy, not scored.
// Sources: tools/next100/agniveer/sources.md.
const minutes = (n: number) => n * 60;

export const AGNIVEER: ExamV2Config = {
  id: "agniveer",
  slug: "/agniveer-army",
  landingPath: "/agniveer-army-cee-practice-test",
  name: "Agniveer Army GD Mock Test",
  shortName: "Agniveer GD",
  fullName: "Agniveer (General Duty) Common Entrance Exam",
  tagline: "50 questions in 60 minutes on the Army GD CEE pattern: General Knowledge, General Science, Maths and Reasoning.",
  icon: "shield",
  theme: { brand: "86 35% 30%", brandDark: "86 35% 22%", brandLight: "86 35% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cee",
      name: "Common Entrance Exam",
      shortName: "CEE",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(60) }],
      directions: "50 questions in 60 minutes, the Agniveer GD CEE length as guides report it, in four parts: General Knowledge (1 to 15), General Science (16 to 30), Mathematics (31 to 45) and Logical Reasoning (46 to 50). You can move between questions and flag them. The real exam gives 2 marks for a right answer and, guides say, takes away half a mark for a wrong one; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(50),
      domains: [
        "agniveerHistory",
        "agniveerPolity",
        "agniveerGeography",
        "agniveerPhysics",
        "agniveerChemistry",
        "agniveerBiology",
        "agniveerArith",
        "agniveerMaths",
        "agniveerReasoning",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    agniveerHistory: "GK: History, Culture and Defence",
    agniveerPolity: "GK: Constitution, Economy and Sports",
    agniveerGeography: "GK: Geography",
    agniveerPhysics: "General Science: Physics",
    agniveerChemistry: "General Science: Chemistry",
    agniveerBiology: "General Science: Biology",
    agniveerArith: "Mathematics: Arithmetic",
    agniveerMaths: "Mathematics: Numbers, Algebra and Geometry",
    agniveerReasoning: "Logical Reasoning",
  },
  drills: [
    { key: "history", name: "History, Culture and Defence", section: "cee", domains: ["agniveerHistory"], blurb: "Ancient to modern India, the freedom struggle, art and dance, and the Army's battles, awards and days." },
    { key: "polity", name: "Constitution, Economy and Sports", section: "cee", domains: ["agniveerPolity"], blurb: "Articles and Parliament, national symbols, banking and the economy, and sports terms and trophies." },
    { key: "geography", name: "Geography", section: "cee", domains: ["agniveerGeography"], blurb: "Passes and borders, rivers and landforms, climate, maps and the world." },
    { key: "physics", name: "Physics", section: "cee", domains: ["agniveerPhysics"], blurb: "Motion and force, energy, pressure, heat, light, sound and electricity to class 10." },
    { key: "chemistry", name: "Chemistry", section: "cee", domains: ["agniveerChemistry"], blurb: "Elements and compounds, acids and bases, reactions, metals and carbon compounds." },
    { key: "biology", name: "Biology", section: "cee", domains: ["agniveerBiology"], blurb: "The human body, blood and health, nutrition, plants, reproduction and ecology." },
    { key: "arithmetic", name: "Arithmetic", section: "cee", domains: ["agniveerArith"], blurb: "Percentages, profit and loss, interest, ratio, averages, ages, work, speed and mixtures." },
    { key: "maths", name: "Numbers, Algebra and Geometry", section: "cee", domains: ["agniveerMaths"], blurb: "LCM and HCF, BODMAS, algebra, angles, mensuration, trigonometry, statistics and probability." },
    { key: "reasoning", name: "Logical Reasoning", section: "cee", domains: ["agniveerReasoning"], blurb: "Series, coding-decoding, analogies, directions, blood relations, ranking, calendar and clock." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80],
  goalNotes: {
    40: "Around the reported pass mark of 35 out of 100",
    50: "Comfortably past the pass mark",
    60: "A solid score",
    70: "Competitive for the merit list",
    80: "A strong, safe score",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full CEE.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the Agniveer CEE.",
    ],
    sourceLine: "Original practice questions on the Agniveer (General Duty) CEE pattern. Not affiliated with or endorsed by the Indian Army or the Ministry of Defence.",
    scoreNote: "Percent correct, with no negative marking. In the real GD paper each question carries 2 marks and, guides say, a wrong answer costs half a mark, so even a blind guess among four options gains a little on average (+0.125 marks), and ruling out one option makes a guess clearly worth taking. Guides put the pass mark at 35 out of 100, but selection goes by merit after the rally and medical, so aim well above it.",
  },
};
