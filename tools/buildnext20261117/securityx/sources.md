# SecurityX sources

Every question is original, written from primary technical guidance and explicit hypothetical requirements. No official sample, past exam, commercial practice item or leaked question was used.

## Outline and format

- CompTIA SecurityX CAS-005 V5 Exam Objectives, document version 7.0, https://lecbyo.files.cmp.optimizely.com/download/35cf5f02b73211efa0ca8e42e80f1a8f — fetched 2026-11-17. Read pages1–13, including all23 numbered objectives. Current accessible owner asset: maximum90 questions, multiple-choice and performance-based,165minutes, pass/fail only with no scaled score. Domain weights20/27/31/22%. This supersedes the older version 3.0 document also inspected. No retirement date asserted.
- Older CompTIA CAS-005 objectives version 3.0, https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-securityx-cas-005-exam-objectives-%283-0%291d9e61d00bce410d87e3bca2ce40fa8a.pdf — fetched 2026-11-17; compared outline and format, not preferred over version 7.0.

## Primary standards and technical guidance

- NIST SP800-207 Zero Trust Architecture, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf — fetched 2026-11-17. Read resource-centric trust, dynamic authorization and minimum privileges, PDP/PEP, asset posture and per-session access (printed pages4–7).
- NIST CSF2.0, https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf — fetched 2026-11-17. Read concurrent functions, Current/Target Profiles, gap analysis and Tiers (printed pages5–8).
- OWASP Threat Modeling Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html — fetched 2026-11-17. Iterative system modeling, trust boundaries, threat identification, mitigations and validation.
- OWASP LLM01:2025 Prompt Injection, https://genai.owasp.org/llmrisk/llm01-prompt-injection/ — fetched 2026-11-17. Direct/indirect injection, untrusted retrieved content, constrained agency and output validation; RAG is not a complete mitigation.
- OWASP Cryptographic Storage Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html — fetched 2026-11-17. Threat-model-dependent encryption layers, authenticated encryption, key management and quantum migration distinctions.
- OWASP Authorization Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html — fetched 2026-11-17. Least privilege, deny-by-default and authorization on every request.

## Access and limitations

CompTIA certification landing page returned403/non-retryable errors; owner-hosted objective PDF is accessible through web retrieval. Direct shell downloads of the latest CompTIA and NIST PDFs returned403; web-rendered primary text was read instead. No claim of a successful full PDF download. No exam retirement date or launch-date event invented.

MCQ-only conceptual practice omits interactive performance-based tasks, vendor lab execution and exhaustive treatment of every objective example. Practice timing, rounded domain allocation and80% goal are editorial. No official percentage pass threshold exists. No questions on fees, booking, exam mechanics, volatile vulnerability counts or jurisdiction-specific legal deadlines.

## Additional technical readings and item traceability

Fetched 2026-11-17; the listed sections were read, not entire standards unless stated.

- NIST SP800-218 SSDF1.1, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf — requirements, supplier assurance, release provenance, roles and exception management (printed pages5–6); Architecture017–024,049–052.
- NIST SP800-61r3 (April2025), https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf — supplier lifecycle, inventories, evidence, coordination and mitigation; GRC009–012,045–048 and Operations.
- NIST SP800-193, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-193.pdf — protection/detection/recovery, trust anchors (printed pages10–12); Engineering037–040.
- NIST SP800-82r3, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf — operational safety, timing, limited resources and tested change (printed pages30–32); Engineering045–052.
- RFC7519, https://www.rfc-editor.org/rfc/rfc7519 — issuer, audience, expiry and not-before claims, section4.1; Engineering001–004,005–008,013–016. Hypothetical token fields and times are original, not copied RFC examples.
- RFC7208, https://www.rfc-editor.org/rfc/rfc7208 — introduction and operational overview for SPF; Engineering029.
- RFC6376, https://www.rfc-editor.org/rfc/rfc6376 — introduction and integrity limitations for DKIM; Engineering030.
- OWASP TLS, https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html — channel confidentiality/integrity/authentication, approved configurations and forward-secrecy distinction; Engineering025–028,032,069.
- OWASP Secrets Management, https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html — centralized provisioning, audit, rotation and credential lifecycle; Engineering008,065–068 and Operations016.
- OWASP Docker Security, https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html — host kernel boundary, management-socket exposure, user/capability restriction, read-only files and resource limits; Engineering021–024.
- OWASP SQL Injection Prevention, https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html — bind values separately from query structure; Operations009. No attack payload or official example copied.
- OWASP XSS Prevention, https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html — safe text output and context-specific encoding; Operations010.
- OWASP SSRF Prevention, https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html — defensive destination restrictions and network controls; Operations011.
- Sigma documentation, https://sigmahq.io/docs/basics/rules.html — log-event detection format; Operations030. No sample rule copied.
- YARA documentation, https://yara.readthedocs.io/en/stable/ — textual/binary content patterns; Operations029. No sample rule copied.
- OASIS CTI documentation, https://oasis-open.github.io/cti-documentation/ — STIX representations and TAXII transport; Operations031–032.

All numerical figures, timelines, budgets and organization-specific policies are hypothetical and given in their stems. Operations041–048 calculations are derived directly from those inputs. No statistical benchmark or real-world incident rate is asserted.

Coverage map: GRC001–008/041–044 objective1.1;013–020/037–040/045–048 objective1.2;009–012/021–024 objective1.3;025–028 objective1.4;029–036 objective1.5. Architecture041–044/061–064 objective2.1;013–024/049–052 objective2.2;025–028/045–048 objective2.3;009–012/029–036 objective2.4;037–040 objective2.5;001–008/053–060 objective2.6. Engineering001–016 objective3.1;017–024 objective3.2;025–036 objective3.3;037–044 objective3.4;045–052 objective3.5;053–060 objective3.6;069–075 objective3.7;061–068/076 objective3.8. Operations001–008/037–048 objective4.1;009–016 objective4.2;025–032 objective4.3;017–024/033–036/049–052 objective4.4.

Further primary definitions checked 2026-11-17:
- NIST key splitting, https://csrc.nist.gov/glossary/term/key_splitting — threshold recovery; Engineering072.
- NIST recovery point objective, https://csrc.nist.gov/glossary/term/recovery_point_objective — recovery point distinction; Architecture062.
- NIST cryptographic erase, https://csrc.nist.gov/glossary/term/cryptographic_erase — current SP800-88r2 definition; Engineering076 is conditional on the approved method’s prerequisites, not a universal claim that deleting any key sanitizes any storage.
- NIST privacy-enhancing cryptography, https://csrc.nist.gov/projects/pec/fhe — computation over encrypted data; Engineering073.
- RFC4033, https://www.rfc-editor.org/rfc/rfc4033 — DNSSEC trust anchors and signed data; Engineering031.

The old OWASP Java-specific JWT page returned404; RFC7519 supplied the claims definitions instead. An attempted RFC8446 fetch timed out; the fetched OWASP TLS guidance supports the included TLS distinctions. The direct NIST homomorphic-encryption glossary route was unavailable; the PEC project page was read instead.
