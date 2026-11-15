import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// TABE (Tests of Adult Basic Education), published by Data Recognition
// Corporation (DRC). TABE 13&14 is the form in use: the Federal Register
// notice of May 8, 2025 let TABE 11&12 be used for NRS reporting only until
// June 30, 2026. Content from DRC's TABE 13&14 Level D blueprints (Reading
// TB1314_ReadD_013026, Mathematics TB1314_MathD_021226, Language
// TB1314_LangD_013026; AE-CCR level D, about grades 6 to 8) and format from
// DRC's TABE 13&14 Maximum Allowable Testing Times: Reading Level D 39 items
// in two 50-minute parts (Key Ideas and Details 45.5%, Craft and Structure
// with Vocabulary 40.9%, Integration of Knowledge and Ideas 13.6%);
// Mathematics Level D 40 items, Part 1 45 minutes and Part 2 15 minutes
// (Numbers and Operations 27.5%, Algebraic Concepts 27.5%, Measurement, Data
// and Probability 25%, Geometry 20%); Language Level D 33 items in 50 minutes
// (Text Types and Purposes 39.4%, Conventions of Standard English 27.3%,
// Knowledge of Language and Vocabulary 33.3%). Reading adds evidence-based
// selected-response items and Math gridded-response items; Language is
// multiple choice only.
//
// Here one practice test is the three subtests at Level D only, shorter but at
// the real pace: Reading 22 in 55 minutes, Mathematics 20 in 30 minutes (typed
// numeric answers stand in for gridded response), Language 18 in 27 minutes.
// Test 2 is held out of the drills. DRC reports scale scores, NRS levels and
// grade equivalents from its own tables, which are not modelled: scores here
// are percent correct only.
const minutes = (n: number) => n * 60;

const FORMULAS = [
  "**Perimeter**: rectangle $P = 2l + 2w$",
  "**Circle**: circumference $C = 2\\pi r$; area $A = \\pi r^2$",
  "**Area**: rectangle $A = lw$; triangle $A = \\frac{1}{2}bh$",
  "**Volume**: rectangular prism $V = lwh$",
  "**Pythagorean Theorem**: $a^2 + b^2 = c^2$",
  "**Conversions**: 1 foot = 12 inches; 1 hour = 60 minutes; 1 minute = 60 seconds",
  "This is Tigertest's own summary of the formulas on DRC's Level D reference sheet, not the official sheet.",
].join("\n\n");

export const TABE: ExamV2Config = {
  id: "tabe",
  slug: "/tabe",
  landingPath: "/tabe-practice-test",
  name: "TABE Practice Test",
  shortName: "TABE",
  fullName: "TABE (Tests of Adult Basic Education) Level D",
  tagline: "TABE Reading, Math and Language at Level D, timed at the real pace, with the basics taught first.",
  icon: "graduation",
  theme: { brand: "301 40% 42%", brandDark: "301 40% 30%", brandLight: "301 40% 96%" },
  breakSeconds: 300,
  sections: [
    {
      key: "read",
      name: "Reading",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 22, timeLimit: minutes(55) }],
      directions:
        "Five passages with four or five questions each: articles, a short story, a science or technical text, a letter or two texts on one topic, and a report or notice with a table. Questions ask for the central idea, details and evidence, word meaning, how the text is built, the author's point of view and how well an argument is supported. The real Level D Reading test is 39 questions in two 50-minute parts; this section keeps the same pace.",
      scale: percentScale(22),
      domains: ["tabeReadKey", "tabeReadCraft", "tabeReadIntegration"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      reference: FORMULAS,
      modules: [{ module: 1, questionCount: 20, timeLimit: minutes(30) }],
      directions:
        "Numbers and operations, algebra, measurement, data and probability, and geometry, mostly as everyday problems. Some questions ask you to type a number instead of choosing one, like the gridded-response items on the real test. Every question here can be done without a calculator; a formula reference is in the tools drawer. The real Level D Mathematics test is 40 questions in two parts, 45 and 15 minutes.",
      scale: percentScale(20),
      domains: ["tabeMathNumber", "tabeMathAlgebra", "tabeMathData", "tabeMathGeometry"],
    },
    {
      key: "lang",
      name: "Language",
      shortName: "Language",
      modules: [{ module: 1, questionCount: 18, timeLimit: minutes(27) }],
      directions:
        "Two short drafts with numbered sentences to improve, then single sentences: claims and evidence, transitions, conclusions, grammar and usage, capitalization and punctuation, concise and precise wording, and word meaning. Every question is multiple choice, like the real Language test (33 questions in 50 minutes).",
      scale: percentScale(18),
      domains: ["tabeLangText", "tabeLangConventions", "tabeLangKnowledge"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    tabeReadKey: "Key Ideas and Details",
    tabeReadCraft: "Craft, Structure and Vocabulary",
    tabeReadIntegration: "Integration of Knowledge and Ideas",
    tabeMathNumber: "Numbers and Operations",
    tabeMathAlgebra: "Algebraic Concepts",
    tabeMathData: "Measurement, Data and Probability",
    tabeMathGeometry: "Geometry",
    tabeLangText: "Text Types and Purposes",
    tabeLangConventions: "Conventions of Standard English",
    tabeLangKnowledge: "Knowledge of Language and Vocabulary",
  },
  // Seven drills on the Level D blueprint categories (two pairs of small
  // categories share a drill), 16 questions each. Three open with Basics from
  // the shared library; no skill opens two drills (tests/no-repeats.test.cjs).
  drillSize: 16,
  drills: [
    { key: "keyIdeas", name: "Key Ideas and Details", section: "read", domains: ["tabeReadKey"], blurb: "Central idea, theme, summary, details and evidence, and how ideas and events connect. 45.5% of Level D Reading.", basics: ["mainIdea", "findingDetail", "inference", "causeEffect"] },
    { key: "craft", name: "Craft, Structure and Integration", section: "read", domains: ["tabeReadCraft", "tabeReadIntegration"], blurb: "Word meaning and tone, how a paragraph fits, the author's point of view, tables in a text, weak evidence and two texts that disagree." },
    { key: "number", name: "Numbers and Operations", section: "math", domains: ["tabeMathNumber"], blurb: "Signed numbers, fractions, ratios, rates, percents and the coordinate plane. 27.5% of Level D Math.", basics: ["negativeNumbers", "fractionOps", "ratios", "percents", "rateProblems"] },
    { key: "algebra", name: "Algebraic Concepts", section: "math", domains: ["tabeMathAlgebra"], blurb: "Expressions, equations and inequalities, exponents, roots, scientific notation, slope and functions. 27.5% of Level D Math." },
    { key: "dataGeometry", name: "Data, Probability and Geometry", section: "math", domains: ["tabeMathData", "tabeMathGeometry"], blurb: "Mean, median and range, samples, probability, scatter plots, scale drawings, angles, area, volume and the Pythagorean Theorem." },
    { key: "writing", name: "Text Types and Purposes", section: "lang", domains: ["tabeLangText"], blurb: "Revise arguments and explanations: claims, evidence, transitions, steps in order and strong conclusions. 39.4% of Level D Language." },
    { key: "conventions", name: "Conventions and Vocabulary", section: "lang", domains: ["tabeLangConventions", "tabeLangKnowledge"], blurb: "Agreement, pronouns, verb tense, run-ons, commas, apostrophes and spelling, then concise wording and word meaning.", basics: ["subjectVerb", "commaSplices", "pronounCase", "verbTense", "commonlyConfused", "apostrophes"] },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [60, 65, 70, 75, 80, 85],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target, ready to try Level A",
    85: "85% practice score target",
  },
  testLength: "1 hr 52 min",
  copy: {
    heroSubs: [
      "Learn the basics, then drill each subject.",
      "Master each drill first.",
      "Take the full test to see your score.",
      "Hit your goal on the full test.",
      "Goal hit. Ask your program about your next TABE.",
    ],
    sourceLine: "Based on DRC's TABE 13&14 Level D blueprints for Reading, Mathematics and Language. Original questions; not affiliated with Data Recognition Corporation.",
    scoreNote: "Scores here are percent correct per subject, at Level D only. The real TABE reports scale scores, NRS educational functioning levels and grade equivalents from DRC's own tables, which are not modelled, and DRC sets no pass mark: your program decides what score it needs.",
  },
};
