import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Cisco CCNP ENCOR 350-401 (Implementing Cisco Enterprise Network Core
// Technologies) v1.2, the exam topics in force since March 19, 2026: the core
// exam for CCNP Enterprise and the qualifying exam for CCIE Enterprise. 120
// minutes; Cisco publishes no item count or pass mark, and Cisco exams move
// forward only, so a practice test here is linear (no going back). Weighted to
// the v1.2 domains: Architecture 15%, Virtualization 10%, Infrastructure 30%,
// Network Assurance 10%, Security 20%, Automation and Artificial Intelligence
// 15%. Infrastructure is split into Layer 2, Layer 3 and IP services so each
// drill stays one sitting: per test 15/10/10/12/8/10/20/15. Labs and
// drag-and-drop items are approximated with order and matrix items; CLI,
// configuration and Python are shown in monospace. Sources:
// tools/next100/ccnpencor/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = ["encorArch", "encorVirt", "encorL2", "encorRouting", "encorServices", "encorAssurance", "encorSecurity", "encorAutomation"];

export const CCNPENCOR: ExamV2Config = {
  id: "ccnpencor",
  slug: "/ccnp-encor",
  landingPath: "/ccnp-encor-350-401-practice-test",
  name: "CCNP ENCOR Practice Test",
  shortName: "CCNP ENCOR",
  fullName: "Cisco CCNP ENCOR (350-401) exam",
  tagline: "100 questions in 120 minutes on the 350-401 v1.2 topics, with router output, configuration and Python, answered in order like the real exam.",
  icon: "cpu",
  theme: { brand: "276 40% 18%", brandDark: "276 40% 12%", brandLight: "276 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "encor",
      name: "CCNP ENCOR 350-401",
      shortName: "ENCOR",
      linear: true,
      modules: [{ module: 1, questionCount: 100, timeLimit: minutes(120) }],
      directions: "100 questions across the six ENCOR 350-401 domains in 120 minutes. Like the real exam, you answer in order and cannot go back. Some items show router output, configuration or a short Python script; a few answers are typed as a number.",
      scale: percentScale(100),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    encorArch: "Architecture",
    encorVirt: "Virtualization",
    encorL2: "Layer 2",
    encorRouting: "Layer 3 Routing",
    encorServices: "IP Services",
    encorAssurance: "Network Assurance",
    encorSecurity: "Security",
    encorAutomation: "Automation and AI",
  },
  drills: [
    { key: "architecture", name: "Architecture", section: "encor", domains: ["encorArch"], blurb: "Campus design, SSO and NSF, Catalyst SD-WAN, SD-Access and reading QoS policies." },
    { key: "virtualization", name: "Virtualization", section: "encor", domains: ["encorVirt"], blurb: "Hypervisors, virtual switching, VRF, GRE and IPsec, LISP and VXLAN." },
    { key: "layer2", name: "Layer 2", section: "encor", domains: ["encorL2"], blurb: "802.1Q trunks, EtherChannel, RSTP, MST, root guard and BPDU guard." },
    { key: "routing", name: "Layer 3 Routing", section: "encor", domains: ["encorRouting"], blurb: "EIGRP and OSPF compared, multi-area OSPF, eBGP best path and policy-based routing." },
    { key: "services", name: "IP Services", section: "encor", domains: ["encorServices"], blurb: "NTP and PTP, NAT and PAT, VRRP, and multicast: PIM, IGMP, SSM, BIDIR and MSDP." },
    { key: "assurance", name: "Network Assurance", section: "encor", domains: ["encorAssurance"], blurb: "Debugs, SNMP, syslog, Flexible NetFlow, SPAN, RSPAN, ERSPAN, IP SLA, NETCONF and RESTCONF." },
    { key: "security", name: "Security", section: "encor", domains: ["encorSecurity"], blurb: "Password types, AAA, TACACS+ and RADIUS, ACLs, CoPP, API security, firewalls, TrustSec and MACsec." },
    { key: "automation", name: "Automation and AI", section: "encor", domains: ["encorAutomation"], blurb: "Python, JSON, YANG, Catalyst Center and SD-WAN Manager APIs, REST codes, EEM and orchestration tools." },
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
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your ENCOR exam.",
    ],
    sourceLine: "Weighted to the Cisco ENCOR 350-401 v1.2 exam topics. Order and matching items approximate the drag-and-drop questions; labs are not modelled. Not affiliated with Cisco.",
    scoreNote: "Percent correct. Cisco does not publish a fixed passing score for ENCOR, and the real exam is scaled; aim for 80 percent here before you book.",
  },
};
