"""Checks the Danish translation of the dkteori bank against the English base.

Usable on its own:  python3 -I tools/next100/dkteori/da/check.py [base.json] [da.json]
(defaults: data/denmark-driving-theory-questions.json and data/denmark-driving-theory-questions_da.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers, units and codes
excepted); four distinct options; the position-dependent-answer guard of lib/shuffleOptions.ts
gives the same result per row; no em or en dashes; no "alle/ingen af ovenstående" or "A og B"
style options; decimal comma (no 1.6 style decimals, no 1,000 style thousands); no formal
"De/Dem/Deres" address (questions are in "du"); no leftover English words.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]

POSITION = re.compile(
    r"\b(A|B|C|D)\s+(and|or|og|eller|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b"
    r"|\bAll of the above\b|\bNone of the above\b|\bAlle ovenstående\b|\bIngen af ovenstående\b",
    re.IGNORECASE,
)
BANNED = re.compile(
    r"alle ovenstående|ingen af ovenstående|alle svar(ene)? er rigtige|ingen af svarene"
    r"|^begge( dele| svar)?\.?$|\b[ABCD] og [ABCD]\b|\b[ABCD] eller [ABCD]\b",
    re.IGNORECASE,
)
SAME_WORDS = {"Orange"}  # the same word in Danish
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/h|kg|mm|m|g|cc)?$|^\d{3}$")
FORMAL = re.compile(r"\b(De skal|De må|De kan|Dem|Deres)\b")
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
            if v == b[k] and not SAME_OK.match(v.strip()) and v not in SAME_WORDS:
                errors.append(f"{qid}: {k} identical to English: {v!r}")
            if "—" in v or "–" in v:
                errors.append(f"{qid}: {k} has an em or en dash")
            # kl. 22.00 style times are Danish usage
            if DECIMAL_POINT.search(re.sub(r"kl\. \d{1,2}\.\d{2}( til \d{2}\.\d{2})?", "", v)):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} English thousands comma: {v!r}")
            if FORMAL.search(v):
                errors.append(f"{qid}: {k} formal address: {FORMAL.search(v).group(0)!r}")
            if ENGLISH.search(v):
                errors.append(f"{qid}: {k} English word: {ENGLISH.search(v).group(0)!r}")
        opts = [t.get(k) for k in ("optionA", "optionB", "optionC", "optionD")]
        if len(set(opts)) != 4:
            errors.append(f"{qid}: options not distinct")
        for o in opts:
            if isinstance(o, str) and BANNED.search(o):
                errors.append(f"{qid}: banned option phrase {o!r}")
        bp = any(POSITION.search(b[k]) for k in ("optionA", "optionB", "optionC", "optionD"))
        tp = any(isinstance(o, str) and POSITION.search(o) for o in opts)
        if bp != tp:
            errors.append(f"{qid}: position-dependent guard differs (en {bp}, da {tp})")
    return errors


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    base_p = argv[1] if len(argv) > 1 else os.path.join(root, "data", "denmark-driving-theory-questions.json")
    tr_p = argv[2] if len(argv) > 2 else os.path.join(root, "data", "denmark-driving-theory-questions_da.json")
    base = json.load(open(base_p, encoding="utf-8"))
    tr = json.load(open(tr_p, encoding="utf-8"))
    errors = check(base, tr)
    print("\n".join(errors) if errors else f"PASS: {len(tr)} questions, ids, order, categories and keys match")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
