import { ExamV2Config, SectionResult } from "../types";
import { percentScale } from "../scales";

// SHSAT, the Specialized High Schools Admissions Test of NYC Public Schools,
// the sole admissions factor for eight of the nine Specialized High Schools
// (LaGuardia auditions). Format from the "NYC Guide to the SHSAT for 2027
// Admissions" and the SHSAT test page (both checked November 2026): from fall
// 2026 a computer-adaptive test of 50 English Language Arts and 50 Math items
// in 180 minutes, the student choosing which subject comes first and how to
// split the time; each subject includes 10 unscored field-test items; every
// item must be answered before moving on, ELA passage sets can be revisited
// until submitted, Math items cannot; no calculator; formulas are not given.
// ELA is Reading Comprehension and Revising/Editing Parts A (a text with
// numbered sentences) and B (stand-alone conventions items); Math covers
// ratios and proportional relationships, the number system and expressions,
// equations and inequalities, geometry, and statistics and probability, from
// the NYS Next Generation standards through Grade 7 on the Grade 8 forms,
// with multiple-choice and fill-in-the-blank items.
//
// Here each subject is one fixed 50-item form (not adaptive) of 90 minutes,
// ELA first. The split inside a subject is Tigertest's own (the guide gives
// none): ELA 10 Part A, 10 Part B, 15 informational and 15 literary reading;
// Math ratios 10, number and expressions 11, equations and inequalities 11,
// geometry 10, statistics and probability 8, about five typed answers. Scored
// as percent correct, never a scaled score. Test 2 is held out of the drills.
// Bank built by tools/next100/shsat/build.py.

/** Both subjects count equally, as the two scaled subtest scores do. */
function averageOfSections(sections: SectionResult[]): number {
  const scored = sections.filter((s) => s.total > 0);
  if (!scored.length) return 0;
  return Math.round(scored.reduce((a, s) => a + (s.raw / s.total) * 100, 0) / scored.length);
}

export const SHSAT: ExamV2Config = {
  id: "shsat",
  slug: "/shsat",
  landingPath: "/shsat-practice-test",
  name: "SHSAT Practice Test",
  shortName: "SHSAT",
  fullName: "SHSAT (NYC Specialized High Schools Admissions Test)",
  tagline: "English Language Arts and Math practice for the SHSAT, the NYC Specialized High Schools test.",
  icon: "graduation",
  theme: { brand: "63 100% 24%", brandDark: "63 100% 17%", brandLight: "63 80% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ela",
      name: "English Language Arts",
      shortName: "ELA",
      modules: [{ module: 1, questionCount: 50, timeLimit: 90 * 60 }],
      directions:
        "50 questions: two Revising/Editing Part A texts with numbered sentences, ten Part B questions on grammar and punctuation, then six reading passages, informational and literary, with five questions each. You have 90 minutes here, half of the real test's 180. Base every reading answer on the passage, not on what you already know.",
      scale: percentScale(50),
      domains: ["shsatRevise", "shsatEdit", "shsatReadInfo", "shsatReadLit"],
    },
    {
      key: "math",
      name: "Mathematics",
      shortName: "Math",
      linear: true,
      modules: [{ module: 1, questionCount: 50, timeLimit: 90 * 60 }],
      calculator: false,
      directions:
        "50 word problems and computation questions on ratios and percents, negative numbers and expressions, equations and inequalities, geometry, and statistics and probability. No calculator and no formula sheet, just like the real SHSAT, so use scrap paper. Some questions ask you to type the answer. As on the real test, answer each question before moving on; you cannot go back.",
      scale: percentScale(50),
      domains: ["shsatRatios", "shsatNumber", "shsatEquations", "shsatGeometry", "shsatStats"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    shsatRevise: "Revising/Editing Part A",
    shsatEdit: "Revising/Editing Part B",
    shsatReadInfo: "Reading: Informational Texts",
    shsatReadLit: "Reading: Literary Texts",
    shsatRatios: "Ratios and Percents",
    shsatNumber: "Number System and Expressions",
    shsatEquations: "Equations and Inequalities",
    shsatGeometry: "Geometry",
    shsatStats: "Statistics and Probability",
  },
  // One drill per part of the test; each uses Practice Test 1 plus drill-only
  // items. No Basics skill opens two drills.
  drills: [
    { key: "revising", name: "Revising/Editing Part A", section: "ela", domains: ["shsatRevise"], blurb: "Improve a draft: main claims, transitions, details that belong, organization and conclusions." },
    { key: "editing", name: "Revising/Editing Part B", section: "ela", domains: ["shsatEdit"], blurb: "Verb tense, pronouns, modifiers, comma splices, agreement and combining sentences.", basics: ["danglingModifiers", "verbTense", "pronounCase", "commaSplices"] },
    { key: "informational", name: "Informational Reading", section: "ela", domains: ["shsatReadInfo"], blurb: "Articles, essays and biographies: central idea, evidence, word meaning and structure." },
    { key: "literary", name: "Literary Reading", section: "ela", domains: ["shsatReadLit"], blurb: "Stories, a poem and a memoir: theme, character, figurative language and mood." },
    { key: "ratios", name: "Ratios and Percents", section: "math", domains: ["shsatRatios"], blurb: "Unit rates, proportions, percent change, discounts, tax, interest and unit conversions.", basics: ["ratios", "percents", "percentChange", "unitConversion"] },
    { key: "number", name: "Number System and Expressions", section: "math", domains: ["shsatNumber"], blurb: "Negative numbers, fractions and decimals, exponents, factors and equivalent expressions." },
    { key: "equations", name: "Equations and Inequalities", section: "math", domains: ["shsatEquations"], blurb: "Two-step equations, inequalities and the word problems that lead to them." },
    { key: "geometry", name: "Geometry, Statistics and Probability", section: "math", domains: ["shsatGeometry", "shsatStats"], blurb: "Angles, circles, area, volume and scale drawings, plus mean, median, box plots and probability." },
  ],
  composite: { name: "Average score", min: 0, max: 100, combine: averageOfSections },
  defaultGoal: 80,
  goalChoices: [60, 65, 70, 75, 80, 85, 90],
  goalNotes: {
    60: "60% practice score target",
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target, strong in both subjects",
    85: "85% practice score target",
    90: "90% practice score target, aiming for the most selective schools",
  },
  testLength: "3 hr (90 minutes a subject here)",
  copy: {
    heroSubs: [
      "Drill each part of the test, then take a full practice test.",
      "Master each drill first.",
      "Take a full practice test to see your score.",
      "Hit your goal on a full practice test.",
      "Goal hit. You're ready for test day.",
    ],
    sourceLine: "Built on the NYC Guide to the SHSAT for 2027 Admissions and the New York State Next Generation Learning Standards (checked November 2026). Original questions; not affiliated with NYC Public Schools.",
    scoreNote: "Scores here are percent correct in each subject and their average, not SHSAT scaled scores. The real SHSAT is computer adaptive, includes 10 unscored field-test items per subject, and turns each subject into a scaled score; the two are added into a composite that is used to rank students for offers. No fixed score guarantees a school, so use this to find strong and weak areas, not to predict an offer.",
  },
};
