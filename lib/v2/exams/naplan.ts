import { ExamV2Config, ScaleSpec, SectionResult } from "../types";
import { curve } from "../scales";

// NAPLAN Year 9 (ACARA, Australia). Online since 2022, held in March, in a
// fixed order: Writing, Reading, Conventions of Language, Numeracy. Year 9
// times are Reading 65 min, Conventions 45 min (spelling first, then grammar
// and punctuation, the spelling section locked once left), Numeracy 65 min
// (a short non-calculator section, locked once left, then an online
// calculator), Writing 42 min (one narrative or persuasive prompt; not
// modelled here). The real tests use tailored test design: three stages of
// testlets with two branching points (testlet A, then a harder, middle or
// easier testlet, then another), and the scale score depends on both the
// number right and the difficulty of the path. Here each domain has two
// stages: module 1 is everyone's testlet, and module 2 is the harder
// ("upper") or easier ("lower") testlet picked from module 1 accuracy, like
// SAT module 2. Test 2 is a fixed form held out of the drills.
//
// Scores are an estimate on a NAPLAN-style scale, read against ACARA's Year 9
// proficiency cut points on the scales reset in 2023 (Needs additional
// support / Developing / Strong / Exceeding): Reading 464 / 539 / 639,
// Spelling 470 / 532 / 627, Grammar and Punctuation 460 / 545 / 649,
// Numeracy 463 / 536 / 673. The curves below are our own, not ACARA's.
// A Year 7 sibling would be its own config (id "naplan7", its own bank and
// cut points 430 / 500 / 603 and so on) beside this one.
const minutes = (n: number) => n * 60;

/** Harder path: the full range of the scale. */
const upper = (n: number): ScaleSpec =>
  curve(n, [[0, 300], [Math.round(n * 0.25), 430], [Math.round(n * 0.4), 480], [Math.round(n * 0.55), 540], [Math.round(n * 0.7), 600], [Math.round(n * 0.85), 670], [n, 780]], 30);

/** Easier path: tops out near the top of Strong, as the easier testlets carry less weight. */
const lower = (n: number): ScaleSpec =>
  curve(n, [[0, 300], [Math.round(n * 0.25), 420], [Math.round(n * 0.4), 470], [Math.round(n * 0.55), 510], [Math.round(n * 0.75), 560], [n, 600]], 30);

/** Reading, Conventions and Numeracy averaged; the two Numeracy sections count as one domain, weighted by length. */
function overall(sections: SectionResult[]): number {
  const by = (k: string) => sections.find((s) => s.section === k);
  const parts: number[] = [];
  for (const k of ["reading", "conventions"]) {
    const s = by(k);
    if (s) parts.push(s.scaled);
  }
  const nc = by("numeracyNC");
  const calc = by("numeracy");
  const num = [nc, calc].filter(Boolean) as SectionResult[];
  const items = num.reduce((a, s) => a + s.total, 0);
  if (items) parts.push(num.reduce((a, s) => a + s.scaled * s.total, 0) / items);
  if (!parts.length) return 0;
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length / 10) * 10;
}

export const NAPLAN: ExamV2Config = {
  id: "naplan",
  slug: "/naplan",
  landingPath: "/naplan-year-9-practice-test",
  name: "NAPLAN Year 9 Practice Test",
  shortName: "NAPLAN Year 9",
  fullName: "NAPLAN Year 9 (National Assessment Program, Literacy and Numeracy)",
  tagline: "Reading, spelling, grammar and numeracy for Year 9, with tailored testlets like the real online NAPLAN.",
  icon: "graduation",
  theme: { brand: "142 64% 30%", brandDark: "142 64% 21%", brandLight: "142 60% 95%" },
  breakSeconds: 600,
  sections: [
    {
      key: "reading",
      name: "Reading",
      shortName: "Reading",
      breakAfter: true,
      modules: [
        { module: 1, questionCount: 10, timeLimit: minutes(20) },
        { module: 2, questionCount: 10, timeLimit: minutes(20), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Read each text, then answer the questions about it. Texts include articles, stories, opinion pieces and reports. Some questions ask you to choose two answers, put events in order or tap the sentence that answers the question. The second part is harder or easier depending on how the first part went, like the tailored tests in the real online NAPLAN.",
      scale: upper(20),
      lowerScale: lower(20),
      domains: ["napReading"],
    },
    {
      key: "conventions",
      name: "Conventions of Language",
      shortName: "Conventions",
      breakAfter: true,
      modules: [
        { module: 1, questionCount: 12, timeLimit: minutes(15) },
        { module: 2, questionCount: 12, timeLimit: minutes(15), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Spelling, then grammar and punctuation. For spelling, choose the correct spelling, pick the right word for the sentence or tap the word that is spelled wrongly. For grammar and punctuation, choose the word or punctuation that makes the sentence correct. Australian spelling is used throughout. The real test's spelling dictation (listening to a word) is not modelled.",
      scale: upper(24),
      lowerScale: lower(24),
      domains: ["napSpelling", "napGrammar"],
    },
    {
      key: "numeracyNC",
      name: "Numeracy: non-calculator",
      shortName: "Non-calculator",
      modules: [{ module: 1, questionCount: 6, timeLimit: minutes(8) }],
      directions:
        "A short section without a calculator, like the start of the real Year 9 numeracy test. Work it out on paper. For fill-in questions, type a whole number, a decimal or a fraction such as 3/4, with no units. You cannot come back to this section once you move on.",
      scale: curve(6, [[0, 300], [1, 400], [2, 450], [3, 500], [4, 560], [5, 620], [6, 700]], 50),
      domains: ["napNonCalc"],
    },
    {
      key: "numeracy",
      name: "Numeracy: calculator allowed",
      shortName: "Numeracy",
      calculator: true,
      modules: [
        { module: 1, questionCount: 12, timeLimit: minutes(25) },
        { module: 2, questionCount: 12, timeLimit: minutes(25), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Number and algebra, measurement and geometry, and statistics and probability. The calculator is available on every question. For fill-in questions, type a number, a decimal or a fraction such as 3/4, with no units, commas or dollar signs. The second part is harder or easier depending on how the first part went.",
      scale: upper(24),
      lowerScale: lower(24),
      domains: ["napNumber", "napMeasure", "napStats"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    napReading: "Reading",
    napSpelling: "Spelling",
    napGrammar: "Grammar and Punctuation",
    napNonCalc: "Non-calculator Numeracy",
    napNumber: "Number and Algebra",
    napMeasure: "Measurement and Geometry",
    napStats: "Statistics and Probability",
  },
  // Six drills: one per reported domain, with Numeracy split the way the
  // Australian Curriculum strands are and measurement shared with statistics
  // so the dashboard stays at 11 steps (3 Basics, 6 drills, 2 tests).
  drillSize: 20,
  drills: [
    { key: "reading", name: "Reading", section: "reading", domains: ["napReading"], blurb: "Main idea, inference, word meaning, the writer's purpose and how a text is built, from articles, stories and opinion pieces.", basics: ["mainIdea", "inference", "wordsInContext", "authorPurpose", "textStructure", "toneWords"] },
    { key: "spelling", name: "Spelling", section: "conventions", domains: ["napSpelling"], blurb: "Tricky words, doubled letters, silent letters, suffixes and homophones, in Australian spelling." },
    { key: "grammar", name: "Grammar and Punctuation", section: "conventions", domains: ["napGrammar"], blurb: "Agreement, verb tense, pronouns, apostrophes, commas, semicolons, colons and direct speech.", basics: ["subjectVerb", "verbTense", "pronounCase", "apostrophes", "commaSplices", "semicolons", "colons"] },
    { key: "noncalc", name: "Non-calculator", section: "numeracyNC", domains: ["napNonCalc"], blurb: "Fractions, decimals, percentages, negative numbers and order of operations, worked out without a calculator." },
    { key: "number", name: "Number and Algebra", section: "numeracy", domains: ["napNumber"], blurb: "Percentages, ratios and rates, index laws, scientific notation, simple interest, linear equations and graphs.", basics: ["percents", "ratios", "negativeNumbers", "exponentRules", "scientificNotation", "solveX", "distributing"] },
    { key: "measure", name: "Measurement, Geometry and Statistics", section: "numeracy", domains: ["napMeasure", "napStats"], blurb: "Area, volume, Pythagoras, angles and scale, then mean, median, data displays and probability." },
  ],
  composite: { name: "Overall scale score", min: 300, max: 780, combine: overall },
  defaultGoal: 540,
  goalChoices: [480, 540, 600, 660, 700],
  goalNotes: {
    480: "Developing in every domain",
    540: "At the Strong line in most domains",
    600: "Solidly Strong",
    660: "Exceeding in reading, spelling and grammar",
    700: "Exceeding in every domain",
  },
  testLength: "2 hr 8 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each domain.",
      "Master each drill first.",
      "Halfway there. Try the full test.",
      "Reach your goal on the full test.",
      "Goal reached. You are ready for NAPLAN.",
    ],
    sourceLine: "Written to the Australian Curriculum (Version 9.0) and ACARA's published NAPLAN test design for Year 9. Original questions; not affiliated with ACARA.",
    scoreNote:
      "Estimated on a NAPLAN-style scale, not an official result. ACARA's Year 9 proficiency cut points: Developing from about 465, Strong from about 535 to 545, Exceeding from about 630 (spelling) to 673 (numeracy). Writing is not included.",
  },
};
