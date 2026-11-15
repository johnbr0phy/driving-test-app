import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Fortinet NSE 1 - Cybersecurity and Cloud Fundamentals, the entry-level
// Fortinet certification that replaced Fortinet Certified Fundamentals (FCF)
// in Cybersecurity on July 15, 2026 (FCF holders were awarded NSE 1 and
// NSE 2). The certification needs a pass on the online exam presented at the
// end of the free self-paced course. Fortinet publishes no question count,
// time limit or pass mark, so the 40 questions in 60 minutes here are
// Tigertest's pace and the goal is a readiness line. Weighted evenly across
// the ten modules of the course agenda (Fortinet publishes no weights): intro
// to cybersecurity, threat landscape, social engineering, malware,
// cryptography and PKI, secure networking, authentication and access control,
// endpoint security, secure data and applications, cloud security and
// virtualization; 4 per module per test. Sources:
// tools/next100/fortinse/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "fcfIntro", "fcfThreat", "fcfSocial", "fcfMalware", "fcfCrypto",
  "fcfNetwork", "fcfAuth", "fcfEndpoint", "fcfData", "fcfCloud",
];

export const FORTINSE: ExamV2Config = {
  id: "fortinse",
  slug: "/fortinet-fcf",
  landingPath: "/fortinet-fcf-practice-test",
  name: "Fortinet NSE 1 (FCF) Practice Test",
  shortName: "NSE 1 (FCF)",
  fullName: "Fortinet NSE 1 - Cybersecurity and Cloud Fundamentals exam (formerly FCF)",
  tagline: "40 questions on all ten modules of the NSE 1 course, the course that replaced Fortinet Certified Fundamentals.",
  icon: "shield",
  theme: { brand: "355 35% 20%", brandDark: "355 35% 15%", brandLight: "355 35% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "fcf",
      name: "NSE 1 Cybersecurity and Cloud Fundamentals",
      shortName: "NSE 1",
      modules: [{ module: 1, questionCount: 40, timeLimit: minutes(60) }],
      directions: "40 questions across the ten modules of the NSE 1 course in 60 minutes. Flag questions and come back to them.",
      scale: percentScale(40),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    fcfIntro: "Intro to Cybersecurity",
    fcfThreat: "Threat Landscape",
    fcfSocial: "Social Engineering",
    fcfMalware: "Malware",
    fcfCrypto: "Cryptography and PKI",
    fcfNetwork: "Secure Networking",
    fcfAuth: "Authentication and Access Control",
    fcfEndpoint: "Endpoint Security",
    fcfData: "Secure Data and Applications",
    fcfCloud: "Cloud Security and Virtualization",
  },
  drills: [
    { key: "threats", name: "Security Basics and Threats", section: "fcf", domains: ["fcfIntro", "fcfThreat"], blurb: "The CIA triad, risk terms and controls, bad actors and their motives, DDoS, botnets, zero days and ransomware as a service." },
    { key: "social", name: "Social Engineering and Malware", section: "fcf", domains: ["fcfSocial", "fcfMalware"], blurb: "Phishing and its variants, pretexting, baiting and tailgating, then worms, trojans, ransomware, rootkits and how malware arrives." },
    { key: "crypto", name: "Cryptography and PKI", section: "fcf", domains: ["fcfCrypto"], blurb: "Symmetric and asymmetric encryption, hashing, digital signatures, certificates, revocation and TLS." },
    { key: "network", name: "Secure Networking", section: "fcf", domains: ["fcfNetwork"], blurb: "Firewalls and next generation firewalls, DMZs and segmentation, IDS and IPS, VPNs, NAC, WAF, email gateways and Wi-Fi." },
    { key: "access", name: "Authentication and Access", section: "fcf", domains: ["fcfAuth"], blurb: "Authentication factors and MFA, passwords, SSO and SAML, RADIUS and LDAP, access control models and ZTNA." },
    { key: "endpoint", name: "Endpoint Security", section: "fcf", domains: ["fcfEndpoint"], blurb: "Hardening and patching, antivirus, EDR and XDR, mobile and IoT devices, encryption and backups." },
    { key: "datacloud", name: "Data, Apps and Cloud", section: "fcf", domains: ["fcfData", "fcfCloud"], blurb: "Classification and DLP, injection and XSS, sanitization, then IaaS, PaaS and SaaS, shared responsibility, VMs, containers and SASE." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "A first target",
    75: "Getting there",
    80: "Ready for the course exam",
    85: "Strong on every module",
    90: "Top band",
  },
  testLength: "1 hr",
  copy: {
    heroSubs: [
      "Drill each module, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Take the NSE 1 course exam.",
    ],
    sourceLine: "Written to the ten modules of Fortinet's NSE 1 Cybersecurity and Cloud Fundamentals course, which replaced FCF in July 2026. Not affiliated with Fortinet.",
    scoreNote: "Percent correct. Fortinet's NSE 1 exam comes at the end of its online course, and Fortinet publishes no question count, time limit or pass mark, so the 60-minute clock and the 80 percent goal here are Tigertest's.",
  },
};
