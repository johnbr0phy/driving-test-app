# CompTIA Server+ sources

Every question in `data/v2/serverplus/questions.json` is original, written for Tigertest from the
exam objectives and the standards pages below. No CompTIA CertMaster item, official sample
question, past exam item, prep provider question, "brain dump" or leaked material was used or
reworded. The objectives document lists topics only (no questions), and the bank was written
from those topic bullets.

## Exam outline (objectives)

- CompTIA Server+ SK0-005 V5 Certification Exam Objectives, Document Version 7.0 (PDF)
  https://lecbyo.files.cmp.optimizely.com/download/1eba6d54bef111ef9480da43816a42bf
  fetched 2026-11-23 (read in full). Domains: 1.0 Server Hardware Installation and Management
  18%, 2.0 Server Administration 30%, 3.0 Security and Disaster Recovery 24%, 4.0
  Troubleshooting 28%. Objectives 1.1 to 1.3 (install physical hardware: racking, power,
  network cabling, chassis, components; deploy and manage storage: RAID 0/1/5/6/10, JBOD,
  media types, interfaces, NAS and SAN; hardware maintenance: out-of-band management, KVM,
  crash cart, firmware, hot-swap), 2.1 to 2.8 (install server operating systems, partitions
  and file systems; network infrastructure services; server functions, storage management,
  monitoring and data migration; high availability; virtualization; scripting basics; asset
  management and documentation; licensing), 3.1 to 3.8 (data security, physical security,
  identity and access management, risks and mitigation, hardening, decommissioning, backups and
  restores, disaster recovery), 4.1 to 4.6 (troubleshooting methodology, hardware, storage, OS
  and software, network connectivity and security problems). Also gives the test details:
  maximum of 90 questions, multiple choice and performance-based, 90 minutes, passing score
  750, two years of hands-on server experience and A+ or equivalent recommended, plus the
  acronym list.
- CompTIA Server+ certification page
  https://www.comptia.org/en-us/certifications/server/
  fetched 2026-11-23. Current exam SK0-005 (V5), launched May 18, 2021, no retirement date
  listed; maximum of 90 questions, multiple choice and performance-based, 90 minutes, passing
  score 750 on a scale of 100 to 900, English and Japanese, Pearson VUE test centers and online
  testing. Domain weights 18/30/24/28 as in the objectives.

## Upcoming exam (freshness)

- CompTIA blog, "Help shape the next CompTIA Server+ certification" (November 17, 2026)
  https://www.comptia.org/en/blog/help-shape-the-next-comptia-server-certification/
  fetched 2026-11-23. A beta of the next exam (SK0-006, beta code SK1-006) runs from
  November 12, 2026 to February 4, 2027, and the new exam is expected to launch in summer 2027.
  No SK0-005 retirement date is given. The bank follows SK0-005, the exam in force on the build
  date; the landing says a new version is expected in summer 2027, and `lib/examFreshness.json`
  carries the event so the bank is reviewed when SK0-006 launches.

## Standards and primary references used for facts

- NIST SP 800-88 Rev. 2, Guidelines for Media Sanitization (September 2025)
  https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf
  fetched 2026-11-23: clear, purge and destroy methods; cryptographic erase as a purge
  technique; degaussing applies to magnetic media only and must not be used on flash media
  such as SSDs. Used for the decommissioning and media destruction items.
- NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010)
  https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf
  fetched 2026-11-23: cold, warm, hot and mirrored sites (cold the cheapest and slowest, hot
  staffed and configured), the BIA, MTD, RTO (must be shorter than MTD) and RPO (the point in
  time data can be recovered to), tabletop exercises and functional tests. Used for the
  disaster recovery and documentation items.
- RFC 1918, Address Allocation for Private Internets
  https://www.rfc-editor.org/rfc/rfc1918.txt
  fetched 2026-11-23: the private blocks 10/8, 172.16/12 and 192.168/16.
- RFC 3927, Dynamic Configuration of IPv4 Link-Local Addresses
  https://www.rfc-editor.org/rfc/rfc3927.txt
  fetched 2026-11-23: the 169.254/16 link-local prefix a host assigns itself when no DHCP
  server answers (APIPA in the objectives).
- IANA Service Name and Transport Protocol Port Number Registry (CSV)
  https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv
  fetched 2026-11-23: SSH 22, Telnet 23, SMTP 25, DNS 53, Kerberos 88, NTP 123/udp, SNMP
  161/udp, LDAP 389, HTTPS 443, Microsoft-DS (SMB) 445, ASF-RMCP (IPMI over LAN) 623/udp, LDAPS
  636, NFS 2049, iSCSI target 3260, MS WBT Server (RDP) 3389.

## Technical facts written from the objectives' own terms

RAID levels (striping, mirroring, single and double parity and their usable capacity), drive
interfaces, rack units, out-of-band management, file systems, partition tables, clustering,
virtual networking, script constructs, licensing models, access control models, backup types,
replication and the troubleshooting steps are taught as the objectives name and order them
(the troubleshooting order is copied in sequence from objective 4.1). Computed items (RAID
capacity, rack units, IOPS, backup sets, MTTR) carry their arithmetic in the explanation.

## Left out on purpose

- Performance-based items (simulations) are not modelled; matrix and ordering items stand in
  for some of them.
- No vendor-specific menu paths, prices, fees, warranty terms or exam-voucher figures.
- No item on SK0-006 draft content, and no question about the exam itself (count, time, pass
  mark), which are on the landing and in `lib/examFacts.ts` only.
- Degaussing is never offered as a way to sanitize SSDs (NIST SP 800-88 Rev. 2).
