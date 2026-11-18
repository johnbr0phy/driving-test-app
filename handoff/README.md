# Unfinished Tigertest handoff

Copy-only archival branch. No questions were edited, no builds resumed, and no PR was opened or modified. PRs #880, #886 and #888 are outside this handoff. This branch is not a ready-to-merge product change: EPA files at normal repository paths are an exact snapshot of unfinished work, not a rebase or integration of the revised pilot.

## Sources and EPA state

- Progress source: `/Users/johnbrophy/tigertest-next20-progress/`, including all failed/discarded reviews, research, logs, hidden files and Python environment.
- EPA source worktree: `/Users/johnbrophy/tigertest-next20-epa609`.
- EPA branch: `codex/next20-epa609`.
- EPA base (HEAD): `05baf836711ea98e2295e3c62690e7a51e2904c9`.
- Handoff branch starts at origin/main `05baf836711ea98e2295e3c62690e7a51e2904c9`.
- Tracked changes saved verbatim with `git diff --binary HEAD --` in [epa609-worktree.diff](epa609-worktree.diff); full porcelain inventory and commands in [epa609-worktree-state.json](epa609-worktree-state.json).
- All 46 modified/untracked EPA files were copied at their normal repo paths. The 40-item pilot in `handoff/progress/epa609-pilot40-v5/` is separate; it was NOT integrated into the 100-item bank.
- All eight `/tmp/realestatebroker-v2-*.log` files existed and were copied to `handoff/progress/tmp-logs/`.
- Three Python environment symlinks were preserved as links, not dereferenced; `venv/bin/python3` still points at the original macOS CommandLineTools Python. This archive does not promise a portable runnable environment.

## Omissions and recovery limits

The initial local scan excluded: `/Users/johnbrophy/tigertest-next20-progress/cdm-research/userra.html`. Its saved public DOL HTML embeds a BOOMR website analytics API key. The whole file was omitted under the user's no-API-keys instruction, and the original remains untouched. Its source can be fetched again by a future researcher. No failed or discarded review was omitted.

Exact older reviewer prompts cannot all be recovered: their local session payloads are encrypted. The review-provenance section below identifies recoverable verbatim prompts, missing rounds, metadata and retrospective descriptions. Descriptions are NOT substitutes for exact prompts. No encrypted session transcripts or unrelated chats were copied. No private decryption was attempted.

See [secret-scan-report.json](secret-scan-report.json) for scan method and reviewed false positives. No `.env` file or `.env` contents were copied. Credential variable names and paths in scripts/prompts are references, not secret values. Private answer maps are exam answer keys, not authentication credentials, and are intentionally retained for the review audit.


GitHub push protection detected a Mapbox Secret Access Token in `handoff/progress/cdm-research/cms-manual-index.html` during the initial push. That push was rejected; the file was then omitted in full and the local commit replaced before retrying. A scan for Mapbox token formats across all copied files identified the following additional omissions: `/Users/johnbrophy/tigertest-next20-progress/cdm-research/cms-manual-index.html`. Source files were not changed. No bypass was requested.

## Reviewer prompts, visibility and blindness

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

## Saved review inputs and randomization evidence

These are observed saved artifacts, not reconstructed prompts or proof of actual reviewer access. All paths in this table are relative to `handoff/progress/`. The exact later EPA40 allowlists appear in the verbatim prompts above; older allowlists could not be recovered. Reviewers technically had filesystem access to banks, mappings and other artifacts, so file presence alone does not establish blindness.

`prepare_review.py` preserves source order, original question IDs and option order: it strips keys/explanations and, for options-only, stems, but does not anonymise or shuffle. `prepare_anonymous_review.py` uses `random.SystemRandom()` to shuffle rows and independently shuffle each item’s options, assigns sequential R001-style review IDs, retains category labels, and saves the original ID and option-letter mapping in `private-mapping.json`. No fixed random seed is saved. Saved outputs and mappings preserve the resulting ordering. The script alone cannot prove which historical invocation produced every file.

The intended staged visibility in `review_protocol.md` is options only first; then stems with the same options, without keys; then keys/explanations after answers are locked. This protocol is preserved as evidence of intended procedure, not an exact record of historical prompts or compliance.

| Exam / round directory | Saved option-only and stem inputs | Mapping / explanation inputs (not blind) |
|---|---|---|
| `cdm-review` | `blind-questions.json`, `options-only.json` | See full inventory |
| `cdm-review-v2` | `blind-questions.json`, `options-only.json` | See full inventory |
| `cdm-review-v3` | `blind-questions.json`, `options-only.json` | `explanations.json`, `private-mapping.json` |
| `cdm-review-v4` | `anonymous-options.json`, `anonymous-questions.json`, `blind-questions.json`, `options-only.json` | `explanations.json`, `private-mapping.json` |
| `cdm-review-v5` | `anonymous-options.json`, `anonymous-questions.json`, `blind-questions.json`, `options-only.json` | `private-mapping.json` |
| `epa609-pilot-review-v1` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `epa609-pilot-review-v2` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `epa609-pilot40-changed-review-v1` | No standalone staged inputs saved | See full inventory |
| `epa609-pilot40-review-v1` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `epa609-pilot40-review-v2` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `epa609-review-v1` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `frvtc-review-final-changes` | `blind-questions.json` | `explanations.json`, `private-mapping.json` |
| `frvtc-review-v1` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `frvtc-review-v2` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `realestatebroker-review-v1` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |
| `realestatebroker-review-v2-changes` | `anonymous-options.json`, `anonymous-questions.json` | `explanations.json`, `private-mapping.json` |

CDM v2’s answer-position-based review was invalid. Reused-reviewer changed-item follow-ups, including French VTC final changes, broker changed-item work and EPA40 follow-ups after explanations, must not be treated as fresh blind reviews. Preserved outputs and the call inventory retain these rounds; the access limitations above apply to every exam.

## Exact copy inventory

Every copied source and destination is listed below; [file-manifest.json](file-manifest.json) also records SHA-256 hashes, symlink kinds and inclusion status. Hashes verify unchanged bytes (symlink hashes cover link-target text). Generated handoff-only files are README.md, file-manifest.json, epa609-worktree.diff, epa609-worktree-state.json and secret-scan-report.json. The diff/state originate from the recorded Git commands; the manifest, scan report and README were generated for this handoff.

| Source | Branch destination | Included |
|---|---|---|
| `/Users/johnbrophy/tigertest-next20-progress/cdm-checks.log` | `handoff/progress/cdm-checks.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-ci-failed.log` | `handoff/progress/cdm-ci-failed.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-draft-checkpoint/changed-ids.json` | `handoff/progress/cdm-draft-checkpoint/changed-ids.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-draft-checkpoint/changed-items-for-factual-review.json` | `handoff/progress/cdm-draft-checkpoint/changed-items-for-factual-review.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-draft-checkpoint/final-bank.json` | `handoff/progress/cdm-draft-checkpoint/final-bank.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-draft-full-checks.log` | `handoff/progress/cdm-draft-full-checks.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-launch-before.json` | `handoff/progress/cdm-launch-before.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/cdc-bmi.html` | `handoff/progress/cdm-research/cdc-bmi.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/cdc-bmi.txt` | `handoff/progress/cdm-research/cdc-bmi.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/cms-manual-index.html` | `handoff/progress/cdm-research/cms-manual-index.html` | No — embedded Mapbox token |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/cms-rai2026.pdf` | `handoff/progress/cdm-research/cms-rai2026.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/cms-section-k.txt` | `handoff/progress/cdm-research/cms-section-k.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/eeoc-disability.html` | `handoff/progress/cdm-research/eeoc-disability.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/eeoc-disability.txt` | `handoff/progress/cdm-research/eeoc-disability.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/expansion-urls.json` | `handoff/progress/cdm-research/expansion-urls.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/faq.txt` | `handoff/progress/cdm-research/faq.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/fmla-guide.html` | `handoff/progress/cdm-research/fmla-guide.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/fmla-guide.txt` | `handoff/progress/cdm-research/fmla-guide.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/fmla.html` | `handoff/progress/cdm-research/fmla.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/fmla.txt` | `handoff/progress/cdm-research/fmla.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/foodcode.pdf` | `handoff/progress/cdm-research/foodcode.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/foodcode.txt` | `handoff/progress/cdm-research/foodcode.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/icn-keystones.pdf` | `handoff/progress/cdm-research/icn-keystones.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/icn-keystones.txt` | `handoff/progress/cdm-research/icn-keystones.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/inventory.html` | `handoff/progress/cdm-research/inventory.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/inventory.txt` | `handoff/progress/cdm-research/inventory.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/news.clean.txt` | `handoff/progress/cdm-research/news.clean.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/news.html` | `handoff/progress/cdm-research/news.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/news.txt` | `handoff/progress/cdm-research/news.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/niddk-ckd.html` | `handoff/progress/cdm-research/niddk-ckd.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/niddk-ckd.txt` | `handoff/progress/cdm-research/niddk-ckd.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/outline.clean.txt` | `handoff/progress/cdm-research/outline.clean.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/outline.html` | `handoff/progress/cdm-research/outline.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/outline.txt` | `handoff/progress/cdm-research/outline.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard1.pdf` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard1.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard1.txt` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard1.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard2.pdf` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard2.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard2.txt` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard2.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard3.pdf` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard3.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard3.txt` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard3.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard4.pdf` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard4.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_businessoperations-standard4.txt` | `handoff/progress/cdm-research/practicestandards_businessoperations-standard4.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_foodservice-standard1.pdf` | `handoff/progress/cdm-research/practicestandards_foodservice-standard1.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_foodservice-standard1.txt` | `handoff/progress/cdm-research/practicestandards_foodservice-standard1.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_foodservice-standard2.pdf` | `handoff/progress/cdm-research/practicestandards_foodservice-standard2.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_foodservice-standard2.txt` | `handoff/progress/cdm-research/practicestandards_foodservice-standard2.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_foodservice-standard3.pdf` | `handoff/progress/cdm-research/practicestandards_foodservice-standard3.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_foodservice-standard3.txt` | `handoff/progress/cdm-research/practicestandards_foodservice-standard3.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard1.pdf` | `handoff/progress/cdm-research/practicestandards_nutrition-standard1.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard1.txt` | `handoff/progress/cdm-research/practicestandards_nutrition-standard1.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard2.pdf` | `handoff/progress/cdm-research/practicestandards_nutrition-standard2.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard2.txt` | `handoff/progress/cdm-research/practicestandards_nutrition-standard2.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard3.pdf` | `handoff/progress/cdm-research/practicestandards_nutrition-standard3.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard3.txt` | `handoff/progress/cdm-research/practicestandards_nutrition-standard3.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard4.pdf` | `handoff/progress/cdm-research/practicestandards_nutrition-standard4.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_nutrition-standard4.txt` | `handoff/progress/cdm-research/practicestandards_nutrition-standard4.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_personnelcommunications-standard1.pdf` | `handoff/progress/cdm-research/practicestandards_personnelcommunications-standard1.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_personnelcommunications-standard1.txt` | `handoff/progress/cdm-research/practicestandards_personnelcommunications-standard1.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_personnelcommunications-standard2.pdf` | `handoff/progress/cdm-research/practicestandards_personnelcommunications-standard2.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_personnelcommunications-standard2.txt` | `handoff/progress/cdm-research/practicestandards_personnelcommunications-standard2.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_personnelcommunications-standard3.pdf` | `handoff/progress/cdm-research/practicestandards_personnelcommunications-standard3.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_personnelcommunications-standard3.txt` | `handoff/progress/cdm-research/practicestandards_personnelcommunications-standard3.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_sanitationsafety-standard1.pdf` | `handoff/progress/cdm-research/practicestandards_sanitationsafety-standard1.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_sanitationsafety-standard1.txt` | `handoff/progress/cdm-research/practicestandards_sanitationsafety-standard1.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_sanitationsafety-standard2.pdf` | `handoff/progress/cdm-research/practicestandards_sanitationsafety-standard2.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_sanitationsafety-standard2.txt` | `handoff/progress/cdm-research/practicestandards_sanitationsafety-standard2.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_sanitationsafety-standard3.pdf` | `handoff/progress/cdm-research/practicestandards_sanitationsafety-standard3.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/practicestandards_sanitationsafety-standard3.txt` | `handoff/progress/cdm-research/practicestandards_sanitationsafety-standard3.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/register.clean.txt` | `handoff/progress/cdm-research/register.clean.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/register.html` | `handoff/progress/cdm-research/register.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/register.txt` | `handoff/progress/cdm-research/register.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/resident-rights.html` | `handoff/progress/cdm-research/resident-rights.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/resident-rights.txt` | `handoff/progress/cdm-research/resident-rights.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/scope.clean.txt` | `handoff/progress/cdm-research/scope.clean.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/scope.html` | `handoff/progress/cdm-research/scope.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/scope.txt` | `handoff/progress/cdm-research/scope.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/scoring.clean.txt` | `handoff/progress/cdm-research/scoring.clean.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/scoring.html` | `handoff/progress/cdm-research/scoring.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/scoring.txt` | `handoff/progress/cdm-research/scoring.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/standards-links.json` | `handoff/progress/cdm-research/standards-links.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/standards.html` | `handoff/progress/cdm-research/standards.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/userra.html` | `handoff/progress/cdm-research/userra.html` | No: embedded API key |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-research/userra.txt` | `handoff/progress/cdm-research/userra.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/blind-answers.json` | `handoff/progress/cdm-review/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/blind-questions.json` | `handoff/progress/cdm-review/blind-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/final-findings.json` | `handoff/progress/cdm-review/final-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/final-review-summary.json` | `handoff/progress/cdm-review/final-review-summary.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/options-guesses.json` | `handoff/progress/cdm-review/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/options-only.json` | `handoff/progress/cdm-review/options-only.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/options-score.json` | `handoff/progress/cdm-review/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review/stage2-pedagogy.md` | `handoff/progress/cdm-review/stage2-pedagogy.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v2/blind-questions.json` | `handoff/progress/cdm-review-v2/blind-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v2/options-guesses.json` | `handoff/progress/cdm-review-v2/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v2/options-only.json` | `handoff/progress/cdm-review-v2/options-only.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v2/options-score.json` | `handoff/progress/cdm-review-v2/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v2/source-tags.json` | `handoff/progress/cdm-review-v2/source-tags.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/blind-answers.json` | `handoff/progress/cdm-review-v3/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/blind-questions.json` | `handoff/progress/cdm-review-v3/blind-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/explanations.json` | `handoff/progress/cdm-review-v3/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/options-guesses.json` | `handoff/progress/cdm-review-v3/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/options-only.json` | `handoff/progress/cdm-review-v3/options-only.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/options-score.json` | `handoff/progress/cdm-review-v3/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/pedagogy-review.md` | `handoff/progress/cdm-review-v3/pedagogy-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v3/private-mapping.json` | `handoff/progress/cdm-review-v3/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/actionable-findings.json` | `handoff/progress/cdm-review-v4/actionable-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/anonymous-options.json` | `handoff/progress/cdm-review-v4/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/anonymous-questions.json` | `handoff/progress/cdm-review-v4/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/blind-answers.json` | `handoff/progress/cdm-review-v4/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/blind-questions.json` | `handoff/progress/cdm-review-v4/blind-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/explanations.json` | `handoff/progress/cdm-review-v4/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/options-guesses.json` | `handoff/progress/cdm-review-v4/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/options-only.json` | `handoff/progress/cdm-review-v4/options-only.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/options-score.json` | `handoff/progress/cdm-review-v4/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v4/private-mapping.json` | `handoff/progress/cdm-review-v4/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/129-item-author-disposition.json` | `handoff/progress/cdm-review-v5/129-item-author-disposition.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/anonymous-options.json` | `handoff/progress/cdm-review-v5/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/anonymous-questions.json` | `handoff/progress/cdm-review-v5/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/blind-questions.json` | `handoff/progress/cdm-review-v5/blind-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/draft-blind-answers.json` | `handoff/progress/cdm-review-v5/draft-blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/draft-explanations.json` | `handoff/progress/cdm-review-v5/draft-explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/draft-final-blind.json` | `handoff/progress/cdm-review-v5/draft-final-blind.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/options-guesses.json` | `handoff/progress/cdm-review-v5/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/options-only.json` | `handoff/progress/cdm-review-v5/options-only.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/options-score.json` | `handoff/progress/cdm-review-v5/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/cdm-review-v5/private-mapping.json` | `handoff/progress/cdm-review-v5/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-authoring-reset.md` | `handoff/progress/epa609-authoring-reset.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-future-coverage-audit.md` | `handoff/progress/epa609-future-coverage-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/anonymous-options.json` | `handoff/progress/epa609-pilot-review-v1/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/anonymous-questions.json` | `handoff/progress/epa609-pilot-review-v1/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/blind-answers.json` | `handoff/progress/epa609-pilot-review-v1/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/blind-review-notes.md` | `handoff/progress/epa609-pilot-review-v1/blind-review-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/blind-score-private.json` | `handoff/progress/epa609-pilot-review-v1/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/explanations.json` | `handoff/progress/epa609-pilot-review-v1/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/findings.json` | `handoff/progress/epa609-pilot-review-v1/findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/mapped-findings-private.json` | `handoff/progress/epa609-pilot-review-v1/mapped-findings-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/options-answers.json` | `handoff/progress/epa609-pilot-review-v1/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/options-mapped-private.json` | `handoff/progress/epa609-pilot-review-v1/options-mapped-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/options-notes.md` | `handoff/progress/epa609-pilot-review-v1/options-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/options-score-private.json` | `handoff/progress/epa609-pilot-review-v1/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/private-mapping.json` | `handoff/progress/epa609-pilot-review-v1/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v1/review.md` | `handoff/progress/epa609-pilot-review-v1/review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/anonymous-options.json` | `handoff/progress/epa609-pilot-review-v2/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/anonymous-questions.json` | `handoff/progress/epa609-pilot-review-v2/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/blind-answers.json` | `handoff/progress/epa609-pilot-review-v2/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/blind-score-private.json` | `handoff/progress/epa609-pilot-review-v2/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/explanations.json` | `handoff/progress/epa609-pilot-review-v2/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/findings.json` | `handoff/progress/epa609-pilot-review-v2/findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/mapped-findings-private.json` | `handoff/progress/epa609-pilot-review-v2/mapped-findings-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/options-answers.json` | `handoff/progress/epa609-pilot-review-v2/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/options-mapped-private.json` | `handoff/progress/epa609-pilot-review-v2/options-mapped-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/options-notes.md` | `handoff/progress/epa609-pilot-review-v2/options-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/options-score-private.json` | `handoff/progress/epa609-pilot-review-v2/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/private-mapping.json` | `handoff/progress/epa609-pilot-review-v2/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/review.md` | `handoff/progress/epa609-pilot-review-v2/review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-review-v2/source-pedagogy-notes.md` | `handoff/progress/epa609-pilot-review-v2/source-pedagogy-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/authoring-evidence.json` | `handoff/progress/epa609-pilot-v1/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/before-after.md` | `handoff/progress/epa609-pilot-v1/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/build_pilot.py` | `handoff/progress/epa609-pilot-v1/build_pilot.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/diagnostics.json` | `handoff/progress/epa609-pilot-v1/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/finalize_pilot.py` | `handoff/progress/epa609-pilot-v1/finalize_pilot.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/finish_report.py` | `handoff/progress/epa609-pilot-v1/finish_report.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/last_review.py` | `handoff/progress/epa609-pilot-v1/last_review.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/pilot-before-three-revisions.json` | `handoff/progress/epa609-pilot-v1/pilot-before-three-revisions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/pilot-questions.json` | `handoff/progress/epa609-pilot-v1/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/revise_pilot.py` | `handoff/progress/epa609-pilot-v1/revise_pilot.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/revise_three.py` | `handoff/progress/epa609-pilot-v1/revise_three.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/self-review.md` | `handoff/progress/epa609-pilot-v1/self-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/sources.md` | `handoff/progress/epa609-pilot-v1/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/three-item-revisions.md` | `handoff/progress/epa609-pilot-v1/three-item-revisions.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v1/validator.txt` | `handoff/progress/epa609-pilot-v1/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/authoring-evidence.json` | `handoff/progress/epa609-pilot-v2/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/before-after.md` | `handoff/progress/epa609-pilot-v2/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/build.py` | `handoff/progress/epa609-pilot-v2/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/diagnostics.json` | `handoff/progress/epa609-pilot-v2/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/manual-audit.md` | `handoff/progress/epa609-pilot-v2/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/pilot-questions.json` | `handoff/progress/epa609-pilot-v2/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/robinair-SP01972025-VER01.pdf` | `handoff/progress/epa609-pilot-v2/robinair-SP01972025-VER01.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/sources.md` | `handoff/progress/epa609-pilot-v2/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v2/validator.txt` | `handoff/progress/epa609-pilot-v2/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/authoring-evidence.json` | `handoff/progress/epa609-pilot-v3/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/before-after.md` | `handoff/progress/epa609-pilot-v3/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/build.py` | `handoff/progress/epa609-pilot-v3/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/diagnostic-output.txt` | `handoff/progress/epa609-pilot-v3/diagnostic-output.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/diagnostics.json` | `handoff/progress/epa609-pilot-v3/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/manual-audit.md` | `handoff/progress/epa609-pilot-v3/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/pilot-questions.json` | `handoff/progress/epa609-pilot-v3/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/sources.md` | `handoff/progress/epa609-pilot-v3/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v3/validator.txt` | `handoff/progress/epa609-pilot-v3/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/authoring-evidence.json` | `handoff/progress/epa609-pilot-v4/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/before-after.md` | `handoff/progress/epa609-pilot-v4/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/build.py` | `handoff/progress/epa609-pilot-v4/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/coordinator-gate.md` | `handoff/progress/epa609-pilot-v4/coordinator-gate.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/diagnostics.json` | `handoff/progress/epa609-pilot-v4/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/manual-audit.md` | `handoff/progress/epa609-pilot-v4/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/pilot-questions.json` | `handoff/progress/epa609-pilot-v4/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/sources.md` | `handoff/progress/epa609-pilot-v4/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot-v4/validator.txt` | `handoff/progress/epa609-pilot-v4/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-changed-review-v1/changed-findings.json` | `handoff/progress/epa609-pilot40-changed-review-v1/changed-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-changed-review-v1/final-v4-review.md` | `handoff/progress/epa609-pilot40-changed-review-v1/final-v4-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-changed-review-v1/findings-v4.json` | `handoff/progress/epa609-pilot40-changed-review-v1/findings-v4.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-changed-review-v1/independent-changed-review.md` | `handoff/progress/epa609-pilot40-changed-review-v1/independent-changed-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/anonymous-options.json` | `handoff/progress/epa609-pilot40-review-v1/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/anonymous-questions.json` | `handoff/progress/epa609-pilot40-review-v1/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/artifact-audit-private.json` | `handoff/progress/epa609-pilot40-review-v1/artifact-audit-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/blind-answers.json` | `handoff/progress/epa609-pilot40-review-v1/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/blind-findings.json` | `handoff/progress/epa609-pilot40-review-v1/blind-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/blind-score-private.json` | `handoff/progress/epa609-pilot40-review-v1/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/explanation-audit.json` | `handoff/progress/epa609-pilot40-review-v1/explanation-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/explanations.json` | `handoff/progress/epa609-pilot40-review-v1/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/final-findings.json` | `handoff/progress/epa609-pilot40-review-v1/final-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/finalreview.md` | `handoff/progress/epa609-pilot40-review-v1/finalreview.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/mapped-final-findings-private.json` | `handoff/progress/epa609-pilot40-review-v1/mapped-final-findings-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/options-answers.json` | `handoff/progress/epa609-pilot40-review-v1/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/options-mapped-private.json` | `handoff/progress/epa609-pilot40-review-v1/options-mapped-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/options-notes.md` | `handoff/progress/epa609-pilot40-review-v1/options-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/options-score-private.json` | `handoff/progress/epa609-pilot40-review-v1/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v1/private-mapping.json` | `handoff/progress/epa609-pilot40-review-v1/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/anonymous-options.json` | `handoff/progress/epa609-pilot40-review-v2/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/anonymous-questions.json` | `handoff/progress/epa609-pilot40-review-v2/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/artifact-audit-private.json` | `handoff/progress/epa609-pilot40-review-v2/artifact-audit-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/blind-answers.json` | `handoff/progress/epa609-pilot40-review-v2/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/blind-findings.json` | `handoff/progress/epa609-pilot40-review-v2/blind-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/blind-score-private.json` | `handoff/progress/epa609-pilot40-review-v2/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/explanation-audit.json` | `handoff/progress/epa609-pilot40-review-v2/explanation-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/explanations.json` | `handoff/progress/epa609-pilot40-review-v2/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/final-findings.json` | `handoff/progress/epa609-pilot40-review-v2/final-findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/finalreview.md` | `handoff/progress/epa609-pilot40-review-v2/finalreview.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/minor-v5-review.md` | `handoff/progress/epa609-pilot40-review-v2/minor-v5-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/options-answers.json` | `handoff/progress/epa609-pilot40-review-v2/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/options-mapped-private.json` | `handoff/progress/epa609-pilot40-review-v2/options-mapped-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/options-notes.md` | `handoff/progress/epa609-pilot40-review-v2/options-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/options-score-private.json` | `handoff/progress/epa609-pilot40-review-v2/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-review-v2/private-mapping.json` | `handoff/progress/epa609-pilot40-review-v2/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-selection.json` | `handoff/progress/epa609-pilot40-selection.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/authoring-evidence.json` | `handoff/progress/epa609-pilot40-v1/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/before-after.md` | `handoff/progress/epa609-pilot40-v1/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/build.py` | `handoff/progress/epa609-pilot40-v1/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/diagnose.py` | `handoff/progress/epa609-pilot40-v1/diagnose.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/diagnostics.json` | `handoff/progress/epa609-pilot40-v1/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/manual-audit.md` | `handoff/progress/epa609-pilot40-v1/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/option-reuse.txt` | `handoff/progress/epa609-pilot40-v1/option-reuse.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/pilot-questions.json` | `handoff/progress/epa609-pilot40-v1/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/selection.json` | `handoff/progress/epa609-pilot40-v1/selection.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/sources.md` | `handoff/progress/epa609-pilot40-v1/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v1/validator.txt` | `handoff/progress/epa609-pilot40-v1/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/authoring-evidence.json` | `handoff/progress/epa609-pilot40-v2/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/before-after.md` | `handoff/progress/epa609-pilot40-v2/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/build.py` | `handoff/progress/epa609-pilot40-v2/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/diagnose.py` | `handoff/progress/epa609-pilot40-v2/diagnose.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/diagnostics.json` | `handoff/progress/epa609-pilot40-v2/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/manual-audit.md` | `handoff/progress/epa609-pilot40-v2/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/option-reuse.txt` | `handoff/progress/epa609-pilot40-v2/option-reuse.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/pilot-questions.json` | `handoff/progress/epa609-pilot40-v2/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/selection.json` | `handoff/progress/epa609-pilot40-v2/selection.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/sources.md` | `handoff/progress/epa609-pilot40-v2/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v2/validator.txt` | `handoff/progress/epa609-pilot40-v2/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/authoring-evidence.json` | `handoff/progress/epa609-pilot40-v3/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/before-after.md` | `handoff/progress/epa609-pilot40-v3/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/build.py` | `handoff/progress/epa609-pilot40-v3/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/diagnose.py` | `handoff/progress/epa609-pilot40-v3/diagnose.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/diagnostics.json` | `handoff/progress/epa609-pilot40-v3/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/freeze-hashes.json` | `handoff/progress/epa609-pilot40-v3/freeze-hashes.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/manual-audit.md` | `handoff/progress/epa609-pilot40-v3/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/option-reuse.txt` | `handoff/progress/epa609-pilot40-v3/option-reuse.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/pilot-questions.json` | `handoff/progress/epa609-pilot40-v3/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/robinair-567817-rev-f-en.pdf` | `handoff/progress/epa609-pilot40-v3/robinair-567817-rev-f-en.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/sources.md` | `handoff/progress/epa609-pilot40-v3/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v3/validator.txt` | `handoff/progress/epa609-pilot40-v3/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/authoring-evidence.json` | `handoff/progress/epa609-pilot40-v4/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/before-after.md` | `handoff/progress/epa609-pilot40-v4/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/build.py` | `handoff/progress/epa609-pilot40-v4/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/diagnose.py` | `handoff/progress/epa609-pilot40-v4/diagnose.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/diagnostics.json` | `handoff/progress/epa609-pilot40-v4/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/freeze-hashes.json` | `handoff/progress/epa609-pilot40-v4/freeze-hashes.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/manual-audit.md` | `handoff/progress/epa609-pilot40-v4/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/option-reuse.txt` | `handoff/progress/epa609-pilot40-v4/option-reuse.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/pilot-questions.json` | `handoff/progress/epa609-pilot40-v4/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/sources.md` | `handoff/progress/epa609-pilot40-v4/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v4/validator.txt` | `handoff/progress/epa609-pilot40-v4/validator.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/authoring-evidence.json` | `handoff/progress/epa609-pilot40-v5/authoring-evidence.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/before-after.md` | `handoff/progress/epa609-pilot40-v5/before-after.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/build.py` | `handoff/progress/epa609-pilot40-v5/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/diagnostics.json` | `handoff/progress/epa609-pilot40-v5/diagnostics.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/freeze-hashes.json` | `handoff/progress/epa609-pilot40-v5/freeze-hashes.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/manual-audit.md` | `handoff/progress/epa609-pilot40-v5/manual-audit.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/pilot-questions.json` | `handoff/progress/epa609-pilot40-v5/pilot-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-pilot40-v5/sources.md` | `handoff/progress/epa609-pilot40-v5/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-quality-decision-evidence.md` | `handoff/progress/epa609-quality-decision-evidence.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/equipment.html` | `handoff/progress/epa609-research/equipment.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/fittings.html` | `handoff/progress/epa609-research/fittings.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/impacts.html` | `handoff/progress/epa609-research/impacts.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/macs2025.pdf` | `handoff/progress/epa609-research/macs2025.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/macs2025.txt` | `handoff/progress/epa609-research/macs2025.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/manifest.json` | `handoff/progress/epa609-research/manifest.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/overlap.html` | `handoff/progress/epa609-research/overlap.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/programs.html` | `handoff/progress/epa609-research/programs.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/retrofit.html` | `handoff/progress/epa609-research/retrofit.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/sales.html` | `handoff/progress/epa609-research/sales.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-research/servicing.html` | `handoff/progress/epa609-research/servicing.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/anonymous-options.json` | `handoff/progress/epa609-review-v1/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/anonymous-questions.json` | `handoff/progress/epa609-review-v1/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/artifact-audit-private.json` | `handoff/progress/epa609-review-v1/artifact-audit-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/blind-answers.json` | `handoff/progress/epa609-review-v1/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/blind-score-private.json` | `handoff/progress/epa609-review-v1/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/distractor-audit.json` | `handoff/progress/epa609-review-v1/distractor-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/explanation-audit.json` | `handoff/progress/epa609-review-v1/explanation-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/explanations.json` | `handoff/progress/epa609-review-v1/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/finalreview.md` | `handoff/progress/epa609-review-v1/finalreview.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/findings.json` | `handoff/progress/epa609-review-v1/findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/mapped-findings-private.json` | `handoff/progress/epa609-review-v1/mapped-findings-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/options-answers.json` | `handoff/progress/epa609-review-v1/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/options-notes.md` | `handoff/progress/epa609-review-v1/options-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/options-score-private.json` | `handoff/progress/epa609-review-v1/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/pedagogical-review.md` | `handoff/progress/epa609-review-v1/pedagogical-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/pilot-targets-private.json` | `handoff/progress/epa609-review-v1/pilot-targets-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/private-mapping.json` | `handoff/progress/epa609-review-v1/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/epa609-review-v1/representative-ten-private.json` | `handoff/progress/epa609-review-v1/representative-ten-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/accident.html` | `handoff/progress/frvtc-research/accident.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/accident.txt` | `handoff/progress/frvtc-research/accident.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/anglais-final.json` | `handoff/progress/frvtc-research/anglais-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/anglais-v2.json` | `handoff/progress/frvtc-research/anglais-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/anglais-v3.json` | `handoff/progress/frvtc-research/anglais-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/anglais.json` | `handoff/progress/frvtc-research/anglais.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/anglais.sources.json` | `handoff/progress/frvtc-research/anglais.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-3-0.jp2` | `handoff/progress/frvtc-research/annex-3-0.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-3-1.png` | `handoff/progress/frvtc-research/annex-3-1.png` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-4-0.jp2` | `handoff/progress/frvtc-research/annex-4-0.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-4-1.png` | `handoff/progress/frvtc-research/annex-4-1.png` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-5-0.jp2` | `handoff/progress/frvtc-research/annex-5-0.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-5-1.jp2` | `handoff/progress/frvtc-research/annex-5-1.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-5-1.png` | `handoff/progress/frvtc-research/annex-5-1.png` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-6-0.jp2` | `handoff/progress/frvtc-research/annex-6-0.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-6-1.jp2` | `handoff/progress/frvtc-research/annex-6-1.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-6-1.png` | `handoff/progress/frvtc-research/annex-6-1.png` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-7-0.jp2` | `handoff/progress/frvtc-research/annex-7-0.jp2` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/annex-7-1.png` | `handoff/progress/frvtc-research/annex-7-1.png` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/automerge-checks-final.log` | `handoff/progress/frvtc-research/automerge-checks-final.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/automerge-checks.log` | `handoff/progress/frvtc-research/automerge-checks.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/automerge-draft-final.log` | `handoff/progress/frvtc-research/automerge-draft-final.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/automerge-v3-final.log` | `handoff/progress/frvtc-research/automerge-v3-final.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/business-accounting-current-web.txt` | `handoff/progress/frvtc-research/business-accounting-current-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/business-forms.html` | `handoff/progress/frvtc-research/business-forms.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/business-forms.txt` | `handoff/progress/frvtc-research/business-forms.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/business-result-web.txt` | `handoff/progress/frvtc-research/business-result-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/ceinture.html` | `handoff/progress/frvtc-research/ceinture.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/ceinture.txt` | `handoff/progress/frvtc-research/ceinture.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/cma-reglement.pdf` | `handoff/progress/frvtc-research/cma-reglement.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/cma-reglement.txt` | `handoff/progress/frvtc-research/cma-reglement.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/cnil-communication-web.txt` | `handoff/progress/frvtc-research/cnil-communication-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/commercial-final.json` | `handoff/progress/frvtc-research/commercial-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/commercial-v2.json` | `handoff/progress/frvtc-research/commercial-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/commercial-v3.json` | `handoff/progress/frvtc-research/commercial-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/commercial.json` | `handoff/progress/frvtc-research/commercial.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/commercial.sources.json` | `handoff/progress/frvtc-research/commercial.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/common-law-full-web.txt` | `handoff/progress/frvtc-research/common-law-full-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/common-transport-outrage-web.txt` | `handoff/progress/frvtc-research/common-transport-outrage-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/context-v3.py` | `handoff/progress/frvtc-research/context-v3.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/discrimination-cefr-detail-web.txt` | `handoff/progress/frvtc-research/discrimination-cefr-detail-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/discrimination-current-web.txt` | `handoff/progress/frvtc-research/discrimination-current-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/dog-current-web.txt` | `handoff/progress/frvtc-research/dog-current-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/donnees.html` | `handoff/progress/frvtc-research/donnees.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/donnees.txt` | `handoff/progress/frvtc-research/donnees.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/draft-v2-map.json` | `handoff/progress/frvtc-research/draft-v2-map.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/draft-v2.json` | `handoff/progress/frvtc-research/draft-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/echo-v3.py` | `handoff/progress/frvtc-research/echo-v3.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/facturation.html` | `handoff/progress/frvtc-research/facturation.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/facturation.txt` | `handoff/progress/frvtc-research/facturation.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/fatigue-alcohol-web.txt` | `handoff/progress/frvtc-research/fatigue-alcohol-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/fetch.py` | `handoff/progress/frvtc-research/fetch.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/final-design-fixes-v2.py` | `handoff/progress/frvtc-research/final-design-fixes-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/final-targeted.py` | `handoff/progress/frvtc-research/final-targeted.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/fog-inspection-full-web.txt` | `handoff/progress/frvtc-research/fog-inspection-full-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/fog-inspection-web.txt` | `handoff/progress/frvtc-research/fog-inspection-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/francais-final.json` | `handoff/progress/frvtc-research/francais-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/francais-v2.json` | `handoff/progress/frvtc-research/francais-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/francais-v3.json` | `handoff/progress/frvtc-research/francais-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/francais.json` | `handoff/progress/frvtc-research/francais.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/francais.sources.json` | `handoff/progress/frvtc-research/francais.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/full-draft.json` | `handoff/progress/frvtc-research/full-draft.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/full-draft.sources.json` | `handoff/progress/frvtc-research/full-draft.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/gestion-final.json` | `handoff/progress/frvtc-research/gestion-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/gestion-v2.json` | `handoff/progress/frvtc-research/gestion-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/gestion-v3.json` | `handoff/progress/frvtc-research/gestion-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/gestion.json` | `handoff/progress/frvtc-research/gestion.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/gestion.sources.json` | `handoff/progress/frvtc-research/gestion.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/initial-sources-checkpoint.md` | `handoff/progress/frvtc-research/initial-sources-checkpoint.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/landing.py` | `handoff/progress/frvtc-research/landing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/language-competencies-web.txt` | `handoff/progress/frvtc-research/language-competencies-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/legal-marketing-web.txt` | `handoff/progress/frvtc-research/legal-marketing-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/market-study.html` | `handoff/progress/frvtc-research/market-study.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/market-study.txt` | `handoff/progress/frvtc-research/market-study.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/marketing.html` | `handoff/progress/frvtc-research/marketing.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/marketing.txt` | `handoff/progress/frvtc-research/marketing.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/marque.html` | `handoff/progress/frvtc-research/marque.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/marque.txt` | `handoff/progress/frvtc-research/marque.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/medicine-current-web.txt` | `handoff/progress/frvtc-research/medicine-current-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/prix.html` | `handoff/progress/frvtc-research/prix.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/prix.txt` | `handoff/progress/frvtc-research/prix.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/rebuild-com-v2.py` | `handoff/progress/frvtc-research/rebuild-com-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/rebuild-ges-v2.py` | `handoff/progress/frvtc-research/rebuild-ges-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/rebuild-lang-v2.py` | `handoff/progress/frvtc-research/rebuild-lang-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/rebuild-reg-v2.py` | `handoff/progress/frvtc-research/rebuild-reg-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/rebuild-sec-v2.py` | `handoff/progress/frvtc-research/rebuild-sec-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/rebuild-v2.py` | `handoff/progress/frvtc-research/rebuild-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/reglementation-final.json` | `handoff/progress/frvtc-research/reglementation-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/reglementation-v2.json` | `handoff/progress/frvtc-research/reglementation-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/reglementation-v3.json` | `handoff/progress/frvtc-research/reglementation-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/reglementation.json` | `handoff/progress/frvtc-research/reglementation.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/reglementation.sources.json` | `handoff/progress/frvtc-research/reglementation.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/reservation-2025-consolidated-parent-fetch.txt` | `handoff/progress/frvtc-research/reservation-2025-consolidated-parent-fetch.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/revise-commercial.py` | `handoff/progress/frvtc-research/revise-commercial.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/revise-selfread.py` | `handoff/progress/frvtc-research/revise-selfread.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/road-general-web.txt` | `handoff/progress/frvtc-research/road-general-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/road-general2-web.txt` | `handoff/progress/frvtc-research/road-general2-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/road-other-web.txt` | `handoff/progress/frvtc-research/road-other-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/road-overtaking-web.txt` | `handoff/progress/frvtc-research/road-overtaking-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/road-priority-web.txt` | `handoff/progress/frvtc-research/road-priority-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/road-speed-web.txt` | `handoff/progress/frvtc-research/road-speed-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/securite-final.json` | `handoff/progress/frvtc-research/securite-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/securite-v2.json` | `handoff/progress/frvtc-research/securite-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/securite-v3.json` | `handoff/progress/frvtc-research/securite-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/securite.json` | `handoff/progress/frvtc-research/securite.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/securite.sources.json` | `handoff/progress/frvtc-research/securite.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/self-fixes-v2.py` | `handoff/progress/frvtc-research/self-fixes-v2.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/shorten-v3.py` | `handoff/progress/frvtc-research/shorten-v3.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/signage-current-full-web.txt` | `handoff/progress/frvtc-research/signage-current-full-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/signage-full-web.txt` | `handoff/progress/frvtc-research/signage-full-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/syllabus-original.pdf` | `handoff/progress/frvtc-research/syllabus-original.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/syllabus-original.txt` | `handoff/progress/frvtc-research/syllabus-original.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/syllabus.html` | `handoff/progress/frvtc-research/syllabus.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p-final.json` | `handoff/progress/frvtc-research/t3p-final.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p-full-web.txt` | `handoff/progress/frvtc-research/t3p-full-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p-platform-carpool-harassment-web.txt` | `handoff/progress/frvtc-research/t3p-platform-carpool-harassment-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p-scope-platform-web.txt` | `handoff/progress/frvtc-research/t3p-scope-platform-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p-v2.json` | `handoff/progress/frvtc-research/t3p-v2.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p-v3.json` | `handoff/progress/frvtc-research/t3p-v3.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p.json` | `handoff/progress/frvtc-research/t3p.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/t3p.sources.json` | `handoff/progress/frvtc-research/t3p.sources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/transport-code-2025.pdf` | `handoff/progress/frvtc-research/transport-code-2025.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/transport-code-2025.txt` | `handoff/progress/frvtc-research/transport-code-2025.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/transport-sections-web.txt` | `handoff/progress/frvtc-research/transport-sections-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validate-current.py` | `handoff/progress/frvtc-research/validate-current.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-draft-final.log` | `handoff/progress/frvtc-research/validation-draft-final.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-final.log` | `handoff/progress/frvtc-research/validation-final.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-v2.log` | `handoff/progress/frvtc-research/validation-v2.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-v3-final.log` | `handoff/progress/frvtc-research/validation-v3-final.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-v3-initial.log` | `handoff/progress/frvtc-research/validation-v3-initial.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-v3.log` | `handoff/progress/frvtc-research/validation-v3.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/vtc-bpi-current-web.txt` | `handoff/progress/frvtc-research/vtc-bpi-current-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/vtc-service-complete.html` | `handoff/progress/frvtc-research/vtc-service-complete.html` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/vtc-service-complete.txt` | `handoff/progress/frvtc-research/vtc-service-complete.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/vtc-service-web.txt` | `handoff/progress/frvtc-research/vtc-service-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/vtc-vehicle-web.txt` | `handoff/progress/frvtc-research/vtc-vehicle-web.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/wire.py` | `handoff/progress/frvtc-research/wire.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes/before.json` | `handoff/progress/frvtc-review-final-changes/before.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes/blind-answers.json` | `handoff/progress/frvtc-review-final-changes/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes/blind-questions.json` | `handoff/progress/frvtc-review-final-changes/blind-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes/changed-ids.json` | `handoff/progress/frvtc-review-final-changes/changed-ids.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes/explanations.json` | `handoff/progress/frvtc-review-final-changes/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-final-changes/private-mapping.json` | `handoff/progress/frvtc-review-final-changes/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/anonymous-options.json` | `handoff/progress/frvtc-review-v1/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/anonymous-questions.json` | `handoff/progress/frvtc-review-v1/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/blind-answers.json` | `handoff/progress/frvtc-review-v1/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/explanations-review.json` | `handoff/progress/frvtc-review-v1/explanations-review.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/explanations.json` | `handoff/progress/frvtc-review-v1/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/options-guesses-complete.json` | `handoff/progress/frvtc-review-v1/options-guesses-complete.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/options-guesses.json` | `handoff/progress/frvtc-review-v1/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/options-score.json` | `handoff/progress/frvtc-review-v1/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/pedagogy-language-review.md` | `handoff/progress/frvtc-review-v1/pedagogy-language-review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v1/private-mapping.json` | `handoff/progress/frvtc-review-v1/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/anonymous-options.json` | `handoff/progress/frvtc-review-v2/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/anonymous-questions.json` | `handoff/progress/frvtc-review-v2/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/blind-answers.json` | `handoff/progress/frvtc-review-v2/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/explanations.json` | `handoff/progress/frvtc-review-v2/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/options-guesses.json` | `handoff/progress/frvtc-review-v2/options-guesses.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/options-score.json` | `handoff/progress/frvtc-review-v2/options-score.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/frvtc-review-v2/private-mapping.json` | `handoff/progress/frvtc-review-v2/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/prepare_anonymous_review.py` | `handoff/progress/prepare_anonymous_review.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/prepare_review.py` | `handoff/progress/prepare_review.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/progress.json` | `handoff/progress/progress.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/asbestos.txt` | `handoff/progress/realestatebroker-research/asbestos.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/automerge-draft.log` | `handoff/progress/realestatebroker-research/automerge-draft.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre10.pdf` | `handoff/progress/realestatebroker-research/dre10.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre10.txt` | `handoff/progress/realestatebroker-research/dre10.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre12.pdf` | `handoff/progress/realestatebroker-research/dre12.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre12.txt` | `handoff/progress/realestatebroker-research/dre12.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre14.pdf` | `handoff/progress/realestatebroker-research/dre14.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre14.txt` | `handoff/progress/realestatebroker-research/dre14.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre15.pdf` | `handoff/progress/realestatebroker-research/dre15.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre15.txt` | `handoff/progress/realestatebroker-research/dre15.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre16.pdf` | `handoff/progress/realestatebroker-research/dre16.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre16.txt` | `handoff/progress/realestatebroker-research/dre16.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre22.pdf` | `handoff/progress/realestatebroker-research/dre22.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre22.txt` | `handoff/progress/realestatebroker-research/dre22.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre4.pdf` | `handoff/progress/realestatebroker-research/dre4.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre4.txt` | `handoff/progress/realestatebroker-research/dre4.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre5.pdf` | `handoff/progress/realestatebroker-research/dre5.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre5.txt` | `handoff/progress/realestatebroker-research/dre5.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre6.pdf` | `handoff/progress/realestatebroker-research/dre6.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre6.txt` | `handoff/progress/realestatebroker-research/dre6.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre7.pdf` | `handoff/progress/realestatebroker-research/dre7.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre7.txt` | `handoff/progress/realestatebroker-research/dre7.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre8.pdf` | `handoff/progress/realestatebroker-research/dre8.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre8.txt` | `handoff/progress/realestatebroker-research/dre8.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre9.pdf` | `handoff/progress/realestatebroker-research/dre9.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/dre9.txt` | `handoff/progress/realestatebroker-research/dre9.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/lead.txt` | `handoff/progress/realestatebroker-research/lead.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/leadfaq.txt` | `handoff/progress/realestatebroker-research/leadfaq.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/mold.txt` | `handoff/progress/realestatebroker-research/mold.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/outline.pdf` | `handoff/progress/realestatebroker-research/outline.pdf` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/outline.txt` | `handoff/progress/realestatebroker-research/outline.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/respa.txt` | `handoff/progress/realestatebroker-research/respa.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-research/urls.json` | `handoff/progress/realestatebroker-research/urls.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/anonymous-options.json` | `handoff/progress/realestatebroker-review-v1/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/anonymous-questions.json` | `handoff/progress/realestatebroker-review-v1/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/blind-answers.json` | `handoff/progress/realestatebroker-review-v1/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/blind-notes.md` | `handoff/progress/realestatebroker-review-v1/blind-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/blind-score-private.json` | `handoff/progress/realestatebroker-review-v1/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/blind-sources.md` | `handoff/progress/realestatebroker-review-v1/blind-sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/explanations.json` | `handoff/progress/realestatebroker-review-v1/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/findings.json` | `handoff/progress/realestatebroker-review-v1/findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/mapped-findings-private.json` | `handoff/progress/realestatebroker-review-v1/mapped-findings-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/options-answers.json` | `handoff/progress/realestatebroker-review-v1/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/options-notes.md` | `handoff/progress/realestatebroker-review-v1/options-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/options-score-private.json` | `handoff/progress/realestatebroker-review-v1/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/private-mapping.json` | `handoff/progress/realestatebroker-review-v1/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/review.md` | `handoff/progress/realestatebroker-review-v1/review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v1/surface-findings-private.json` | `handoff/progress/realestatebroker-review-v1/surface-findings-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/anonymous-options.json` | `handoff/progress/realestatebroker-review-v2-changes/anonymous-options.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/anonymous-questions.json` | `handoff/progress/realestatebroker-review-v2-changes/anonymous-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/blind-answers.json` | `handoff/progress/realestatebroker-review-v2-changes/blind-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/blind-score-private.json` | `handoff/progress/realestatebroker-review-v2-changes/blind-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/explanations.json` | `handoff/progress/realestatebroker-review-v2-changes/explanations.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/findings.json` | `handoff/progress/realestatebroker-review-v2-changes/findings.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/options-answers.json` | `handoff/progress/realestatebroker-review-v2-changes/options-answers.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/options-score-private.json` | `handoff/progress/realestatebroker-review-v2-changes/options-score-private.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/private-mapping.json` | `handoff/progress/realestatebroker-review-v2-changes/private-mapping.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/private-subset.json` | `handoff/progress/realestatebroker-review-v2-changes/private-subset.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/review.md` | `handoff/progress/realestatebroker-review-v2-changes/review.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/realestatebroker-review-v2-changes/stage1-cue-audit.json` | `handoff/progress/realestatebroker-review-v2-changes/stage1-cue-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/review_protocol.md` | `handoff/progress/review_protocol.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/Activate.ps1` | `handoff/progress/venv/bin/Activate.ps1` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/activate` | `handoff/progress/venv/bin/activate` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/activate.csh` | `handoff/progress/venv/bin/activate.csh` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/activate.fish` | `handoff/progress/venv/bin/activate.fish` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/pip` | `handoff/progress/venv/bin/pip` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/pip3` | `handoff/progress/venv/bin/pip3` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/pip3.9` | `handoff/progress/venv/bin/pip3.9` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/python` | `handoff/progress/venv/bin/python` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/python3` | `handoff/progress/venv/bin/python3` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/bin/python3.9` | `handoff/progress/venv/bin/python3.9` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/_distutils_hack/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/_distutils_hack/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/_distutils_hack/override.py` | `handoff/progress/venv/lib/python3.9/site-packages/_distutils_hack/override.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/distutils-precedence.pth` | `handoff/progress/venv/lib/python3.9/site-packages/distutils-precedence.pth` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/__main__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/__main__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/build_env.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/build_env.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cache.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cache.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/autocompletion.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/autocompletion.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/base_command.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/base_command.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/cmdoptions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/cmdoptions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/command_context.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/command_context.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/main.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/main.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/main_parser.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/main_parser.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/parser.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/parser.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/progress_bars.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/progress_bars.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/req_command.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/req_command.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/spinners.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/spinners.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/cli/status_codes.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/cli/status_codes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/cache.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/cache.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/check.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/check.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/completion.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/completion.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/configuration.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/configuration.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/debug.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/debug.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/download.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/download.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/freeze.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/freeze.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/hash.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/hash.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/help.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/help.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/index.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/index.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/install.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/install.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/list.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/list.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/search.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/search.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/show.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/show.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/uninstall.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/uninstall.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/commands/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/commands/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/configuration.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/configuration.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/installed.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/installed.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/sdist.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/sdist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/distributions/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/exceptions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/exceptions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/index/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/index/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/index/collector.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/index/collector.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/index/package_finder.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/index/package_finder.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/index/sources.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/index/sources.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/locations/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/locations/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/locations/_distutils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/locations/_distutils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/locations/_sysconfig.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/locations/_sysconfig.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/locations/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/locations/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/main.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/main.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/metadata/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/metadata/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/metadata/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/metadata/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/metadata/pkg_resources.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/metadata/pkg_resources.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/candidate.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/candidate.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/direct_url.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/direct_url.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/format_control.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/format_control.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/index.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/index.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/link.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/link.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/scheme.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/scheme.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/search_scope.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/search_scope.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/selection_prefs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/selection_prefs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/target_python.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/target_python.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/models/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/models/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/auth.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/auth.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/cache.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/cache.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/download.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/download.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/lazy_wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/lazy_wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/session.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/session.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/network/xmlrpc.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/network/xmlrpc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/metadata.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/metadata.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/metadata_legacy.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/metadata_legacy.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/wheel_legacy.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/build/wheel_legacy.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/check.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/check.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/freeze.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/freeze.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/editable_legacy.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/editable_legacy.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/legacy.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/legacy.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/install/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/operations/prepare.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/operations/prepare.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/pyproject.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/pyproject.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/constructors.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/constructors.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_file.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_file.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_install.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_install.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_set.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_set.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_tracker.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_tracker.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_uninstall.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/req/req_uninstall.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/legacy/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/legacy/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/legacy/resolver.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/legacy/resolver.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/candidates.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/candidates.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/factory.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/factory.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/found_candidates.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/found_candidates.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/provider.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/provider.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/reporter.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/reporter.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/requirements.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/requirements.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/resolver.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/resolution/resolvelib/resolver.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/self_outdated_check.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/self_outdated_check.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/_log.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/_log.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/appdirs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/appdirs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/compatibility_tags.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/compatibility_tags.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/datetime.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/datetime.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/deprecation.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/deprecation.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/direct_url_helpers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/direct_url_helpers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/distutils_args.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/distutils_args.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/encoding.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/encoding.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/entrypoints.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/entrypoints.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/filesystem.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/filesystem.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/filetypes.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/filetypes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/glibc.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/glibc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/hashes.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/hashes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/inject_securetransport.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/inject_securetransport.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/logging.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/logging.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/misc.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/misc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/models.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/models.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/packaging.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/packaging.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/parallel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/parallel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/pkg_resources.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/pkg_resources.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/setuptools_build.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/setuptools_build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/subprocess.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/subprocess.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/temp_dir.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/temp_dir.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/unpacking.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/unpacking.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/urls.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/urls.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/virtualenv.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/virtualenv.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/utils/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/utils/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/bazaar.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/bazaar.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/git.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/git.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/mercurial.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/mercurial.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/subversion.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/subversion.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/versioncontrol.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/vcs/versioncontrol.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_internal/wheel_builder.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_internal/wheel_builder.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/appdirs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/appdirs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/_cmd.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/_cmd.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/adapter.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/adapter.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/cache.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/cache.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/caches/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/caches/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/caches/file_cache.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/caches/file_cache.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/caches/redis_cache.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/caches/redis_cache.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/controller.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/controller.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/filewrapper.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/filewrapper.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/heuristics.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/heuristics.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/serialize.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/serialize.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/wrapper.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/cachecontrol/wrapper.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/__main__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/__main__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/cacert.pem` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/cacert.pem` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/core.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/certifi/core.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/big5freq.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/big5freq.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/big5prober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/big5prober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/chardistribution.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/chardistribution.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/charsetgroupprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/charsetgroupprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/charsetprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/charsetprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/cli/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/cli/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/cli/chardetect.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/cli/chardetect.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/codingstatemachine.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/codingstatemachine.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/cp949prober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/cp949prober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/enums.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/enums.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/escprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/escprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/escsm.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/escsm.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/eucjpprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/eucjpprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euckrfreq.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euckrfreq.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euckrprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euckrprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euctwfreq.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euctwfreq.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euctwprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/euctwprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/gb2312freq.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/gb2312freq.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/gb2312prober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/gb2312prober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/hebrewprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/hebrewprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/jisfreq.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/jisfreq.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/jpcntx.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/jpcntx.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langbulgarianmodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langbulgarianmodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langgreekmodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langgreekmodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langhebrewmodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langhebrewmodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langhungarianmodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langhungarianmodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langrussianmodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langrussianmodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langthaimodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langthaimodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langturkishmodel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/langturkishmodel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/latin1prober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/latin1prober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/mbcharsetprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/mbcharsetprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/mbcsgroupprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/mbcsgroupprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/mbcssm.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/mbcssm.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/metadata/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/metadata/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/metadata/languages.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/metadata/languages.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/sbcharsetprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/sbcharsetprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/sbcsgroupprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/sbcsgroupprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/sjisprober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/sjisprober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/universaldetector.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/universaldetector.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/utf8prober.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/utf8prober.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/chardet/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/ansi.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/ansi.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/ansitowin32.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/ansitowin32.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/initialise.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/initialise.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/win32.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/win32.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/winterm.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/colorama/winterm.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/misc.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/misc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/shutil.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/shutil.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/sysconfig.cfg` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/sysconfig.cfg` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/sysconfig.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/sysconfig.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/tarfile.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/_backport/tarfile.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/database.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/database.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/index.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/index.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/locators.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/locators.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/manifest.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/manifest.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/markers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/markers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/metadata.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/metadata.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/resources.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/resources.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/scripts.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/scripts.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/t32.exe` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/t32.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/t64.exe` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/t64.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/util.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/w32.exe` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/w32.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/w64.exe` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/w64.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distlib/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/distro.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/distro.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_ihatexml.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_ihatexml.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_inputstream.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_inputstream.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_tokenizer.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_tokenizer.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_trie/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_trie/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_trie/_base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_trie/_base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_trie/py.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_trie/py.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/_utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/constants.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/constants.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/alphabeticalattributes.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/alphabeticalattributes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/inject_meta_charset.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/inject_meta_charset.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/lint.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/lint.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/optionaltags.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/optionaltags.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/sanitizer.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/sanitizer.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/whitespace.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/filters/whitespace.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/html5parser.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/html5parser.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/serializer.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/serializer.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treeadapters/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treeadapters/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treeadapters/genshi.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treeadapters/genshi.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treeadapters/sax.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treeadapters/sax.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/dom.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/dom.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/etree.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/etree.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/etree_lxml.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treebuilders/etree_lxml.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/dom.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/dom.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/etree.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/etree.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/etree_lxml.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/etree_lxml.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/genshi.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/html5lib/treewalkers/genshi.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/codec.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/codec.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/core.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/core.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/idnadata.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/idnadata.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/intranges.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/intranges.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/package_data.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/package_data.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/uts46data.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/idna/uts46data.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/_version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/_version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/exceptions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/exceptions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/ext.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/ext.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/fallback.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/msgpack/fallback.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/__about__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/__about__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/_manylinux.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/_manylinux.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/_musllinux.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/_musllinux.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/_structures.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/_structures.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/markers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/markers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/requirements.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/requirements.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/specifiers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/specifiers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/tags.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/tags.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/packaging/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/build.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/check.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/check.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/colorlog.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/colorlog.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/dirtools.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/dirtools.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/envbuild.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/envbuild.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/in_process/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/in_process/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/in_process/_in_process.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/in_process/_in_process.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/meta.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/meta.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/wrappers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pep517/wrappers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pkg_resources/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pkg_resources/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pkg_resources/py31compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pkg_resources/py31compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/bar.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/bar.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/counter.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/counter.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/spinner.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/progress/spinner.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/pyparsing.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/pyparsing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/__version__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/__version__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/_internal_utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/_internal_utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/adapters.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/adapters.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/api.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/api.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/auth.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/auth.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/certs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/certs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/cookies.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/cookies.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/exceptions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/exceptions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/help.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/help.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/hooks.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/hooks.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/models.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/models.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/packages.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/packages.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/sessions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/sessions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/status_codes.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/status_codes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/structures.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/structures.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/requests/utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/compat/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/compat/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/compat/collections_abc.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/compat/collections_abc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/providers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/providers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/reporters.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/reporters.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/resolvers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/resolvers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/structs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/resolvelib/structs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/six.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/six.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/_asyncio.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/_asyncio.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/_utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/_utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/after.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/after.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/before.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/before.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/before_sleep.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/before_sleep.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/nap.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/nap.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/retry.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/retry.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/stop.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/stop.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/tornadoweb.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/tornadoweb.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/wait.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tenacity/wait.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tomli/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tomli/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tomli/_parser.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tomli/_parser.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/tomli/_re.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/tomli/_re.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/_collections.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/_collections.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/_version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/_version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/connection.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/connection.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/connectionpool.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/connectionpool.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_appengine_environ.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_appengine_environ.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_securetransport/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_securetransport/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_securetransport/bindings.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_securetransport/bindings.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_securetransport/low_level.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/_securetransport/low_level.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/appengine.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/appengine.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/ntlmpool.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/ntlmpool.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/pyopenssl.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/pyopenssl.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/securetransport.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/securetransport.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/socks.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/contrib/socks.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/exceptions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/exceptions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/fields.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/fields.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/filepost.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/filepost.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/backports/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/backports/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/backports/makefile.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/backports/makefile.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/six.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/six.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/ssl_match_hostname/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/ssl_match_hostname/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/ssl_match_hostname/_implementation.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/packages/ssl_match_hostname/_implementation.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/poolmanager.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/poolmanager.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/request.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/request.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/response.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/response.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/connection.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/connection.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/proxy.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/proxy.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/queue.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/queue.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/request.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/request.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/response.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/response.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/retry.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/retry.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/ssl_.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/ssl_.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/ssltransport.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/ssltransport.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/timeout.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/timeout.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/url.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/url.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/wait.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/urllib3/util/wait.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/vendor.txt` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/vendor.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/labels.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/labels.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/mklabels.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/mklabels.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/tests.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/tests.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/x_user_defined.py` | `handoff/progress/venv/lib/python3.9/site-packages/pip/_vendor/webencodings/x_user_defined.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip/py.typed` | `handoff/progress/venv/lib/python3.9/site-packages/pip/py.typed` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/INSTALLER` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/INSTALLER` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/LICENSE.txt` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/LICENSE.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/METADATA` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/METADATA` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/RECORD` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/RECORD` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/REQUESTED` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/REQUESTED` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/WHEEL` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/WHEEL` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/entry_points.txt` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/entry_points.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/top_level.txt` | `handoff/progress/venv/lib/python3.9/site-packages/pip-21.2.4.dist-info/top_level.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/appdirs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/appdirs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/__about__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/__about__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/_compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/_compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/_structures.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/_structures.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/_typing.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/_typing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/markers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/markers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/requirements.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/requirements.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/specifiers.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/specifiers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/tags.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/tags.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/packaging/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/pyparsing.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/_vendor/pyparsing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/extern/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/extern/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pkg_resources/tests/data/my-test-package-source/setup.py` | `handoff/progress/venv/lib/python3.9/site-packages/pkg_resources/tests/data/my-test-package-source/setup.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_cmap.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_cmap.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/_codecs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/_codecs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/adobe_glyphs.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/adobe_glyphs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/core_font_metrics.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/core_font_metrics.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/pdfdoc.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/pdfdoc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/std.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/std.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/symbol.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/symbol.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_codecs/zapfding.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_codecs/zapfding.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_configuration.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_configuration.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_cryptography.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_cryptography.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_fallback.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_fallback.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_pycryptodome.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_crypt_providers/_pycryptodome.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_doc_common.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_doc_common.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_encryption.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_encryption.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_page.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_page.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_page_labels.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_page_labels.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_protocols.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_protocols.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_reader.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_reader.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/_fixed_width_page.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/_fixed_width_page.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/_text_state_manager.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/_text_state_manager.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/_text_state_params.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_layout_mode/_text_state_params.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_text_extractor.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_text_extraction/_text_extractor.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_version.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/_writer.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/_writer.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/actions/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/actions/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/actions/_actions.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/actions/_actions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/annotations/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/annotations/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/annotations/_base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/annotations/_base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/annotations/_markup_annotations.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/annotations/_markup_annotations.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/annotations/_non_markup_annotations.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/annotations/_non_markup_annotations.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/constants.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/constants.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/errors.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/errors.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/filters.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/filters.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_appearance_stream.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_appearance_stream.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_base.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_base.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_color.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_color.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_data_structures.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_data_structures.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_files.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_files.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_fit.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_fit.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_font.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_font.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_image_inline.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_image_inline.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_image_xobject.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_image_xobject.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_link.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_link.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_outline.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_outline.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_rectangle.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_rectangle.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/generic/_viewerpref.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/generic/_viewerpref.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/pagerange.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/pagerange.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/papersizes.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/papersizes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/py.typed` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/py.typed` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/types.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/types.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf/xmp.py` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf/xmp.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/INSTALLER` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/INSTALLER` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/METADATA` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/METADATA` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/RECORD` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/RECORD` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/REQUESTED` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/REQUESTED` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/WHEEL` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/WHEEL` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/licenses/LICENSE` | `handoff/progress/venv/lib/python3.9/site-packages/pypdf-6.21.4.dist-info/licenses/LICENSE` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_deprecation_warning.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_deprecation_warning.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/_msvccompiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/_msvccompiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/archive_util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/archive_util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/bcppcompiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/bcppcompiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/ccompiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/ccompiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/cmd.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/cmd.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_dumb.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_dumb.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_msi.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_msi.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_rpm.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_rpm.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_wininst.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/bdist_wininst.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_clib.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_clib.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_ext.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_ext.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_py.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_py.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_scripts.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/build_scripts.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/check.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/check.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/clean.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/clean.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/config.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/config.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_data.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_data.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_egg_info.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_egg_info.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_headers.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_headers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_lib.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_lib.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_scripts.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/install_scripts.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/py37compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/py37compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/register.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/register.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/sdist.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/sdist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/upload.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/command/upload.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/config.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/config.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/core.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/core.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/cygwinccompiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/cygwinccompiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/debug.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/debug.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/dep_util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/dep_util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/dir_util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/dir_util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/dist.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/dist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/errors.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/errors.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/extension.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/extension.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/fancy_getopt.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/fancy_getopt.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/file_util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/file_util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/filelist.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/filelist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/log.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/log.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/msvc9compiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/msvc9compiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/msvccompiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/msvccompiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/py35compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/py35compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/py38compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/py38compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/spawn.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/spawn.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/sysconfig.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/sysconfig.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/text_file.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/text_file.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/unixccompiler.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/unixccompiler.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_distutils/versionpredicate.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_distutils/versionpredicate.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_imp.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_imp.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/more_itertools/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/more_itertools/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/more_itertools/more.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/more_itertools/more.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/more_itertools/recipes.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/more_itertools/recipes.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/ordered_set.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/ordered_set.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/__about__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/__about__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/_compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/_compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/_structures.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/_structures.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/_typing.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/_typing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/markers.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/markers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/requirements.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/requirements.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/specifiers.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/specifiers.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/tags.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/tags.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/packaging/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/_vendor/pyparsing.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/_vendor/pyparsing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/archive_util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/archive_util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/build_meta.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/build_meta.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/cli-32.exe` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/cli-32.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/cli-64.exe` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/cli-64.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/cli.exe` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/cli.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/alias.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/alias.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/bdist_egg.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/bdist_egg.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/bdist_rpm.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/bdist_rpm.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/build_clib.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/build_clib.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/build_ext.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/build_ext.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/build_py.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/build_py.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/develop.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/develop.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/dist_info.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/dist_info.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/easy_install.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/easy_install.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/egg_info.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/egg_info.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/install.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/install.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/install_egg_info.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/install_egg_info.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/install_lib.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/install_lib.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/install_scripts.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/install_scripts.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/launcher manifest.xml` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/launcher manifest.xml` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/py36compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/py36compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/register.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/register.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/rotate.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/rotate.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/saveopts.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/saveopts.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/sdist.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/sdist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/setopt.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/setopt.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/test.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/test.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/upload.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/upload.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/command/upload_docs.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/command/upload_docs.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/config.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/config.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/dep_util.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/dep_util.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/depends.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/depends.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/dist.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/dist.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/errors.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/errors.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/extension.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/extension.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/extern/__init__.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/extern/__init__.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/glob.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/glob.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/gui-32.exe` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/gui-32.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/gui-64.exe` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/gui-64.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/gui.exe` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/gui.exe` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/installer.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/installer.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/launch.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/launch.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/monkey.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/monkey.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/msvc.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/msvc.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/namespaces.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/namespaces.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/package_index.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/package_index.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/py34compat.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/py34compat.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/sandbox.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/sandbox.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/script (dev).tmpl` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/script (dev).tmpl` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/script.tmpl` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/script.tmpl` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/unicode_utils.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/unicode_utils.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/version.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/version.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/wheel.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/wheel.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools/windows_support.py` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools/windows_support.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/INSTALLER` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/INSTALLER` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/LICENSE` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/LICENSE` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/METADATA` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/METADATA` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/RECORD` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/RECORD` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/REQUESTED` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/REQUESTED` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/WHEEL` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/WHEEL` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/entry_points.txt` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/entry_points.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/top_level.txt` | `handoff/progress/venv/lib/python3.9/site-packages/setuptools-58.0.4.dist-info/top_level.txt` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/INSTALLER` | `handoff/progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/INSTALLER` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/METADATA` | `handoff/progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/METADATA` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/RECORD` | `handoff/progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/RECORD` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/WHEEL` | `handoff/progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/WHEEL` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/licenses/LICENSE` | `handoff/progress/venv/lib/python3.9/site-packages/typing_extensions-4.16.0.dist-info/licenses/LICENSE` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/lib/python3.9/site-packages/typing_extensions.py` | `handoff/progress/venv/lib/python3.9/site-packages/typing_extensions.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/venv/pyvenv.cfg` | `handoff/progress/venv/pyvenv.cfg` | Yes |
| `/tmp/realestatebroker-v2-category-validation.log` | `handoff/progress/tmp-logs/realestatebroker-v2-category-validation.log` | Yes |
| `/tmp/realestatebroker-v2-check_answer_patterns.py.log` | `handoff/progress/tmp-logs/realestatebroker-v2-check_answer_patterns.py.log` | Yes |
| `/tmp/realestatebroker-v2-check_option_reuse.py.log` | `handoff/progress/tmp-logs/realestatebroker-v2-check_option_reuse.py.log` | Yes |
| `/tmp/realestatebroker-v2-finance-validation.log` | `handoff/progress/tmp-logs/realestatebroker-v2-finance-validation.log` | Yes |
| `/tmp/realestatebroker-v2-full-reuse.log` | `handoff/progress/tmp-logs/realestatebroker-v2-full-reuse.log` | Yes |
| `/tmp/realestatebroker-v2-full-validation.log` | `handoff/progress/tmp-logs/realestatebroker-v2-full-validation.log` | Yes |
| `/tmp/realestatebroker-v2-practice-reuse.log` | `handoff/progress/tmp-logs/realestatebroker-v2-practice-reuse.log` | Yes |
| `/tmp/realestatebroker-v2-practice-validation.log` | `handoff/progress/tmp-logs/realestatebroker-v2-practice-validation.log` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/.claude/skills/exam-bank/scripts/validate_bank.py` | `.claude/skills/exam-bank/scripts/validate_bank.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/CLAUDE.md` | `CLAUDE.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/globals.css` | `app/globals.css` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/components/TeachNudge.tsx` | `components/TeachNudge.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/components/exam/ExamClassFaq.tsx` | `components/exam/ExamClassFaq.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/i18n/en.ts` | `i18n/en.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/i18n/es.ts` | `i18n/es.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/i18n/ko.ts` | `i18n/ko.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/i18n/vi.ts` | `i18n/vi.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/i18n/zh.ts` | `i18n/zh.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/banks/all.ts` | `lib/banks/all.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/examBankSizes.json` | `lib/examBankSizes.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/examFacts.ts` | `lib/examFacts.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/examSources.json` | `lib/examSources.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/exams.ts` | `lib/exams.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/region.ts` | `lib/region.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/seoDates.ts` | `lib/seoDates.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/testCatalog.ts` | `lib/testCatalog.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/tigerAssets.ts` | `lib/tigerAssets.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/types/index.ts` | `types/index.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/epa-609-practice-test/page.tsx` | `app/epa-609-practice-test/page.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/epa609/dashboard/page.tsx` | `app/epa609/dashboard/page.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/epa609/drill/page.tsx` | `app/epa609/drill/page.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/epa609/layout.tsx` | `app/epa609/layout.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/epa609/page.tsx` | `app/epa609/page.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/app/epa609/stats/page.tsx` | `app/epa609/stats/page.tsx` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/data/epa609-questions.json` | `data/epa609-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/lib/banks/epa609.ts` | `lib/banks/epa609.ts` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/build.py` | `tools/next20/epa609/build.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/echo-audit.json` | `tools/next20/epa609/echo-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/fetch_sources.py` | `tools/next20/epa609/fetch_sources.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/inventory.py` | `tools/next20/epa609/inventory.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/items.py` | `tools/next20/epa609/items.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/landing.py` | `tools/next20/epa609/landing.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/more_items.py` | `tools/next20/epa609/more_items.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/objective-inventory.json` | `tools/next20/epa609/objective-inventory.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/questions.json` | `tools/next20/epa609/questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/review-handoff.md` | `tools/next20/epa609/review-handoff.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/sample-questions.json` | `tools/next20/epa609/sample-questions.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/sample-revision-notes.md` | `tools/next20/epa609/sample-revision-notes.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/sample-source-map.json` | `tools/next20/epa609/sample-source-map.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/source-map.json` | `tools/next20/epa609/source-map.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/sources.md` | `tools/next20/epa609/sources.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/spec.md` | `tools/next20/epa609/spec.md` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/theme-audit.json` | `tools/next20/epa609/theme-audit.json` | Yes |
| `/Users/johnbrophy/tigertest-next20-epa609/tools/next20/epa609/wire.py` | `tools/next20/epa609/wire.py` | Yes |
| `/Users/johnbrophy/tigertest-next20-progress/handoff-review-prompts.md` | `handoff/progress/handoff-review-prompts.md` | Yes |
