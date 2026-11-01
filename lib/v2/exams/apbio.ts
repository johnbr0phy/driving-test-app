import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// AP Biology (College Board), Course and Exam Description effective fall
// 2025 and the AP Central exam page (checked 1 November 2026): a 3-hour
// exam, hybrid digital (multiple choice answered in Bluebook, free response
// handwritten). Section I is 60 multiple-choice questions in 90 minutes, 50%
// of the exam score, as single questions or sets of typically 4 to 5 sharing
// a stimulus; Section II is 6 free-response questions (2 long, 4 short) in 90
// minutes, 50%. A four-function, scientific or graphing calculator is allowed
// and an equations and formulas sheet is provided. Unit weightings on the
// multiple choice: Chemistry of Life 8-11%, Cells 10-13%, Cellular Energetics
// 12-16%, Cell Communication and Cell Cycle 10-15%, Heredity 8-11%, Gene
// Expression and Regulation 12-16%, Natural Selection 13-20%, Ecology 10-15%.
// Modelled: Section I only, at full length and pace (60 in 90 minutes), one
// module per test, 6/7/8/7/6/8/10/8 questions by unit (the midpoints of the
// ranges), three shared-data sets of four per test. Percent score; the College
// Board converts a composite to 1 to 5 each year with no fixed cut. The
// free-response section is not modelled.
// Sources: tools/next100/apbio/sources.md.
const minutes = (n: number) => n * 60;

// Tigertest's summary of the kinds of formulas the official sheet gives,
// written for practice; the real sheet is provided on exam day.
const FORMULAS = `**Formulas for practice**

**Statistics.** Mean = sum of values / n. Standard deviation s = square root of [sum of (value - mean)^2 / (n - 1)]. Standard error of the mean = s / square root of n.

**Chi-square** = sum of (observed - expected)^2 / expected. Degrees of freedom = number of outcome classes - 1.

| Degrees of freedom | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Critical value, p = 0.05 | 3.84 | 5.99 | 7.81 | 9.49 | 11.07 |
| Critical value, p = 0.01 | 6.63 | 9.21 | 11.34 | 13.28 | 15.09 |

**Probability.** Mutually exclusive: P(A or B) = P(A) + P(B). Independent: P(A and B) = P(A) x P(B).

**Hardy-Weinberg.** p + q = 1 and p^2 + 2pq + q^2 = 1.

**Rate** = amount of change / change in time.

**Population growth.** dN/dt = B - D. Exponential: dN/dt = rmax N. Logistic: dN/dt = rmax N (K - N) / K.

**Water potential** = pressure potential + solute potential. Solute potential = -iCRT (R = 0.0831 liter bars per mole per kelvin; T in kelvin = degrees C + 273). In an open container the pressure potential is 0.

**Simpson's diversity index** = 1 - sum of (n / N)^2.

**Surface area and volume.** Cube: surface 6s^2, volume s^3. Sphere: surface 4 pi r^2, volume (4/3) pi r^3.`;

export const APBIO: ExamV2Config = {
  id: "apbio",
  slug: "/ap-biology",
  landingPath: "/ap-biology-practice-test",
  icon: "microscope",
  name: "AP Biology Practice Test",
  shortName: "AP Biology",
  fullName: "AP Biology Exam",
  tagline: "The AP Biology multiple-choice section: 60 questions in 90 minutes across all eight units.",
  theme: { brand: "112 58% 32%", brandDark: "112 58% 24%", brandLight: "112 50% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "mcq",
      name: "Multiple Choice",
      shortName: "Multiple Choice",
      modules: [{ module: 1, questionCount: 60, timeLimit: minutes(90) }],
      calculator: true,
      reference: FORMULAS,
      directions:
        "60 multiple-choice questions in 90 minutes, like Section I of the AP Biology Exam. Each question has four choices and one best answer, and there is no penalty for a wrong answer, so answer every question. Some questions share an experiment or data table shown beside them. A calculator and a formula sheet are in the tools drawer. Flag questions and come back to them before time runs out.",
      scale: percentScale(60),
      domains: ["apbioChem", "apbioCells", "apbioEnergetics", "apbioSignaling", "apbioHeredity", "apbioGenes", "apbioEvolution", "apbioEcology"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    apbioChem: "Chemistry of Life",
    apbioCells: "Cells",
    apbioEnergetics: "Cellular Energetics",
    apbioSignaling: "Cell Communication and Cell Cycle",
    apbioHeredity: "Heredity",
    apbioGenes: "Gene Expression and Regulation",
    apbioEvolution: "Natural Selection",
    apbioEcology: "Ecology",
  },
  drills: [
    { key: "chem", name: "Chemistry of Life", section: "mcq", domains: ["apbioChem"], blurb: "Water, the elements of life, and carbohydrates, lipids, nucleic acids and proteins." },
    { key: "cells", name: "Cells", section: "mcq", domains: ["apbioCells"], blurb: "Organelles, cell size, membranes, transport and water potential." },
    { key: "energetics", name: "Cellular Energetics", section: "mcq", domains: ["apbioEnergetics"], blurb: "Enzymes, photosynthesis and cellular respiration." },
    { key: "signaling", name: "Cell Communication and Cell Cycle", section: "mcq", domains: ["apbioSignaling"], blurb: "Signal transduction, feedback, the cell cycle and its regulation." },
    { key: "heredity", name: "Heredity", section: "mcq", domains: ["apbioHeredity"], blurb: "Meiosis, Mendelian and non-Mendelian genetics, and chi-square." },
    { key: "genes", name: "Gene Expression and Regulation", section: "mcq", domains: ["apbioGenes"], blurb: "Replication, transcription, translation, gene regulation, mutations and biotechnology." },
    { key: "evolution", name: "Natural Selection", section: "mcq", domains: ["apbioEvolution"], blurb: "Selection, Hardy-Weinberg, evidence of evolution, phylogeny and speciation." },
    { key: "ecology", name: "Ecology", section: "mcq", domains: ["apbioEcology"], blurb: "Energy flow, population growth, communities, biodiversity and disruptions." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [55, 60, 65, 70, 75, 80, 85],
  goalNotes: {
    55: "A starting target",
    60: "Building a solid base",
    65: "Getting there",
    70: "A strong multiple-choice section",
    75: "Strong with room to spare",
    80: "Aiming high",
    85: "Aiming for the top score",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each unit, then take a full multiple-choice section.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the multiple-choice section.",
    ],
    sourceLine: "Original practice questions written to the College Board AP Biology course framework (Course and Exam Description effective fall 2025). AP is a trademark of the College Board, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full multiple-choice section, which is 50% of the real AP score. The free-response section (six questions, 50%) is not included. The College Board combines both sections into a composite and converts it to an AP score of 1 to 5 each year, with no fixed percent for each score, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
