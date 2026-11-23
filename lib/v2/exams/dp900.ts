import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Microsoft Exam DP-900: Microsoft Azure Data Fundamentals, for the Microsoft
// Certified: Azure Data Fundamentals certification. Built to the skills
// measured as of July 21, 2026 (the current list on the Microsoft Learn study
// guide in November 2026): Describe core data concepts 25-30%, Identify
// considerations for relational data on Azure 20-25%, Describe considerations
// for working with non-relational data on Azure 15-20%, Describe an analytics
// workload 25-30%. Microsoft gives 45 minutes and 700 is the passing score; it
// publishes no question count. Each practice test is 50 single, choose-two,
// yes/no, matching and ordering items in 45 minutes with free navigation.
// Per test: data formats and stores 8, workloads and roles 6 (14); relational
// concepts and SQL 6, Azure SQL and open-source databases 6 (12); Azure
// Storage 5, Cosmos DB 4 (9); large-scale and real-time analytics 9, Power BI
// 6 (15). Sources: tools/next100/dp900/sources.md.
const minutes = (n: number) => n * 60;

const DOMAINS = [
  "dp900Data", "dp900Workloads",
  "dp900Relational", "dp900AzureSql",
  "dp900Storage", "dp900Cosmos",
  "dp900Analytics", "dp900PowerBI",
];

export const DP900: ExamV2Config = {
  id: "dp900",
  slug: "/dp-900",
  landingPath: "/dp-900-practice-test",
  name: "Microsoft DP-900 Practice Test",
  shortName: "DP-900",
  fullName: "Microsoft DP-900: Azure Data Fundamentals exam",
  tagline: "50 questions in 45 minutes on data formats, SQL, Azure SQL, Blob storage, Cosmos DB, Fabric, Databricks and Power BI, weighted to the DP-900 skills measured.",
  icon: "cloud",
  theme: { brand: "156 55% 14%", brandDark: "156 55% 10%", brandLight: "156 55% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "dp900",
      name: "DP-900 Azure Data Fundamentals",
      shortName: "DP-900",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(45) }],
      directions: "50 questions across the four DP-900 skill areas in 45 minutes. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: DOMAINS,
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    dp900Data: "Data Formats and Stores",
    dp900Workloads: "Workloads and Data Roles",
    dp900Relational: "Relational Concepts and SQL",
    dp900AzureSql: "Azure SQL and Open-Source Databases",
    dp900Storage: "Blob Storage, Files and Tables",
    dp900Cosmos: "Azure Cosmos DB",
    dp900Analytics: "Large-Scale and Real-Time Analytics",
    dp900PowerBI: "Power BI and Data Visualization",
  },
  drills: [
    { key: "data", name: "Data Formats and Stores", section: "dp900", domains: ["dp900Data"], blurb: "Structured, semi-structured, unstructured and vector data, CSV, JSON, XML, Parquet, Avro and Delta Lake, and which Azure store fits each use." },
    { key: "workloads", name: "Workloads and Roles", section: "dp900", domains: ["dp900Workloads"], blurb: "OLTP and ACID, analytical processing, data lakes, warehouses and lakehouses, the medallion layers, and the jobs of DBAs, data engineers and analysts." },
    { key: "relational", name: "Relational Concepts and SQL", section: "dp900", domains: ["dp900Relational"], blurb: "Tables, keys and normalization, DDL, DCL and DML statements, SQL dialects, views, stored procedures and indexes." },
    { key: "azuresql", name: "Azure SQL and Open Source", section: "dp900", domains: ["dp900AzureSql"], blurb: "SQL Server on Azure VMs, Azure SQL Managed Instance, Azure SQL Database options, and Azure Database for MySQL and PostgreSQL." },
    { key: "storage", name: "Azure Storage", section: "dp900", domains: ["dp900Storage"], blurb: "Block, page and append blobs, access tiers, Data Lake Storage Gen2, Azure Files over SMB and NFS, and Table storage keys." },
    { key: "cosmos", name: "Azure Cosmos DB", section: "dp900", domains: ["dp900Cosmos"], blurb: "Use cases, accounts, containers and partition keys, consistency levels, request units, and the NoSQL, MongoDB, Table, Cassandra and Gremlin APIs." },
    { key: "analytics", name: "Analytics and Real Time", section: "dp900", domains: ["dp900Analytics"], blurb: "Microsoft Fabric lakehouses, warehouses, pipelines, shortcuts and mirroring, Azure Databricks, batch and streaming, Real-Time Intelligence and Stream Analytics." },
    { key: "powerbi", name: "Power BI", section: "dp900", domains: ["dp900PowerBI"], blurb: "Power BI Desktop and the service, semantic models, fact and dimension tables, hierarchies, Direct Lake, and choosing the right visual." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Below the safe line",
    75: "Close to passing",
    80: "A safe margin over 700",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "45 min",
  copy: {
    heroSubs: [
      "Drill each skill area, then take a full test.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the DP-900 skills measured as of July 21, 2026. Not affiliated with Microsoft.",
    scoreNote: "Percent correct. Microsoft reports a scaled score from 1 to 1,000 with 700 to pass, which is not a fixed percent; aim for 80 percent here.",
  },
};
