"""Checks a Romanian translation of the rodrpciv bank against the English base.

Usable on its own:  python3 -I tools/next100/rodrpciv/ro/check.py [base.json] [ro.json]
(defaults: data/romania-drpciv-questions.json and data/romania-drpciv-questions_ro.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers, units and codes
excepted); four distinct options; the position-dependent-answer guard of lib/shuffleOptions.ts
gives the same result per row; no em or en dashes; no "toate/niciuna dintre cele de mai sus" or
"A și B" style options; decimal comma (no 0.80 style decimals, no 1,500 style thousands);
comma-below ș and ț (no cedilla ş ţ); no "tu" forms (questions use "dumneavoastră"); no straight
or English curly double quotes opening a quotation (Romanian „...”); no leftover English words.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]

POSITION = re.compile(
    r"\b(A|B|C|D)\s+(and|or|y|o|și|sau|ori|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b"
    r"|\bAll of the above\b|\bNone of the above\b|^All of these$"
    r"|toate cele de mai sus|niciuna dintre cele de mai sus|niciunul dintre cele de mai sus"
    r"|toate variantele|toate răspunsurile|^(ambele|amândouă|amândoi|ambii)( variante| răspunsuri| sunt corecte)?\.?$",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/h|kg|mm|m|g/l|t)?$|^\d{3}$")
TU = re.compile(
    r"\b(ești|poți|ai voie|vrei|conduci|trebuie să oprești|ta|tău|tale|tăi|te rog)\b", re.IGNORECASE
)
ENGLISH = re.compile(
    r"\b(the|and|you|your|must|should|road|driver|which|when|with|lane|speed|give way)\b"
)
DECIMAL_POINT = re.compile(r"\d\.\d{1,2}(?!\d)")
THOUSANDS_COMMA = re.compile(r"\d,\d{3}(?!\d)")
CEDILLA = re.compile(r"[şţŞŢ]")
BAD_QUOTE = re.compile(r"[\"“]")


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
            for pat, what in ((DECIMAL_POINT, "decimal point"), (THOUSANDS_COMMA, "English thousands comma"),
                              (CEDILLA, "cedilla s/t"), (BAD_QUOTE, "non-Romanian opening quote"),
                              (TU, "tu form"), (ENGLISH, "English word")):
                m = pat.search(v)
                if m:
                    errors.append(f"{qid}: {k} {what}: {m.group(0)!r}")
            if "—" in v or "–" in v:
                errors.append(f"{qid}: {k} has an em or en dash")
        opts = [t.get(k) for k in ("optionA", "optionB", "optionC", "optionD")]
        if len(set(opts)) != 4:
            errors.append(f"{qid}: options not distinct")
        bp = any(POSITION.search(b[k]) for k in ("optionA", "optionB", "optionC", "optionD"))
        tp = any(isinstance(o, str) and POSITION.search(o) for o in opts)
        if bp != tp:
            errors.append(f"{qid}: position-dependent guard differs (en {bp}, ro {tp})")
    return errors


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    base_p = argv[1] if len(argv) > 1 else os.path.join(root, "data", "romania-drpciv-questions.json")
    tr_p = argv[2] if len(argv) > 2 else os.path.join(root, "data", "romania-drpciv-questions_ro.json")
    base = json.load(open(base_p, encoding="utf-8"))
    tr = json.load(open(tr_p, encoding="utf-8"))
    errors = check(base, tr)
    print("\n".join(errors) if errors else f"PASS: {len(tr)} questions, ids, order, categories and keys match")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
