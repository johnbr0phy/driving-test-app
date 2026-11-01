#!/usr/bin/env python3
"""Build the Philippine Civil Service Exam (CSE-PPT) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/phcse/build.py

Sources are Python data files in tools/next100/phcse/<domain>.py (one per
drill domain). Each defines ITEMS with S(test, difficulty, skill, stem,
options, explanation), the correct option FIRST. The build shuffles options
with a seed taken from the stem, so key positions spread out and stay stable
between builds. test is 1 (Practice Test 1, Professional level), 2 (Practice
Test 2, Subprofessional level, held out of the drills) or 0 (drill only).

Options keep a fixed order (natural order plus lockedOrder) when the order
carries meaning: all-number options (sorted ascending, with the same unit or
peso sign on each) and the four "conclusion I / II / both / neither" options.

Ids: PHCSE-T1-001.., PHCSE-T2-.., PHCSE-D-... Within a test the items run by
part: Verbal Ability, then Analytical Ability (Test 1) or Clerical Ability
(Test 2), then Numerical Ability, then General Information, the drill domains
of each part interleaved.

Lint (printed, never fatal): key strictly longest, em or en dashes, a "$"
(KaTeX delimiter; use the peso sign), "all/none of the above", duplicate
options or stems.
"""
import hashlib, json, os, random, re
from collections import Counter
from fractions import Fraction

EXAM = "phcse"
PREFIX = "PHCSE"
SECTION = "cse"
PARTS = [
    ["phcseGrammar", "phcseVocab", "phcseReading"],
    ["phcseAnalytical", "phcseClerical"],
    ["phcseNumbers", "phcseWordProblems"],
    ["phcseConstitution", "phcsePublicService"],
]
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))

CONCLUSIONS = ["Only conclusion I follows", "Only conclusion II follows",
               "Both I and II follow", "Neither I nor II follows"]
NUM = re.compile(r"^(₱\s?)?(-?\d[\d,]*(?:\.\d+)?(?:/\d+)?)(.*)$")


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


def numeric_value(o):
    m = NUM.match(o)
    if not m:
        return None
    raw = m.group(2).replace(",", "")
    try:
        return Fraction(raw), (m.group(1) or "") + "|" + m.group(3)
    except ValueError:
        return None


def shuffled(q):
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    vals = [numeric_value(o) for o in opts]
    if sorted(opts) == sorted(CONCLUSIONS):
        order = [opts.index(c) for c in CONCLUSIONS]
        locked = True
    elif all(vals) and len({v[1] for v in vals}) == 1:
        order = sorted(order, key=lambda i: vals[i][0])
        locked = True
    else:
        random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    if locked:
        out["lockedOrder"] = True
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("$" in t for t in texts):
        warn.append("dollar sign (use the peso sign)")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    key = len(q["options"][0])
    if key > max(len(o) for o in q["options"][1:]):
        warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "phcse_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:60]!r}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        ordered = []
        for part in PARTS:
            blocks = []
            for di, d in enumerate(part):
                mine = [q for q in items[d] if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            ordered += [b[2] for b in blocks]
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                    "skill": q["skill"], "stem": q["stem"], "options": q["options"],
                    "correct": q["correct"]}
            if q.get("lockedOrder"):
                item["lockedOrder"] = True
            item["explanation"] = q["explanation"]
            out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    print("  locked:", sum(1 for q in out if q.get("lockedOrder")))
    for s, n in Counter(q["stem"] for q in allq).items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
