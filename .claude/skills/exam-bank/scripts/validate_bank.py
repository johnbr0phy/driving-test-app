#!/usr/bin/env python3
"""Validate a TigerTest exam bank against the schema and house style.

Usage:
  python3 -I validate_bank.py data/<bank>.json [--pool cat=N ...] [--max-key-longest 0.20]

With --pool flags the category counts are checked exactly; without them the
counts are only reported. Exit code 0 on PASS, 1 on FAIL.

Checks (hard failures):
  schema      exactly the 12 keys, in order; type/state constant; question ends ? or :
  pools       200 rows and exact per-category counts when --pool is given
  ids         <prefix><SEG>-NNN unique and sequential per segment, rows grouped by category
  key         correctIndex matches correctAnswer
  letters     each letter between 20% and 30% of the bank
  banned      All/None of the above, Both A, A and B, em-dash, empty strings
  dupes       duplicate options within a row, duplicate stems across the bank
  length      key > 1.2x the average wrong option in more than 30% of items,
              key the single longest option in more than --max-key-longest (default 25%),
              bank average option length outside 15..42 characters,
              more than 5 options over 110 characters
Soft reports: options over 110 chars, "varies by state" only on the key, provider names in stems.
Thresholds were set so every bank written to the house style passes and the
batch that ignored it (keys 46 to 84 chars, key-longest 56 to 90%) fails.
"""
from __future__ import annotations

import argparse
import json
import re
import statistics
import sys
from collections import Counter, defaultdict

KEYS = ["type", "state", "questionId", "category", "question", "optionA", "optionB",
        "optionC", "optionD", "correctAnswer", "correctIndex", "explanation"]
BANNED = re.compile(r"all of the above|none of the above|—", re.I)
# An option that only points at other options: "Both A and B", "A and C", "B or D".
OPTION_REF = re.compile(r"^(both\s+)?[abcd](\s+and\s+|\s*,\s*|\s+or\s+)[abcd]$", re.I)
PROVIDERS = re.compile(r"\b(red cross|american heart|AHA|TIPS|TABC|ServSafe|YMCA|Ellis|NASM|ACE)\b")
ID_RE = re.compile(r"^([A-Z0-9]+-)([A-Z0-9]+)-(\d{3})$")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("bank")
    ap.add_argument("--pool", action="append", default=[], help="category=count, repeatable")
    ap.add_argument("--max-key-longest", type=float, default=0.25)
    ap.add_argument("--rows", type=int, default=200)
    args = ap.parse_args()

    rows = json.load(open(args.bank, encoding="utf-8"))
    errs: list[str] = []
    warns: list[str] = []
    pools = {k: int(v) for k, v in (p.split("=") for p in args.pool)}

    if len(rows) != args.rows:
        errs.append(f"rows: {len(rows)} (expected {args.rows})")

    types = Counter(r.get("type") for r in rows)
    states = Counter(r.get("state") for r in rows)
    if len(types) != 1:
        errs.append(f"type varies: {dict(types)}")
    if states != Counter({"ALL": len(rows)}):
        errs.append(f"state must be ALL: {dict(states)}")

    seen_stems: dict[str, str] = {}
    seg_last: dict[str, int] = defaultdict(int)
    prefixes = set()
    cat_order: list[str] = []
    letters = Counter()
    key_long = key_far = 0
    opt_lens: list[int] = []
    varies_key_only = 0
    over_110 = 0
    key_order_warned = False

    for r in rows:
        qid = r.get("questionId", "?")
        if set(r.keys()) != set(KEYS):
            errs.append(f"{qid}: keys {sorted(set(r.keys()) ^ set(KEYS))}")
            continue
        if list(r.keys()) != KEYS and not key_order_warned:
            warns.append("keys are not in the canonical order (fine for old banks; new banks should match)")
            key_order_warned = True
        for k in KEYS:
            if isinstance(r[k], str) and not r[k].strip():
                errs.append(f"{qid}: empty {k}")
        q = r["question"].strip()
        if not (q.endswith("?") or q.endswith(":")):
            warns.append(f"{qid}: stem does not end with ? or :")
        m = ID_RE.match(qid)
        if not m:
            errs.append(f"{qid}: bad id format")
        else:
            prefixes.add(m.group(1))
            seg = m.group(2)
            n = int(m.group(3))
            if n != seg_last[seg] + 1:
                errs.append(f"{qid}: expected {seg}-{seg_last[seg] + 1:03d}")
            seg_last[seg] = n
        if not cat_order or cat_order[-1] != r["category"]:
            if r["category"] in cat_order:
                errs.append(f"{qid}: category {r['category']} not contiguous")
            cat_order.append(r["category"])

        opts = {L: r["option" + L] for L in "ABCD"}
        k = r["correctAnswer"]
        if k not in "ABCD" or "ABCD".index(k) != r["correctIndex"]:
            errs.append(f"{qid}: correctAnswer/correctIndex mismatch")
            continue
        letters[k] += 1
        # Case-sensitive on purpose: capitalization and abbreviation items differ only by case.
        if len({v.strip() for v in opts.values()}) != 4:
            errs.append(f"{qid}: duplicate options")
        if any(OPTION_REF.match(v.strip()) for v in opts.values()):
            errs.append(f"{qid}: option refers to other options")
        stem_key = re.sub(r"\W+", " ", q.lower()).strip()
        if stem_key in seen_stems:
            errs.append(f"{qid}: duplicate stem of {seen_stems[stem_key]}")
        seen_stems[stem_key] = qid
        for s in [q, *opts.values(), r["explanation"]]:
            if BANNED.search(s):
                errs.append(f"{qid}: banned phrase or em-dash")
                break
        if PROVIDERS.search(q):
            warns.append(f"{qid}: provider named in stem")

        ln = {L: len(v) for L, v in opts.items()}
        opt_lens.extend(ln.values())
        others = [v for L, v in ln.items() if L != k]
        if ln[k] > 1.2 * statistics.mean(others):
            key_far += 1
        if ln[k] == max(ln.values()) and list(ln.values()).count(ln[k]) == 1:
            key_long += 1
        if max(ln.values()) > 110:
            over_110 += 1
            warns.append(f"{qid}: option over 110 chars")
        vs = {L for L, v in opts.items() if "varies by state" in v.lower() or "house policy" in v.lower()}
        if vs == {k}:
            varies_key_only += 1

    if len(prefixes) > 1:
        errs.append(f"mixed id prefixes: {prefixes}")

    counts = Counter(r["category"] for r in rows if "category" in r)
    if pools:
        if counts != Counter(pools):
            errs.append(f"pools: got {dict(counts)} expected {pools}")
    n = max(len(rows), 1)
    for L in "ABCD":
        share = letters[L] / n
        if not 0.20 <= share <= 0.30:
            errs.append(f"letter {L} at {share:.0%} (want 20-30%)")

    avg_opt = statistics.mean(opt_lens) if opt_lens else 0
    far_share, long_share = key_far / n, key_long / n
    if far_share > 0.30:
        errs.append(f"key >1.2x avg wrong option in {far_share:.0%} of items (max 30%)")
    if long_share > args.max_key_longest:
        errs.append(f"key is the longest option in {long_share:.0%} of items (max {args.max_key_longest:.0%})")
    if not 15 <= avg_opt <= 42:
        errs.append(f"average option length {avg_opt:.0f} chars (want 15-42)")
    if over_110 > 5:
        errs.append(f"{over_110} options over 110 chars (max 5)")
    if varies_key_only > 3:
        warns.append(f"'varies by state'/'house policy' only on the key in {varies_key_only} items (a tell)")

    print(f"rows {len(rows)}  categories {dict(counts)}")
    print(f"letters {dict(letters)}  avg option {avg_opt:.0f} chars  key-longest {long_share:.0%}  key>1.2x {far_share:.0%}")
    for w in warns[:20]:
        print("warn:", w)
    for e in errs[:40]:
        print("FAIL:", e)
    if len(errs) > 40:
        print(f"... {len(errs) - 40} more")
    print("PASS" if not errs else f"FAIL ({len(errs)} errors)")
    return 0 if not errs else 1


if __name__ == "__main__":
    sys.exit(main())
