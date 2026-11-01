import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Delhi Police Constable (Executive): the Computer Based Examination that the
// Staff Selection Commission conducts for Delhi Police under an MoU. Pattern
// per the SSC notice "Constable (Executive) Male and Female in Delhi Police
// Examination, 2025" (uploaded 22-09-2025; CBE December 2025 / January 2026),
// the latest notice as of November 2026: one objective paper of 100
// questions, 100 marks, 90 minutes, Part A General Knowledge/Current Affairs
// 50, Part B Reasoning 25, Part C Numerical Ability 15, Part D Computer
// Fundamentals, MS Excel, MS Word, Communication, Internet, WWW and Web
// Browsers 10; 0.25 marks off per wrong answer; English and Hindi only;
// matriculation level. Cut-off (normalised) marks for the PE&MT: UR 35,
// SC/ST/OBC/EWS 30, ESM 25 (notice para 16.5). No sectional timing, so a test
// is one 100-item, 90-minute section in the paper's order: two full-length
// mock tests, Test 2 held out. Eight drills (GK split four ways, reasoning two,
// numerical ability and computer one each), so the dashboard is 10 steps. GK
// is static (no current affairs or office-holders); reasoning is text only
// (no figure items); English only. Score is percent correct; negative marking
// is explained in scoreNote and on the landing, not applied. Sources:
// tools/next100/delhipolice/sources.md.
const minutes = (n: number) => n * 60;

export const DELHIPOLICE: ExamV2Config = {
  id: "delhipolice",
  slug: "/delhi-police-constable",
  landingPath: "/delhi-police-constable-practice-test",
  name: "Delhi Police Constable Mock Test",
  shortName: "Delhi Police",
  fullName: "Delhi Police Constable (Executive) Computer Based Examination",
  tagline: "100 questions in 90 minutes in the CBE order: general knowledge, reasoning, numerical ability and computer.",
  icon: "siren",
  theme: { brand: "248 40% 30%", brandDark: "248 40% 22%", brandLight: "248 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbe",
      name: "Delhi Police Constable CBE",
      shortName: "CBE",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(90) }],
      directions: "100 questions in 90 minutes, in the CBE order: 50 General Knowledge, 25 Reasoning, 15 Numerical Ability and 10 Computer. There is no sectional timing, so move freely and flag questions to come back to. The real exam takes 0.25 marks off for each wrong answer; this practice test scores percent correct.",
      scale: percentScale(100),
      domains: [
        "delhipoliceHistory",
        "delhipolicePolity",
        "delhipoliceGeography",
        "delhipoliceScience",
        "delhipoliceVerbal",
        "delhipoliceLogical",
        "delhipoliceArith",
        "delhipoliceComputer",
      ],
    },
  ],
  tests: [
    { number: 1, name: "Mock Test 1" },
    { number: 2, name: "Mock Test 2", heldOut: true },
  ],
  domainLabels: {
    delhipoliceHistory: "General Knowledge: History, Culture and Sports",
    delhipolicePolity: "General Knowledge: Polity, Delhi and the Economy",
    delhipoliceGeography: "General Knowledge: Geography of India and Neighbours",
    delhipoliceScience: "General Knowledge: Everyday Science",
    delhipoliceVerbal: "Reasoning: Analogy, Series and Coding",
    delhipoliceLogical: "Reasoning: Relations, Directions and Puzzles",
    delhipoliceArith: "Numerical Ability",
    delhipoliceComputer: "Computer Fundamentals, MS Office and Internet",
  },
  drills: [
    { key: "history", name: "History, Culture and Sports", section: "cbe", domains: ["delhipoliceHistory"], blurb: "Ancient, medieval and modern India, the history of Delhi, the freedom struggle, art and culture, and sports." },
    { key: "polity", name: "Polity, Delhi and the Economy", section: "cbe", domains: ["delhipolicePolity"], blurb: "The Constitution, Parliament and the courts, Delhi's special status under Article 239AA, and economic institutions." },
    { key: "geography", name: "Geography of India and Neighbours", section: "cbe", domains: ["delhipoliceGeography"], blurb: "Rivers, mountains, lakes, passes, climate and soils of India, and its neighbouring countries." },
    { key: "science", name: "Everyday Science", section: "cbe", domains: ["delhipoliceScience"], blurb: "Physics, chemistry and biology in daily life, the human body, and India's space milestones." },
    { key: "verbal", name: "Analogy, Series and Coding", section: "cbe", domains: ["delhipoliceVerbal"], blurb: "Number and word analogies, odd one out, number and letter series, coding-decoding and dictionary order." },
    { key: "logical", name: "Relations, Directions and Puzzles", section: "cbe", domains: ["delhipoliceLogical"], blurb: "Blood relations, directions, ranking, calendars, clocks, statements and conclusions, and arithmetical reasoning." },
    { key: "arith", name: "Numerical Ability", section: "cbe", domains: ["delhipoliceArith"], blurb: "Percentage, LCM and HCF, fractions, ratio, averages, interest, profit and discount, mensuration, speed and work." },
    { key: "computer", name: "Computer and Internet", section: "cbe", domains: ["delhipoliceComputer"], blurb: "Computer basics, MS Word and MS Excel, e-mail, the internet, browsers, video conferencing and e-banking." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A first target while you build speed",
    60: "Well past the shortlisting cut-off marks",
    70: "A solid target for a good merit rank",
    80: "Strong: aiming for a top rank",
    90: "Topper territory",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Mock Test 1.",
      "Hit your goal on both mock tests.",
      "Goal hit. You are ready for the CBE.",
    ],
    sourceLine: "Original practice questions on the Delhi Police Constable (Executive) CBE syllabus and pattern. Not affiliated with or endorsed by the Staff Selection Commission or Delhi Police.",
    scoreNote: "Percent correct. The real CBE gives 1 mark for each right answer and takes away 0.25 marks for each wrong one, out of 100; unanswered questions score zero. The 2025 notice shortlists candidates for the Physical Endurance and Measurement Test from cut-off marks of 35 for UR, 30 for SC, ST, OBC and EWS and 25 for ex-servicemen (after normalisation), and the final merit list follows the CBE marks, so treat your goal as a readiness line.",
  },
};
