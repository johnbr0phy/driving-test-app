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
  drills: [
    { key: "c1-devices", name: "Core 1: Mobile, Networking and Hardware", section: "core1", domains: ["aplusMobile", "aplusNetworking", "aplusHardware"], blurb: "Ports, cables, protocols, RAM, storage and mobile devices." },
    { key: "c1-troubleshooting", name: "Core 1: Cloud and Troubleshooting", section: "core1", domains: ["aplusVirtCloud", "aplusHwTroubleshooting"], blurb: "Virtualization, cloud models and the troubleshooting method." },
    { key: "c2-os-security", name: "Core 2: Operating Systems and Security", section: "core2", domains: ["aplusOS", "aplusSecurity"], blurb: "Windows, macOS and Linux tools, plus security settings and threats." },
    { key: "c2-procedures", name: "Core 2: Software and Procedures", section: "core2", domains: ["aplusSwTroubleshooting", "aplusOperational"], blurb: "Software fixes, malware removal, documentation and safety." },
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
      "Halfway there. Try the full test.",
      "Hit your goal on both cores.",
      "Goal hit. Book your A+ exams.",
    ],
    sourceLine: "Weighted to the CompTIA A+ 220-1201 and 220-1202 objectives. Matching and ordering items approximate the performance-based questions. Not affiliated with CompTIA.",
    scoreNote: "Percent correct across both cores. CompTIA reports each core on a 100 to 900 scale (675 for Core 1, 700 for Core 2), which is not a fixed percent.",
  },
};
