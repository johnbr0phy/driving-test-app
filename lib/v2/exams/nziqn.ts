import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Nursing Council of New Zealand (Te Kaunihera Tapuhi o Aotearoa)
// internationally qualified nurses' theoretical examination, registered nurse.
// Format from the IQN theoretical examination handbook, version 1.5
// (October 2026): 120 computer-based multiple-choice questions with one
// correct answer in 165 minutes, Part A Medication safety 12 in 30 minutes
// ("medication and fluid safety questions including medicine calculations",
// calculator in the software) and Part B Nursing knowledge 108 in 135
// minutes, linked to the 2025 standards of competence; answers can be
// reviewed and changed; no scheduled breaks; results Pass or Fail per part,
// no published pass mark. Modelled: Part A in full, Part B at half length at
// the real pace (54 in 68 minutes), split by Tigertest across the six pou
// (the Council publishes no weights): Māori health 5, cultural safety 5,
// communication 8, assessment 10, clinical care 12, people-centred care 7,
// leadership 7. Original questions; never the Council's sample questions.
const minutes = (n: number) => n * 60;

export const NZIQN: ExamV2Config = {
  id: "nziqn",
  slug: "/nz-iqn-exam",
  landingPath: "/nz-iqn-theoretical-examination-practice-test",
  name: "NZ IQN Theoretical Examination Practice Test",
  shortName: "NZ IQN Exam",
  fullName: "Nursing Council of New Zealand IQN theoretical examination, registered nurse",
  tagline: "Part A medication safety and Part B nursing knowledge, written for New Zealand practice and the 2025 standards of competence.",
  icon: "stethoscope",
  theme: { brand: "180 85% 27%", brandDark: "180 85% 26%", brandLight: "180 60% 95%" },
  breakSeconds: 0,
  sections: [
    {
      key: "iqnA",
      name: "Part A: Medication safety",
      shortName: "Part A",
      calculator: true,
      modules: [{ module: 1, questionCount: 12, timeLimit: minutes(30) }],
      directions: "12 medication and fluid safety questions in 30 minutes, including medicine calculations. Every question has one correct answer. Use the calculator, and flag any question to come back to.",
      scale: percentScale(12),
      domains: ["iqnMeds"],
    },
    {
      key: "iqnB",
      name: "Part B: Nursing knowledge",
      shortName: "Part B",
      modules: [{ module: 1, questionCount: 54, timeLimit: minutes(68) }],
      directions: "54 questions in 68 minutes, half the real Part B at the same pace of about 75 seconds each. Answer as a registered nurse working in Aotearoa New Zealand. Flag any question to come back to before time runs out.",
      scale: percentScale(54),
      domains: ["iqnMaori", "iqnCultural", "iqnComms", "iqnAssess", "iqnClinical", "iqnCare", "iqnLead"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    iqnMeds: "Medication safety",
    iqnMaori: "Māori health",
    iqnCultural: "Cultural safety",
    iqnComms: "Whanaungatanga and communication",
    iqnAssess: "Assessment and escalation",
    iqnClinical: "Clinical care and medicines",
    iqnCare: "Manaakitanga and people-centred care",
    iqnLead: "Rangatiratanga and leadership",
  },
  drills: [
    { key: "medsafety", name: "Part A: Medication safety", section: "iqnA", domains: ["iqnMeds"], blurb: "Tablets, liquids, injections, pump and drip rates, doses by weight, unit conversions, fluid balance and safe administration." },
    { key: "maori", name: "Māori health and cultural safety", section: "iqnB", domains: ["iqnMaori", "iqnCultural"], blurb: "Pou one and two: kawa whakaruruhau, te Tiriti, Te Whare Tapa Whā, rongoā, equity and culturally safe care." },
    { key: "comms", name: "Communication and information", section: "iqnB", domains: ["iqnComms"], blurb: "Pou three: health literacy, documentation, Rights 5 and 6, and the Health Information Privacy Code." },
    { key: "assess", name: "Assessment and escalation", section: "iqnB", domains: ["iqnAssess"], blurb: "The New Zealand Early Warning Score, oxygen targets, sepsis, heart failure, delirium and when to escalate." },
    { key: "clinical", name: "Clinical care and medicines", section: "iqnB", domains: ["iqnClinical"], blurb: "CPR, anaphylaxis, hypoglycaemia, warfarin, insulin, opioids, COPD, heart failure and safe sleep." },
    { key: "care", name: "People-centred care and consent", section: "iqnB", domains: ["iqnCare"], blurb: "Pou five: informed consent under Right 7, complaints, boundaries, assisted dying and enduring powers of attorney." },
    { key: "lead", name: "Leadership and accountability", section: "iqnB", domains: ["iqnLead"], blurb: "Pou six: the Code of Conduct, delegation, notifications under the HPCA Act, fitness to practise and speaking up." },
  ],
  composite: { name: "Practice percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 75,
  goalChoices: [65, 70, 75, 80, 85, 90],
  goalNotes: {
    65: "65% practice score target",
    70: "70% practice score target",
    75: "75% practice score target",
    80: "80% practice score target",
    85: "85% practice score target",
    90: "90% practice score target",
  },
  testLength: "1 hr 38 min",
  copy: {
    completedTitle: "Practice steps complete",
    progressNote: "Your goal tracks practice progress only. Practice percentages do not predict your Nursing Council result.",
    scoreLabel: "Practice percent correct",
    heroSubs: [
      "Drill medication safety and each pou, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Practice goal hit. Review your missed questions and rationales.",
    ],
    sourceLine: "Built on the Nursing Council's IQN examination handbook and 2025 standards of competence. Original questions, not affiliated with the Nursing Council of New Zealand or Pearson VUE.",
    scoreNote: "Percent correct across both parts. The real exam reports each part only as Pass or Fail and publishes no pass mark, and a failed part is re-sat on its own, so check your Part A score separately. Practice percentages do not predict your result.",
  },
};
