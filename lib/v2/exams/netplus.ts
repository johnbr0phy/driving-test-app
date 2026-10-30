import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Network+ N10-009 (launched June 2024, current in October 2026):
// up to 90 items in 90 minutes, multiple choice (some "Choose two") and
// performance-based items, with free navigation and review, 720 on a 100 to
// 900 scale to pass. PBQs are approximated with matrix and order items, and
// a few subnet and throughput calculations are typed. Weighted to the
// CompTIA Network+ N10-009 exam objectives (2024): Networking
// Concepts 23%, Network Implementation 20%, Network Operations 19%, Network
// Security 14%, Network Troubleshooting 24%. Concepts, Implementation and
// Troubleshooting are each split into two drills so each drill is one
// sitting: per test 11/10, 11/7, 17, 13, 10/11. Sources: tools/netplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "netModels", "netInfra", "netSwitchRoute", "netWireless", "netOps", "netSecurity", "netTroubleMethod", "netTroubleServices",
];

export const NETPLUS: ExamV2Config = {
  id: "netplus",
  slug: "/comptia-network-plus",
  landingPath: "/comptia-network-plus-practice-test",
  name: "CompTIA Network+ Practice Test",
  shortName: "Network+",
  fullName: "CompTIA Network+ (N10-009) exam",
  tagline: "90 questions in 90 minutes, with choose-two, matching and ordering items like the real N10-009.",
  icon: "cpu",
  theme: { brand: "252 40% 40%", brandDark: "252 40% 31%", brandLight: "252 40% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "netplus",
      name: "Network+ N10-009",
      shortName: "Network+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the five N10-009 domains in 90 minutes. Flag questions and come back to them. Matching and ordering items stand in for the performance-based questions, and a few calculations are typed as a number.",
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    netModels: "OSI Model, Ports and Protocols",
    netInfra: "Appliances, Cloud, Media and Addressing",
    netSwitchRoute: "Routing and Switching",
    netWireless: "Wireless and Physical Installation",
    netOps: "Network Operations",
    netSecurity: "Network Security",
    netTroubleMethod: "Troubleshooting Method, Cabling and Tools",
    netTroubleServices: "Troubleshooting Services and Performance",
  },
  drills: [
    { key: "models", name: "OSI, Ports and Protocols", section: "netplus", domains: ["netModels"], blurb: "OSI layers, encapsulation, common ports, TCP and UDP, and traffic types." },
    { key: "infra", name: "Appliances, Cloud and Addressing", section: "netplus", domains: ["netInfra"], blurb: "Network appliances, cloud models, cabling and transceivers, topologies, IPv4 subnets, SD-WAN and VXLAN." },
    { key: "switchroute", name: "Routing and Switching", section: "netplus", domains: ["netSwitchRoute"], blurb: "Route selection, OSPF and BGP, NAT, VLANs and trunks, spanning tree and link aggregation." },
    { key: "wireless", name: "Wireless and Installation", section: "netplus", domains: ["netWireless"], blurb: "802.11 standards and channels, WPA3, antennas, racks, power and the server room." },
    { key: "operations", name: "Network Operations", section: "netplus", domains: ["netOps"], blurb: "Documentation, change management, DHCP and DNS, time, disaster recovery, monitoring and remote access." },
    { key: "security", name: "Network Security", section: "netplus", domains: ["netSecurity"], blurb: "AAA and 802.1X, Layer 2 attacks, segmentation, hardening and access control." },
    { key: "troublemethod", name: "Troubleshooting Method and Tools", section: "netplus", domains: ["netTroubleMethod"], blurb: "The CompTIA methodology, cable and fiber faults, PoE, interface counters and tools." },
    { key: "troubleservices", name: "Troubleshooting Services", section: "netplus", domains: ["netTroubleServices"], blurb: "Addressing, DHCP, DNS, VLAN and routing faults, plus latency, jitter and Wi-Fi problems." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 720",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Network+ exam.",
    ],
    sourceLine: "Weighted to the CompTIA Network+ N10-009 exam objectives. Matching and ordering items approximate the performance-based questions. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA reports a scaled score from 100 to 900 with 720 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
