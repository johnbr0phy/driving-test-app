"""Checks the Finnish translation of the fitheory bank against the English base.

Usable on its own:  python3 -I tools/next100/fitheory/fi/check.py [base.json] [fi.json]
(defaults: data/finland-driving-theory-questions.json and data/finland-driving-theory-questions_fi.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers and units
excepted); four distinct options; no em or en dashes; no "kaikki edellä mainitut",
"molemmat" or "A ja B" style options; decimal comma and space as thousands separator;
"sinä" register (no "Te"/"Teidän" forms); no leftover English words.
validate_translation.py is run on top.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]
BANNED = re.compile(
    r"kaikki edellä mainitut|kaikki yllä olevat|ei mikään edellä mainituista|ei mikään yllä olevista"
    r"|kaikki vastaukset|kaikki vaihtoehdot|^molemmat\b|\b[ABCD] ja [ABCD]\b|\b[ABCD] tai [ABCD]\b",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/h|kg|mm|m|cm|t)?$")
TE_FORM = re.compile(r"\b(Te|Teidän|Teillä|Teidät|Teitä)\b")
ENGLISH = re.compile(r"\b(the|and|you|your|must|should|road|driver|which|when|with|lane|car|speed|to|of)\b")
DECIMAL_POINT = re.compile(r"\d\.\d{1,2}(?!\d|\.)")
THOUSANDS_COMMA = re.compile(r"\d,\d{3}(?!\d)")
# Finnish dates are written 29.5.2026 and 1.10.; times 00.00. Those are not decimals.
DATES = re.compile(r"\b\d{1,2}\.\d{1,2}\.(\d{4})?|\b\d{2}\.\d{2}\b")


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
            if TE_FORM.search(v):
                errors.append(f"{qid}: {k} uses Te forms: {v!r}")
            if ENGLISH.search(v):
                errors.append(f"{qid}: {k} English word: {ENGLISH.search(v).group(0)!r}")
            if DECIMAL_POINT.search(DATES.sub("", v)):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} thousands comma: {v!r}")
    return errors


if __name__ == "__main__":
    root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
    bp = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, "data", "finland-driving-theory-questions.json")
    tp = sys.argv[2] if len(sys.argv) > 2 else os.path.join(root, "data", "finland-driving-theory-questions_fi.json")
    errs = check(json.load(open(bp, encoding="utf-8")), json.load(open(tp, encoding="utf-8")))
    print("\n".join(errs) if errs else "PASS")
    sys.exit(1 if errs else 0)
