import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// UP Police Constable written examination (Uttar Pradesh Police Recruitment and
// Promotion Board, UPPRPB), as held for the 2023 recruitment (exam August 2024)
// and the 2025 recruitment, Advt. 07/2025 for 32,679 posts of Constable Civil
// Police and equivalent (notified 31 December 2025, written exam 8 to 10 June
// 2026, offline). Pattern, per the board's notices as summarised by exam guides
// (checked 2026-10-31): 150 objective questions, 300 marks (2 each), 2 hours,
// four subjects: General Knowledge 38, General Hindi 37, Numerical and Mental
// Ability 38, Mental Aptitude, IQ and Reasoning 37. Negative marking is not
// confirmed from the board's notice: guides variously report 0.5 mark off per
// wrong answer, 0.25, or none (checked 2026-11-01), so the copy says "check
// your notice" and the app scores percent correct. Modelled at two thirds length and the real
// pace (0.8 minute a question): 100 questions in 80 minutes, 25 per subject,
// grouped in the paper's order. General Hindi items are written in Hindi, as on
// the real paper, with English explanations. GK is static facts only (India,
// Uttar Pradesh, police and law basics), no current affairs, no office-holders.
// Sources: tools/next100/uppolice/sources.md.
const minutes = (n: number) => n * 60;

export const UPPOLICE: ExamV2Config = {
  id: "uppolice",
  slug: "/up-police-constable",
  landingPath: "/up-police-constable-practice-test",
  name: "UP Police Constable Practice Test",
  shortName: "UP Police",
  fullName: "UP Police Constable Written Exam (UPPRPB)",
  tagline: "UP Police Constable mock tests on the written exam pattern: General Knowledge, General Hindi, Numerical Ability and Reasoning.",
  icon: "siren",
  theme: { brand: "239 45% 30%", brandDark: "239 45% 22%", brandLight: "239 45% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "paper",
      name: "Written Exam",
      shortName: "Written",
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(80) }],
      directions: "100 questions in 80 minutes, the real exam's pace of 0.8 minute a question, grouped by subject: General Knowledge (1 to 25), General Hindi (26 to 50), Numerical and Mental Ability (51 to 75), then Mental Aptitude and Reasoning (76 to 100). The real paper has 150 questions in 2 hours. You can move between questions and flag them. Guides disagree on whether the real exam takes marks off for wrong answers (0.5 or 0.25 mark, or none), so check your notification; this practice test scores percent correct, so note how many you would have guessed.",
      scale: percentScale(100),
      domains: ["uppIndia", "uppState", "uppHindiShabd", "uppHindiVyakaran", "uppArith", "uppNumber", "uppVerbal", "uppLogical"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    uppIndia: "General Knowledge: India",
    uppState: "General Knowledge: Uttar Pradesh, Police and Law",
    uppHindiShabd: "General Hindi: Shabd Gyan (vocabulary, idioms)",
    uppHindiVyakaran: "General Hindi: Vyakaran and Sahitya (grammar, literature)",
    uppArith: "Numerical Ability: Arithmetic",
    uppNumber: "Numerical Ability: Numbers and Mensuration",
    uppVerbal: "Reasoning: Verbal and Series",
    uppLogical: "Reasoning: Logical",
  },
  drills: [
    { key: "india", name: "India GK", section: "paper", domains: ["uppIndia"], blurb: "History, the freedom struggle, geography, the Constitution, economy and general science." },
    { key: "state", name: "Uttar Pradesh, Police and Law", section: "paper", domains: ["uppState"], blurb: "UP's history, rivers, crafts and symbols, plus policing, rights and the new criminal laws." },
    { key: "shabd", name: "Hindi: Shabd Gyan", section: "paper", domains: ["uppHindiShabd"], blurb: "पर्यायवाची, विलोम, एक शब्द, तत्सम-तद्भव, मुहावरे, लोकोक्तियाँ और शुद्ध वर्तनी." },
    { key: "vyakaran", name: "Hindi: Vyakaran", section: "paper", domains: ["uppHindiVyakaran"], blurb: "संधि, समास, लिंग, वचन, कारक, उपसर्ग, प्रत्यय, अलंकार, रस और लेखक." },
    { key: "arithmetic", name: "Arithmetic", section: "paper", domains: ["uppArith"], blurb: "Percentages, profit and discount, interest, averages, ratio, work, speed, ages and mixtures." },
    { key: "numbers", name: "Numbers and Mensuration", section: "paper", domains: ["uppNumber"], blurb: "LCM and HCF, divisibility, simplification, fractions, algebra basics, areas and volumes." },
    { key: "verbal", name: "Verbal Reasoning", section: "paper", domains: ["uppVerbal"], blurb: "Analogies, odd one out, number and letter series, coding-decoding and alphabet tests." },
    { key: "logical", name: "Logical Reasoning", section: "paper", domains: ["uppLogical"], blurb: "Blood relations, directions, ranking, syllogisms, calendar, clock and arrangements." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "A starting target",
    60: "A solid score",
    70: "A competitive score",
    80: "A strong, safe score",
    90: "An excellent score",
  },
  testLength: "1 hr 20 min",
  copy: {
    heroSubs: [
      "Drill each subject, then take a full mock test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. You are ready for the written exam.",
    ],
    sourceLine: "Original practice questions on the UP Police Constable written exam syllabus (UPPRPB constable recruitment, Advt. 07/2025). Not affiliated with or endorsed by the Uttar Pradesh Police Recruitment and Promotion Board or Uttar Pradesh Police.",
    scoreNote: "Percent correct, with no negative marking. The real written exam has 150 questions worth 2 marks each in 2 hours; these mock tests have 100 at the same pace. Guides disagree on negative marking for the latest recruitment: most report 0.5 mark off for each wrong answer, some 0.25, some none. Even at 0.5 off against 2 marks for a right one, a blind guess among four options still gains a little on average (+0.125 mark), and ruling out one option makes it clearly worth taking. Check the rule in your own notification. Shortlisting for document verification and the physical tests goes by written exam marks, so aim well above any minimum.",
  },
};
