import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Security, Compliance, and Identity Fundamentals (SC-900): 45
// minutes, proctored, interactive components possible, scored 1 to 1000 with
// 700 to pass (Microsoft publishes no question count; guides say 40 to 60).
// Weighted to the Microsoft Learn study guide, skills measured as of October
// 21, 2026: concepts of security, compliance and identity 10-15%, Microsoft
// Entra 25-30%, Microsoft security solutions 35-40%, Microsoft compliance
// solutions 20-25% (6/14/19/11 of 50 per test). One drill per study-guide
// sub-area, with the smaller ones paired, so the dashboard has 8 drills and 2
// tests. Product names as of 2026 (Microsoft Entra, Defender XDR, Microsoft
// Sentinel in the Defender portal, the Microsoft Purview portal).
const minutes = (n: number) => n * 60;

export const SC900: ExamV2Config = {
  id: "sc900",
  slug: "/sc-900",
  landingPath: "/sc-900-practice-test",
  name: "SC-900 Security, Compliance, and Identity Fundamentals Practice Test",
  shortName: "SC-900",
  fullName: "Microsoft Security, Compliance, and Identity Fundamentals (SC-900) exam",
  tagline: "50 questions in 45 minutes with yes/no statement sets, matching and choose-two items, like the real SC-900.",
  icon: "shield",
  theme: { brand: "241 15% 26%", brandDark: "241 15% 18%", brandLight: "241 15% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "sc900",
      name: "Security, Compliance, and Identity Fundamentals SC-900",
      shortName: "SC-900",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions: "50 questions across the four SC-900 skill areas in 45 minutes. Some items are sets of yes/no statements or matching; multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["sc900Concepts", "sc900Identity", "sc900Access", "sc900Infra", "sc900CloudSec", "sc900Xdr", "sc900Compliance", "sc900InfoProt"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    sc900Concepts: "Security, Compliance and Identity Concepts",
    sc900Identity: "Entra ID, Identity Types and Authentication",
    sc900Access: "Entra Access, Governance and Protection",
    sc900Infra: "Azure Infrastructure Security",
    sc900CloudSec: "Defender for Cloud and Microsoft Sentinel",
    sc900Xdr: "Microsoft Defender XDR",
    sc900Compliance: "Compliance Management, eDiscovery and Audit",
    sc900InfoProt: "Information Protection and Data Lifecycle",
  },
  drills: [
    { key: "concepts", name: "Core Concepts", section: "sc900", domains: ["sc900Concepts"], blurb: "Shared responsibility, defense in depth, Zero Trust, encryption and hashing, GRC, and identity concepts such as authentication, federation and directory services." },
    { key: "identity", name: "Entra ID and Sign-in", section: "sc900", domains: ["sc900Identity"], blurb: "Microsoft Entra ID, workload and device identities, hybrid identity, authentication methods, MFA and password protection." },
    { key: "access", name: "Access and Governance", section: "sc900", domains: ["sc900Access"], blurb: "Conditional Access, Microsoft Entra roles and RBAC, ID Governance, access reviews, Privileged Identity Management and ID Protection." },
    { key: "infra", name: "Azure Infrastructure Security", section: "sc900", domains: ["sc900Infra"], blurb: "DDoS Protection, Azure Firewall, Web Application Firewall, network segmentation, NSGs, Azure Bastion and Key Vault." },
    { key: "cloudSec", name: "Defender for Cloud and Sentinel", section: "sc900", domains: ["sc900CloudSec"], blurb: "Cloud security posture management, secure score, workload protection, and Microsoft Sentinel as a SIEM and SOAR." },
    { key: "xdr", name: "Defender XDR", section: "sc900", domains: ["sc900Xdr"], blurb: "Defender for Office 365, Endpoint, Cloud Apps and Identity, Vulnerability Management, threat intelligence and the Defender portal." },
    { key: "compliance", name: "Compliance Management", section: "sc900", domains: ["sc900Compliance"], blurb: "Service Trust Portal, Microsoft's privacy commitments, Compliance Manager and compliance score, insider risk, eDiscovery and audit." },
    { key: "infoProt", name: "Information Protection", section: "sc900", domains: ["sc900InfoProt"], blurb: "Data classification, Content and Activity explorer, sensitivity labels, DLP, records management and retention." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Close to the passing line",
    75: "Passing with a little room",
    80: "A safe margin over 700",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "45 min",
  copy: {
    heroSubs: [
      "Drill each skill area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your SC-900 exam.",
    ],
    sourceLine: "Weighted to the Microsoft Learn SC-900 study guide (skills measured as of October 21, 2026). Product names as of 2026. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
