# Sequential independent review protocol
1. Builder finishes and is idle before independent reviewer starts.
2. Generate options-only JSON outside checkout with questionId, category, optionA..D, excluding stems, key and explanation.
3. Reviewer sees only this file initially; picks test-wise most likely answers, explains cues, saves answers. It must not inspect source-bank Python/JSON, keys, explanations or previously-written review.
4. After options-only answers locked, supply question stems plus options, still no keys/explanations. Reviewer answers EVERY question independently, recomputes numerical results, notes ambiguity and verifies substantive primary sources.
5. Score both reviews against bank. Any options-only category >40% requires investigation and rewrites; full-bank pedagogical review catches repeated principles, stem echo and implausible distractors beyond scripts.
6. Supply explanations/key after blind answers locked; reviewer checks every explanation, each finding and real-exam scope/format claims. For French/German review idiomatic language and disclose model review, never claim human native review.
7. Fix source files, rebuild and revalidate; reviewer checks all changes and unresolved findings.
8. Record review in tools/queue/reviews.json with real PR number. Final head must have successful CI and READY preview, route checks and four inspected screenshot files. Never merge.
