#!/usr/bin/env python3
"""Integrity checks over every question bank, run in CI on every PR.

Usage:
  python3 -I tools/check_banks.py                 # check everything, exit 1 on any error
  python3 -I tools/check_banks.py --export out.json   # also write a flat question index

These are the checks no bank, old or new, may fail: a wrong answer key is
the one bug that costs a student points on the real test. House style
(lengths, letter spread, banned phrasing) stays with the per-bank
validators (validate_bank.py, validate_v2_bank.py), which the CI job runs on
changed banks as warnings only, since some older banks predate them.

v1 banks (data/*.json):
  shape      the 12 keys (state versions also carry sourceQuestionId)
  key        correctAnswer is A-D and matches correctIndex
  options    four non-empty options, no two the same
  text       non-empty stem and explanation
  ids        unique in the file, and unique across every base bank
  language   a translated bank (<bank>_<lang>.json) has only ids of its base
             bank, with the same answer key and category (the zh DMV bank is
             partial on purpose)

v2 banks (data/v2/<exam>/*.json, the Basics library excluded):
  ids        unique per exam
  key        every key index points at an option; single has one key;
             numeric has answers
  stimulus   every stimulusId names a stimulus in the exam's files
  text       a stem or a passage
"""
from __future__ import annotations

import argparse
import glob
import json
import os
import re
import sys
from collections import Counter, defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import check_option_refs  # noqa: E402

V1_KEYS = ["type", "state", "questionId", "category", "question", "optionA", "optionB",
           "optionC", "optionD", "correctAnswer", "correctIndex", "explanation"]
LETTERS = "ABCD"
TRANSLATED = re.compile(r"^(.*)_([a-z]{2})\.json$")
# Not banks a student answers: the DMV proofreading copy.
SKIP_V1 = {"questions_proof.json"}
# Translated banks allowed to hold only part of their base bank.
PARTIAL_TRANSLATIONS = {"questions_zh.json"}


def norm(s: str) -> str:
    # Case matters: capitalization questions and genotypes (Tt, tt) differ only by case.
    return re.sub(r"\s+", " ", s).strip()


def load_v1() -> tuple[dict[str, list], list[str]]:
    banks: dict[str, list] = {}
    errors: list[str] = []
    for path in sorted(glob.glob("data/*.json")):
        name = os.path.basename(path)
        if name in SKIP_V1:
            continue
        try:
            rows = json.load(open(path, encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            errors.append(f"{name}: not valid JSON ({e})")
            continue
        if not isinstance(rows, list) or not rows or not isinstance(rows[0], dict) or "questionId" not in rows[0]:
            continue  # not a question bank
        banks[name] = rows
    return banks, errors


def check_v1(banks: dict[str, list], index: list[dict]) -> list[str]:
    errors: list[str] = []
    global_ids: dict[str, str] = {}
    for name, rows in banks.items():
        translated = TRANSLATED.match(name)
        seen: Counter = Counter()
        for i, r in enumerate(rows):
            qid = r.get("questionId") or f"row {i}"
            where = f"{name} {qid}"
            missing = [k for k in V1_KEYS if k not in r]
            if missing:
                errors.append(f"{where}: missing {', '.join(missing)}")
                continue
            seen[qid] += 1
            letter, idx = r["correctAnswer"], r["correctIndex"]
            if letter not in LETTERS or not isinstance(idx, int) or LETTERS.find(letter) != idx:
                errors.append(f"{where}: correctAnswer {letter!r} does not match correctIndex {idx!r}")
            opts = [r[f"option{l}"] for l in LETTERS]
            if any(not isinstance(o, str) or not o.strip() for o in opts):
                errors.append(f"{where}: empty option")
            elif len({norm(o) for o in opts}) < 4:
                errors.append(f"{where}: two options are the same")
            if not str(r["question"]).strip():
                errors.append(f"{where}: empty stem")
            if not str(r["explanation"]).strip():
                errors.append(f"{where}: empty explanation")
            if not translated:
                if qid in global_ids and global_ids[qid] != name:
                    errors.append(f"{where}: id also used in {global_ids[qid]}")
                global_ids.setdefault(qid, name)
                index.append({
                    "id": qid, "engine": "v1", "file": f"data/{name}", "category": r["category"],
                    "stem": r["question"], "options": opts, "key": [idx], "explanation": r["explanation"],
                })
        for qid, n in seen.items():
            if n > 1:
                errors.append(f"{name} {qid}: id appears {n} times")

    # Translations against their base bank.
    for name, rows in banks.items():
        m = TRANSLATED.match(name)
        if not m:
            continue
        base_name = f"{m.group(1)}.json"
        base = banks.get(base_name)
        if base is None:
            errors.append(f"{name}: no base bank {base_name}")
            continue
        by_id = {r["questionId"]: r for r in base if "questionId" in r}
        ids = set()
        for r in rows:
            qid = r.get("questionId")
            ids.add(qid)
            b = by_id.get(qid)
            if b is None:
                errors.append(f"{name} {qid}: not in {base_name}")
                continue
            if r.get("correctIndex") != b.get("correctIndex"):
                errors.append(f"{name} {qid}: key {r.get('correctAnswer')} but {base_name} says {b.get('correctAnswer')}")
            if r.get("category") != b.get("category"):
                errors.append(f"{name} {qid}: category {r.get('category')} but {base_name} says {b.get('category')}")
        if name not in PARTIAL_TRANSLATIONS:
            gone = set(by_id) - ids
            if gone:
                errors.append(f"{name}: missing {len(gone)} questions of {base_name} (e.g. {sorted(gone)[0]})")
    return errors


def check_v2(index: list[dict]) -> list[str]:
    errors: list[str] = []
    for root in sorted(glob.glob("data/v2/*/")):
        exam = os.path.basename(root.rstrip("/"))
        if exam == "basics":
            continue
        questions: list[tuple[str, dict]] = []
        stimuli: dict[str, dict] = {}
        for path in sorted(glob.glob(f"{root}*.json")):
            d = json.load(open(path, encoding="utf-8"))
            qs = d if isinstance(d, list) else d.get("questions", [])
            for s in ([] if isinstance(d, list) else d.get("stimuli", [])):
                stimuli[s["id"]] = s
            questions += [(path, q) for q in qs]
        ids = Counter(q.get("id") for _, q in questions)
        for qid, n in ids.items():
            if n > 1:
                errors.append(f"v2 {exam} {qid}: id appears {n} times")
        for path, q in questions:
            qid = q.get("id", "?")
            where = f"v2 {exam} {qid}"
            fmt = q.get("format")
            opts = q.get("options") or []
            cor = q.get("correct") or []
            if fmt == "numeric":
                if not (q.get("numeric") or {}).get("answers"):
                    errors.append(f"{where}: numeric item with no answers")
            elif fmt in ("single", "multi", "order"):
                if not opts:
                    errors.append(f"{where}: no options")
                if not cor or any(not isinstance(c, int) or not 0 <= c < len(opts) for c in cor):
                    errors.append(f"{where}: key {cor} out of range for {len(opts)} options")
                if fmt == "single" and len(cor) != 1:
                    errors.append(f"{where}: single item with {len(cor)} keys")
                if fmt in ("single", "multi") and len({norm(str(o)) for o in opts}) < len(opts):
                    errors.append(f"{where}: two options are the same")
            sid = q.get("stimulusId")
            if sid and sid not in stimuli:
                errors.append(f"{where}: stimulus {sid} not found")
            if not (q.get("stem") or q.get("passage") or sid):
                errors.append(f"{where}: no stem or passage")
            # What the candidate sees beside the stem: the shared stimulus (title + text), then
            # the item's own passage. The audit reads this, so leaving the stimulus out makes
            # every passage, table and puzzle question look unanswerable.
            stim = stimuli.get(sid, {}) if sid else {}
            passage = "\n\n".join(p for p in (stim.get("title"), stim.get("text") or stim.get("passage"), q.get("passage")) if p)
            fig = q.get("figure") or stim.get("figure") or {}
            index.append({
                "id": qid, "engine": "v2", "exam": exam, "file": path, "category": q.get("domain"),
                "format": fmt, "stem": q.get("stem", ""), "passage": passage, "options": opts,
                "key": cor if fmt != "numeric" else (q.get("numeric") or {}).get("answers"),
                "explanation": q.get("explanation", ""),
                **({"figure": fig.get("alt") or fig.get("src", "")} if fig else {}),
            })
    return errors


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--export", help="write a flat index of every question to this path")
    args = ap.parse_args()
    index: list[dict] = []
    banks, errors = load_v1()
    errors += check_v1(banks, index)
    errors += check_v2(index)
    # "The second option", "Choice B" in a v1 bank: options are shuffled on screen.
    errors += check_option_refs.errors()
    by_engine = Counter(q["engine"] for q in index)
    print(f"checked {len(banks)} v1 bank files and {len(glob.glob('data/v2/*/')) - 1} v2 exams: "
          f"{by_engine['v1']} v1 and {by_engine['v2']} v2 questions")
    if args.export:
        with open(args.export, "w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False)
        print(f"wrote {len(index)} questions to {args.export}")
    if errors:
        print(f"\nFAIL: {len(errors)} problem(s)")
        for e in errors[:300]:
            print("  " + e)
        if len(errors) > 300:
            print(f"  ... and {len(errors) - 300} more")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
