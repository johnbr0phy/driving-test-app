#!/usr/bin/env python3
"""Build the MP Police Constable v2 bank from per-domain source files.

Usage: python3 -I tools/next100/mppolice/build.py

Sources are Python data files in tools/next100/mppolice/<domain>.py (one per drill
domain). Each calls S(test, difficulty, skill, stem, options, explanation)
with the correct option FIRST; the build shuffles options with a seed taken
from the stem, so key positions spread out and stay stable between builds.
test is 1, 2 or 0 (drill only). Every item is four-option single answer, the
only format on the real paper.

Ids: MPPOLICE-T1-001.., MPPOLICE-T2-.., MPPOLICE-D-... Within a test the items
are grouped in the order of the real paper's three parts (A: General Knowledge
and Reasoning, B: Intellectual and Mental Ability, C: Science and Simple
Arithmetic), with the drill domains of each group interleaved.

Option sets whose order carries meaning (syllogism conclusions) and all-number
option sets (sorted ascending) keep a fixed order and get lockedOrder.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "mppolice"
PREFIX = "MPPOLICE"
SECTION = "paper"
SUBJECTS = [
    ["mppIndia", "mppState", "mppComputer"],   # Part A: General Knowledge
    ["mppVerbal"],                             # Part A: Reasoning
    ["mppLogical", "mppMental"],               # Part B: Intellectual and Mental Ability
    ["mppScience"],                            # Part C: Science
    ["mppArith"],                              # Part C: Simple Arithmetic
]
DOMAINS = [d for s in SUBJECTS for d in s]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


# Option sets whose order carries meaning: shown in this natural order and
# marked lockedOrder, so neither the build nor the app shuffles them.
NATURAL_ORDERS = [
    ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
    ["Only I is implicit", "Only II is implicit", "Both are implicit", "Neither is implicit"],
]


NUM = re.compile(r"^(₹)?([\d,]*\.?\d+)(st|nd|rd|th)?(.*)$")


def numeric_order(opts):
    """Ascending order when every option is a number with the same prefix and
    unit (ordinal endings count as the same), else None."""
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({(m.group(1), m.group(4)) for m in parts}) != 1:
        return None
    vals = [float(m.group(2).replace(",", "")) for m in parts]
    return sorted(range(len(opts)), key=lambda i: vals[i])


def shuffled(q):
    opts = q["options"]
    out = dict(q)
    num = numeric_order(opts)
    if num is not None:
        order = num
        out["lockedOrder"] = True
    else:
        order = None
    for natural in ([] if num is not None else NATURAL_ORDERS):
        if sorted(opts) == sorted(natural):
            order = [opts.index(o) for o in natural]
            out["lockedOrder"] = True
            break
    else:
        if order is not None:
            out["options"] = [opts[i] for i in order]
            out["correct"] = [order.index(0)]
            return out
        seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
        order = list(range(len(opts)))
        random.Random(seed).shuffle(order)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if any("$" in t for t in texts):
        warn.append("dollar sign (use the rupee sign)")
    key = len(q["options"][0])
    if key > max(len(o) for o in q["options"][1:]):
        warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "mppolice_source"}
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
        for subject in SUBJECTS:
            blocks = []
            for di, d in enumerate(subject):
                mine = [q for q in items[d] if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            ordered += [b[2] for b in blocks]
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            out.append({"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                        "skill": q["skill"], "stem": q["stem"], "options": q["options"],
                        "correct": q["correct"], **({"lockedOrder": True} if q.get("lockedOrder") else {}),
                        "explanation": q["explanation"]})
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
    for s, n in Counter(q["stem"] for q in allq).items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
