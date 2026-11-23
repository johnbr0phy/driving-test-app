import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Cloud+ (exam CV0-004, V4, launched September 24, 2024). Built to the
// CV0-004 exam objectives (document version 5.0): Cloud Architecture 23%,
// Deployment 19%, Operations 17%, Security 19%, DevOps Fundamentals 10%,
// Troubleshooting 12%. CompTIA gives a maximum of 90 multiple-choice and
// performance-based questions in 90 minutes and a passing score of 750 on a
// scale of 100 to 900. Each practice test is 90 questions in 90 minutes with
// free navigation. Per test: service models, availability and networking 11,
// storage, containers, virtualization, cost and design 10 (21); deployment
// models, strategies and migration 9, code and provisioning 8 (17);
// observability and scaling 8, backup and life cycle 7 (15); vulnerability,
// compliance and identity 9, security practices, controls and attacks 8 (17);
// DevOps 9; troubleshooting 11. Performance-based items are modelled as
// matching, ordering, choose-two and typed-number questions. A draft CV0-005
// (V5) is published with no launch date (lib/examFreshness.json).
// Sources: tools/next100/cloudplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "cpModels", "cpDesign",
  "cpDeploy", "cpCode",
  "cpObserve", "cpBackup",
  "cpIdentity", "cpSecOps",
  "cpDevops",
  "cpTrouble",
];

export const CLOUDPLUS: ExamV2Config = {
  id: "cloudplus",
  slug: "/comptia-cloud-plus",
  landingPath: "/comptia-cloud-plus-practice-test",
  name: "CompTIA Cloud+ Practice Test",
  shortName: "Cloud+",
  fullName: "CompTIA Cloud+ (CV0-004) exam",
  tagline: "90 questions in 90 minutes on cloud architecture, deployment, operations, security, DevOps and troubleshooting, weighted to the Cloud+ CV0-004 objectives.",
  icon: "cloud",
  theme: { brand: "262 40% 46%", brandDark: "262 40% 36%", brandLight: "262 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "cloudplus",
      name: "CompTIA Cloud+",
      shortName: "Cloud+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the six Cloud+ domains in 90 minutes. Flag questions and come back to them.",
      calculator: true,
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cpModels: "Service Models, Availability and Networking",
    cpDesign: "Storage, Containers, Virtualization and Cost",
    cpDeploy: "Deployment Models, Strategies and Migration",
    cpCode: "Infrastructure as Code and Provisioning",
    cpObserve: "Observability and Scaling",
    cpBackup: "Backup, Recovery and Life Cycle",
    cpIdentity: "Vulnerabilities, Compliance and Identity",
    cpSecOps: "Security Practices, Controls and Attacks",
    cpDevops: "DevOps Fundamentals",
    cpTrouble: "Troubleshooting",
  },
  drills: [
    { key: "architecture", name: "Service Models and Networking", section: "cloudplus", domains: ["cpModels"], blurb: "IaaS, PaaS, SaaS and FaaS, shared responsibility, regions and zones, RTO, RPO and recovery sites, load balancers, peering and routing." },
    { key: "design", name: "Storage, Containers and Cost", section: "cloudplus", domains: ["cpDesign"], blurb: "Storage tiers and types, cloud-native design, containers, virtualization, billing models, databases, IOPS and AI and IoT services." },
    { key: "deployment", name: "Deployment and Migration", section: "cloudplus", domains: ["cpDeploy"], blurb: "Public, private, hybrid and community clouds, blue-green, canary, rolling and in-place releases, and the migration strategies." },
    { key: "code", name: "Infrastructure as Code", section: "cloudplus", domains: ["cpCode"], blurb: "IaC and configuration as code, JSON and YAML, scripting logic, drift detection, versioning and provisioning to requirements." },
    { key: "observability", name: "Observability and Scaling", section: "cloudplus", domains: ["cpObserve"], blurb: "Logs, metrics and traces, alert triage, and scheduled, triggered, manual, horizontal and vertical scaling." },
    { key: "backup", name: "Backup and Life Cycle", section: "cloudplus", domains: ["cpBackup"], blurb: "Full, incremental and differential backups, restore chains, off-site copies, recovery types, patching and end of support." },
    { key: "identity", name: "Compliance and Identity", section: "cloudplus", domains: ["cpIdentity"], blurb: "Vulnerability management, CVEs, data sovereignty and retention, SOC 2, PCI DSS and ISO 27001, SAML, OpenID Connect, OAuth and RBAC." },
    { key: "security", name: "Security Controls and Attacks", section: "cloudplus", domains: ["cpSecOps"], blurb: "Zero Trust, secrets, hardening, encryption, WAF, IDS and IPS, security groups, cryptojacking, metadata attacks and zombie instances." },
    { key: "devops", name: "DevOps Fundamentals", section: "cloudplus", domains: ["cpDevops"], blurb: "Git branches and pull requests, CI/CD pipelines and artifacts, REST, SOAP, GraphQL and WebSockets, and the DevOps tools." },
    { key: "troubleshooting", name: "Troubleshooting", section: "cloudplus", domains: ["cpTrouble"], blurb: "Quotas and throttling, sizing and permissions, DNS, DHCP, NTP, NAT and routing, HTTP status codes, VLANs and security issues." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 750",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the CompTIA Cloud+ CV0-004 exam objectives. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA sets the passing score at 750 on a scale of 100 to 900, a scaled score that is not a fixed percent; aim for 80 percent here. Performance-based questions are modelled as matching, ordering, choose-two and typed-number items.",
  },
};
