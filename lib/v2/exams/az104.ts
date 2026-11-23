import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Exam AZ-104: Microsoft Azure Administrator, for the Microsoft
// Certified: Azure Administrator Associate certification. Built to the skills
// measured as of October 26, 2023 (still the current list on the Microsoft
// Learn study guide in November 2026): Manage Azure identities and governance
// 20-25%, Implement and manage storage 15-20%, Deploy and manage Azure compute
// resources 20-25%, Implement and manage virtual networking 15-20%, Monitor and
// maintain Azure resources 10-15%. Microsoft gives 100 minutes, most of its
// exams have 40 to 60 questions, and 700 is the passing score. Labs, case
// studies, hot area and drag and drop are not modelled; each practice test is
// 50 single, choose-two, yes/no, ordering and typed-number items in 100
// minutes with free navigation. Per test: identity and access 7, governance 5
// (12); storage access 4, storage data 5 (9); deployment, containers and App
// Service 6, VMs 6 (12); virtual networks 4, network security and load
// balancing 6 (10); monitoring and backup 7. Sources:
// tools/next100/az104/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "az104Identity", "az104Governance",
  "az104StorageAccess", "az104StorageData",
  "az104Deploy", "az104Vms",
  "az104Vnet", "az104NetSecure",
  "az104Monitor",
];

export const AZ104: ExamV2Config = {
  id: "az104",
  slug: "/az-104",
  landingPath: "/az-104-practice-test",
  name: "Microsoft AZ-104 Practice Test",
  shortName: "AZ-104",
  fullName: "Microsoft AZ-104: Azure Administrator exam",
  tagline: "50 questions in 100 minutes on Entra ID, governance, storage, compute, networking and monitoring, weighted to the AZ-104 skills measured.",
  icon: "cloud",
  theme: { brand: "221 85% 14%", brandDark: "221 85% 10%", brandLight: "221 85% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "az104",
      name: "AZ-104 Azure Administrator",
      shortName: "AZ-104",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(100) }],
      directions: "50 questions across the five AZ-104 skill areas in 100 minutes. Flag questions and come back to them. Settings, routes and rules appear in the questions; labs and case studies are not included.",
      scale: percentScale(50),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    az104Identity: "Entra Users, Groups and Azure Roles",
    az104Governance: "Policy, Locks, Tags and Costs",
    az104StorageAccess: "Storage Access and Security",
    az104StorageData: "Storage Accounts, Files and Blobs",
    az104Deploy: "Templates, Containers and App Service",
    az104Vms: "Virtual Machines and Scale Sets",
    az104Vnet: "Virtual Networks, Peering and Routes",
    az104NetSecure: "NSGs, Bastion, DNS and Load Balancing",
    az104Monitor: "Azure Monitor, Backup and Site Recovery",
  },
  drills: [
    { key: "identity", name: "Users, Groups and Roles", section: "az104", domains: ["az104Identity"], blurb: "Entra users and groups, dynamic membership, licenses, guests, SSPR, built-in and custom Azure roles, scopes and inherited access." },
    { key: "governance", name: "Governance and Costs", section: "az104", domains: ["az104Governance"], blurb: "Azure Policy effects, initiatives and remediation, resource locks, tags, resource groups, subscriptions, management groups, budgets and Advisor." },
    { key: "storageaccess", name: "Storage Access", section: "az104", domains: ["az104StorageAccess"], blurb: "Storage firewalls and virtual network rules, SAS types, stored access policies, access keys and identity-based access for Azure Files." },
    { key: "storagedata", name: "Files and Blobs", section: "az104", domains: ["az104StorageData"], blurb: "Redundancy, object replication, encryption, AzCopy, access tiers, lifecycle rules, versioning, snapshots and soft delete." },
    { key: "deploy", name: "Templates and App Service", section: "az104", domains: ["az104Deploy"], blurb: "ARM templates and Bicep, Container Registry, Container Instances, Container Apps, App Service plans, slots, scaling, TLS and networking." },
    { key: "vms", name: "Virtual Machines", section: "az104", domains: ["az104Vms"], blurb: "Availability sets and zones, VM sizes and disks, Azure Disk Encryption and encryption at host, moves and Virtual Machine Scale Sets." },
    { key: "vnet", name: "Virtual Networks", section: "az104", domains: ["az104Vnet"], blurb: "Subnets and reserved addresses, peering and gateway transit, public IPs, user-defined routes and connectivity troubleshooting." },
    { key: "netsecure", name: "Network Security and Load Balancing", section: "az104", domains: ["az104NetSecure"], blurb: "NSG rules and effective rules, application security groups, Bastion, service and private endpoints, Azure DNS and load balancers." },
    { key: "monitor", name: "Monitoring and Backup", section: "az104", domains: ["az104Monitor"], blurb: "Metrics, logs and KQL, alert rules, action groups and processing rules, Insights, Network Watcher, Azure Backup and Site Recovery." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 700",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "1 hr 40 min",
  copy: {
    heroSubs: [
      "Drill each skill area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the AZ-104 skills measured as of October 26, 2023. Labs and case studies are not modelled. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1,000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
