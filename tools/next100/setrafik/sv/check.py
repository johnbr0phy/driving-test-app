"""Checks the Swedish translation of the setrafik bank against the English base.

Usable on its own:  python3 -I tools/next100/setrafik/sv/check.py [base.json] [sv.json]
(defaults: data/sweden-driving-theory-questions.json and data/sweden-driving-theory-questions_sv.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers and units
excepted); four distinct options; no em or en dashes; no "alla/inget av ovanstående" or
"A och B" style options; decimal comma and space as thousands separator; "du" register
(no "ni"/"er" forms); no leftover English words. validate_translation.py is run on top.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]
BANNED = re.compile(
    r"alla ovanstående|inget av ovanstående|ingen av ovanstående|alla svaren|alla alternativen"
    r"|^båda\b|\b[ABCD] och [ABCD]\b|\b[ABCD] eller [ABCD]\b",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/h|kg|mm|m|cm|t|år)?$")
NI_FORM = re.compile(r"\b(ni|er|era|ert)\b")
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
                errors.append(f"{qid}: {k} differs")
        if set(t) != set(b):
            errors.append(f"{qid}: keys differ {sorted(set(t) ^ set(b))}")
        opts = [t.get("option" + L, "") for L in "ABCD"]
        if len(set(o.strip().lower() for o in opts)) != 4:
            errors.append(f"{qid}: options not distinct")
        for k in TEXT:
            v = t.get(k)
            if not isinstance(v, str) or not v.strip():
                errors.append(f"{qid}: {k} empty")
                continue
            if v == b.get(k) and not SAME_OK.match(v):
                errors.append(f"{qid}: {k} same as English: {v!r}")
            if "\u2014" in v or "\u2013" in v:
                errors.append(f"{qid}: {k} has a dash")
            if k.startswith("option") and BANNED.search(v):
                errors.append(f"{qid}: {k} banned option phrasing: {v!r}")
            if NI_FORM.search(v):
                errors.append(f"{qid}: {k} uses ni/er forms: {v!r}")
            if ENGLISH.search(v):
                errors.append(f"{qid}: {k} English word: {ENGLISH.search(v).group(0)!r}")
            if DECIMAL_POINT.search(v):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} thousands comma: {v!r}")
    return errors


if __name__ == "__main__":
    root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
    bp = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, "data", "sweden-driving-theory-questions.json")
    tp = sys.argv[2] if len(sys.argv) > 2 else os.path.join(root, "data", "sweden-driving-theory-questions_sv.json")
    errs = check(json.load(open(bp, encoding="utf-8")), json.load(open(tp, encoding="utf-8")))
    print("\n".join(errs) if errs else "PASS")
    sys.exit(1 if errs else 0)
