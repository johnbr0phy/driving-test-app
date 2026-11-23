# CompTIA Data+ sources

Every question in `data/v2/dataplus/questions.json` is original, written for Tigertest from the
exam objectives and the reference pages below. No CompTIA CertMaster item, official sample
question, past exam item, prep provider question, "brain dump" or leaked material was used or
reworded. The objectives document lists topics only (no questions), and the bank was written
from those topic bullets. CompTIA publishes no question catalogue for Data+, so there was no
public catalogue to run a similarity check against; instead every item was compared with the
sibling Tigertest banks (see "Repeats" below).

## Exam outline (objectives)

- CompTIA Data+ DA0-002 Certification Exam Objectives (PDF, CompTIA's own file host, printed
  Dec 2024, 11 pages)
  https://lecbyo.files.cmp.optimizely.com/download/355f5f90b73211ef9599a6f347fbf652
  fetched 2026-11-23 (read in full). Domains: 1.0 Data Concepts and Environments 20%,
  2.0 Data Acquisition and Preparation 22%, 3.0 Data Analysis 24%, 4.0 Visualization and
  Reporting 20%, 5.0 Data Governance 14%. Objectives 1.1 (database types, file extensions, data
  structures: fact, dimension, slowly changing dimension and bridge tables, schema, JSON, nested
  structures; data types: char, varchar, nvarchar, null, spatial, Boolean, integer, decimal,
  float, datetime, timestamp, BLOB, CLOB, GUID/UUID), 1.2 (data sources: databases, APIs, web
  scraping, files, logs, data lakes, lakehouses, marts, silos), 1.3 (AWS, Azure, Google;
  private, public, hybrid; object, file, local, shared, block storage; containerization), 1.4
  (IDEs RStudio and VS Code, text editors, notebooks; Tableau, Power BI, Looker; Anaconda,
  pandas, tidyverse; SAS, Python, R, Scala; SSMS, MySQL Workbench, Compass, DBeaver, Toad, Azure
  Data Studio), 1.5 (generative AI, LLM, foundational models, deep learning, NLP, RPA, automated
  reporting), 2.1 (integration; join, concatenate, filter, union, grouping, aggregate, nested
  queries; indexing, parameterization, subsets, temporary tables; ETL and ELT; surveying and
  sampling), 2.2 (missing values, duplication, redundancy, outliers, completeness, validation),
  2.3 (RegEx, conversion, binning, augmentation, exploding, scaling, standardization,
  imputation, parsing, merging, appending, derived variables, deletion), 3.1 (mock-up,
  accessibility, technical vs non-technical, level of detail, internal vs external, persona,
  sensitive data, KPIs), 3.2 (prescriptive, descriptive, predictive, inferential; central
  tendency, dispersion; logical, date and string functions), 3.3 (connectivity, user-reported,
  SQL code and corrupted data issues; logging, validating the source, vendor communities), 4.1
  (charts, maps, pivot tables, infographics; labels, legends, branding, color schemes), 4.2
  (executive summary, self-service portal, static and dynamic dashboards, recurring and ad hoc,
  snapshot and real-time), 4.3 (excessive load time, slow refresh, large data size, filter not
  working, stale and corrupt data; filtering, code, calc and peer review, source validation,
  data structure changes, monitoring alerts), 5.1 to 5.4 (documentation, lineage, source of
  truth, versioning, metadata; retention, GDPR, jurisdiction, replication, storage, ethics, PCI
  DSS, audit, classification, incident reporting; RBAC, encryption in transit and at rest, data
  usage and sharing, NIST, PII, PHI, anonymization, masking; requirement, stress, UAT and unit
  tests, source control, data drift, automated monitoring, profiling, quality metrics, ISO).
  Every bullet was mapped to the nine drill domains. The PDF leaves the question count, length
  and passing score blank; those come from the certification page.
- CompTIA Data+ certification page (V2)
  https://www.comptia.org/en-us/certifications/data/v2/
  fetched 2026-11-23. Exam code DA0-002, launched October 14, 2025, "usually three years after
  launch (estimated 2028)" for retirement, maximum of 90 questions, multiple-choice and
  performance-based, 90 minutes, passing score 675 on a scale of 100 to 900, English and
  Japanese, recommended 18 to 24 months in a data analyst or similar role, ISO 17024 accredited
  by ANAB, mapped to the NICE Framework Data Analyst work role. The page also carries the V2
  exam objectives summary with the same five domain weights.
- CompTIA Data+ landing page
  https://www.comptia.org/en-us/certifications/data/
  fetched 2026-11-23: same exam details as the V2 page.

## Exam history

- CompTIA Data+ V1 page
  https://www.comptia.org/en-au/certifications/data/v1/
  checked 2026-11-23 via search extract (the page now redirects to V2 for a plain fetch, so the
  reviewer could not read it directly): DA0-001 retirement "English - April 14, 2026; Japanese
  and Thai - July 16, 2026". Since the date could not be confirmed on a page read in full, the
  landing and facts say only that DA0-002 replaced DA0-001, which has retired.

## Primary references used for facts

- NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.5.6 Measures of Scale
  https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm
  fetched 2026-11-23: variance as the sum of squared deviations divided by N - 1, standard
  deviation as its square root, range as maximum minus minimum, interquartile range as the 75th
  minus the 25th percentile, and that the IQR is little affected by values in the tails. Every
  statistics item uses the sample (n - 1) formula, and every computed key and computed distractor
  is asserted in `dpStats.py` and `dpPrep.py`.
- European Commission, Data protection explained
  https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en
  fetched 2026-11-23: the GDPR applies to organisations outside the EU that offer goods or
  services to people in the EU; anonymised data is not personal data only if anonymisation is
  irreversible, while pseudonymised data stays personal data; purpose limitation, data
  minimisation and storage limitation are among its principles. EUR-Lex returned an empty page
  to automated fetches, so no article numbers or deadlines are asked.
- PCI Security Standards Council, Standards
  https://www.pcisecuritystandards.org/standards/
  fetched 2026-11-23: PCI DSS applies to all entities that store, process or transmit cardholder
  data. No version number or masking rule is asked.

- NIST Privacy Framework
  https://www.nist.gov/privacy-framework
  fetched 2026-11-23: NIST describes the Privacy Framework as a voluntary tool.
- NIST Cybersecurity Framework
  https://www.nist.gov/cyberframework
  fetched 2026-11-23 by the reviewer: the page is NIST's and presents CSF 2.0 (NIST.CSWP.29) as
  helping organizations manage cybersecurity risk; it does not use the word "voluntary". The
  governance drill item asks only which US agency publishes the Cybersecurity Framework and the
  Privacy Framework (NIST), with no claim about how they are adopted.

## Repeats

Every stem was compared (word overlap, same key, shared numbers) with the Tigertest banks for
techplus, aplus, netplus, secplus, cysa, snowpro, gcdl, the AWS and Azure banks, cssgb, cssyb and
sfadmin (script kept outside the repo). Items rewritten before release: the hybrid cloud
scenario (aplus used a hospital), the sample standard deviation drill item (cssyb used a
three-value set with the same answer), the town income median item (cssgb asks the same fact),
the unstructured data multi-select (awsaif), the JSON semi-structured item (gcdl), the PII item
(techplus) and a generic troubleshooting order item (techplus). At review: the GDPR item was moved from
  extraterritorial scope (cissp asks it) to pseudonymized data, the money data type item from a
  19.95-style price (techplus), the classification labels (fortinse), the RBAC "job title" wording
  (netplus) and the student-course bridge table (pl900).

## Left out on purpose

- No question about the test itself (count, time, pass mark, languages).
- No prices, fees, tool version numbers or GDPR deadlines.
- Performance-based questions are modelled as matching, ordering and typed-number items, not
  as simulations.
