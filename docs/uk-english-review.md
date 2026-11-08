# UK English review

Reviewed all 25 UK exams on 8 November 2026: 16 registry exams and nine sectioned exams, with 5,191 questions in total. The country mapping in `lib/region.ts` is the source of the review inventory.

## Changes

- UK exam routes use British English even when the visitor previously selected the US. US exam routes keep American English. Shared pages follow the selected country, including a country-cookie fallback.
- British overrides cover landing buttons, class FAQs and their structured data, training and result prompts, sharing, settings, and teacher pages. The noun “practice” remains unchanged.
- Shared introductory lessons used by KS2 and GCSE maths have British views: HCF, gradient, factorising, BIDMAS and British spelling. IDs, answer keys, numerical values and unit conversions are unchanged. The original US lessons are not modified.
- The UK 18th Edition bank and its generator now use “harmonised”.
- UK attempt dates use British day-before-month order.

Official names, code, computing “program”, the verb “license”, measurement-device “meter”, medical “rigors”, and IUPAC “sulfur” are not spelling mistakes and were preserved where applicable. British alternatives such as “learned” are not indiscriminately replaced.

## Coverage

`scripts/uk-pages-manifest.cjs` derives the complete route matrix from both exam registries: 668 cases covering the UK homepage, two shared pages, 25 landings, 25 root redirects, 25 dashboards, 25 stats pages, 90 tests, 90 empty-result routes, 121 practice routes, 52 exam-level practice variants, 126 basic-skill variants, 16 empty drills and 70 filtered drills. No current UK v1 set has split parts.

All 668 production HTTP requests succeeded, and all 25 root redirects led to the correct dashboard. Hydrated production checks covered every UK dashboard, the UK homepage, the teacher page and the first UK driving practice question. These are baseline checks against production, not proof that this branch is deployed.

Regression coverage:

- `tests/uk-english-ui.test.cjs`: route precedence, US preservation, translations, prompts and class FAQs.
- `tests/uk-landing-english.test.cjs`: all UK landing copy, configurations, exam facts and catalogue entries.
- `tests/uk-basics.test.cjs`: UK banks, localised lessons, unchanged answer/progress invariants and US originals.
- `tests/uk-pages.test.cjs`: inventory completeness, route handlers and exam resolution.

Run the read-only HTTP sweep against a preview or local server:

```sh
UK_HTTP_WORKERS=1 node scripts/uk-pages-http.cjs http://127.0.0.1:3100 /tmp/uk-http.json
```

HTTP success does not verify hydration or completed-result states. Production checks did not create accounts, submit tests, create classes or make payments. A wider browser sweep encountered a browser-tool timeout; its unreturned results are not counted. Patched-preview browser verification remains a separate release check.
