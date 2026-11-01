#!/usr/bin/env python3
"""Check a translated bank against its base bank.

Usage:
  python3 -I validate_translation.py data/<base>.json data/<base>_<xx>.json --lang xx

The base is the bank the exam was written in (English for esdgt and ptimt, German
for a later English translation of detheorie). Exit code 0 on PASS, 1 on FAIL.

Checks (hard failures):
  order       the same questionIds in the same order
  fields      the same type, state, category, correctAnswer and correctIndex per row
  translated  no question, option or explanation identical to the base, except
              numbers, units and sign or emergency codes ("50 km/h", "112", "B 7");
              an option of one or two short words only warns ("Oral", "Rigor mortis")
  options     four distinct, non-empty options per row
  guard       the shuffle guard (lib/shuffleOptions.ts, ported below) agrees per row:
              an "A and B" / "all of the above" row in one bank is one in the other,
              so options never move in one language and stay put in the other
  banned      the language's "all/none of the above" phrases and option-reference
              options (validate_bank.py LANG_RULES), English ones, and em-dashes
Soft reports: rows whose stem or explanation is much shorter than the base (a
dropped sentence), and translated text that still holds common English words.
"""
from __future__ import annotations

import argparse
import importlib.util
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location("validate_bank", os.path.join(HERE, "validate_bank.py"))
vb = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(vb)  # type: ignore[union-attr]

TEXT_FIELDS = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
SAME_FIELDS = ["type", "state", "category", "correctAnswer", "correctIndex"]
# Text that may be identical in both languages: numbers, units, codes.
NEUTRAL = re.compile(r"^[\s\d.,:;/%‰°+\-×x()]*(km/h|mph|km|m|cm|mm|kg|t|h|min|s|l|bar|g|mg|ml|‰)?[\s\d.,:;/%‰°+\-×x()]*$|^[A-Z]{0,3}\s?\d{1,4}[a-z]?$", re.I)

# Port of lib/shuffleOptions.ts: the original pattern (en, es, vi, ko, zh) plus the
# per-language European lists. Keep in step with the TypeScript.
TS_PATTERN = re.compile(
    r"\b(A|B|C|D)\s+(and|or|y|o|và|hoặc|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b|\bTanto\s+(A|B|C|D)\s+como\s+(A|B|C|D)\b"
    r"|\bAll of the above\b|\bNone of the above\b|^All of these$|^이 모두$|\bTodas las anteriores\b|\bNinguna de las anteriores\b"
    r"|Tất cả các câu trên|Không câu nào đúng|(A|B|C|D)\s*(와|과|및)\s*(A|B|C|D)|위의 모든 것|위의 어느 것도 아님|위 항목 모두|정답 없음"
    r"|(A|B|C|D)\s*(和|与|或|及|、)\s*(A|B|C|D)|^以上",
    re.I,
)
LANGUAGE_PATTERNS = {
    "de": (["und", "oder"], ["Alle Antworten sind richtig", "Alle genannten", "Keine der Antworten", "Keine der genannten"], ["Beide", "Beide sind richtig", "Beide Antworten sind richtig"]),
    "fr": (["et", "ou"], ["Toutes les réponses", "Aucune de ces réponses", "Aucune des réponses"], ["Les deux", "Les deux réponses"]),
    "it": (["e", "o"], ["Tutte le precedenti", "Nessuna delle precedenti", "Tutte le risposte"], ["Entrambe", "Entrambi", "Entrambe le risposte"]),
    "pl": (["i", "lub", "oraz"], ["Wszystkie powyższe", "Żadna z powyższych", "Wszystkie odpowiedzi"], ["Obie", "Oba", "Obie odpowiedzi"]),
    "nl": (["en", "of"], ["Alle bovenstaande", "Geen van de bovenstaande", "Alle antwoorden"], ["Beide", "Beide antwoorden"]),
    "pt": (["e", "ou"], ["Todas as anteriores", "Nenhuma das anteriores", "Todas as respostas"], ["Ambas", "Ambos", "Ambas as anteriores", "Ambas estão corretas"]),
}
OTHER_PATTERNS = []
for joins, phrases, both in LANGUAGE_PATTERNS.values():
    OTHER_PATTERNS.append(re.compile(rf"\b[ABCD]\s+(?:{'|'.join(joins)})\s+[ABCD]\b"))
    OTHER_PATTERNS.append(re.compile("(?:" + "|".join(map(re.escape, phrases)) + ")", re.I))
    OTHER_PATTERNS.append(re.compile(r"^(?:" + "|".join(map(re.escape, both)) + r")\.?$", re.I))

ENGLISH_TELLS = re.compile(r"\b(the|and|which|should|you|driver|vehicle|must|when|what)\b", re.I)


def guarded(row: dict) -> bool:
    opts = [row.get("option" + L, "") for L in "ABCD"]
    return any(TS_PATTERN.search(o) or any(p.search(o) for p in OTHER_PATTERNS) for o in opts)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("base")
    ap.add_argument("translation")
    ap.add_argument("--lang", required=True, choices=sorted(vb.LANG_RULES))
    args = ap.parse_args()

    base = json.load(open(args.base, encoding="utf-8"))
    tr = json.load(open(args.translation, encoding="utf-8"))
    errs: list[str] = []
    warns: list[str] = []
    banned = vb.banned_re(args.lang)
    option_ref = vb.option_ref_re(args.lang)

    if [r.get("questionId") for r in base] != [r.get("questionId") for r in tr]:
        ids_b = [r.get("questionId") for r in base]
        ids_t = [r.get("questionId") for r in tr]
        missing = sorted(set(ids_b) - set(ids_t))
        extra = sorted(set(ids_t) - set(ids_b))
        errs.append(f"order: questionIds differ (missing {missing[:5]}, extra {extra[:5]}, rows {len(ids_b)} vs {len(ids_t)})")

    for b, t in zip(base, tr):
        qid = b.get("questionId", "?")
        if t.get("questionId") != qid:
            continue
        for f in SAME_FIELDS:
            if b.get(f) != t.get(f):
                errs.append(f"{qid}: {f} {b.get(f)!r} != {t.get(f)!r}")
        for f in TEXT_FIELDS:
            bv, tv = (b.get(f) or "").strip(), (t.get(f) or "").strip()
            if not tv:
                errs.append(f"{qid}: empty {f}")
            elif bv == tv and not NEUTRAL.match(tv):
                # A word or two can be the same in both languages ("Oral", "Rigor mortis").
                if f.startswith("option") and len(tv) <= 20 and len(tv.split()) <= 2:
                    warns.append(f"{qid}: {f} {tv!r} is the same as the base (fine if the word is)")
                else:
                    errs.append(f"{qid}: {f} not translated")
            if banned.search(tv):
                errs.append(f"{qid}: banned phrase or em-dash in {f}")
        opts = [(t.get("option" + L) or "").strip() for L in "ABCD"]
        if len(set(opts)) != 4:
            errs.append(f"{qid}: duplicate options")
        if any(option_ref.match(o) for o in opts):
            errs.append(f"{qid}: option refers to other options")
        if guarded(b) != guarded(t):
            errs.append(f"{qid}: shuffle guard differs (base {guarded(b)}, translation {guarded(t)})")
        for f in ("question", "explanation"):
            bv, tv = b.get(f) or "", t.get(f) or ""
            if len(bv) > 40 and len(tv) < 0.6 * len(bv):
                warns.append(f"{qid}: {f} is much shorter than the base")
        if args.lang != "en" and len(ENGLISH_TELLS.findall(" ".join([t.get("question", ""), *opts]))) >= 3:
            warns.append(f"{qid}: looks like English is left in")

    print(f"lang {args.lang}  base rows {len(base)}  translated rows {len(tr)}  guarded {sum(guarded(r) for r in tr)}")
    for w in warns[:20]:
        print("warn:", w)
    for e in errs[:40]:
        print("FAIL:", e)
    if len(errs) > 40:
        print(f"... {len(errs) - 40} more")
    print("PASS" if not errs else f"FAIL ({len(errs)} errors)")
    return 0 if not errs else 1


if __name__ == "__main__":
    sys.exit(main())
