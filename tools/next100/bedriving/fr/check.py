"""Checks the French (fr-BE) translation of the bedriving bank against the English base.

Usable on its own:  python3 -I tools/next100/bedriving/fr/check.py [base.json] [fr.json]
(defaults: data/belgium-driving-questions.json and data/belgium-driving-questions_fr.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers and units
excepted); four distinct options; the position-dependent-answer guard of lib/shuffleOptions.ts
gives the same result per row; no em or en dashes; no "toutes les réponses" / "A et B" style
options; decimal comma; no English thousands comma; a non-breaking space (never a plain one)
before ? ! : ;; questions in "vous", never "tu/toi/ton/tes"; no leftover English words.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]

POSITION = re.compile(
    r"\b(A|B|C|D)\s+(and|or|et|ou|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b"
    r"|\bAll of the above\b|\bNone of the above\b|^All of these$"
    r"|toutes les réponses|aucune (de ces|des) réponses|toutes les propositions|^les deux( réponses)?\.?$",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s %/]*(km/h|kg|cm|m|t|g/l|tonnes)?$")
TU = re.compile(r"\b(tu|toi|ton|tes)\b", re.IGNORECASE)
ENGLISH = re.compile(r"\b(the|and|you|your|must|should|road|driver|which|when|with|lane|speed|left|right)\b")
DECIMAL_POINT = re.compile(r"\d\.\d")
THOUSANDS_COMMA = re.compile(r"\d,\d{3}(?!\d)")
PLAIN_SPACE_PUNCT = re.compile(r" [?!:;]")
DASH = re.compile("[\u2014\u2013]")


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
            if v.replace(" ", " ") == b[k] and not SAME_OK.match(v.strip()):
                errors.append(f"{qid}: {k} identical to English: {v!r}")
            if DASH.search(v):
                errors.append(f"{qid}: {k} has an em or en dash")
            if DECIMAL_POINT.search(v):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} English thousands comma: {v!r}")
            if PLAIN_SPACE_PUNCT.search(v):
                errors.append(f"{qid}: {k} plain space before ? ! : ;")
            if TU.search(v):
                errors.append(f"{qid}: {k} tu form: {TU.search(v).group(0)!r}")
            plain = v.replace("speed pedelec", "")  # the Code's own term
            if ENGLISH.search(plain):
                errors.append(f"{qid}: {k} English word: {ENGLISH.search(plain).group(0)!r}")
        opts = [t.get(k) for k in ("optionA", "optionB", "optionC", "optionD")]
        if len(set(opts)) != 4:
            errors.append(f"{qid}: options not distinct")
        bp = any(POSITION.search(b[k]) for k in ("optionA", "optionB", "optionC", "optionD"))
        tp = any(isinstance(o, str) and POSITION.search(o) for o in opts)
        if bp != tp:
            errors.append(f"{qid}: position-dependent guard differs (en {bp}, fr {tp})")
    return errors


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    base_p = argv[1] if len(argv) > 1 else os.path.join(root, "data", "belgium-driving-questions.json")
    tr_p = argv[2] if len(argv) > 2 else os.path.join(root, "data", "belgium-driving-questions_fr.json")
    base = json.load(open(base_p, encoding="utf-8"))
    tr = json.load(open(tr_p, encoding="utf-8"))
    errors = check(base, tr)
    print("\n".join(errors) if errors else f"PASS: {len(tr)} questions, ids, order, categories and keys match")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
