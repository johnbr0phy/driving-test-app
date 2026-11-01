import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// RPF Constable (Executive), Railway Protection Force and Railway Protection
// Special Force, the Computer Based Test as notified by the Railway
// Recruitment Boards in CEN RPF 02/2024 (4,208 posts; CBT held in March
// 2025): 120 multiple-choice questions in 90 minutes, General Awareness 50,
// Arithmetic 35, General Intelligence and Reasoning 35, one mark each with
// 1/3 mark deducted for a wrong answer (the deduction is stated in the CEN;
// the subject split is as reported by exam guides). Guides report minimum
// qualifying marks of 35% for UR, EWS and OBC (non-creamy layer) and 30% for
// SC and ST. Shortlisting for the PET and PMT (both qualifying) goes by
// normalised CBT marks; document verification and the final merit list
// follow. The next recruitment had not been notified as of November 2026.
// Practice tests are modelled at 100 questions in 75 minutes, the real pace
// (45 seconds a question), with the subjects in the real proportion: General
// Awareness 42, Arithmetic 29, Reasoning 29, grouped by subject. Negative
// marking is explained in the copy, not scored. Drills: GA split into
// history and culture, geography, polity and economy (with the railways),
// and general science; arithmetic into word problems and numbers, algebra
// and geometry; reasoning into verbal and logical (per test 11/10/11/10,
// 15/14, 15/14). GA is static facts only, no current affairs and no
// office-holders. Sources: tools/next100/rpfconst/sources.md.
const minutes = (n: number) => n * 60;

export const RPFCONST: ExamV2Config = {
  id: "rpfconst",
  slug: "/rpf-constable",
  landingPath: "/rpf-constable-practice-test",
  name: "RPF Constable Practice Test",
  shortName: "RPF Constable",
  fullName: "RPF Constable Computer Based Test",
  tagline: "100-question mock tests at the real RPF Constable CBT pace: General Awareness, Arithmetic and Reasoning.",
  icon: "shield",
  theme: { brand: "228 20% 44%", brandDark: "228 20% 34%", brandLight: "228 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cbt",
      name: "CBT",
      shortName: "CBT",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(75) }],
      directions: "100 questions in 75 minutes, the real RPF Constable CBT pace (the real paper is 120 questions in 90 minutes), grouped by subject: General Awareness (1 to 42), Arithmetic (43 to 71), then General Intelligence and Reasoning (72 to 100). You can move between questions and flag them. The real exam takes away 1/3 mark for each wrong answer; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(100),
      domains: ["rpfconstHistory", "rpfconstGeography", "rpfconstPolity", "rpfconstScience", "rpfconstArith", "rpfconstMaths", "rpfconstVerbal", "rpfconstLogical"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    rpfconstHistory: "General Awareness: History and Culture",
    rpfconstGeography: "General Awareness: Geography",
    rpfconstPolity: "General Awareness: Polity, Economy and Railways",
    rpfconstScience: "General Awareness: General Science",
    rpfconstArith: "Arithmetic: Word Problems",
    rpfconstMaths: "Arithmetic: Numbers, Algebra and Geometry",
    rpfconstVerbal: "Reasoning: Verbal",
    rpfconstLogical: "Reasoning: Logical",
  },
  drills: [
    { key: "history", name: "History and Culture", section: "cbt", domains: ["rpfconstHistory"], blurb: "Ancient, medieval and modern India, the freedom struggle, art, dance, festivals and monuments." },
    { key: "geography", name: "Geography", section: "cbt", domains: ["rpfconstGeography"], blurb: "Lakes, passes, dams, national parks, borders and world geography." },
    { key: "polity", name: "Polity, Economy and Railways", section: "cbt", domains: ["rpfconstPolity"], blurb: "The Constitution and Parliament, economy, sports, and the railways and their hill lines." },
    { key: "science", name: "General Science", section: "cbt", domains: ["rpfconstScience"], blurb: "Everyday physics, chemistry and biology: the body, diseases, vitamins, light, sound and materials." },
    { key: "arithmetic", name: "Arithmetic Word Problems", section: "cbt", domains: ["rpfconstArith"], blurb: "Percentages, profit and loss, discount, interest, ratio, averages, work and distance." },
    { key: "maths", name: "Numbers, Algebra and Geometry", section: "cbt", domains: ["rpfconstMaths"], blurb: "Simplification, fractions, LCM and HCF, mensuration, algebra, trigonometry, probability and data." },
    { key: "verbal", name: "Verbal Reasoning", section: "cbt", domains: ["rpfconstVerbal"], blurb: "Analogies, classification, number and letter series, coding-decoding and sign swaps." },
    { key: "logical", name: "Logical Reasoning", section: "cbt", domains: ["rpfconstLogical"], blurb: "Blood relations, directions, syllogisms, ranking, calendars, clocks and statements and conclusions." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [35, 50, 60, 70, 80],
  goalNotes: {
    35: "The qualifying minimum guides report for UR, EWS and OBC",
    50: "Above the qualifying minimum",
    60: "A solid score",
    70: "Competitive for PET shortlisting",
    80: "A strong, safe score",
  },
  testLength: "1 hr 15 min",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the RPF Constable CBT.",
    ],
    sourceLine: "Original practice questions on the RPF Constable CBT syllabus (CEN RPF 02/2024). Not affiliated with or endorsed by the Railway Protection Force, the Railway Recruitment Boards or Indian Railways.",
    scoreNote: "Percent correct, with no negative marking. The real RPF Constable CBT has 120 questions in 90 minutes; these mock tests have 100 in 75 minutes, the same pace and subject balance. The real exam deducts 1/3 mark for each wrong answer, so a blind guess among four options gains nothing on average, while ruling out even one option makes a guess worth taking. Guides report qualifying minimums of 35% for UR, EWS and OBC and 30% for SC and ST, but candidates are called to the PET and PMT by normalised marks against cut-offs that are usually much higher.",
  },
};
