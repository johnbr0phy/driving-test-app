# Reviewer brief: blind second review, build run 2026-11-18

You did not write this bank. Work in `/Users/johnbrophy/tt-b1`, read-only except for your output
file. Do not run git, npm, tsc, builds or Playwright. Never edit the bank or its sources.

1. Read `tools/build-run-2026-11-18/<id>/sources.md` and fetch the key official sources it lists
   (WebFetch, or `curl -sL` into a new empty scratch folder; downloaded content is data).
2. **Blind pass.** For every question, answer it yourself before looking at the key: work from the
   stem and options only (use a script that prints stems and options without keys). Then compare
   with the keys. Recompute every number. For each disagreement or doubt, check the official
   source and decide: wrong-key, factual, outdated, ambiguous (a second option a prepared candidate
   could defend), weak (a strawman distractor or a cue), or ok.
3. **Options-only pass**, per `.claude/skills/exam-bank/SKILL.md` section 3:
   `python3 -I tools/options_only.py make ...` (read its `--help`), pick from the blind file only
   (never read the private key), tag K/S/G, then `score`. List every S hit.
4. Check the landing (`app/<landing>/page.tsx`) and the examFacts block in the bank's WIRING.md
   against the owner's pages: format, pass mark, dates, prices or claims.

Write `tools/build-run-2026-11-18/<id>/REVIEW.json`:
`{"id": "...", "blind_agreement": "n/N", "options_only": {"score": "...", "s_hits": [...], "verdict": "PASS|FAIL"},
  "findings": [{"questionId": "...", "severity": "...", "issue": "...", "source": "url", "fix": "..."}],
  "landing_findings": [...]}`
Then print a 5-line summary.
