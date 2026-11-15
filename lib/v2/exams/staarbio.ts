import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// STAAR Biology end-of-course assessment (Texas Education Agency). TEA's
// Biology STAAR Blueprint, effective beginning with the Spring 2026
// administration (updated fall 2025): 33 to 35 questions worth 40 points in
// four strands, Biological Structures, Functions, and Processes 12-14
// questions (13-16 points), Mechanisms of Genetics 7-9 (8-11), Biological
// Evolution 7-9 (8-11) and Interdependence within Environmental Systems 5-7
// (6-9); 26-30 one-point questions and 5-7 two-point questions; question
// types include multiple choice, multiselect, drag and drop, hot spot, inline
// choice, match table grid, multipart, text entry, short constructed response
// and cluster sets (a stimulus with 3 to 5 questions). Eligible standards are
// TEA's Biology assessed curriculum (2025-2026) from 19 TAC §112.42. The
// 2026-2027 STAAR Test Administrator Manual: students are expected to finish
// in three to four hours, within one school day, up to seven hours; a
// calculator is required. Spring 2026 cuts: Approaches 3550, Meets 4000,
// Masters 4570 (raw 10, 17 and 26 of 40 on that form).
// Modelled: two untimed 35-question tests, 13/8/8/6 by strand (the middle of
// each range), split 4/3/3/3, 4/4, 3/5 and 6 across nine drills of assessed
// standards, three cluster sets per test, multiple choice and multiselect
// only, one point each, percent correct. Test 2 is held out of the drills.
// Sources: tools/next100/staarbio/sources.md.

export const STAARBIO: ExamV2Config = {
  id: "staarbio",
  slug: "/staar-biology",
  landingPath: "/staar-biology-practice-test",
  icon: "microscope",
  name: "STAAR Biology Practice Test",
  shortName: "STAAR Biology",
  fullName: "STAAR Biology End-of-Course Assessment",
  tagline: "The Texas STAAR Biology EOC: 35 questions across all four strands of TEA's 2026 blueprint.",
  theme: { brand: "322 85% 30%", brandDark: "322 85% 22%", brandLight: "322 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "bio",
      name: "Biology",
      shortName: "Biology",
      modules: [{ module: 1, questionCount: 35, timeLimit: 0 }],
      calculator: true,
      directions:
        "35 biology questions across all four strands of the STAAR Biology test. There is no clock: the real test is untimed within the school day, so take your time. Some questions share a scenario with a data table shown beside them, and some ask you to choose two answers. A calculator is in the tools drawer. Flag questions and come back to them before you submit.",
      scale: percentScale(35),
      domains: [
        "staarbioCells", "staarbioCellCycle", "staarbioEnergy", "staarbioSystems",
        "staarbioDNA", "staarbioInheritance", "staarbioEvidence", "staarbioSelection", "staarbioEcology",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    staarbioCells: "Biomolecules, Cells and Viruses",
    staarbioCellCycle: "Cell Cycle and Differentiation",
    staarbioEnergy: "Photosynthesis, Respiration and Enzymes",
    staarbioSystems: "Animal and Plant Systems",
    staarbioDNA: "DNA, Protein Synthesis and Mutations",
    staarbioInheritance: "Meiosis and Inheritance",
    staarbioEvidence: "Evidence of Common Ancestry",
    staarbioSelection: "Natural Selection and Speciation",
    staarbioEcology: "Interdependence in Ecosystems",
  },
  drills: [
    { key: "cells", name: "Biomolecules, Cells and Viruses", section: "bio", domains: ["staarbioCells"], blurb: "Carbohydrates, lipids, proteins and nucleic acids, prokaryotic and eukaryotic cells, and viruses." },
    { key: "cellcycle", name: "Cell Cycle and Differentiation", section: "bio", domains: ["staarbioCellCycle"], blurb: "Stages of the cell cycle, DNA replication, cell specialization and cancer." },
    { key: "energy", name: "Photosynthesis, Respiration and Enzymes", section: "bio", domains: ["staarbioEnergy"], blurb: "Matter and energy in photosynthesis and cellular respiration, and how enzymes work." },
    { key: "systems", name: "Animal and Plant Systems", section: "bio", domains: ["staarbioSystems"], blurb: "How body systems work together, and transport, reproduction and response in plants." },
    { key: "dna", name: "DNA, Protein Synthesis and Mutations", section: "bio", domains: ["staarbioDNA"], blurb: "The parts of DNA, transcription and translation, and changes in DNA." },
    { key: "inheritance", name: "Meiosis and Inheritance", section: "bio", domains: ["staarbioInheritance"], blurb: "Meiosis and variation, monohybrid and dihybrid crosses, and non-Mendelian traits." },
    { key: "evidence", name: "Evidence of Common Ancestry", section: "bio", domains: ["staarbioEvidence"], blurb: "Fossils, biogeography, homologies and rates of change in the fossil record." },
    { key: "selection", name: "Natural Selection and Speciation", section: "bio", domains: ["staarbioSelection"], blurb: "How natural selection changes populations, speciation, genetic drift and gene flow." },
    { key: "ecology", name: "Interdependence in Ecosystems", section: "bio", domains: ["staarbioEcology"], blurb: "Ecological relationships, energy flow, the carbon and nitrogen cycles and biodiversity." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 60,
  goalChoices: [30, 45, 60, 70, 80, 90],
  goalNotes: {
    30: "A starting target",
    45: "Building a solid base",
    60: "A comfortable margin",
    70: "Strong across the strands",
    80: "Aiming high",
    90: "Aiming for the top",
  },
  testLength: "Untimed",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full practice test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for STAAR Biology.",
    ],
    sourceLine: "Original practice questions written to TEA's STAAR Biology blueprint (effective Spring 2026) and the Biology TEKS eligible for assessment. STAAR is a program of the Texas Education Agency, which is not affiliated with and does not endorse Tigertest. Score estimates are unofficial.",
    scoreNote: "Percent correct on a full practice test. The real STAAR Biology test has 33 to 35 questions worth 40 points, including some two-point questions and item types not modelled here, and reports a scale score: on the Spring 2026 form, Approaches Grade Level was 3550, Meets 4000 and Masters 4570. Raw cuts change from form to form, so the goals here are Tigertest's targets, not official cutoffs.",
  },
};
