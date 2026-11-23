import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Server+ (exam SK0-005, V5, launched May 18, 2021). Built to the SK0-005
// exam objectives, document version 7.0: Server Hardware Installation and
// Management 18%, Server Administration 30%, Security and Disaster Recovery 24%,
// Troubleshooting 28%. CompTIA gives a maximum of 90 multiple-choice and
// performance-based questions in 90 minutes and a passing score of 750 on a
// scale of 100 to 900. A beta of the next exam (SK0-006) runs to February 4,
// 2027, with launch expected in summer 2027. Each practice test is 90 questions
// in 90 minutes with free navigation. Per test: hardware and racking 8, storage
// and RAID 8 (16); OS install and network services 9, server functions,
// documentation and licensing 9, high availability, virtualization and
// scripting 9 (27); security and hardening 12, backups, decommissioning and DR
// 10 (22); hardware and storage troubleshooting 13, OS, network and security
// troubleshooting 12 (25). Performance-based items are not modelled.
// Sources: tools/next100/serverplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "spHardware", "spStorage",
  "spOsNet", "spAdmin", "spHaVirt",
  "spSecurity", "spRecovery",
  "spTroubleHw", "spTroubleSw",
];

export const SERVERPLUS: ExamV2Config = {
  id: "serverplus",
  slug: "/comptia-server-plus",
  landingPath: "/comptia-server-plus-practice-test",
  name: "CompTIA Server+ Practice Test",
  shortName: "Server+",
  fullName: "CompTIA Server+ (SK0-005) exam",
  tagline: "90 questions in 90 minutes on server hardware, RAID and storage, administration, virtualization, security, backups and troubleshooting, weighted to the Server+ SK0-005 objectives.",
  icon: "cpu",
  theme: { brand: "225 20% 14%", brandDark: "225 20% 10%", brandLight: "225 20% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "serverplus",
      name: "CompTIA Server+",
      shortName: "Server+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the four Server+ domains in 90 minutes. Flag questions and come back to them.",
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    spHardware: "Racking, Power, Cabling and Components",
    spStorage: "Storage, RAID, NAS and SAN",
    spOsNet: "OS Installation and Network Services",
    spAdmin: "Server Functions, Documentation and Licensing",
    spHaVirt: "High Availability, Virtualization and Scripting",
    spSecurity: "Security, Access and Hardening",
    spRecovery: "Backups, Decommissioning and Disaster Recovery",
    spTroubleHw: "Troubleshooting Hardware and Storage",
    spTroubleSw: "Troubleshooting OS, Network and Security",
  },
  drills: [
    { key: "hardware", name: "Server Hardware", section: "serverplus", domains: ["spHardware"], blurb: "Rack units and layout, redundant power and UPS, fiber and transceivers, chassis types, out-of-band management, crash carts and hot-swap parts." },
    { key: "storage", name: "Storage and RAID", section: "serverplus", domains: ["spStorage"], blurb: "RAID 0, 1, 5, 6 and 10 with usable capacity, JBOD, hardware vs software RAID, SSD and HDD types, SAS and SATA, NAS and SAN." },
    { key: "osnet", name: "OS Install and Networking", section: "serverplus", domains: ["spOsNet"], blurb: "Server Core, unattended and PXE installs, P2V and templates, GPT and MBR, LVM, file systems, static addressing, VLANs, DNS and ports." },
    { key: "admin", name: "Administration and Licensing", section: "serverplus", domains: ["spAdmin"], blurb: "Baselines, quotas and deduplication, IOPS and monitoring, log rotation, data migration, asset inventory, SLAs, MTTR and licensing models." },
    { key: "havirt", name: "HA, Virtualization and Scripting", section: "serverplus", domains: ["spHaVirt"], blurb: "Active-active and active-passive clusters, failover and failback, load balancing, NIC teaming, virtual networking, overprovisioning and script basics." },
    { key: "security", name: "Security and Hardening", section: "serverplus", domains: ["spSecurity"], blurb: "Encryption at rest and in transit, physical access controls, password policies, RBAC, MFA, SIEM, two-person integrity and server hardening." },
    { key: "recovery", name: "Backups and Disaster Recovery", section: "serverplus", domains: ["spRecovery"], blurb: "Full, incremental, differential and synthetic backups, rotation, restores, hot, warm and cold sites, replication, DR tests and media destruction." },
    { key: "troublehw", name: "Hardware and Storage Troubleshooting", section: "serverplus", domains: ["spTroubleHw"], blurb: "The troubleshooting method, memory and CPU faults, CMOS batteries, LEDs, heat and dust, RAID rebuilds, cache batteries, HBAs and mount tools." },
    { key: "troublesw", name: "OS, Network and Security Troubleshooting", section: "serverplus", domains: ["spTroubleSw"], blurb: "Clock skew, memory leaks, dependencies, safe mode, sudo, DNS and VLAN faults, rogue DHCP, traceroute, netstat, SELinux and file integrity." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 85,
  goalChoices: [75, 80, 85, 90, 95],
  goalNotes: {
    75: "A starting target",
    80: "A solid target",
    85: "A high target",
    90: "A strong score",
    95: "Top band",
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
    sourceLine: "Weighted to the CompTIA Server+ SK0-005 exam objectives. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA sets the passing score at 750 on a scale of 100 to 900, a scaled score that is not a fixed percent; aim for 85 percent here. Performance-based questions are not modelled.",
  },
};
