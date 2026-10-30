import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Azure Fundamentals (AZ-900): about 40 to 60 items in 45 minutes,
// multiple choice, multiple response, yes/no statement sets and matching,
// scored 1 to 1000 with 700 to pass. Weighted to the Microsoft Learn study
// guide, skills measured as of July 20, 2026: cloud concepts 25-30%, Azure
// architecture and services 35-40%, Azure management and governance 30-35%
// (14/19/17 of 50 per test). One drill per study-guide sub-area, with the
// smaller sub-areas paired, so the dashboard has 8 drills and 2 tests.
// Product names as of 2026 (Microsoft Entra ID, Defender for Cloud, Purview).
const minutes = (n: number) => n * 60;

export const AZ900: ExamV2Config = {
  id: "az900",
  slug: "/azure-fundamentals",
  landingPath: "/az-900-practice-test",
  name: "AZ-900 Azure Fundamentals Practice Test",
  shortName: "AZ-900",
  fullName: "Microsoft Azure Fundamentals (AZ-900) exam",
  tagline: "50 questions in 45 minutes with yes/no statement sets, matching and choose-two items, like the real AZ-900.",
  icon: "cloud",
  theme: { brand: "248 90% 32%", brandDark: "248 90% 22%", brandLight: "248 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "az900",
      name: "Azure Fundamentals AZ-900",
      shortName: "AZ-900",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions: "50 questions across the three AZ-900 skill areas in 45 minutes. Some items are sets of yes/no statements or matching; multiple response items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["azCloud", "azServiceTypes", "azCore", "azComputeNet", "azStorage", "azIdentity", "azCostGov", "azManage"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    azCloud: "Cloud Computing and Benefits",
    azServiceTypes: "Cloud Service Types",
    azCore: "Core Architectural Components",
    azComputeNet: "Compute and Networking",
    azStorage: "Storage Services",
    azIdentity: "Identity, Access and Security",
    azCostGov: "Cost Management and Governance",
    azManage: "Management, Deployment and Monitoring",
  },
  drills: [
    { key: "cloud", name: "Cloud Computing", section: "az900", domains: ["azCloud"], blurb: "Cloud models, shared responsibility, pricing models, serverless and the benefits of the cloud." },
    { key: "serviceTypes", name: "IaaS, PaaS and SaaS", section: "az900", domains: ["azServiceTypes"], blurb: "What each service type hands to Microsoft, and when to use which." },
    { key: "core", name: "Core Architecture", section: "az900", domains: ["azCore"], blurb: "Regions, availability zones, resource groups, subscriptions and management groups." },
    { key: "computeNet", name: "Compute and Networking", section: "az900", domains: ["azComputeNet"], blurb: "VMs, scale sets, containers, Functions, virtual networks, VPN Gateway and ExpressRoute." },
    { key: "storage", name: "Storage", section: "az900", domains: ["azStorage"], blurb: "Storage services, access tiers, redundancy, and moving and migrating data." },
    { key: "identity", name: "Identity and Security", section: "az900", domains: ["azIdentity"], blurb: "Microsoft Entra ID, MFA, Conditional Access, RBAC, Zero Trust and Defender for Cloud." },
    { key: "costGov", name: "Cost and Governance", section: "az900", domains: ["azCostGov"], blurb: "Cost factors, the pricing calculator, Cost Management, tags, Azure Policy, locks and Purview." },
    { key: "manage", name: "Management and Monitoring", section: "az900", domains: ["azManage"], blurb: "Portal, Cloud Shell, CLI, PowerShell, Arc, ARM templates, Advisor, Service Health and Azure Monitor." },
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
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your AZ-900 exam.",
    ],
    sourceLine: "Weighted to the Microsoft Learn AZ-900 study guide (skills measured as of July 20, 2026). Product names as of 2026. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
