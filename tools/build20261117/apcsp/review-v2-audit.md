# Independent complete AP CSP review v2

Result: content/key gate passes. All 200 items independently answered before keys were opened; all 200 agree exactly with the stored keys. All select-two answers were scored by exact set equality. No category exceeded the specified 40% options-only threshold.

## Blind procedure

Read only options-only.json first and committed 200 zero-based guesses with cues to options-guesses.json. Then read blind.json in its separately shuffled order and committed all 200 answers and reasoning to answers.json. Only after both prediction files existed did I open keys-private.json and id-map-private.json. No old review, source bank, app edits, or build was used. Predictions were not revised after scoring.

## Category counts

| Category | Items | Options-only exact | Full-content exact | >40% cue flag |
|---|---:|---:|---:|---|
| apcspAlgorithms | 64 | 20/64 (31.25%) | 64/64 (100%) | No |
| apcspCreative | 24 | 7/24 (29.17%) | 24/24 (100%) | No |
| apcspData | 40 | 11/40 (27.50%) | 40/40 (100%) | No |
| apcspImpact | 46 | 13/46 (28.26%) | 46/46 (100%) | No |
| apcspNetworks | 26 | 8/26 (30.77%) | 26/26 (100%) | No |
| Total | 200 | 59/200 (29.5%) | 200/200 (100%) | No |

## Findings

No incorrect key, unresolved factual error, duplicate valid answer, or missing correct option was found across the 200 items. Numerical and pseudocode traces are recorded in the ledger below. The set has 184 single-answer items and 16 select-two items.

Options-only alternatives are generally parallel labels. Topic-salience guesses and numerical guesses did not exceed 40% in any category; there is no triggered concrete cue requiring repair. The 29.5% aggregate is descriptive, not proof that every possible cue is absent.

Nonblocking improvement: many concept questions reuse exactly the same four labels across different stems. For example APCSP-CREATIVE-001 through -004 use the same development-activity set; APCSP-DATA-025 through -028 use the same four process labels. This supports contrast practice but can make the bank feel repetitive. Future expansion could add richer application scenarios with fresh distractors; no change is needed to resolve a wrong answer in this reviewed snapshot.

## Complete item ledger

All indices below are zero-based. O = options-only guess; A = independent full-content answer; K = stored key. Full-content agreement is exact for every row.

| Real ID | O | A | K | Independent reasoning / calculation |
|---|---|---|---|---|
| APCSP-ALGORITHMS-001 | 2 | 3 | 3 | y copies 7; changing x does not change y. |
| APCSP-ALGORITHMS-002 | 1 | 0 | 0 | a becomes 9; then b becomes 9. |
| APCSP-ALGORITHMS-003 | 3 | 2 | 2 | 18=3*5+3. |
| APCSP-ALGORITHMS-004 | 2 | 3 | 3 | 5+(3*4)=17. |
| APCSP-ALGORITHMS-005 | 2 | 1 | 1 | Only16 lies in inclusive13..17. |
| APCSP-ALGORITHMS-006 | 0 | 1 | 1 | false OR true=true; NOT true=false. |
| APCSP-ALGORITHMS-007 | 0 | 3 | 3 | 8>3 and 3>0 are both true; others false. |
| APCSP-ALGORITHMS-008 | 1 | 1 | 1 | 10 - 2 - 3 = 5. |
| APCSP-ALGORITHMS-009 | 2 | 3 | 3 | 6>4; result7. |
| APCSP-ALGORITHMS-010 | 1 | 3 | 3 | 3->6->12->24. |
| APCSP-ALGORITHMS-011 | 2 | 0 | 0 | 4+1+6=11. |
| APCSP-ALGORITHMS-012 | 1 | 3 | 3 | 1 -> 3 -> 5 -> 7 -> 9, stop at 9. |
| APCSP-ALGORITHMS-013 | 2 | 1 | 1 | Positive values5,1:count2. |
| APCSP-ALGORITHMS-014 | 3 | 1 | 1 | Removal yields [11,33,44]; index2=33. |
| APCSP-ALGORITHMS-015 | 1 | 1 | 1 | 14+4=18. |
| APCSP-ALGORITHMS-016 | 3 | 3 | 3 | Only (8,3) has first greater than second. |
| APCSP-ALGORITHMS-017 | 2 | 0 | 0 | 7 or8:2/8=1/4. |
| APCSP-ALGORITHMS-018 | 1 | 1 | 1 | Ranges 127,63,31,15,7,3,1: seven comparisons. |
| APCSP-ALGORITHMS-019 | 3 | 3 | 3 | temp=2; p=5; q=2. |
| APCSP-ALGORITHMS-020 | 2 | 3 | 3 | y=13; x=26. |
| APCSP-ALGORITHMS-021 | 3 | 1 | 1 | 29 MOD 6=5; 5+2=7. |
| APCSP-ALGORITHMS-022 | 0 | 1 | 1 | OR false only for (false,false). |
| APCSP-ALGORITHMS-023 | 3 | 1 | 1 | NOT outside[2,9] means inside; only5. |
| APCSP-ALGORITHMS-024 | 1 | 1 | 1 | 2<3 sets4; next4>3 sets6. |
| APCSP-ALGORITHMS-025 | 3 | 3 | 3 | (12-4)*2=16. |
| APCSP-ALGORITHMS-026 | 2 | 2 | 2 | 1+2+3+4=10. |
| APCSP-ALGORITHMS-027 | 0 | 0 | 0 | 3*2=6. |
| APCSP-ALGORITHMS-028 | 1 | 1 | 1 | 20 ->17 ->14 ->11 ->8. |
| APCSP-ALGORITHMS-029 | 2 | 3 | 3 | Running maxima6,6,9,9; returns9. |
| APCSP-ALGORITHMS-030 | 1 | 1 | 1 | Insert before second yields [2,9,4,6]. |
| APCSP-ALGORITHMS-031 | 1 | 3 | 3 | 2<3 so early return 5. |
| APCSP-ALGORITHMS-032 | 0 | 0 | 0 | square(2)=4; square(4)=16. |
| APCSP-ALGORITHMS-033 | 0 | 0 | 0 | 0,1,2: 3 of 10 outcomes. |
| APCSP-ALGORITHMS-034 | 1 | 2 | 2 | Absent target requires all12 comparisons. |
| APCSP-ALGORITHMS-035 | 2 | 1 | 1 | Fixed work*n is linear. |
| APCSP-ALGORITHMS-036 | 3 | 1 | 1 | n*n=n^2. |
| APCSP-ALGORITHMS-037 | 3 | 0 | 0 | One access independent of n: constant. |
| APCSP-ALGORITHMS-038 | 1 | 1 | 1 | Stem directly describes Exponential growth. |
| APCSP-ALGORITHMS-039 | 2 | 2 | 2 | Stem directly describes A parameterized procedure. |
| APCSP-ALGORITHMS-040 | 0 | 3 | 3 | Stem directly describes A list of related values. |
| APCSP-ALGORITHMS-041 | 0 | 2 | 2 | Stem directly describes A Boolean condition. |
| APCSP-ALGORITHMS-042 | 3 | 2 | 2 | Stem directly describes A simplified simulation model. |
| APCSP-ALGORITHMS-043 | 2 | 2 | 2 | Stem directly describes An early-exit existence search. |
| APCSP-ALGORITHMS-044 | 1 | 2 | 2 | Stem directly describes A full match-counting traversal. |
| APCSP-ALGORITHMS-045 | 2 | 0 | 0 | Stem directly describes A running-minimum traversal. |
| APCSP-ALGORITHMS-046 | 0 | 1 | 1 | Stem directly describes An order-preserving filter. |
| APCSP-ALGORITHMS-047 | 1 | 1 | 1 | Stem directly describes The first list item. |
| APCSP-ALGORITHMS-048 | 0 | 3 | 3 | Stem directly describes Zero. |
| APCSP-ALGORITHMS-049 | 0 | 2 | 2 | Empty product identity1. |
| APCSP-ALGORITHMS-050 | 3 | 2 | 2 | Stem directly describes An empty list. |
| APCSP-ALGORITHMS-051 | 2 | 1 | 1 | Stem directly describes Binary search. |
| APCSP-ALGORITHMS-052 | 1 | 2 | 2 | Stem directly describes Linear search. |
| APCSP-ALGORITHMS-053 | 0 | 1 | 1 | Stem directly describes Exhaustive enumeration. |
| APCSP-ALGORITHMS-054 | 1 | 1 | 1 | Stem directly describes A nearest-neighbor heuristic. |
| APCSP-ALGORITHMS-055 | 1 | 1 | 1 | Stem directly describes An undecidable general problem. |
| APCSP-ALGORITHMS-056 | 0 | 2 | 2 | Stem directly describes An inefficient exact algorithm. |
| APCSP-ALGORITHMS-057 | 0 | 2 | 2 | Stem directly describes A randomized simulation. |
| APCSP-ALGORITHMS-058 | 3 | 2 | 2 | Stem directly describes A deterministic approximation. |
| APCSP-ALGORITHMS-059 | 1,3 | 2,3 | 2,3 | One-based two-item list indices1,2. |
| APCSP-ALGORITHMS-060 | 1,3 | 1,2 | 1,2 | Indices 4 and 5 are after 3. |
| APCSP-ALGORITHMS-061 | 0,2 | 0,2 | 0,2 | >=4 equals >4 OR =4 and NOT <4. |
| APCSP-ALGORITHMS-062 | 0,3 | 1,2 | 1,2 | At most 4 means <=4; NOT(x>4) and x<4 OR x=4. |
| APCSP-ALGORITHMS-063 | 0,1 | 1,3 | 1,3 | 8 fails divisibility; 12 true; 3 fails >5; 6 true. |
| APCSP-ALGORITHMS-064 | 0,2 | 2,3 | 2,3 | 12 false; 6 false; 8 true (remainder 2); 3 true (<=5). |
| APCSP-CREATIVE-001 | 1 | 1 | 1 | Stem directly describes Investigating user needs. |
| APCSP-CREATIVE-002 | 1 | 3 | 3 | Stem directly describes Testing implemented code. |
| APCSP-CREATIVE-003 | 0 | 1 | 1 | Stem directly describes Debugging observed faults. |
| APCSP-CREATIVE-004 | 3 | 0 | 0 | Stem directly describes Documenting program behavior. |
| APCSP-CREATIVE-005 | 1 | 1 | 1 | Stem directly describes The program purpose. |
| APCSP-CREATIVE-006 | 3 | 2 | 2 | Stem directly describes The execution sequence. |
| APCSP-CREATIVE-007 | 0 | 2 | 2 | Stem directly describes The input representation. |
| APCSP-CREATIVE-008 | 3 | 1 | 1 | Stem directly describes The test coverage. |
| APCSP-CREATIVE-009 | 0 | 0 | 0 | Stem directly describes A logic error. |
| APCSP-CREATIVE-010 | 3 | 2 | 2 | Stem directly describes A syntax error. |
| APCSP-CREATIVE-011 | 1 | 2 | 2 | Stem directly describes A division-by-zero error. |
| APCSP-CREATIVE-012 | 3 | 1 | 1 | Stem directly describes An overflow error. |
| APCSP-CREATIVE-013 | 0 | 0 | 0 | Stem directly describes An input value. |
| APCSP-CREATIVE-014 | 0 | 0 | 0 | Stem directly describes An output value. |
| APCSP-CREATIVE-015 | 0 | 2 | 2 | Stem directly describes An internal state value. |
| APCSP-CREATIVE-016 | 3 | 1 | 1 | Stem directly describes An input event. |
| APCSP-CREATIVE-017 | 3 | 3 | 3 | Stem directly describes A clickable interface prototype. |
| APCSP-CREATIVE-018 | 1 | 0 | 0 | Stem directly describes A table of expected test results. |
| APCSP-CREATIVE-019 | 0 | 1 | 1 | Stem directly describes A trace of changing variable values. |
| APCSP-CREATIVE-020 | 2 | 1 | 1 | Stem directly describes A procedure interface description. |
| APCSP-CREATIVE-021 | 3 | 1 | 1 | 12 should cost 4 but mistaken condition charges 7. |
| APCSP-CREATIVE-022 | 3 | 2 | 2 | [7,2,5] has minimum2 not first7. |
| APCSP-CREATIVE-023 | 0,3 | 0,3 | 0,3 | Stem directly describes A storyboard of user actions; A clickable screen prototype. |
| APCSP-CREATIVE-024 | 2,3 | 0,1 | 0,1 | Stem directly describes A table of route-search test outputs; A benchmark of route-search speed. |
| APCSP-DATA-001 | 1 | 1 | 1 | 16+4+2=22. |
| APCSP-DATA-002 | 2 | 1 | 1 | 2^5-1=31. |
| APCSP-DATA-003 | 0 | 2 | 2 | 32+8+4+1=45. |
| APCSP-DATA-004 | 1 | 0 | 0 | 2^4=16. |
| APCSP-DATA-005 | 1 | 3 | 3 | 2^2<5<=2^3; three bits. |
| APCSP-DATA-006 | 3 | 0 | 0 | 1111=15; +1=16=10000, five bits. |
| APCSP-DATA-007 | 3 | 3 | 3 | 2^5<40<=2^6; six bits. |
| APCSP-DATA-008 | 0 | 2 | 2 | One byte=8 bits. |
| APCSP-DATA-009 | 3 | 0 | 0 | 18*12/8=27 bytes. |
| APCSP-DATA-010 | 1 | 3 | 3 | 9*64/8=72 bytes. |
| APCSP-DATA-011 | 2 | 2 | 2 | 2400/4=600. |
| APCSP-DATA-012 | 2 | 0 | 0 | 1600*12/8=2400 bytes. |
| APCSP-DATA-013 | 2 | 2 | 2 | Stem directly describes Standardize measurement units. |
| APCSP-DATA-014 | 1 | 0 | 0 | Stem directly describes Remove duplicated observations. |
| APCSP-DATA-015 | 1 | 0 | 0 | Stem directly describes Join matching record identifiers. |
| APCSP-DATA-016 | 1 | 2 | 2 | Stem directly describes Filter records by a condition. |
| APCSP-DATA-017 | 1 | 2 | 2 | Stem directly describes A sampling imbalance. |
| APCSP-DATA-018 | 0 | 1 | 1 | Stem directly describes A unit mismatch. |
| APCSP-DATA-019 | 2 | 2 | 2 | Stem directly describes A date-format ambiguity. |
| APCSP-DATA-020 | 1 | 0 | 0 | Stem directly describes A rounding limitation. |
| APCSP-DATA-021 | 3 | 3 | 3 | Stem directly describes The number of distinct people. |
| APCSP-DATA-022 | 2 | 2 | 2 | Stem directly describes The total number of events. |
| APCSP-DATA-023 | 1 | 2 | 2 | Stem directly describes The mean value per event. |
| APCSP-DATA-024 | 0 | 3 | 3 | Stem directly describes The largest recorded value. |
| APCSP-DATA-025 | 2 | 2 | 2 | Stem directly describes Lossless data compression. |
| APCSP-DATA-026 | 2 | 0 | 0 | Stem directly describes Lossy data compression. |
| APCSP-DATA-027 | 0 | 1 | 1 | Stem directly describes Digital sampling. |
| APCSP-DATA-028 | 1 | 2 | 2 | Stem directly describes Metadata collection. |
| APCSP-DATA-029 | 1 | 1 | 1 | Stem directly describes Correlation between measurements. |
| APCSP-DATA-030 | 3 | 2 | 2 | Stem directly describes A causal effect of an intervention. |
| APCSP-DATA-031 | 1 | 3 | 3 | Stem directly describes A difference between group averages. |
| APCSP-DATA-032 | 2 | 0 | 0 | Stem directly describes A change in one series over time. |
| APCSP-DATA-033 | 1 | 3 | 3 | Stem directly describes A different encoding convention. |
| APCSP-DATA-034 | 1 | 2 | 2 | Stem directly describes A longer sampling interval. |
| APCSP-DATA-035 | 0 | 0 | 0 | Unsigned maximum reduces65535 to255. |
| APCSP-DATA-036 | 0 | 1 | 1 | Stem directly describes A compression overhead cost. |
| APCSP-DATA-037 | 0,3 | 0,3 | 0,3 | Distance divided by duration. |
| APCSP-DATA-038 | 1,3 | 0,2 | 0,2 | Year minus birth year, associated with driver identifier. |
| APCSP-DATA-039 | 0,2 | 1,3 | 1,3 | Stem directly describes Increase bits per sample; Increase samples per second. |
| APCSP-DATA-040 | 0,1 | 2,3 | 2,3 | Stem directly describes Reduce samples per second; Reduce bits per sample. |
| APCSP-IMPACT-001 | 0 | 1 | 1 | Stem directly describes Participation by the public. |
| APCSP-IMPACT-002 | 0 | 0 | 0 | Stem directly describes Unequal geographic coverage. |
| APCSP-IMPACT-003 | 1 | 1 | 1 | Stem directly describes Individual reidentification risk. |
| APCSP-IMPACT-004 | 1 | 3 | 3 | Stem directly describes Permission for content reuse. |
| APCSP-IMPACT-005 | 3 | 1 | 1 | Stem directly describes Connectivity needed to contribute. |
| APCSP-IMPACT-006 | 0 | 3 | 3 | Stem directly describes Information access without a personal device. |
| APCSP-IMPACT-007 | 0 | 0 | 0 | Stem directly describes Exposure of precise home locations. |
| APCSP-IMPACT-008 | 2 | 3 | 3 | Stem directly describes Coverage of classifier training examples. |
| APCSP-IMPACT-009 | 0 | 1 | 1 | Stem directly describes Collecting new observations. |
| APCSP-IMPACT-010 | 3 | 1 | 1 | Stem directly describes Publishing aggregated results. |
| APCSP-IMPACT-011 | 1 | 1 | 1 | Stem directly describes Checking license conditions. |
| APCSP-IMPACT-012 | 2 | 0 | 0 | Stem directly describes Restricting data access. |
| APCSP-IMPACT-013 | 1 | 1 | 1 | Stem directly describes Phishing. |
| APCSP-IMPACT-014 | 0 | 2 | 2 | Stem directly describes Software keylogging. |
| APCSP-IMPACT-015 | 1 | 0 | 0 | Stem directly describes A rogue access point. |
| APCSP-IMPACT-016 | 2 | 3 | 3 | Stem directly describes Credential reuse after a leak. |
| APCSP-IMPACT-017 | 3 | 3 | 3 | Stem directly describes Multifactor authentication. |
| APCSP-IMPACT-018 | 0 | 1 | 1 | Stem directly describes Encryption of stored records. |
| APCSP-IMPACT-019 | 1 | 0 | 0 | Stem directly describes Reduction of retained data. |
| APCSP-IMPACT-020 | 2 | 0 | 0 | Stem directly describes Verification through another channel. |
| APCSP-IMPACT-021 | 1 | 0 | 0 | Stem directly describes A digital access barrier. |
| APCSP-IMPACT-022 | 3 | 3 | 3 | Stem directly describes Bias inherited from data. |
| APCSP-IMPACT-023 | 3 | 0 | 0 | Stem directly describes Disclosure of personal routines. |
| APCSP-IMPACT-024 | 0 | 2 | 2 | Stem directly describes An intellectual-property restriction. |
| APCSP-IMPACT-025 | 2 | 3 | 3 | Stem directly describes Open-source software. |
| APCSP-IMPACT-026 | 3 | 3 | 3 | Stem directly describes A public-domain work. |
| APCSP-IMPACT-027 | 2 | 0 | 0 | Stem directly describes A licensed copyrighted work. |
| APCSP-IMPACT-028 | 2 | 0 | 0 | Stem directly describes An anonymously authored work. |
| APCSP-IMPACT-029 | 1 | 1 | 1 | Stem directly describes The recipient's public key. |
| APCSP-IMPACT-030 | 2 | 3 | 3 | Stem directly describes The recipient's private key. |
| APCSP-IMPACT-031 | 2 | 0 | 0 | Stem directly describes A shared symmetric secret. |
| APCSP-IMPACT-032 | 1 | 0 | 0 | Stem directly describes A certificate binding identity to a key. |
| APCSP-IMPACT-033 | 3 | 2 | 2 | Stem directly describes Crowdfunding. |
| APCSP-IMPACT-034 | 0 | 0 | 0 | Stem directly describes Citizen science. |
| APCSP-IMPACT-035 | 3 | 0 | 0 | Stem directly describes Open-data research. |
| APCSP-IMPACT-036 | 2 | 3 | 3 | Stem directly describes Collaborative software development. |
| APCSP-IMPACT-037 | 0 | 0 | 0 | Stem directly describes Uneven accuracy across groups. |
| APCSP-IMPACT-038 | 1 | 0 | 0 | Stem directly describes Narrower exposure to viewpoints. |
| APCSP-IMPACT-039 | 0 | 2 | 2 | Stem directly describes A shift in work tasks. |
| APCSP-IMPACT-040 | 3 | 0 | 0 | Stem directly describes Different costs for stakeholders. |
| APCSP-IMPACT-041 | 1 | 3 | 3 | Stem directly describes Broaden the participant sample. |
| APCSP-IMPACT-042 | 3 | 2 | 2 | Stem directly describes Minimize the requested permissions. |
| APCSP-IMPACT-043 | 1 | 3 | 3 | Stem directly describes Separate evaluation from training data. |
| APCSP-IMPACT-044 | 0 | 0 | 0 | Stem directly describes Compare error rates by group. |
| APCSP-IMPACT-045 | 2,3 | 2,3 | 2,3 | Stem directly describes An account email address; A persistent device identifier. |
| APCSP-IMPACT-046 | 0,1 | 2,3 | 2,3 | Stem directly describes A regionwide monthly rainfall mean; A citywide daily visit count. |
| APCSP-NETWORKS-001 | 3 | 3 | 3 | Stem directly describes DNS name resolution. |
| APCSP-NETWORKS-002 | 0 | 1 | 1 | Stem directly describes IP packet forwarding. |
| APCSP-NETWORKS-003 | 1 | 2 | 2 | Stem directly describes HTTP resource transfer. |
| APCSP-NETWORKS-004 | 1 | 3 | 3 | Stem directly describes TCP stream delivery. |
| APCSP-NETWORKS-005 | 3 | 2 | 2 | Stem directly describes Scalability. |
| APCSP-NETWORKS-006 | 2 | 2 | 2 | Stem directly describes Fault tolerance. |
| APCSP-NETWORKS-007 | 3 | 2 | 2 | Stem directly describes Data integrity. |
| APCSP-NETWORKS-008 | 0 | 1 | 1 | Stem directly describes Confidentiality. |
| APCSP-NETWORKS-009 | 2 | 2 | 2 | 48/12=4 seconds. |
| APCSP-NETWORKS-010 | 0 | 3 | 3 | max(3,5,8)=8 seconds. |
| APCSP-NETWORKS-011 | 2 | 0 | 0 | 4+max(6,6,6,6)=10. |
| APCSP-NETWORKS-012 | 3 | 2 | 2 | 9*8/24=3 seconds. |
| APCSP-NETWORKS-013 | 2 | 2 | 2 | Stem directly describes Destination addressing. |
| APCSP-NETWORKS-014 | 2 | 2 | 2 | Stem directly describes Packet sequence information. |
| APCSP-NETWORKS-015 | 3 | 1 | 1 | Stem directly describes Payload content. |
| APCSP-NETWORKS-016 | 3 | 1 | 1 | Stem directly describes Error-detection information. |
| APCSP-NETWORKS-017 | 0 | 0 | 0 | Stem directly describes Add an independent network path. |
| APCSP-NETWORKS-018 | 0 | 3 | 3 | Stem directly describes Increase the link bandwidth. |
| APCSP-NETWORKS-019 | 0 | 1 | 1 | Stem directly describes Split independent work across processors. |
| APCSP-NETWORKS-020 | 0 | 1 | 1 | Stem directly describes Use publicly specified protocol rules. |
| APCSP-NETWORKS-021 | 0 | 0 | 0 | Stem directly describes A single point of failure. |
| APCSP-NETWORKS-022 | 1 | 2 | 2 | Stem directly describes A redundant route. |
| APCSP-NETWORKS-023 | 3 | 0 | 0 | Stem directly describes A sequential dependency. |
| APCSP-NETWORKS-024 | 3 | 1 | 1 | Stem directly describes A distributed computation. |
| APCSP-NETWORKS-025 | 1,2 | 1,2 | 1,2 | Stem directly describes IP forwarding between networks; TCP ordered stream delivery. |
| APCSP-NETWORKS-026 | 1,3 | 0,2 | 0,2 | Stem directly describes HTTP requests for web resources; HTML links between web pages. |


Options-only cue notes for each of the 200 items are retained in options-guesses.json, joined through the blind IDs in id-map-private.json.
