import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JAMB UTME Biology (Joint Admissions and Matriculation Board, Nigeria).
// The UTME is one computer-based sitting of four subjects, 180 objective
// questions in 2 hours: Use of English (compulsory) 60 questions and three
// other subjects of 40 each, every subject scored out of 100, so 400 in all.
// Biology is the third subject for most science, medical, agricultural and
// life-science courses. The JAMB Biology syllabus has five sections: A Variety
// of Organisms, B Form and Functions, C Ecology, D Heredity and Variations,
// E Evolution. JAMB publishes no split of the 40 questions, so the blueprint
// below is Tigertest's, weighted to the syllabus: per test 8 variety, 6
// nutrition, 6 transport/respiration/excretion/support, 6 reproduction/
// growth/co-ordination, 8 ecology, 6 heredity/variation/evolution. One
// section of 40 four-option questions in 30 minutes, the pro rata share of
// the 2 hours (180 questions in 120 minutes), with free navigation as on the
// real CBT. Two practice tests, Test 2 held out; six drills, 8 dashboard
// steps. Percent score out of 100, like the subject score. Sources:
// tools/next100/jambbio/sources.md.
const minutes = (n: number) => n * 60;

export const JAMBBIO: ExamV2Config = {
  id: "jambbio",
  slug: "/jamb-biology",
  landingPath: "/jamb-biology-practice-test",
  name: "JAMB Biology Practice Test",
  shortName: "JAMB Biology",
  fullName: "JAMB UTME Biology",
  tagline: "40 questions in 30 minutes across the whole JAMB Biology syllabus, scored out of 100.",
  icon: "microscope",
  theme: { brand: "135 30% 38%", brandDark: "135 30% 28%", brandLight: "135 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "bio",
      name: "Biology",
      shortName: "Biology",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(30) }],
      directions:
        "40 questions in 30 minutes, the share of the UTME's 2 hours that one 40-question subject gets when you split the time by questions. The questions follow the syllabus order: variety of organisms, form and functions, ecology, then heredity, variation and evolution. You can move between questions and flag them, as on the real CBT. Wrong answers lose no marks here, so answer every question.",
      scale: percentScale(40),
      domains: ["jambbioVariety", "jambbioNutrition", "jambbioTransport", "jambbioReproduction", "jambbioEcology", "jambbioGenetics"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jambbioVariety: "Variety of Organisms",
    jambbioNutrition: "Plant Structure and Nutrition",
    jambbioTransport: "Transport, Respiration, Excretion and Support",
    jambbioReproduction: "Reproduction, Growth and Co-ordination",
    jambbioEcology: "Ecology",
    jambbioGenetics: "Heredity, Variation and Evolution",
  },
  drills: [
    { key: "variety", name: "Variety of Organisms", section: "bio", domains: ["jambbioVariety"], blurb: "Cells and their environment, levels of organisation, the kingdoms from Monera to mammals, and adaptations." },
    { key: "nutrition", name: "Nutrition", section: "bio", domains: ["jambbioNutrition"], blurb: "Plant tissues, photosynthesis, mineral needs, food classes and tests, teeth and digestion." },
    { key: "transport", name: "Transport and Respiration", section: "bio", domains: ["jambbioTransport"], blurb: "Xylem and phloem, blood and circulation, respiration, excretion, skeletons and joints." },
    { key: "reproduction", name: "Reproduction and Co-ordination", section: "bio", domains: ["jambbioReproduction"], blurb: "Flowers, fruits and seeds, human reproduction, growth, hormones, the nervous system and senses." },
    { key: "ecology", name: "Ecology", section: "bio", domains: ["jambbioEcology"], blurb: "Ecological factors, food chains and cycles, populations, soil, Nigerian habitats, diseases and pollution." },
    { key: "genetics", name: "Heredity and Evolution", section: "bio", domains: ["jambbioGenetics"], blurb: "Mendel's laws, sickle cell and blood groups, sex linkage, variation, and the theories and evidence of evolution." },
  ],
  composite: { name: "Biology score (out of 100)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you work through the syllabus",
    60: "Building up: Biology counts in your UTME total",
    70: "A solid score that lifts your UTME total",
    80: "Strong: a big boost for medicine, nursing and other competitive courses",
    90: "Excellent",
  },
  testLength: "30 min",
  copy: {
    heroSubs: [
      "Drill each part of the syllabus, then sit a full practice test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for UTME Biology.",
    ],
    sourceLine: "Original practice questions on the JAMB UTME Biology syllabus (variety of organisms, form and functions, ecology, heredity and variations, evolution). Not affiliated with or endorsed by JAMB.",
    scoreNote: "Score out of 100, like the UTME subject score, from 40 questions in 30 minutes, Biology's share of the UTME's 2 hours. JAMB publishes no topic split, so the mix of topics is Tigertest's. Diagrams are described in words. Your real UTME total is out of 400 across four subjects, and the cut-off mark depends on the institution and course.",
  },
};
