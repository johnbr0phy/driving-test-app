# Drive the Question: the picks

**Data status: verified by data for universal questions.** Miss rates come from real answers, read on 2026-11-11 from the public, read-only `/api/community-stats` endpoint (the nightly `globalStats/wrongQuestions` aggregate, 5,505 accounts). Two limits: the aggregate holds only the 50 universal questions with the most wrong answers, and state-specific questions have no public counts. So the ranking below is over those 50 questions. State-specific records (the parking distances by state) are picked from question content and are **unverified by data**.

## Method

1. Miss rate = wrong / total per question. All 50 questions have 1,883 or more answers, well over the 200 floor.
2. Clustering rule: questions join one rule only when they test the same fact from the same source rule (the pennant and the solid yellow line are both the no-passing zone; flashing red and flashing yellow are one signal rule; crosswalk and hydrant are one parking statute). Signs that are merely similar stay separate.
3. Score = miss rate x total answers x states. Every universal question is asked in all 51 jurisdictions, so states is 51 for every row and the score is 51 x wrong answers.
4. Stageable = a driver decision in a scene can express the answer. Naming a shape, a colour or what a sign looks like is not.

## Top 20 rules

| # | Rule | Questions | Miss rate | Answers | Wrong | States | Score | Stageable | Driver decision |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Sign shapes and colours (pentagon, yield colours, orange, blue, white, yellow, green, brown, octagon) | U-005, U-003, U-008, U-013, U-011, U-002, U-006, U-014, U-001 | 28% | 39,346 | 11,123 | 51 | 567,273 | no | naming a shape or colour is not a driving decision |
| 2 | What a sign looks like (stop ahead, no U-turn, crosswalk, one way) | U-042, U-026, U-027, U-034 | 37% | 13,566 | 5,008 | 51 | 255,408 | no | recognition only |
| 3 | No-passing zone: pennant sign, solid yellow line | U-012, U-056 | 46% | 7,428 | 3,422 | 51 | 174,522 | yes | stay behind or pass |
| 4 | Double arrow sign | U-019 | 58% | 5,409 | 3,131 | 51 | 159,681 | yes | which side of an island |
| 5 | Bump / rough road warning sign | U-025 | 49% | 4,491 | 2,204 | 51 | 112,404 | yes | pick a speed |
| 6 | Flashing red and flashing yellow signals | U-009, U-010 | 26% | 8,339 | 2,198 | 51 | 112,098 | yes | stop, or go with caution |
| 7 | Parking clearance: crosswalk and fire hydrant | U-080, U-079 | 43% | 4,761 | 2,065 | 51 | 105,315 | yes | pick a distance |
| 8 | Right turn on red, No Turn On Red sign | U-050, U-068 | 41% | 4,687 | 1,915 | 51 | 97,665 | yes | stop, wait or turn |
| 9 | Curve and winding road signs | U-015, U-040 | 26% | 6,814 | 1,795 | 51 | 91,545 | yes | pick a speed |
| 10 | Red circle with a slash | U-007 | 33% | 4,425 | 1,469 | 51 | 74,919 | no | abstract symbol, no single action |
| 11 | Merge sign | U-017 | 34% | 4,033 | 1,383 | 51 | 70,533 | yes | make room, adjust speed |
| 12 | Four-way stop right of way | U-051, U-052 | 27% | 4,104 | 1,122 | 51 | 57,222 | yes | go or yield |
| 13 | School bus with flashing red lights | U-055 | 44% | 2,486 | 1,104 | 51 | 56,304 | yes | stop or pass |
| 14 | Crossing a double yellow line to turn | U-057 | 44% | 2,487 | 1,101 | 51 | 56,151 | yes | turn or wait |
| 15 | Bike route sign | U-028 | 32% | 3,454 | 1,099 | 51 | 56,049 | no | recognition only |
| 16 | Solid white line between lanes | U-059 | 43% | 2,362 | 1,004 | 51 | 51,204 | yes | change lane or stay |
| 17 | Parking uphill with a curb | U-077 | 37% | 2,160 | 791 | 51 | 40,341 | yes | which way to turn the wheels |
| 18 | Bike lane sign | U-049 | 34% | 2,278 | 785 | 51 | 40,035 | partly | lane use |
| 19 | Keep right sign | U-037 | 25% | 3,057 | 762 | 51 | 38,862 | yes | which side of a divider |
| 20 | Railroad crossbuck | U-039 | 24% | 3,040 | 730 | 51 | 37,230 | yes | yield to trains |

## The 5 picks

The top five stageable rules, in score order:

| Pick | Rule | Slug | Lead question | Why it stages well |
|---|---|---|---|---|
| 1 | No-passing zone | `no-passing-zone` | U-012 (53% miss), with U-056 | A slow truck and a hill make "pass or stay" a real temptation, and the oncoming car shows why the zone exists. |
| 2 | Double arrow sign | `double-arrow` | U-019 (58% miss, the most-missed common question) | People read it as "keep right" or "lane ends". Holding your lane past an island is the whole answer. |
| 3 | Bump warning sign | `rough-road` | U-025 (49% miss) | The answer is a speed, and the car's behaviour over the patch shows the difference at once. |
| 4 | Flashing signals | `flashing-signals` | U-009 (30%), U-010 (23%) | Two junctions back to back: full stop at red, no stop at yellow. People miss it both ways. |
| 5 | Parking clearance | `parking-clearance` | U-080 (46%), U-079 (40%) | The answer is a distance, it is state data, and the hidden pedestrian shows why the rule exists. |

Next in line, not built: right turn on red (97,665), curve signs (91,545), merge sign (70,533). The school bus rule, the example in the brief, ranks 13th (56,304).

**A judgement call to know about.** With a looser clustering, "every curve sign" (curve, winding road, chevron, advisory speed: U-015, U-040, U-044, U-033) would total 3,023 wrong answers and rank above picks 3, 4 and 5. I kept those four signs apart because they have four different meanings. It is first in DRIVE-NEXT.md.

## Rule verification

Each record was checked against the official source, not against the question bank. A subagent with web access read the sources on 2026-11-11; I then wrote each record from its findings. "Official" means I have a quote from the government's own page or PDF.

| Record | Rule as shipped | Source | How verified |
|---|---|---|---|
| U-012 no-passing zone | Pennant on the left marks the start of a no-passing zone; solid yellow on your side means no passing | MUTCD 11th Ed. Section 2C.53 and 3B.01 | Official FHWA PDF. Quote: "shall be installed on the left-hand side of the roadway at the beginning of no-passing zones". 3B.01: passing "is prohibited for traffic traveling adjacent to the solid line". |
| U-019 double arrow | Traffic may pass on either side of the island | MUTCD 11th Ed. Section 2C.23 | Official FHWA PDF. Quote: "traffic is permitted to pass on either side of an island, obstruction, or gore in the roadway". |
| U-025 bump sign | Uneven surface ahead, slow down before it | MUTCD 11th Ed. Section 2C.26, 2C.30 | Official FHWA PDF for the sign meanings. The "slow down" instruction is the general purpose of warning signs; no handbook sentence for BUMP was found (Florida's handbook says "Go slowly" for DIP). See the note below. |
| U-009 flashing signals | Flashing red: full stop, then go when safe. Flashing yellow: slow, proceed with caution, no stop | MUTCD 11th Ed. Section 4A.04; California Driver's Handbook | Official. California: "A flashing red signal light means STOP. After stopping, you may go when it is safe." and "PROCEED WITH CAUTION. Slow down and be alert. You do not need to stop." New York and Texas handbooks agree. |
| U-080 crosswalk, 20 ft | No parking within 20 ft of a crosswalk at an intersection | Uniform Vehicle Code 11-1003(a)2.C | Hosted copy of the NCUTLO text (secondary host), confirmed by the official California handbook and four state statutes below. |
| U-079 hydrant, 15 ft | No parking within 15 ft of a fire hydrant | Uniform Vehicle Code 11-1003(a)2.B | Same, confirmed by California, Texas, Louisiana, New Hampshire, South Carolina. |
| TX-037 | 20 ft crosswalk | Texas Driver Handbook DL-7; Transp. Code 545.302 | Official handbook PDF: "Within 20 feet of a crosswalk at an intersection". |
| LA-028, LA-027 | 20 ft crosswalk, 15 ft hydrant | La. RS 32:143(A)(6), (4) | Official legislature page, both quoted. |
| NH-032, NH-031 | 20 ft crosswalk, 15 ft hydrant | NH RSA 265:69 II(c), (b) | Official General Court page, both quoted. |
| SC-030, SC-029 | 20 ft crosswalk, 15 ft hydrant | S.C. Code 56-5-2530(A)(2)(c), (b) | Official legislature page, both quoted. |
| OR-033 | 10 ft hydrant | ORS 811.550(16) | Official legislature page: "Within 10 feet of a fire hydrant." |

### Held back because verification fell short

- **Wisconsin (WI-038, 15 ft crosswalk)** and **Massachusetts (MA-029, 10 ft hydrant)** have bank questions on this rule and the numbers match what I found, but only in search snippets and a secondary copy: the official Wisconsin statute page returned errors and mass.gov refused the request. Since a wrong rule is a release blocker, neither has a record. `?state=WI` and `?state=MA` play the universal scene, whose rule text says some states differ. Adding them is one JSON file each once someone reads the official page.

### Two things the check turned up

- **The bump sign has no picture.** The bank question says "a sign with bumps", but the MUTCD gives BUMP, DIP and ROUGH ROAD word legends only. The scene shows a yellow diamond reading BUMP, not an invented symbol. The bank question itself (U-025) may deserve a rewording; I did not change it.
- **A single solid yellow center line** is not a standard marking on a two-way road (MUTCD 3B.01). The scene uses the standard double solid line. U-056 ("What does a solid yellow center line mean?") is covered by the scene but could also use a rewording. Not changed here.
