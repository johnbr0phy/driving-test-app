import { ExamV2Config } from "../types";
import { curve } from "../scales";

// ETS GRE General Test, the shorter format given since 22 September 2023
// (ETS "GRE General Test structure" page, checked October 2026): one 30-minute
// Analytical Writing task, then Verbal Reasoning in two sections (12 questions
// in 18 minutes, 15 in 23) and Quantitative Reasoning in two sections (12 in
// 21 minutes, 15 in 26), no unscored section and no scheduled break. Both
// measures are section-level adaptive: the first section is of average
// difficulty and the second section's difficulty depends on performance on
// the first. Verbal and Quant are each scored 130 to 170 in 1-point steps.
// Modelled here: both measures, with section 2 as an easier or harder variant
// chosen from section 1 accuracy (as on the SAT's module 2). Formats: text
// completion (single for one blank, cloze for two or three), sentence
// equivalence (multi, select 2 of 6), reading comprehension (single, select
// all that apply, select-in-passage as highlight), quantitative comparison
// (single, the four fixed choices, lockedOrder), problem solving, multiple
// answer and numeric entry. The essay is not modelled. Scaled scores come from
// curve() anchors: an estimate, not an ETS table. Sources: tools/gre/sources.md.
const minutes = (n: number) => n * 60;

export const GRE: ExamV2Config = {
  id: "gre",
  slug: "/gre",
  landingPath: "/gre-practice-test",
  icon: "graduation",
  name: "GRE Practice Test",
  shortName: "GRE",
  fullName: "GRE General Test",
  tagline: "The shorter GRE: two adaptive Verbal sections and two adaptive Quant sections, scored 130 to 170.",
  theme: { brand: "296 40% 34%", brandDark: "296 40% 25%", brandLight: "296 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "verbal",
      name: "Verbal Reasoning",
      shortName: "Verbal",
      modules: [
        { module: 1, questionCount: 12, timeLimit: minutes(18) },
        { module: 2, questionCount: 15, timeLimit: minutes(23), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Two sections: 12 questions in 18 minutes, then 15 in 23 minutes. The second section is easier or harder depending on how you do in the first. **Text completion:** choose one word or phrase for each blank; with two or three blanks, every blank must be right. **Sentence equivalence:** choose the two words that complete the sentence and give it the same meaning. **Reading:** answer from the passage; some questions ask you to select all choices that apply or to select a sentence in the passage.",
      scale: curve(27, [[0, 130], [8, 138], [12, 144], [17, 151], [21, 157], [24, 163], [27, 170]], 3, 1),
      // Easier second section: at most 7 + 15 = 22 correct, topping out in the low 150s.
      lowerScale: curve(27, [[0, 130], [5, 134], [10, 140], [15, 146], [19, 150], [22, 153], [27, 153]], 3, 1),
      domains: ["greTextCompletion", "greSentenceEquivalence", "greReading"],
    },
    {
      key: "quant",
      name: "Quantitative Reasoning",
      shortName: "Quant",
      calculator: true,
      modules: [
        { module: 1, questionCount: 12, timeLimit: minutes(21) },
        { module: 2, questionCount: 15, timeLimit: minutes(26), adaptive: { threshold: 0.6 } },
      ],
      directions:
        "Two sections: 12 questions in 21 minutes, then 15 in 26 minutes, with an on-screen calculator. The second section is easier or harder depending on how you do in the first. **Quantitative comparison:** compare Quantity A and Quantity B, using any information given above them. **Multiple answer:** select every choice that works. **Numeric entry:** type the number only, as an integer, a decimal or a fraction such as 3/4. Figures are not drawn to scale unless noted.",
      scale: curve(27, [[0, 130], [8, 140], [12, 146], [17, 153], [21, 159], [24, 164], [27, 170]], 3, 1),
      // Easier second section: at most 7 + 15 = 22 correct, topping out in the mid 150s.
      lowerScale: curve(27, [[0, 130], [5, 135], [10, 141], [15, 147], [19, 152], [22, 155], [27, 155]], 3, 1),
      domains: ["greArithmetic", "greAlgebra", "greGeometry", "greData"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    greTextCompletion: "Text Completion",
    greSentenceEquivalence: "Sentence Equivalence",
    greReading: "Reading Comprehension",
    greArithmetic: "Arithmetic",
    greAlgebra: "Algebra",
    greGeometry: "Geometry",
    greData: "Data Analysis",
  },
  drills: [
    { key: "textCompletion", name: "Text Completion", section: "verbal", domains: ["greTextCompletion"], blurb: "One, two and three blanks. Read the whole sentence for its signal words, then fill each blank." },
    { key: "sentenceEquivalence", name: "Sentence Equivalence", section: "verbal", domains: ["greSentenceEquivalence"], blurb: "Pick the two words that give the sentence the same meaning, and skip the synonym pair that does not fit." },
    { key: "reading", name: "Reading Comprehension", section: "verbal", domains: ["greReading"], blurb: "Short passages, arguments to strengthen or weaken, select all that apply and select a sentence." },
    { key: "arithmetic", name: "Arithmetic", section: "quant", domains: ["greArithmetic"], blurb: "Fractions, percents, divisibility, primes, exponents and number properties." },
    { key: "algebra", name: "Algebra", section: "quant", domains: ["greAlgebra"], blurb: "Equations, inequalities, functions, rates, ratios and word problems." },
    { key: "geometry", name: "Geometry", section: "quant", domains: ["greGeometry"], blurb: "Triangles, circles, polygons, solids and the coordinate plane." },
    { key: "data", name: "Data Analysis", section: "quant", domains: ["greData"], blurb: "Mean, median, spread, tables, counting and probability." },
  ],
  composite: { name: "Verbal + Quant", min: 260, max: 340, combine: (sections) => sections.reduce((a, s) => a + s.scaled, 0) },
  defaultGoal: 310,
  goalChoices: [300, 305, 310, 315, 320, 325],
  goalNotes: {
    300: "About 150 on each measure",
    305: "Close to the average test taker",
    310: "A little above average",
    315: "Competitive for many master's programs",
    320: "Strong: around 160 on each measure",
    325: "Aiming at the most selective programs",
  },
  testLength: "1 hr 28 min",
  copy: {
    heroSubs: [
      "Drill each question type, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your GRE.",
    ],
    sourceLine: "Original questions written to the ETS description of the shorter GRE General Test. Not affiliated with or endorsed by ETS. Score estimates are unofficial.",
    scoreNote: "Verbal and Quant are each estimated on the 130 to 170 scale from a typical conversion, not an ETS table, and added together here. As on the real GRE, the easier second section limits how high a measure can score, so a strong first section matters. The Analytical Writing essay (scored 0 to 6) is not included.",
  },
};
