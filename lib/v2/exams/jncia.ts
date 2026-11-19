import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Juniper JNCIA-Junos (Junos, Associate), exam JN0-106, which replaced JN0-105
// on April 6, 2026 (Juniper Learning Portal certification news). 65
// multiple-choice questions in 90 minutes, English only, Pearson VUE, based on
// Junos OS 21.2; Juniper reports pass or fail and publishes no pass mark or
// weights. Seven objective areas; the per-test split is Tigertest's:
// networking fundamentals 10, Junos OS fundamentals 7, user interfaces 10,
// configuration basics 11, operational monitoring and maintenance 9, routing
// fundamentals 9, routing policy and firewall filters 9. A few order, matrix
// and typed-number items are practice formats; the real exam is multiple
// choice only. CLI shown in monospace. Sources: tools/next100/jncia/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = ["jnNet", "jnJunos", "jnUi", "jnConfig", "jnOps", "jnRouting", "jnPolicy"];

export const JNCIA: ExamV2Config = {
  id: "jncia",
  slug: "/jncia",
  landingPath: "/jncia-junos-practice-test",
  name: "JNCIA-Junos Practice Test",
  shortName: "JNCIA-Junos",
  fullName: "Juniper JNCIA-Junos (JN0-106) exam",
  tagline: "65 questions in 90 minutes with Junos CLI commands and output, like the real JN0-106.",
  icon: "cpu",
  theme: { brand: "106 95% 18%", brandDark: "106 95% 12%", brandLight: "106 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "jncia",
      name: "JNCIA-Junos JN0-106",
      shortName: "JN0-106",
      modules: [{ module: 1, questionCount: 65, timeLimit: minutes(90) }],
      directions: "65 questions across the seven JN0-106 objective areas in 90 minutes. Some items show Junos commands or output; subnetting and a few other answers are typed as a number. Flag questions and come back to them.",
      scale: percentScale(65),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    jnNet: "Networking Fundamentals",
    jnJunos: "Junos OS Fundamentals",
    jnUi: "User Interfaces",
    jnConfig: "Configuration Basics",
    jnOps: "Operational Monitoring and Maintenance",
    jnRouting: "Routing Fundamentals",
    jnPolicy: "Routing Policy and Firewall Filters",
  },
  drills: [
    { key: "networking", name: "Networking Fundamentals", section: "jncia", domains: ["jnNet"], blurb: "Collision and broadcast domains, Ethernet and ARP, IPv4 and IPv6, subnetting, binary, longest match, CoS, TCP and UDP." },
    { key: "junos", name: "Junos OS Fundamentals", section: "jncia", domains: ["jnJunos"], blurb: "The Routing Engine and Packet Forwarding Engine, control and forwarding planes, transit and exception traffic." },
    { key: "interfaces", name: "User Interfaces", section: "jncia", domains: ["jnUi"], blurb: "CLI modes and navigation, help and pipe filters, candidate and active configuration, commit, rollback, load and J-Web." },
    { key: "config", name: "Configuration Basics", section: "jncia", domains: ["jnConfig"], blurb: "Initial setup, users and login classes, interfaces, groups, NTP, SNMP, syslog, tracing, archival and rescue." },
    { key: "operations", name: "Monitoring and Maintenance", section: "jncia", domains: ["jnOps"], blurb: "Show and monitor commands, interface errors, ping and traceroute, upgrades, shutting down and root password recovery." },
    { key: "routing", name: "Routing Fundamentals", section: "jncia", domains: ["jnRouting"], blurb: "Routing and forwarding tables, route preference, routing instances, static routes and dynamic protocols." },
    { key: "policy", name: "Policy and Firewall Filters", section: "jncia", domains: ["jnPolicy"], blurb: "Default policies, import and export, route filter match types, firewall filter actions and unicast RPF." },
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
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each objective, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your JNCIA-Junos exam.",
    ],
    sourceLine: "Weighted by Tigertest across the seven Juniper JN0-106 exam objectives (Junos OS 21.2). Not affiliated with Juniper Networks or HPE.",
    scoreNote: "Percent correct. Juniper reports only pass or fail for JN0-106 and publishes no passing score; aim for 80 percent here before you book.",
  },
};
