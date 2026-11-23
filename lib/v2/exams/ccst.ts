import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Cisco Certified Support Technician (CCST) Networking, exam 100-150, delivered
// by Certiport and Pearson VUE. Built to the CCST Networking objectives (Cisco
// training overview PDF and Certiport's objective domains): 1 Standards and
// Concepts, 2 Addressing and Subnet Formats, 3 Endpoints and Media Types,
// 4 Infrastructure, 5 Diagnosing Problems, 6 Security. Cisco gives 50 minutes,
// says the number of questions varies and reports Pass or Fail with no
// published passing score or domain weights. Each practice test is 45
// questions in 50 minutes with free navigation (Tigertest's length). Per test:
// standards 9, addressing 8, endpoints and media 8, infrastructure 7,
// diagnosing problems 8, security 5. Sources: tools/next100/ccst/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = ["ccstStandards", "ccstAddressing", "ccstMedia", "ccstInfra", "ccstDiagnose", "ccstSecurity"];

export const CCST: ExamV2Config = {
  id: "ccst",
  slug: "/ccst-networking",
  landingPath: "/ccst-networking-practice-test",
  name: "Cisco CCST Networking Practice Test",
  shortName: "CCST Networking",
  fullName: "Cisco Certified Support Technician (CCST) Networking 100-150 exam",
  tagline: "45 questions in 50 minutes on network models, IPv4 and IPv6 addressing, cables and Wi-Fi, switches and routers, troubleshooting and security, built on the CCST Networking 100-150 objectives.",
  icon: "cpu",
  theme: { brand: "264 65% 14%", brandDark: "264 65% 10%", brandLight: "264 65% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ccst",
      name: "CCST Networking",
      shortName: "CCST",
      modules: [{ module: 1, questionCount: 45, timeLimit: minutes(50) }],
      directions: "45 questions across the six CCST Networking domains in 50 minutes. Flag questions and come back to them.",
      scale: percentScale(45),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ccstStandards: "Standards and Concepts",
    ccstAddressing: "Addressing and Subnet Formats",
    ccstMedia: "Endpoints and Media Types",
    ccstInfra: "Infrastructure",
    ccstDiagnose: "Diagnosing Problems",
    ccstSecurity: "Security",
  },
  drills: [
    { key: "standards", name: "Standards and Concepts", section: "ccst", domains: ["ccstStandards"], blurb: "OSI and TCP/IP models, bandwidth, throughput and latency, LAN, WAN, MAN, CAN, PAN and WLAN, topologies, cloud models, TCP and UDP, and common protocols such as DNS, DHCP, NTP and TFTP." },
    { key: "addressing", name: "Addressing and Subnets", section: "ccst", domains: ["ccstAddressing"], blurb: "Private and public addresses, classes and NAT, masks and slash notation, hosts per subnet, network and broadcast addresses, and IPv6 address types and short forms." },
    { key: "media", name: "Endpoints and Media", section: "ccst", domains: ["ccstMedia"], blurb: "Copper and fiber cables and connectors, Wi-Fi bands, cellular and interference, endpoint devices, and checking connectivity on Windows, Linux, macOS, Android and iOS." },
    { key: "infra", name: "Infrastructure", section: "ccst", domains: ["ccstInfra"], blurb: "Port status lights, cabling from a diagram and rack layout, console, SFP, serial and PoE ports, default gateways and routing, MAC address tables and VLANs." },
    { key: "diagnose", name: "Diagnosing Problems", section: "ccst", domains: ["ccstDiagnose"], blurb: "Help desk tickets and priorities, the troubleshooting method, Wireshark captures, ping, tracert, nslookup, remote access and Cisco show commands." },
    { key: "security", name: "Security", section: "ccst", domains: ["ccstSecurity"], blurb: "How firewall rules permit and deny, CIA, AAA and MFA, certificates, passwords, Active Directory, common threats, and WPA2 and WPA3 on a home router." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to ready",
    80: "A safe margin",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "50 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Built on the Cisco CCST Networking 100-150 objectives. Not affiliated with Cisco or Certiport.",
    scoreNote: "Percent correct. Cisco reports CCST Networking only as Pass or Fail and publishes no passing score, so 80 percent here is Tigertest's readiness target.",
  },
};
