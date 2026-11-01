import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// JNVST Class VI (Jawahar Navodaya Vidyalaya Selection Test), run by
// Navodaya Vidyalaya Samiti for admission to Class VI of the JNVs. Pattern
// from the JNVST 2027 prospectus (session 2027-28, test on 28 November
// 2026): one OMR booklet, 80 four-option questions for 100 marks
// (1.25 each) in 2 hours with no break, no negative marking. Mental Ability
// Test and EVS 20 + 20 (suggested 60 min), Arithmetic 20 (30 min), Language
// 20 (30 min, four passages of 5 questions); candidates may adjust the time
// between sections. Minimum qualifying marks: 14 in Mental Ability and EVS,
// 7 in Arithmetic, 7 in Language. The real Mental Ability Test is non-verbal
// (figures and diagrams only: pattern completion, figure series, geometrical
// figure completion, mirror and water images, embedded figures). Tigertest
// cannot show those pictures, so its 20 Mental Ability items are text
// versions of the same reasoning (letter and number patterns, mirror and
// water images of letters, digits and clocks, paper folding, counting
// shapes), said in `directions`, `scoreNote` and on the landing. EVS is 15
// questions plus one passage of 5, like the real part. Drills: MAT split
// into patterns and shapes, EVS into natural and social world, body and
// daily-life science, and the EVS passage, Arithmetic into numbers and
// measurement, plus the Language Test (per test 10/10, 8/7/5, 10/10, 20).
// Sources: tools/next100/jnvst/sources.md.
const minutes = (n: number) => n * 60;

export const JNVST: ExamV2Config = {
  id: "jnvst",
  slug: "/jnvst",
  landingPath: "/jnvst-class-6-practice-test",
  name: "JNVST Class 6 Practice Test",
  shortName: "JNVST",
  fullName: "JNVST Class 6 (Jawahar Navodaya Vidyalaya Selection Test)",
  tagline: "80 questions in 2 hours on the JNVST Class 6 pattern: Mental Ability, EVS, Arithmetic and Language.",
  icon: "graduation",
  theme: { brand: "51 65% 31%", brandDark: "51 65% 23%", brandLight: "51 65% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "jnv",
      name: "Selection Test",
      shortName: "JNVST",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(120) }],
      directions: "80 questions in 2 hours, the real JNVST length, in the real order: Mental Ability (1 to 20), EVS (21 to 40), Arithmetic (41 to 60) and Language (61 to 80). You can move between questions and flag them. The real Mental Ability questions are pictures; here they are written in words, so practise the picture questions in the NVS sample paper too. There is no negative marking, so answer every question.",
      scale: percentScale(80),
      domains: ["jnvstPatterns", "jnvstShapes", "jnvstNature", "jnvstLiving", "jnvstEvsPassage", "jnvstNumbers", "jnvstMeasure", "jnvstReading"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jnvstPatterns: "Mental Ability: Patterns and Series",
    jnvstShapes: "Mental Ability: Mirrors, Folding and Shapes",
    jnvstNature: "EVS: Natural and Social World",
    jnvstLiving: "EVS: Human Body and Daily Life",
    jnvstEvsPassage: "EVS: Passage",
    jnvstNumbers: "Arithmetic: Numbers and Fractions",
    jnvstMeasure: "Arithmetic: Measurement, Shapes and Data",
    jnvstReading: "Language: Reading Passages",
  },
  drills: [
    { key: "patterns", name: "Patterns and Series", section: "jnv", domains: ["jnvstPatterns"], blurb: "Letter and number series, letter analogies, simple codes and odd one out." },
    { key: "shapes", name: "Mirrors, Folding and Shapes", section: "jnv", domains: ["jnvstShapes"], blurb: "Mirror and water images, paper folding, counting shapes and symmetry, in words." },
    { key: "nature", name: "Natural and Social World", section: "jnv", domains: ["jnvstNature"], blurb: "Rivers, mountains, animals, disasters, states and capitals, national symbols, festivals and crops." },
    { key: "living", name: "Human Body and Daily Life", section: "jnv", domains: ["jnvstLiving"], blurb: "Food and nutrients, body systems, senses, hygiene, pollution and saving water and soil." },
    { key: "evspassage", name: "EVS Passage", section: "jnv", domains: ["jnvstEvsPassage"], blurb: "Read a short passage about the environment and answer five questions." },
    { key: "numbers", name: "Numbers and Fractions", section: "jnv", domains: ["jnvstNumbers"], blurb: "Place value, number names, rounding, factors and multiples, fractions and simplification." },
    { key: "measure", name: "Measurement, Shapes and Data", section: "jnv", domains: ["jnvstMeasure"], blurb: "Length, mass, time and money, perimeter and area, angles, directions, tables and pictographs." },
    { key: "reading", name: "Reading Passages", section: "jnv", domains: ["jnvstReading"], blurb: "Stories and short articles, each with five questions on facts, word meanings and the main idea." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [40, 50, 60, 70, 80, 90],
  goalNotes: {
    40: "Above the qualifying marks, if spread across every section",
    50: "A fair start",
    60: "A solid score",
    70: "A strong score",
    80: "Competitive in many districts",
    90: "A top score",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each part, then take a full JNVST.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the JNVST.",
    ],
    sourceLine: "Original practice questions on the JNVST Class VI pattern in the JNVST 2027 prospectus. Not affiliated with or endorsed by Navodaya Vidyalaya Samiti.",
    scoreNote: "Percent correct. The real test gives 1.25 marks for each right answer, out of 100, with no negative marking, and you need at least 14 marks in Mental Ability and EVS, 7 in Arithmetic and 7 in Language. Seats are then given on merit district by district, so the score you need changes with the district and the year. The Mental Ability questions here are written in words; the real ones are pictures.",
  },
};
