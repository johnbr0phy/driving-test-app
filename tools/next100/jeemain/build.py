#!/usr/bin/env python3
"""Build the JEE Main Paper 1 (B.E./B.Tech.) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/jeemain/build.py

Copied from tools/next100/agniveervayu/build.py (sections, KaTeX, sorted
number options), with the typed numeric items of tools/gcsehigher. Three
sections, one per subject in the bulletin's order: maths, phy, chem. Each
subject in a practice test has 25 questions like the real paper: Section A,
20 multiple choice, then Section B, 5 numerical value items whose answer is an
integer typed on a keypad.

Sources are Python data files in tools/next100/jeemain/<domain>.py, one per
drill domain. Each defines ITEMS with two helpers:
  S(test, difficulty, skill, stem, options, explanation)  multiple choice,
      the correct option written first;
  N(test, difficulty, skill, stem, value, expected, explanation)  numerical
      value: value is computed in Python in the source and must equal the
      integer expected (asserted here), so the key is never typed by hand.
test is 1, 2 or 0 (drill only).

Option order: the build shuffles options with a seed from the stem. Options
whose order carries meaning get a fixed order and lockedOrder:
- all-number options (one shared unit, fractions allowed, $..$ allowed) are
  sorted ascending;
- the four Statement I / Statement II verdicts keep the NTA order.

Ids: JEEMAIN-T1-001.., -T2-.., -D-... In each section the multiple-choice
items come first (domains interleaved), then the numerical value items.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems, an unbalanced "$".
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "jeemain"
PREFIX = "JEEMAIN"
SECTIONS = [
    ("maths", ["jeemainAlgebra", "jeemainCalculus", "jeemainCoordGeo"]),
    ("phy", ["jeemainMechanics", "jeemainElectro", "jeemainOpticsModern"]),
    ("chem", ["jeemainPhysical", "jeemainInorganic", "jeemainOrganic"]),
]
SECTION_OF = {d: s for s, ds in SECTIONS for d in ds}
DOMAINS = [d for _, ds in SECTIONS for d in ds]
# Per practice test: (multiple choice, numerical value) per domain.
PLAN = {
    "jeemainAlgebra": (7, 2), "jeemainCalculus": (7, 2), "jeemainCoordGeo": (6, 1),
    "jeemainMechanics": (8, 2), "jeemainElectro": (6, 2), "jeemainOpticsModern": (6, 1),
    "jeemainPhysical": (6, 3), "jeemainInorganic": (7, 1), "jeemainOrganic": (7, 1),
}
DRILL_ONLY = 6
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
NUM_TAIL = " Type the integer only."


def S(t, d, skill, stem, opts, expl):
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": list(opts), "correct": [0], "explanation": expl}


def N(t, d, skill, stem, value, expected, expl):
    assert abs(value - expected) < 1e-9, (stem[:60], value, expected)
    assert isinstance(expected, int) and expected >= 0, (stem[:60], expected)
    if NUM_TAIL.strip() not in stem:
        stem = stem.rstrip() + NUM_TAIL
    return {"test": t, "difficulty": d, "skill": skill, "format": "numeric", "stem": stem,
            "numeric": {"answers": [str(expected)], "tolerance": 0, "wholeNumber": True}, "explanation": expl}


STATEMENTS = [
    "Both Statement I and Statement II are true",
    "Both Statement I and Statement II are false",
    "Statement I is true but Statement II is false",
    "Statement I is false but Statement II is true",
]

NUM = re.compile(r"^\$?([+-]?\d+(?:\.\d+)?(?:/\d+)?)\$?\s*(.*)$")


def _num(s):
    m = NUM.match(s.strip())
    if not m:
        return None
    v = m.group(1)
    if "/" in v:
        a, b = v.split("/")
        return float(a) / float(b), m.group(2)
    return float(v), m.group(2)


def numeric(opts):
    vals = [_num(o) for o in opts]
    if any(v is None for v in vals) or len({u for _, u in vals}) != 1:
        return None
    nums = [v for v, _ in vals]
    if len(set(nums)) != len(nums):
        return None
    return nums


def shuffled(q):
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    nums = numeric(opts)
    if nums is not None:
        order = sorted(range(len(opts)), key=lambda i: nums[i])
        locked = True
    elif sorted(opts) == sorted(STATEMENTS):
        order = [opts.index(c) for c in STATEMENTS]
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
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any(t.count("$") % 2 for t in texts):
        warn.append("odd number of $ (unbalanced KaTeX)")
    if q["format"] == "single":
        if any("of the above" in t.lower() for t in q["options"]):
            warn.append("all/none of the above")
        if len(q["options"]) != 4:
            warn.append(f"{len(q['options'])} options")
        if len(q["options"][0]) > max(len(o) for o in q["options"][1:]):
            warn.append("key longest")
        if len(set(q["options"])) != len(q["options"]):
            warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "N": N, "STATEMENTS": STATEMENTS, "__name__": "jeemain_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def interleave(groups):
    blocks = []
    for di, mine in enumerate(groups):
        for i, q in enumerate(mine):
            blocks.append(((i + 0.5) / len(mine), di, q))
    blocks.sort(key=lambda b: (b[0], b[1]))
    return [b[2] for b in blocks]


def build():
    items, warnings, problems = {}, [], []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
        items[d] = src
        mc, nv = PLAN[d]
        for t in (1, 2):
            got = Counter(q["format"] for q in src if q["test"] == t)
            if got["single"] != mc or got["numeric"] != nv:
                problems.append(f"{d} test {t}: {got['single']} MCQ + {got['numeric']} numeric, want {mc} + {nv}")
        n0 = sum(1 for q in src if q["test"] == 0)
        if n0 != DRILL_ONLY:
            problems.append(f"{d}: {n0} drill-only items, want {DRILL_ONLY}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        ordered = []
        for _, ds in SECTIONS:
            for fmt in ("single", "numeric"):
                ordered += interleave([[q for q in items[d] if q["test"] == test and q["format"] == fmt] for d in ds])
        for n, q in enumerate(ordered, 1):
            if q["format"] == "single":
                q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION_OF[q["domain"]], "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
            for k in ("stem", "options", "correct", "lockedOrder", "numeric", "explanation"):
                if k in q:
                    item[k] = q[k]
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
    allq = [q for qs in items.values() for q in qs if q["format"] == "single"]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  multiple choice: {len(allq)}, numerical value: {sum(1 for q in out if q['format'] == 'numeric')}")
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    nonnum = [q for q in allq if numeric(q["options"]) is None]
    lng = sum(1 for q in nonnum if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest (non-number items): {lng}/{len(nonnum)} = {lng / len(nonnum):.0%}")
    singles = [q for q in out if q["format"] == "single"]
    keys = Counter(q["correct"][0] for q in singles)
    print("  key positions:", dict(sorted(keys.items())))
    numq = [q for q in singles if numeric(q["options"]) is not None]
    ends = sum(1 for q in numq if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  all-number items: {len(numq)}, key in an end slot: {ends} = {ends / max(1, len(numq)):.0%}")
    for q in numq:
        v = numeric(q["options"])
        assert v == sorted(v), q["id"]
    stems = Counter(q["stem"] for qs in items.values() for q in qs)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)
    for p in problems:
        print("  PROBLEM", p)


if __name__ == "__main__":
    build()
