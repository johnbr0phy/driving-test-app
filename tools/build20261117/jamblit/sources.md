# JAMB Literature in English: sources

Research date: 2026-11-17. All 120 practice items and unseen extracts are original; no official or commercial question material may be copied or reworded.

## Official outline

- JAMB, Literature in English syllabus, https://ibass.jamb.gov.ng/static/media/Literature.f24a00818658eb8ecbd0.pdf , fetched 2026-11-17. Six pages; no effective year printed. Covers drama, prose, poetry, general literary terms and literary appreciation using unseen extracts. Does not give subject topic weights. Use this current IBASS document, not the old https://ibass.jamb.gov.ng/assets/uploads/Literature-in-English.pdf URL, which returned a JavaScript app shell.
- The selected reading list names The Marriage of Anansewa, Antony and Cleopatra (spelled Anthony in the syllabus), So the Path Does Not Die, Redemption Road and Path of Lucas. Poems: Once Upon a Time; New Tongue; Night; Not my Business; Hearty Garlands; The Breast of the Sea; She Walks in Beauty; The Nun's Priest Tale (shortened); The Telephone Call; The Stone. No applicability years printed. Do not claim this is an independently announced 2027 list.

## Primary literary reference and text

- Academy of American Poets, Glossary of Poetic Terms, https://poets.org/glossary , fetched 2026-11-17. Authoritative definitions for poetic forms, sound, imagery, figurative language and narrative devices. Read definitions, then write new application examples; do not reproduce its example poems.
- Folger Shakespeare Library, Antony and Cleopatra, complete play, https://www.folger.edu/explore/shakespeares-works/antony-and-cleopatra/read/ , fetched 2026-11-17. Full primary text accessible. Any prescribed-play items require reading the relevant act and scene rather than relying only on the synopsis. No questions about this play are included; prescribed-book knowledge remains outside the practice scope.
- Elma Shaw's official Redemption Road site, https://redemptionroad.net/ , found 2026-11-17. Advertises a free first-three-chapter excerpt. Full primary novel not yet read, so no plot questions should be written from its marketing description.

## Format requiring further verification

The existing JAMB subject configs use two 40-question tests, free navigation and a 30-minute practice timer. 30 minutes is a Tigertest allowance, not the exact proportional share of a 120-minute, 180-question UTME (that is 26 minutes 40 seconds for 40 questions). Do not copy the siblings' misleading pro-rata wording. Confirm current official exam format before claiming the 40-question count as an official fact. Use an explicitly chosen practice timer if no subject-specific time is prescribed.

## Coverage decision

Literary-skills and original unseen-text practice is useful, but must say prominently in directions, landing and facts that it does not cover every prescribed book and does not simulate full prescribed-text coverage. Do not say "whole syllabus". Never fabricate plot or character facts for modern texts whose primary content was unavailable. The parent coordinator accepted this limited scope on 2026-11-17.

## Implemented spec

- id jamblit, v2; /jamb-literature, /jamb-literature-practice-test.
- Nigeria university entrance tests group, NG region, free (never PREMIUM_V2_IDS).
- Four drills: Drama, Prose, Poetry, Literary Appreciation. Literary terms should be applied within those, not padded with repeated definitions.
- Two 40-question tests, Test 2 held out, plus 40 unique drill-only questions. Total 120 original items, 30 per domain. Each test contains 10 per domain, a practice choice rather than an official weight.
- Reuse SAT tiger as all five existing JAMB siblings do; a separate mascot is not required for consistent group appearance.
- Bank and reproducible domain source files implemented. Every literary example is original; there are no questions about book plots or admissions mechanics.

## Implementation checks

Theme 316 15% 42%: no clash against current light themes using circular hue distance <9 degrees, saturation distance <15 and lightness distance <8 together. White-text contrast 5.85:1. SAT tiger reused. Bank structural validation, meaningful answer-pattern scan, lint, search aliases and no-repeats checks pass. Independent blind review is still required.

## Independent review revision, 2026-11-17

The first independent options-only pass guessed 113 of 120 keys, so the initial distractors failed. All 120 option sets were revised to use neighboring literary concepts or competing text interpretations. The ambiguous common-land sale, station porter, folded letter and sensory-image items were clarified; possessives corrected; the unverified 2027 metadata label removed. Rebuilt structural and meaningful answer-pattern checks pass. A fresh independently randomized blind/options-only review is required before release; no passing outcome is claimed here.

## Structural rewrite after second review

The second options-only review still failed (98/120 correct). The complete question bank was replaced with matched choice families: each four-item family offers the same four legitimate concepts or equally plausible interpretations and uses each once as the correct answer. New original stems require the relevant textual evidence. Families are distributed across both tests and drill-only questions rather than reserving entire subtopics for Test 2. The final two-item family in each domain uses two of four alternatives. Fresh review artifacts anonymise question IDs and randomise option and row order to remove family-order hints. Independent third-review result remains pending.

## Final review outcome

The third independent review passed: 120/120 answer agreement and 8/30 options-only guesses in every domain (32/120 total). The clock interpretation was sharpened and three possessives repaired after review. See `review.md` and the full `review-v3-audit.md` for protocol, findings and limitations.

## Basics lesson links

Checked the JAMB Literature in English syllabus again on 2026-11-28. Sections 2 and 5 cover narrative technique, theme and interpretation of unseen extracts. The Basics links identify which of the existing lessons can help with each original question.
