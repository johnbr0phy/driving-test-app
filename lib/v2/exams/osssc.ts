import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// OSSSC advertisement IIE-120/2025-3219 (30 December 2025), CRE-2025.
// Five non-Odia subject counts preserved; current affairs and practical excluded.
export const OSSSC: ExamV2Config = {
  id: "osssc", slug: "/osssc", landingPath: "/osssc-cre-practice-test",
  name: "OSSSC CRE Practice Test", shortName: "OSSSC CRE",
  fullName: "Odisha OSSSC CRE-2025 Written Subjects Practice", icon: "briefcase",
  tagline: "English-language practice for five CRE-2025 subjects. Odia, current affairs and the computer practical are excluded.",
  theme: { brand: "131 15% 32%", brandDark: "131 15% 22%", brandLight: "131 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "written", name: "Written Subjects", shortName: "Written",
    modules: [{ module: 1, questionCount: 85, timeLimit: 90 * 60 }],
    directions: "85 original English-language questions: mathematics 20, stable general studies 20, English 20, computer knowledge 15 and logical reasoning 10. These retain the five non-Odia subject counts from OSSSC CRE-2025 advertisement IIE-120/2025-3219. The official full paper has 100 questions in 90 minutes, including 15 Odia questions. This subset uses a chosen 90-minute timer and excludes Odia, current affairs and the Stage II computer practical. Choose one answer per question. The real written exam awards +1 for correct answers and deducts 0.25 for wrong answers; this practice reports percentage correct with NO negative marking or normalization. It is not a complete mock exam or a selection prediction.",
    scale: percentScale(85), domains: ["ossscMaths", "ossscGeneral", "ossscEnglish", "ossscComputer", "ossscReasoning"] }],
  tests: [{ number: 1, name: "Subject Test 1" }, { number: 2, name: "Subject Test 2", heldOut: true }],
  domainLabels: { ossscMaths: "Mathematics", ossscGeneral: "Stable General Studies", ossscEnglish: "English", ossscComputer: "Computer Knowledge", ossscReasoning: "Logical Reasoning" },
  drills: [
    { key: "maths", name: "Mathematics", section: "written", domains: ["ossscMaths"], blurb: "Percentages, ratios, work, geometry and data." },
    { key: "general", name: "Stable General Studies", section: "written", domains: ["ossscGeneral"], blurb: "Selected Odisha history and geography, civics and basic science. No current affairs." },
    { key: "english", name: "English", section: "written", domains: ["ossscEnglish"], blurb: "Grammar, vocabulary and original short reading passages." },
    { key: "computer", name: "Computer Knowledge", section: "written", domains: ["ossscComputer"], blurb: "Hardware, documents, spreadsheets and digital security concepts." },
    { key: "reasoning", name: "Logical Reasoning", section: "written", domains: ["ossscReasoning"], blurb: "Directions, order, logical conclusions and data sufficiency." },
  ],
  composite: { name: "Subject practice score (%)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70, goalChoices: [50, 60, 70, 80, 90],
  goalNotes: { 50: "Build a foundation", 60: "Review weaker subjects", 70: "A study goal, not an official cutoff", 80: "Consistent subject knowledge", 90: "Strong performance on this subset" },
  testLength: "90 min",
  copy: {
    heroSubs: ["Five subject drills and two tests. Start with Mathematics.", "Practise one subject at a time.", "Try the first subject test.", "Use the second test for a fresh check.", "Study goal reached. Prepare the excluded subjects and practical separately."],
    sourceLine: "200 original questions for selected CRE-2025 written subjects. Not affiliated with OSSSC or the Government of Odisha.",
    scoreNote: "Percentage correct on an 85-question English-language subset. No Odia, current affairs or computer practical. The official full paper has 100 questions and a 0.25-mark wrong-answer penalty; this score applies neither negative marking nor normalization. Study goals are not official qualifying or selection cutoffs. This is OSSSC CRE-2025 practice, not OSSC, Odisha Police or CRE-2025(II).",
  },
};
