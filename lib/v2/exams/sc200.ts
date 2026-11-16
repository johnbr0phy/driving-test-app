import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Exam SC-200: Microsoft Security Operations Analyst, for the
// Microsoft Certified: Security Operations Analyst Associate certification.
// Built to the skills measured as of October 21, 2026 (study guide on
// Microsoft Learn): Manage a security operations environment 40-45%, Respond
// to security incidents 35-40%, Perform threat hunting 20-25%. Microsoft gives
// 100 minutes, associate role-based exams typically have 40 to 60 questions,
// and 700 is the passing score. Labs and case studies are not modelled; each
// practice test is 50 single, choose-two, matching, ordering and typed-number
// items in 100 minutes with free navigation. Per test: automation 7,
// platform 4, ingestion 5, detections 5 (21); Defender XDR response 10,
// Defender for Endpoint response 5, Microsoft 365 activities 3 (18); Defender
// XDR hunting 7, Sentinel platform hunting 4 (11). One drill per skills
// measured area. Sources: tools/next100/sc200/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "sc200Automation", "sc200Platform", "sc200Ingest", "sc200Detect",
  "sc200XdrRespond", "sc200Endpoint", "sc200M365",
  "sc200HuntXdr", "sc200HuntSentinel",
];

export const SC200: ExamV2Config = {
  id: "sc200",
  slug: "/sc-200",
  landingPath: "/sc-200-practice-test",
  name: "Microsoft SC-200 Practice Test",
  shortName: "SC-200",
  fullName: "Microsoft SC-200: Security Operations Analyst exam",
  tagline: "50 questions in 100 minutes on Defender XDR, Microsoft Sentinel and KQL hunting, weighted to the SC-200 skills measured.",
  icon: "shield",
  theme: { brand: "249 45% 22%", brandDark: "249 45% 16%", brandLight: "249 45% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "sc200",
      name: "SC-200 Security Operations Analyst",
      shortName: "SC-200",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(100) }],
      directions: "50 questions across the three SC-200 skill areas in 100 minutes. Flag questions and come back to them. KQL queries, logs and settings appear in the questions; labs are not included.",
      scale: percentScale(50),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    sc200Automation: "Automation in Defender XDR and Sentinel",
    sc200Platform: "Sentinel Roles, Retention and Workbooks",
    sc200Ingest: "Ingesting Data into Sentinel",
    sc200Detect: "Custom Detections and Analytics Rules",
    sc200XdrRespond: "Responding in Defender XDR",
    sc200Endpoint: "Responding in Defender for Endpoint",
    sc200M365: "Investigating Microsoft 365 Activity",
    sc200HuntXdr: "Hunting with KQL in Defender XDR",
    sc200HuntSentinel: "Hunting on the Sentinel Platform",
  },
  drills: [
    { key: "automation", name: "Automation", section: "sc200", domains: ["sc200Automation"], blurb: "Notifications and alert tuning, Defender for Endpoint advanced features and ASR rules, automation levels and device groups, attack disruption, automation rules and playbooks." },
    { key: "platform", name: "Sentinel Platform", section: "sc200", domains: ["sc200Platform"], blurb: "Sentinel roles, Analytics, Data lake and XDR tiers and retention, workbooks and SOC optimization." },
    { key: "ingestion", name: "Data Ingestion", section: "sc200", domains: ["sc200Ingest"], blurb: "Choosing connectors, Windows Security events via AMA and WEF, Syslog and CEF via AMA, Azure activity, threat indicators and custom tables." },
    { key: "detections", name: "Detections", section: "sc200", domains: ["sc200Detect"], blurb: "Custom detection rules from Advanced Hunting, Sentinel analytics rules, MITRE ATT&CK coverage and anomalies." },
    { key: "xdr", name: "Defender XDR Response", section: "sc200", domains: ["sc200XdrRespond"], blurb: "Defender for Office 365, Identity, Cloud Apps and Cloud, Entra ID risk, Purview alerts, Security Copilot and incident management." },
    { key: "endpoint", name: "Endpoint Response", section: "sc200", domains: ["sc200Endpoint"], blurb: "Device timelines, isolation and containment, investigation packages, live response and file and entity investigation." },
    { key: "m365", name: "Microsoft 365 Activity", section: "sc200", domains: ["sc200M365"], blurb: "Purview Audit, Content search in eDiscovery and Microsoft Graph activity logs." },
    { key: "huntxdr", name: "KQL Hunting in Defender", section: "sc200", domains: ["sc200HuntXdr"], blurb: "Choosing the right table, reading and fixing KQL queries, threat analytics, hunting graphs and blast radius." },
    { key: "huntsentinel", name: "Sentinel Hunting", section: "sc200", domains: ["sc200HuntSentinel"], blurb: "Hunting queries and bookmarks, KQL jobs and summary rules on the data lake, notebooks and the Sentinel MCP server." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 700",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "1 hr 40 min",
  copy: {
    heroSubs: [
      "Drill each skill area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your SC-200 exam.",
    ],
    sourceLine: "Weighted to the SC-200 skills measured as of October 21, 2026. Labs and case studies are not modelled. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1,000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
