import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// CompTIA Data+ (exam DA0-002, V2, launched October 14, 2025; the English
// DA0-001 has retired). Built to the DA0-002 exam objectives: Data Concepts
// and Environments 20%, Data Acquisition and Preparation 22%, Data Analysis
// 24%, Visualization and Reporting 20%, Data Governance 14%. CompTIA gives a
// maximum of 90 multiple-choice and performance-based questions in 90 minutes
// and a passing score of 675 on a scale of 100 to 900. Each practice test is
// 90 questions in 90 minutes with free navigation. Per test: concepts and
// data types 10, infrastructure, tools and AI 8 (18); acquisition and queries
// 10, exploration and cleansing 10 (20); communication and troubleshooting
// 10, statistics 12 (22); visuals 9, reports and validation 9 (18);
// governance 12. Performance-based items are modelled as matching, ordering
// and typed-number questions. Sources: tools/next100/dataplus/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "dpConcepts", "dpEnv",
  "dpAcquire", "dpPrep",
  "dpComm", "dpStats",
  "dpVisuals", "dpReports",
  "dpGov",
];

export const DATAPLUS: ExamV2Config = {
  id: "dataplus",
  slug: "/comptia-data-plus",
  landingPath: "/comptia-data-plus-practice-test",
  name: "CompTIA Data+ Practice Test",
  shortName: "Data+",
  fullName: "CompTIA Data+ (DA0-002) exam",
  tagline: "90 questions in 90 minutes on data types, SQL queries, cleaning, statistics, charts, reports and governance, weighted to the Data+ DA0-002 objectives.",
  icon: "activity",
  theme: { brand: "152 75% 14%", brandDark: "152 75% 10%", brandLight: "152 75% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "dataplus",
      name: "CompTIA Data+",
      shortName: "Data+",
      modules: [{ module: 1, questionCount: 90, timeLimit: minutes(90) }],
      directions: "90 questions across the five Data+ domains in 90 minutes. Flag questions and come back to them.",
      calculator: true,
      scale: percentScale(90),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    dpConcepts: "Data Concepts and Data Types",
    dpEnv: "Infrastructure, Tools and AI",
    dpAcquire: "Data Acquisition and Queries",
    dpPrep: "Data Exploration and Cleansing",
    dpComm: "Communicating Results and Troubleshooting",
    dpStats: "Statistical Methods and Functions",
    dpVisuals: "Visual Elements and Charts",
    dpReports: "Reports, Dashboards and Validation",
    dpGov: "Data Governance",
  },
  drills: [
    { key: "concepts", name: "Data Concepts", section: "dataplus", domains: ["dpConcepts"], blurb: "Relational and non-relational databases, fact and dimension tables, structured and semi-structured data, data types, file extensions and data sources." },
    { key: "environments", name: "Infrastructure, Tools and AI", section: "dataplus", domains: ["dpEnv"], blurb: "Cloud and on-premises models, object, block and file storage, containers, IDEs, notebooks, BI tools, libraries and AI concepts." },
    { key: "acquisition", name: "Acquisition and Queries", section: "dataplus", domains: ["dpAcquire"], blurb: "Joins, unions, grouping, filtering, nested queries, indexing and parameters, ETL and ELT, surveys and sampling." },
    { key: "preparation", name: "Exploration and Cleansing", section: "dataplus", domains: ["dpPrep"], blurb: "Missing values, duplicates, outliers and completeness, then imputation, scaling, standardization, parsing, merging and regular expressions." },
    { key: "communication", name: "Communication and Troubleshooting", section: "dataplus", domains: ["dpComm"], blurb: "Matching detail to the audience, mock-ups, accessibility, sensitive data and KPIs, and fixing connection, SQL and data issues." },
    { key: "statistics", name: "Statistics", section: "dataplus", domains: ["dpStats"], blurb: "Descriptive, predictive, prescriptive and inferential methods, mean, median and mode, range, variance and standard deviation, z-scores and percent change." },
    { key: "visuals", name: "Charts and Visuals", section: "dataplus", domains: ["dpVisuals"], blurb: "Picking the right chart, maps and pivot tables, labels, legends, branding and accessible color schemes." },
    { key: "reports", name: "Reports and Validation", section: "dataplus", domains: ["dpReports"], blurb: "Executive summaries, self-service portals, static and dynamic dashboards, snapshots and real-time data, and fixing slow or stale reports." },
    { key: "governance", name: "Data Governance", section: "dataplus", domains: ["dpGov"], blurb: "Data dictionaries and lineage, retention, classification, GDPR and PCI DSS, masking and anonymization, and data quality testing." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 675",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "1 hr 30 min",
  copy: {
    heroSubs: [
      "Drill each topic, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the CompTIA Data+ DA0-002 exam objectives. Not affiliated with CompTIA.",
    scoreNote: "Percent correct. CompTIA sets the passing score at 675 on a scale of 100 to 900, a scaled score that is not a fixed percent; aim for 80 percent here. Performance-based questions are modelled as matching, ordering and typed-number items.",
  },
};
