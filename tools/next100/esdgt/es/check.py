"""Checks a Spanish translation of the esdgt bank against the English base.

Usable on its own:  python3 -I tools/next100/esdgt/es/check.py [base.json] [es.json]
(defaults: data/spain-dgt-questions.json and data/spain-dgt-questions_es.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers, units and codes
excepted); four distinct options; the position-dependent-answer guard of lib/shuffleOptions.ts
gives the same result per row; no em or en dashes; no "all/none of the above" or "A y B" style
options; decimal comma (no 1.6 style decimals, no 1,000 style thousands); no tuteo verb forms
(questions are in usted); no leftover English words.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]

# Port of positionReferencePattern in lib/shuffleOptions.ts (case-insensitive like the JS /i).
POSITION = re.compile(
    r"\b(A|B|C|D)\s+(and|or|y|o|và|hoặc|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b"
    r"|\bTanto\s+(A|B|C|D)\s+como\s+(A|B|C|D)\b|\bAll of the above\b|\bNone of the above\b"
    r"|^All of these$|\bTodas las anteriores\b|\bNinguna de las anteriores\b",
    re.IGNORECASE,
)
BANNED = re.compile(
    r"todas las anteriores|ninguna de las anteriores|todas son correctas|ninguna es correcta"
    r"|\b(ambas|ambos)\b|\b[ABCD] y [ABCD]\b|\b[ABCD] o [ABCD]\b",
    re.IGNORECASE,
)
# Text that may legitimately match English exactly: numbers with units, percentages, codes.
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/h|kg|mm|m|g/l|mg/l|cc)?$|^\d{3}$")
TUTEO = re.compile(
    r"\b(puedes|debes|tienes|estás|vas|quieres|conduces|circulas|sabes|haces|ves|llegas|"
    r"necesitas|tu permiso|tu vehículo|tu coche|tu carril)\b",
    re.IGNORECASE,
)
ENGLISH = re.compile(
    r"\b(the|and|you|your|must|should|road|driver|which|when|with|lane|car|speed)\b"
)
DECIMAL_POINT = re.compile(r"\d\.\d{1,2}(?!\d)")
THOUSANDS_COMMA = re.compile(r"\d,\d{3}(?!\d)")


def check(base, tr):
    errors = []
    if len(base) != len(tr):
        errors.append(f"length {len(tr)} != {len(base)}")
    for i, (b, t) in enumerate(zip(base, tr)):
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
            if "—" in v or "–" in v:
                errors.append(f"{qid}: {k} has an em or en dash")
            if DECIMAL_POINT.search(v.replace("DGT 3.0", "")):  # DGT 3.0 is a product name
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} English thousands comma: {v!r}")
            if TUTEO.search(v):
                errors.append(f"{qid}: {k} tuteo form: {TUTEO.search(v).group(0)!r}")
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
            errors.append(f"{qid}: position-dependent guard differs (en {bp}, es {tp})")
        key = "ABCD"[b["correctIndex"]] if isinstance(b.get("correctIndex"), int) else None
        if key and key != b.get("correctAnswer"):
            errors.append(f"{qid}: base correctIndex/correctAnswer mismatch")
    return errors


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    base_p = argv[1] if len(argv) > 1 else os.path.join(root, "data", "spain-dgt-questions.json")
    tr_p = argv[2] if len(argv) > 2 else os.path.join(root, "data", "spain-dgt-questions_es.json")
    base = json.load(open(base_p, encoding="utf-8"))
    tr = json.load(open(tr_p, encoding="utf-8"))
    errors = check(base, tr)
    print("\n".join(errors) if errors else f"PASS: {len(tr)} questions, ids, order, categories and keys match")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
