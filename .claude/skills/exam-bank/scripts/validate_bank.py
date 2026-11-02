#!/usr/bin/env python3
"""Validate a Tigertest exam bank against the schema and house style.

Usage:
  python3 -I validate_bank.py data/<bank>.json [--pool cat=N ...] [--max-key-longest 0.20]
                              [--lang de] [--len-scale 1.3]

--lang xx checks a bank written in (or translated into) another language: that
language's "all/none of the above" phrases and option-reference connectors are
banned too (the English ones stay banned). --len-scale multiplies the 12..42
average-option range and the 110-character limit, since the same idea takes
more characters in German than in English; it defaults per language (de 1.3,
nl 1.25, fr 1.2, pl 1.2, it 1.15, pt 1.15, es 1.15, tr 1.1, else 1.0).

With --pool flags the category counts are checked exactly; without them the
counts are only reported. Exit code 0 on PASS, 1 on FAIL.

Checks (hard failures):
  schema      exactly the 12 keys, in order; type/state constant; question ends ? or :
  pools       200 rows and exact per-category counts when --pool is given
  ids         <prefix><SEG>-NNN unique and sequential per segment, rows grouped by category
  key         correctIndex matches correctAnswer
  letters     each letter between 20% and 30% of the bank
  banned      All/None of the above, Both A, A and B, em-dash, empty strings
  meta        a stem about the test itself (how many questions, pass mark, time limit,
              languages, booking, retakes, how long a pass is valid, the question bank):
              no real test asks these, so they never belong in a bank
  dupes       duplicate options within a row, duplicate stems across the bank (a question shown
              with a sign image from lib/signImages.ts may share its stem: the image is the question)
  length      key > 1.2x the average wrong option in more than 30% of items,
              key the single longest option in more than --max-key-longest (default 25%),
              bank average option length outside 12..42 characters,
              more than 5 options over 110 characters (both scaled by --len-scale)
Soft reports: options over 110 chars, "varies by state" only on the key, provider names in stems.
Thresholds were set so every bank written to the house style passes and the
batch that ignored it (keys 46 to 84 chars, key-longest 56 to 90%) fails.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import statistics
import sys
from collections import Counter, defaultdict

KEYS = ["type", "state", "questionId", "category", "question", "optionA", "optionB",
        "optionC", "optionD", "correctAnswer", "correctIndex", "explanation"]
# Per language: "all/none of the above" phrases, the words that join two option
# letters ("A and B"), and the "both" word that can open such an option.
LANG_RULES = {
    "en": (r"all of the above|none of the above", ["and", "or"], ["both"]),
    "es": (r"todas las anteriores|ninguna de las anteriores", ["y", "o"], ["ambas", "ambos", "tanto"]),
    "de": (r"alle (antworten|genannten|oben genannten)|keine der (antworten|genannten)", ["und", "oder"], ["beide"]),
    "fr": (r"toutes les réponses|aucune (de ces|des) réponses|toutes les propositions", ["et", "ou"], ["les deux"]),
    "it": (r"tutte le precedenti|nessuna delle precedenti|tutte le risposte", ["e", "o"], ["entrambe", "entrambi"]),
    "pl": (r"wszystkie powyższe|żadna z powyższych|wszystkie odpowiedzi", ["i", "lub", "oraz"], ["obie", "oba"]),
    "nl": (r"alle bovenstaande|geen van de bovenstaande|alle antwoorden", ["en", "of"], ["beide"]),
    "pt": (r"todas as anteriores|nenhuma das anteriores|todas as respostas", ["e", "ou"], ["ambas", "ambos"]),
    "tr": (r"^hepsi$|^hiçbiri$|yukarıdakilerin hepsi", ["ve", "veya"], ["ikisi de"]),
    "id": (r"semua benar|semua jawaban benar|tidak ada yang benar", ["dan", "atau"], ["keduanya"]),
}
LEN_SCALE = {"de": 1.3, "nl": 1.25, "fr": 1.2, "pl": 1.2, "it": 1.15, "pt": 1.15, "es": 1.15, "tr": 1.1}


def banned_re(lang: str) -> re.Pattern:
    phrases = [LANG_RULES["en"][0]] + ([LANG_RULES[lang][0]] if lang != "en" else [])
    return re.compile("|".join(phrases) + "|—", re.I)


def option_ref_re(lang: str) -> re.Pattern:
    """An option that only points at other options: "Both A and B", "A und C", "B ou D"."""
    langs = ["en"] + ([lang] if lang != "en" else [])
    joins = sorted({j for L in langs for j in LANG_RULES[L][1]})
    boths = sorted({b for L in langs for b in LANG_RULES[L][2]})
    return re.compile(
        rf"^(({'|'.join(map(re.escape, boths))})\s+)?[abcd](\s+({'|'.join(joins)})\s+|\s*,\s*)[abcd]$", re.I
    )
# A question about the test itself rather than its subject. English stems only.
META = re.compile(
    r"how many (questions|wrong answers|mistakes|errors|correct answers)\b.{0,80}\b(test|exam)"
    r"|\b(test|exam)\b.{0,80}\bhow many (questions|wrong|mistakes|errors|correct)"
    r"|\bpass(ing)? (mark|score)\b.{0,80}\b(test|exam)|\b(test|exam)\b.{0,80}\bpass(ing)? (mark|score)"
    r"|\b(theory|knowledge|written|permit|citizenship|computer[- ]based|multiple[- ]choice)( \w+)? (test|exam)\b"
    r".{0,80}\b(questions|minutes|time limit|languages?|offered|valid|kept|wait|retake|resit|re-sit|again|book|"
    r"centre|center|cheat|attempt)"
    r"|\b(sit|book|take|taking|retake|fail|failed|pass|passed|passing) (the|a|your) (theory|knowledge|written|permit)"
    r"( \w+)? (test|exam)"
    r"|question bank|\bguides (say|describe|report)",
    re.I,
)
# Items that mention a test but are about the subject: licensing law the real exam does
# test (state producer and broker license law, the CDL hazmat threat assessment, FAA
# 14 CFR 61.39) and a logic puzzle that happens to be about a test.
META_OK = {"CDLE-HM-003", "LHNJ-NJLIC-004", "PCNJ-NJLIC-004", "REMI-MILIC-004", "FAAPVT-D-081", "PHCSE-T1-044"}
PROVIDERS = re.compile(r"\b(red cross|american heart|AHA|TIPS|TABC|ServSafe|YMCA|Ellis|NASM|ACE)\b")
ID_RE = re.compile(r"^([A-Z0-9]+-)([A-Z0-9]+)-(\d{3})$")
SIGN_MAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", "lib", "signImages.ts")


def sign_question_ids() -> set[str]:
    """questionIds that QuestionImage shows with a sign (keys of SIGN_BY_QUESTION_ID)."""
    try:
        src = open(SIGN_MAP, encoding="utf-8").read()
    except OSError:
        return set()
    block = src.split("SIGN_BY_QUESTION_ID", 1)[-1].split("};", 1)[0]
    return set(re.findall(r'^\s*"([^"]+)":', block, re.M))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("bank")
    ap.add_argument("--pool", action="append", default=[], help="category=count, repeatable")
    ap.add_argument("--max-key-longest", type=float, default=0.25)
    ap.add_argument("--rows", type=int, default=200)
    ap.add_argument("--lang", default="en", choices=sorted(LANG_RULES), help="language the bank is written in")
    ap.add_argument("--len-scale", type=float, default=None, help="scale for the length limits (default per --lang)")
    args = ap.parse_args()
    scale = args.len_scale if args.len_scale is not None else LEN_SCALE.get(args.lang, 1.0)
    BANNED = banned_re(args.lang)
    OPTION_REF = option_ref_re(args.lang)
    soft_limit = round(110 * scale)

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
    with_sign = sign_question_ids()
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
        if stem_key in seen_stems and qid not in with_sign:
            errs.append(f"{qid}: duplicate stem of {seen_stems[stem_key]}")
        if qid not in with_sign:
            seen_stems[stem_key] = qid
        for s in [q, *opts.values(), r["explanation"]]:
            if BANNED.search(s):
                errs.append(f"{qid}: banned phrase or em-dash")
                break
        if args.lang == "en" and qid not in META_OK and META.search(q):
            errs.append(f"{qid}: asks about the test itself, not its subject")
        if PROVIDERS.search(q):
            warns.append(f"{qid}: provider named in stem")

        ln = {L: len(v) for L, v in opts.items()}
        opt_lens.extend(ln.values())
        others = [v for L, v in ln.items() if L != k]
        if ln[k] > 1.2 * statistics.mean(others):
            key_far += 1
        if ln[k] == max(ln.values()) and list(ln.values()).count(ln[k]) == 1:
            key_long += 1
        if max(ln.values()) > soft_limit:
            over_110 += 1
            warns.append(f"{qid}: option over {soft_limit} chars")
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
    # Floor is low on purpose: vocabulary and numeric banks (ASVAB, HESI) legitimately
    # run short. The floor only catches a degenerate bank, not a terse one.
    lo, hi = 12 * scale, 42 * scale
    if not lo <= avg_opt <= hi:
        errs.append(f"average option length {avg_opt:.0f} chars (want {lo:.0f}-{hi:.0f})")
    if over_110 > 5:
        errs.append(f"{over_110} options over {soft_limit} chars (max 5)")
    if varies_key_only > 3:
        warns.append(f"'varies by state'/'house policy' only on the key in {varies_key_only} items (a tell)")

    print(f"lang {args.lang}  len-scale {scale}  rows {len(rows)}  categories {dict(counts)}")
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
