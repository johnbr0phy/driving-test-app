import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// ISC2 Certified in Cybersecurity (CC), the entry-level ISC2 certification,
// on the CC Certification Exam Outline effective September 1, 2026: Security
// Principles 24%, Security Governance 17.3%, Identity and Access Management
// (IAM) Concepts 20%, Networking and Cloud Security Concepts 21.3%, Security
// Operations and Incident Response 17.3%. The real exam is computerized
// adaptive (CAT): 100 to 125 items in 2 hours, multiple choice plus advanced
// item types, scaled 0 to 1000 with 700 to pass, at Pearson VUE. A practice
// test here is a linear 100-item mock (the CAT minimum) in 100 minutes, about
// the real pace, answered in order with no going back. It is not adaptive.
// Per test: concepts and controls 12, risk, governance and ethics 12 (Domain 1,
// 24); governance, continuity and awareness 17 (Domain 2); IAM 20 (Domain 3);
// network security 12, architecture and cloud 10 (Domain 4, 22); data
// security 7, operations, IR and testing 10 (Domain 5, 17). Ordering and
// matching items stand in for the advanced item types.
// Sources: tools/next100/isc2cc/sources.md.
const minutes = (n: number) => n * 60;

export const ISC2CC: ExamV2Config = {
  id: "isc2cc",
  slug: "/isc2-cc",
  landingPath: "/isc2-cc-practice-test",
  name: "ISC2 Certified in Cybersecurity (CC) Practice Test",
  shortName: "ISC2 CC",
  fullName: "ISC2 Certified in Cybersecurity (CC) exam",
  tagline: "100 entry-level cybersecurity questions in order with no going back, weighted to the five ISC2 CC domains.",
  icon: "shield",
  theme: { brand: "203 85% 16%", brandDark: "203 85% 11%", brandLight: "203 85% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cc",
      name: "Certified in Cybersecurity",
      shortName: "CC",
      linear: true,
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(100) }],
      directions: "100 questions across the five CC domains in 100 minutes. Like the real adaptive exam, you answer in order and cannot go back. Ordering and matching items stand in for the advanced item types.",
      scale: percentScale(100),
      domains: ["ccConcepts", "ccRisk", "ccGovern", "ccIam", "ccNetwork", "ccArchCloud", "ccData", "ccOps"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ccConcepts: "Security Concepts and Controls",
    ccRisk: "Risk, Governance and Ethics",
    ccGovern: "Security Governance",
    ccIam: "Identity and Access Management",
    ccNetwork: "Network Security",
    ccArchCloud: "Network Architecture and Cloud",
    ccData: "Data Security",
    ccOps: "Security Operations and Incident Response",
  },
  drills: [
    { key: "concepts", name: "Concepts and Controls", section: "cc", domains: ["ccConcepts"], blurb: "Confidentiality, integrity and availability, AAA, non-repudiation, privacy, and technical, administrative and physical controls." },
    { key: "risk", name: "Risk and Ethics", section: "cc", domains: ["ccRisk"], blurb: "Risk terms and treatments, appetite and tolerance, policies, standards and procedures, NIST CSF 2.0, due care and the ISC2 Code of Ethics." },
    { key: "governance", name: "Security Governance", section: "cc", domains: ["ccGovern"], blurb: "GRC, business continuity and disaster recovery, backups and recovery sites, social engineering and awareness, KRIs and dashboards." },
    { key: "iam", name: "Identity and Access", section: "cc", domains: ["ccIam"], blurb: "The identity lifecycle, least privilege, separation of duties, DAC, MAC, RBAC and ABAC, SSO, federation and privileged access." },
    { key: "network", name: "Network Security", section: "cc", domains: ["ccNetwork"], blurb: "OSI and TCP/IP, IPv4 and IPv6, ports, firewalls, VPNs, Wi-Fi and Bluetooth, ICS and IoT." },
    { key: "cloud", name: "Architecture and Cloud", section: "cc", domains: ["ccArchCloud"], blurb: "Segmentation, DMZs and VLANs, defense in depth, Zero Trust, and cloud characteristics, service, deployment and shared responsibility models." },
    { key: "data", name: "Data Security", section: "cc", domains: ["ccData"], blurb: "Classification, labeling, masking, sanitization, symmetric and asymmetric encryption, hashing and post-quantum cryptography." },
    { key: "operations", name: "Operations and Response", section: "cc", domains: ["ccOps"], blurb: "Logging and triage, threat actors and intelligence, incident response, end of life and change management, and security testing." },
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
  testLength: "1 hr 40 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your CC exam.",
    ],
    sourceLine: "Weighted to the ISC2 CC exam outline effective September 1, 2026. A linear 100-question mock, not adaptive. Not affiliated with ISC2.",
    scoreNote: "Percent correct. The real CC exam is adaptive and reports a scaled score from 0 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
