# Independent SecurityX conceptual MCQ review

Reviewed 2026-11-17. Complete 240-item census, not a sample. Zero wrong-key findings, zero numerical errors, zero high/medium technical defects, one minor wording ambiguity and one bank-level editorial limitation. Suitable for the explicitly limited conceptual MCQ scope; not an exam-readiness or PBQ-equivalence endorsement.

## Blind protocol

Read only options-only.json first. Grouped identical unordered option sets into 60 groups and chose a plausible option by its wording for each group; wrote 240 zero-based guesses with cue reasons to options-guesses.json. No stems, private keys, source bank, previous reviews or source notes were read before this freeze. Then read all 240 blind stems in three 80-item batches, independently selected each answer, recalculated all eight numeric items, and froze answers.json. Only afterward read sources.md, keys-private.json and id-map-private.json. All predictions were retained unchanged after comparison. Option grouping is a deliberate consistent cue heuristic, not 240 statistically independent trials; the exact 25% results reflect the bank's four-way concept balancing and do not prove an absence of every possible cue.

## Results

| Domain | Count | Full-stem agreement | Options-only correct | >40% gate |
|---|---:|---:|---:|---|
| securityxGrc | 48 | 48/48 (100%) | 12/48 (25%) | PASS |
| securityxArchitecture | 64 | 64/64 (100%) | 16/64 (25%) | PASS |
| securityxEngineering | 76 | 76/76 (100%) | 19/76 (25%) | PASS |
| securityxOperations | 52 | 52/52 (100%) | 13/52 (25%) | PASS |

Total: full-stem 240/240; options-only 60/240. All four domain gates pass.

## Findings and constraints

1. Minor ambiguity, SECURITYX-ARCHITECTURE-001: the broad-segment gateway scenario asks which change narrows an implicit trust zone. Both workload segmentation and resource-adjacent enforcement can narrow trust. The missing checks on individual applications make the keyed resource enforcement answer best, and I selected it blind. Optional improvement: specify that network segmentation is already in place and that the defect is missing per-resource authorization. No key change recommended.
2. Bank-level editorial limitation: 240 items use 60 repeated unordered four-option sets. Most questions explicitly identify the missing dimension and ask for its matching concept; this is useful foundational discrimination but limited enterprise synthesis. Do not market this as equivalent difficulty, comprehensive readiness, or realistic PBQ preparation. The requested conceptual-only scope makes this nonblocking. Distinct stems address distinct members of each concept family; no exact duplicate stem was identified.

Enterprise constraints were respected: safety and control-engineer validation before OT changes; approved windows and standby checks; risk acceptance only within delegated authority; holds overriding scheduled deletion; no invention of a statutory deadline; account status and session revocation distinguished; key wrapping separated from compromised data-key re-encryption; approved cryptographic-erasure prerequisites explicit; no claim that encryption repairs public-access policy. No actionable incorrect recommendation found.

## Primary-source verification

Independently accessed the following after freezing answers; checked the cited sections rather than claiming to read entire standards.

- [CompTIA CAS-005 V5 objectives v7.0](https://lecbyo.files.cmp.optimizely.com/download/35cf5f02b73211efa0ca8e42e80f1a8f), PDF pages 1–3: maximum 90 questions, MCQ plus performance-based, 165 minutes, pass/fail with no scaled score; domain weights 20/27/31/22. The reviewed census is 48/64/76/52, approximately those weights. Practice allocations are editorial. No official percentage pass prediction follows.
- [NIST SP 800-207](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf), abstract and logical components: resource-centric access, distinct authentication and authorization, decision engine versus enforcement, posture signals. Supports Architecture001–008 and related access questions; also informs the minor ambiguity above.
- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519), sections 4.1.3–4.1.5, and [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html), section 3.9: audience rejection and expiration/not-before checks. Validates recipient binding and the clock example; signature trust does not substitute for audience or permission checks.
- [NIST SP 800-82r3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf), sections 4.2.2 and 5.3.1: security controls must account for safety systems and physical effects. Supports Engineering045–052's stated operational constraints.
- [NIST SP 800-88r2 publication](https://csrc.nist.gov/pubs/sp/800/88/r2/final) and [July 2026 FAQ](https://csrc.nist.gov/files/pubs/sp/800/88/r2/final/docs/sp800-88r2-faq.pdf), Q9: cryptographic erase requires qualifying encryption and key sanitization. Engineering076 explicitly supplies approved prerequisites, so its key-erasure choice is defensible, not a universal deletion claim.
- [CISA agency bulletin](https://content.govdelivery.com/accounts/USDHSCISA/bulletins/3355d59): phishing-resistant MFA reduces phishing exposure; number matching is weaker interim protection. Supports GRC014 risk mitigation. CISA direct webpage and fact-sheet requests returned 403; the agency-authored bulletin was successfully read. No secondary-source factual claim used.

Source notes in the producer's sources.md provide further traceability but are not themselves independent proof. This review did not inspect rendered landing-page copy or implementation; retain conceptual MCQ-only/no official-score-prediction language and have the parent integration review verify it.

## Full real-ID ledger

Every row records independently frozen zero-based answer, keyed answer, options-only guess, and technical reasoning. “OK” means a single defensible best answer under the given constraints, not a claim of exam-equivalent difficulty.

| Real ID | Blind | Key | Options-only | Review |
|---|---:|---:|---:|---|
| SECURITYX-ARCHITECTURE-001 | 1 | 1 | 2 | Minor overlap; best answer retained. Stated constraint directly requires: Place enforcement by the resource |
| SECURITYX-ARCHITECTURE-002 | 1 | 1 | 0 | OK. Stated constraint directly requires: Refresh the device posture signal |
| SECURITYX-ARCHITECTURE-003 | 1 | 1 | 0 | OK. Stated constraint directly requires: Separate workload trust zones |
| SECURITYX-ARCHITECTURE-004 | 1 | 1 | 1 | OK. Stated constraint directly requires: Reevaluate active access decisions |
| SECURITYX-ARCHITECTURE-005 | 1 | 1 | 1 | OK. Stated constraint directly requires: A policy decision component |
| SECURITYX-ARCHITECTURE-006 | 1 | 1 | 3 | OK. Stated constraint directly requires: A policy enforcement component |
| SECURITYX-ARCHITECTURE-007 | 3 | 3 | 1 | OK. Stated constraint directly requires: An identity evidence provider |
| SECURITYX-ARCHITECTURE-008 | 2 | 2 | 0 | OK. Stated constraint directly requires: An asset posture information feed |
| SECURITYX-ARCHITECTURE-009 | 1 | 1 | 1 | OK. Stated constraint directly requires: Attribute-based authorization |
| SECURITYX-ARCHITECTURE-010 | 1 | 1 | 0 | OK. Stated constraint directly requires: Role-based authorization |
| SECURITYX-ARCHITECTURE-011 | 0 | 0 | 1 | OK. Stated constraint directly requires: Owner-controlled authorization |
| SECURITYX-ARCHITECTURE-012 | 1 | 1 | 0 | OK. Stated constraint directly requires: Label-enforced authorization |
| SECURITYX-ARCHITECTURE-013 | 2 | 2 | 3 | OK. Stated constraint directly requires: Review source without execution |
| SECURITYX-ARCHITECTURE-014 | 2 | 2 | 3 | OK. Stated constraint directly requires: Exercise a running application |
| SECURITYX-ARCHITECTURE-015 | 3 | 3 | 2 | OK. Stated constraint directly requires: Inspect third-party components |
| SECURITYX-ARCHITECTURE-016 | 3 | 3 | 3 | OK. Stated constraint directly requires: Observe instrumented execution |
| SECURITYX-ARCHITECTURE-017 | 1 | 1 | 0 | OK. Stated constraint directly requires: Gate changes through peer review |
| SECURITYX-ARCHITECTURE-018 | 1 | 1 | 3 | OK. Stated constraint directly requires: Stage a limited canary rollout |
| SECURITYX-ARCHITECTURE-019 | 3 | 3 | 1 | OK. Stated constraint directly requires: Run regression checks |
| SECURITYX-ARCHITECTURE-020 | 1 | 1 | 1 | OK. Stated constraint directly requires: Verify release provenance |
| SECURITYX-ARCHITECTURE-021 | 1 | 1 | 1 | OK. Stated constraint directly requires: A component inventory artifact |
| SECURITYX-ARCHITECTURE-022 | 0 | 0 | 3 | OK. Stated constraint directly requires: A security requirement baseline |
| SECURITYX-ARCHITECTURE-023 | 3 | 3 | 2 | OK. Stated constraint directly requires: A release integrity signature |
| SECURITYX-ARCHITECTURE-024 | 3 | 3 | 1 | OK. Stated constraint directly requires: A vulnerability disclosure process |
| SECURITYX-ARCHITECTURE-025 | 3 | 3 | 2 | OK. Stated constraint directly requires: Reduce exposed service functions |
| SECURITYX-ARCHITECTURE-026 | 0 | 0 | 0 | OK. Stated constraint directly requires: Add independent security layers |
| SECURITYX-ARCHITECTURE-027 | 1 | 1 | 0 | OK. Stated constraint directly requires: Centralize useful audit records |
| SECURITYX-ARCHITECTURE-028 | 2 | 2 | 1 | OK. Stated constraint directly requires: Measure the control outcome |
| SECURITYX-ARCHITECTURE-029 | 2 | 2 | 1 | OK. Stated constraint directly requires: A resource-specific service identity |
| SECURITYX-ARCHITECTURE-030 | 3 | 3 | 3 | OK. Stated constraint directly requires: A time-limited privileged role |
| SECURITYX-ARCHITECTURE-031 | 2 | 2 | 1 | OK. Stated constraint directly requires: A federated workforce identity |
| SECURITYX-ARCHITECTURE-032 | 0 | 0 | 2 | OK. Stated constraint directly requires: A separate emergency account |
| SECURITYX-ARCHITECTURE-033 | 3 | 3 | 0 | OK. Stated constraint directly requires: Identity proofing before issuance |
| SECURITYX-ARCHITECTURE-034 | 2 | 2 | 1 | OK. Stated constraint directly requires: Certificate signing by the CA |
| SECURITYX-ARCHITECTURE-035 | 0 | 0 | 0 | OK. Stated constraint directly requires: Revocation-status validation |
| SECURITYX-ARCHITECTURE-036 | 2 | 2 | 3 | OK. Stated constraint directly requires: Hostname identity validation |
| SECURITYX-ARCHITECTURE-037 | 0 | 0 | 3 | OK. Stated constraint directly requires: An inline traffic control |
| SECURITYX-ARCHITECTURE-038 | 1 | 1 | 3 | OK. Stated constraint directly requires: An API-based content review |
| SECURITYX-ARCHITECTURE-039 | 2 | 2 | 2 | OK. Stated constraint directly requires: A cloud configuration assessment |
| SECURITYX-ARCHITECTURE-040 | 0 | 0 | 3 | OK. Stated constraint directly requires: A workload runtime sensor |
| SECURITYX-ARCHITECTURE-041 | 1 | 1 | 3 | OK. Stated constraint directly requires: Constrain the tenant access policy |
| SECURITYX-ARCHITECTURE-042 | 3 | 3 | 3 | OK. Stated constraint directly requires: Limit the application permission |
| SECURITYX-ARCHITECTURE-043 | 0 | 0 | 2 | OK. Stated constraint directly requires: Protect the application data key |
| SECURITYX-ARCHITECTURE-044 | 0 | 0 | 1 | OK. Stated constraint directly requires: Record the administrative changes |
| SECURITYX-ARCHITECTURE-045 | 2 | 2 | 2 | OK. Stated constraint directly requires: Isolate independent failure zones |
| SECURITYX-ARCHITECTURE-046 | 2 | 2 | 1 | OK. Stated constraint directly requires: Distribute stateless request load |
| SECURITYX-ARCHITECTURE-047 | 0 | 0 | 2 | OK. Stated constraint directly requires: Preserve session state externally |
| SECURITYX-ARCHITECTURE-048 | 3 | 3 | 0 | OK. Stated constraint directly requires: Test restoration from backup |
| SECURITYX-ARCHITECTURE-049 | 2 | 2 | 2 | OK. Stated constraint directly requires: Minimize retained sensitive fields |
| SECURITYX-ARCHITECTURE-050 | 1 | 1 | 0 | OK. Stated constraint directly requires: Label the data by sensitivity |
| SECURITYX-ARCHITECTURE-051 | 0 | 0 | 3 | OK. Stated constraint directly requires: Restrict copies in test systems |
| SECURITYX-ARCHITECTURE-052 | 0 | 0 | 3 | OK. Stated constraint directly requires: Track the final disposal evidence |
| SECURITYX-ARCHITECTURE-053 | 1 | 1 | 3 | OK. Stated constraint directly requires: Separate approval from deployment |
| SECURITYX-ARCHITECTURE-054 | 1 | 1 | 2 | OK. Stated constraint directly requires: Limit the build-runner identity |
| SECURITYX-ARCHITECTURE-055 | 1 | 1 | 1 | OK. Stated constraint directly requires: Validate third-party build inputs |
| SECURITYX-ARCHITECTURE-056 | 3 | 3 | 1 | OK. Stated constraint directly requires: Isolate untrusted test execution |
| SECURITYX-ARCHITECTURE-057 | 1 | 1 | 1 | OK. Stated constraint directly requires: Require context-aware reauthentication |
| SECURITYX-ARCHITECTURE-058 | 1 | 1 | 2 | OK. Stated constraint directly requires: Scope the partner resource grant |
| SECURITYX-ARCHITECTURE-059 | 0 | 0 | 2 | OK. Stated constraint directly requires: Revoke the former worker session |
| SECURITYX-ARCHITECTURE-060 | 1 | 1 | 2 | OK. Stated constraint directly requires: Audit the privileged transaction |
| SECURITYX-ARCHITECTURE-061 | 1 | 1 | 1 | OK. Stated constraint directly requires: A four-hour recovery objective |
| SECURITYX-ARCHITECTURE-062 | 2 | 2 | 1 | OK. Stated constraint directly requires: A fifteen-minute data-loss objective |
| SECURITYX-ARCHITECTURE-063 | 0 | 0 | 1 | OK. Stated constraint directly requires: A six-hour maximum outage limit |
| SECURITYX-ARCHITECTURE-064 | 0 | 0 | 1 | OK. Stated constraint directly requires: A two-hour measured restoration |
| SECURITYX-ENGINEERING-001 | 1 | 1 | 1 | OK. Stated constraint directly requires: Correct the token audience |
| SECURITYX-ENGINEERING-002 | 1 | 1 | 0 | OK. Stated constraint directly requires: Refresh the signing-key cache |
| SECURITYX-ENGINEERING-003 | 2 | 2 | 1 | OK. Stated constraint directly requires: Correct the verifier clock |
| SECURITYX-ENGINEERING-004 | 2 | 2 | 0 | OK. Stated constraint directly requires: Restore the required permission |
| SECURITYX-ENGINEERING-005 | 3 | 3 | 0 | OK. Stated constraint directly requires: Repair the federation trust |
| SECURITYX-ENGINEERING-006 | 2 | 2 | 1 | OK. Stated constraint directly requires: Remove an obsolete role grant |
| SECURITYX-ENGINEERING-007 | 1 | 1 | 2 | OK. Stated constraint directly requires: Renew the device attestation |
| SECURITYX-ENGINEERING-008 | 3 | 3 | 3 | OK. Stated constraint directly requires: Revoke the compromised credential |
| SECURITYX-ENGINEERING-009 | 3 | 3 | 3 | OK. Stated constraint directly requires: Constrain the resource scope |
| SECURITYX-ENGINEERING-010 | 2 | 2 | 0 | OK. Stated constraint directly requires: Shorten the privilege duration |
| SECURITYX-ENGINEERING-011 | 3 | 3 | 2 | OK. Stated constraint directly requires: Require a second approval |
| SECURITYX-ENGINEERING-012 | 3 | 3 | 2 | OK. Stated constraint directly requires: Record the privileged session |
| SECURITYX-ENGINEERING-013 | 3 | 3 | 1 | OK. Stated constraint directly requires: Separate authentication from access |
| SECURITYX-ENGINEERING-014 | 0 | 0 | 0 | OK. Stated constraint directly requires: Bind the assertion to its recipient |
| SECURITYX-ENGINEERING-015 | 3 | 3 | 1 | OK. Stated constraint directly requires: Validate current account status |
| SECURITYX-ENGINEERING-016 | 3 | 3 | 0 | OK. Stated constraint directly requires: Use an independent recovery path |
| SECURITYX-ENGINEERING-017 | 1 | 1 | 0 | OK. Stated constraint directly requires: Application execution control |
| SECURITYX-ENGINEERING-018 | 0 | 0 | 0 | OK. Stated constraint directly requires: Endpoint behavioral detection |
| SECURITYX-ENGINEERING-019 | 2 | 2 | 1 | OK. Stated constraint directly requires: Host network filtering |
| SECURITYX-ENGINEERING-020 | 1 | 1 | 3 | OK. Stated constraint directly requires: Browser execution isolation |
| SECURITYX-ENGINEERING-021 | 3 | 3 | 2 | OK. Stated constraint directly requires: Drop unnecessary capabilities |
| SECURITYX-ENGINEERING-022 | 0 | 0 | 0 | OK. Stated constraint directly requires: Remove the daemon socket mount |
| SECURITYX-ENGINEERING-023 | 2 | 2 | 1 | OK. Stated constraint directly requires: Make application files read-only |
| SECURITYX-ENGINEERING-024 | 2 | 2 | 3 | OK. Stated constraint directly requires: Set a bounded resource quota |
| SECURITYX-ENGINEERING-025 | 3 | 3 | 0 | OK. Stated constraint directly requires: Correct the certificate name |
| SECURITYX-ENGINEERING-026 | 3 | 3 | 3 | OK. Stated constraint directly requires: Install the required chain |
| SECURITYX-ENGINEERING-027 | 0 | 0 | 3 | OK. Stated constraint directly requires: Align supported TLS parameters |
| SECURITYX-ENGINEERING-028 | 1 | 1 | 2 | OK. Stated constraint directly requires: Renew the expired certificate |
| SECURITYX-ENGINEERING-029 | 3 | 3 | 1 | OK. Stated constraint directly requires: Check the authorized sending hosts |
| SECURITYX-ENGINEERING-030 | 0 | 0 | 0 | OK. Stated constraint directly requires: Verify the message-domain signature |
| SECURITYX-ENGINEERING-031 | 1 | 1 | 0 | OK. Stated constraint directly requires: Inspect the signed DNS response |
| SECURITYX-ENGINEERING-032 | 2 | 2 | 0 | OK. Stated constraint directly requires: Validate the TLS peer identity |
| SECURITYX-ENGINEERING-033 | 2 | 2 | 3 | OK. Stated constraint directly requires: Correct the ordered filter rule |
| SECURITYX-ENGINEERING-034 | 1 | 1 | 3 | OK. Stated constraint directly requires: Restore the missing return route |
| SECURITYX-ENGINEERING-035 | 0 | 0 | 2 | OK. Stated constraint directly requires: Move the observation point |
| SECURITYX-ENGINEERING-036 | 3 | 3 | 3 | OK. Stated constraint directly requires: Tune the validated detection rule |
| SECURITYX-ENGINEERING-037 | 2 | 2 | 2 | OK. Stated constraint directly requires: Authenticate firmware updates |
| SECURITYX-ENGINEERING-038 | 3 | 3 | 0 | OK. Stated constraint directly requires: Detect unauthorized firmware change |
| SECURITYX-ENGINEERING-039 | 3 | 3 | 2 | OK. Stated constraint directly requires: Recover a trusted firmware image |
| SECURITYX-ENGINEERING-040 | 1 | 1 | 0 | OK. Stated constraint directly requires: Protect the recovery trust anchor |
| SECURITYX-ENGINEERING-041 | 0 | 0 | 2 | OK. Stated constraint directly requires: A protected signing-key service |
| SECURITYX-ENGINEERING-042 | 3 | 3 | 3 | OK. Stated constraint directly requires: A hardware-rooted device measurement |
| SECURITYX-ENGINEERING-043 | 3 | 3 | 1 | OK. Stated constraint directly requires: An isolated execution environment |
| SECURITYX-ENGINEERING-044 | 3 | 3 | 1 | OK. Stated constraint directly requires: An encrypted storage device |
| SECURITYX-ENGINEERING-045 | 0 | 0 | 2 | OK. Stated constraint directly requires: Use passive network observation |
| SECURITYX-ENGINEERING-046 | 0 | 0 | 0 | OK. Stated constraint directly requires: Test changes with control engineers |
| SECURITYX-ENGINEERING-047 | 1 | 1 | 3 | OK. Stated constraint directly requires: Restrict the permitted OT flows |
| SECURITYX-ENGINEERING-048 | 0 | 0 | 1 | OK. Stated constraint directly requires: Plan supported component replacement |
| SECURITYX-ENGINEERING-049 | 2 | 2 | 2 | OK. Stated constraint directly requires: Preserve the validated safety response |
| SECURITYX-ENGINEERING-050 | 1 | 1 | 2 | OK. Stated constraint directly requires: Schedule a controlled maintenance window |
| SECURITYX-ENGINEERING-051 | 2 | 2 | 1 | OK. Stated constraint directly requires: Verify the redundant control path |
| SECURITYX-ENGINEERING-052 | 3 | 3 | 2 | OK. Stated constraint directly requires: Document the constrained-device exception |
| SECURITYX-ENGINEERING-053 | 2 | 2 | 3 | OK. Stated constraint directly requires: Add an idempotency check |
| SECURITYX-ENGINEERING-054 | 2 | 2 | 2 | OK. Stated constraint directly requires: Require approval for high impact |
| SECURITYX-ENGINEERING-055 | 1 | 1 | 3 | OK. Stated constraint directly requires: Validate the event authenticity |
| SECURITYX-ENGINEERING-056 | 1 | 1 | 0 | OK. Stated constraint directly requires: Constrain the automation identity |
| SECURITYX-ENGINEERING-057 | 1 | 1 | 1 | OK. Stated constraint directly requires: Evaluate the proposed configuration |
| SECURITYX-ENGINEERING-058 | 2 | 2 | 1 | OK. Stated constraint directly requires: Detect divergence from the baseline |
| SECURITYX-ENGINEERING-059 | 2 | 2 | 1 | OK. Stated constraint directly requires: Apply the approved correction |
| SECURITYX-ENGINEERING-060 | 2 | 2 | 1 | OK. Stated constraint directly requires: Verify the resulting service state |
| SECURITYX-ENGINEERING-061 | 3 | 3 | 3 | OK. Stated constraint directly requires: Authenticated payload encryption |
| SECURITYX-ENGINEERING-062 | 0 | 0 | 1 | OK. Stated constraint directly requires: A publisher digital signature |
| SECURITYX-ENGINEERING-063 | 1 | 1 | 2 | OK. Stated constraint directly requires: A protected password hash |
| SECURITYX-ENGINEERING-064 | 2 | 2 | 1 | OK. Stated constraint directly requires: A tokenized business identifier |
| SECURITYX-ENGINEERING-065 | 1 | 1 | 1 | OK. Stated constraint directly requires: Rewrap the data-encryption keys |
| SECURITYX-ENGINEERING-066 | 0 | 0 | 1 | OK. Stated constraint directly requires: Reencrypt the affected payloads |
| SECURITYX-ENGINEERING-067 | 3 | 3 | 0 | OK. Stated constraint directly requires: Generate a fresh data key |
| SECURITYX-ENGINEERING-068 | 1 | 1 | 0 | OK. Stated constraint directly requires: Retain required historical keys |
| SECURITYX-ENGINEERING-069 | 1 | 1 | 2 | OK. Stated constraint directly requires: Protect past session secrecy |
| SECURITYX-ENGINEERING-070 | 2 | 2 | 2 | OK. Stated constraint directly requires: Plan quantum-resistant key exchange |
| SECURITYX-ENGINEERING-071 | 0 | 0 | 3 | OK. Stated constraint directly requires: Increase password-guessing cost |
| SECURITYX-ENGINEERING-072 | 1 | 1 | 3 | OK. Stated constraint directly requires: Split control of key recovery |
| SECURITYX-ENGINEERING-073 | 3 | 3 | 0 | OK. Stated constraint directly requires: Compute over protected ciphertext |
| SECURITYX-ENGINEERING-074 | 0 | 0 | 0 | OK. Stated constraint directly requires: Authenticate visible associated data |
| SECURITYX-ENGINEERING-075 | 1 | 1 | 2 | OK. Stated constraint directly requires: Establish both peers' identities |
| SECURITYX-ENGINEERING-076 | 1 | 1 | 3 | OK. Stated constraint directly requires: Erase the protected decryption key |
| SECURITYX-GRC-001 | 0 | 0 | 3 | OK. Stated constraint directly requires: Map obligations to controls |
| SECURITYX-GRC-002 | 0 | 0 | 0 | OK. Stated constraint directly requires: Assign decision ownership |
| SECURITYX-GRC-003 | 2 | 2 | 1 | OK. Stated constraint directly requires: Reconcile the asset inventory |
| SECURITYX-GRC-004 | 2 | 2 | 1 | OK. Stated constraint directly requires: Approve an exception expiry |
| SECURITYX-GRC-005 | 3 | 3 | 1 | OK. Stated constraint directly requires: Measure the current outcomes |
| SECURITYX-GRC-006 | 0 | 0 | 0 | OK. Stated constraint directly requires: Define the desired outcomes |
| SECURITYX-GRC-007 | 1 | 1 | 3 | OK. Stated constraint directly requires: Prioritize the identified gaps |
| SECURITYX-GRC-008 | 1 | 1 | 2 | OK. Stated constraint directly requires: Verify the completed changes |
| SECURITYX-GRC-009 | 2 | 2 | 3 | OK. Stated constraint directly requires: Establish a supplier baseline |
| SECURITYX-GRC-010 | 3 | 3 | 3 | OK. Stated constraint directly requires: Assess a new subprocessor |
| SECURITYX-GRC-011 | 0 | 0 | 2 | OK. Stated constraint directly requires: Exercise joint incident duties |
| SECURITYX-GRC-012 | 2 | 2 | 1 | OK. Stated constraint directly requires: Revoke access at termination |
| SECURITYX-GRC-013 | 2 | 2 | 3 | OK. Stated constraint directly requires: Accept the documented exposure |
| SECURITYX-GRC-014 | 3 | 3 | 3 | OK. Stated constraint directly requires: Reduce the event likelihood |
| SECURITYX-GRC-015 | 0 | 0 | 1 | OK. Stated constraint directly requires: Transfer the financial impact |
| SECURITYX-GRC-016 | 3 | 3 | 1 | OK. Stated constraint directly requires: Discontinue the risky service |
| SECURITYX-GRC-017 | 1 | 1 | 1 | OK. Stated constraint directly requires: Compare quantified loss estimates |
| SECURITYX-GRC-018 | 3 | 3 | 2 | OK. Stated constraint directly requires: Rank defined impact bands |
| SECURITYX-GRC-019 | 0 | 0 | 2 | OK. Stated constraint directly requires: Test the recovery capability |
| SECURITYX-GRC-020 | 3 | 3 | 0 | OK. Stated constraint directly requires: Validate the control evidence |
| SECURITYX-GRC-021 | 2 | 2 | 2 | OK. Stated constraint directly requires: Preserve the held records |
| SECURITYX-GRC-022 | 0 | 0 | 2 | OK. Stated constraint directly requires: Apply the retention schedule |
| SECURITYX-GRC-023 | 3 | 3 | 2 | OK. Stated constraint directly requires: Restrict the processing purpose |
| SECURITYX-GRC-024 | 1 | 1 | 2 | OK. Stated constraint directly requires: Review cross-border obligations |
| SECURITYX-GRC-025 | 0 | 0 | 0 | OK. Stated constraint directly requires: Trace the data and trust boundaries |
| SECURITYX-GRC-026 | 1 | 1 | 3 | OK. Stated constraint directly requires: Enumerate the relevant threat paths |
| SECURITYX-GRC-027 | 2 | 2 | 3 | OK. Stated constraint directly requires: Select risk-reducing safeguards |
| SECURITYX-GRC-028 | 3 | 3 | 1 | OK. Stated constraint directly requires: Retest the revised design |
| SECURITYX-GRC-029 | 2 | 2 | 2 | OK. Stated constraint directly requires: Limit the assistant permissions |
| SECURITYX-GRC-030 | 2 | 2 | 0 | OK. Stated constraint directly requires: Validate downstream model output |
| SECURITYX-GRC-031 | 2 | 2 | 3 | OK. Stated constraint directly requires: Control training-data provenance |
| SECURITYX-GRC-032 | 0 | 0 | 3 | OK. Stated constraint directly requires: Require human decision review |
| SECURITYX-GRC-033 | 2 | 2 | 2 | OK. Stated constraint directly requires: An indirect prompt injection |
| SECURITYX-GRC-034 | 2 | 2 | 0 | OK. Stated constraint directly requires: An unauthorized model disclosure |
| SECURITYX-GRC-035 | 0 | 0 | 2 | OK. Stated constraint directly requires: An availability resource attack |
| SECURITYX-GRC-036 | 1 | 1 | 3 | OK. Stated constraint directly requires: A training-data integrity attack |
| SECURITYX-GRC-037 | 0 | 0 | 1 | OK. Stated constraint directly requires: Reassess the residual risk |
| SECURITYX-GRC-038 | 3 | 3 | 3 | OK. Stated constraint directly requires: Escalate beyond delegated authority |
| SECURITYX-GRC-039 | 2 | 2 | 1 | OK. Stated constraint directly requires: Implement the approved treatment |
| SECURITYX-GRC-040 | 1 | 1 | 0 | OK. Stated constraint directly requires: Retire a superseded risk entry |
| SECURITYX-GRC-041 | 1 | 1 | 0 | OK. Stated constraint directly requires: A policy-level requirement |
| SECURITYX-GRC-042 | 2 | 2 | 2 | OK. Stated constraint directly requires: A mandatory technical standard |
| SECURITYX-GRC-043 | 0 | 0 | 3 | OK. Stated constraint directly requires: An operational procedure |
| SECURITYX-GRC-044 | 3 | 3 | 2 | OK. Stated constraint directly requires: A nonbinding implementation guide |
| SECURITYX-GRC-045 | 2 | 2 | 3 | OK. Stated constraint directly requires: Test the communications plan |
| SECURITYX-GRC-046 | 1 | 1 | 3 | OK. Stated constraint directly requires: Check the evidence preservation plan |
| SECURITYX-GRC-047 | 0 | 0 | 3 | OK. Stated constraint directly requires: Review the business recovery order |
| SECURITYX-GRC-048 | 3 | 3 | 3 | OK. Stated constraint directly requires: Confirm the decision delegation |
| SECURITYX-OPERATIONS-001 | 1 | 1 | 0 | OK. Stated constraint directly requires: Repair the field extraction |
| SECURITYX-OPERATIONS-002 | 3 | 3 | 1 | OK. Stated constraint directly requires: Remove duplicate event ingestion |
| SECURITYX-OPERATIONS-003 | 0 | 0 | 1 | OK. Stated constraint directly requires: Restore the missing log source |
| SECURITYX-OPERATIONS-004 | 0 | 0 | 0 | OK. Stated constraint directly requires: Correct the timestamp interpretation |
| SECURITYX-OPERATIONS-005 | 0 | 0 | 1 | OK. Stated constraint directly requires: Use the asset's business impact |
| SECURITYX-OPERATIONS-006 | 2 | 2 | 3 | OK. Stated constraint directly requires: Check the signal's evidence quality |
| SECURITYX-OPERATIONS-007 | 3 | 3 | 1 | OK. Stated constraint directly requires: Compare with the relevant baseline |
| SECURITYX-OPERATIONS-008 | 1 | 1 | 1 | OK. Stated constraint directly requires: Correlate independent observations |
| SECURITYX-OPERATIONS-009 | 3 | 3 | 1 | OK. Stated constraint directly requires: Bind database query parameters |
| SECURITYX-OPERATIONS-010 | 0 | 0 | 3 | OK. Stated constraint directly requires: Encode for the output context |
| SECURITYX-OPERATIONS-011 | 1 | 1 | 2 | OK. Stated constraint directly requires: Restrict server fetch destinations |
| SECURITYX-OPERATIONS-012 | 0 | 0 | 0 | OK. Stated constraint directly requires: Check authorization on the object |
| SECURITYX-OPERATIONS-013 | 2 | 2 | 2 | OK. Stated constraint directly requires: Make the state transition atomic |
| SECURITYX-OPERATIONS-014 | 3 | 3 | 1 | OK. Stated constraint directly requires: Remove the unnecessary function |
| SECURITYX-OPERATIONS-015 | 2 | 2 | 3 | OK. Stated constraint directly requires: Replace the unsupported dependency |
| SECURITYX-OPERATIONS-016 | 1 | 1 | 3 | OK. Stated constraint directly requires: Rotate the exposed application secret |
| SECURITYX-OPERATIONS-017 | 3 | 3 | 3 | OK. Stated constraint directly requires: Preserve the original evidence |
| SECURITYX-OPERATIONS-018 | 3 | 3 | 0 | OK. Stated constraint directly requires: Analyze a verified working copy |
| SECURITYX-OPERATIONS-019 | 2 | 2 | 3 | OK. Stated constraint directly requires: Record each custody transfer |
| SECURITYX-OPERATIONS-020 | 3 | 3 | 1 | OK. Stated constraint directly requires: Normalize times with provenance |
| SECURITYX-OPERATIONS-021 | 3 | 3 | 3 | OK. Stated constraint directly requires: Capture authorized volatile state |
| SECURITYX-OPERATIONS-022 | 0 | 0 | 3 | OK. Stated constraint directly requires: Acquire the persistent disk evidence |
| SECURITYX-OPERATIONS-023 | 0 | 0 | 2 | OK. Stated constraint directly requires: Collect the cloud audit history |
| SECURITYX-OPERATIONS-024 | 1 | 1 | 3 | OK. Stated constraint directly requires: Preserve the network observation |
| SECURITYX-OPERATIONS-025 | 1 | 1 | 1 | OK. Stated constraint directly requires: Form a testable hunting hypothesis |
| SECURITYX-OPERATIONS-026 | 1 | 1 | 0 | OK. Stated constraint directly requires: Select the required telemetry |
| SECURITYX-OPERATIONS-027 | 2 | 2 | 1 | OK. Stated constraint directly requires: Evaluate the collected evidence |
| SECURITYX-OPERATIONS-028 | 2 | 2 | 1 | OK. Stated constraint directly requires: Refine the detection coverage |
| SECURITYX-OPERATIONS-029 | 2 | 2 | 3 | OK. Stated constraint directly requires: A file-content matching rule |
| SECURITYX-OPERATIONS-030 | 0 | 0 | 1 | OK. Stated constraint directly requires: A normalized event detection rule |
| SECURITYX-OPERATIONS-031 | 3 | 3 | 3 | OK. Stated constraint directly requires: A structured intelligence object |
| SECURITYX-OPERATIONS-032 | 3 | 3 | 2 | OK. Stated constraint directly requires: An intelligence transport service |
| SECURITYX-OPERATIONS-033 | 3 | 3 | 3 | OK. Stated constraint directly requires: Contain the active exposure |
| SECURITYX-OPERATIONS-034 | 2 | 2 | 1 | OK. Stated constraint directly requires: Remove the persistence mechanism |
| SECURITYX-OPERATIONS-035 | 2 | 2 | 0 | OK. Stated constraint directly requires: Restore the validated service |
| SECURITYX-OPERATIONS-036 | 1 | 1 | 2 | OK. Stated constraint directly requires: Investigate the underlying cause |
| SECURITYX-OPERATIONS-037 | 0 | 0 | 3 | OK. Stated constraint directly requires: Preserve necessary investigation logs |
| SECURITYX-OPERATIONS-038 | 2 | 2 | 0 | OK. Stated constraint directly requires: Minimize sensitive log content |
| SECURITYX-OPERATIONS-039 | 1 | 1 | 1 | OK. Stated constraint directly requires: Protect the log integrity boundary |
| SECURITYX-OPERATIONS-040 | 0 | 0 | 3 | OK. Stated constraint directly requires: Test access to archived records |
| SECURITYX-OPERATIONS-041 | 1 | 1 | 0 | OK. 50/200*100=25% |
| SECURITYX-OPERATIONS-042 | 2 | 2 | 3 | OK. 60/150*100=40% |
| SECURITYX-OPERATIONS-043 | 3 | 3 | 3 | OK. 48/80*100=60% |
| SECURITYX-OPERATIONS-044 | 0 | 0 | 2 | OK. 90/120*100=75% |
| SECURITYX-OPERATIONS-045 | 3 | 3 | 1 | OK. (6+10+14+18)/4=12 minutes |
| SECURITYX-OPERATIONS-046 | 3 | 3 | 1 | OK. 09:25-09:07=18 minutes |
| SECURITYX-OPERATIONS-047 | 0 | 0 | 0 | OK. 14400/600=24 minutes (net rate) |
| SECURITYX-OPERATIONS-048 | 1 | 1 | 3 | OK. 14:50-00:20=14:30 UTC;15:00-14:30=30 minutes |
| SECURITYX-OPERATIONS-049 | 1 | 1 | 1 | OK. Stated constraint directly requires: Corroborate the claimed attribution |
| SECURITYX-OPERATIONS-050 | 1 | 1 | 0 | OK. Stated constraint directly requires: Separate coincidence from causation |
| SECURITYX-OPERATIONS-051 | 0 | 0 | 2 | OK. Stated constraint directly requires: Reproduce the authorized observation |
| SECURITYX-OPERATIONS-052 | 2 | 2 | 0 | OK. Stated constraint directly requires: Document the remaining uncertainty |
