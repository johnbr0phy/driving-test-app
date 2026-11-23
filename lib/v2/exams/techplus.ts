import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Tech+ (exam FC0-U71, V6), which replaced CompTIA IT Fundamentals+
// (ITF+, FC0-U61, retired July 31, 2025 in English). Built to the FC0-U71
// exam objectives, document version 4.0: IT Concepts and Terminology 13%,
// Infrastructure 24%, Applications and Software 18%, Software Development
// Concepts 13%, Data and Database Fundamentals 13%, Security 19%. CompTIA
// gives a maximum of 70 multiple-choice questions in 60 minutes and a passing
// score of 650 on a scale of 900. Each practice test is 70 questions in
// 60 minutes with free navigation. Per test: concepts 9; hardware and storage
// 9, networking and cloud 8 (17); operating systems 6, software, browsers and
// AI 7 (13); software development 9; data and databases 9; security concepts
// and device safety 7, passwords, encryption and Wi-Fi security 6 (13).
// Sources: tools/next100/techplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "tpConcepts",
  "tpHardware", "tpNetwork",
  "tpOs", "tpSoftware",
  "tpDev",
  "tpData",
  "tpSecurity", "tpProtect",
];

export const TECHPLUS: ExamV2Config = {
  id: "techplus",
  slug: "/comptia-tech-plus",
  landingPath: "/comptia-tech-plus-practice-test",
  name: "CompTIA Tech+ Practice Test",
  shortName: "Tech+",
  fullName: "CompTIA Tech+ (FC0-U71) exam",
  tagline: "70 questions in 60 minutes on computing basics, hardware, networking, software, programming, databases and security, weighted to the Tech+ FC0-U71 objectives.",
  icon: "cpu",
  theme: { brand: "350 60% 14%", brandDark: "350 60% 10%", brandLight: "350 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "techplus",
      name: "CompTIA Tech+",
      shortName: "Tech+",
      modules: [{ module: 1, questionCount: 70, timeLimit: minutes(60) }],
      directions: "70 questions across the six Tech+ domains in 60 minutes. Flag questions and come back to them.",
      scale: percentScale(70),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    tpConcepts: "IT Concepts and Terminology",
    tpHardware: "Components, Storage and Peripherals",
    tpNetwork: "Networking, Internet and Cloud",
    tpOs: "Operating Systems",
    tpSoftware: "Software, Browsers and AI",
    tpDev: "Software Development Concepts",
    tpData: "Data and Database Fundamentals",
    tpSecurity: "Security Concepts and Safe Devices",
    tpProtect: "Passwords, Encryption and Wi-Fi Security",
  },
  drills: [
    { key: "concepts", name: "IT Concepts", section: "techplus", domains: ["tpConcepts"], blurb: "Input, processing, output and storage, binary, hex and octal, storage and speed units, the troubleshooting steps and common devices." },
    { key: "hardware", name: "Hardware and Storage", section: "techplus", domains: ["tpHardware"], blurb: "Motherboard, CPU, GPU, RAM and firmware, volatile and non-volatile storage, peripherals, drivers and ports such as USB-C, HDMI and RJ45." },
    { key: "network", name: "Networking and Cloud", section: "techplus", domains: ["tpNetwork"], blurb: "Hypervisors, IaaS, PaaS and SaaS, fiber, cable, DSL, satellite and cellular, IP and MAC addresses, routers, switches and Wi-Fi bands." },
    { key: "os", name: "Operating Systems", section: "techplus", domains: ["tpOs"], blurb: "File systems, extensions and permissions, drivers, services and processes, the command line and GUI, and what an OS manages." },
    { key: "software", name: "Software, Browsers and AI", section: "techplus", domains: ["tpSoftware"], blurb: "Productivity and collaboration software, private browsing, cache, extensions and sync, and everyday uses of AI." },
    { key: "dev", name: "Software Development", section: "techplus", domains: ["tpDev"], blurb: "Compiled, interpreted, markup and query languages, data types, variables, arrays, functions, objects, pseudocode and flowcharts." },
    { key: "data", name: "Data and Databases", section: "techplus", domains: ["tpData"], blurb: "The value of data, records and fields, primary and foreign keys, relational and non-relational databases, and backups." },
    { key: "security", name: "Security Concepts", section: "techplus", domains: ["tpSecurity"], blurb: "Confidentiality, integrity and availability, authentication and authorization, privacy, phishing, licensing and safe software sources." },
    { key: "protect", name: "Passwords, Encryption and Wi-Fi", section: "techplus", domains: ["tpProtect"], blurb: "Password length, reuse and managers, data at rest and in transit, HTTPS and VPNs, and securing a home Wi-Fi network." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 650",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the CompTIA Tech+ FC0-U71 exam objectives. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA sets the passing score at 650 on a scale of 900, a scaled score that is not a fixed percent; aim for 80 percent here.",
  },
};
