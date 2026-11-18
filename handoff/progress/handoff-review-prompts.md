# Reviewer prompt handoff — exact recovery and limitations

This file is a copy-only handoff. No question, bank, build, PR or review outcome was changed while compiling it. Only this file was written.

## Provenance and access limits

Coordinator transcript: `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T20-42-53-01a1ec52-3689-7f41-881b-b95ef1b6e490.jsonl` (agent `/root/next20_sequential`, thread `01a1ec52-3689-7f41-881b-b95ef1b6e490`).

All 61 relevant outgoing spawn/follow-up/message records have encrypted message fields in the local JSONL. Incoming reviewer agent_message payloads checked were also encrypted. Their metadata is readable. Ciphertext and complete transcripts are deliberately NOT copied. There is no decryption capability used or claimed. The app read_thread tool returned status/turn UI summaries and subAgentActivity metadata, not exact collaboration prompt bodies; that fallback did not recover earlier text.

Eleven later EPA40 messages remain visible verbatim in the coordinator conversation context and are reproduced below. Earlier CDM, VTC, broker and EPA100/14-item prompt bodies are UNRECOVERABLE from the accessible plaintext, not reconstructed from summaries. This is not a complete verbatim archive of all rounds.

The file inventory lists every relevant coordinator call found, including send_message restrictions and informed changed-item follow-ups. Spawn fork_turns=none is an instruction/configuration record, not proof of file isolation. Reviewers had broad filesystem/tool capabilities; allowlists and no-read requests were behavioral restrictions, not a sandbox. This handoff did not audit every reviewer tool invocation against an allowlist. Consequently it does NOT prove reviewers never accessed prohibited files, keys, mappings or source banks. Their own reports of restricted access are claims, not an independent access audit.

## Known review-status caveats (summary, NOT verbatim prompts)

- CDM had an invalid review round whose reviewer used cyclic answer-position patterns; that score was discarded and preserved as invalid. Later randomization changed item and option order. This is historical checkpoint information, not newly recovered prompt text.
- Changed-item reviews reused reviewers who had already seen keys/explanations. They are explicitly informed/nonblind review, not fresh options-only evidence. In particular EPA40 reviewer follow-ups below and the final three-item V5 review cannot establish a new blinded score.
- Latest EPA40 raw options-only scores 31/40 and 24/40 remain recorded failures. Full blind key agreement, source checks and subsequent minor fixes do not convert those scores into passes.
- CDM/VTC/broker earlier stage structure and exact allowed-file wording must be read from plaintext originals if later available; do not infer exact prompts from agent names or reports.

## Reviewer agent/session inventory

| Agent | Thread ID | Local transcript locator | Coordinator calls |
|---|---|---|---|
| `/root/next20_sequential/broker_changed_review` | `01a1ed1d-3877-74f2-ba72-07a01a9bc152` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T00-24-37-01a1ed1d-3877-74f2-ba72-07a01a9bc152.jsonl` | 3 |
| `/root/next20_sequential/broker_review` | `01a1ed0b-4d8e-7200-9627-3e3014740c73` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T00-05-03-01a1ed0b-4d8e-7200-9627-3e3014740c73.jsonl` | 6 |
| `/root/next20_sequential/cdm_depthreview` | `01a1ec82-bfd9-7bd0-85e5-6f71463afb3c` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T21-35-54-01a1ec82-bfd9-7bd0-85e5-6f71463afb3c.jsonl` | 4 |
| `/root/next20_sequential/cdm_finalreview` | `01a1ec91-124e-7372-aa31-8e423d6f9ea0` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T21-51-32-01a1ec91-124e-7372-aa31-8e423d6f9ea0.jsonl` | 4 |
| `/root/next20_sequential/cdm_freshreview` | `01a1ec75-0c97-73b2-a2cd-92b6bd9bdc0d` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T21-20-56-01a1ec75-0c97-73b2-a2cd-92b6bd9bdc0d.jsonl` | 2 |
| `/root/next20_sequential/cdm_random_review` | `01a1ec76-9571-74f3-a149-c9036cff43d7` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T21-22-37-01a1ec76-9571-74f3-a149-c9036cff43d7.jsonl` | 4 |
| `/root/next20_sequential/cdm_reviewer` | `01a1ec61-a7cb-7561-907a-dbeea8ec2dd4` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T20-59-45-01a1ec61-a7cb-7561-907a-dbeea8ec2dd4.jsonl` | 3 |
| `/root/next20_sequential/epa609_pilot2_review` | `01a1ed52-05c3-7bb3-8e1e-69146ee7661e` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T01-22-18-01a1ed52-05c3-7bb3-8e1e-69146ee7661e.jsonl` | 3 |
| `/root/next20_sequential/epa609_pilot40_fresh2` | `01a1ed8b-f006-7a51-bf1e-2a351552248b` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T02-25-33-01a1ed8b-f006-7a51-bf1e-2a351552248b.jsonl` | 4 |
| `/root/next20_sequential/epa609_pilot40_review` | `01a1ed70-cf8f-7cd0-bb7c-f99fe1960553` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T01-55-55-01a1ed70-cf8f-7cd0-bb7c-f99fe1960553.jsonl` | 7 |
| `/root/next20_sequential/epa609_pilot_review` | `01a1ed48-9ab3-7d21-92b4-390affcc47d3` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T01-12-00-01a1ed48-9ab3-7d21-92b4-390affcc47d3.jsonl` | 3 |
| `/root/next20_sequential/epa609_review` | `01a1ed36-2a8d-7583-bc7d-13dbebeffe9a` | `/Users/johnbrophy/.codex/sessions/2026/11/18/rollout-2026-11-18T00-51-52-01a1ed36-2a8d-7583-bc7d-13dbebeffe9a.jsonl` | 5 |
| `/root/next20_sequential/frvtc_reviewer` | `01a1ecc9-a6a3-72f2-a0f2-34882002bb00` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T22-53-20-01a1ecc9-a6a3-72f2-a0f2-34882002bb00.jsonl` | 6 |
| `/root/next20_sequential/frvtc_short_review` | `01a1ece2-c098-7f20-ab37-684441a4d2e4` | `/Users/johnbrophy/.codex/sessions/2026/11/17/rollout-2026-11-17T23-20-45-01a1ece2-c098-7f20-ab37-684441a4d2e4.jsonl` | 7 |

## Full coordinator call inventory

Every message body in these on-disk records is encrypted. Later EPA40 bodies marked below are recovered separately from visible conversation context. Source line numbers identify exact records; raw ciphertext is omitted.

| # | Timestamp | Transcript line | Tool | Target | fork_turns | call_id |
|---|---|---:|---|---|---|---|
| 1 | 2026-11-18T01:59:45.327Z | 322 | `spawn_agent` | `cdm_reviewer` | `none` | `call_c6179c3926a14ecc848b8fdc75edbddc` |
| 2 | 2026-11-18T02:01:19.740Z | 373 | `followup_task` | `cdm_reviewer` | `not supplied` | `call_78d4b8c001324fc8bb44d81228daf527` |
| 3 | 2026-11-18T02:04:07.502Z | 439 | `followup_task` | `cdm_reviewer` | `not supplied` | `call_1a4b5f630e564a1c88bf24229dabac38` |
| 4 | 2026-11-18T02:20:56.330Z | 633 | `spawn_agent` | `cdm_freshreview` | `none` | `call_6bdeb36ed38b4df791689034a2085bb2` |
| 5 | 2026-11-18T02:22:14.472Z | 675 | `followup_task` | `cdm_freshreview` | `not supplied` | `call_24ea6f191cc84e5a80c0d44d4245ba6d` |
| 6 | 2026-11-18T02:22:36.900Z | 701 | `spawn_agent` | `cdm_random_review` | `none` | `call_d30650f6656a445d8d083d715c7d2c3f` |
| 7 | 2026-11-18T02:23:27.284Z | 732 | `followup_task` | `cdm_random_review` | `not supplied` | `call_45eea14a55bd450baae4851b7d781b95` |
| 8 | 2026-11-18T02:23:56.966Z | 764 | `send_message` | `cdm_random_review` | `not supplied` | `call_1ac48d22fccf47a9a15c652beb27e50a` |
| 9 | 2026-11-18T02:25:23.728Z | 790 | `send_message` | `cdm_random_review` | `not supplied` | `call_72d158ae4a5749358aefcc04394e5d65` |
| 10 | 2026-11-18T02:35:54.192Z | 941 | `spawn_agent` | `cdm_depthreview` | `none` | `call_799db41899714967aeccd177d5365980` |
| 11 | 2026-11-18T02:37:15.251Z | 973 | `followup_task` | `cdm_depthreview` | `not supplied` | `call_1f534a23ca384e99bc2fac5e04996a88` |
| 12 | 2026-11-18T02:37:58.890Z | 997 | `followup_task` | `cdm_depthreview` | `not supplied` | `call_36794817e3df499ca8cc9ca2b0ef47bb` |
| 13 | 2026-11-18T02:40:50.133Z | 1042 | `followup_task` | `cdm_depthreview` | `not supplied` | `call_f88996ecc7ae497591153df4b30c28ff` |
| 14 | 2026-11-18T02:51:32.804Z | 1161 | `spawn_agent` | `cdm_finalreview` | `none` | `call_3d33be5ac8d24d67be0b338770736d1f` |
| 15 | 2026-11-18T02:53:56.650Z | 1208 | `followup_task` | `cdm_finalreview` | `not supplied` | `call_9ea4c4def27b45ecacd04f0e37d0c01d` |
| 16 | 2026-11-18T02:59:01.549Z | 1283 | `followup_task` | `cdm_finalreview` | `not supplied` | `call_7d596baa66c54fd2946e6edf9cc1128b` |
| 17 | 2026-11-18T03:01:12.691Z | 1333 | `followup_task` | `cdm_finalreview` | `not supplied` | `call_a6d603d0ee5244cf938ac2afefeb5bb2` |
| 18 | 2026-11-18T03:53:20.766Z | 2123 | `spawn_agent` | `frvtc_reviewer` | `none` | `call_49151b9fdb99462b9e62d2df10536538` |
| 19 | 2026-11-18T03:54:40.723Z | 2157 | `followup_task` | `frvtc_reviewer` | `not supplied` | `call_cf4e4ec0a92747f8be446139f5ca27a3` |
| 20 | 2026-11-18T03:55:43.699Z | 2196 | `followup_task` | `frvtc_reviewer` | `not supplied` | `call_9350dfe0e0d94821b805ea3066f8ee6c` |
| 21 | 2026-11-18T03:56:19.514Z | 2226 | `followup_task` | `frvtc_reviewer` | `not supplied` | `call_cb955058acf5411aaea61beeeed11044` |
| 22 | 2026-11-18T03:58:59.540Z | 2270 | `send_message` | `frvtc_reviewer` | `not supplied` | `call_2a1e36e2e762408ba731851baec95738` |
| 23 | 2026-11-18T04:00:25.577Z | 2303 | `send_message` | `frvtc_reviewer` | `not supplied` | `call_a61dea5b55b04ac8b36d38d618f1a70a` |
| 24 | 2026-11-18T04:20:45.804Z | 2646 | `spawn_agent` | `frvtc_short_review` | `none` | `call_6278f94f4c884ec388fc6ae141535d78` |
| 25 | 2026-11-18T04:23:17.151Z | 2681 | `followup_task` | `frvtc_short_review` | `not supplied` | `call_18402faece8d4275aa1f834f3a105376` |
| 26 | 2026-11-18T04:25:07.523Z | 2723 | `followup_task` | `frvtc_short_review` | `not supplied` | `call_b9ed9f800b0a42e4b38f2e2499766dd9` |
| 27 | 2026-11-18T04:28:22.903Z | 2802 | `followup_task` | `frvtc_short_review` | `not supplied` | `call_1f2822b935cc43fcbdbae693d0f51abb` |
| 28 | 2026-11-18T04:28:52.230Z | 2828 | `followup_task` | `frvtc_short_review` | `not supplied` | `call_ea1ff13e6ac34c5ca57547865d4d26b9` |
| 29 | 2026-11-18T04:29:39.912Z | 2870 | `send_message` | `frvtc_short_review` | `not supplied` | `call_914294a65dd84c569cec51af3bb6228d` |
| 30 | 2026-11-18T04:29:45.850Z | 2877 | `followup_task` | `frvtc_short_review` | `not supplied` | `call_b76acba7068b4f588a3420170f5fd8f6` |
| 31 | 2026-11-18T05:05:03.318Z | 3677 | `spawn_agent` | `broker_review` | `none` | `call_4dc8d704a3ab430e95f385c70eaea9f2` |
| 32 | 2026-11-18T05:06:53.083Z | 3738 | `followup_task` | `broker_review` | `not supplied` | `call_098591b1e3814b33af6014edd53793c2` |
| 33 | 2026-11-18T05:07:26.498Z | 3770 | `send_message` | `broker_review` | `not supplied` | `call_ca6cb096bf8c424dbf89cb55cab9473f` |
| 34 | 2026-11-18T05:09:38.711Z | 3793 | `send_message` | `broker_review` | `not supplied` | `call_c25b597ce2714743b559fdeaf4868ed6` |
| 35 | 2026-11-18T05:11:52.799Z | 3829 | `followup_task` | `broker_review` | `not supplied` | `call_4520ddfa415b4c8d87886ea2ec902da9` |
| 36 | 2026-11-18T05:12:35.815Z | 3861 | `send_message` | `broker_review` | `not supplied` | `call_c433208ba7094b709776589ccde45df9` |
| 37 | 2026-11-18T05:24:37.611Z | 4050 | `spawn_agent` | `broker_changed_review` | `none` | `call_f99d320edc3f4f49aab7fdf662995f72` |
| 38 | 2026-11-18T05:25:25.360Z | 4092 | `followup_task` | `broker_changed_review` | `not supplied` | `call_d641d0bd410f4c988ae50857e48c82a3` |
| 39 | 2026-11-18T05:27:22.293Z | 4137 | `followup_task` | `broker_changed_review` | `not supplied` | `call_0fe5e2e501824c6e81bfab05f515498d` |
| 40 | 2026-11-18T05:51:52.442Z | 4764 | `spawn_agent` | `epa609_review` | `none` | `call_7d306f5533514c248b851dd380519ca0` |
| 41 | 2026-11-18T05:53:19.600Z | 4798 | `followup_task` | `epa609_review` | `not supplied` | `call_9066652a52c44937a554c40e64713ad2` |
| 42 | 2026-11-18T05:54:00.950Z | 4828 | `send_message` | `epa609_review` | `not supplied` | `call_2be2b60dd8534d37a06f4a5e011e63fb` |
| 43 | 2026-11-18T05:54:39.689Z | 4864 | `send_message` | `epa609_review` | `not supplied` | `call_1595470cf90542fd85d903236a036e61` |
| 44 | 2026-11-18T05:55:28.791Z | 4885 | `send_message` | `epa609_review` | `not supplied` | `call_87cabdddbed448e08c8e4d859d32616c` |
| 45 | 2026-11-18T06:12:00.808Z | 5124 | `spawn_agent` | `epa609_pilot_review` | `none` | `call_3601f26f0c864565bf6432d9e48b9553` |
| 46 | 2026-11-18T06:13:09.896Z | 5165 | `followup_task` | `epa609_pilot_review` | `not supplied` | `call_83050ef67f3540d0a37c225360b2862d` |
| 47 | 2026-11-18T06:14:24.867Z | 5201 | `followup_task` | `epa609_pilot_review` | `not supplied` | `call_78ae80a948ac4955b54cf387d2a290d6` |
| 48 | 2026-11-18T06:22:18.040Z | 5325 | `spawn_agent` | `epa609_pilot2_review` | `none` | `call_ded9fc6d06364e069c40a17657b36ae9` |
| 49 | 2026-11-18T06:23:34.030Z | 5363 | `followup_task` | `epa609_pilot2_review` | `not supplied` | `call_21fbd0ad5cda4dc79f758dfcec2217b0` |
| 50 | 2026-11-18T06:25:47.275Z | 5405 | `followup_task` | `epa609_pilot2_review` | `not supplied` | `call_928a277df1f3489cb146d08e1682ab7c` |
| 51 | 2026-11-18T06:55:55.777Z | 6010 | `spawn_agent` | `epa609_pilot40_review` | `none` | `call_2bcf197405134975b540d4e4c52c2097` |
| 52 | 2026-11-18T06:57:23.118Z | 6047 | `followup_task` | `epa609_pilot40_review` | `not supplied` | `call_75c32bfa3bd742508db9f27de1a86eee` |
| 53 | 2026-11-18T07:00:00.510Z | 6113 | `followup_task` | `epa609_pilot40_review` | `not supplied` | `call_b867214f18bc43c78126e4d1fc128fe5` |
| 54 | 2026-11-18T07:00:43.796Z | 6134 | `send_message` | `epa609_pilot40_review` | `not supplied` | `call_ab921a165f0648c7aeb36d413a3a9b91` |
| 55 | 2026-11-18T07:20:16.425Z | 6466 | `followup_task` | `epa609_pilot40_review` | `not supplied` | `call_06f19489fc174d68a9fbf310f9d675f6` |
| 56 | 2026-11-18T07:21:27.503Z | 6498 | `send_message` | `epa609_pilot40_review` | `not supplied` | `call_e05347f31bc84a2696f79f6fc781d73c` |
| 57 | 2026-11-18T07:24:41.122Z | 6590 | `followup_task` | `epa609_pilot40_review` | `not supplied` | `call_10699426f1ef43cdab207440495b1dc6` |
| 58 | 2026-11-18T07:25:33.561Z | 6621 | `spawn_agent` | `epa609_pilot40_fresh2` | `none` | `call_772434b9717f437b9a27b41f4c86fb35` |
| 59 | 2026-11-18T07:26:45.448Z | 6659 | `followup_task` | `epa609_pilot40_fresh2` | `not supplied` | `call_6015b3c8e38947058a0e816f333019c2` |
| 60 | 2026-11-18T07:29:44.444Z | 6719 | `followup_task` | `epa609_pilot40_fresh2` | `not supplied` | `call_7525d46c34e84619bb83b5438bcfaeec` |
| 61 | 2026-11-18T07:33:53.264Z | 6827 | `followup_task` | `epa609_pilot40_fresh2` | `not supplied` | `call_8861a82b834f477f8667325f3c670c25` |

## Verbatim recoverable messages

The following message bodies are copied exactly from visible collaboration calls, including original compressed spacing and punctuation. Descriptive headings and access notes are editorial, not part of the quoted prompt. Tool metadata is in the inventory above. All other bodies in that inventory are explicitly unrecoverable here.

### Recovered message 1: epa609_pilot40_review — spawn_agent; fork_turns=none

VERBATIM message body from visible coordinator conversation:

```text
Independent exam-bank reviewer, explicitly authorized by repo skill. Stage1 OPTIONS ONLY. Read ONLY /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/anonymous-options.json. Do not read any other files, stems, mappings, banks, authoring or prior reviews; no source searches yet. Forty EPA609 question option sets with random row/option order and category labels. For each category read all its items, then honestly pick the option a test-wise guesser would choose without stem. Pick exactly one A-D per item, no forced random guesses/balancing/nulls. Explain concrete cue and confidence, distinguish cueType surface/knowledge/prior/none; if expert knowledge informs choice say so, but don't presume it excuses writing cues. Write options-answers.json as [{reviewId,answer,cueType,reason,confidence}] and options-notes.md in same directory. Do not inspect private-mapping.json. Preserve raw output, chmod0444 both upon completion. Return finished Stage1 and wait; coordinator will provide blinded stems in Stage2 only after answers locked. No production edits or builds. Full factual/pedagogical/source review later, no pass claims now.
```

### Recovered message 2: epa609_pilot40_review — followup_task; blind Stage2

VERBATIM message body from visible coordinator conversation:

```text
Stage1 locked, proceed Stage2. Read ONLY new anonymous-questions.json in same directory (contains stems, same shuffled options) plus primary sources needed to verify facts. Do not read private mapping, original banks, authoring evidence, keys/explanations, prior reviews or score files. Answer every40 independently, calculate all numbers, flag ambiguous/false/missing-scope items. Write blind-answers.json [{reviewId,answer,reason,confidence,sources}] and blind-findings.json with issue/severity/fix. Assess each stem+options for plausible novice distractors, superficial reading-only elimination, source-defined distinctions, and whole40 redundancy, not only key validity. Sources from official currenteCFR/EPA, manufacturerRobinair34788NI/DENSO/Tesla2024+Model3, MACS2025 narrative handbook may be researched; do NOT read embedded sample/past test questions. Do not edit Stage1. Lock Stage2files0444 and report complete; explanations only provided Stage3 afterwards.
```

### Recovered message 3: epa609_pilot40_review — followup_task; Stage3 keys/explanations now visible

VERBATIM message body from visible coordinator conversation:

```text
Stage2 locked. Stage3 read explanations.json in same directory (anonymous keys+explanations). Read all40 and verify full explanation matches actual alternatives and current source. Resolve R005 carefully: author key is high-side pressure has decreased, not low-side begins rising; inspect actual manufacturer/MACS narrative support and distinguish an incorrect blind answer from legitimate scope issue. Author evidence may now be read at /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/authoring-evidence.json and sources.md ONLY to locate primary sources; do not read original bank/other reviews/private mapping. Source evidence may reveal originalIDs but keep findings byreviewId. R039 officialSDS should be in evidence; fetchverify. Write explanation-audit.json for every40 and finalreview.md and final-findings.json (including retained/resolvedissues), with independent factual/source/pedagogical assessment and category-level cue themes. No quality pass assumed from key agreement. Priorstagefiles immutable; no productionedits/builds. Finish and report.
```

### Recovered message 4: epa609_pilot40_review — send_message; source/wording direction

VERBATIM message body from visible coordinator conversation:

```text
Thanks, preserve initial mistaken answer/findings and clearly resolve in final. Skill prohibits naming training provider in stems; cite MACS in explanation/source reference if needed, or name actual manufacturer procedure if independently sourced, rather than recommend provider name in stem. For R039 disclose manufacturer-authoredSDS hostedbyRittal not sourcehostprimary; source content can support with provenance caveat, authorversionunlocated.
```

### Recovered message 5: epa609_pilot40_review — followup_task; explicitly informed changed-item review

VERBATIM message body from visible coordinator conversation:

```text
Please independently review changeditems/source repairs, not a freshoptions-only scoring pass (you knowprioritems/keys). New external /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3: pilot-questions.json, authoring-evidence.json, sources.md,before-after.md,manual-audit.md. Fourteen changedrows (13substantive+YF003explanation), twoSDSunchangedevidence. Read all14 changes with primarysource verification and full40 redundancy check; relate prior10high/medium and lows resolved/retained/newissues. New RobinairAC1234-6RevF allows diagnostic15%doseafterfailedvacuum unlikeMACSnarrative; verify authors no universalcontroller claims especiallyYF014. SourcelegalREG026 externalclutchinspection based82.32h/34a plusDaimlermaintenance, verifyactualboundary. REG025 owner/signerofficerroles, REG017 competingrealcredentials, standardsYF001 allprimaryscope. SRV006 documentedresidual lone-refrigerant vs3gas cue; judgehonestly actualnoviceplausibility not authorrationalealone. Never approve solelyvalidkeys; no forcednewscore or claimold31/40 passed. Write independent-changed-review.md and changed-findings.json in newdirectory /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-changed-review-v1. Do not modify previousreviewfiles/production. Return fullconcrete findings with disposition for14.
```

### Recovered message 6: epa609_pilot40_review — send_message; remaining formulation assessment

VERBATIM message body from visible coordinator conversation:

```text
For SRV006 final assessment, if one-refrigerant-vs3gases remains medium then source-backed replacement with actual detector sampling distance/sweep-speed guidance may teach more useful skill (frozenbank has no such question). Don't design a newitem yourself or force numericroute to lower score; just state whether currentobjective lacks credible same-task distractors and should retire. Need holdquality honest.
```

### Recovered message 7: epa609_pilot40_review — followup_task; informed V4 verification

VERBATIM message body from visible coordinator conversation:

```text
Final targeted v4 at /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4. Only5rowschanged: SRV006 actualRobinair22791 high-sensitivity alarm confirmation movingprobe vsstationary/contact source550029RevF2013PDFpp5–6; REG025 equipmentownerexplicit, EQP006 noillustration, YF013 staged/A/Coffscope, YF014 nextserviceaction. Independently verify5 actualsourcepedagogicalchanges and dispositions, no freshblindscore becauseexposed. Write final-v4-review.md/findings-v4.json in epa609-pilot40-changed-review-v1 (newfiles notoverwrite). Confirm any remaining actual medium/high flaws, no numericalgatepassclaim. Production/priorfilesuntouched.
```

### Recovered message 8: epa609_pilot40_fresh2 — spawn_agent; fork_turns=none

VERBATIM message body from visible coordinator conversation:

```text
Independent exam-bank reviewer under explicit skill authority. Stage1 OPTIONS ONLY. Read ONLY /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/anonymous-options.json. No otherfiles/stems/keys/mappings/priorreviews/banks/source searches. Forty sets in four categories. Read eachcategory together and honestly pick exactlyoneA-D peritem as test-wiseguesser withoutstem. Noforcedrandomness/letterbalancing/nulls. Distinguish cueType surface/knowledge/prior/none and concrete reason/confidence; knowledge doesn't excuse real surfacecue. Write options-answers.json [{reviewId,answer,cueType,reason,confidence}] and options-notes.md samefolder, chmod0444 both. Do not inspect private-mapping.json. Return completion and wait for nextstage. No productionchanges/builds. No passclaim without coordinator scoring.
```

### Recovered message 9: epa609_pilot40_fresh2 — followup_task; blind Stage2

VERBATIM message body from visible coordinator conversation:

```text
Stage1 locked. Stage2 read anonymous-questions.json samefolder only plus neededprimarysources; no mapping/private scores/originalbank/authoringkeys/explanations/otherreviews. Independently answerall40; write blind-answers.json [{reviewId,answer,reason,confidence,sources}] and blind-findings.json with everyitem pedagogical judgment, plausible alternatives, factual/scopeissues and wholebankredundancy. Recomputeallnumbers. Verify currenteCFR/EPA; manufacturerRobinair34788NI and22791, DENSO,Tesla2024+Model3; MACS2025 narrativeonly noembeddedtestquestions. Distinguish actualreading-only/structuralflaws from valid easyknowledge; don't forcecomplexity. Sourcefindingdetails useful. Lockfiles0444 then report; explanationsonlyStage3 afterblindanswerslocked. No production/builds. The fixed40isdiagnostic sample, not claimedcomprehensiveform.
```

### Recovered message 10: epa609_pilot40_fresh2 — followup_task; Stage3 keys/explanations now visible

VERBATIM message body from visible coordinator conversation:

```text
Stage2 locked. Stage3 read explanations.json samefolder. Verify all40 explanations against actualoptions andprimarysources, recomputequantities, check qualifications/sourceversion. Author evidence now permitted ONLY forsourcefinding: /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/authoring-evidence.json and sources.md. Do not read priorreviewreports/private scores/originalproductionbanks. Important verifiedsourcevariation: RobinairAC1234-6RevF allows diagnostic15%doseafterfailedvacuum; MACS2025narrativep51 different sequence, explanationsmustnotuniversalize. ExactHoneywellSDSv3.4Audi-hosted webavailablelocal403 no latestclaim. Write all40 explanation-audit.json, final-findings.json and finalreview.md with clear factual andpedagogicaljudgment, actionableactualcue vsvalidknowledge distinctions. No numericalgatepass inferred. Preserve stages1/2 unchanged. Finishandreport.
```

### Recovered message 11: epa609_pilot40_fresh2 — followup_task; informed V5 minor verification

VERBATIM message body from visible coordinator conversation:

```text
Userworkflowdecision pending. Only3minorcorrections authorized and now /Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/pilot-questions.json plusbefore-after/evidence. Review exactlyYF003 purposesparallel, EQP004 non-refrigerant-specificterminology, EQP002 danglingcitedremoved. Other37/allkeys/allexplanations unchanged. Do informedchangedverification source/pedagogy no newscore, keep24/40FAIL prior. Write minor-v5-review.md in epa609-pilot40-review-v2 asnewfile, notoverwrite priorreports. Reportif3fixes acceptedwith no new factualmeaningchange. No expansion/productionmutation.
```

## Explicit unrecoverable bodies

The remaining 50 of 61 inventory message bodies are UNRECOVERABLE here. This includes every inventoried CDM reviewer, VTC reviewer, broker reviewer, EPA100 reviewer and the two early EPA14 reviewers. Exact allowed-file lists, randomization wording and follow-up instructions for those rounds are not quoted or invented. Their agent/thread/transcript/line/call identifiers above provide recovery locators if an authorized plaintext export becomes available. No raw ciphertext is included.
