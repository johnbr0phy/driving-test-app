import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// EC-Council Certified Ethical Hacker (CEH), exam 312-50, version 13
// ("Currently on Version 13" on eccouncil.org, checked 2026-11-16; no
// successor announced): 125 multiple-choice questions in 4 hours, with a cut
// score set per exam form between 60% and 85%. Weighted to the CEH Exam
// Blueprint v5.0: Information Security and Ethical Hacking Overview 6%,
// Reconnaissance Techniques 17%, System Hacking Phases and Attack Techniques
// 15%, Network and Perimeter Hacking 24%, Web Application Hacking 14%,
// Wireless Network Hacking 5%, Mobile Platform, IoT and OT Hacking 10%, Cloud
// Computing 5%, Cryptography 5%, scaled from 125 to 80 per test at the real
// pace (about 1.9 minutes a question). The CEH Practical is not modelled.
// Every scenario is authorised testing; no working exploit payloads. Sources:
// tools/next100/ceh/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "cehIntro", "cehRecon", "cehSystem", "cehNetwork", "cehWeb",
  "cehWireless", "cehMobile", "cehCloud", "cehCrypto",
];

export const CEH: ExamV2Config = {
  id: "ceh",
  slug: "/ceh",
  landingPath: "/ceh-practice-test",
  name: "CEH Practice Test",
  shortName: "CEH",
  fullName: "EC-Council Certified Ethical Hacker (CEH v13, 312-50) exam",
  tagline: "80 questions in 154 minutes, the real CEH pace, weighted to EC-Council's nine blueprint domains.",
  icon: "shield",
  theme: { brand: "137 85% 18%", brandDark: "137 85% 13%", brandLight: "137 45% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "ceh",
      name: "CEH 312-50",
      shortName: "CEH",
      modules: [{ module: 1, questionCount: 80, timeLimit: minutes(154) }],
      directions: "80 multiple-choice questions across the nine CEH blueprint domains in 154 minutes, the pace of the real 125 questions in 4 hours. Flag questions and come back to them.",
      scale: percentScale(80),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    cehIntro: "Information Security and Ethical Hacking Overview",
    cehRecon: "Reconnaissance Techniques",
    cehSystem: "System Hacking Phases and Attack Techniques",
    cehNetwork: "Network and Perimeter Hacking",
    cehWeb: "Web Application Hacking",
    cehWireless: "Wireless Network Hacking",
    cehMobile: "Mobile Platform, IoT and OT Hacking",
    cehCloud: "Cloud Computing",
    cehCrypto: "Cryptography",
  },
  drills: [
    { key: "overview", name: "Ethical Hacking Overview", section: "ceh", domains: ["cehIntro"], blurb: "Security elements, hacker classes, hacking phases, the Cyber Kill Chain, MITRE ATT&CK, the Diamond Model, controls, and laws and standards." },
    { key: "recon", name: "Reconnaissance", section: "ceh", domains: ["cehRecon"], blurb: "Footprinting with search engines, DNS and email, nmap scan types and flags, host and OS discovery, and NetBIOS, SNMP, LDAP, SMTP and NFS enumeration." },
    { key: "system", name: "System Hacking and Malware", section: "ceh", domains: ["cehSystem"], blurb: "Vulnerability assessment, password attacks and hash storage, Kerberos attacks, privilege escalation, hiding files and covering tracks, and malware types." },
    { key: "network", name: "Network and Perimeter", section: "ceh", domains: ["cehNetwork"], blurb: "Sniffing and switch attacks, social engineering, DoS and botnets, session hijacking, and evading IDS, firewalls and honeypots." },
    { key: "web", name: "Web Application Hacking", section: "ceh", domains: ["cehWeb"], blurb: "Web server attacks and patching, OWASP risks, CSRF, clickjacking, file inclusion, XXE, and the types of SQL injection." },
    { key: "mobileiot", name: "Wireless, Mobile, IoT and OT", section: "ceh", domains: ["cehWireless", "cehMobile"], blurb: "WEP, WPA2 and WPA3, Bluetooth attacks, jailbreaking and rooting, MDM, IoT protocols and the Purdue model for OT." },
    { key: "cloudcrypto", name: "Cloud and Cryptography", section: "ceh", domains: ["cehCloud", "cehCrypto"], blurb: "Cloud service models, containers and Kubernetes, cloud threats, ciphers and key lengths, hashing, PKI and cryptanalysis." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Enough for an easier exam form",
    75: "Near the middle of the range",
    80: "A safe margin for most forms",
    85: "The top of EC-Council's 60 to 85% range",
    90: "Top band",
  },
  testLength: "2 hr 34 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your CEH exam.",
    ],
    sourceLine: "Weighted to EC-Council's CEH Exam Blueprint v5.0 (CEH v13, exam 312-50), framed as authorised testing. Not affiliated with EC-Council.",
    scoreNote: "Percent correct. EC-Council sets a cut score for each exam form between 60% and 85% and does not tell you which form you get; aim for 80 percent here.",
  },
};
