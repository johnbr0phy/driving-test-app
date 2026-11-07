"""Checks the Hungarian translation of the hukresz bank against the English base.

Usable on its own:  python3 -I tools/next100/hukresz/hu/check.py [base.json] [hu.json]
(defaults: data/hungary-kresz-questions.json and data/hungary-kresz-questions_hu.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers and units
excepted); four distinct options; no em or en dashes; no "all/none of the above" or "A és B"
style options; decimal comma (no 0.5 style decimals, no 1,000 style thousands); no informal
"te" forms (questions are formal/impersonal); no leftover English words.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]
BANNED = re.compile(
    r"a fentiek mindegyike|a fentiek közül egyik sem|egyik fenti sem|egyik válasz sem"
    r"|mindegyik válasz helyes|minden válasz helyes|^mindkettő|^mindkét válasz"
    r"|\b[ABCD] (és|vagy) [ABCD]\b",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/h|kg|m)?$")
TEGEZO = re.compile(r"\b(te|neked|téged|tiéd|veled|nálad|rólad|tőled|hozzád)\b", re.IGNORECASE)
ENGLISH = re.compile(r"\b(the|and|you|your|must|should|road|driver|which|when|with|lane|car|speed)\b")
DECIMAL_POINT = re.compile(r"\d\.\d{1,2}(?!\d)")
THOUSANDS_COMMA = re.compile(r"\d,\d{3}(?!\d)")


def check(base, tr):
    errors = []
    if len(base) != len(tr):
        errors.append(f"length {len(tr)} != {len(base)}")
    for b, t in zip(base, tr):
        qid = b.get("questionId")
        for k in STRUCT:
            if b.get(k) != t.get(k):
                errors.append(f"{qid}: {k} differs ({t.get(k)!r} vs {b.get(k)!r})")
        if set(t) != set(b):
            errors.append(f"{qid}: keys differ {sorted(set(t) ^ set(b))}")
        for k in TEXT:
            v = t.get(k)
            if not isinstance(v, str) or not v.strip():
                errors.append(f"{qid}: {k} empty")
                continue
            if v == b[k] and not SAME_OK.match(v.strip()):
                errors.append(f"{qid}: {k} identical to English: {v!r}")
            if "\u2014" in v or "\u2013" in v:
                errors.append(f"{qid}: {k} has an em or en dash")
            if DECIMAL_POINT.search(v):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} English thousands comma: {v!r}")
            if TEGEZO.search(v):
                errors.append(f"{qid}: {k} informal form: {TEGEZO.search(v).group(0)!r}")
            if ENGLISH.search(v):
                errors.append(f"{qid}: {k} English word: {ENGLISH.search(v).group(0)!r}")
        opts = [t.get("option" + L) for L in "ABCD"]
        if len(set(opts)) != 4:
            errors.append(f"{qid}: options not distinct")
        for o in opts:
            if isinstance(o, str) and BANNED.search(o):
                errors.append(f"{qid}: banned option phrase {o!r}")
    return errors


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    base_p = argv[1] if len(argv) > 1 else os.path.join(root, "data", "hungary-kresz-questions.json")
    tr_p = argv[2] if len(argv) > 2 else os.path.join(root, "data", "hungary-kresz-questions_hu.json")
    base = json.load(open(base_p, encoding="utf-8"))
    tr = json.load(open(tr_p, encoding="utf-8"))
    errors = check(base, tr)
    print("\n".join(errors) if errors else f"PASS: {len(tr)} questions, ids, order, categories and keys match")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
