import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISACA CRISC (Certified in Risk and Information Systems Control) on the exam
// content outline in force from 3 November 2025 (ISACA press release, 7 April
// 2025): Governance 26%, IT Risk Assessment 22%, Risk Response and Reporting
// 32%, Technology and Security 20%. ISACA's 2026 Exam Candidate Guide: 150
// multiple-choice questions, four options and one best answer, in 4 hours, no
// penalty for wrong answers, scaled 200 to 800 with 450 to pass. A practice
// test here is 75 questions in 120 minutes, half the real length at the real
// pace, with free navigation. Per test: organizational governance 10, risk
// governance 10 (20); risk identification 8, risk analysis 8 (16); risk
// response 8, control design 8, monitoring and reporting 8 (24); technology 9,
// information security 6 (15). Sources: tools/next100/crisc/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "criscOrgGov", "criscRiskGov",
  "criscRiskId", "criscRiskAnalysis",
  "criscRiskResponse", "criscControls", "criscMonitoring",
  "criscTech", "criscInfoSec",
];

export const CRISC: ExamV2Config = {
  id: "crisc",
  slug: "/crisc",
  landingPath: "/crisc-practice-test",
  name: "CRISC Practice Test",
  shortName: "CRISC",
  fullName: "ISACA CRISC (Certified in Risk and Information Systems Control) exam",
  tagline: "75 risk practitioner questions in 2 hours on governance, IT risk assessment, risk response and reporting, and technology and security, weighted to the CRISC job practice.",
  icon: "shield",
  theme: { brand: "8 35% 14%", brandDark: "8 35% 10%", brandLight: "8 35% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "crisc",
      name: "CRISC",
      shortName: "CRISC",
      modules: [{ module: 1, questionCount: 75, timeLimit: minutes(120) }],
      directions: "75 questions across the four CRISC domains in 120 minutes, the real exam's pace. Flag questions and come back to them. Think like a risk practitioner: pick the BEST, MOST or FIRST answer for the enterprise's objectives, and remember the business owns the risk.",
      scale: percentScale(75),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    criscOrgGov: "Organizational Governance",
    criscRiskGov: "Risk Governance",
    criscRiskId: "Risk Identification",
    criscRiskAnalysis: "Risk Analysis",
    criscRiskResponse: "Risk Response",
    criscControls: "Control Design and Implementation",
    criscMonitoring: "Risk Monitoring and Reporting",
    criscTech: "Technology and Security",
    criscInfoSec: "Information Security Principles",
  },
  drills: [
    { key: "orggov", name: "Organizational Governance", section: "crisc", domains: ["criscOrgGov"], blurb: "Strategy and objectives, roles and accountability, culture and ethics, policies, continuity planning and asset ownership." },
    { key: "riskgov", name: "Risk Governance", section: "crisc", domains: ["criscRiskGov"], blurb: "ERM, the three lines, risk profile, appetite, tolerance and capacity, frameworks, and legal and contractual duties." },
    { key: "riskid", name: "Risk Identification", section: "crisc", domains: ["criscRiskId"], blurb: "Risk events, threat modeling, the threat landscape, vulnerability management and building risk scenarios." },
    { key: "riskanalysis", name: "Risk Analysis", section: "crisc", domains: ["criscRiskAnalysis"], blurb: "SLE and ALE, qualitative and quantitative methods, BIA, the risk register, and inherent versus residual risk." },
    { key: "riskresponse", name: "Risk Response", section: "crisc", domains: ["criscRiskResponse"], blurb: "Accept, avoid, transfer or mitigate, risk and control owners, vendor and fourth-party risk, exceptions and findings." },
    { key: "controls", name: "Control Design", section: "crisc", domains: ["criscControls"], blurb: "Control types, design and selection, implementation, maturity, and testing by inquiry, observation, inspection and reperformance." },
    { key: "monitoring", name: "Monitoring and Reporting", section: "crisc", domains: ["criscMonitoring"], blurb: "KRIs, KCIs and KPIs, action plans, data validation and aggregation, dashboards, heat maps and emerging risk." },
    { key: "technology", name: "Technology", section: "crisc", domains: ["criscTech"], blurb: "Operations and change management, SDLC, data lifecycle, enterprise architecture, projects, resilience and emerging technology." },
    { key: "infosec", name: "Security and Privacy", section: "crisc", domains: ["criscInfoSec"], blurb: "Security concepts and frameworks, risk awareness, and privacy principles such as data minimization and purpose limitation." },
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
    sourceLine: "Weighted to the ISACA CRISC exam content outline in force from November 2025. Not affiliated with ISACA.",
    scoreNote: "Percent correct. ISACA reports a scaled score from 200 to 800 with 450 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
