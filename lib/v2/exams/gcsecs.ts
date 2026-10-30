import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// GCSE Computer Science (England), on the DfE subject content (first
// published January 2015, last updated March 2025) that every board's
// specification follows. The real qualification is two written papers of
// equal weight; the boards split the content the same way: a computational
// thinking, algorithms and programming paper (AQA 8525 Paper 1: 2 hours, 90
// marks; OCR J277/02: 1 hr 30 min, 80 marks; Edexcel 1CP2 Paper 2 is an
// on-screen programming paper) and a computer systems paper (data
// representation, architecture, memory and storage, networks, security,
// systems software, and ethical, legal and environmental impacts; AQA 8525
// Paper 2: 1 hr 45 min, 90 marks, which also tests SQL; OCR J277/01: 1 hr 30
// min, 80 marks). Real papers are mostly short and extended written answers;
// here every item is auto-marked (multiple choice, trace the code and type
// the output, put the steps in order, match, highlight the faulty line), and
// a test is two shorter timed papers with a short break. Pseudocode follows
// one neutral convention (see PSEUDOCODE), since each board has its own
// reference language. Test 2 is held out of the drills so it measures
// readiness, not memory. Bank built by tools/gcsecs/build.py.
const minutes = (n: number) => n * 60;

const PSEUDOCODE = [
  "**Pseudocode used in this practice test**",
  "",
  "- ← assigns a value: total ← 0",
  "- = compares; ≠, <, >, ≤ and ≥ as usual",
  "- MOD gives the remainder, DIV whole-number division: 17 MOD 5 = 2, 17 DIV 5 = 3",
  "- Arrays and strings start at index 0",
  "- FOR i ← 1 TO 4 runs with i = 1, 2, 3 and 4",
  "- WHILE ... ENDWHILE checks before each run; REPEAT ... UNTIL checks after",
  "- IF ... THEN ... ELSE IF ... ELSE ... ENDIF",
  "- FUNCTION name(parameters) ... RETURN value ... ENDFUNCTION",
  "- AND, OR and NOT work on True and False (1 and 0)",
].join("\n");

export const GCSECS: ExamV2Config = {
  id: "gcsecs",
  slug: "/gcse-computer-science",
  landingPath: "/gcse-computer-science-practice-test",
  name: "GCSE Computer Science Practice Test",
  shortName: "GCSE Computer Science",
  fullName: "GCSE Computer Science",
  tagline: "Both GCSE Computer Science papers: algorithms, pseudocode and trace tables, then systems, networks and security, with the binary basics taught first.",
  icon: "cpu",
  theme: { brand: "180 35% 34%", brandDark: "180 35% 24%", brandLight: "180 55% 96%" },
  breakSeconds: 300,
  breakNote: "The real papers are sat on different days.",
  sections: [
    {
      key: "p1",
      name: "Paper 1: Computational thinking and programming",
      shortName: "Paper 1",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(45) }],
      reference: PSEUDOCODE,
      directions:
        "Algorithms (decomposition, abstraction, searching and sorting), programming (data types, selection, loops, arrays, subroutines, strings, validation and testing), and Boolean logic, languages and translators. Programs are written in pseudocode: open the reference panel to see how it works. For questions that ask what a program outputs, trace it line by line and type the number. No calculator, as on the real exam.",
      scale: percentScale(30),
      domains: ["gcsecsAlgorithms", "gcsecsProgramming", "gcsecsLogic"],
    },
    {
      key: "p2",
      name: "Paper 2: Computer systems",
      shortName: "Paper 2",
      modules: [{ module: 1, questionCount: 30, timeLimit: minutes(40) }],
      directions:
        "Data representation (binary, hexadecimal, binary addition and shifts, characters, images, sound and compression), systems architecture, memory and storage, operating systems and utilities, networks, cyber security, and the ethical, legal and environmental impacts of technology. For conversions, type the answer in denary. No calculator.",
      scale: percentScale(30),
      domains: ["gcsecsData", "gcsecsSystems", "gcsecsNetworks", "gcsecsImpacts"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    gcsecsAlgorithms: "Algorithms",
    gcsecsProgramming: "Programming",
    gcsecsLogic: "Boolean logic and languages",
    gcsecsData: "Data representation",
    gcsecsSystems: "Computer systems",
    gcsecsNetworks: "Networks and cyber security",
    gcsecsImpacts: "Ethical, legal and environmental impacts",
  },
  // Seven drills, one per domain, 20 exam-level items each. Data
  // representation, programming and logic open with Basics: walkthroughs for
  // binary, hex, binary addition and shifts, file sizes, trace tables and
  // truth tables. With the two tests that is 12 dashboard steps.
  drillSize: 20,
  drills: [
    { key: "algorithms", name: "Algorithms", section: "p1", domains: ["gcsecsAlgorithms"], blurb: "Decomposition and abstraction, linear and binary search, bubble, merge and insertion sort, and flowcharts." },
    { key: "programming", name: "Programming", section: "p1", domains: ["gcsecsProgramming"], blurb: "Trace pseudocode: data types, selection, loops, arrays, subroutines, strings, validation and testing.", basics: ["csTraceTables"] },
    { key: "logic", name: "Boolean logic and languages", section: "p1", domains: ["gcsecsLogic"], blurb: "AND, OR and NOT, truth tables, high- and low-level languages, translators and IDEs.", basics: ["csTruthTables"] },
    { key: "data", name: "Data representation", section: "p2", domains: ["gcsecsData"], blurb: "Binary, hexadecimal, binary addition and shifts, characters, images, sound, file sizes and compression.", basics: ["csBinary", "csHex", "csBinaryAdd", "csDataUnits"] },
    { key: "systems", name: "Computer systems", section: "p2", domains: ["gcsecsSystems"], blurb: "The CPU and fetch-execute cycle, RAM, ROM, cache and virtual memory, storage, embedded systems and the OS." },
    { key: "networks", name: "Networks and cyber security", section: "p2", domains: ["gcsecsNetworks"], blurb: "LANs and WANs, topologies, hardware, protocols and layers, threats like phishing and malware, and defences." },
    { key: "impacts", name: "Ethics, law and environment", section: "p2", domains: ["gcsecsImpacts"], blurb: "The Data Protection Act, Computer Misuse Act and copyright, open source and proprietary software, privacy and e-waste." },
  ],
  composite: { name: "Overall score", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 70,
  goalChoices: [50, 60, 70, 80, 90],
  goalNotes: {
    50: "50% practice target, a solid start",
    60: "60% practice target",
    70: "70% practice target, a strong margin",
    80: "80% practice target, aiming for the top grades",
    90: "90% practice target",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Learn binary and trace tables first, then drill each topic.",
      "Master each drill first.",
      "Halfway there. Try a full practice test.",
      "Hit your goal on the full test.",
      "Goal hit. You're ready for the real papers.",
    ],
    sourceLine: "Based on the Department for Education's GCSE subject content for computer science, which the AQA, OCR and Pearson Edexcel specifications all follow. Original questions; not affiliated with any exam board.",
    scoreNote: "Scores here are percent correct. Real GCSE papers are marked out of 80 or 90 with written answers, and grade boundaries change every year, so a percent here is not a grade.",
  },
};
