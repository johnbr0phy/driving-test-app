import { ExamV2Config } from "../types";
import { percentScale, curve } from "../scales";

// CAT-ASVAB: nine timed subtests taken in order with no going back and no
// calculator. The full test here uses the real CAT item counts and time
// limits (Auto and Shop combined, Mechanical limited by the bank, Assembling
// Objects omitted because it is figure based). AFQT is a percentile built
// from AR, WK, PC and MK only; the other subtests show percent correct.
const minutes = (n: number) => n * 60;
const AFQT = new Set(["ar", "wk", "pc", "mk"]);
const afqtCurve = curve(55, [[0, 1], [10, 5], [16, 12], [22, 25], [28, 36], [33, 50], [40, 65], [46, 80], [52, 93], [55, 99]], 0, 1);

export const ASVAB: ExamV2Config = {
  id: "asvab",
  slug: "/asvab",
  landingPath: "/asvab-practice-test",
  name: "ASVAB Practice Test",
  shortName: "ASVAB",
  fullName: "Armed Services Vocational Aptitude Battery (ASVAB)",
  tagline: "Eight timed subtests in CAT order, no going back, with an AFQT estimate.",
  icon: "medal",
  theme: { brand: "95 30% 34%", brandDark: "95 30% 22%", brandLight: "95 40% 95%" },
  breakSeconds: 0,
  sections: [
    { key: "gs", name: "General Science", shortName: "GS", linear: true, modules: [{ module: 1, questionCount: 15, timeLimit: minutes(10) }], directions: "Life, earth and physical science at a high school level. Answer each question in order; you cannot go back.", scale: percentScale(15), domains: ["asvabGeneralScience"] },
    { key: "ar", name: "Arithmetic Reasoning", shortName: "AR", linear: true, modules: [{ module: 1, questionCount: 15, timeLimit: minutes(55) }], directions: "Word problems solved by hand. No calculator on the ASVAB, so work on paper. Counts toward your AFQT.", scale: percentScale(15), domains: ["asvabArithmetic"] },
    { key: "wk", name: "Word Knowledge", shortName: "WK", linear: true, modules: [{ module: 1, questionCount: 15, timeLimit: minutes(9) }], directions: "Pick the word closest in meaning. Less than 40 seconds a question, so keep moving. Counts toward your AFQT.", scale: percentScale(15), domains: ["asvabWordKnowledge"] },
    { key: "pc", name: "Paragraph Comprehension", shortName: "PC", linear: true, modules: [{ module: 1, questionCount: 10, timeLimit: minutes(27) }], directions: "Read each passage and answer the question about it. Counts toward your AFQT.", scale: percentScale(10), domains: ["asvabParagraph"] },
    { key: "mk", name: "Mathematics Knowledge", shortName: "MK", linear: true, modules: [{ module: 1, questionCount: 15, timeLimit: minutes(31) }], directions: "Algebra and geometry concepts. No calculator. Counts toward your AFQT.", scale: percentScale(15), domains: ["asvabMathKnowledge"] },
    { key: "ei", name: "Electronics Information", shortName: "EI", linear: true, modules: [{ module: 1, questionCount: 15, timeLimit: minutes(10) }], directions: "Circuits, current, voltage, resistance and electronic components.", scale: percentScale(15), domains: ["asvabElectronics"] },
    { key: "as", name: "Auto and Shop Information", shortName: "AS", linear: true, modules: [{ module: 1, questionCount: 10, timeLimit: minutes(13) }], directions: "Engines, drivetrains, tools and shop practices. The CAT-ASVAB gives Auto and Shop as two short subtests; they are combined here.", scale: percentScale(10), domains: ["asvabAutoShop"] },
    { key: "mc", name: "Mechanical Comprehension", shortName: "MC", linear: true, modules: [{ module: 1, questionCount: 12, timeLimit: minutes(22) }], directions: "Levers, gears, pulleys, pressure and other mechanical principles described in words.", scale: percentScale(12), domains: ["asvabMechanical"] },
  ],
  tests: [{ number: 1, name: "Full CAT-ASVAB" }],
  domainLabels: {
    asvabGeneralScience: "General Science",
    asvabArithmetic: "Arithmetic Reasoning",
    asvabWordKnowledge: "Word Knowledge",
    asvabParagraph: "Paragraph Comprehension",
    asvabMathKnowledge: "Mathematics Knowledge",
    asvabElectronics: "Electronics Information",
    asvabAutoShop: "Auto and Shop Information",
    asvabMechanical: "Mechanical Comprehension",
  },
  drills: [
    { key: "ar", name: "Arithmetic Reasoning", section: "ar", domains: ["asvabArithmetic"], blurb: "Word problems by hand, every step shown.", weight: "AFQT subtest" },
    { key: "wk", name: "Word Knowledge", section: "wk", domains: ["asvabWordKnowledge"], blurb: "Closest-meaning vocabulary at ASVAB pace.", weight: "AFQT subtest" },
    { key: "pc", name: "Paragraph Comprehension", section: "pc", domains: ["asvabParagraph"], blurb: "Short passages with main idea, detail and inference questions.", weight: "AFQT subtest" },
    { key: "mk", name: "Mathematics Knowledge", section: "mk", domains: ["asvabMathKnowledge"], blurb: "Algebra and geometry without a calculator.", weight: "AFQT subtest" },
    { key: "gs", name: "General Science", section: "gs", domains: ["asvabGeneralScience"], blurb: "Life, earth and physical science basics.", weight: "Line scores" },
    { key: "ei", name: "Electronics Information", section: "ei", domains: ["asvabElectronics"], blurb: "Circuits, components and electrical safety.", weight: "Line scores" },
    { key: "as", name: "Auto and Shop Information", section: "as", domains: ["asvabAutoShop"], blurb: "Engines, systems, tools and shop practice.", weight: "Line scores" },
    { key: "mc", name: "Mechanical Comprehension", section: "mc", domains: ["asvabMechanical"], blurb: "Simple machines, force and pressure.", weight: "Line scores" },
  ],
  composite: {
    name: "AFQT estimate",
    min: 1,
    max: 99,
    combine: (sections) => {
      const raw = sections.filter((s) => AFQT.has(s.section)).reduce((a, s) => a + s.raw, 0);
      return afqtCurve.table[Math.min(raw, afqtCurve.table.length - 1)];
    },
  },
  defaultGoal: 50,
  goalChoices: [31, 36, 50, 65, 80, 93],
  goalNotes: {
    31: "Army, Navy, Marines and Air Force minimum with a diploma",
    36: "Coast Guard minimum, and a safer floor everywhere",
    50: "Opens most jobs and enlistment bonuses",
    65: "Category II, competitive for technical fields",
    80: "Top 20 percent",
    93: "Category I, top 7 percent",
  },
  testLength: "2 hr 57 min",
  copy: {
    heroSubs: [
      "Eight subtest drills on your phone, then one full CAT-ASVAB on a desktop.",
      "Mastery first. Put the four AFQT subtests ahead of the rest.",
      "Halfway through the subtests. The full test will show your AFQT estimate.",
      "Hit your AFQT goal on the full test to finish the plan.",
      "Goal hit. Talk to a recruiter about scheduling your ASVAB.",
    ],
    sourceLine: "Covers eight of the CAT-ASVAB subtests in test order with the real time limits. Assembling Objects uses figures and is not included. Minimum AFQT scores vary by branch and change with recruiting needs.",
    scoreNote: "AFQT is estimated from Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension and Mathematics Knowledge with a typical conversion, not the official one. Other subtests show percent correct.",
  },
};
