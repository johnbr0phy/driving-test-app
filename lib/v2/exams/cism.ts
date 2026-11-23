import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISACA CISM (Certified Information Security Manager) on the exam content
// outline in force from 3 November 2026 (ISACA press release, 10 September
// 2026): Information Security Governance 18%, Information Security Risk
// Management 20%, Information Security Program 33%, Incident Management 29%
// (the 2022 outline was 17/20/33/30). ISACA's 2026 Exam Candidate Guide: 150
// multiple-choice questions, four options and one best answer, in 4 hours,
// no penalty for wrong answers, scaled 200 to 800 with 450 to pass. A
// practice test here is 75 questions in 120 minutes, half the real length at
// the real pace, with free navigation. Per test: enterprise governance 6,
// strategy 7 (13); risk assessment 8, risk response 7 (15); program
// development 13, program management 12 (25); incident readiness 11,
// incident operations 11 (22). Sources: tools/next100/cism/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "cismGov", "cismStrategy",
  "cismRiskAssess", "cismRiskResponse",
  "cismProgDev", "cismProgMgmt",
  "cismIrReady", "cismIrOps",
];

export const CISM: ExamV2Config = {
  id: "cism",
  slug: "/cism",
  landingPath: "/cism-practice-test",
  name: "CISM Practice Test",
  shortName: "CISM",
  fullName: "ISACA CISM (Certified Information Security Manager) exam",
  tagline: "75 manager-level questions in 2 hours on security governance, risk management, the security program and incident management, weighted to the CISM job practice.",
  icon: "shield",
  theme: { brand: "274 70% 14%", brandDark: "274 70% 10%", brandLight: "274 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cism",
      name: "CISM",
      shortName: "CISM",
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(120) }],
      directions: "75 questions across the four CISM domains in 120 minutes, the real exam's pace. Flag questions and come back to them. Think like a security manager: pick the BEST, MOST or FIRST answer for the enterprise, not the most technical fix.",
      scale: percentScale(75),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cismGov: "Enterprise Governance",
    cismStrategy: "Information Security Strategy",
    cismRiskAssess: "Risk Identification and Assessment",
    cismRiskResponse: "Risk Response",
    cismProgDev: "Program Development",
    cismProgMgmt: "Program Management",
    cismIrReady: "Incident Management Readiness",
    cismIrOps: "Incident Management Operations",
  },
  drills: [
    { key: "governance", name: "Enterprise Governance", section: "cism", domains: ["cismGov"], blurb: "Accountability, reporting lines, culture, legal and contractual duties, and roles such as RACI and segregation of duties." },
    { key: "strategy", name: "Security Strategy", section: "cism", domains: ["cismStrategy"], blurb: "Gap analysis, business cases, enterprise architecture, ISO/IEC 27001, COBIT, NIST CSF 2.0, budgets and resources." },
    { key: "riskassess", name: "Risk Assessment", section: "cism", domains: ["cismRiskAssess"], blurb: "Assets, threats and vulnerabilities, ALE and SLE, qualitative analysis, control deficiencies and emerging risk." },
    { key: "riskresponse", name: "Risk Response", section: "cism", domains: ["cismRiskResponse"], blurb: "Avoid, mitigate, transfer or accept, risk and control owners, KRIs, exceptions and reporting risk to leaders." },
    { key: "programdev", name: "Program Development", section: "cism", domains: ["cismProgDev"], blurb: "Policies, standards and procedures, classification, control types and selection, architecture and metrics." },
    { key: "programmgmt", name: "Program Management", section: "cism", domains: ["cismProgMgmt"], blurb: "Control rollout and testing, awareness training, suppliers and fourth parties, assurance reports and reporting." },
    { key: "irready", name: "Incident Readiness", section: "cism", domains: ["cismIrReady"], blurb: "The response plan, BIA, RTO, RPO and MTD, continuity and recovery sites, severity levels and plan testing." },
    { key: "irops", name: "Incident Operations", section: "cism", domains: ["cismIrOps"], blurb: "Triage, containment, evidence and chain of custody, escalation and notification, eradication, recovery and lessons learned." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "A starting goal",
    75: "A solid goal",
    80: "Our suggested goal",
    85: "A strong goal",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the ISACA CISM exam content outline in force from November 2026. Not affiliated with ISACA.",
    scoreNote: "Percent correct. ISACA reports a scaled score from 200 to 800 with 450 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
