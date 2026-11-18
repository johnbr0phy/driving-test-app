import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISC2 outline effective 2025-10-01, checked 2026-11-17.
// Exact domain weights on fixed 100-question MCQ practice; not CAT simulation.
const domains = ["sscpConcepts", "sscpAccess", "sscpRisk", "sscpIncident", "sscpCrypto", "sscpNetwork", "sscpSystems"];
export const SSCP: ExamV2Config = {
  id: "sscp", slug: "/isc2-sscp", landingPath: "/isc2-sscp-practice-test",
  name: "ISC2 SSCP Practice Test", shortName: "SSCP",
  fullName: "ISC2 Systems Security Certified Practitioner (SSCP)",
  tagline: "Operational security practice across seven domains. Fixed-length MCQs, not an adaptive exam simulation.",
  icon: "shield", theme: { brand: "214 15% 34%", brandDark: "214 15% 25%", brandLight: "214 15% 96%" },
  breakSeconds: 0,
  sections: [{ key: "sscp", name: "SSCP operational security", shortName: "SSCP",
    modules: [{ module: 1, questionCount: 100, timeLimit: 120 * 60 }],
    directions: "100 original single-answer questions in 120 minutes. You may flag and revisit questions here. The real SSCP uses computerized adaptive testing with 100-125 items, including unscored and advanced items, and does not permit revisiting finalized answers. This fixed-length MCQ practice does not reproduce those features. Practice percentages do not convert to ISC2's passing standard.",
    scale: percentScale(100), domains }],
  tests: [{ number: 1, name: "Practice Test 1" }, { number: 2, name: "Practice Test 2", heldOut: true }],
  domainLabels: {
    sscpConcepts: "Security Concepts and Practices", sscpAccess: "Access Controls",
    sscpRisk: "Risk Identification, Monitoring and Analysis", sscpIncident: "Incident Response and Recovery",
    sscpCrypto: "Cryptography", sscpNetwork: "Network and Communications Security", sscpSystems: "Systems and Application Security",
  },
  drills: [
    { key: "concepts", name: "Security Concepts and Practices", section: "sscp", domains: ["sscpConcepts"], blurb: "Ethics, security properties, control functions, assets and change management." },
    { key: "access", name: "Access Controls", section: "sscp", domains: ["sscpAccess"], blurb: "Identity lifecycle, authentication, authorization, federation and least privilege." },
    { key: "risk", name: "Risk Identification and Analysis", section: "sscp", domains: ["sscpRisk"], blurb: "Risk treatment, assessments, detection evidence and monitoring measures." },
    { key: "incident", name: "Incident Response and Recovery", section: "sscp", domains: ["sscpIncident"], blurb: "Response decisions, evidence handling, backups and recovery objectives." },
    { key: "crypto", name: "Cryptography", section: "sscp", domains: ["sscpCrypto"], blurb: "Cryptographic purposes, certificates, secure channels and key lifecycle." },
    { key: "network", name: "Network and Communications", section: "sscp", domains: ["sscpNetwork"], blurb: "Network controls, remote access, wireless, IoT and device management." },
    { key: "systems", name: "Systems and Application Security", section: "sscp", domains: ["sscpSystems"], blurb: "Endpoints, mobile devices, cloud, virtualization and application controls." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80, goalChoices: [70, 75, 80, 85, 90],
  goalNotes: { 70: "Practice target", 75: "Practice target", 80: "Practice target", 85: "Practice target", 90: "Practice target" },
  testLength: "2 hours",
  copy: {
    heroSubs: ["Seven drills and two practice tests. Start with Security Concepts and Practices.", "Work through the domain drills and explanations.", "Use Practice Test 1 to check your understanding.", "Review missed concepts before Practice Test 2.", "Practice goals complete. Continue with the official outline and practical preparation."],
    sourceLine: "Original conceptual MCQs following the seven-domain ISC2 SSCP outline effective October 2025. Fixed-length practice; CAT, advanced item types and exhaustive technology coverage are not included. Not affiliated with ISC2.",
    scoreNote: "Percentage correct for study only. ISC2 publishes a 700/1000 passing standard, not a 70% raw-score cutoff, and reports pass/fail. The 80% practice goal is editorial and does not predict certification results.",
  },
};
