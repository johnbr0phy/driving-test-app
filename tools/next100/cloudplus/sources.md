# CompTIA Cloud+ sources

Every question in `data/v2/cloudplus/questions.json` is original, written for Tigertest from the
exam objectives and the reference pages below. No CompTIA CertMaster item, official sample
question, past exam item, prep provider question, "brain dump" or leaked material was used or
reworded. The objectives document lists topics only (no questions), and the bank was written
from those topic bullets. CompTIA publishes no question catalogue for Cloud+, so there was no
public catalogue to run a similarity check against; instead every item was compared with the
sibling Tigertest banks (see "Repeats" below).

## Exam outline (objectives)

- CompTIA Cloud+ CV0-004 V4 Certification Exam Objectives, Exam Objectives Document Version 5.0
  (PDF, CompTIA's own file host, 17 pages)
  https://lecbyo.files.cmp.optimizely.com/download/1caf96e2bef111efba33a6b3d2c966cf
  fetched 2026-11-23 (read in full). Test details: maximum of 90 questions, multiple-choice and
  performance-based, 90 minutes, passing score 750, recommended 2 to 3 years of hands-on
  experience as a systems administrator or cloud engineer with Network+ and Server+ or equivalent
  knowledge. Domains: 1.0 Cloud Architecture 23%, 2.0 Deployment 19%, 3.0 Operations 17%,
  4.0 Security 19%, 5.0 DevOps Fundamentals 10%, 6.0 Troubleshooting 12%. Objectives 1.1 (IaaS,
  PaaS, SaaS, FaaS, shared responsibility), 1.2 (region, availability zone, cloud bursting, edge
  computing, availability monitoring; RTO, RPO, hot, warm and cold sites; multicloud tenancy),
  1.3 (VPN and dedicated connections; application and network load balancers, application
  gateway, CDN, firewalls, VPC peering and transit gateway, subnets, VLAN, SDN, BGP, static routes,
  route tables), 1.4 (hot, warm, cold and archive tiers; SSD and HDD; object, block and file
  storage; performance and cost), 1.5 (managed services, microservices, loose coupling, fan-out,
  service discovery), 1.6 (stand-alone containers, orchestration, port mapping, persistent and
  ephemeral storage, image registries), 1.7 (clustering, cloning, host affinity, hardware
  pass-through, overlay and VM networks, local, SAN and NAS storage), 1.8 (dedicated host,
  reserved, pay-as-you-go and spot billing; metering, tagging, rightsizing), 1.9 (relational and
  non-relational; self-managed and provider-managed), 1.10 (VM, container and serverless compute;
  latency, throughput, IOPS), 1.11 (text and visual recognition, translation, sentiment,
  voice-to-text, text-to-voice, generative AI; IoT sensors and gateways), 2.1 (public, private,
  hybrid, community), 2.2 (blue-green, canary, rolling, in-place), 2.3 (on-premises to cloud,
  cloud to on-premises, cloud to cloud; resource allocation; storage, compatibility, compute,
  cost, networking, overhead, availability, lock-in, power and cooling, regulatory and compliance
  considerations; rehost, replatform, re-architect, retain, retire, refactor), 2.4 (IaC, CaC,
  variables, conditionals, operators, data types, functions, testing, documentation, JSON, YAML,
  repeatability, drift detection, versioning), 2.5 (provisioning against storage, performance,
  security, cost, availability, compliance, network and compute requirements), 3.1 (log
  collection, aggregation, retention; tracing; metrics; alert triage and response), 3.2
  (trending, load and event triggers; scheduled and manual; horizontal and vertical), 3.3 (full,
  incremental, differential; on-site and off-site; schedule, retention, replication, encryption,
  recoverability and integrity testing; in-place and parallel recovery; bulk and granular), 3.4
  (patches, major and minor updates, testing, ephemeral and persistent data, end of life and end
  of support), 4.1 (scope, identification, assessment, remediation; CVEs), 4.2 (sovereignty,
  ownership, locality, classification, litigation hold, contractual and regulatory retention;
  SOC 2, PCI DSS, ISO 27001, Cloud Security Alliance), 4.3 (API, SDK, CLI and web portal access;
  SSH, RDP, bastion host; local, SAML federation, token, directory, MFA, OpenID Connect; RBAC,
  group-based, OAuth 2.0, discretionary; audit trail), 4.4 (Zero Trust, CIS and vendor benchmarks,
  secrets management, API security, least privilege, privileged and unprivileged containers,
  hardening, patching, encryption in transit and at rest, object and file storage security), 4.5
  (endpoint protection, DLP, IPS/IDS, DDoS protection, IAM policies, network ACL, WAF, network
  security group), 4.6 (event monitoring, baseline deviation, unnecessary open ports, human error,
  outdated software, phishing, ransomware, DDoS, cryptojacking, zombie instances, metadata), 5.1
  (version management, code review, pull request, push, commit, merge, branch management), 5.2
  (automation, integration, deployment, build, testing, security, workflow, VM and container
  images, RPM, Debian, ZIP and tar packages, flat files, public and private repositories), 5.3
  (event-driven architectures, REST, SOAP, RPC, WebSockets, GraphQL), 5.4 (Ansible, Docker, ELK,
  Git, GitHub Actions, Grafana, Jenkins, Kubernetes, Terraform), 6.1 (incompatibility, resource
  allocation, permission issues, oversubscription, sizing, outdated definitions, deprecation, full
  and partial outages, API throttling, service quotas, regional availability), 6.2 (DHCP, DNS,
  NTP, NAT, HTTP status codes, latency, bandwidth, device misconfiguration, protocol
  incompatibility and deprecation, scope exhaustion, network overlap, missing and misconfigured
  routes, VLAN tags, access and trunk ports), 6.3 (cipher suite deprecation, privilege
  escalation, unauthorized access, leaked credentials, software vulnerabilities, unauthorized
  software). Every bullet was mapped to the ten drill domains.
- CompTIA Cloud+ certification page
  https://www.comptia.org/en-us/certifications/cloud/
  fetched 2026-11-23. Exam version V4, exam series code CV0-004, launch date September 24, 2024,
  retirement "usually three years after launch" (estimated 2027), up to 90 multiple-choice and
  performance-based questions, 90 minutes, passing score 750 on a scale of 100 to 900, English and
  Japanese, about 2 to 3 years of hands-on experience as a systems administrator or cloud
  engineer recommended, the same six domain weights. No newer version is announced on the page.

## Exam history and what comes next

- CompTIA Cloud+ CV0-005 V5 DRAFT Exam Objectives, Draft Document Version 1.2 (PDF, CompTIA's own
  file host)
  https://lecbyo.files.cmp.optimizely.com/download/bc423452755311f18d10be1a1c935827
  fetched 2026-11-23. A draft for the next version: question count, length and passing score
  "TBD"; draft domains 1.0 Architecture and Design 16%, 2.0 Life-cycle Management 17%,
  3.0 Operations 21%, 4.0 Security 20%, 5.0 Governance, Risk, and Compliance 12%, 6.0 Artificial
  Intelligence 14%. No launch date was found. The bank stays on CV0-004, the exam in use; a
  freshness entry in `lib/examFreshness.json` flags the rebuild when V5 launches. The V5 draft
  was read only for that date note, not to write questions.

## Reference pages for facts used in explanations

- NIST SP 800-145, The NIST Definition of Cloud Computing
  https://csrc.nist.gov/pubs/sp/800/145/final
  checked 2026-11-23: five essential characteristics, three service models (SaaS, PaaS, IaaS)
  and four deployment models (private, community, public, hybrid).
- Docker documentation, Port publishing and mapping
  https://docs.docker.com/engine/network/port-publishing/
  checked 2026-11-23: in -p HOST:CONTAINER the host port is first (the docker run item).
- RFC 6585, Additional HTTP Status Codes (429 Too Many Requests)
  https://www.rfc-editor.org/rfc/rfc6585
  checked 2026-11-23: 429 means the client sent too many requests in a given time (rate limiting),
  the API throttling item.
- Kubernetes documentation, Ephemeral Volumes
  https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/
  checked 2026-11-23: ephemeral volumes are created and deleted with the Pod, unlike persistent
  volumes (the container storage items).

General cloud practice (HTTP 401, 403, 502 and 503 meanings, OAuth 2.0 and OpenID Connect roles,
SAML identity and service providers, backup restore chains, CIDR address counts) follows the
standards' well-known definitions; every computed key (432 minutes, 8,192 addresses, 1,500 IOPS,
2 hours, 4 batches, 2,000 requests, 10 and 3 instances, 1,800 GB, 8 vCPUs, 6 and 2 backup sets) is
recomputed with an assert at the top of its source file.

## Format modelled

Two practice tests of 90 questions in 90 minutes, the real maximum length and time, with free
navigation and the calculator; Practice Test 2 is held out of the drills. Per test, by the
objectives' weights: service models, availability and networking 11 and storage, containers,
virtualization, cost and design 10 (architecture 21 of 90, 23%); deployment models, strategies
and migration 9 and code and provisioning 8 (deployment 17, 19%); observability and scaling 8
and backup and life cycle 7 (operations 15, 17%); vulnerability, compliance and identity 9 and
security practices, controls and attacks 8 (security 17, 19%); DevOps 9 (10%); troubleshooting
11 (12%). Four drill-only items per domain. Performance-based questions are modelled as matching,
ordering, choose-two and typed-number items. CompTIA's 750 is a scaled score on 100 to 900, not
a percent; the score here is percent correct with 80% as the suggested goal.

## Repeats

Every item was compared (content-word overlap of stems plus key text) with the netplus, secplus,
cysa, aplus, techplus, aws, awssaa, awsdva, az900, az104, gcdl, gcppca, linuxplus, dataplus,
sc900, ccna, ccst, pentestplus, securityx, isc2cc and awsaif banks, and the computed numbers were
grepped across every v2 bank. 22 close fact-and-answer pairs were rewritten from a different
angle (PaaS responsibilities, RPO and RTO scenarios, the archive tier, community cloud, SAML,
retire, replatform, horizontal scaling, tracing, off-site backups, incremental backups, ISO 27001
in place of PCI DSS, CVSS prioritisation, JSON, data types, multicloud, shared responsibility,
NAT, token authentication, object storage, the docker port mapping and the CIDR count).
