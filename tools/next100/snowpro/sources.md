# SnowPro Core Certification (COF-C03) sources

Every question is original, written from Snowflake's public COF-C03 exam page and the Snowflake documentation. No item is copied or reworded from Snowflake's study guide sample questions, the paid SnowPro Practice Exam: Core, any prep provider's or app's question set, or any other bank. Snowflake publishes no public question catalog, so there was nothing to run a similarity check against; prep-site question sets were not opened.

## Outline and format
- **SnowPro Core Certification (COF-C03)**, learn.snowflake.com, fetched 2026-11-22. https://learn.snowflake.com/en/certifications/snowpro-core-c03/
  The page's own data file (https://learn.snowflake.com/en/page-data/certifications/snowpro-core-c03/page-data.json, fetched 2026-11-22) carries the "Exam Details" tab: exam version COF-C03; 100 questions; multiple select and multiple choice; 115 minutes; English, Japanese, Korean, French, Spanish; registration fee 175 USD (140 USD in India); passing score 750 on a scaled score from 0 to 1000; unscored items may be included and are not identified, with extra time allowed for them; no prerequisites; online proctoring or onsite testing centers. Domain weights: 1.0 Snowflake AI Data Cloud Features & Architecture 31%; 2.0 Account Management and Data Governance 20%; 3.0 Data Loading, Unloading, and Connectivity 18%; 4.0 Performance Optimization, Querying, and Transformation 21%; 5.0 Data Collaboration 10%. The overview says the exam tests the ability to use the AI Data Cloud architecture, manage accounts and virtual warehouses, load, unload and transform data, use structured, semi-structured and unstructured data, monitor and optimize performance, enable data collaboration and protection, and establish connectivity. Candidate profile: 6 or more months of experience using Snowflake.
- **SnowPro Continuing Education**, fetched 2026-11-22. https://learn.snowflake.com/en/snowpro-continuing-education/
  All SnowPro certifications are valid for two years; recertification through the Continuing Education program; Snowflake does not extend expired certifications.

Could not be read: the COF-C03 study guide PDF with sub-objectives sits behind a lead form (Marketo) on the certification page, so the task-level outline was not read. The bank is written to the five official domain titles and weights above and the abilities listed on the page; COF-C02 (six domains) is not used. The landing says the weights come from the exam page.

## Snowflake documentation used for facts (all fetched 2026-11-22)
- **Understanding and using Time Travel**. https://docs.snowflake.com/en/user-guide/data-time-travel
  Default 1 day; Standard up to 1 day; Enterprise up to 90 days for permanent objects; transient and temporary 0 or 1 day; MIN_DATA_RETENTION_TIME_IN_DAYS effective retention is the greater value; AT and BEFORE with TIMESTAMP, OFFSET, STATEMENT; UNDROP and its same-name failure; cloning at a point in time; retention 0 turns Time Travel off and changed data still goes to Fail-safe for permanent tables.
- **Understanding and viewing Fail-safe**. https://docs.snowflake.com/en/user-guide/data-failsafe
  Non-configurable 7 days after Time Travel; not user-accessible; recovered by Snowflake Support, best effort.
- **Overview of warehouses**. https://docs.snowflake.com/en/user-guide/warehouses-overview
  Gen1 credits per hour X-Small 1 to 6X-Large 512; per-second billing with a 60-second minimum each start; resize while running affects only queued and new queries; auto-suspend and auto-resume on by default; multi-cluster needs Enterprise.
- **Multi-cluster warehouses**. https://docs.snowflake.com/en/user-guide/warehouses-multicluster
  Maximized vs auto-scale; Standard (default) and Economy policies, Economy's 6-minute rule; credits = size x clusters (Medium x 3 = 12 per hour).
- **Using persisted query results**. https://docs.snowflake.com/en/user-guide/querying-persisted-results
  24-hour retention reset on reuse, up to 31 days; reuse conditions (unchanged data, no RANDOM or UUID_STRING, same privileges).
- **Micro-partitions and data clustering**. https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions
  50 to 500 MB uncompressed; automatic, columnar; pruning, and no pruning on subquery predicates; clustering depth.
- **Preparing to load data**. https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare
  100 to 250 MB compressed files; parallelism; VARIANT limit now 128 MB (no question asks a size limit).
- **COPY INTO <table>**. https://docs.snowflake.com/en/sql-reference/sql/copy-into-table
  ON_ERROR defaults (ABORT_STATEMENT bulk, SKIP_FILE Snowpipe); VALIDATION_MODE; PURGE; FORCE; LOAD_UNCERTAIN_FILES and 64 days; MATCH_BY_COLUMN_NAME; transforms.
- **Snowpipe introduction**. https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro
  Serverless; 14-day pipe metadata vs 64 days for bulk; auto-ingest by cloud event notifications or REST insertFiles; same-name files skipped; credits per GB; Snowpipe Streaming for rows.
- **Choosing an internal stage for local files**. https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage
  User (@~), table (@%) and named stages; table stages have no transforms; named stages are grantable and can be altered or dropped; PUT.
- **COPY INTO <location>**. https://docs.snowflake.com/en/sql-reference/sql/copy-into-location
  CSV, JSON, Parquet unload; SINGLE; MAX_FILE_SIZE default 16 MB, max 5 GB; HEADER; OVERWRITE; PARTITION BY.
- **About Secure Data Sharing**. https://docs.snowflake.com/en/user-guide/data-sharing-intro
  No data copied; shareable objects (incl. dynamic tables); read-only; consumer pays compute, provider storage; one database per share; direct shares same region; reader accounts owned and paid by the provider, no DML.
- **About listings**. https://docs.snowflake.com/en/collaboration/collaboration-listings-about
  Private vs public; Marketplace; free, limited trial (1 to 90 days), paid; ACCOUNTADMIN or provider privileges.
- **Overview of access control**. https://docs.snowflake.com/en/user-guide/security-access-control-overview
  DAC, RBAC, UBAC (direct user grants count with secondary roles ALL); system roles incl. GLOBALORGADMIN replacing ORGADMIN; hierarchy ending at SYSADMIN; database roles; primary role owns new objects; managed access schemas.
- **Snowflake editions**. https://docs.snowflake.com/en/user-guide/intro-editions
  Enterprise: multi-cluster, 90-day Time Travel, materialized views, search optimization, query acceleration, periodic rekeying, masking, row access policies, ACCESS_HISTORY. Business Critical: Tri-Secret Secure, private connectivity, failover/failback, HIPAA, PCI DSS. VPS: dedicated metadata store and compute.
- **Working with resource monitors**. https://docs.snowflake.com/en/user-guide/resource-monitors
  ACCOUNTADMIN only; warehouses only (budgets for serverless); one warehouse-level monitor per warehouse; notify, suspend, suspend immediate; thresholds over 100%; cloud services 10% daily adjustment.
- **Introduction to streams**. https://docs.snowflake.com/en/user-guide/streams-intro
  Offset only; standard, append-only, insert-only; METADATA$ columns; offset advances on consuming DML; staleness and MAX_DATA_EXTENSION_TIME_IN_DAYS default 14.
- **Introduction to tasks**. https://docs.snowflake.com/en/user-guide/tasks-intro
  Serverless when WAREHOUSE is omitted; SCHEDULE and CRON; WHEN SYSTEM$STREAM_HAS_DATA; created suspended; EXECUTE TASK; overlapping scheduled runs skipped.
- **Dynamic tables**. https://docs.snowflake.com/en/user-guide/dynamic-tables-about
  TARGET_LAG and DOWNSTREAM; refresh on a warehouse; not for data fresher than 60 seconds.
- **Query acceleration service**. https://docs.snowflake.com/en/user-guide/query-acceleration-service
  Enterprise; large scans with selective filters; scale factor default 8, 0 removes the cap; serverless billing.
- **Search optimization service**. https://docs.snowflake.com/en/user-guide/search-optimization-service
  Enterprise; selective point lookups, substring, VARIANT fields; background maintenance billed for storage and compute.
- **Working with materialized views**. https://docs.snowflake.com/en/user-guide/views-materialized
  Enterprise; single table, no joins, window functions, HAVING, ORDER BY or LIMIT; background maintenance; when to use.
- **Introduction to unstructured data**. https://docs.snowflake.com/en/user-guide/unstructured-intro
  Scoped URL (creator only, 24 hours), file URL, pre-signed URL; directory tables; SNOWFLAKE_SSE needed for URL access to internal stages.
- **Account Usage**. https://docs.snowflake.com/en/sql-reference/account-usage
  Dropped objects, 45 minutes to 3 hours latency, 1 year retention vs INFORMATION_SCHEMA; SNOWFLAKE database roles or IMPORTED PRIVILEGES.
- **Cloning considerations**. https://docs.snowflake.com/en/user-guide/object-clone
  Child grants kept but not the container's; tasks suspended; unconsumed stream records inaccessible.
- **Understanding Column-level Security**. https://docs.snowflake.com/en/user-guide/security-column-intro
  Masking at query time; Enterprise; IS_ROLE_IN_SESSION; conditional masking; external tokenization through external functions; direct policy beats tag-based policy.

## Left out on purpose
- Fees, credit prices and per-region pricing; anything about the exam itself (count, time, pass mark) is on the landing only.
- Size limits that changed recently (VARIANT 16 MB raised to 128 MB) and features only in preview or not available in every region (Gen2 and adaptive warehouses, internal-stage auto-ingest).
- Cortex model names and per-function details, which change often; AI items ask only what Cortex AI Functions, Cortex Search and Cortex Analyst are for.
- ORGADMIN-specific tasks, since Snowflake is phasing ORGADMIN out for GLOBALORGADMIN.
