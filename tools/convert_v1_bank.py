#!/usr/bin/env python3
"""Convert a v1 bank (data/<x>-questions.json) into a v2 bank (data/v2/<exam>/questions.json).

Splits embedded passages out of the stem, turns optionA..D into an array,
renders detectable math as KaTeX, and tags every item with section / test /
module from a per-exam plan so lib/v2/session.ts can build the full-length
tests. Items not drawn into any test get test 0 (drill only).

Usage: python3 -I tools/convert_v1_bank.py <exam> [<v1 json>]
"""
import json, re, sys, collections

PLANS = {
    # exam: section key -> (categories, [per-test counts])
    "teas": {
        "reading": (["teasReading"], [45]),
        "math": (["teasMath"], [38]),
        "science": (["teasScience"], [50]),
        "english": (["teasEnglish"], [37]),
    },
    "hesi": {
        "math": (["hesiMath"], [36]), "reading": (["hesiReading"], [32]), "vocabulary": (["hesiVocabulary"], [32]),
        "grammar": (["hesiGrammar"], [32]), "biology": (["hesiBiology"], [24]), "chemistry": (["hesiChemistry"], [20]),
        "anatomy": (["hesiAnatomy"], [24]),
    },
    "asvab": {
        "gs": (["asvabGeneralScience"], [15]), "ar": (["asvabArithmetic"], [15]), "wk": (["asvabWordKnowledge"], [15]),
        "pc": (["asvabParagraph"], [10]), "mk": (["asvabMathKnowledge"], [15]), "ei": (["asvabElectronics"], [15]),
        "as": (["asvabAutoShop"], [10]), "mc": (["asvabMechanical"], [12]),
    },
    "accuplacer": {
        "reading": (["accReading"], [20, 20]), "writing": (["accWriting"], [20, 20]), "arithmetic": (["accArithmetic"], [20, 20]),
        "qas": (["accQAS"], [20, 20]), "aaf": (["accAAF"], [10, 10]),
    },
}
PASSAGE_CATEGORIES = {"teasReading", "hesiReading", "asvabParagraph", "accReading"}
V1_FILE = {"teas": "teas", "hesi": "hesi", "asvab": "asvab", "accuplacer": "accuplacer"}

SENT = re.compile(r'(?<=[.!?"])\s+(?=[A-Z"(])')

def split_passage(stem: str):
    """Everything before the final question sentence becomes the passage."""
    parts = SENT.split(stem.strip())
    if len(parts) < 2:
        return None, stem
    tail = parts[-1].strip()
    head = " ".join(parts[:-1]).strip()
    # Reading items always end with the question sentence (a question, a
    # "most nearly means:" stem or a "The author's purpose is to" completion).
    if len(head.split()) < 20 or len(tail.split()) > 30:
        return None, stem
    return head, tail

QUOTED = re.compile(r'^(Read the (?:sentence|sentences|two sentences|passage|paragraph)[^."]*\.)\s*"(.+)"\s*(.+)$', re.S)

def split_quoted(stem: str):
    """ACCUPLACER writing: 'Read the sentence. "..." Which ...?' -> passage is the quoted text."""
    m = QUOTED.match(stem.strip())
    if not m:
        return None, stem
    quoted, question = m.group(2).strip(), m.group(3).strip()
    # numbered sentences read better one per line
    quoted = re.sub(r'\s*(?=\(\d+\))', "\n", quoted).strip()
    return quoted, question

FRACTION = re.compile(r'^-?\d+/\d+$')
MIXED = re.compile(r'^(-?\d+) (\d+)/(\d+)$')
FORMULA = re.compile(r'\b([A-Za-z]\([a-z]\)\s*=\s*(?:[^,.?;]|\.(?=\d))+?)(?=[,;?]|\.(?:\s|$)|\s(?:where|and|for|if)\b|$)')
CURRENCY = re.compile(r'(?<!\\)\$(?=\d)')

def escape_currency(s: str) -> str:
    """Prices are written \\$ so RichText never reads them as math delimiters."""
    return CURRENCY.sub(r'\\$', s)

def tex_option(o: str) -> str:
    o = escape_currency(o.strip())
    if FRACTION.match(o):
        n, d = o.split("/")
        return f"$\\frac{{{n}}}{{{d}}}$" if not n.startswith("-") else f"$-\\frac{{{n[1:]}}}{{{d}}}$"
    m = MIXED.match(o)
    if m:
        return f"${m.group(1)}\\frac{{{m.group(2)}}}{{{m.group(3)}}}$"
    return o

def tex_stem(s: str) -> str:
    s = escape_currency(s)
    def fmt(m):
        f = m.group(1).strip().replace("*", r"\cdot ")
        return f"${f}$"
    return FORMULA.sub(fmt, s)

def convert(exam: str, src: str):
    plan = PLANS[exam]
    cat_to_section = {c: k for k, (cats, _) in plan.items() for c in cats}
    bank = json.load(open(src))
    by_cat = collections.defaultdict(list)
    for q in bank:
        by_cat[q["category"]].append(q)
    for c in by_cat:
        by_cat[c].sort(key=lambda q: q["questionId"])

    out, stats = [], collections.Counter()
    for section, (cats, counts) in plan.items():
        pool = [q for c in cats for q in by_cat[c]]
        cursor = 0
        assignment = {}
        for t, n in enumerate(counts, start=1):
            for q in pool[cursor:cursor + n]:
                assignment[q["questionId"]] = t
            cursor += n
        for q in pool:
            stem = q["question"].strip()
            passage = None
            if q["category"] in PASSAGE_CATEGORIES:
                passage, stem = split_passage(stem)
                stats["passage" if passage else "passage_miss"] += 1
            elif stem.startswith("Read the "):
                passage, stem = split_quoted(stem)
                stats["quoted" if passage else "quoted_miss"] += 1
            options = [tex_option(q[k]) for k in ("optionA", "optionB", "optionC", "optionD")]
            stem2 = tex_stem(stem)
            if stem2 != stem:
                stats["tex_stem"] += 1
            if any(o != q[k] for o, k in zip(options, ("optionA", "optionB", "optionC", "optionD"))):
                stats["tex_options"] += 1
            item = {
                "id": q["questionId"],
                "section": section,
                "test": assignment.get(q["questionId"], 0),
                "module": 1 if q["questionId"] in assignment else 0,
                "domain": q["category"],
                "difficulty": 2,
                "format": "single",
            }
            if passage:
                item["passage"] = escape_currency(passage)
            item.update({
                "stem": stem2,
                "options": options,
                "correct": [q["correctIndex"]],
                "explanation": tex_stem(q["explanation"]),
            })
            out.append(item)
    return out, stats

if __name__ == "__main__":
    exam = sys.argv[1]
    src = sys.argv[2] if len(sys.argv) > 2 else f"data/{V1_FILE[exam]}-questions.json"
    items, stats = convert(exam, src)
    dst = f"data/v2/{exam}/questions.json"
    import os
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    json.dump(items, open(dst, "w"), indent=2, ensure_ascii=False)
    tests = collections.Counter((i["section"], i["test"]) for i in items)
    print(exam, len(items), "items ->", dst)
    print("  ", dict(stats))
    print("  ", sorted(tests.items()))
