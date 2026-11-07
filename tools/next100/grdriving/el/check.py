"""Checks the Greek translation of the grdriving bank against the English base.

Usable on its own:  python3 -I tools/next100/grdriving/el/check.py [base.json] [el.json]
(defaults: data/greece-driving-questions.json and data/greece-driving-questions_el.json).

Checks: same questionIds in the same order; same keys, type, state, category, correctAnswer and
correctIndex; every text field present and, unless it is a bare number or unit, written in Greek
and not identical to English; four distinct options; no em or en dashes; no "όλα τα παραπάνω",
"κανένα από τα παραπάνω", "και τα δύο" or "Α και Β" style options; decimal comma and dot as
thousands separator; Latin words only from an allow-list (STOP, ABS, BUS, units, licence codes).
validate_translation.py is run on top.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]
BANNED = re.compile(
    r"όλα τα παραπάνω|όλες οι παραπάνω|κανένα από τα παραπάνω|καμία από τις παραπάνω"
    r"|^και τα δύο\b|^και οι δύο\b|^αμφότερ|\b[ABCDΑΒΓΔ] (και|ή) [ABCDΑΒΓΔ]\b",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s%/+=]*(km/h|kg|mm|m|cm|t|g/l)?$")
GREEK = re.compile(r"[Ͱ-Ͽἀ-῿]")
LATIN_WORD = re.compile(r"[A-Za-z][A-Za-z.]*")
LATIN_OK = {"STOP", "ABS", "BUS", "P", "D", "D1", "BE", "B", "km", "h", "kg", "mm", "m", "g", "l", "t",
            "Gov.gr", "Wallet"}
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
            if not SAME_OK.match(v):
                if v == b.get(k):
                    errors.append(f"{qid}: {k} same as English: {v!r}")
                if not GREEK.search(v):
                    errors.append(f"{qid}: {k} has no Greek: {v!r}")
            if "—" in v or "–" in v:
                errors.append(f"{qid}: {k} has a dash")
            if k.startswith("option") and BANNED.search(v):
                errors.append(f"{qid}: {k} banned option phrasing: {v!r}")
            for w in LATIN_WORD.findall(v.replace("B96", "B").replace("km/h", "km")):
                if w.rstrip(".") not in LATIN_OK:
                    errors.append(f"{qid}: {k} Latin word {w!r}")
            if DECIMAL_POINT.search(v.replace("Gov.gr", "")):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} thousands comma: {v!r}")
    return errors


if __name__ == "__main__":
    root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
    bp = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, "data", "greece-driving-questions.json")
    tp = sys.argv[2] if len(sys.argv) > 2 else os.path.join(root, "data", "greece-driving-questions_el.json")
    errs = check(json.load(open(bp, encoding="utf-8")), json.load(open(tp, encoding="utf-8")))
    print("\n".join(errs) if errs else "PASS")
    sys.exit(1 if errs else 0)
