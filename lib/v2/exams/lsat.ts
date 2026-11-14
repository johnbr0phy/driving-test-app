import { ExamV2Config, SectionResult } from "../types";
import { curve, percentScale } from "../scales";

// LSAC's LSAT, the format in force since August 2024 and through June 2027
// (lsac.org "Specifications: LSAT and LSAT Argumentative Writing", "LSAT test
// format", "Reading Comprehension", "Logical Reasoning" and "LSAT Scoring",
// all checked November 2026): four 35-minute multiple-choice sections, two
// scored Logical Reasoning, one scored Reading Comprehension and one unscored
// variable section of either type, a 10-minute intermission between the second
// and third sections, five answer choices, no deduction for wrong answers, one
// scaled score from 120 to 180. Analytical Reasoning (logic games) left in
// August 2024. Scored counts (25 per Logical Reasoning section, 27 Reading
// Comprehension questions on four sets) are from LSAC's 26 October 2026
// announcement of the August 2027 format, which keeps the same scored content.
// Modelled: the three scored sections at 35 minutes each, Logical Reasoning
// first as two timed parts, the intermission, then Reading Comprehension with
// three single passages and one comparative pair. The variable section and
// LSAT Argumentative Writing are not modelled. The 120 to 180 estimate comes
// from curve() over the total correct out of 77: Tigertest's estimate, not an
// LSAC conversion table. Sources: tools/next100/lsat/sources.md.
const minutes = (n: number) => n * 60;

/** Tigertest's raw-to-scaled estimate: total correct out of 77 to 120 to 180. */
const LSAT_SCALE = curve(77, [[0, 120], [14, 120], [20, 127], [30, 139], [43, 150], [56, 160], [66, 170], [74, 178], [77, 180]], 3, 1);

/** One LSAT score from every scored section's raw correct. */
export function lsatScore(sections: SectionResult[]): number {
  const raw = sections.reduce((a, s) => a + s.raw, 0);
  const total = sections.reduce((a, s) => a + s.total, 0);
  if (!total) return 120;
  // Rescale to 77 questions in case a sitting has a different count.
  const r = Math.round((raw / total) * 77);
  return LSAT_SCALE.table[Math.max(0, Math.min(77, r))];
}

export const LSAT: ExamV2Config = {
  id: "lsat",
  slug: "/lsat",
  landingPath: "/lsat-practice-test",
  icon: "graduation",
  name: "LSAT Practice Test",
  shortName: "LSAT",
  fullName: "Law School Admission Test (LSAT)",
  tagline: "Two scored Logical Reasoning sections and Reading Comprehension with a comparative passage pair, 35 minutes each, with a 120 to 180 score estimate.",
  theme: { brand: "342 30% 24%", brandDark: "342 30% 18%", brandLight: "342 30% 96%" },
  breakSeconds: 10 * 60,
  breakNote: "The real LSAT gives a 10-minute intermission between the second and third sections.",
  sections: [
    {
      key: "lr",
      name: "Logical Reasoning",
      shortName: "Logical Reasoning",
      breakAfter: true,
      modules: [
        { module: 1, questionCount: 25, timeLimit: minutes(35) },
        { module: 2, questionCount: 25, timeLimit: minutes(35) },
      ],
      directions:
        "Two sections of 25 questions, 35 minutes each. Each question is based on a short argument or set of statements. Choose the response that most accurately and completely answers the question. Do not bring in assumptions that common sense would not accept, and do not pick an answer only because it is true. Five choices, one best answer, no penalty for a wrong answer.",
      scale: percentScale(50),
      domains: ["lsatStructure", "lsatAssumption", "lsatStrengthen", "lsatFlaw", "lsatInference", "lsatParallel"],
    },
    {
      key: "rc",
      name: "Reading Comprehension",
      shortName: "Reading",
      modules: [{ module: 1, questionCount: 27, timeLimit: minutes(35) }],
      directions:
        "27 questions on four sets in 35 minutes: three single passages and one pair of related shorter passages, Passage A and Passage B. Answer on the basis of what the passages state or imply. Five choices, one best answer, no penalty for a wrong answer.",
      scale: percentScale(27),
      domains: ["lsatRcMain", "lsatRcDetail", "lsatRcComparative"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    lsatStructure: "Argument Structure",
    lsatAssumption: "Assumptions",
    lsatStrengthen: "Strengthen, Weaken and Explain",
    lsatFlaw: "Flaws",
    lsatInference: "Inference",
    lsatParallel: "Parallel Reasoning and Principles",
    lsatRcMain: "Main Point and Structure",
    lsatRcDetail: "Detail and Inference",
    lsatRcComparative: "Comparative Reading",
  },
  drillSize: 15,
  drills: [
    { key: "structure", name: "Argument Structure", section: "lr", domains: ["lsatStructure"], blurb: "Main conclusion, the role a claim plays, method of reasoning and points of disagreement." },
    { key: "assumption", name: "Assumptions", section: "lr", domains: ["lsatAssumption"], blurb: "Necessary and sufficient assumptions: find the gap between the evidence and the conclusion." },
    { key: "strengthen", name: "Strengthen, Weaken and Explain", section: "lr", domains: ["lsatStrengthen"], blurb: "How new evidence affects an argument, what would help evaluate it, and how to resolve a paradox." },
    { key: "flaw", name: "Flaws", section: "lr", domains: ["lsatFlaw"], blurb: "Causation from correlation, unrepresentative samples, part and whole, necessary and sufficient, and more." },
    { key: "inference", name: "Inference", section: "lr", domains: ["lsatInference"], blurb: "Must be true, most strongly supported and cannot be true: stay inside what the statements give you." },
    { key: "rcMain", name: "Main Point and Structure", section: "rc", domains: ["lsatRcMain"], blurb: "Main point, primary purpose, how a passage is organized and the author's attitude." },
    { key: "rcDetail", name: "Detail and Inference", section: "rc", domains: ["lsatRcDetail"], blurb: "Stated information, inferences, meaning in context and applying a passage to a new case." },
    { key: "parallel", name: "Parallel Reasoning and Principles", section: "lr", domains: ["lsatParallel"], blurb: "Match a pattern of reasoning, spot a parallel flaw, and apply or justify with a principle." },
    { key: "comparative", name: "Comparative Reading", section: "rc", domains: ["lsatRcComparative"], blurb: "Two related passages: what they share, where they disagree and how one bears on the other." },
  ],
  composite: { name: "LSAT score", min: 120, max: 180, combine: lsatScore },
  defaultGoal: 160,
  goalChoices: [150, 155, 160, 165, 170, 175],
  goalNotes: {
    150: "Close to the middle of the scale",
    155: "Above the middle, a solid start",
    160: "Competitive for many law schools",
    165: "Strong: aiming at highly ranked schools",
    170: "Top few percent of test takers",
    175: "Near the top of the scale",
  },
  testLength: "1 hr 45 min",
  copy: {
    heroSubs: [
      "Drill each question family, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Register for the LSAT.",
    ],
    sourceLine: "Original questions written to LSAC's description of the LSAT. Not affiliated with or endorsed by LSAC. LSAT is a trademark of LSAC. Score estimates are unofficial.",
    scoreNote: "The 120 to 180 score is Tigertest's estimate from the number you got right out of 77, using a typical conversion, not an LSAC table: each real form has its own. The unscored variable section and LSAT Argumentative Writing are not included.",
  },
};
