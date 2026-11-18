# Independent SSCP content review — 2026-11-17

All 260 items read and answered, not sampled. Order: read only options-only.json; freeze all 260 longest-wording guesses with cue reasons; read blind.json in its different order and independently solve every stem; save answers.json; only then read keys-private.json and id-map-private.json. Content agreement: 260/260, zero disagreements. Eight numeric items recomputed independently. One actionable wording issue; no competing keyed answer found.

## Findings

1. **P2: protect the administrative exchange explicitly.** Opaque ID 05131e4c9085 asks how to protect an unprotected router administration session. The best available answer is “Use authenticated administrative access,” but authentication alone does not supply encryption or integrity. Change this choice to “Use authenticated, encrypted administrative access” (or an authenticated protected channel) throughout its four-item option family. This preserves the intended answer while making the security claim correct. OWASP distinguishes confidentiality, integrity and authentication as separate secure-channel properties: [TLS guidance](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html).

2. **Scope/difficulty limitation, already disclosed in product copy:** every question is foundational identification or a simple one-step application. There are 65 identical unordered option families, each appearing in four questions. Within each family the stems ask different distinctions, rather than repeating the same correct proposition with changed names. Therefore no exact semantic-duplicate question was identified; however the bank is intentionally narrow and repetitive in cognitive task. It is not 260 independent coverage units, calibrated SSCP difficulty, or a realistic readiness assessment. In particular it offers little practical configuration interpretation, log investigation, multi-constraint prioritization or troubleshooting. Do not expand claims beyond selected conceptual foundation practice. Test 2 uses separate wording, but shared families mean that “held out” does not imply independent concept coverage.

## Options-only cue audit

The precommitted strategy chose the longest option (first on a tie). This tests a weak length cue; all alternatives looked plausible without stems. It is not a broad adversarial predictor or an independent learner experiment. Families create correlated outcomes, and each alternative is keyed in a related scenario. No statistical independence, significance, or psychometric inference is claimed. Strict >40% gate applied separately to every domain:

| Domain | Items | Correct guesses | Rate | >40% gate |
|---|---:|---:|---:|---|
| sscpAccess | 40 | 11 | 27.50% | Pass |
| sscpConcepts | 40 | 10 | 25.00% | Pass |
| sscpCrypto | 24 | 7 | 29.17% | Pass |
| sscpIncident | 36 | 11 | 30.56% | Pass |
| sscpNetwork | 40 | 9 | 22.50% | Pass |
| sscpRisk | 40 | 11 | 27.50% | Pass |
| sscpSystems | 40 | 10 | 25.00% | Pass |

Total 69/260 = 26.54%. Seven domains pass the specified gate. This does not prove all possible cues absent.

## Primary-source verification and product claims

Sources below were independently opened on 2026-11-17 after the blind passes. The builder's sources.md was also read, but its asserted reading is not counted as independent verification.

- [ISC2 current SSCP outline](https://www.isc2.org/certifications/sscp/sscp-certification-exam-outline): effective October 1, 2025; CAT, 100–125 items, two hours, multiple choice and advanced item types; published passing standard 700/1000. Seven weights 16/15/15/14/9/16/15 confirmed.
- [ISC2 CAT FAQ](https://www.isc2.org/certifications/computerized-adaptive-testing): 25 pretest items, no review/change after finalizing an answer, adaptive ability evaluation, no numeric scaled score on pass/fail reports. The official standard is not 70% correct.
- Read local lib/v2/exams/sscp.ts, landing page and spec.md. They correctly disclose two fixed 100-question, 120-minute practice tests, navigation/review allowed, percentages for study only, and no CAT, advanced-format or official score equivalence. No exam-format correction required. This is a content inspection, not a runtime test.
- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html): current guidance requires 15 characters for single-factor passwords, permits eight minimum as part of MFA, screens commonly used/compromised passwords, and forbids arbitrary periodic changes and composition rules. No bank question asserts obsolete rotation/complexity rules. Password screening, replay resistance, phishing-resistant verifier binding and credential lifecycle distinctions agree. Salted password verification is correctly distinguished from recoverable encryption; production implementations additionally require a suitable password hashing scheme and work factor.
- [NIST SP 800-34r1](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf): RPO concerns recoverable data point, RTO recovery duration, MTD tolerated disruption. Checked these stable foundational definitions; all four comparison calculations are correct.
- [NIST SP 800-145](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf): service/deployment distinctions agree, including customer OS control under IaaS and hosted applications under SaaS. Historical conceptual definitions, not contemporary vendor configuration advice.
- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519): recipient audience and expiration checks agree with token questions. This review does not endorse every legacy algorithm in that RFC or treat its optional claims as universal validation policy.
- [OWASP TLS guidance](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html): supports the administrative-channel wording finding above and protected-channel distinctions.

## All-item real-ID ledger

Indices are zero-based. “Agree” means independent chosen answer equals supplied key; it is not an official exam endorsement. Every item received foundational-recognition difficulty classification. Numeric workings and wording finding appear in the note column. Option guesses were frozen before stems/keys.

| Real ID | Blind ID | Content answer | Key | Option-only guess | Result / rationale |
|---|---|---:|---:|---:|---|
| SSCP-ACCESS-001 | d604ab9cc8ef | 2 | 2 | 3 | Agree. The stated requirement directly identifies Something the user knows. Other options address distinct requirements. |
| SSCP-ACCESS-002 | d9d97e4be15a | 3 | 3 | 2 | Agree. The stated requirement directly identifies Something the user possesses. Other options address distinct requirements. |
| SSCP-ACCESS-003 | 5a96c427b407 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Something inherent to the user. Other options address distinct requirements. |
| SSCP-ACCESS-004 | 91472d99236e | 3 | 3 | 1 | Agree. The stated requirement directly identifies A contextual risk signal. Other options address distinct requirements. |
| SSCP-ACCESS-005 | 919f0f2cba6e | 3 | 3 | 2 | Agree. The stated requirement directly identifies Identity proofing. Other options address distinct requirements. |
| SSCP-ACCESS-006 | 6d19da9308ce | 2 | 2 | 0 | Agree. The stated requirement directly identifies Authentication. Other options address distinct requirements. |
| SSCP-ACCESS-007 | 762bec7ffeee | 3 | 3 | 0 | Agree. The stated requirement directly identifies Authorization. Other options address distinct requirements. |
| SSCP-ACCESS-008 | 87f85722f061 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Access accounting. Other options address distinct requirements. |
| SSCP-ACCESS-009 | 412e3ff0627b | 2 | 2 | 2 | Agree. The stated requirement directly identifies Provision the approved entitlement. Other options address distinct requirements. |
| SSCP-ACCESS-010 | 54fddad71c83 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Adjust access after a role change. Other options address distinct requirements. |
| SSCP-ACCESS-011 | f26f3bc1dc61 | 1 | 1 | 3 | Agree. The stated requirement directly identifies Disable access at separation. Other options address distinct requirements. |
| SSCP-ACCESS-012 | 1aed18ae4ee4 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Recertify existing access. Other options address distinct requirements. |
| SSCP-ACCESS-013 | ea7941f9d2c4 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Discretionary access control. Other options address distinct requirements. |
| SSCP-ACCESS-014 | a663f16f9efa | 0 | 0 | 2 | Agree. The stated requirement directly identifies Mandatory access control. Other options address distinct requirements. |
| SSCP-ACCESS-015 | ad394131b22c | 2 | 2 | 0 | Agree. The stated requirement directly identifies Role-based access control. Other options address distinct requirements. |
| SSCP-ACCESS-016 | 7e6b59d5db72 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Attribute-based access control. Other options address distinct requirements. |
| SSCP-ACCESS-017 | b396e84d618d | 3 | 3 | 0 | Agree. The stated requirement directly identifies SAML federation. Other options address distinct requirements. |
| SSCP-ACCESS-018 | 5c3e423e2e9e | 0 | 0 | 0 | Agree. The stated requirement directly identifies OAuth delegated authorization. Other options address distinct requirements. |
| SSCP-ACCESS-019 | a2de2db28d3d | 2 | 2 | 2 | Agree. The stated requirement directly identifies OpenID Connect authentication. Other options address distinct requirements. |
| SSCP-ACCESS-020 | 494fd2f64e97 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Directory group membership. Other options address distinct requirements. |
| SSCP-ACCESS-021 | 51c8a725a216 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Validate the token audience. Other options address distinct requirements. |
| SSCP-ACCESS-022 | 69be64fa5351 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Enforce the token expiry. Other options address distinct requirements. |
| SSCP-ACCESS-023 | 65e34ce88ac2 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Verify the trusted issuer. Other options address distinct requirements. |
| SSCP-ACCESS-024 | 91222ff47926 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Check the requested permission. Other options address distinct requirements. |
| SSCP-ACCESS-025 | fcb07ddceb4d | 1 | 1 | 2 | Agree. The stated requirement directly identifies Reduce standing privilege. Other options address distinct requirements. |
| SSCP-ACCESS-026 | 1ce1a5b7a3d8 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Require separate approvals. Other options address distinct requirements. |
| SSCP-ACCESS-027 | ee850182711e | 3 | 3 | 3 | Agree. The stated requirement directly identifies Constrain the service identity. Other options address distinct requirements. |
| SSCP-ACCESS-028 | 6892df67fa52 | 0 | 0 | 3 | Agree. The stated requirement directly identifies Review inherited permissions. Other options address distinct requirements. |
| SSCP-ACCESS-029 | 69a9db2d213b | 3 | 3 | 3 | Agree. The stated requirement directly identifies Phishing-resistant authentication. Other options address distinct requirements. |
| SSCP-ACCESS-030 | 75a012c7ae15 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Replay-resistant authentication. Other options address distinct requirements. |
| SSCP-ACCESS-031 | 1b987ae785aa | 0 | 0 | 2 | Agree. The stated requirement directly identifies Password blocklist screening. Other options address distinct requirements. |
| SSCP-ACCESS-032 | c17155d52ddd | 1 | 1 | 0 | Agree. The stated requirement directly identifies Account recovery verification. Other options address distinct requirements. |
| SSCP-ACCESS-033 | 57863351aa0b | 1 | 1 | 3 | Agree. The stated requirement directly identifies Terminate the active sessions. Other options address distinct requirements. |
| SSCP-ACCESS-034 | 35cb092bdc2a | 0 | 0 | 1 | Agree. The stated requirement directly identifies Revoke the delegated grant. Other options address distinct requirements. |
| SSCP-ACCESS-035 | f134e9fa1d77 | 3 | 3 | 1 | Agree. The stated requirement directly identifies Remove the obsolete group grant. Other options address distinct requirements. |
| SSCP-ACCESS-036 | 8a97b5d4001e | 1 | 1 | 1 | Agree. The stated requirement directly identifies Rotate the exposed service secret. Other options address distinct requirements. |
| SSCP-ACCESS-037 | ce75220a9358 | 2 | 2 | 0 | Agree. The stated requirement directly identifies A one-way trust relationship. Other options address distinct requirements. |
| SSCP-ACCESS-038 | 9fdc69ef1bd8 | 1 | 1 | 1 | Agree. The stated requirement directly identifies A bidirectional trust relationship. Other options address distinct requirements. |
| SSCP-ACCESS-039 | 3f3fd7d39a57 | 0 | 0 | 1 | Agree. The stated requirement directly identifies A transitive trust relationship. Other options address distinct requirements. |
| SSCP-ACCESS-040 | 68c98f9f574c | 1 | 1 | 1 | Agree. The stated requirement directly identifies Per-request resource authorization. Other options address distinct requirements. |
| SSCP-CONCEPTS-001 | 9f6fd4af9b55 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Confidentiality of the records. Other options address distinct requirements. |
| SSCP-CONCEPTS-002 | a85bb78c282e | 2 | 2 | 0 | Agree. The stated requirement directly identifies Integrity of the transaction. Other options address distinct requirements. |
| SSCP-CONCEPTS-003 | 4d1a496e313c | 2 | 2 | 0 | Agree. The stated requirement directly identifies Availability of the service. Other options address distinct requirements. |
| SSCP-CONCEPTS-004 | cb90bed814c2 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Accountability for the action. Other options address distinct requirements. |
| SSCP-CONCEPTS-005 | 0dd402112efa | 0 | 0 | 0 | Agree. The stated requirement directly identifies Disclose the conflict of interest. Other options address distinct requirements. |
| SSCP-CONCEPTS-006 | a1899abcb44a | 1 | 1 | 3 | Agree. The stated requirement directly identifies Report the findings accurately. Other options address distinct requirements. |
| SSCP-CONCEPTS-007 | bb12c137467e | 0 | 0 | 1 | Agree. The stated requirement directly identifies Seek qualified technical support. Other options address distinct requirements. |
| SSCP-CONCEPTS-008 | 3504bcaa918e | 3 | 3 | 2 | Agree. The stated requirement directly identifies Protect entrusted information. Other options address distinct requirements. |
| SSCP-CONCEPTS-009 | b03b4082b539 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Confirm the authorized scope. Other options address distinct requirements. |
| SSCP-CONCEPTS-010 | c95af382b97f | 3 | 3 | 3 | Agree. The stated requirement directly identifies Use the approved escalation channel. Other options address distinct requirements. |
| SSCP-CONCEPTS-011 | 60d01b10386c | 0 | 0 | 2 | Agree. The stated requirement directly identifies Carry out the assigned procedure. Other options address distinct requirements. |
| SSCP-CONCEPTS-012 | d2e70e2c1f33 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Request an authorized exception. Other options address distinct requirements. |
| SSCP-CONCEPTS-013 | ba5f975f0572 | 0 | 0 | 2 | Agree. The stated requirement directly identifies A technical enforcement control. Other options address distinct requirements. |
| SSCP-CONCEPTS-014 | 6af5499f1148 | 0 | 0 | 1 | Agree. The stated requirement directly identifies A physical access control. Other options address distinct requirements. |
| SSCP-CONCEPTS-015 | 7cd1b7a9a9ef | 3 | 3 | 3 | Agree. The stated requirement directly identifies An administrative policy control. Other options address distinct requirements. |
| SSCP-CONCEPTS-016 | f1ab73a31761 | 3 | 3 | 0 | Agree. The stated requirement directly identifies A personnel competence control. Other options address distinct requirements. |
| SSCP-CONCEPTS-017 | fe1342ac73ca | 0 | 0 | 2 | Agree. The stated requirement directly identifies Prevent the prohibited activity. Other options address distinct requirements. |
| SSCP-CONCEPTS-018 | 3e934196f45c | 3 | 3 | 0 | Agree. The stated requirement directly identifies Detect a completed violation. Other options address distinct requirements. |
| SSCP-CONCEPTS-019 | a62360d71fea | 1 | 1 | 2 | Agree. The stated requirement directly identifies Correct the damaged condition. Other options address distinct requirements. |
| SSCP-CONCEPTS-020 | 76a154b8b8d2 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Compensate for a control constraint. Other options address distinct requirements. |
| SSCP-CONCEPTS-021 | 71744f715758 | 1 | 1 | 3 | Agree. The stated requirement directly identifies Record the asset and its owner. Other options address distinct requirements. |
| SSCP-CONCEPTS-022 | 3b5bdb3480b2 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Verify the acquisition requirements. Other options address distinct requirements. |
| SSCP-CONCEPTS-023 | 8ba60f650a01 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Maintain the supported configuration. Other options address distinct requirements. |
| SSCP-CONCEPTS-024 | a66b30adddc8 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Authorize the final disposition. Other options address distinct requirements. |
| SSCP-CONCEPTS-025 | 87ba4ccbe3e2 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Assess the security impact. Other options address distinct requirements. |
| SSCP-CONCEPTS-026 | 390a2d47a137 | 2 | 2 | 3 | Agree. The stated requirement directly identifies Authorize the planned change. Other options address distinct requirements. |
| SSCP-CONCEPTS-027 | 15ad2233db70 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Execute the rollback plan. Other options address distinct requirements. |
| SSCP-CONCEPTS-028 | 90752e6dd933 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Verify the post-change outcome. Other options address distinct requirements. |
| SSCP-CONCEPTS-029 | a9f7998652ec | 2 | 2 | 1 | Agree. The stated requirement directly identifies Teach recognition of warning signs. Other options address distinct requirements. |
| SSCP-CONCEPTS-030 | 15109983352c | 1 | 1 | 1 | Agree. The stated requirement directly identifies Rehearse the assigned response roles. Other options address distinct requirements. |
| SSCP-CONCEPTS-031 | 91bdc4524288 | 0 | 0 | 3 | Agree. The stated requirement directly identifies Measure behavior after training. Other options address distinct requirements. |
| SSCP-CONCEPTS-032 | 9c545efa4c95 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Update the material after change. Other options address distinct requirements. |
| SSCP-CONCEPTS-033 | 5c755a77fc10 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Verify the visitor's authorization. Other options address distinct requirements. |
| SSCP-CONCEPTS-034 | 350c6e533f73 | 2 | 2 | 3 | Agree. The stated requirement directly identifies Escort within the approved area. Other options address distinct requirements. |
| SSCP-CONCEPTS-035 | a4959b3b87f4 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Recover the temporary credential. Other options address distinct requirements. |
| SSCP-CONCEPTS-036 | c7b1cd743c02 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Review the physical access record. Other options address distinct requirements. |
| SSCP-CONCEPTS-037 | a9665dfff944 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Validate the model update. Other options address distinct requirements. |
| SSCP-CONCEPTS-038 | 650fae152260 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Assign an accountable service owner. Other options address distinct requirements. |
| SSCP-CONCEPTS-039 | 30e14040b6b9 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Limit the retained training data. Other options address distinct requirements. |
| SSCP-CONCEPTS-040 | dc447cba1598 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Document the automated decision. Other options address distinct requirements. |
| SSCP-CRYPTO-001 | 7d617a2c1ddc | 2 | 2 | 1 | Agree. The stated requirement directly identifies Symmetric encryption. Other options address distinct requirements. |
| SSCP-CRYPTO-002 | aa5c821e2281 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Public-key encryption. Other options address distinct requirements. |
| SSCP-CRYPTO-003 | cb021a3ea301 | 1 | 1 | 3 | Agree. The stated requirement directly identifies A cryptographic hash. Other options address distinct requirements. |
| SSCP-CRYPTO-004 | 1170a5d705ae | 2 | 2 | 0 | Agree. The stated requirement directly identifies A digital signature. Other options address distinct requirements. |
| SSCP-CRYPTO-005 | 320dfaee8798 | 2 | 2 | 3 | Agree. The stated requirement directly identifies Authenticated encryption. Other options address distinct requirements. |
| SSCP-CRYPTO-006 | a07409201187 | 1 | 1 | 2 | Agree. The stated requirement directly identifies A keyed message authentication code. Other options address distinct requirements. |
| SSCP-CRYPTO-007 | 4f047c961f07 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Password hashing with a unique salt. Other options address distinct requirements. |
| SSCP-CRYPTO-008 | 41b27350ae1d | 2 | 2 | 2 | Agree. The stated requirement directly identifies A cryptographically secure random generator. Other options address distinct requirements. |
| SSCP-CRYPTO-009 | b563aa0ef7c0 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Protect the private signing key. Other options address distinct requirements. |
| SSCP-CRYPTO-010 | 19caec9abb2f | 1 | 1 | 3 | Agree. The stated requirement directly identifies Validate the certificate chain. Other options address distinct requirements. |
| SSCP-CRYPTO-011 | c94c8a92bd16 | 0 | 0 | 3 | Agree. The stated requirement directly identifies Check the certificate identity. Other options address distinct requirements. |
| SSCP-CRYPTO-012 | 09ee38041f5e | 1 | 1 | 1 | Agree. The stated requirement directly identifies Check certificate revocation status. Other options address distinct requirements. |
| SSCP-CRYPTO-013 | 4aeb25358933 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Generate and provision the key. Other options address distinct requirements. |
| SSCP-CRYPTO-014 | 870713cf091b | 1 | 1 | 3 | Agree. The stated requirement directly identifies Rotate the active key. Other options address distinct requirements. |
| SSCP-CRYPTO-015 | 3999a7efa23c | 2 | 2 | 2 | Agree. The stated requirement directly identifies Recover an authorized archived key. Other options address distinct requirements. |
| SSCP-CRYPTO-016 | 7f02e6b2caac | 1 | 1 | 2 | Agree. The stated requirement directly identifies Destroy retired key material. Other options address distinct requirements. |
| SSCP-CRYPTO-017 | 63e8119d2d3b | 1 | 1 | 1 | Agree. The stated requirement directly identifies TLS for an application connection. Other options address distinct requirements. |
| SSCP-CRYPTO-018 | c9057cc0f0cb | 0 | 0 | 1 | Agree. The stated requirement directly identifies IPsec for network-layer traffic. Other options address distinct requirements. |
| SSCP-CRYPTO-019 | 3774e35a9da3 | 0 | 0 | 1 | Agree. The stated requirement directly identifies SSH for remote administration. Other options address distinct requirements. |
| SSCP-CRYPTO-020 | ccfdf09fad4b | 1 | 1 | 2 | Agree. The stated requirement directly identifies Encryption for stored volumes. Other options address distinct requirements. |
| SSCP-CRYPTO-021 | 7384711c1bdd | 0 | 0 | 0 | Agree. The stated requirement directly identifies Separate encryption keys from ciphertext. Other options address distinct requirements. |
| SSCP-CRYPTO-022 | 69745bc6c026 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Use a unique nonce as required. Other options address distinct requirements. |
| SSCP-CRYPTO-023 | b3a892beefde | 3 | 3 | 0 | Agree. The stated requirement directly identifies Plan cryptographic agility. Other options address distinct requirements. |
| SSCP-CRYPTO-024 | 20a7484b664f | 1 | 1 | 1 | Agree. The stated requirement directly identifies Preserve signature verification evidence. Other options address distinct requirements. |
| SSCP-INCIDENT-001 | a8e47c69487a | 3 | 3 | 0 | Agree. The stated requirement directly identifies Prepare response capabilities. Other options address distinct requirements. |
| SSCP-INCIDENT-002 | a82506b12792 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Analyze the reported event. Other options address distinct requirements. |
| SSCP-INCIDENT-003 | 832e17781006 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Contain the confirmed incident. Other options address distinct requirements. |
| SSCP-INCIDENT-004 | 87e69d77aed0 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Improve after the incident. Other options address distinct requirements. |
| SSCP-INCIDENT-005 | 7e5ce688f526 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Remove the established cause. Other options address distinct requirements. |
| SSCP-INCIDENT-006 | f0001903dd1a | 0 | 0 | 2 | Agree. The stated requirement directly identifies Restore the trusted service. Other options address distinct requirements. |
| SSCP-INCIDENT-007 | d70237bbfcc3 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Monitor the recovered environment. Other options address distinct requirements. |
| SSCP-INCIDENT-008 | b1f1b086f855 | 2 | 2 | 3 | Agree. The stated requirement directly identifies Communicate the incident status. Other options address distinct requirements. |
| SSCP-INCIDENT-009 | a605ff1fc584 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Preserve the original evidence. Other options address distinct requirements. |
| SSCP-INCIDENT-010 | 91451677fad1 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Record the custody transfer. Other options address distinct requirements. |
| SSCP-INCIDENT-011 | 6eb61bd17993 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Obtain the required authority. Other options address distinct requirements. |
| SSCP-INCIDENT-012 | 247a1cb73a87 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Document the analytical method. Other options address distinct requirements. |
| SSCP-INCIDENT-013 | e2684047ad50 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Capture volatile evidence. Other options address distinct requirements. |
| SSCP-INCIDENT-014 | db2e10cc5f76 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Acquire persistent evidence. Other options address distinct requirements. |
| SSCP-INCIDENT-015 | 4fe4cf347db9 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Verify an evidence copy. Other options address distinct requirements. |
| SSCP-INCIDENT-016 | 975d1c7807e1 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Build the incident timeline. Other options address distinct requirements. |
| SSCP-INCIDENT-017 | 8aa46bb441d8 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Recovery time objective. Other options address distinct requirements. |
| SSCP-INCIDENT-018 | 87f7e3452079 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Recovery point objective. Other options address distinct requirements. |
| SSCP-INCIDENT-019 | ac822fea6eb1 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Maximum tolerable downtime. Other options address distinct requirements. |
| SSCP-INCIDENT-020 | dc78c7cebedc | 1 | 1 | 3 | Agree. The stated requirement directly identifies Backup retention period. Other options address distinct requirements. |
| SSCP-INCIDENT-021 | 27aa2944b886 | 3 | 3 | 0 | Agree. The stated requirement directly identifies A full backup. Other options address distinct requirements. |
| SSCP-INCIDENT-022 | 7a345f4aa3e6 | 0 | 0 | 0 | Agree. The stated requirement directly identifies An incremental backup. Other options address distinct requirements. |
| SSCP-INCIDENT-023 | 0a1d55cc27e6 | 1 | 1 | 1 | Agree. The stated requirement directly identifies A differential backup. Other options address distinct requirements. |
| SSCP-INCIDENT-024 | 5fff9c69cf38 | 1 | 1 | 2 | Agree. The stated requirement directly identifies A tested restoration. Other options address distinct requirements. |
| SSCP-INCIDENT-025 | 38588447f247 | 2 | 2 | 0 | Agree. The stated requirement directly identifies An isolated recovery copy. Other options address distinct requirements. |
| SSCP-INCIDENT-026 | b084b19586c4 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Geographic recovery separation. Other options address distinct requirements. |
| SSCP-INCIDENT-027 | 4eb1e093843b | 2 | 2 | 3 | Agree. The stated requirement directly identifies Redundant live capacity. Other options address distinct requirements. |
| SSCP-INCIDENT-028 | e9c97a93bc96 | 3 | 3 | 3 | Agree. The stated requirement directly identifies A documented failback procedure. Other options address distinct requirements. |
| SSCP-INCIDENT-029 | 8fec1d5c5c4c | 3 | 3 | 2 | Agree. The stated requirement directly identifies A plan walkthrough. Other options address distinct requirements. |
| SSCP-INCIDENT-030 | 4b1cd3883b26 | 0 | 0 | 1 | Agree. The stated requirement directly identifies A tabletop exercise. Other options address distinct requirements. |
| SSCP-INCIDENT-031 | bd922ba825d6 | 0 | 0 | 0 | Agree. The stated requirement directly identifies A technical restoration exercise. Other options address distinct requirements. |
| SSCP-INCIDENT-032 | e83e065ad926 | 2 | 2 | 1 | Agree. The stated requirement directly identifies A controlled failover exercise. Other options address distinct requirements. |
| SSCP-INCIDENT-033 | 53df6fdbd905 | 3 | 3 | 2 | Agree. 3 <= 4 hours RTO met; 20 <= 30 minutes RPO met. |
| SSCP-INCIDENT-034 | de0bf25140b5 | 2 | 2 | 3 | Agree. 90 <= 120 minutes RTO met; 25 > 10 minutes RPO missed. |
| SSCP-INCIDENT-035 | f92d994a59b9 | 1 | 1 | 2 | Agree. 80 > 60 minutes RTO missed; 5 <= 15 minutes RPO met. |
| SSCP-INCIDENT-036 | 1d5123e41610 | 1 | 1 | 1 | Agree. 4 > 3 hours RTO missed; 12 > 5 minutes RPO missed. |
| SSCP-NETWORK-001 | acaa70fa4075 | 1 | 1 | 0 | Agree. The stated requirement directly identifies A network-layer routing decision. Other options address distinct requirements. |
| SSCP-NETWORK-002 | 3fd9cbdaa759 | 3 | 3 | 2 | Agree. The stated requirement directly identifies A transport-layer port check. Other options address distinct requirements. |
| SSCP-NETWORK-003 | 743a2b23e6fe | 2 | 2 | 2 | Agree. The stated requirement directly identifies An application-layer request check. Other options address distinct requirements. |
| SSCP-NETWORK-004 | aa9eda575fe8 | 2 | 2 | 0 | Agree. The stated requirement directly identifies A link-layer forwarding decision. Other options address distinct requirements. |
| SSCP-NETWORK-005 | 3bf4f2edd960 | 3 | 3 | 1 | Agree. The stated requirement directly identifies A stateful firewall. Other options address distinct requirements. |
| SSCP-NETWORK-006 | 4964ed915d52 | 1 | 1 | 0 | Agree. The stated requirement directly identifies A web application firewall. Other options address distinct requirements. |
| SSCP-NETWORK-007 | f16489f827ff | 3 | 3 | 0 | Agree. The stated requirement directly identifies A network intrusion detector. Other options address distinct requirements. |
| SSCP-NETWORK-008 | e7246090800d | 2 | 2 | 2 | Agree. The stated requirement directly identifies A network access control service. Other options address distinct requirements. |
| SSCP-NETWORK-009 | 3ac76ee53486 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Separate the guest network. Other options address distinct requirements. |
| SSCP-NETWORK-010 | 7ef3a03328d6 | 0 | 0 | 3 | Agree. The stated requirement directly identifies Restrict inter-segment traffic. Other options address distinct requirements. |
| SSCP-NETWORK-011 | 3daa60157ae4 | 1 | 1 | 3 | Agree. The stated requirement directly identifies Protect the management interface. Other options address distinct requirements. |
| SSCP-NETWORK-012 | 4580a7624897 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Place the sensor on the required path. Other options address distinct requirements. |
| SSCP-NETWORK-013 | c4b612195160 | 2 | 2 | 3 | Agree. The stated requirement directly identifies A site-to-site VPN. Other options address distinct requirements. |
| SSCP-NETWORK-014 | 74c7431f7895 | 2 | 2 | 0 | Agree. The stated requirement directly identifies A remote-access VPN. Other options address distinct requirements. |
| SSCP-NETWORK-015 | 4659e1785eb1 | 2 | 2 | 0 | Agree. The stated requirement directly identifies A virtual desktop service. Other options address distinct requirements. |
| SSCP-NETWORK-016 | fd3c5104996b | 1 | 1 | 1 | Agree. The stated requirement directly identifies An application reverse proxy. Other options address distinct requirements. |
| SSCP-NETWORK-017 | 91b9a0687c29 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Verify the wireless authentication server. Other options address distinct requirements. |
| SSCP-NETWORK-018 | bd3f0457fbf4 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Use individual enterprise credentials. Other options address distinct requirements. |
| SSCP-NETWORK-019 | 39f1fb575255 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Isolate untrusted wireless clients. Other options address distinct requirements. |
| SSCP-NETWORK-020 | 8a08135c2d82 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Retire unsupported wireless equipment. Other options address distinct requirements. |
| SSCP-NETWORK-021 | c69c6695a150 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Distributed denial of service. Other options address distinct requirements. |
| SSCP-NETWORK-022 | b7da277ec5b7 | 1 | 1 | 3 | Agree. The stated requirement directly identifies On-path interception. Other options address distinct requirements. |
| SSCP-NETWORK-023 | e48eefd0e07c | 3 | 3 | 2 | Agree. The stated requirement directly identifies DNS cache poisoning. Other options address distinct requirements. |
| SSCP-NETWORK-024 | 9312f74d68f7 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Unauthorized network attachment. Other options address distinct requirements. |
| SSCP-NETWORK-025 | 674d7f7246f2 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Upstream traffic filtering. Other options address distinct requirements. |
| SSCP-NETWORK-026 | 83073008fd6c | 0 | 0 | 0 | Agree. The stated requirement directly identifies Authenticated channel protection. Other options address distinct requirements. |
| SSCP-NETWORK-027 | f037a1c6e0fa | 0 | 0 | 2 | Agree. The stated requirement directly identifies DNSSEC validation. Other options address distinct requirements. |
| SSCP-NETWORK-028 | e827ed808426 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Network admission enforcement. Other options address distinct requirements. |
| SSCP-NETWORK-029 | 1edfed6004b0 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Limit the IoT device's network paths. Other options address distinct requirements. |
| SSCP-NETWORK-030 | c846e6ce55a1 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Validate the firmware update source. Other options address distinct requirements. |
| SSCP-NETWORK-031 | 65cc3fc5c16b | 1 | 1 | 2 | Agree. The stated requirement directly identifies Replace default device credentials. Other options address distinct requirements. |
| SSCP-NETWORK-032 | a4dfdae49e1b | 3 | 3 | 2 | Agree. The stated requirement directly identifies Plan for the device's end of support. Other options address distinct requirements. |
| SSCP-NETWORK-033 | 2b0eb9f31fec | 2 | 2 | 2 | Agree. The stated requirement directly identifies Review the rule's business owner. Other options address distinct requirements. |
| SSCP-NETWORK-034 | 1dde05788317 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Check the rule order. Other options address distinct requirements. |
| SSCP-NETWORK-035 | b7b890471d59 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Test the intended traffic flow. Other options address distinct requirements. |
| SSCP-NETWORK-036 | a6ebc2d641e6 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Remove the expired exception. Other options address distinct requirements. |
| SSCP-NETWORK-037 | 05131e4c9085 | 0 | 0 | 0 | Agree. Best available choice, but authentication alone does not guarantee confidentiality/integrity. Change option to authenticated encrypted administrative access. |
| SSCP-NETWORK-038 | 7d2854c31acd | 2 | 2 | 3 | Agree. The stated requirement directly identifies Synchronize the device clock. Other options address distinct requirements. |
| SSCP-NETWORK-039 | b8a2e3962e87 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Centralize device event collection. Other options address distinct requirements. |
| SSCP-NETWORK-040 | 2dfab7ab3d75 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Back up the approved configuration. Other options address distinct requirements. |
| SSCP-RISK-001 | 63f97025c10f | 0 | 0 | 3 | Agree. The stated requirement directly identifies A threat source. Other options address distinct requirements. |
| SSCP-RISK-002 | 69032782728c | 1 | 1 | 0 | Agree. The stated requirement directly identifies A vulnerability. Other options address distinct requirements. |
| SSCP-RISK-003 | 5fd8fcf25164 | 3 | 3 | 0 | Agree. The stated requirement directly identifies A business impact. Other options address distinct requirements. |
| SSCP-RISK-004 | 5323180fff15 | 3 | 3 | 3 | Agree. The stated requirement directly identifies An implemented safeguard. Other options address distinct requirements. |
| SSCP-RISK-005 | c397b613aa00 | 3 | 3 | 1 | Agree. The stated requirement directly identifies Avoid the risky activity. Other options address distinct requirements. |
| SSCP-RISK-006 | 1f44eb6e81ec | 3 | 3 | 2 | Agree. The stated requirement directly identifies Mitigate the identified risk. Other options address distinct requirements. |
| SSCP-RISK-007 | a0fd865c6e06 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Transfer specified financial exposure. Other options address distinct requirements. |
| SSCP-RISK-008 | b8031e405f40 | 3 | 3 | 1 | Agree. The stated requirement directly identifies Accept the residual risk. Other options address distinct requirements. |
| SSCP-RISK-009 | 6a7b1d555d44 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Define the assessment scope. Other options address distinct requirements. |
| SSCP-RISK-010 | 8a970b722fd9 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Identify the affected assets. Other options address distinct requirements. |
| SSCP-RISK-011 | afa9e472b978 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Estimate likelihood and impact. Other options address distinct requirements. |
| SSCP-RISK-012 | cabc3173398f | 1 | 1 | 1 | Agree. The stated requirement directly identifies Assign the risk response owner. Other options address distinct requirements. |
| SSCP-RISK-013 | f11ce626c9d3 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Technical severity. Other options address distinct requirements. |
| SSCP-RISK-014 | 8d77341b70dc | 3 | 3 | 0 | Agree. The stated requirement directly identifies Asset criticality. Other options address distinct requirements. |
| SSCP-RISK-015 | e7a4b69194b7 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Observed exploitation. Other options address distinct requirements. |
| SSCP-RISK-016 | ff3cee86aab3 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Control effectiveness. Other options address distinct requirements. |
| SSCP-RISK-017 | deee1e1cdd37 | 3 | 3 | 1 | Agree. The stated requirement directly identifies Validate the finding. Other options address distinct requirements. |
| SSCP-RISK-018 | 38f9541ea175 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Prioritize the remediation. Other options address distinct requirements. |
| SSCP-RISK-019 | c74c3b341a86 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Implement the approved correction. Other options address distinct requirements. |
| SSCP-RISK-020 | 3230ab730679 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Verify the remediation outcome. Other options address distinct requirements. |
| SSCP-RISK-021 | 12a87c0f1bab | 0 | 0 | 0 | Agree. The stated requirement directly identifies A false positive. Other options address distinct requirements. |
| SSCP-RISK-022 | 9bff6b737ec7 | 0 | 0 | 0 | Agree. The stated requirement directly identifies A false negative. Other options address distinct requirements. |
| SSCP-RISK-023 | 83c2d9fe8145 | 0 | 0 | 2 | Agree. The stated requirement directly identifies A true positive. Other options address distinct requirements. |
| SSCP-RISK-024 | f4bd7897fd5b | 2 | 2 | 0 | Agree. The stated requirement directly identifies A true negative. Other options address distinct requirements. |
| SSCP-RISK-025 | f592d4ca5b58 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Establish a normal baseline. Other options address distinct requirements. |
| SSCP-RISK-026 | dd23dd0e5253 | 3 | 3 | 1 | Agree. The stated requirement directly identifies Correlate related events. Other options address distinct requirements. |
| SSCP-RISK-027 | 6ba6163754fa | 1 | 1 | 3 | Agree. The stated requirement directly identifies Normalize event timestamps. Other options address distinct requirements. |
| SSCP-RISK-028 | ab2e7018ea93 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Protect retained log evidence. Other options address distinct requirements. |
| SSCP-RISK-029 | 8cee996e58a7 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Credentialed configuration assessment. Other options address distinct requirements. |
| SSCP-RISK-030 | deb685afcf9a | 3 | 3 | 1 | Agree. The stated requirement directly identifies External exposure assessment. Other options address distinct requirements. |
| SSCP-RISK-031 | 7b627d03c813 | 1 | 1 | 3 | Agree. The stated requirement directly identifies Authorized penetration testing. Other options address distinct requirements. |
| SSCP-RISK-032 | e7427fd2dfb7 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Compliance evidence review. Other options address distinct requirements. |
| SSCP-RISK-033 | 231633ab429b | 2 | 2 | 3 | Agree. The stated requirement directly identifies Data retention requirements. Other options address distinct requirements. |
| SSCP-RISK-034 | 0ffd1561c8ce | 1 | 1 | 3 | Agree. The stated requirement directly identifies Data-location requirements. Other options address distinct requirements. |
| SSCP-RISK-035 | 625c48796689 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Permitted processing purposes. Other options address distinct requirements. |
| SSCP-RISK-036 | f48061389d25 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Breach notification obligations. Other options address distinct requirements. |
| SSCP-RISK-037 | d9c6e6979399 | 3 | 3 | 0 | Agree. 10/200 × 100 = 5%. |
| SSCP-RISK-038 | 0360aaf5eeec | 2 | 2 | 1 | Agree. 30/150 × 100 = 20%. |
| SSCP-RISK-039 | cc172eb69fa8 | 3 | 3 | 1 | Agree. 40/50 × 100 = 80%. |
| SSCP-RISK-040 | b678a1090b55 | 0 | 0 | 0 | Agree. 57/60 × 100 = 95%. |
| SSCP-SYSTEMS-001 | b72bf7889678 | 3 | 3 | 2 | Agree. The stated requirement directly identifies Application allowlisting. Other options address distinct requirements. |
| SSCP-SYSTEMS-002 | fe5470bcdf43 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Endpoint behavior monitoring. Other options address distinct requirements. |
| SSCP-SYSTEMS-003 | 55e955f6b274 | 3 | 3 | 1 | Agree. The stated requirement directly identifies Full-disk encryption. Other options address distinct requirements. |
| SSCP-SYSTEMS-004 | 31f4f0768193 | 0 | 0 | 3 | Agree. The stated requirement directly identifies Host firewall enforcement. Other options address distinct requirements. |
| SSCP-SYSTEMS-005 | f2d74ed8ffa4 | 3 | 3 | 0 | Agree. The stated requirement directly identifies Malicious software disguised as a useful tool. Other options address distinct requirements. |
| SSCP-SYSTEMS-006 | 11ac1a11dd9b | 3 | 3 | 0 | Agree. The stated requirement directly identifies Self-propagating malicious software. Other options address distinct requirements. |
| SSCP-SYSTEMS-007 | e179673ca4ca | 0 | 0 | 3 | Agree. The stated requirement directly identifies Malicious software that encrypts for extortion. Other options address distinct requirements. |
| SSCP-SYSTEMS-008 | b554cdd7cd55 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Software that covertly collects user information. Other options address distinct requirements. |
| SSCP-SYSTEMS-009 | 7c177e760597 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Verify through a known independent channel. Other options address distinct requirements. |
| SSCP-SYSTEMS-010 | 0de93733d957 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Report the suspicious message. Other options address distinct requirements. |
| SSCP-SYSTEMS-011 | 5f1697212136 | 0 | 0 | 2 | Agree. The stated requirement directly identifies Revoke the exposed credential. Other options address distinct requirements. |
| SSCP-SYSTEMS-012 | 2f2a724f0a00 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Preserve the relevant message evidence. Other options address distinct requirements. |
| SSCP-SYSTEMS-013 | 89ac2c67d5d4 | 2 | 2 | 1 | Agree. The stated requirement directly identifies Mobile device management. Other options address distinct requirements. |
| SSCP-SYSTEMS-014 | 862e97b625ee | 0 | 0 | 1 | Agree. The stated requirement directly identifies Mobile application management. Other options address distinct requirements. |
| SSCP-SYSTEMS-015 | c47121b51b55 | 3 | 3 | 3 | Agree. The stated requirement directly identifies Separation of work and personal data. Other options address distinct requirements. |
| SSCP-SYSTEMS-016 | f1f04c24b321 | 0 | 0 | 3 | Agree. The stated requirement directly identifies An approved remote wipe process. Other options address distinct requirements. |
| SSCP-SYSTEMS-017 | 3a01c4177e29 | 1 | 1 | 2 | Agree. The stated requirement directly identifies Infrastructure as a Service. Other options address distinct requirements. |
| SSCP-SYSTEMS-018 | 8cbcc0f36cf7 | 2 | 2 | 0 | Agree. The stated requirement directly identifies Platform as a Service. Other options address distinct requirements. |
| SSCP-SYSTEMS-019 | d79113d8e49c | 3 | 3 | 2 | Agree. The stated requirement directly identifies Software as a Service. Other options address distinct requirements. |
| SSCP-SYSTEMS-020 | a8cfd4ba2122 | 0 | 0 | 0 | Agree. The stated requirement directly identifies Customer-managed on-premises hosting. Other options address distinct requirements. |
| SSCP-SYSTEMS-021 | fd67138e1f50 | 3 | 3 | 1 | Agree. The stated requirement directly identifies A private cloud deployment. Other options address distinct requirements. |
| SSCP-SYSTEMS-022 | f9bbc1c4ebad | 2 | 2 | 3 | Agree. The stated requirement directly identifies A public cloud deployment. Other options address distinct requirements. |
| SSCP-SYSTEMS-023 | f7dca4e41435 | 0 | 0 | 0 | Agree. The stated requirement directly identifies A community cloud deployment. Other options address distinct requirements. |
| SSCP-SYSTEMS-024 | c4cb3c684758 | 2 | 2 | 3 | Agree. The stated requirement directly identifies A hybrid cloud deployment. Other options address distinct requirements. |
| SSCP-SYSTEMS-025 | 203891c2c174 | 2 | 2 | 3 | Agree. The stated requirement directly identifies Patch the guest operating system. Other options address distinct requirements. |
| SSCP-SYSTEMS-026 | 31d6abe5a7ee | 1 | 1 | 2 | Agree. The stated requirement directly identifies Review tenant access permissions. Other options address distinct requirements. |
| SSCP-SYSTEMS-027 | a7c8aee25e58 | 1 | 1 | 1 | Agree. The stated requirement directly identifies Assess the provider's assurance evidence. Other options address distinct requirements. |
| SSCP-SYSTEMS-028 | f1f3cf49284a | 1 | 1 | 3 | Agree. The stated requirement directly identifies Define service exit requirements. Other options address distinct requirements. |
| SSCP-SYSTEMS-029 | 51fb7d222c9f | 0 | 0 | 2 | Agree. The stated requirement directly identifies A type 1 hypervisor. Other options address distinct requirements. |
| SSCP-SYSTEMS-030 | 026136d58c59 | 3 | 3 | 2 | Agree. The stated requirement directly identifies A type 2 hypervisor. Other options address distinct requirements. |
| SSCP-SYSTEMS-031 | 5bf0380651a0 | 2 | 2 | 2 | Agree. The stated requirement directly identifies Operating-system-level containers. Other options address distinct requirements. |
| SSCP-SYSTEMS-032 | 31dd58c81b10 | 2 | 2 | 0 | Agree. The stated requirement directly identifies A virtual machine snapshot. Other options address distinct requirements. |
| SSCP-SYSTEMS-033 | 9ad7f33986ff | 2 | 2 | 2 | Agree. The stated requirement directly identifies Harden the virtualization management plane. Other options address distinct requirements. |
| SSCP-SYSTEMS-034 | 64182d9f989b | 1 | 1 | 0 | Agree. The stated requirement directly identifies Limit unnecessary host integration. Other options address distinct requirements. |
| SSCP-SYSTEMS-035 | 51db1bb916e7 | 2 | 2 | 3 | Agree. The stated requirement directly identifies Control image provenance. Other options address distinct requirements. |
| SSCP-SYSTEMS-036 | b8a0c5781358 | 0 | 0 | 1 | Agree. The stated requirement directly identifies Remove abandoned virtual machines. Other options address distinct requirements. |
| SSCP-SYSTEMS-037 | 527d8418ce92 | 1 | 1 | 0 | Agree. The stated requirement directly identifies Parameterize database values. Other options address distinct requirements. |
| SSCP-SYSTEMS-038 | 65db84f7d2bd | 0 | 0 | 2 | Agree. The stated requirement directly identifies Encode output for its context. Other options address distinct requirements. |
| SSCP-SYSTEMS-039 | 3a35056f575e | 1 | 1 | 0 | Agree. The stated requirement directly identifies Authorize each object request. Other options address distinct requirements. |
| SSCP-SYSTEMS-040 | c3b318991f4d | 0 | 0 | 0 | Agree. The stated requirement directly identifies Validate software dependencies. Other options address distinct requirements. |
