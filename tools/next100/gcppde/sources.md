# Google Cloud Professional Data Engineer (gcppde) sources

Every question is original, written for Tigertest from the official exam guide and Google Cloud's
own product documentation. No Google sample questions, no prep-site questions, no course quizzes
and no exam dumps were used, reworded or not.

## Outline

- Professional Data Engineer Certification exam guide, Google Cloud
  (https://services.google.com/fh/files/misc/professional_data_engineer_exam_guide_english.pdf),
  fetched 2026-11-23 (the guide the certification page links as the standard exam guide). The PDF
  carries no date; it is the version that names BigQuery sharing (Analytics Hub), BigLake, AlloyDB,
  Dataplex Catalog, AI data enrichment, prompting LLMs for query generation, embeddings and RAG.
  Sections and weights: 1 Designing data processing systems ~22% (1.1 security and compliance, 1.2
  reliability and fidelity, 1.3 flexibility and portability, 1.4 data migrations); 2 Ingesting and
  processing the data ~25% (2.1 planning, 2.2 building, 2.3 deploying and operationalizing); 3
  Storing the data ~20% (3.1 selecting storage, 3.2 data warehouse, 3.3 data lake, 3.4 data
  platform); 4 Preparing and using data for analysis ~15% (4.1 visualization, 4.2 AI and ML, 4.3
  sharing); 5 Maintaining and automating data workloads ~18% (5.1 to 5.5). Every item's `skill`
  maps to a bullet there. The guide has no case studies, so the bank has none.
- Certification page (https://cloud.google.com/learn/certification/data-engineer), fetched
  2026-11-23: standard exam 2 hours, 40 to 50 multiple choice and multiple select questions,
  200 USD plus tax, English and Japanese, online-proctored or onsite-proctored, valid 2 years, no
  prerequisites, 3+ years of industry experience recommended including 1+ year designing and
  managing data solutions on Google Cloud. Renewal exam: 1 hour, 20 questions, 100 USD (not
  modelled). No numeric passing score is published (pass or fail only).
- Google's sample questions are a 28-page Google Form linked from that page. Only its introduction
  was opened (the questions sit behind "Next" and are not readable by automated fetch), and no item
  was written from it, so no similarity check against it was possible or needed.

## Format modelled

- Two 50-item practice tests (the real maximum) in 120 minutes, free navigation, Test 2 held out.
  Per test 11/13/10/7/9 by section (22/25/20/15/18% of 50, rounded): section 1 split into
  pdeSecurity 5 (1.1) and pdeDesign 6 (1.2 to 1.4); section 2 into pdeBatch 7 and pdeStream 6;
  section 3 into pdeStorage 5 (3.1) and pdeWarehouse 5 (3.2 to 3.4); pdeAnalysis 7; pdeOps 9.
  Eight "Choose two" items per test (one per drill domain), the rest single answer: the two types the certification page
  names. 100 drill-only items; 8 drills.

## Product facts (Google Cloud documentation, fetched 2026-11-23)

- Pub/Sub subscription properties
  (https://docs.cloud.google.com/pubsub/docs/subscription-properties): retention 7 days by default
  (10 minutes to 31 days), ack deadline 10 s default (10 to 600 s), ordering per ordering key in a
  region, dead-letter topics with 5 to 100 delivery attempts (default 5), filters on attributes only
  and fixed once set, seek and retain acknowledged messages.
- Pub/Sub BigQuery subscriptions (https://docs.cloud.google.com/pubsub/docs/bigquery): writes
  messages straight to a table; Dataflow recommended for complex transformation.
- Dataflow streaming pipelines
  (https://docs.cloud.google.com/dataflow/docs/concepts/streaming-pipelines): tumbling, hopping and
  session windows, watermarks, late data, triggers on event time, processing time and element count.
- Stopping a Dataflow pipeline (https://docs.cloud.google.com/dataflow/docs/guides/stopping-a-pipeline):
  cancel vs drain, drain closes windows and fires triggers, updating jobs, snapshots.
- BigQuery time travel and fail-safe (https://docs.cloud.google.com/bigquery/docs/time-travel):
  window 2 to 7 days, 7 by default; fail-safe 7 more days, not configurable, recovered through Cloud
  Customer Care.
- BigQuery partitioned tables (https://docs.cloud.google.com/bigquery/docs/partitioned-tables):
  partition types, expiration, partitioning vs clustering, cost estimates.
- BigQuery editions (https://docs.cloud.google.com/bigquery/docs/editions-intro): Standard has no
  BigQuery ML, BI Engine, fine-grained security or commitments; idle slot sharing on Enterprise and
  Enterprise Plus; managed disaster recovery on Enterprise Plus.
- BigQuery reservations (https://docs.cloud.google.com/bigquery/docs/reservations-intro):
  on-demand bytes vs capacity slots, baseline and autoscaling slots.
- BigQuery materialized views (https://docs.cloud.google.com/bigquery/docs/materialized-views-intro):
  background refresh, smart tuning, max_staleness.
- BigQuery dynamic data masking
  (https://docs.cloud.google.com/bigquery/docs/column-data-masking-intro): masking rules including
  last four characters, Masked Reader vs Fine-Grained Reader, first role up the tag hierarchy.
- BigQuery sharing (https://docs.cloud.google.com/bigquery/docs/analytics-hub-introduction): formerly
  Analytics Hub; read-only linked datasets, no copy, subscribers pay for queries, egress controls.
- BigQuery vector search (https://docs.cloud.google.com/bigquery/docs/vector-search-intro):
  VECTOR_SEARCH, RAG in BigQuery, remote model inference in Agent Platform.
- Bigtable schema design (https://docs.cloud.google.com/bigtable/docs/schema-design): avoid
  timestamp-first and sequential keys, reversed domains, single-row transactions, garbage collection
  per column family.
- Spanner schema design (https://docs.cloud.google.com/spanner/docs/schema-design): monotonic keys
  hotspot, UUID version 4, interleaving.
- Datastream overview (https://docs.cloud.google.com/datastream/docs/overview): serverless CDC from
  MySQL, PostgreSQL, Oracle, SQL Server and others into BigQuery or Cloud Storage.
- Cloud Storage classes (https://docs.cloud.google.com/storage/docs/storage-classes): minimum
  durations 30, 90 and 365 days, retrieval fees, Autoclass, Archive readable in milliseconds.
- Sensitive Data Protection transformations
  (https://docs.cloud.google.com/sensitive-data-protection/docs/transformations-reference):
  redaction, replacement, masking, deterministic and format-preserving encryption, crypto hash,
  bucketing, date shifting, time extraction.
- Dataform overview (https://docs.cloud.google.com/dataform/docs/overview): SQLX, assertions,
  incremental tables, Git, release and workflow configurations.
- Managed Service for Apache Airflow overview
  (https://docs.cloud.google.com/composer/docs/composer-3/composer-overview): managed Airflow,
  environment bucket for DAGs, schedulers, triggerers and workers.

## Product names as of November 2026 (checked 2026-11-23)

- Dataproc is now Managed Service for Apache Spark (Google Cloud blog, June 4 2026,
  https://cloud.google.com/blog/products/data-analytics/enhancements-to-managed-service-for-apache-spark-clusters/),
  covering both cluster and serverless deployments.
- Cloud Composer is now Managed Service for Apache Airflow (product page and docs above).
- Dataplex Universal Catalog is now Knowledge Catalog
  (https://docs.cloud.google.com/knowledge-catalog/docs/transition-dataplex-universal-catalog);
  APIs, gcloud and IAM roles keep the dataplex name.
- Vertex AI is now Agent Platform (Gemini Enterprise Agent Platform), as the BigQuery docs above
  name it; Cloud DLP is part of Sensitive Data Protection; Analytics Hub is BigQuery sharing.
- Dataflow, Pub/Sub, BigQuery, Bigtable, Spanner, Cloud SQL, AlloyDB, Firestore, Memorystore,
  Datastream, Cloud Data Fusion and Looker keep their names. The exam guide still uses the old
  names, so explanations say "formerly ..." the first time a renamed product appears.

## Could not be confirmed, and how the copy words it

- Google publishes no passing score: the goal picker's 70 is "around the likely passing line" and
  the copy says Google reports only pass or fail.
- The guide carries no revision date; it is identified by the products it names.

## Deliberately left out

Prices, discount percentages and SLA numbers; partition and quota limits; storage minimum durations
beyond the three Cloud Storage classes; Dataplex lakes, zones and assets (their 2026 naming under
Knowledge Catalog could not be confirmed); renewal exam content.
