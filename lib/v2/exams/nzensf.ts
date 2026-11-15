import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Nursing Council of New Zealand State Final Examination for enrolled nurses
// (graduates of the Diploma in Enrolled Nursing). Format from the Council's
// Handbook for pre-registration nursing programmes (May 2022), section 7: 90
// multiple-choice questions in 90 minutes, graded on an overall 70% (no pass
// rate per category, State Final FAQ 2024), held in March, July and November.
// The 2025 sample paper has Part A Medicine Calculations and Part B Nursing
// Knowledge, four options each. The 9 and 81 split is the IQN enrolled nurse
// examination's (IQN handbook v1.4, September 2025); the domestic split and the
// 15 plus 75 minute timing are Tigertest's. Part A here takes typed answers.
// Part B per test, Tigertest's split around the five pou of the Standards of
// competence for enrolled nurses (February 2025): Māori health and cultural
// safety 8, communication and teamwork 8, professional accountability 10,
// assessment and deterioration 11, medicines 10, infection prevention and
// health promotion 6, acute care 14, long-term conditions and older adults 8,
// mental health 4, child and maternal health 2. Enrolled nurse scope (January
// 2025): the EN initiates and monitors care, works with access to guidance
// from an RN or other registered health practitioner, and escalates change.
// Original questions; scores do not predict results.
const minutes = (n: number) => n * 60;

export const NZENSF: ExamV2Config = {
  id: "nzensf",
  slug: "/nz-en-state-final",
  landingPath: "/nz-enrolled-nurse-state-final-exam-practice-test",
  name: "NZ Enrolled Nurse State Final Practice Test",
  shortName: "EN State Final",
  fullName: "Nursing Council of New Zealand State Final Examination for enrolled nurses",
  tagline: "Part A medicine calculations and Part B nursing knowledge: 90 questions in 90 minutes, written for the enrolled nurse scope.",
  icon: "stethoscope",
  theme: { brand: "331 70% 38%", brandDark: "331 70% 28%", brandLight: "331 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "enA",
      name: "Part A: Medicine calculations",
      shortName: "Part A",
      calculator: true,
      modules: [{ module: 1, questionCount: 9, timeLimit: minutes(15) }],
      directions: "9 medicine and fluid calculations in 15 minutes. Type a single number for each answer: the question gives the unit and how to round. Use the calculator, and flag any question to come back to. On the real exam these are four-option questions.",
      scale: percentScale(9),
      domains: ["nzenCalc"],
    },
    {
      key: "enB",
      name: "Part B: Nursing knowledge",
      shortName: "Part B",
      modules: [{ module: 1, questionCount: 81, timeLimit: minutes(75) }],
      directions: "81 multiple-choice questions in 75 minutes, a little under a minute each. Choose the one best answer as an enrolled nurse working in Aotearoa New Zealand. Flag any question to come back to before time runs out.",
      scale: percentScale(81),
      domains: ["nzenTiriti", "nzenComm", "nzenProf", "nzenAssess", "nzenMeds", "nzenIpc", "nzenAcute", "nzenChronic", "nzenMental", "nzenFamily"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    nzenCalc: "Medicine calculations",
    nzenTiriti: "Māori health and cultural safety",
    nzenComm: "Communication and teamwork",
    nzenProf: "Professional accountability and the law",
    nzenAssess: "Assessment and deterioration",
    nzenMeds: "Medicines",
    nzenIpc: "Infection prevention and health promotion",
    nzenAcute: "Acute and surgical care",
    nzenChronic: "Long-term conditions and older adults",
    nzenMental: "Mental health and addiction",
    nzenFamily: "Child and maternal health",
  },
  drills: [
    { key: "calc", name: "Part A: Medicine calculations", section: "enA", domains: ["nzenCalc"], blurb: "Tablets, oral liquids, doses by weight, pump and drip rates, infusion times and fluid balance, with typed answers." },
    { key: "tiriti", name: "Māori health and cultural safety", section: "enB", domains: ["nzenTiriti"], blurb: "Te Tiriti principles, kawa whakaruruhau, tikanga in care, whānau, equity and challenging racism." },
    { key: "comm", name: "Communication and teamwork", section: "enB", domains: ["nzenComm"], blurb: "Seeking guidance from the RN, direction and coordination, ISBAR, escalation and therapeutic communication." },
    { key: "prof", name: "Professional accountability", section: "enB", domains: ["nzenProf"], blurb: "The Code of Rights, consent, practising certificates, the Code of Conduct, documentation and boundaries." },
    { key: "assess", name: "Assessment and deterioration", section: "enB", domains: ["nzenAssess"], blurb: "Vital signs, sepsis, pain, glucose, neuro observations, falls and recognising when a patient is getting worse." },
    { key: "meds", name: "Medicines and infection control", section: "enB", domains: ["nzenMeds", "nzenIpc"], blurb: "Safe administration, opioids, warfarin, insulin, allergies, hand hygiene, isolation, sharps and health promotion." },
    { key: "acute", name: "Acute and surgical care", section: "enB", domains: ["nzenAcute"], blurb: "Post-operative care, clots, oxygen, heart failure, wounds, catheters, transfusions and fractures." },
    { key: "lifespan", name: "Older adults, mental health and whānau", section: "enB", domains: ["nzenChronic", "nzenMental", "nzenFamily"], blurb: "Dementia, delirium, palliative care, suicide risk, de-escalation, safe sleep and child and maternal care." },
  ],
  composite: { name: "Practice percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "70%, the overall pass mark",
    75: "75% practice score target",
    80: "80% practice score target",
    85: "85% practice score target",
    90: "90% practice score target",
  },
  testLength: "1 hr 30 min",
  copy: {
    completedTitle: "Practice steps complete",
    progressNote: "Your goal tracks practice progress only. Practice percentages do not predict your State Final result.",
    scoreLabel: "Practice percent correct",
    heroSubs: [
      "Start with the medicine calculations drill, then work through each area.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Practice goal hit. Review your missed questions and rationales.",
    ],
    sourceLine: "Built on the Nursing Council of New Zealand's enrolled nurse scope and standards of competence. Original questions, not affiliated with the Nursing Council.",
    scoreNote: "Percent correct across both parts. The real State Final is graded on an overall percentage, with 70% to pass and no pass mark for each category. Here Part A takes typed answers, while the real Part A is multiple choice. Practice percentages do not predict your result.",
  },
};
