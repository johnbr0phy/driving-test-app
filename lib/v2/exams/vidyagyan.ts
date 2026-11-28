import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Owner's latest accessible subject notice: MAIN exam 2026–27, Class4–5 skills.
// Current2027–28 portal has no detailed blueprint. This is English-language
// supporting skills practice, not a simulation of preliminary or main exams.
// Equal10/10/10/10 counts and60min are practice choices. Hindi not covered.
export const VIDYAGYAN: ExamV2Config = {
  id: "vidyagyan", slug: "/vidyagyan", landingPath: "/vidyagyan-class-6-practice-test",
  name: "VidyaGyan Class 6 Practice Test", shortName: "VidyaGyan Class 6",
  fullName: "UP VidyaGyan Class 6 Entrance Skills Practice", icon: "graduation",
  tagline: "Build Class 4–5 skills in English for VidyaGyan preparation. Hindi and full entrance-stage simulations are not included.",
  theme: { brand: "315 15% 32%", brandDark: "315 15% 22%", brandLight: "315 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "skills", name: "Entrance Skills", shortName: "Skills",
    modules: [{ module: 1, questionCount: 40, timeLimit: 60 * 60 }],
    directions: "40 original Class 4–5 skills questions in English: ten each in English, mathematics, science and general knowledge, and text reasoning. The equal topic split and 60-minute timer are Tigertest choices, not an official VidyaGyan blueprint. This supports preparation for the entrance process but does not simulate either preliminary or main stage. Hindi, picture-only reasoning, OMR mechanics and interviews are not covered. Choose one answer, move between questions and flag any you want to revisit. Wrong answers have no penalty in this practice.",
    scale: percentScale(40), domains: ["vidyaEnglish", "vidyaMaths", "vidyaScience", "vidyaReasoning"] }],
  tests: [{ number: 1, name: "Skills Test 1" }, { number: 2, name: "Skills Test 2", heldOut: true }],
  domainLabels: { vidyaEnglish: "English Language", vidyaMaths: "Mathematics", vidyaScience: "Science and General Knowledge", vidyaReasoning: "Text Reasoning" },
  drills: [
    { key: "english", name: "English Language", section: "skills", domains: ["vidyaEnglish"], blurb: "Words in context, grammar, punctuation and original short passages.", basics: ["ks2WordClasses", "ks2WordMeaning", "ks2Inference", "verbTense"] },
    { key: "maths", name: "Mathematics", section: "skills", domains: ["vidyaMaths"], blurb: "Number operations, fractions, measurement, shapes and simple data.", basics: ["ks2ShortDivision", "decimals", "ks2Time", "areaPerimeter"] },
    { key: "science", name: "Science and General Knowledge", section: "skills", domains: ["vidyaScience"], blurb: "Plants, water, materials, observations and community services." },
    { key: "reasoning", name: "Text Reasoning", section: "skills", domains: ["vidyaReasoning"], blurb: "Directions, order, patterns, classification and relationships in words." },
  ],
  composite: { name: "Skills practice score (%)", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70, goalChoices: [50, 60, 70, 80, 90],
  goalNotes: { 50: "Build a foundation", 60: "Keep strengthening the four skill areas", 70: "A study target, not an admission cutoff", 80: "Consistent skills practice", 90: "Strong performance on these skills" },
  testLength: "60 min",
  copy: {
    heroSubs: ["Start with English and maths Basics, then practise the four subjects and take both skills tests. Prepare Hindi separately.", "Practise one skill area at a time.", "Try the first skills test.", "Use the second test for a fresh check.", "Skills goal reached. Continue preparing the other entrance requirements."],
    sourceLine: "160 original Class 4–5 skills questions informed by VidyaGyan's latest accessible subject notice. Not affiliated with VidyaGyan or the Shiv Nadar Foundation.",
    scoreNote: "Percentage correct on this limited English-language skills practice, not a prediction of selection. VidyaGyan has preliminary and main stages; this does not reproduce either current blueprint. The timer and equal weights are Tigertest choices. Hindi, picture-only reasoning, interviews and eligibility screening are excluded. Check current official guidance with a parent or teacher.",
  },
};
