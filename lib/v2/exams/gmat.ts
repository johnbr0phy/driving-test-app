import { ExamV2Config, SectionResult } from "../types";
import { curve } from "../scales";

// GMAT Focus Edition (GMAC; the only GMAT since the classic exam ended in
// early 2024; format unchanged as of October 2026): three 45-minute sections,
// Quantitative Reasoning 21 questions (problem solving only, arithmetic and
// algebra, no calculator, no geometry), Verbal Reasoning 23 (reading
// comprehension and critical reasoning, no sentence correction) and Data
// Insights 20 (data sufficiency, table analysis, graphics interpretation,
// two-part analysis and multi-source reasoning, with an on-screen calculator).
// 2 hr 15 min, one optional 10-minute break, sections in any order the
// candidate picks, question-adaptive, review and up to three answer edits per
// section. Section scores 60 to 90, total 205 to 805 in steps of 10.
// Here: two fixed (not adaptive) full tests, Test 2 held out, 7 drills (Quant
// 11 arithmetic + 10 algebra per test; Verbal 13 RC in four passages + 10 CR;
// DI 7 DS, 3 TA + 4 GI, 3 TPA + one 3-item MSR set). Table analysis and
// two-part analysis are `matrix` items, graphics interpretation is `cloze`
// with the graph given as a table or in words, multi-source sets share a
// stimulus. Scores are an estimate via curve(), not GMAC's conversion.
// Sources: tools/gmat/sources.md.
const minutes = (n: number) => n * 60;

/** Total 205 to 805 from the three section scores (60 to 90), in steps of 10 ending in 5. */
export function gmatTotal(sections: SectionResult[]): number {
  if (sections.length < 3) return 205;
  const sum = sections.reduce((a, s) => a + s.scaled, 0);
  const total = 205 + Math.round(((sum - 180) * (600 / 90)) / 10) * 10;
  return Math.max(205, Math.min(805, total));
}

const DS_DIRECTIONS = `Data Sufficiency questions give a question and two statements, (1) and (2). Decide whether the statements give enough information to answer the question, using the facts in the question, the statements and everyday knowledge. The five choices are always the same:

- **A** Statement (1) ALONE is sufficient, but statement (2) alone is not.
- **B** Statement (2) ALONE is sufficient, but statement (1) alone is not.
- **C** BOTH statements TOGETHER are sufficient, but NEITHER alone is.
- **D** EACH statement ALONE is sufficient.
- **E** Statements (1) and (2) TOGETHER are not sufficient.

A "what is the value" question is answered only when the statements give exactly one value.`;

export const GMAT: ExamV2Config = {
  id: "gmat",
  slug: "/gmat",
  landingPath: "/gmat-focus-practice-test",
  icon: "graduation",
  name: "GMAT Practice Test",
  shortName: "GMAT",
  fullName: "GMAT Focus Edition",
  tagline: "Quant, Verbal and Data Insights: 64 questions in three 45-minute sections, with a 205 to 805 score estimate.",
  theme: { brand: "340 40% 40%", brandDark: "340 40% 31%", brandLight: "340 40% 96%" },
  breakSeconds: 600,
  sections: [
    {
      key: "quant",
      name: "Quantitative Reasoning",
      shortName: "Quant",
      breakAfter: true,
      modules: [{ module: 1, questionCount: 21, timeLimit: minutes(45) }],
      directions:
        "21 problem-solving questions in 45 minutes on arithmetic and algebra. No calculator in this section. Each question has five answer choices and one best answer. All numbers are real numbers. You can flag questions and come back to them; on the real exam you may change at most three answers in a section, so answer as if each choice is final. An optional 10-minute break follows this section.",
      scale: curve(21, [[0, 60], [4, 63], [8, 70], [12, 77], [16, 83], [19, 87], [21, 90]], 3, 1),
      domains: ["gmatArith", "gmatAlgebra"],
    },
    {
      key: "verbal",
      name: "Verbal Reasoning",
      shortName: "Verbal",
      modules: [{ module: 1, questionCount: 23, timeLimit: minutes(45) }],
      directions:
        "23 questions in 45 minutes. Reading Comprehension questions follow four passages (shown beside the question); Critical Reasoning questions each give a short argument. Each question has five answer choices and one best answer. Answer from what the passage or argument says, not from outside knowledge.",
      scale: curve(23, [[0, 60], [5, 64], [9, 71], [13, 78], [17, 83], [20, 87], [23, 90]], 3, 1),
      domains: ["gmatRC", "gmatCR"],
    },
    {
      key: "di",
      name: "Data Insights",
      shortName: "DI",
      calculator: true,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(45) }],
      directions: `20 questions in 45 minutes. The calculator is available for every question in this section. Questions include Data Sufficiency, Table Analysis (mark each statement True or False), Graphics Interpretation (complete the sentence from the drop-down lists), Two-Part Analysis (one answer for each part) and Multi-Source Reasoning (a set of three questions on the same sources).

${DS_DIRECTIONS}`,
      scale: curve(20, [[0, 60], [4, 64], [8, 71], [11, 76], [15, 82], [18, 87], [20, 90]], 3, 1),
      domains: ["gmatDS", "gmatTables", "gmatTwoPart"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gmatArith: "Arithmetic",
    gmatAlgebra: "Algebra and Word Problems",
    gmatRC: "Reading Comprehension",
    gmatCR: "Critical Reasoning",
    gmatDS: "Data Sufficiency",
    gmatTables: "Table Analysis and Graphics Interpretation",
    gmatTwoPart: "Two-Part Analysis and Multi-Source Reasoning",
  },
  drills: [
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["gmatArith"], blurb: "Percents, ratios, number properties, statistics, counting and probability. No calculator." },
    { key: "algebra", name: "Algebra and Word Problems", section: "quant", domains: ["gmatAlgebra"], blurb: "Equations, inequalities, functions, exponents, rates and work." },
    { key: "critical", name: "Critical Reasoning", section: "verbal", domains: ["gmatCR"], blurb: "Strengthen, weaken, assumption, inference, flaw, boldface and evaluate questions." },
    { key: "reading", name: "Reading Comprehension", section: "verbal", domains: ["gmatRC"], blurb: "Business, science, social science and humanities passages: main idea, detail, inference and function." },
    { key: "sufficiency", name: "Data Sufficiency", section: "di", domains: ["gmatDS"], blurb: "Is the information enough? The five fixed answer choices, statement by statement." },
    { key: "tables", name: "Tables and Graphs", section: "di", domains: ["gmatTables"], blurb: "Table Analysis true-or-false statements and Graphics Interpretation drop-downs." },
    { key: "twopart", name: "Two-Part and Multi-Source", section: "di", domains: ["gmatTwoPart"], blurb: "Two linked answers, and question sets built on emails, tables and notes." },
  ],
  composite: { name: "Total score", min: 205, max: 805, combine: gmatTotal },
  defaultGoal: 605,
  goalChoices: [505, 555, 605, 655, 705, 755],
  goalNotes: {
    505: "Below the average test taker",
    555: "Around the average score",
    605: "Above average, solid for many programs",
    655: "Competitive for highly ranked MBA programs",
    705: "Top few percent of test takers",
    755: "Top 1 percent",
  },
  testLength: "2 hr 15 min",
  copy: {
    heroSubs: [
      "Drill each question type, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Go book your GMAT.",
    ],
    sourceLine: "Original questions written to the GMAT Focus Edition format. Not affiliated with or endorsed by GMAC. GMAT is a trademark of GMAC. Score estimates are unofficial.",
    scoreNote: "Section scores (60 to 90) and the total (205 to 805) are estimates from a typical conversion of the share you got right. The real GMAT adapts each question to your answers, so its score also reflects how hard your questions were; these practice tests are fixed forms.",
  },
};
