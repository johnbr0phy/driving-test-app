"""Checks the Dutch (nl-NL) translation of the nltheorie bank against the English base.

Usable on its own:  python3 -I tools/next100/nltheorie/nl/check.py [base.json] [nl.json]
(defaults: data/netherlands-driving-theory-questions.json and
data/netherlands-driving-theory-questions_nl.json).

Checks: same questionIds in the same order; same type, state, category, correctAnswer and
correctIndex; every text field present and not identical to English (numbers, units and codes
excepted); four distinct options; the position-dependent-answer guard of lib/shuffleOptions.ts
gives the same result per row; no em or en dashes; no "alle bovenstaande" / "A en B" / "Beide"
style options; decimal comma; "km/u" not "km/h"; "je", never the formal "u/uw" (CBR's own
register); no Belgian terms; no leftover English words.
"""
import json
import os
import re
import sys

TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
STRUCT = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]

POSITION = re.compile(
    r"\b(A|B|C|D)\s+(and|or|en|of|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b"
    r"|\bAll of the above\b|\bNone of the above\b|^All of these$"
    r"|alle bovenstaande|geen van de bovenstaande|alle antwoorden|^beide( antwoorden)?\.?$",
    re.IGNORECASE,
)
SAME_OK = re.compile(r"^[\d.,\s%/]*(km/u|km/h|kg|cm|m|t)?$")
FORMAL = re.compile(r"(?<![/\w])(u|uw|U|Uw)\b")
BELGIAN = re.compile(r"\b(Wegcode|gsm|wagen|fluovestje|nummerplaat|pechstrook|eender|halfweg)\b", re.IGNORECASE)
ENGLISH = re.compile(r"\b(the|and|you|your|must|should|road|driver|which|when|with|lane|car|speed|lorry|motorway)\b")
DECIMAL_POINT = re.compile(r"\d\.\d{1,2}(?!\d)")
THOUSANDS_COMMA = re.compile(r"\d,\d{3}(?!\d)")
KMH = re.compile(r"km/h")
TIME = re.compile(r"\b\d{1,2}\.\d{2}(?= (uur|en|tot)\b)")


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
            if DECIMAL_POINT.search(TIME.sub("", v)):
                errors.append(f"{qid}: {k} decimal point: {v!r}")
            if THOUSANDS_COMMA.search(v):
                errors.append(f"{qid}: {k} English thousands comma: {v!r}")
            if KMH.search(v):
                errors.append(f"{qid}: {k} km/h instead of km/u")
            if FORMAL.search(v):
                errors.append(f"{qid}: {k} formal u/uw: {v!r}")
            if BELGIAN.search(v):
                errors.append(f"{qid}: {k} Belgian term: {BELGIAN.search(v).group(0)!r}")
            plain = v.replace("speed pedelec", "")  # CBR keeps the term untranslated
            if ENGLISH.search(plain):
                errors.append(f"{qid}: {k} English word: {ENGLISH.search(plain).group(0)!r}")
        opts = [t.get(k) for k in ("optionA", "optionB", "optionC", "optionD")]
        if len(set(opts)) != 4:
            errors.append(f"{qid}: options not distinct")
        bp = any(POSITION.search(b[k]) for k in ("optionA", "optionB", "optionC", "optionD"))
        tp = any(isinstance(o, str) and POSITION.search(o) for o in opts)
        if bp != tp:
            errors.append(f"{qid}: position-dependent guard differs (en {bp}, nl {tp})")
    return errors


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
    base_p = argv[1] if len(argv) > 1 else os.path.join(root, "data", "netherlands-driving-theory-questions.json")
    tr_p = argv[2] if len(argv) > 2 else os.path.join(root, "data", "netherlands-driving-theory-questions_nl.json")
    base = json.load(open(base_p, encoding="utf-8"))
    tr = json.load(open(tr_p, encoding="utf-8"))
    errors = check(base, tr)
    print("\n".join(errors) if errors else f"PASS: {len(tr)} questions, ids, order, categories and keys match")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
