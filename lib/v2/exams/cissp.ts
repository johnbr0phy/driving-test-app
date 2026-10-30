import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISC2 CISSP on the exam outline effective April 15, 2024 (still the current
// outline in October 2026; ISC2 has announced a new outline effective April 15,
// 2027). The real exam, in every language, is computerized adaptive
// (CAT): 100 to 150 items in 3 hours, answered in order with no going back,
// scaled 0 to 1000 with 700 to pass, multiple choice plus advanced innovative
// items (drag and drop, hotspot). Domains: Security and Risk Management 16%,
// Asset Security 10%, Security Architecture and Engineering 13%,
// Communication and Network Security 13%, Identity and Access Management 13%,
// Security Assessment and Testing 12%, Security Operations 13%, Software
// Development Security 10%. A practice test here is a linear 100-item mock
// (the CAT minimum) in 120 minutes, the real pace of 150 items in 3 hours,
// with no going back, weighted 16/10/13/13/13/12/13/10. It is not adaptive.
// Drag and drop is modelled as order and matrix items; hotspots are not
// modelled. Sources: tools/cissp/sources.md.
const minutes = (n: number) => n * 60;

export const CISSP: ExamV2Config = {
  id: "cissp",
  slug: "/cissp",
  landingPath: "/cissp-practice-test",
  name: "CISSP Practice Test",
  shortName: "CISSP",
  fullName: "ISC2 CISSP (Certified Information Systems Security Professional) exam",
  tagline: "100 manager-level questions in 2 hours, in order with no going back, across all eight CISSP domains.",
  icon: "shield",
  theme: { brand: "220 40% 43%", brandDark: "220 40% 34%", brandLight: "220 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cissp",
      name: "CISSP",
      shortName: "CISSP",
      linear: true,
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions across the eight CISSP domains in 120 minutes. Like the real adaptive exam, you answer in order and cannot go back. Think like a security manager: pick the BEST or FIRST action for the business, not the most technical fix. Ordering and matching items stand in for drag and drop.",
      scale: percentScale(100),
      domains: ["cisspRisk", "cisspAsset", "cisspArch", "cisspNetwork", "cisspIam", "cisspAssess", "cisspOps", "cisspSoftware"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cisspRisk: "Security and Risk Management",
    cisspAsset: "Asset Security",
    cisspArch: "Security Architecture and Engineering",
    cisspNetwork: "Communication and Network Security",
    cisspIam: "Identity and Access Management",
    cisspAssess: "Security Assessment and Testing",
    cisspOps: "Security Operations",
    cisspSoftware: "Software Development Security",
  },
  drills: [
    { key: "risk", name: "Security and Risk Management", section: "cissp", domains: ["cisspRisk"], blurb: "Ethics, governance, risk math, continuity planning, law, privacy and threat modeling." },
    { key: "asset", name: "Asset Security", section: "cissp", domains: ["cisspAsset"], blurb: "Classification, data roles, data states, retention and media sanitization." },
    { key: "architecture", name: "Architecture and Engineering", section: "cissp", domains: ["cisspArch"], blurb: "Security models, design principles, cryptography, PKI, cloud and facility design." },
    { key: "network", name: "Network Security", section: "cissp", domains: ["cisspNetwork"], blurb: "OSI and TCP/IP, IPsec and TLS, segmentation, wireless, DNS and email security." },
    { key: "iam", name: "Identity and Access", section: "cissp", domains: ["cisspIam"], blurb: "Factors and biometrics, access models, federation, Kerberos and the identity lifecycle." },
    { key: "assessment", name: "Assessment and Testing", section: "cissp", domains: ["cisspAssess"], blurb: "Pen tests, scanning, code testing, SOC reports, audits and metrics." },
    { key: "operations", name: "Security Operations", section: "cissp", domains: ["cisspOps"], blurb: "Investigations, incident response, change and patch management, backups and recovery sites." },
    { key: "software", name: "Software Development", section: "cissp", domains: ["cisspSoftware"], blurb: "Secure SDLC, DevSecOps, common code flaws, database security and acquired software." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Borderline: keep drilling",
    75: "Close to the passing line",
    80: "A safe margin over 700",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your CISSP exam.",
    ],
    sourceLine: "Weighted to the ISC2 CISSP exam outline effective April 15, 2024. A linear 100-question mock, not adaptive. Not affiliated with ISC2.",
    scoreNote: "Percent correct. The real CISSP is adaptive and reports a scaled score from 0 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
