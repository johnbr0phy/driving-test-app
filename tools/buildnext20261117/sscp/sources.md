# SSCP primary sources

All questions are original. No official samples, past questions, commercial practice banks or leaked items were used.

## Outline, format and dated change

- ISC 2 SSCP Certification Exam Outline, effective October 1,2025, https://www.isc2.org/certifications/sscp/sscp-certification-exam-outline — fetched 2026-11-17. Read the complete seven-domain outline and current AI context notes. Weights 16/15/15/14/9/16/15%. Current format CAT 100–125 items,120 minutes, MCQ and advanced types; published passing standard 700/1000. No percentage conversion.
- Owner-linked English outline PDF, https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/MAR-EXAMS-SSCP-Exam_Outline-English---10012025---FINAL.pdf — fetched 2026-11-17. Current 12-page owner-linked document; primary web outline supplies the detailed content used here.
- ISC 2 CAT policy and FAQ, https://www.isc2.org/certifications/computerized-adaptive-testing — fetched 2026-11-17.100–125 SSCP questions, twohours,25 unscored pretest items, no revisiting finalized answers, adaptive selection and pass/fail report without numeric scaled score.
- ISC 2 August 26,2025 announcement, https://www.isc2.org/insights/2025/08/new-exam-format-systems-security-certified-practitioner — fetched 2026-11-17. Confirms October 1,2025 transition to CAT. No newer future format change was established; do not reuse obsolete three-hour 125-item linear format.

## Technical and professional primary guidance

- ISC 2 Code of Ethics, https://www.isc2.org/ethics — fetched 2026-11-17. Four canons, professional judgment and duties; no questions on complaint mechanics.
- NIST SP 800-63 B-4, https://pages.nist.gov/800-63-4/sp800-63b.html — fetched 2026-11-17. Authentication factors, authenticator lifecycle, phishing resistance, OTP replay and rate limiting. Current revision used rather than obsolete password rules.
- NIST CSF 2.0, https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf — fetched/read 2026-11-17 earlier in this sequential build. Current/Target Profiles, governance, risk, lifecycle and supply-chain sections.
- NIST SP 800-207, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf — fetched/read 2026-11-17 earlier in this build. Resource-level authorization, dynamic context, identity/device signals and least privilege.
- NIST SP 800-61 r 3, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf — fetched/read 2026-11-17 earlier in this build. Incident preparation, evidence integrity/provenance, coordination, containment, recovery and lessons learned.
- NIST SP 800-218 SSDF 1.1, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf — fetched/read 2026-11-17. Requirements, supplier assurance, provenance, roles and exception management.
- NIST SP 800-53 revision 5 publication page, https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final — fetched 2026-11-17. Notes release 5.2.0 in August 2025. Not presented as a newly read complete control catalog; no unverified numbered-control requirement used.

## Scope and limitations

Fixed-length MCQ conceptual practice only. It does not simulate CAT, the inability to revisit answers, unscored items, advanced interactive questions or the official scaled passing decision. Selected operational concepts, not exhaustive treatment of every example in the outline. Scenarios and numerical inputs are hypothetical. No fees, booking trivia, volatile vulnerability counts or jurisdiction-specific legal deadlines.

## Additional primary technical checks

- OpenID Connect Core 1.0 errata set 2, https://openid.net/specs/openid-connect-core-1_0.html — fetched 2026-11-17; abstract and ID-token purpose. OIDC is the identity layer over OAuth.
- IETF RFC 6749, https://www.rfc-editor.org/rfc/rfc6749 — fetched 2026-11-17; abstract and framework purpose only. Delegated limited authorization; no deprecated flow implementation is prescribed.
- IETF RFC 7519, https://www.rfc-editor.org/rfc/rfc7519 — fetched/read 2026-11-17 earlier in this build; registered issuer, audience and expiry claims. Used for token-validation distinctions.
- NIST SP 800-34 revision 1, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf — fetched 2026-11-17; recovery objectives at printed page 17, backup distinctions at pages 43-44, alternate-site and recovery testing material. Original numeric scenarios, not copied examples.
- NIST SP 800-145, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf — fetched 2026-11-17; cloud service and deployment definitions, pages 2-3. Used for basic model distinctions, not current product configuration.
- NIST SP 800-41 revision 1, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-41r1.pdf — fetched 2026-11-17; network layers and stateful/application firewall descriptions, pages 2-1 through 2-5. Historical foundational concepts only; no obsolete cipher or product recommendation.
- NIST SP 800-125, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-125.pdf — fetched 2026-11-17; bare-metal/hosted architecture pages 2-1 to 2-3 and hypervisor management protections pages 4-1 to 4-3. No claim that old product behavior applies universally today.
- OWASP TLS guidance, https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html — fetched/read 2026-11-17 earlier in this build, revisited for SSCP. Protected-channel purposes and trusted peer validation.
- OWASP cryptographic storage guidance, https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html — fetched/read 2026-11-17 earlier in this build, revisited for SSCP. Authenticated encryption, secure randomness, key separation and lifecycle.
- OWASP authorization guidance, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html — fetched/read 2026-11-17 earlier in this build. Per-request permissions and least privilege.
- OWASP SQL injection prevention, https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html — fetched/read 2026-11-17 earlier in this build. Parameterized values; no attack payloads used.
- OWASP XSS prevention, https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html — fetched/read 2026-11-17 earlier in this build. Contextual output handling.
- OWASP Docker security, https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html — fetched/read 2026-11-17 earlier in this build. Shared-kernel container boundary and host hardening.
- IETF RFC 4033, https://www.rfc-editor.org/rfc/rfc4033 — fetched/read 2026-11-17 earlier in this build. DNSSEC data authentication and trust anchors; no confidentiality claim.

- OASIS SAML 2.0 Core, https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf — fetched 2026-11-17; abstract defines XML assertions about authentication, attributes and authorization. Only the protocol-purpose distinction is used.
- NIST SP 800-124 revision 2, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-124r2.pdf — fetched 2026-11-17; sections 4.2.1-4.2.2 and 4.3.3 on mobile management, application policy, work-data separation and remote-wipe limitations.

## Bank coverage map

- Concepts 001-040: ethics, properties, control purpose, asset/change lifecycle, awareness, physical access and accountable AI operations.
- Access 001-040: factors, proofing/authentication/authorization/accounting, account lifecycle, access models, federation, token checks, privilege, authenticator properties, revocation and trust.
- Risk 001-040: risk elements/treatment, assessment sequence, prioritization, remediation verification, detection outcomes, monitoring evidence, assessment modes, privacy obligations and four original percentage calculations.
- Incident 001-036: response activities, evidence authority/custody, volatile/persistent evidence, recovery objectives, backup choices, resilience, exercises and four original recovery comparisons.
- Crypto 001-024: cryptographic purpose, message protection, certificates, key lifecycle, secure-channel selection and cryptographic management.
- Network 001-040: layers, controls, segmentation, remote access, wireless, network threats/defenses, IoT and firewall/device operations.
- Systems 001-040: endpoint controls, malware behavior, impersonation response, mobile management, cloud models/responsibility, virtualization and application protection.

This is conceptual foundation practice. Matched sets of four plausible alternatives distinguish related purposes; each alternative is keyed once across four different scenarios. This balances options-only cues but creates answer-family dependence, so options-only percentages are not evidence of 260 independent psychometric trials or calibrated difficulty. No official item wording is reused.
