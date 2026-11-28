# Review a question the way a learner sees it

## Write and shorten the item

Decide which subject fact separates the key from the strongest distractor. Write the shortest natural question that still tests that distinction. Keep the actor, jurisdiction, units, dates, delivery method, threshold or exception when changing one would change the answer. Move background and citations into the explanation unless interpreting a named rule is the task. Aim for a median of 12 to 18 words in each bank. A calculation may need several more words to give every input.

Read the stem aloud with each choice. A yes/no choice must answer the question in the same direction. A deadline has a trigger and may be a minimum, maximum or exact date. Someone who gives notice early can meet a minimum too. Ask, for example, "If an insurer delivers this notice in person, what minimum notice must it give?" Keep the jurisdiction and policy type in the learner's question. A shorter draft that changes "Does this law prohibit the ban?" to "Can the association impose the ban?" also reverses the answer.

Give each question its own three plausible mistakes. For calculations, use results from actual mistakes with the supplied figures. For a rule, try a neighboring deadline, a different actor or a requirement that applies under a different condition. Check that a knowledgeable learner could explain why each distractor is wrong here. A broker price opinion and a comparative market analysis can both describe a broker's price estimate in some states. Putting both in the choices makes the question ambiguous even when a reviewer picks the intended one. Prefer a competing method with a genuinely different meaning.

## Share questions across jurisdictions

Put a fact in the national bank only when its wording holds across the jurisdictions it serves. Check local exceptions in the current official text, down to the subsection and effective date. A shared dual-agency question can test whose informed consent is needed; the deadlines and procedures for documenting it belong in the state versions. Verify the explanation separately from the key. For deadlines, distinguish the date something happened from the date it was due.

Edit the source and regenerate. When changing a shared item, match its source ID and the wording being replaced so a reviewed state-specific version survives. Check the national fallback and each affected state. For a copy edit, compare IDs, jurisdiction, categories, keys, choices and question order before and after. A wrong key is a factual correction and should be identified as such.

## Review the built forms

1. Give an independent reviewer the final stem and shuffled options with the key and explanation hidden. Have them solve it, recalculate numbers, and flag a second defensible answer, a missing condition, or a clue even when they can identify the intended key. Separately compare the explanation with the checked source and the final options. Repeat the blind check on revised items.
2. Run the options-only review for length, tone, and generic or implausible alternatives. Then read the stem and options together. The correct choice can be the only one repeating the stem, or the second-longest choice can win repeatedly. Balanced answer letters cannot detect either problem.
3. Score the actual question lists served by the generator. Measure each full exam and each short form, including forms below the whole-bank checker's minimum size. Use the existing rank and echo scorers. No single length rank should score above 40%; for a fresh bank aim for 18 to 33% per rank. Aim for two or fewer extra marks per 50 from stem echo and stay below 4.5. Inspect each outlier and improve the wording. Check again after the final edit, including when only stems changed.
4. For the mixed state paths, run `node --test tests/state-practice-forms.test.cjs`. Each short form needs general and local questions, with topic and state-law counts balanced across forms. Together the short forms cover the approved full exam exactly once. The existing full exam is an intentional recap of this pool. For other generators, use their actual form builder and apply the same cue checks to the displayed choices.
5. Record how many distinct questions were blind-read, how many published variants changed, how many forms were scored, and any issues still open. These counts answer different questions. Record resolved baseline exceptions as removals.
