#!/usr/bin/env python3
"""Find question text that points at an answer option by its position.

Options are shuffled on screen (lib/shuffleOptions.ts for v1 exams and the
DMV, optionOrderFor() in lib/v2/session.ts for v2 exams, basicsOptionOrder()
for Basics questions), so "the second option", "the last choice" or, in a v1
bank, "Choice B" names a different option for every student, and sometimes
the right answer. Name the option by what it says instead ("SELECT Pupils
FROM Name swaps the field and table").

What is allowed:
  - anything in a question whose options keep their order: a v2 item with
    `lockedOrder`, or options the runtime guards keep in place ("A and B",
    "All of the above");
  - "Choice B" / "(C)" in a v2 EXPLANATION: relabelChoices() in
    lib/v2/grading.ts rewrites those letters to the ones on screen. It does
    not rewrite stems, Basics or ordinals.

Usage (repo root):  python3 -I tools/check_option_refs.py [--list]
Exit status 1 when anything is found. tools/check_banks.py runs it in CI.
"""
from __future__ import annotations

import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# "the second option", "the last two choices". The lookahead drops the other
# meaning of "first choice" ("the first choice for venepuncture").
_NOT_A_PICK = r"(?!\s+(?:for|among|of|in|when|to|drug|treatment|vein|site)\b)"
ORDINALS = [
    r"\b[Tt]he\s+(?:first|second|third|fourth|fifth|sixth|last|final|top|bottom|1st|2nd|3rd|4th)\s+(?:two\s+|three\s+)?"
    r"(?:options?|choices?|answer\s+choices?|distractors?|alternatives?)\b" + _NOT_A_PICK,
    r"\b(?:options?|choices?)\s+(?:above|below)\b",
    r"\b(?:option|choice)\s+(?:[1-6]|one|two|three|four)\b",
    # Spanish, Portuguese, French
    r"\b[Ll]a\s+(?:primera|segunda|tercera|cuarta|última)\s+(?:opción|alternativa|respuesta)\b(?!\s+(?:del?|al?|que)\b)",
    r"\b[Aa]\s+(?:primeira|segunda|terceira|quarta|última)\s+(?:opção|alternativa|hipótese|resposta)\b(?!\s+(?:d[oae]s?|a|que)\b)",
    r"\b[Ll]a\s+(?:première|deuxième|troisième|quatrième|dernière)\s+(?:option|proposition|réponse)\b(?!\s+(?:de|du|à)\b)",
    # German, Dutch
    r"\b[Dd]ie\s+(?:erste|zweite|dritte|vierte|letzte)\s+(?:Antwort|Option|Antwortmöglichkeit|Auswahl)\b(?!\s+(?:auf|des|der)\b)",
    r"\b(?:[Hh]et|[Dd]e)\s+(?:eerste|tweede|derde|vierde|laatste)\s+(?:antwoord|optie|keuze)\b(?!\s+(?:op|van)\b)",
    # Swedish, Danish, Finnish
    r"\b[Dd]et\s+(?:första|andra|tredje|fjärde|sista)\s+(?:alternativet|svarsalternativet)\b",
    r"\b[Dd]en\s+(?:første|anden|tredje|fjerde|sidste)\s+(?:svarmulighed|mulighed)\b",
    r"\b(?:[Ee]nsimmäinen|[Tt]oinen|[Kk]olmas|[Nn]eljäs|[Vv]iimeinen)\s+vaihtoehto\b",
    # Hungarian, Romanian, Greek
    r"\b[Aa]z?\s+(?:első|második|harmadik|negyedik|utolsó)\s+(?:válaszlehetőség|opció)\b",
    r"\b(?:[Pp]rima|[Aa]\s+doua|[Aa]\s+treia|[Aa]\s+patra|[Uu]ltima)\s+(?:variantă|varianta|opțiune|opțiunea)\b(?!\s+de\b)",
    r"(?:πρώτη|δεύτερη|τρίτη|τέταρτη|τελευταία)\s+επιλογή",
]
ORDINAL_RE = re.compile("|".join(ORDINALS))

# "Choice B", "options A and C", "(D)": a capital letter only, so "answers a
# question" is never a hit.
LETTER_RE = re.compile(
    r"\b(?:[Cc]hoices?|[Oo]ptions?|[Aa]nswers?|[Dd]istractors?|[Oo]pci(?:ón|ones)|[Rr]espuestas?|[Aa]ntwort(?:en)?|[Rr]éponses?|[Oo]pç(?:ão|ões))"
    r"\s+\(?[A-F]\)?(?![\w'’])"
)

# Real terms that look like a reference. Keyed by a regex on the question id.
ALLOWED = [
    # Universal life death benefit "Option A" / "Option B" is the product's own name.
    (re.compile(r"^LH\w*-TYPE-\d+$"), re.compile(r"Options?\s+[AB]\b")),
]

# The runtime guards that keep a question's options in bank order.
V2_KEEPS_ORDER = re.compile(r"\b(all|none) of the above\b|\b(both|either|neither)\b.*\b[A-E]\b|\b[A-E]\s+(and|or)\s+[A-E]\b", re.I)
V1_KEEPS_ORDER = re.compile(
    r"\b[A-D]\s+(?:and|or|y|o|và|hoặc|,|und|oder|et|ou|en|of|e|och|eller|og|ja|tai|és|vagy|și|sau|και|ή)\s+[A-D]\b"
    r"|[A-D]\s*(?:와|과|및|和|与|或|及|、)\s*[A-D]"
    r"|all of the above|none of the above|^all of these$|todas las anteriores|ninguna de las anteriores"
    r"|tất cả các câu trên|không câu nào đúng|위의 모든 것|위 항목 모두|정답 없음|^以上"
    r"|alle antworten|keine der|alle genannten|toutes les réponses|aucune de|alle bovenstaande|geen van de"
    r"|todas as anteriores|nenhuma das anteriores|alla ovanstående|inget av ovanstående|alle ovenstående|ingen af ovenstående"
    r"|kaikki edellä|ei mikään|a fentiek|toate cele de mai sus|niciuna dintre|όλα τα παραπάνω|κανένα από τα παραπάνω",
    re.I,
)


def _hits(text, pattern, qid):
    out = []
    for m in pattern.finditer(text or ""):
        if any(idre.search(qid) and okre.search(m.group(0)) for idre, okre in ALLOWED):
            continue
        out.append(m.group(0))
    return out


def _context(text, hit, width=70):
    i = text.find(hit)
    return ("…" if i > width else "") + text[max(0, i - width): i + len(hit) + width].replace("\n", " ") + "…"


def scan_v1(root=ROOT):
    found = []
    for path in sorted(glob.glob(os.path.join(root, "data", "*.json"))):
        try:
            rows = json.load(open(path, encoding="utf-8"))
        except ValueError:
            continue
        if not isinstance(rows, list):
            continue
        name = os.path.basename(path)
        for r in rows:
            if not isinstance(r, dict) or "optionA" not in r:
                continue
            qid = str(r.get("questionId", "?"))
            options = [str(r.get(k, "")) for k in ("optionA", "optionB", "optionC", "optionD")]
            if any(V1_KEEPS_ORDER.search(o) for o in options):
                continue
            for field in ("question", "explanation"):
                text = str(r.get(field) or "")
                for hit in _hits(text, ORDINAL_RE, qid) + _hits(text, LETTER_RE, qid):
                    found.append((name, qid, field, hit, _context(text, hit)))
    return found


def _v2_questions(doc):
    if isinstance(doc, dict):
        return doc.get("questions", [])
    return doc if isinstance(doc, list) else []


def scan_v2(root=ROOT):
    found = []
    base = os.path.join(root, "data", "v2")
    for path in sorted(glob.glob(os.path.join(base, "*", "*.json"))):
        rel = os.path.relpath(path, os.path.join(root, "data"))
        if os.path.basename(os.path.dirname(path)) == "basics":
            continue
        try:
            doc = json.load(open(path, encoding="utf-8"))
        except ValueError:
            continue
        for q in _v2_questions(doc):
            if not isinstance(q, dict) or q.get("format", "single") not in ("single", "multi"):
                continue
            options = [str(o) for o in q.get("options") or []]
            if q.get("lockedOrder") or any(V2_KEEPS_ORDER.search(o) for o in options):
                continue
            qid = str(q.get("id", "?"))
            stem = str(q.get("stem") or "")
            expl = str(q.get("explanation") or "")
            # Explanation letters are rewritten on screen; stem letters are not.
            for field, text, patterns in (("stem", stem, (ORDINAL_RE, LETTER_RE)), ("explanation", expl, (ORDINAL_RE,))):
                for pattern in patterns:
                    for hit in _hits(text, pattern, qid):
                        found.append((rel, qid, field, hit, _context(text, hit)))
    return found


def scan_basics(root=ROOT):
    """Basics questions and walkthrough steps: always shuffled, never relabelled."""
    found = []
    for path in sorted(glob.glob(os.path.join(root, "data", "v2", "basics", "*.json"))):
        rel = os.path.relpath(path, os.path.join(root, "data"))
        try:
            doc = json.load(open(path, encoding="utf-8"))
        except ValueError:
            continue

        def walk(node, skill):
            if isinstance(node, dict):
                skill = node.get("id", skill) if "rule" in node or "questions" in node else skill
                if "options" in node:
                    for field in ("stem", "blank", "ask", "why", "hint", "then"):
                        text = node.get(field)
                        if isinstance(text, str):
                            for hit in _hits(text, ORDINAL_RE, str(skill)) + _hits(text, LETTER_RE, str(skill)):
                                found.append((rel, str(skill), field, hit, _context(text, hit)))
                for v in node.values():
                    walk(v, skill)
            elif isinstance(node, list):
                for v in node:
                    walk(v, skill)

        walk(doc, "?")
    return found


def scan_all(root=ROOT):
    return scan_v1(root) + scan_v2(root) + scan_basics(root)


def errors(root=ROOT):
    """One line per hit, for tools/check_banks.py."""
    return [f"{f} {qid}: {field} points at an option by position (\"{hit}\"); options are shuffled, so name what the option says"
            for f, qid, field, hit, _ in scan_all(root)]


def main():
    found = scan_all()
    for f, qid, field, hit, ctx in found:
        print(f"{f} | {qid} | {field} | \"{hit}\"")
        if "--list" in sys.argv:
            print(f"    {ctx}")
    print(f"{len(found)} positional option reference(s)")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
