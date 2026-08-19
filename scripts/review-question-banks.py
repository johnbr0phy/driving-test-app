#!/usr/bin/env python3
"""Review ES/VI/KO question banks against the English source of truth.

Hard failures:
  - row-count or questionId order mismatch
  - type/state/category/correctAnswer/correctIndex drift
  - empty stems/options/explanations
  - duplicate options in a row (shuffleQuestionOptions matches by text)
  - position-dependent rows not detected in the target language

Soft reports (not failures):
  - remaining English-identical stems/options/explanations, excluding
    numbers, US units kept by existing style, proper nouns, and legal
    acronyms / on-sign English.
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_PATH = ROOT / "data" / "questions.json"
BANKS = {
    "es": ROOT / "data" / "questions_es.json",
    "vi": ROOT / "data" / "questions_vi.json",
    "ko": ROOT / "data" / "questions_ko.json",
}

FIELDS = ("question", "optionA", "optionB", "optionC", "optionD", "explanation")
OPTION_FIELDS = ("optionA", "optionB", "optionC", "optionD")

# Mirrors lib/testGenerator.ts hasPositionDependentAnswers()
POSITION_RE = re.compile(
    r"\b(A|B|C|D)\s+(and|or|y|o|và|hoặc|,)\s+(A|B|C|D)\b"
    r"|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b"
    r"|\bAll of the above\b"
    r"|\bNone of the above\b"
    r"|\bTodas las anteriores\b"
    r"|\bNinguna de las anteriores\b"
    r"|Tất cả các câu trên"
    r"|Không câu nào đúng"
    r"|(A|B|C|D)\s*(와|과|및)\s*(A|B|C|D)"
    r"|위의 모든 것"
    r"|위의 어느 것도 아님"
    r"|위 항목 모두"
    r"|정답 없음",
    re.I,
)

# Acceptable leftovers that stay English (or are language-neutral).
ACCEPTABLE_IDENTICAL = re.compile(
    r"""^(
        [\d.,/$%\s]+ |
        \$?[\d,]+ |
        \d+/\d+(\s+inch)? |
        \d[\d,]*\s*(mph|feet|foot|ft|inches?|in|hours?|hrs?|minutes?|mins?|seconds?|sec|days?|years?|miles?|%|p\.?m\.?|a\.?m\.?|PM|AM) |
        0\.\d+% |
        \d+% |
        \d+\s*PM |
        \d+\s*AM |
        911|511|411|311
    )$""",
    re.I | re.X,
)

PROPER_OR_ACRONYM = {
    "Vodka",
    "Wilmington",
    "Newark",
    "Dover",
    "Rehoboth Beach",
    "DWI",
    "DWAI",
    "OWI",
    "OMVI",
    "STOP",
    "YIELD",
    "RR",
    # On-sign English that the real DMV test shows on the vehicle/sign
    "THIS SCHOOLBUS STOPS AT ALL RAILROAD CROSSINGS",
}


def load(path: Path):
    with path.open() as f:
        return json.load(f)


def is_position_dependent(q: dict) -> bool:
    return any(POSITION_RE.search(q[f] or "") for f in OPTION_FIELDS)


def is_acceptable_identical(text: str) -> bool:
    s = text.strip()
    if not s:
        return False
    if s in PROPER_OR_ACRONYM:
        return True
    if ACCEPTABLE_IDENTICAL.match(s):
        return True
    return False


def review(lang: str, en: list, trans: list) -> int:
    failures = 0
    print(f"\n===== {lang.upper()} =====")

    en_by = {q["questionId"]: q for q in en}
    tr_by = {q["questionId"]: q for q in trans}
    if len(en) != len(trans):
        print(f"FAIL row count: en={len(en)} {lang}={len(trans)}")
        failures += 1
    else:
        print(f"OK row count: {len(trans)}")

    missing = sorted(set(en_by) - set(tr_by))
    extra = sorted(set(tr_by) - set(en_by))
    if missing or extra:
        print(f"FAIL questionId set: missing={len(missing)} extra={len(extra)}")
        if missing[:5]:
            print(f"  missing sample {missing[:5]}")
        failures += 1
    else:
        print("OK questionId set parity")

    n = len(en_by)
    meta_mismatch = 0
    empty = Counter()
    dup_rows = []
    pos_miss = []
    leftover = Counter()
    leftover_examples = {f: [] for f in FIELDS}
    placeholders = []
    fully = 0
    stem_ok = 0
    opts_ok = 0
    expl_ok = 0

    for qid, eq in en_by.items():
        tq = tr_by.get(qid)
        if not tq:
            continue
        for key in ("type", "state", "category", "correctAnswer", "correctIndex"):
            if eq.get(key) != tq.get(key):
                meta_mismatch += 1
                if meta_mismatch <= 8:
                    print(
                        f"FAIL {key} {qid}: en={eq.get(key)!r} {lang}={tq.get(key)!r}"
                    )

        for f in FIELDS:
            if not (tq.get(f) or "").strip():
                empty[f] += 1

        opts = [tq[f] for f in OPTION_FIELDS]
        if len(set(opts)) != 4:
            dup_rows.append((eq["questionId"], opts))

        en_pos = is_position_dependent(eq)
        tr_pos = is_position_dependent(tq)
        if en_pos and not tr_pos:
            pos_miss.append(
                (eq["questionId"], [eq[f] for f in OPTION_FIELDS], opts)
            )

        row_ok = True
        s_ok = True
        o_ok = True
        e_ok = True
        for f in FIELDS:
            ev, tv = eq[f], tq[f]
            if ev == tv and ev and not is_acceptable_identical(ev):
                leftover[f] += 1
                if len(leftover_examples[f]) < 6:
                    leftover_examples[f].append((eq["questionId"], ev[:100]))
                row_ok = False
                if f == "question":
                    s_ok = False
                elif f.startswith("option"):
                    o_ok = False
                elif f == "explanation":
                    e_ok = False
        expl = (tq.get("explanation") or "")
        if (
            "Esta es la respuesta correcta" in expl
            or "This is the correct answer" in expl
        ):
            placeholders.append(qid)
            e_ok = False
            row_ok = False

        if s_ok:
            stem_ok += 1
        if o_ok:
            opts_ok += 1
        if e_ok:
            expl_ok += 1
        if row_ok:
            fully += 1

    if meta_mismatch:
        print(f"FAIL metadata mismatches: {meta_mismatch}")
        failures += 1
    else:
        print("OK type/state/category/correctAnswer/correctIndex")

    if empty:
        print(f"FAIL empty fields: {dict(empty)}")
        failures += 1
    else:
        print("OK no empty stems/options/explanations")

    if dup_rows:
        print(f"FAIL duplicate options in {len(dup_rows)} rows:")
        for qid, opts in dup_rows[:8]:
            print(f"  {qid}: {opts}")
        failures += 1
    else:
        print("OK no duplicate options")

    if pos_miss:
        print(f"FAIL position-dependent not detected in {len(pos_miss)} rows:")
        for qid, en_opts, tr_opts in pos_miss:
            print(f"  {qid} EN={en_opts} {lang}={tr_opts}")
        failures += 1
    else:
        print("OK position-dependent detection parity")

    print(
        f"Coverage (acceptable identical units/proper nouns allowed): "
        f"stems {stem_ok}/{n}  options {opts_ok}/{n}  "
        f"explanations {expl_ok}/{n}  full rows {fully}/{n}"
    )
    leftover_slots = sum(leftover.values())
    if leftover_slots:
        print(f"FAIL leftover English slots: {dict(leftover)} total={leftover_slots}")
        for f in FIELDS:
            for qid, text in leftover_examples[f]:
                print(f"  leftover {f} {qid}: {text}")
        failures += 1
    else:
        print("OK no leftover English stems/options/explanations")

    if placeholders:
        print(f"FAIL placeholder explanations: {len(placeholders)}")
        print(f"  sample {placeholders[:8]}")
        failures += 1
    else:
        print("OK no placeholder explanations")

    print(f"{lang.upper()} hard failures: {failures}")
    return failures


def main() -> int:
    en = load(EN_PATH)
    total = 0
    for lang, path in BANKS.items():
        total += review(lang, en, load(path))
    print(f"\nTOTAL hard failures: {total}")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
