# Google Cloud Professional Cloud Architect (gcppca) sources

Every question and all four case studies are original, written for Tigertest from the official
exam guide and Google Cloud's own product documentation. No Google sample questions, no case study
text, no prep-site questions and no exam dumps were used, reworded or not.

## Outline

- Professional Cloud Architect Certification exam guide, Google Cloud
  (https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf),
  fetched 2026-11-13. The version in force on the build date: it names Gemini Enterprise Agent
  Platform, Agent Platform Pipelines, Model Garden, the AI Hypercomputer, Gemini Cloud Assist and
  the v6.1 case studies. Sections and weights: 1 Designing and planning a cloud solution
  architecture ~25% (1.1 to 1.5), 2 Managing and provisioning a cloud solution infrastructure
  ~17.5% (2.1 to 2.5), 3 Designing for security and compliance ~17.5% (3.1, 3.2), 4 Analyzing and
  optimizing technical and business processes ~15% (4.1, 4.2), 5 Managing implementation ~12.5%
  (5.1, 5.2), 6 Ensuring solution and operations excellence ~12.5% (6.1 to 6.6). Every item's
  `skill` maps to a bullet there. The guide states that familiarity with the Google Cloud
  Well-Architected Framework is a key requirement.
- Case studies listed in that guide (v6.1, links in the guide): Altostrat Media, Cymbal Retail,
  EHR Healthcare and KnightMotives Automotive. One was read only to learn the layout (company
  overview, solution concept, existing technical environment, business requirements, technical
  requirements, executive statement). None of their text, companies or requirements are used: the
  four Tigertest cases (Larkspur Freight, Pinecrest Clinics, Brightwave Learning, Harborline Bank,
  all fictional) are original, in tools/gcppca/stimuli.json.
- Google Cloud Well-Architected Framework, operational excellence pillar
  (https://docs.cloud.google.com/architecture/framework/operational-excellence), fetched
  2026-11-13: the five core principles used in pcaOps (ensure operational readiness and
  performance using CloudOps, manage incidents and problems, manage and optimize cloud resources,
  automate and manage change, continuously improve and innovate).

## Format

- Certification page (https://cloud.google.com/learn/certification/cloud-architect), fetched
  2026-11-13: standard exam 2 hours, 50 to 60 multiple choice and multiple select questions,
  200 USD plus tax, English and Japanese, online-proctored or at a test center, valid 2 years, no
  prerequisites, 3+ years of industry experience recommended including 1+ year on Google Cloud.
  "Each exam includes 2 case studies. Case study questions make up 20-30% of the exam" and can be
  viewed on a split screen. Renewal exam: 1 hour, 100 USD, 25 questions, one generative AI case
  study (not modelled). No numeric passing score is published (pass or fail only).
- Modelled: two 60-item tests (the real maximum) in 120 minutes, 15/10/11/9/8/7 by section, each
  with two Tigertest case studies of 7 questions (14 of 60, 23%), 8 "Choose two" items per test.
  Section 1 is split into two drills (requirements; network, storage, compute and migration) and
  section 2 into two (provisioning; AI and ML with Agent Platform), so 8 drills.

## Product facts (Google Cloud documentation, checked 2026-11-13)

Product names follow the exam guide: Gemini Enterprise Agent Platform (formerly Vertex AI) and
Agent Platform Pipelines (formerly Vertex AI Pipelines), Cloud Run functions (formerly Cloud
Functions), Chrome Enterprise Premium (formerly BeyondCorp Enterprise), Google Cloud Observability.
Facts used, each from Google Cloud's own product documentation: regional managed instance groups
and autohealing; Cloud SQL high availability, point-in-time recovery and cross-region replicas;
Spot VMs can be stopped at any time; committed use discounts for steady use; sole-tenant nodes for
per-core licensing; Shared VPC, VPC Network Peering (not transitive), Private Service Connect,
Private Google Access, Cloud NAT, Cloud Router, Dedicated and Partner Interconnect, HA VPN,
Cross-Cloud Interconnect, Network Connectivity Center, Cloud DNS forwarding zones; load balancer
types; Cloud Armor; Cloud Storage classes, Object Lifecycle Management, retention policies and
Bucket Lock, dual-region buckets, public access prevention; Filestore; Bigtable row key design;
AlloyDB; Spanner; Memorystore; BigQuery partitioning, clustering, BigLake and external tables,
capacity-based pricing; Pub/Sub and Dataflow; Migration Center, Migrate to Virtual Machines,
Database Migration Service, Storage Transfer Service, Transfer Appliance; Google Cloud VMware
Engine; GKE Autopilot, VPC-native clusters, Horizontal Pod Autoscaler, cluster autoscaler; Cloud
Run minimum instances, Direct VPC egress, Cloud Run jobs; VM Manager patching; IAM predefined and
custom roles, conditions, service account impersonation (Token Creator), Workload Identity
Federation; organization policy constraints (resource locations, service account key creation,
VM external IP access); hierarchical firewall policies; VPC Service Controls; Cloud KMS, CMEK,
Cloud HSM, Cloud EKM; Secret Manager; Identity-Aware Proxy; Binary Authorization; Cloud Audit Logs
(Admin Activity always on, Data Access off by default for most services), aggregated sinks and Log
Analytics; Access Transparency and Access Approval; Assured Workloads; Compliance Reports Manager;
Sensitive Data Protection; Model Armor; Agent Platform private endpoints; Model Garden; Cloud TPUs
and the AI Hypercomputer, Dynamic Workload Scheduler; Document AI, Speech-to-Text, Cloud Vision,
Video Intelligence; Gemini Enterprise and NotebookLM; Cloud Deploy, Cloud Build, Artifact Registry;
Apigee policies (Quota, SpikeArrest, ResponseCache) and API Gateway; Cloud Shell, Cloud Code,
gcloud, gcloud storage, bq; local emulators for Pub/Sub, Bigtable, Spanner and Firestore;
Terraform with a Cloud Storage backend and Infrastructure Manager; Cloud Client Libraries,
Application Default Credentials and exponential backoff; Ops Agent, Cloud Profiler, Error
Reporting, uptime checks, log-based metrics, Managed Service for Prometheus; Cloud Run revision
traffic rollback; customers may penetration test their own deployments without notifying Google,
under the acceptable use policy. HIPAA needs a Business Associate Agreement and covered products.

## Could not be confirmed, and how the copy words it

- Google publishes no passing score: the goal picker's 70 is "around the likely passing line" and
  the copy says Google reports only pass or fail.
- The exam guide PDF carries no date; the version is identified by its product names and the v6.1
  case study files it links.

## Deliberately left out

Prices, discount percentages and SLA numbers; support plan tiers; storage minimum durations;
renewal exam content; App Engine; any product renamed in 2026 whose new name could not be
confirmed (for example Dataproc's), so those products are not asked about.
