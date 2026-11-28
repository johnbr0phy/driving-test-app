import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA A+ is two exams, Core 1 (220-1201) and Core 2 (220-1202), each up
// to 90 items in 90 minutes with multiple choice, "Choose two" and
// performance-based items (approximated with order and matrix items). The
// practice test sits both cores with a break between, weighted to the
// objectives: Core 1 Mobile 13%, Networking 23%, Hardware 25%,
// Virtualization and Cloud 11%, Hardware and Network Troubleshooting 28%
// (12/21/22/10/25); Core 2 Operating Systems 28%, Security 28%, Software
// Troubleshooting 23%, Operational Procedures 21% (25/25/21/19).
const minutes = (n: number) => n * 60;

export const APLUS: ExamV2Config = {
  id: "aplus",
  slug: "/comptia-a-plus",
  landingPath: "/comptia-a-plus-practice-test",
  name: "CompTIA A+ Practice Test",
  shortName: "CompTIA A+",
  fullName: "CompTIA A+ (220-1201 and 220-1202) exams",
  tagline: "Core 1 and Core 2, 90 questions each in 90 minutes, with choose-two, matching and ordering items.",
  icon: "cpu",
  theme: { brand: "350 75% 44%", brandDark: "350 75% 32%", brandLight: "350 85% 95%" },
  breakSeconds: 600,
  sections: [
    {
      key: "core1",
      name: "Core 1 (220-1201)",
      shortName: "Core 1",
      breakAfter: true,
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "Core 1: mobile devices, networking, hardware, virtualization and cloud, and hardware and network troubleshooting. 90 questions in 90 minutes; flag and come back.",
      scale: percentScale(90),
      domains: ["aplusMobile", "aplusNetworking", "aplusHardware", "aplusVirtCloud", "aplusHwTroubleshooting"],
    },
    {
      key: "core2",
      name: "Core 2 (220-1202)",
      shortName: "Core 2",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "Core 2: operating systems, security, software troubleshooting and operational procedures. 90 questions in 90 minutes; flag and come back.",
      scale: percentScale(90),
      domains: ["aplusOS", "aplusSecurity", "aplusSwTroubleshooting", "aplusOperational"],
    },
  ],
  tests: [{ number: 1, name: "Core 1 and Core 2" }],
  domainLabels: {
    aplusMobile: "Mobile Devices",
    aplusNetworking: "Networking",
    aplusHardware: "Hardware",
    aplusVirtCloud: "Virtualization and Cloud",
    aplusHwTroubleshooting: "Hardware and Network Troubleshooting",
    aplusOS: "Operating Systems",
    aplusSecurity: "Security",
    aplusSwTroubleshooting: "Software Troubleshooting",
    aplusOperational: "Operational Procedures",
  },
  preserveSplitDrillAccess: true,
  drills: [
    // Keep the first four practice URLs on their original topics. Each new
    // drill inherits only the questions it covers from its former drill.
    { key: "c1-hardware", legacyKey: "c1-devices", name: "Core 1: Hardware and Mobile Devices", section: "core1", domains: ["aplusMobile", "aplusHardware"], blurb: "Mobile devices, ports, memory, storage and other PC components." },
    { key: "c1-hw-troubleshooting", legacyKey: "c1-troubleshooting", name: "Core 1: Hardware and Network Troubleshooting", section: "core1", domains: ["aplusHwTroubleshooting"], blurb: "Diagnose hardware faults and connectivity problems." },
    { key: "c2-os", legacyKey: "c2-os-security", name: "Core 2: Operating Systems", section: "core2", domains: ["aplusOS"], blurb: "Install, configure and manage operating systems." },
    { key: "c2-procedures", name: "Core 2: Software and Procedures", section: "core2", domains: ["aplusSwTroubleshooting", "aplusOperational"], blurb: "Software fixes, malware removal, documentation and safety." },
    { key: "c1-networking", legacyKey: "c1-devices", name: "Core 1: Networking", section: "core1", domains: ["aplusNetworking"], blurb: "Network hardware, protocols, connections and services." },
    { key: "c1-cloud", legacyKey: "c1-troubleshooting", name: "Core 1: Virtualization and Cloud", section: "core1", domains: ["aplusVirtCloud"], blurb: "Virtual machines, cloud services and deployment models." },
    { key: "c2-security", legacyKey: "c2-os-security", name: "Core 2: Security", section: "core2", domains: ["aplusSecurity"], blurb: "Threats, authentication and security controls for devices and networks." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin on both cores",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "3 hr plus a break",
  copy: {
    heroSubs: [
      "Drill both cores, then take the full test.",
      "Master each drill first.",
      "Take the full test to see your score.",
      "Hit your goal on both cores.",
      "Goal hit. Book your A+ exams.",
    ],
    sourceLine: "Weighted to the CompTIA A+ 220-1201 and 220-1202 objectives. Matching and ordering items approximate the performance-based questions. Not affiliated with CompTIA.",
    scoreNote: "Percent correct across both cores. CompTIA reports each core on a 100 to 900 scale (675 for Core 1, 700 for Core 2), which is not a fixed percent.",
  },
};
