# AWS Solutions Architect Associate (awssaa) sources

- AWS Certified Solutions Architect - Associate (SAA-C03) exam guide, AWS documentation
  (https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html),
  checked 2026-10-30: 65 questions (50 scored, 15 unscored), multiple choice and multiple response,
  scaled 100 to 1000, 720 to pass, compensatory scoring. Domains: Design Secure Architectures 30%,
  Design Resilient Architectures 26%, Design High-Performing Architectures 24%, Design
  Cost-Optimized Architectures 20%, with task statements 1.1-1.3, 2.1-2.2, 3.1-3.5, 4.1-4.4.
- AWS certification page (https://aws.amazon.com/certification/certified-solutions-architect-associate/),
  checked 2026-10-30: 130 minutes, 150 USD, exam guide links still point to SAA-C03. No successor
  (SAA-C04) announced by AWS; third-party "SAA-C04" pages were not corroborated by any AWS source.
- Service facts as of 2026 from AWS product documentation: S3 storage classes and minimum durations,
  S3 default SSE-S3 (Jan 2023), Object Lock modes, EBS volume types (gp3, io2 Block Express, st1, sc1),
  Aurora Global Database and Serverless v2, RDS Multi-AZ DB cluster, DynamoDB global tables, PITR,
  Standard-IA table class, SQS visibility/delay/long polling/DLQ, Amazon Data Firehose and Managed
  Service for Apache Flink (2024 renames), IAM Roles Anywhere, Organizations RCPs and centralized root
  access (Nov 2024), Backup Vault Lock, EBS Snapshots Archive, Fargate Spot, S3 Express One Zone.

Deliberately avoided (changed or retired 2024-2026, or uncertain): Snowcone/Snowmobile and Snowball
as a key, QLDB, FSx File Gateway, App Runner, QuickSight, exact SQS message size, exact gp3 maxima,
the number of Aurora Global Database secondary Regions, Database Savings Plans.

Blueprint per 65-item test: secure 19 (saaAccess 7, saaWorkloads 6, saaData 6), resilient 17
(saaDecoupling 9, saaAvailability 8), high-performing 16 (saaStorageCompute 8, saaDataNetwork 8),
cost 13 (saaCost). 8 choose-two items per test. Drill-only items: 70.

Review 2026-10-30: Timestream for LiveAnalytics closed to new customers June 2025 (item replaced with
DocumentDB); NAT gateway regional availability mode (Nov 2025) noted, so the NAT resilience item now
says "zonal"; Database Savings Plans (Dec 2025, one-year term) noted in the RDS RI explanation; exam guide
revisions page lists SAA-C03 v1.1 (Oct 29, 2026), so SAA-C03 is still current. Eight stems that
paraphrased Cloud Practitioner items were rewritten to new scenarios.
