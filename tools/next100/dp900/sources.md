# DP-900 sources

All items are original, written from Microsoft's public DP-900 study guide and the Microsoft Learn training modules and product documentation listed below. No item is copied or reworded from Microsoft's practice assessment (legacy or AI Skills Navigator), the exam sandbox, the module knowledge checks, any prep provider or any other bank. All pages fetched 2026-11-23.

## Outline
- **Study guide for Exam DP-900: Microsoft Azure Data Fundamentals**, Microsoft Learn, "Skills measured as of July 21, 2026" (page updated 2026-11-14), fetched 2026-11-23. https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900
  Skill areas: Describe core data concepts 25-30%; Identify considerations for relational data on Azure 20-25%; Describe considerations for working with non-relational data on Azure 15-20%; Describe an analytics workload 25-30%. Sub-areas: ways to represent data, options for data storage, common data workloads, roles; relational concepts (features, normalization, SQL statements, database objects), Azure SQL family and open-source database services; Azure Blob storage, Azure Files, Azure Table storage, Azure Cosmos DB use cases and APIs; large-scale analytics (ingestion and processing, analytical data stores, Azure Databricks and Microsoft Fabric), batch vs streaming and real-time services, Power BI capabilities, data models and visualizations. Change log: minor changes only (ways to represent data, Azure storage, real-time analytics). Passing score 700.

## Format
- **Microsoft Certified: Azure Data Fundamentals** certification page (Last Updated 07/21/2026, page updated 2026-11-13), fetched 2026-11-23. https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/
  45 minutes, proctored, interactive components possible, first retake after 24 hours, 13 languages (English, Japanese, Chinese Simplified, Korean, French, German, Spanish, Portuguese (Brazil), Russian, Indonesian, Arabic (Saudi Arabia), Chinese Traditional, Italian), Pearson VUE or Certiport, price by country. No retirement notice on the page or the study guide.
- **Exam scoring and score reports**, Microsoft Learn, linked from the study guide. https://learn.microsoft.com/en-us/credentials/certifications/exam-scoring-reports
  The study guide's link text says a score of 700 or greater is required to pass.
- Question count: Microsoft publishes none. Tigertest's tests are 50 in 45 minutes, like az900 and sc900; the landing says Microsoft gives no count.

## Training modules used for facts (DP-900T00 learning paths, units dated 2026-10-12)
- Explore core data concepts (data formats, file storage, databases, transactional and analytical processing), fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-core-data-concepts/
  Units 2 to 6: structured, semi-structured, unstructured and vector data; CSV, JSON, XML, BLOB, Parquet (columnar), Avro (row-based, JSON header), Delta Lake (Parquet plus transaction log); key-value, document, column family and graph databases; OLTP, CRUD and ACID; ETL and ELT, data lake, warehouse, lakehouse, semantic model, medallion bronze/silver/gold; Fabric, Databricks, Purview.
- Explore data roles and services, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-roles-responsibilities-world-of-data/
  Database administrator, data engineer, data analyst, AI engineer; Azure SQL, MySQL, PostgreSQL, Cosmos DB, Storage, Data Factory, Fabric, Power BI, Databricks, Stream Analytics, Data Explorer, Purview, Foundry.
- Explore fundamental relational data concepts, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-relational-data-offerings/
  Tables, NULL, data types, normalization, primary, foreign and composite keys, referential integrity; SQL dialects (T-SQL, PL/pgSQL, PL/SQL); DDL, DCL, DML statements; views, stored procedures, indexes.
- Explore relational database services in Azure, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-provision-deploy-relational-database-offerings-azure/
  SQL Server on Azure VMs (IaaS), Azure SQL Managed Instance, Azure SQL Database (single database, serverless, elastic pool, Hyperscale up to 128 TB, logical server); Azure Database for MySQL and PostgreSQL flexible server (LAMP, backups up to 35 days, 7 by default).
- Explore Azure Storage for nonrelational data, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-provision-deploy-non-relational-data-services-azure/
  Block, page and append blobs; hot, cool, cold, archive tiers; lifecycle policies; LRS, ZRS, GRS, GZRS; Data Lake Storage Gen2 hierarchical namespace and POSIX ACLs (upgrade is one-way); OneLake; Azure Files (SMB, NFS on SSD only, File Sync); Table storage (partition key, row key, timestamp, denormalized).
- Explore fundamentals of Azure Cosmos DB, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-non-relational-data-stores-azure/
  Account, database, container, item; 20 GB logical partitions; automatic indexing; multi-region writes; five consistency levels; RU/s; dedicated, shared, serverless, autoscale; APIs for NoSQL, MongoDB, Table, Apache Cassandra, Apache Gremlin (Cosmos DB for PostgreSQL on a retirement path).
- Explore fundamentals of large-scale analytics, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/examine-components-of-modern-data-warehouse/
  Fabric Lakehouse (SQL analytics endpoint), Fabric Warehouse (T-SQL), Fabric Data Factory pipelines and Dataflows Gen2, OneLake shortcuts, mirroring, Eventstream, notebooks; Azure Data Factory linked services; Databricks Lakeflow, SQL warehouses, Unity Catalog; star and snowflake schemas, schema-on-read.
- Explore fundamentals of real-time analytics, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-fundamentals-stream-processing/
  Batch vs stream (scope, size, latency, analysis), lambda and kappa; source, perpetual query, sink; Fabric Real-Time Intelligence (Eventstream, Eventhouse with KQL, Real-Time Dashboards, Activator, Real-Time hub), Azure Stream Analytics, Spark Structured Streaming, Event Hubs, IoT Hub.
- Explore fundamentals of data visualization, fetched 2026-11-23. https://learn.microsoft.com/en-us/training/modules/explore-fundamentals-data-visualization/
  Power BI Desktop, service and phone app; semantic models, measures, dimensions, hierarchies, star and snowflake schemas, import mode, Direct Lake; cards, bar, line, pie, scatter, map; smart narratives, key influencers, decomposition tree, Copilot (Q&A visual retiring February 2027).

## Product docs
- **Access tiers for blob data**, Azure Storage docs (updated 2026-11-17), fetched 2026-11-23. https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview
  Minimum days cool 30, cold 90, archive 180; archive offline with rehydration up to 15 hours; tiers only on block blobs; archive not on ZRS or GZRS; prorated early deletion.
- **Azure Database for MariaDB overview** (archived, previous-versions), fetched 2026-11-23. https://learn.microsoft.com/en-us/previous-versions/azure/mariadb/overview
  On the retirement path, migrate to Azure Database for MySQL. MariaDB is therefore not asked as a current service.

## Not confirmed or left out
- The newest tiers in the blob docs (Smart tier, Turbo tier in preview) are not in the DP-900 module and are not asked.
- Prices, free-tier allowances, SLA figures beyond the module's Cosmos DB 99.999%, Copilot licensing and preview features are left out.
- Fabric IQ (preview) is not asked.

## Copyright check
- Microsoft publishes no public DP-900 question catalogue. The practice assessments (legacy Learn and AI Skills Navigator) and the module assessments need sign-in and were never opened. Every item was written from the unit text and study guide above, with stems checked against the sibling banks (az900, sc900, az104, dataplus, pl900, gcdl, awsaif, ai901, snowpro, cloudplus) by sequence similarity and shared key-answer pairs; four close items were rewritten (ZRS definition, monthly-trend line chart, unstructured-data example, semi-structured definition).
