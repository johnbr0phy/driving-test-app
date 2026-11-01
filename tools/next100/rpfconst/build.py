#!/usr/bin/env python3
"""Build the RPF Constable CBT v2 bank from per-domain source files.

Usage: python3 -I tools/next100/rpfconst/build.py

Sources are Python data files in tools/next100/rpfconst/<domain>.py (one per drill
domain). Each calls S(test, difficulty, skill, stem, options, explanation)
with the correct option FIRST; the build shuffles options with a seed taken
from the stem, so key positions spread out and stay stable between builds.
test is 1, 2 or 0 (drill only). Every item is four-option single answer, the
only format on the real CBT.

Ids: RPFC-T1-001.., RPFC-T2-.., RPFC-D-... Within a test the items are
grouped by subject (General Awareness, then Arithmetic, then General
Intelligence and Reasoning), with the drill domains interleaved inside
each subject.

Positional options are never shuffled: conclusion, assumption and data
sufficiency option sets are put in their usual order, and items whose
options are all numbers with the same unit are sorted ascending; both get
lockedOrder so the app keeps that order. The key is found by value after
sorting.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "rpfconst"
PREFIX = "RPFC"
SECTION = "cbt"
SUBJECTS = [
    ["rpfconstHistory", "rpfconstGeography", "rpfconstPolity", "rpfconstScience"],
    ["rpfconstArith", "rpfconstMaths"],
    ["rpfconstVerbal", "rpfconstLogical"],
]
FIXED_SETS = [
    ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
    ["Only I is implicit", "Only II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"],
    ["Statement I alone is sufficient", "Statement II alone is sufficient",
     "Either statement alone is sufficient", "Both statements together are needed"],
]
NUM = re.compile(r"^([^\d-]*)(-?\d[\d,]*(?:\.\d+)?)(?:st|nd|rd|th)?(.*)$")


def numeric_order(opts):
    """Return the ascending order of the options if all are numbers with the
    same prefix and unit, else None."""
    parsed = [NUM.match(o) for o in opts]
    if not all(parsed):
        return None
    if len({(m.group(1), m.group(3)) for m in parsed}) != 1:
        return None
    vals = [float(m.group(2).replace(",", "")) for m in parsed]
    if len(set(vals)) != len(vals):
        return None
    return sorted(range(len(opts)), key=lambda i: vals[i])
DOMAINS = [d for s in SUBJECTS for d in s]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


def shuffled(q):
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order, locked = None, False
    for fixed in FIXED_SETS:
        if sorted(opts) == sorted(fixed):
            order, locked = [opts.index(f) for f in fixed], True
    if order is None:
        order = numeric_order(opts)
        locked = order is not None
    if order is None:
        order = list(range(len(opts)))
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
    g = {"S": S, "__name__": "rpfconst_source"}
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
    nums = [q for q in out if q.get("lockedOrder") and numeric_order(q["options"]) is not None]
    ends = sum(1 for q in nums if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  sorted number items: {len(nums)}, key in an end slot: {ends} = {ends / max(1, len(nums)):.0%}")
    print("  locked items:", sum(1 for q in out if q.get("lockedOrder")))
    for s, n in Counter(q["stem"] for q in allq).items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
