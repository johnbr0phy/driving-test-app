import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Cisco CCNA 200-301 (Implementing and Administering Cisco Solutions), exam
// topics v1.1, the version given through February 2, 2027 (v2.0, with five
// domains, takes over on February 3, 2027). About 100 to 120 items in 120
// minutes; Cisco exams move forward only, so a practice test here is linear
// (no going back). Cisco does not publish a fixed pass mark. Weighted to the
// v1.1 domains: Network Fundamentals 20%, Network Access 20%, IP
// Connectivity 25%, IP Services 10%, Security Fundamentals 15%, Automation
// and Programmability 10%. Fundamentals is split into concepts and
// addressing/subnetting, IP Connectivity into routing/static and
// OSPF/FHRP, so each drill stays one sitting: per test 11/9/20/13/12/10/15/10.
// Simulations and drag-and-drop items are approximated with order and
// matrix items; subnetting is typed (numeric). CLI output is shown in
// monospace in the stem. Sources: tools/ccna/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = ["ccnaFundamentals", "ccnaAddressing", "ccnaAccess", "ccnaRouting", "ccnaOspf", "ccnaServices", "ccnaSecurity", "ccnaAutomation"];

export const CCNA: ExamV2Config = {
  id: "ccna",
  slug: "/ccna",
  landingPath: "/ccna-practice-test",
  name: "CCNA Practice Test",
  shortName: "CCNA",
  fullName: "Cisco CCNA (200-301) exam",
  tagline: "100 questions in 120 minutes with CLI exhibits, typed subnetting and drag-and-drop style items, answered in order like the real 200-301.",
  icon: "cpu",
  theme: { brand: "191 45% 30%", brandDark: "191 45% 20%", brandLight: "191 70% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ccna",
      name: "CCNA 200-301",
      shortName: "CCNA",
      linear: true,
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions across the six CCNA 200-301 domains in 120 minutes. Like the real exam, you answer in order and cannot go back. Some items show router or switch output; subnetting answers are typed as a number.",
      scale: percentScale(100),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    ccnaFundamentals: "Network Fundamentals",
    ccnaAddressing: "IPv4 and IPv6 Addressing",
    ccnaAccess: "Network Access",
    ccnaRouting: "Routing and Static Routes",
    ccnaOspf: "OSPF and First Hop Redundancy",
    ccnaServices: "IP Services",
    ccnaSecurity: "Security Fundamentals",
    ccnaAutomation: "Automation and Programmability",
  },
  drills: [
    { key: "fundamentals", name: "Network Fundamentals", section: "ccna", domains: ["ccnaFundamentals"], blurb: "Devices, topologies, cabling, interface errors, TCP and UDP, wireless, virtualization and switching." },
    { key: "addressing", name: "Subnetting and IPv6", section: "ccna", domains: ["ccnaAddressing"], blurb: "IPv4 subnetting by hand, private ranges, IPv6 addresses, types and EUI-64." },
    { key: "access", name: "Network Access", section: "ccna", domains: ["ccnaAccess"], blurb: "VLANs, trunks, CDP and LLDP, EtherChannel, Rapid PVST+ and wireless architectures." },
    { key: "routing", name: "Routing and Static Routes", section: "ccna", domains: ["ccnaRouting"], blurb: "Reading the routing table, longest match, administrative distance and static routes." },
    { key: "ospf", name: "OSPF and FHRP", section: "ccna", domains: ["ccnaOspf"], blurb: "Single-area OSPFv2 neighbors, DR and BDR, cost and router ID, plus HSRP and VRRP." },
    { key: "services", name: "IP Services", section: "ccna", domains: ["ccnaServices"], blurb: "NAT and PAT, NTP, DHCP, DNS, SNMP, syslog, QoS and SSH." },
    { key: "security", name: "Security Fundamentals", section: "ccna", domains: ["ccnaSecurity"], blurb: "ACLs, port security, DHCP snooping, AAA, VPNs and wireless security." },
    { key: "automation", name: "Automation", section: "ccna", domains: ["ccnaAutomation"], blurb: "Controller-based networking, REST APIs, JSON, Ansible, Terraform and AI." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Getting close",
    75: "Borderline: keep drilling",
    80: "Ready line: a safe margin",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Halfway there. Try Practice Test 1.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your CCNA exam.",
    ],
    sourceLine: "Weighted to the Cisco CCNA 200-301 exam topics v1.1. Order and matching items approximate the drag-and-drop questions; simulations are not modelled. Not affiliated with Cisco.",
    scoreNote: "Percent correct. Cisco does not publish a fixed passing score for the CCNA, and the real exam is scaled; aim for 80 percent here before you book.",
  },
};
