#!/usr/bin/env python3
"""Build the PSAT/NMSQT v2 bank from the Python-data sources in tools/psat/.

Usage: python3 -I tools/psat/build.py

Layout mirrors data/v2/sat/: one JSON file per module (Test 1 module 1, the
harder "upper" module 2 and the easier "lower" module 2 for each section) plus
drill-only files (test 0). Test 1 is held out of the drills in the config, so
the drills run only on the drill-only items.

Authoring convention: a single-answer item lists its key first. The build
shuffles the options with a seed taken from the stem, so key positions spread
out and stay stable from build to build. Math items whose options are all
plain numbers are sorted ascending and get `lockedOrder`, like the SAT bank.

Lint (printed, never fatal): key strictly longest option share, numeric stems
without "Type the number only", em or en dashes, curly quotes.
"""
import hashlib, json, os, random, re, importlib.util
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, "data", "v2", "psat")

DOM = {
    "cs": "craftStructure", "ii": "infoIdeas", "sec": "conventions", "ei": "expressionIdeas",
    "alg": "algebra", "adv": "advancedMath", "psda": "dataAnalysis", "geo": "geometryTrig",
}
RW_DOMS = {"cs", "ii", "sec", "ei"}

WIC = "Which choice completes the text with the most logical and precise word or phrase?"
SEC = "Which choice completes the text so that it conforms to the conventions of Standard English?"
TRANS = "Which choice completes the text with the most logical transition?"
MAIN = "Which choice best states the main idea of the text?"
LOGIC = "Which choice most logically completes the text?"
QUANT = "Which choice most effectively uses data from the table to complete the statement?"
STRUCT = "Which choice best describes the overall structure of the text?"
PURPOSE = "Which choice best states the main purpose of the text?"
NOTES = "Which choice most effectively uses relevant information from the notes to accomplish this goal?"
CROSS = "Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?"
NOTES_INTRO = "While researching a topic, a student has taken the following notes:\n\n"


def R(dom, d, skill, passage, stem, opts, expl, b=None):
    """Reading and Writing single-answer item, key first."""
    q = {"dom": dom, "difficulty": d, "skill": skill, "format": "single", "passage": passage, "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if b:
        q["basics"] = b
    return q


def notes(bullets, goal):
    return NOTES_INTRO + "\n".join("- " + x for x in bullets) + "\n\n" + goal + " " + NOTES


def M(dom, d, skill, stem, opts, expl, b=None):
    """Math single-answer item, key first."""
    q = {"dom": dom, "difficulty": d, "skill": skill, "format": "single", "stem": stem, "options": opts,
         "correct": [0], "calculator": True, "explanation": expl}
    if b:
        q["basics"] = b
    return q


def N(dom, d, skill, stem, answers, expl, b=None):
    """Math student-produced response. Answers are strings of digits . / - only."""
    for a in answers:
        assert re.fullmatch(r"-?[0-9./]+", a), a
    if "Type the number only" not in stem:
        stem = stem + " Type the number only."
    q = {"dom": dom, "difficulty": d, "skill": skill, "format": "numeric", "stem": stem,
         "numeric": {"answers": answers, "tolerance": 0}, "calculator": True, "explanation": expl}
    if b:
        q["basics"] = b
    return q


def _num(s):
    t = s.strip().strip("$").replace("{,}", "").replace(",", "").strip()
    m = re.fullmatch(r"-?\d+(\.\d+)?", t)
    if m:
        return float(t)
    m = re.fullmatch(r"(-?)\\frac\{(\d+)\}\{(\d+)\}", t)
    if m:
        v = int(m.group(2)) / int(m.group(3))
        return -v if m.group(1) else v
    return None


def finish(q, section, test, module, variant, qid):
    seed = int(hashlib.sha1(q["stem"].encode() + (q.get("passage") or "").encode()).hexdigest()[:8], 16)
    if q["format"] == "single":
        opts = q["options"]
        key = opts[0]
        vals = [_num(o) for o in opts] if section == "math" else [None]
        if section == "math" and all(v is not None for v in vals):
            order = sorted(range(len(opts)), key=lambda i: vals[i])
            q["lockedOrder"] = True
        else:
            order = list(range(len(opts)))
            random.Random(seed).shuffle(order)
        q["options"] = [opts[i] for i in order]
        q["correct"] = [q["options"].index(key)]
    out = {"id": qid, "section": section, "test": test, "module": module}
    if variant:
        out["variant"] = variant
    out["domain"] = DOM[q.pop("dom")]
    for k in ("skill", "basics", "difficulty", "format", "passage", "stem", "options", "correct", "lockedOrder",
              "numeric", "calculator", "explanation"):
        if k in q:
            out[k] = q[k]
    return out


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.ITEMS


# (source module, output file, section, test, module, variant, id prefix, first id number)
FILES = [
    ("rw_m1", "rw-m1", "rw", 1, 1, None, "PSAT-RW", 101),
    ("rw_m2_upper", "rw-m2-upper", "rw", 1, 2, "upper", "PSAT-RW", 128),
    ("rw_m2_lower", "rw-m2-lower", "rw", 1, 2, "lower", "PSAT-RW", 155),
    ("ma_m1", "ma-m1", "math", 1, 1, None, "PSAT-MA", 101),
    ("ma_m2_upper", "ma-m2-upper", "math", 1, 2, "upper", "PSAT-MA", 123),
    ("ma_m2_lower", "ma-m2-lower", "math", 1, 2, "lower", "PSAT-MA", 145),
    ("rw_drill", "rw-drill", "rw", 0, 1, None, "PSAT-RW", 1),
    ("ma_drill", "ma-drill", "math", 0, 1, None, "PSAT-MA", 1),
]


def main():
    allq = []
    for src, out, section, test, module, variant, prefix, start in FILES:
        items = load(src)
        built = []
        for i, q in enumerate(items):
            assert (q["dom"] in RW_DOMS) == (section == "rw"), (src, i, q["stem"][:40])
            qid = f"{prefix}-{start + i:03d}"
            if section == "rw":
                q.pop("calculator", None)
            built.append(finish(q, section, test, module, variant, qid))
        json.dump(built, open(os.path.join(OUT, out + ".json"), "w"), indent=1, ensure_ascii=False)
        open(os.path.join(OUT, out + ".json"), "a").write("\n")
        c = Counter(q["domain"] for q in built)
        dc = Counter(q["difficulty"] for q in built)
        print(f"{out}: {len(built)} items  {dict(c)}  difficulty {dict(sorted(dc.items()))}")
        allq += built
    # lint
    singles = [q for q in allq if q["format"] == "single"]
    longest = [q["id"] for q in singles if all(len(q["options"][q["correct"][0]]) > len(o)
                                               for j, o in enumerate(q["options"]) if j != q["correct"][0])]
    rw_singles = [q for q in singles if q["section"] == "rw"]
    rw_longest = [i for i in longest if i.startswith("PSAT-RW")]
    print(f"key strictly longest: {len(longest)}/{len(singles)} = {100 * len(longest) / len(singles):.1f}% "
          f"(R&W {len(rw_longest)}/{len(rw_singles)} = {100 * len(rw_longest) / max(1, len(rw_singles)):.1f}%)")
    pos = Counter(q["correct"][0] for q in singles)
    print("key positions:", dict(sorted(pos.items())))
    for q in allq:
        text = json.dumps(q, ensure_ascii=False)
        if "—" in text or "–" in text or "’" in text or "“" in text:
            print("  lint: dash or curly quote in", q["id"])
        if q["format"] == "numeric" and "Type the number only" not in q["stem"]:
            print("  lint: numeric stem without 'Type the number only'", q["id"])
        if q["format"] == "single" and len(set(q["options"])) != len(q["options"]):
            print("  lint: duplicate options", q["id"])
    stems = Counter((q.get("passage") or "") + q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  lint: repeated item text", s[:60])
    print(f"total {len(allq)} items, {sum(1 for q in allq if q['format'] == 'numeric')} numeric")


if __name__ == "__main__":
    main()
