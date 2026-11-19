import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Linux+ XK0-006 (Linux+ V8, launched July 15, 2025; the English
// XK0-005 retired January 13, 2026, so XK0-006 is the only English exam):
// a maximum of 90 items in 90 minutes, multiple choice and performance-based,
// with 720 on a 100 to 900 scale to pass. PBQs are approximated with matrix
// and ordering items and monospace commands. Weighted to the XK0-006 exam
// objectives (Document Version 5.0): System Management 23%, Services and User
// Management 20%, Security 18%, Automation, Orchestration, and Scripting 17%,
// Troubleshooting 22%. Sources: tools/build-run-2026-11-18/linuxplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "linuxSystem", "linuxStorage", "linuxFiles", "linuxServices",
  "linuxSecurity", "linuxAutomation", "linuxTroubleSystem", "linuxTroubleNetSec",
];

export const LINUXPLUS: ExamV2Config = {
  id: "linuxplus",
  slug: "/comptia-linux-plus",
  landingPath: "/comptia-linux-plus-practice-test",
  name: "CompTIA Linux+ Practice Test",
  shortName: "Linux+",
  fullName: "CompTIA Linux+ (XK0-006) exam",
  tagline: "90 questions in 90 minutes, with commands, matching and ordering items like the real XK0-006.",
  icon: "server",
  theme: { brand: "39 25% 42%", brandDark: "39 25% 33%", brandLight: "39 30% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "linux",
      name: "Linux+ XK0-006",
      shortName: "Linux+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the five XK0-006 domains in 90 minutes. Flag questions and come back to them. Matching and ordering items stand in for the performance-based questions.",
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    linuxSystem: "Boot, Devices, Networking and VMs",
    linuxStorage: "Storage, Shell and Backups",
    linuxFiles: "Files, Users and Processes",
    linuxServices: "Software, systemd and Containers",
    linuxSecurity: "Security",
    linuxAutomation: "Automation, Scripting and Git",
    linuxTroubleSystem: "Monitoring and OS Troubleshooting",
    linuxTroubleNetSec: "Network, Security and Performance Issues",
  },
  drills: [
    { key: "system", name: "Boot, Devices and Networking", section: "linux", domains: ["linuxSystem"], blurb: "The boot process, the FHS, kernel modules, device tools, network configuration and tools, and virtualization with KVM and libvirt." },
    { key: "storage", name: "Storage, Shell and Backups", section: "linux", domains: ["linuxStorage"], blurb: "LVM, partitions, filesystems, RAID and mount options, shell redirection and text tools, and tar, rsync and other backup tools." },
    { key: "users", name: "Files, Users and Processes", section: "linux", domains: ["linuxFiles"], blurb: "Links and file tools, local accounts and password aging, process states, signals, priority and job scheduling." },
    { key: "services", name: "Software, systemd and Containers", section: "linux", domains: ["linuxServices"], blurb: "Packages and repositories, systemd units and tools, and container images, networks and volumes." },
    { key: "security", name: "Security", section: "linux", domains: ["linuxSecurity"], blurb: "Permissions, ACLs and attributes, sudo, SELinux, firewalld and UFW, SSH hardening, encryption and file integrity." },
    { key: "automation", name: "Automation and Scripting", section: "linux", domains: ["linuxAutomation"], blurb: "Ansible, Puppet, OpenTofu, cloud-init, Kubernetes and Compose, Bash scripting, Python basics, Git and responsible AI." },
    { key: "troubleshootos", name: "Monitoring and OS Issues", section: "linux", domains: ["linuxTroubleSystem"], blurb: "SLAs, SLIs and SNMP, then full disks, inodes, read-only mounts, the OOM killer, GRUB, drivers and failed units." },
    { key: "troubleshootnet", name: "Network and Performance Issues", section: "linux", domains: ["linuxTroubleNetSec"], blurb: "DNS, routing, MTU and link faults, SELinux, ACL and certificate problems, swapping, I/O wait and load average." },
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
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your Linux+ exam.",
    ],
    sourceLine: "Weighted to the CompTIA Linux+ XK0-006 exam objectives. Matching and ordering items approximate the performance-based questions. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA reports a scaled score from 100 to 900 with 720 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
