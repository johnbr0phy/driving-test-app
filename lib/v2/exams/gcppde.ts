import { ExamV2Config } from "../types";
import { percentScale, overallPercent } from "../scales";

// Google Cloud Professional Data Engineer. Certification page
// (cloud.google.com/learn/certification/data-engineer, checked 2026-11-23):
// 2 hours, 40 to 50 multiple choice and multiple select questions, 200 USD,
// English and Japanese, online or onsite proctored, valid 2 years, no
// prerequisites. Exam guide (professional_data_engineer_exam_guide_english.pdf,
// the version naming BigQuery sharing, BigLake, AlloyDB, embeddings and RAG):
// Section 1 Designing data processing systems ~22%, 2 Ingesting and
// processing the data ~25%, 3 Storing the data ~20%, 4 Preparing and using
// data for analysis ~15%, 5 Maintaining and automating data workloads ~18%.
// No case studies. Google publishes no passing score. Each practice test is
// 50 items in 120 minutes (the real maximum and time): 11/13/10/7/9 by
// section, split into eight drills (sections 1, 2 and 3 in two each), so the
// dashboard has 10 steps; 8 "Choose two" items per test. Product names as of
// November 2026: Managed Service for Apache Spark (formerly Dataproc),
// Managed Service for Apache Airflow (formerly Cloud Composer), Knowledge
// Catalog (formerly Dataplex Universal Catalog), Agent Platform (formerly
// Vertex AI).
const minutes = (n: number) => n * 60;

export const GCPPDE: ExamV2Config = {
  id: "gcppde",
  slug: "/google-cloud-professional-data-engineer",
  landingPath: "/google-cloud-professional-data-engineer-practice-test",
  name: "Google Cloud Professional Data Engineer Practice Test",
  shortName: "Google PDE",
  fullName: "Google Cloud Professional Data Engineer exam",
  tagline: "50 scenario questions in 2 hours with choose-two items, weighted to the current exam guide.",
  icon: "cloud",
  theme: { brand: "220 10% 26%", brandDark: "220 10% 19%", brandLight: "220 10% 96%" },
  breakSeconds: 0,
  sections: [
    {
      key: "pde",
      name: "Professional Data Engineer",
      shortName: "PDE",
      modules: [{ module: 1, questionCount: 50, timeLimit: minutes(120) }],
      directions: "50 questions across the five exam guide sections in 2 hours. Multiple select items say how many to choose. Flag questions and come back to them.",
      scale: percentScale(50),
      domains: ["pdeSecurity", "pdeDesign", "pdeBatch", "pdeStream", "pdeStorage", "pdeWarehouse", "pdeAnalysis", "pdeOps"],
    },
  ],
  tests: [
    { number: 1, name: "Practice Test 1" },
    { number: 2, name: "Practice Test 2", heldOut: true },
  ],
  domainLabels: {
    pdeSecurity: "Security and Compliance",
    pdeDesign: "Reliability, Portability and Migration",
    pdeBatch: "Building Batch Pipelines",
    pdeStream: "Streaming with Pub/Sub and Dataflow",
    pdeStorage: "Selecting Storage",
    pdeWarehouse: "Warehouse, Lake and Data Platform",
    pdeAnalysis: "Analysis, ML and Sharing",
    pdeOps: "Maintaining and Automating Workloads",
  },
  drills: [
    { key: "security", name: "Security and Compliance", section: "pde", domains: ["pdeSecurity"], blurb: "IAM for BigQuery, organization policies, CMEK and Cloud KMS, Sensitive Data Protection, data residency and dev vs prod." },
    { key: "design", name: "Reliability, Portability and Migration", section: "pde", domains: ["pdeDesign"], blurb: "Dataform and Data Fusion, data validation, ACID choices, time travel, Knowledge Catalog, transfer and migration services." },
    { key: "batch", name: "Building Batch Pipelines", section: "pde", domains: ["pdeBatch"], blurb: "Choosing Dataflow, Spark or SQL, networking and encryption, dead-letter outputs, side inputs, Airflow DAGs and CI/CD." },
    { key: "stream", name: "Streaming with Pub/Sub and Dataflow", section: "pde", domains: ["pdeStream"], blurb: "Windows, watermarks, late data and triggers, delivery and ordering, dead-letter topics, Kafka, Storage Write API, drain and update." },
    { key: "storage", name: "Selecting Storage", section: "pde", domains: ["pdeStorage"], blurb: "BigQuery, Bigtable, Spanner, AlloyDB, Cloud SQL, Firestore and Memorystore by access pattern, row keys, storage classes and lifecycle." },
    { key: "warehouse", name: "Warehouse, Lake and Data Platform", section: "pde", domains: ["pdeWarehouse"], blurb: "Star schemas and grain, nested fields, partitioning and clustering, BigLake, lake layers, lineage, glossaries and federated governance." },
    { key: "analysis", name: "Analysis, ML and Sharing", section: "pde", domains: ["pdeAnalysis"], blurb: "Materialized views and BI Engine, slow queries, masking and row policies, BigQuery ML, embeddings and RAG, BigQuery sharing." },
    { key: "ops", name: "Maintaining and Automating Workloads", section: "pde", domains: ["pdeOps"], blurb: "Ephemeral vs persistent clusters, editions and reservations, monitoring and quotas, idempotent reruns, replication and recovery." },
  ],
  composite: { name: "Percent correct", min: 0, max: 100, combine: overallPercent },
  defaultGoal: 80,
  goalChoices: [70, 75, 80, 85, 90],
  goalNotes: {
    70: "Around the likely passing line",
    75: "Passing with a little room",
    80: "A safe margin",
    85: "A strong margin",
    90: "Top band",
  },
  testLength: "2 hr",
  copy: {
    heroSubs: [
      "Eight drills, two practice tests. Start with Security and Compliance.",
      "Master each drill first.",
      "Take Practice Test 1 to see your score.",
      "Hit your goal on both practice tests.",
      "Goal hit on both practice tests.",
    ],
    sourceLine: "Weighted to the Google Cloud Professional Data Engineer exam guide. Product names as of November 2026. Not affiliated with Google.",
    scoreNote: "Percent correct. Google reports only pass or fail and does not publish a passing score; aim for 80 percent here.",
  },
};
