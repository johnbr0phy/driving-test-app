import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Snowflake SnowPro Core Certification, exam version COF-C03 (learn.snowflake.com
// exam page, checked November 2026). The real exam is 100 multiple choice and
// multiple select questions in 115 minutes, scaled 0 to 1000 with 750 to pass,
// and may include unscored items. Weighted to the page's five domains: 1.0
// Snowflake AI Data Cloud Features & Architecture 31%, 2.0 Account Management
// and Data Governance 20%, 3.0 Data Loading, Unloading, and Connectivity 18%,
// 4.0 Performance Optimization, Querying, and Transformation 21%, 5.0 Data
// Collaboration 10%. Practice tests are half length at the real pace, 50
// questions in 58 minutes: 16/10/9/10/5. Domains 1, 2 and 4 split into two
// drills each, so the dashboard has 8 drills and 2 tests: architecture 8,
// objects and data 8; access 5, governance 5; loading 9; performance 5,
// transformation 5; collaboration 5. Feature names as of November 2026.
const minutes = (n: number) => n * 60;

export const SNOWPRO: ExamV2Config = {
  id: "snowpro",
  slug: "/snowpro-core",
  landingPath: "/snowpro-core-practice-test",
  name: "SnowPro Core Practice Test",
  shortName: "SnowPro Core",
  fullName: "Snowflake SnowPro Core Certification (COF-C03) exam",
  tagline: "50 questions in 58 minutes, half a real COF-C03 at its pace, with choose-two items.",
  icon: "cloud",
  theme: { brand: "186 60% 14%", brandDark: "186 60% 8%", brandLight: "186 60% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "core",
      name: "SnowPro Core COF-C03",
      shortName: "COF-C03",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(58) }],
      directions: "50 questions across the five COF-C03 domains in 58 minutes. Multiple select items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["spArch", "spObjects", "spAccess", "spGovern", "spLoad", "spPerf", "spTransform", "spShare"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    spArch: "Architecture and Features",
    spObjects: "Objects, Data Types and Time Travel",
    spAccess: "Accounts, Roles and Access",
    spGovern: "Data Governance and Monitoring",
    spLoad: "Loading, Unloading and Connectivity",
    spPerf: "Performance Optimization",
    spTransform: "Querying and Transformation",
    spShare: "Data Collaboration",
  },
  drills: [
    { key: "architecture", name: "Architecture and Features", section: "core", domains: ["spArch"], blurb: "The three layers, micro-partitions, editions, Snowsight and Snowpark, and what Cortex AI Functions, Cortex Search and Cortex Analyst do." },
    { key: "objects", name: "Objects and Time Travel", section: "core", domains: ["spObjects"], blurb: "Permanent, transient, temporary, hybrid and external tables, VARIANT and file URLs, Time Travel, Fail-safe, UNDROP and cloning." },
    { key: "access", name: "Roles and Access", section: "core", domains: ["spAccess"], blurb: "System roles and the role hierarchy, privileges and future grants, database and secondary roles, MFA, SSO and network policies." },
    { key: "governance", name: "Governance and Monitoring", section: "core", domains: ["spGovern"], blurb: "Masking and row access policies, tags and classification, encryption, ACCOUNT_USAGE, access history, resource monitors and budgets." },
    { key: "loading", name: "Loading and Unloading", section: "core", domains: ["spLoad"], blurb: "Stages, PUT and GET, file formats, COPY INTO options, Snowpipe and Snowpipe Streaming, unloading, Iceberg tables and drivers." },
    { key: "performance", name: "Performance", section: "core", domains: ["spPerf"], blurb: "Warehouse sizes and credits, multi-cluster scaling, result and warehouse caches, pruning, clustering, Query Profile, QAS and search optimization." },
    { key: "transform", name: "Querying and Transformation", section: "core", domains: ["spTransform"], blurb: "FLATTEN and PARSE_JSON, streams and their metadata, tasks, dynamic tables, UDFs, UDTFs, stored procedures and MERGE." },
    { key: "collaboration", name: "Data Collaboration", section: "core", domains: ["spShare"], blurb: "Secure Data Sharing, reader accounts, listings and Snowflake Marketplace, replication and failover, clean rooms and Native Apps." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Close to the passing line",
    75: "Passing with a little room",
    80: "A safe margin over 750",
    85: "Strong: ready to schedule",
    90: "Top band",
  },
  testLength: "58 min",
  copy: {
    heroSubs: [
      "Drill each domain, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit. Book your SnowPro Core exam.",
    ],
    sourceLine: "Weighted to the five COF-C03 domains on Snowflake's SnowPro Core exam page (November 2026). Feature names as of November 2026. Not affiliated with Snowflake Inc.",
    scoreNote: "Percent correct. Snowflake reports a scaled score from 0 to 1000 with 750 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
