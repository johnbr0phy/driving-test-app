# AZ-104 sources

Every question in `data/v2/az104/questions.json` is original, written for Tigertest from the
Microsoft Learn pages below. No Microsoft practice assessment item (on AI Skills Navigator or
the legacy Learn practice assessment), exam sandbox item, past exam item, prep provider
question or leaked material was used or reworded.

## Exam outline (skills measured)

- Study guide for Exam AZ-104: Microsoft Azure Administrator
  https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
  fetched 2026-11-22 (page updated 2026-11-05). "Skills measured as of October 26, 2023" is
  still the current list; the change log against the earlier list shows only minor wording
  changes (Azure AD renamed Microsoft Entra). Manage Azure identities and governance 20-25%
  (Entra users and groups, licenses, external users, SSPR; built-in roles, scopes, interpreting
  assignments; Azure Policy, locks, tags, resource groups, subscriptions, costs with alerts,
  budgets and Advisor, management groups), Implement and manage storage 15-20% (firewalls and
  virtual networks, SAS, stored access policies, access keys, identity-based access for Azure
  Files; accounts, redundancy, object replication, encryption, Storage Explorer and AzCopy;
  file shares, containers, tiers, snapshots and soft delete, lifecycle management, versioning),
  Deploy and manage Azure compute resources 20-25% (ARM templates and Bicep; VMs, Azure Disk
  Encryption, moves, sizes, disks, zones and sets, scale sets; ACR, ACI, Container Apps; App
  Service plans, scaling, TLS, custom DNS, backup, networking, slots), Implement and manage
  virtual networking 15-20% (VNets, subnets, peering, public IPs, UDRs, troubleshooting; NSGs
  and ASGs, effective rules, Bastion, service and private endpoints; Azure DNS, load balancers),
  Monitor and maintain Azure resources 10-15% (metrics, logs, KQL, alert rules, action groups,
  alert processing rules, Insights, Network Watcher and Connection Monitor; Recovery Services
  and Backup vaults, policies, backup and restore, Site Recovery, reports and alerts). Every
  bullet was read and mapped to the nine drill domains. Also gives: 700 or greater to pass;
  English updated first, localized versions about eight weeks later; mostly GA features.

## Exam format

- Microsoft Certified: Azure Administrator Associate (certification page)
  https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/
  fetched 2026-11-22 (last updated 04/17/2026). No retirement banner. 100 minutes; proctored;
  may have interactive components; first retake after 24 hours; languages English, Chinese
  (Simplified), Korean, Japanese, French, Spanish, German, Portuguese (Brazil), Chinese
  (Traditional), Italian; Pearson VUE; price varies by country; renewal every 12 months.
- Exam duration and exam experience
  https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience
  fetched 2026-11-22. Most Microsoft exams have 40-60 questions; associate role-based exams
  without labs 100 minutes (120 seat), with labs 120 minutes (140 seat); question types active
  screen, build list, case studies, drag and drop, hot area, multiple choice, labs; Microsoft
  Learn is open during role-based exams; breaks do not stop the clock.
- Exam and assessment lab retirement
  https://learn.microsoft.com/en-us/credentials/retired-certification-exams
  fetched 2026-11-22. AZ-104 is not on the scheduled-to-retire list (which lists MS-102,
  MB-330 and AZ-400) or the recently retired list.

What is not published: the number of questions on AZ-104 and whether a sitting has labs. The
landing and facts say "Microsoft does not publish a fixed number" and quote Microsoft's general
40-60 figure. Labs, case studies, hot area and drag and drop are not modelled (matching and
yes/no statement sets stand in for some of them).

## Product documentation (Microsoft Learn), fetched or checked 2026-11-22

Storage (fetched in full)
- https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview (minimums 30, 90,
  180 days; prorated early deletion; archive offline, up to 15 hours to rehydrate; archive only
  on LRS, GRS, RA-GRS; Archive can't be the account default; premium block blobs can't tier;
  lifecycle can't rehydrate)
- https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy (LRS, ZRS, GRS,
  GZRS, RA- read access; Azure Files supports GRS and GZRS but not RA-; SSD shares LRS and ZRS)
- https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview (user delegation
  SAS signed with Entra credentials; service and account SAS with the account key; stored
  access policies, five per container; account SAS for service-level operations; SAS
  expiration policy; HTTPS)

Checked claim by claim against these Learn pages (2026-11-22), with corrections applied:
- https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership (P1 per member)
- https://learn.microsoft.com/en-us/entra/fundamentals/concept-learn-about-groups (security groups hold devices; Microsoft 365 groups users only)
- https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses (usage location; group members inherit the tenant location)
- https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy (1 or 2 methods for users; two-gate admin policy without security questions)
- https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b
- https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles
- https://learn.microsoft.com/en-us/azure/role-based-access-control/troubleshoot-limits (5,000 assignments per subscription; not asked)
- https://learn.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin
- https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-basics
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources (inheritance; ReadOnly blocks list keys; Owner and User Access Administrator; locks don't cover data operations)
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources (no inheritance; 50 tags)
- https://learn.microsoft.com/en-us/azure/governance/management-groups/overview (six levels; one parent; root; new subscriptions under root by default)
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription
- https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets
- https://learn.microsoft.com/en-us/azure/advisor/advisor-score
- https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-limitations (IP rules have no effect on same-region clients)
- https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview
- https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage
- https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview
- https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion (7 days default, 1 to 365)
- https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files (200 per share)
- https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview (once a day; up to 24 hours)
- https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview (no hierarchical namespace)
- https://learn.microsoft.com/en-us/azure/storage/common/infrastructure-encryption-enable
- https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-files
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/syntax
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/decompile
- https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-migrate (ADE retires September 15, 2028; key vault same region and subscription; encryption at host)
- https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview
- https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/resize-vm
- https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types (Ultra and Premium SSD v2 not as OS disks)
- https://learn.microsoft.com/en-us/azure/resource-mover/overview
- https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-scale-in-policy
- https://learn.microsoft.com/en-us/azure/container-registry/container-registry-skus
- https://learn.microsoft.com/en-us/azure/container-apps/scale-app (min 0, default max 10, up to 1,000)
- https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits (App Service: Basic 3 instances, no slots; Standard 5 slots; Premium 20)
- https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate (managed certificate, no wildcard)
- https://learn.microsoft.com/en-us/azure/app-service/manage-backup (Basic and higher)
- https://learn.microsoft.com/en-us/azure/app-service/networking-features
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq (five reserved addresses; /29)
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview
- https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-basic-upgrade-guidance (Basic retired September 30, 2025; Standard static, secure by default)
- https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview
- https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview (100 to 4096; defaults 65000, 65001, 65500)
- https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups
- https://learn.microsoft.com/en-us/azure/bastion/bastion-sku-comparison (AzureBastionSubnet /26; native client Standard and up; Developer needs no subnet)
- https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview
- https://learn.microsoft.com/en-us/azure/dns/private-dns-autoregistration
- https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-basic-upgrade-guidance
- https://learn.microsoft.com/en-us/azure/network-watcher/nsg-flow-logs-overview (no new NSG flow logs after June 30, 2025; retire September 30, 2027)
- https://learn.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings (93-day metrics, 90-day activity log)
- https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-rate-limiting (one SMS per 5 minutes per number)
- https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vminsights-overview
- https://learn.microsoft.com/en-us/azure/backup/backup-vault-overview
- https://learn.microsoft.com/en-us/azure/backup/backup-azure-enhanced-soft-delete-about (14 days, up to 180)
- https://learn.microsoft.com/en-us/azure/backup/backup-support-matrix-iaas (Enhanced every 4, 6, 8, 12 or 24 hours)
- https://learn.microsoft.com/en-us/azure/reliability/reliability-backup (Cross Region Restore on GRS)
- https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-common-questions (crash-consistent every 5 minutes)
- https://learn.microsoft.com/en-us/azure/backup/configure-reports

## Corrections found while checking

- The role assignment limit is 5,000 per subscription, not 4,000: no item asks it.
- Standard public IPs can be non-zonal, zonal or zone-redundant; the bank never says
  zone-redundant is the default.
- The admin SSPR two-gate policy has exceptions (trial period, no custom domain): items ask
  only that security questions are not allowed for admin roles.
- Entra Kerberos for cloud-only identities on Azure Files is still labelled preview: not asked.
- Container Instances NGroups (preview) can scale sets of container groups: no item says ACI
  can't scale.
- Trusted Launch VMs can now use the Standard backup policy: not asked.

## Left out on purpose

- Exam fees, retake waits beyond the first, and any question about the exam itself.
- Prices, licence costs and SLA percentages.
- Preview features (Turbo and smart blob tiers, NGroups, Entra Kerberos for cloud-only users).
- Labs, case studies, hot area and drag and drop items.
- Facts already asked in `az900`, `sc900`, `sc200`, `awssaa` and `gcppca` (checked by stem
  similarity on 2026-11-22; a budget email item, the six management group levels, lock
  inheritance, an NSG priority item and the Bastion port item were rewritten).
