# Independent South Africa firearms legal-knowledge review

Reviewed 2026-11-17. All 200 stems, all 800 options, all 200 explanations and the landing/configuration copy were inspected. No app edits or heavy build performed.

## Method and result

Options-only file was inspected first. Guesses were saved before reading blind stems or private keys. Options are generally parallel plausible legal concepts, so the explicit low-confidence cue heuristic chose the most elaborated/longest option; this is a specificity attack, not a claim of content knowledge. All 200 blind full-content answers were then saved independently before keys and real IDs were opened. Guesses/answers retain the original blind results and zero-based shuffled-option indices.

| Category | Full-content agreement | Options-only cue success | >40% cue gate |
|---|---:|---:|---|
| Legal | 40/40 (100%) | 11/40 (27.5%) | Pass |
| Licensing | 59/60 (98.3%) | 15/60 (25%) | Pass |
| Custody | 48/48 (100%) | 12/48 (25%) | Pass |
| Duties | 52/52 (100%) | 13/52 (25%) | Pass |
| Total | 199/200 (99.5%) | 51/200 (25.5%) | Pass |

The sole answer disagreement was reviewer error: LICENSING-044. Section 8(4)(a)(ii) gives members six months, while 60 days concerns disposal under the adjacent provision. The supplied key is correct. After checking the operative statute, all 200 supplied keys are supported, with the wording issue below. This correction is disclosed rather than overwriting the independent blind answer.

## Required small wording correction

**ZAFIREARM-LICENSING-037:** Keyed option says “Apply before taking permanent possession.” Filing an application is not authority to possess; section 3 requires the relevant issued authority. The existing explanation correctly says obtain authority. Change the option to “Obtain lawful authority before possession.” The question remains single-best-answer and the key index need not change. Review status: pass subject to this precision correction.

No other wrong key, material ambiguity, unqualified exception claim or enacted/proposed-law confusion was found. Repeated four-option families make many items straightforward classification exercises; the options-only gate is passed, but this does not establish provider-exam difficulty or psychometric validity. Some stems closely paraphrase the selected answer. No practical or tactical instruction is included.

## Primary-source reconciliation

- [Government Act index](https://www.gov.za/documents/firearms-control-act) confirms the later 2021 amendment and links a consolidation updated 14 April 2023. [SAPS-hosted Act](https://www.saps.gov.za/resource_centre/acts/downloads/juta/firearms_control_act_2000_a_0060.pdf) was read using the available downloaded PDF/text, distinguishing operative text from PENDLEX. Direct web fetch timed out; that timeout was not treated as successful verification. Relevant provisions cover sections 1, 3, 6–29, 83–91, 102–107, 117–120, 133, 140 and 148.
- [Domestic Violence Amendment Act](https://www.gov.za/sites/default/files/gcis_document/202203/45824gen788.pdf), schedule (downloaded text inspected), substitutes Schedule 2 item 7(e) to refer to offences under the Domestic Violence Act or Protection from Harassment Act, without the former narrow section reference. The [official commencement page](https://www.gov.za/documents/acts/domestic-violence-amendment-act-14-2021-english-afrikaans-28-jan-2022) confirms 14 April 2023, subject to its stated section exception. No question teaches the superseded item.
- [2004 Regulations](https://www.saps.gov.za/services/flash/firearms/legislation/gov_notice_english.pdf), downloaded text, were read with [2012 amendments](https://www.gov.za/sites/default/files/gcis_document/201409/35047proc9.pdf). Regulation 86 questions correctly distinguish prescribed custody, approved existing safes, endorsed third-party storage, authorised removal/transport, joint-access facilities and unloaded-storage exceptions. The amendments permit a collector exception and replace the old Registrar-only certification wording with DFO. Regulation 91 supports the appeal-document items.
- Reporting items correctly separate section 29 document loss (24 hours; copy application seven days), section 120(11) firearm loss/theft/destruction (24 hours after awareness, station nearest occurrence), and section 120(2) unlawful-possession location reports (without delay; written proof or telephone reference).
- [SAQA 117705](https://allqs.saqa.org.za/showUnitStandard.php?id=117705) confirms passed registration end date, last enrolment 30 June 2028, achievement 30 June 2031 and no replacement listed. [PFTC quality assurance](https://pftc.co.za/quality-assurance/) provides provider/assessment context. Practice cannot award credits or replace prescribed assessment.
- [Official June 2026 statement](https://www.gov.za/news/speeches/deputy-minister-cassel-mathale-police-dept-budget-vote-debate-202627-ncop-09-jun-2026) describes the amendment bill as intended legislation, not enacted law. Current government index still identifies the 2021 amendment as latest. No commenced 2026 replacement was established; proposals must not replace operative rules.

## Landing and scope

Inspected app/south-africa-firearm-competency-practice-test/page.tsx, lib/examFacts.ts and the zafirearm block in lib/exams.ts. The page explicitly identifies independent legal knowledge study, separates accredited practical training and SAPS decisions, labels 50 questions/70%/topic weights as editorial study choices, gives no invented official duration, and states that no credits or licensing rights are awarded. SAQA transition dates are present. No claim of official question provenance or provider status found. The 200-item bank is a study aid, not a verified complete provider assessment blueprint.

## Full real-ID ledger

All indices below refer to the shuffled blind files, not original bank A–D positions. “Verified key” is the supplied key checked against the statute; independent answer preserves pre-key choice. “Wording” indicates the single requested correction.

| Real ID | Independent index | Verified key | Options-only index | Full review | Independently selected answer |
|---|---:|---:|---:|---|---|
| ZAFIREARM-CUSTODY-001 | 3 | 3 | 2 | Pass | Prescribed safe storage |
| ZAFIREARM-CUSTODY-002 | 0 | 0 | 0 | Pass | Complete covering in public |
| ZAFIREARM-CUSTODY-003 | 2 | 2 | 1 | Pass | Effective personal control |
| ZAFIREARM-CUSTODY-004 | 2 | 2 | 1 | Pass | Safe custody of the keys |
| ZAFIREARM-CUSTODY-005 | 2 | 2 | 3 | Pass | The authorised storage period |
| ZAFIREARM-CUSTODY-006 | 0 | 0 | 3 | Pass | The reason for the storage |
| ZAFIREARM-CUSTODY-007 | 0 | 0 | 3 | Pass | The parties' identifying details |
| ZAFIREARM-CUSTODY-008 | 2 | 2 | 2 | Pass | The firearm and licence particulars |
| ZAFIREARM-CUSTODY-009 | 1 | 1 | 1 | Pass | Written authority from the lawful holder |
| ZAFIREARM-CUSTODY-010 | 2 | 2 | 1 | Pass | Endorsement by the relevant DFO |
| ZAFIREARM-CUSTODY-011 | 1 | 1 | 0 | Pass | A prescribed safe at the named place |
| ZAFIREARM-CUSTODY-012 | 2 | 2 | 0 | Pass | The storage provider's qualifying status |
| ZAFIREARM-CUSTODY-013 | 0 | 0 | 1 | Pass | Storage does not permit use |
| ZAFIREARM-CUSTODY-014 | 1 | 1 | 1 | Pass | Removal is limited to authorised persons |
| ZAFIREARM-CUSTODY-015 | 1 | 1 | 0 | Pass | Transport must follow the authorisation |
| ZAFIREARM-CUSTODY-016 | 0 | 0 | 3 | Pass | The DFO may cancel on good cause |
| ZAFIREARM-CUSTODY-017 | 0 | 0 | 1 | Pass | A compliant safe or strongroom |
| ZAFIREARM-CUSTODY-018 | 1 | 1 | 1 | Pass | A DFO certificate for a qualifying existing safe |
| ZAFIREARM-CUSTODY-019 | 1 | 1 | 3 | Pass | A prescribed joint-access lock-away safe |
| ZAFIREARM-CUSTODY-020 | 2 | 2 | 1 | Pass | Direct personal and physical control |
| ZAFIREARM-CUSTODY-021 | 2 | 2 | 0 | Pass | The firearm must be secured |
| ZAFIREARM-CUSTODY-022 | 1 | 1 | 3 | Pass | The ammunition must be secured |
| ZAFIREARM-CUSTODY-023 | 2 | 2 | 3 | Pass | The licence must remain legible |
| ZAFIREARM-CUSTODY-024 | 2 | 2 | 2 | Pass | The access key must remain controlled |
| ZAFIREARM-CUSTODY-025 | 2 | 2 | 1 | Pass | An appropriate handgun holder |
| ZAFIREARM-CUSTODY-026 | 0 | 0 | 0 | Pass | An appropriate holder for the other firearm |
| ZAFIREARM-CUSTODY-027 | 1 | 1 | 0 | Pass | Complete covering of the firearm |
| ZAFIREARM-CUSTODY-028 | 3 | 3 | 0 | Pass | Effective control by the carrier |
| ZAFIREARM-CUSTODY-029 | 0 | 0 | 2 | Pass | Unloaded storage is required in this case |
| ZAFIREARM-CUSTODY-030 | 0 | 0 | 3 | Pass | The section 13 exception is relevant |
| ZAFIREARM-CUSTODY-031 | 3 | 3 | 1 | Pass | The collector exception is relevant |
| ZAFIREARM-CUSTODY-032 | 2 | 2 | 2 | Pass | The facts are insufficient to assume an exception |
| ZAFIREARM-CUSTODY-033 | 0 | 0 | 2 | Pass | A licence for a compatible firearm |
| ZAFIREARM-CUSTODY-034 | 2 | 2 | 1 | Pass | A permit to possess ammunition |
| ZAFIREARM-CUSTODY-035 | 0 | 0 | 0 | Pass | A relevant licensed trade authority |
| ZAFIREARM-CUSTODY-036 | 2 | 2 | 0 | Pass | Another lawful authorisation |
| ZAFIREARM-CUSTODY-037 | 1 | 1 | 0 | Pass | The ordinary 200-cartridge ceiling |
| ZAFIREARM-CUSTODY-038 | 3 | 3 | 1 | Pass | The dedicated-status exception |
| ZAFIREARM-CUSTODY-039 | 0 | 0 | 1 | Pass | Specific permission from the Registrar |
| ZAFIREARM-CUSTODY-040 | 2 | 2 | 2 | Pass | Ammunition bought and used at an accredited range |
| ZAFIREARM-CUSTODY-041 | 1 | 1 | 0 | Pass | The quantity limit is satisfied |
| ZAFIREARM-CUSTODY-042 | 2 | 2 | 1 | Pass | The quantity limit would be exceeded |
| ZAFIREARM-CUSTODY-043 | 1 | 1 | 0 | Pass | The compatibility requirement is missing |
| ZAFIREARM-CUSTODY-044 | 2 | 2 | 2 | Pass | The range exception does not cover taking it home |
| ZAFIREARM-CUSTODY-045 | 1 | 1 | 3 | Pass | Failure to secure the firearm itself |
| ZAFIREARM-CUSTODY-046 | 1 | 1 | 3 | Pass | Failure to protect safe keys |
| ZAFIREARM-CUSTODY-047 | 0 | 0 | 3 | Pass | Failure to prevent loss while controlled |
| ZAFIREARM-CUSTODY-048 | 0 | 0 | 0 | Pass | Noncompliance with the authorised storage address |
| ZAFIREARM-DUTIES-001 | 3 | 3 | 0 | Pass | Report the firearm's loss or theft |
| ZAFIREARM-DUTIES-002 | 3 | 3 | 3 | Pass | Report the licence document's loss or theft |
| ZAFIREARM-DUTIES-003 | 2 | 2 | 3 | Pass | Report the location of unlawful possession |
| ZAFIREARM-DUTIES-004 | 2 | 2 | 0 | Pass | Notify a change in application information |
| ZAFIREARM-DUTIES-005 | 2 | 2 | 2 | Pass | Within 24 hours of becoming aware |
| ZAFIREARM-DUTIES-006 | 1 | 1 | 3 | Pass | Within 7 days of the request |
| ZAFIREARM-DUTIES-007 | 1 | 1 | 0 | Pass | Within 30 days of the change |
| ZAFIREARM-DUTIES-008 | 0 | 0 | 2 | Pass | Without delay |
| ZAFIREARM-DUTIES-009 | 3 | 3 | 0 | Pass | Negligent injury or property damage |
| ZAFIREARM-DUTIES-010 | 2 | 2 | 3 | Pass | Reckless or endangering handling |
| ZAFIREARM-DUTIES-011 | 0 | 0 | 0 | Pass | Failure to take precautions around a loaded firearm |
| ZAFIREARM-DUTIES-012 | 1 | 1 | 3 | Pass | Handling while under the influence |
| ZAFIREARM-DUTIES-013 | 3 | 3 | 3 | Pass | Knowingly false application information |
| ZAFIREARM-DUTIES-014 | 1 | 1 | 0 | Pass | Unauthorised alteration of a document |
| ZAFIREARM-DUTIES-015 | 2 | 2 | 3 | Pass | Use of another person's document |
| ZAFIREARM-DUTIES-016 | 2 | 2 | 0 | Pass | A false entry in a required register |
| ZAFIREARM-DUTIES-017 | 1 | 1 | 0 | Pass | Pointing without good reason |
| ZAFIREARM-DUTIES-018 | 1 | 1 | 1 | Pass | Discharge in a public place without good reason |
| ZAFIREARM-DUTIES-019 | 1 | 1 | 0 | Pass | Giving control to an impaired person |
| ZAFIREARM-DUTIES-020 | 0 | 0 | 3 | Pass | Supplying an unauthorised recipient |
| ZAFIREARM-DUTIES-021 | 0 | 0 | 0 | Pass | The existing authorities cease to be valid |
| ZAFIREARM-DUTIES-022 | 1 | 1 | 0 | Pass | Surrender is required within 24 hours |
| ZAFIREARM-DUTIES-023 | 2 | 2 | 0 | Pass | An appeal does not suspend unfitness |
| ZAFIREARM-DUTIES-024 | 0 | 0 | 0 | Pass | Disposal must follow the statutory process |
| ZAFIREARM-DUTIES-025 | 3 | 3 | 3 | Pass | All relevant competency and licensing documents |
| ZAFIREARM-DUTIES-026 | 2 | 2 | 0 | Pass | All firearms in the person's possession |
| ZAFIREARM-DUTIES-027 | 3 | 3 | 1 | Pass | All ammunition in the person's possession |
| ZAFIREARM-DUTIES-028 | 0 | 0 | 3 | Pass | The nearest police station |
| ZAFIREARM-DUTIES-029 | 0 | 0 | 3 | Pass | Produce the authority when requested |
| ZAFIREARM-DUTIES-030 | 1 | 1 | 2 | Pass | Identify yourself forthwith |
| ZAFIREARM-DUTIES-031 | 1 | 1 | 0 | Pass | Produce the firearm for inspection |
| ZAFIREARM-DUTIES-032 | 3 | 3 | 3 | Pass | Require the official's identification and authority |
| ZAFIREARM-DUTIES-033 | 3 | 3 | 0 | Pass | Confirm the decision |
| ZAFIREARM-DUTIES-034 | 0 | 0 | 2 | Pass | Vary the decision |
| ZAFIREARM-DUTIES-035 | 0 | 0 | 1 | Pass | Reverse the decision |
| ZAFIREARM-DUTIES-036 | 0 | 0 | 0 | Pass | Condone a late appeal on good cause |
| ZAFIREARM-DUTIES-037 | 0 | 0 | 3 | Pass | Possession under section 117 |
| ZAFIREARM-DUTIES-038 | 2 | 2 | 1 | Pass | Failure to report under section 118 |
| ZAFIREARM-DUTIES-039 | 0 | 0 | 0 | Pass | Failure to take reasonable steps under section 119 |
| ZAFIREARM-DUTIES-040 | 1 | 1 | 3 | Pass | Direct evidence of the reported event |
| ZAFIREARM-DUTIES-041 | 1 | 1 | 2 | Pass | Written proof that the report was made |
| ZAFIREARM-DUTIES-042 | 1 | 1 | 0 | Pass | An official reference number |
| ZAFIREARM-DUTIES-043 | 2 | 2 | 2 | Pass | The nearest station to the incident location |
| ZAFIREARM-DUTIES-044 | 2 | 2 | 3 | Pass | The time the person became aware |
| ZAFIREARM-DUTIES-045 | 0 | 0 | 0 | Pass | Obtain appropriate authority to keep it |
| ZAFIREARM-DUTIES-046 | 2 | 2 | 0 | Pass | Arrange lawful deactivation |
| ZAFIREARM-DUTIES-047 | 2 | 2 | 0 | Pass | Dispose of it in terms of the Act |
| ZAFIREARM-DUTIES-048 | 2 | 2 | 1 | Pass | Seek temporary authority for disposal |
| ZAFIREARM-DUTIES-049 | 0 | 0 | 2 | Pass | Carrying into the declared zone |
| ZAFIREARM-DUTIES-050 | 2 | 2 | 1 | Pass | Storing within the declared zone |
| ZAFIREARM-DUTIES-051 | 3 | 3 | 1 | Pass | Allowing prohibited presence in the zone |
| ZAFIREARM-DUTIES-052 | 2 | 2 | 0 | Pass | Seizure of an unlawfully present firearm |
| ZAFIREARM-LEGAL-001 | 2 | 2 | 0 | Pass | The Registrar |
| ZAFIREARM-LEGAL-002 | 0 | 0 | 0 | Pass | The Designated Firearms Officer |
| ZAFIREARM-LEGAL-003 | 0 | 0 | 1 | Pass | The Appeal Board |
| ZAFIREARM-LEGAL-004 | 3 | 3 | 1 | Pass | The criminal court |
| ZAFIREARM-LEGAL-005 | 1 | 1 | 0 | Pass | A competency certificate |
| ZAFIREARM-LEGAL-006 | 0 | 0 | 0 | Pass | A licence for the particular firearm |
| ZAFIREARM-LEGAL-007 | 3 | 3 | 0 | Pass | Accreditation of an organisation |
| ZAFIREARM-LEGAL-008 | 0 | 0 | 0 | Pass | A temporary possession authorisation |
| ZAFIREARM-LEGAL-009 | 3 | 3 | 2 | Pass | The ordinary age requirement |
| ZAFIREARM-LEGAL-010 | 2 | 2 | 2 | Pass | Citizenship or permanent residence |
| ZAFIREARM-LEGAL-011 | 1 | 1 | 3 | Pass | Fitness and suitability |
| ZAFIREARM-LEGAL-012 | 3 | 3 | 1 | Pass | Freedom from substance dependence |
| ZAFIREARM-LEGAL-013 | 2 | 2 | 0 | Pass | Evidence of legal knowledge |
| ZAFIREARM-LEGAL-014 | 0 | 0 | 1 | Pass | Evidence of practical competence |
| ZAFIREARM-LEGAL-015 | 3 | 3 | 2 | Pass | The prescribed fingerprint set |
| ZAFIREARM-LEGAL-016 | 3 | 3 | 3 | Pass | The relevant competency certificate |
| ZAFIREARM-LEGAL-017 | 0 | 0 | 2 | Pass | A natural person |
| ZAFIREARM-LEGAL-018 | 0 | 0 | 2 | Pass | A juristic person |
| ZAFIREARM-LEGAL-019 | 2 | 2 | 2 | Pass | A nominated responsible person |
| ZAFIREARM-LEGAL-020 | 3 | 3 | 1 | Pass | An accredited association |
| ZAFIREARM-LEGAL-021 | 2 | 2 | 1 | Pass | A licence condition |
| ZAFIREARM-LEGAL-022 | 3 | 3 | 2 | Pass | A regulation |
| ZAFIREARM-LEGAL-023 | 0 | 0 | 2 | Pass | A Gazette declaration |
| ZAFIREARM-LEGAL-024 | 1 | 1 | 1 | Pass | An application statement |
| ZAFIREARM-LEGAL-025 | 1 | 1 | 3 | Pass | A reasonable opportunity to respond |
| ZAFIREARM-LEGAL-026 | 2 | 2 | 2 | Pass | Assistance from a legal representative |
| ZAFIREARM-LEGAL-027 | 1 | 1 | 2 | Pass | Examination of a called witness |
| ZAFIREARM-LEGAL-028 | 3 | 3 | 1 | Pass | Consideration of the relevant facts |
| ZAFIREARM-LEGAL-029 | 1 | 1 | 0 | Pass | A threat involving a dangerous weapon |
| ZAFIREARM-LEGAL-030 | 1 | 1 | 1 | Pass | Failure to take prescribed safekeeping steps |
| ZAFIREARM-LEGAL-031 | 0 | 0 | 1 | Pass | False or misleading required information |
| ZAFIREARM-LEGAL-032 | 3 | 3 | 2 | Pass | A final protection order |
| ZAFIREARM-LEGAL-033 | 0 | 0 | 1 | Pass | Refusal of an application |
| ZAFIREARM-LEGAL-034 | 0 | 0 | 0 | Pass | Cancellation of an existing licence |
| ZAFIREARM-LEGAL-035 | 2 | 2 | 3 | Pass | Cancellation of accreditation |
| ZAFIREARM-LEGAL-036 | 0 | 0 | 3 | Pass | A declaration of unfitness |
| ZAFIREARM-LEGAL-037 | 0 | 0 | 2 | Pass | The licence remains valid pending the decision |
| ZAFIREARM-LEGAL-038 | 3 | 3 | 2 | Pass | The additional licence lapses on moving |
| ZAFIREARM-LEGAL-039 | 0 | 0 | 2 | Pass | The unfitness status continues during appeal |
| ZAFIREARM-LEGAL-040 | 3 | 3 | 3 | Pass | The permission applies only for its stated period |
| ZAFIREARM-LICENSING-001 | 2 | 2 | 0 | Pass | Self-defence under section 13 |
| ZAFIREARM-LICENSING-002 | 2 | 2 | 2 | Pass | Occasional activities under section 15 |
| ZAFIREARM-LICENSING-003 | 2 | 2 | 0 | Pass | Dedicated activities under section 16 |
| ZAFIREARM-LICENSING-004 | 3 | 3 | 1 | Pass | Private collection under section 17 |
| ZAFIREARM-LICENSING-005 | 2 | 2 | 1 | Pass | A licence-renewal application |
| ZAFIREARM-LICENSING-006 | 1 | 1 | 3 | Pass | A change-of-address notification |
| ZAFIREARM-LICENSING-007 | 3 | 3 | 1 | Pass | A change-of-circumstances notification |
| ZAFIREARM-LICENSING-008 | 1 | 1 | 1 | Pass | An application for a duplicate document |
| ZAFIREARM-LICENSING-009 | 2 | 2 | 3 | Pass | Within 24 hours |
| ZAFIREARM-LICENSING-010 | 0 | 0 | 1 | Pass | Within 7 days |
| ZAFIREARM-LICENSING-011 | 2 | 2 | 1 | Pass | Within 30 days |
| ZAFIREARM-LICENSING-012 | 2 | 2 | 2 | Pass | At least 90 days before expiry |
| ZAFIREARM-LICENSING-013 | 1 | 1 | 0 | Pass | 1 licence |
| ZAFIREARM-LICENSING-014 | 0 | 0 | 0 | Pass | 2 licences |
| ZAFIREARM-LICENSING-015 | 1 | 1 | 0 | Pass | 3 licences |
| ZAFIREARM-LICENSING-016 | 0 | 0 | 0 | Pass | 4 licences |
| ZAFIREARM-LICENSING-017 | 1 | 1 | 2 | Pass | Continued residence on the same premises |
| ZAFIREARM-LICENSING-018 | 1 | 1 | 3 | Pass | Compliance with the licence requirements |
| ZAFIREARM-LICENSING-019 | 2 | 2 | 0 | Pass | A separate licence for each firearm |
| ZAFIREARM-LICENSING-020 | 2 | 2 | 2 | Pass | An express business purpose on the licence |
| ZAFIREARM-LICENSING-021 | 3 | 3 | 0 | Pass | Seek the Registrar's endorsed permission to use |
| ZAFIREARM-LICENSING-022 | 1 | 1 | 0 | Pass | Obtain written consent for disposal |
| ZAFIREARM-LICENSING-023 | 2 | 2 | 0 | Pass | Comply with the stated authorisation conditions |
| ZAFIREARM-LICENSING-024 | 3 | 3 | 1 | Pass | Apply for the appropriate ordinary licence |
| ZAFIREARM-LICENSING-025 | 3 | 3 | 0 | Pass | The firearm's identifying mark |
| ZAFIREARM-LICENSING-026 | 3 | 3 | 1 | Pass | The applicant's personal identity |
| ZAFIREARM-LICENSING-027 | 2 | 2 | 2 | Pass | The authority to possess that firearm |
| ZAFIREARM-LICENSING-028 | 2 | 2 | 1 | Pass | The authorised storage location |
| ZAFIREARM-LICENSING-029 | 2 | 2 | 0 | Pass | 2 years |
| ZAFIREARM-LICENSING-030 | 1 | 1 | 3 | Pass | 5 years |
| ZAFIREARM-LICENSING-031 | 2 | 2 | 1 | Pass | 10 years |
| ZAFIREARM-LICENSING-032 | 0 | 0 | 0 | Pass | The period fixed by the Registrar |
| ZAFIREARM-LICENSING-033 | 1 | 1 | 0 | Pass | An accredited hunting association |
| ZAFIREARM-LICENSING-034 | 3 | 3 | 3 | Pass | An accredited sports-shooting organisation |
| ZAFIREARM-LICENSING-035 | 2 | 2 | 0 | Pass | An accredited collectors association |
| ZAFIREARM-LICENSING-036 | 3 | 3 | 1 | Pass | The licensed security service provider |
| ZAFIREARM-LICENSING-037 | 3 | 3 | 1 | Wording correction required | Apply before taking permanent possession |
| ZAFIREARM-LICENSING-038 | 3 | 3 | 2 | Pass | Use the formal correction procedure |
| ZAFIREARM-LICENSING-039 | 0 | 0 | 0 | Pass | Notify the Registrar about illegible markings |
| ZAFIREARM-LICENSING-040 | 1 | 1 | 2 | Pass | Return the lapsed additional licence |
| ZAFIREARM-LICENSING-041 | 0 | 0 | 3 | Pass | 7 days |
| ZAFIREARM-LICENSING-042 | 2 | 2 | 3 | Pass | 30 days |
| ZAFIREARM-LICENSING-043 | 2 | 2 | 0 | Pass | 60 days |
| ZAFIREARM-LICENSING-044 | 0 | 3 | 3 | Reviewer error; key verified six months | 60 days |
| ZAFIREARM-LICENSING-045 | 2 | 2 | 0 | Pass | Trustworthiness and integrity |
| ZAFIREARM-LICENSING-046 | 0 | 0 | 3 | Pass | Suitability for the relevant function |
| ZAFIREARM-LICENSING-047 | 1 | 1 | 1 | Pass | Capacity to serve the accredited purpose |
| ZAFIREARM-LICENSING-048 | 1 | 1 | 0 | Pass | Capacity to advance the Act's purposes |
| ZAFIREARM-LICENSING-049 | 3 | 3 | 1 | Pass | A sale |
| ZAFIREARM-LICENSING-050 | 0 | 0 | 3 | Pass | A donation |
| ZAFIREARM-LICENSING-051 | 2 | 2 | 0 | Pass | A loan |
| ZAFIREARM-LICENSING-052 | 1 | 1 | 1 | Pass | A letting arrangement |
| ZAFIREARM-LICENSING-053 | 0 | 0 | 3 | Pass | Express authority to possess firearms |
| ZAFIREARM-LICENSING-054 | 2 | 2 | 0 | Pass | The intended purpose of possession |
| ZAFIREARM-LICENSING-055 | 1 | 1 | 1 | Pass | The limit on how long possession endures |
| ZAFIREARM-LICENSING-056 | 2 | 2 | 3 | Pass | The nominated responsible individual |
| ZAFIREARM-LICENSING-057 | 0 | 0 | 2 | Pass | Identify the challenged decision |
| ZAFIREARM-LICENSING-058 | 0 | 0 | 2 | Pass | State the date of the decision |
| ZAFIREARM-LICENSING-059 | 1 | 1 | 2 | Pass | Set out the grounds of appeal |
| ZAFIREARM-LICENSING-060 | 0 | 0 | 0 | Pass | Attach supporting written submissions |
