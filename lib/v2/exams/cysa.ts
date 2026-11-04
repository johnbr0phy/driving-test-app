import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA CySA+ CS0-004 (launched June 23, 2026; CS0-003 retires in English
// on December 22, 2026): up to 85 items in 165 minutes, multiple choice
// (some "Choose two") and performance-based items, with free navigation and
// review, 750 on a 100 to 900 scale to pass. PBQs are approximated with
// matrix and order items. Weighted to the CompTIA CySA+ CS0-004 exam
// objectives: Security Operations 34%, Vulnerability Management 26%,
// Incident Response and Management 24%, Reporting and Communication 16%.
// Each domain is split into two drills: per test 15/14, 11/11, 10/10, 7/7.
// Sources: tools/cysa/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "cysaSecArch", "cysaThreat", "cysaVulnScan", "cysaVulnPrior", "cysaIrFrame", "cysaIrHandle", "cysaVulnReport", "cysaIrReport",
];

export const CYSA: ExamV2Config = {
  id: "cysa",
  slug: "/comptia-cysa-plus",
  landingPath: "/comptia-cysa-plus-practice-test",
  name: "CompTIA CySA+ Practice Test",
  shortName: "CySA+",
  fullName: "CompTIA CySA+ (CS0-004) exam",
  tagline: "85 questions in 165 minutes, with log reading, choose-two, matching and ordering items like the real CS0-004.",
  icon: "shield",
  theme: { brand: "298 90% 28%", brandDark: "298 90% 21%", brandLight: "298 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cysa",
      name: "CySA+ CS0-004",
      shortName: "CySA+",
      modules: [{ module: 1, questionCount: 85, timeLimit: minutes(165) }],
      directions: "85 questions across the four CS0-004 domains in 165 minutes. Flag questions and come back to them. Matching and ordering items stand in for the performance-based questions.",
      scale: percentScale(85),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cysaSecArch: "Architecture, Logging and Automation",
    cysaThreat: "Malicious Activity and Threat Intelligence",
    cysaVulnScan: "Vulnerability Scanning and Tools",
    cysaVulnPrior: "Prioritizing and Fixing Vulnerabilities",
    cysaIrFrame: "Attack Frameworks and IR Preparation",
    cysaIrHandle: "Detection, Containment and Recovery",
    cysaVulnReport: "Vulnerability Reporting and Metrics",
    cysaIrReport: "Incident Reporting and Communication",
  },
  drills: [
    { key: "architecture", name: "Architecture and Automation", section: "cysa", domains: ["cysaSecArch"], blurb: "Logging and time sync, segmentation and zero trust, cloud and containers, IAM, encryption, SOAR and AI in the SOC." },
    { key: "threats", name: "Threats and Threat Hunting", section: "cysa", domains: ["cysaThreat"], blurb: "Network, host and application indicators, SIEM and EDR, packet captures, email headers, threat intelligence and hunting." },
    { key: "scanning", name: "Vulnerability Scanning", section: "cysa", domains: ["cysaVulnScan"], blurb: "Asset discovery, credentialed and agent scans, OT considerations, Nmap, Nessus, Burp and ZAP, and reading scan output." },
    { key: "prioritizing", name: "Prioritizing Vulnerabilities", section: "cysa", domains: ["cysaVulnPrior"], blurb: "CVSS, EPSS and KEV, web and app flaws and their fixes, controls, patching and risk responses." },
    { key: "frameworks", name: "Frameworks and IR Preparation", section: "cysa", domains: ["cysaIrFrame"], blurb: "Kill Chain, Diamond Model and ATT&CK, the incident response life cycle, playbooks and tabletop exercises." },
    { key: "handling", name: "Handling an Incident", section: "cysa", domains: ["cysaIrHandle"], blurb: "Evidence and chain of custody, order of volatility, containment, eradication, recovery and scoping." },
    { key: "vulnreporting", name: "Vulnerability Reporting", section: "cysa", domains: ["cysaVulnReport"], blurb: "Prioritized reports, remediation metrics and SLAs, stakeholders and the inhibitors to remediation." },
    { key: "irreporting", name: "Incident Reporting", section: "cysa", domains: ["cysaIrReport"], blurb: "Executive summaries, timelines, who to tell, lessons learned, root cause and response metrics." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 750",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "2 hr 45 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your CySA+ exam.",
    ],
    sourceLine: "Weighted to the CompTIA CySA+ CS0-004 exam objectives. Matching and ordering items approximate the performance-based questions. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA reports a scaled score from 100 to 900 with 750 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
