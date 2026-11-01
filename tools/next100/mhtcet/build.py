#!/usr/bin/env python3
"""Build the MHT-CET (PCM group) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/mhtcet/build.py

Copied from tools/next100/agniveervayu/build.py (sections, KaTeX maths, sorted
number options). Sources are Python data files in tools/next100/mhtcet/<domain>.py
(one per drill domain). Each file defines ITEMS with the helper
S(test, difficulty, skill, stem, options, explanation, ans=None); the domain
comes from the file name. test is 1, 2 or 0 (drill only). When ans is given
(a number the source computes in Python), the build asserts that the first
option, the key, has that value.

Authoring convention: the correct option is written first. The build shuffles
options with a seed taken from the stem, so key positions spread out and stay
stable from build to build. Options that are all numbers with one shared unit
(plain numbers, fractions, or KaTeX such as $3.77 \\times 10^{-3}$, $\\frac{\\pi}{4}$,
$12\\pi$) are sorted ascending and get lockedOrder, so the runtime does not
shuffle them either.

Ids: MHTCET-T1-001.., MHTCET-T2-001.., MHTCET-D-001... Section 'pc' (the real
Paper II, Physics then Chemistry) and section 'maths' (the real Paper I).
Within Physics, Chemistry and Mathematics the domains are interleaved.

Lint (printed, never fatal): key strictly longest, em or en dashes, "all/none
of the above", duplicate options or stems, unbalanced "$".
"""
import hashlib, json, math, os, random, re
from collections import Counter

EXAM = "mhtcet"
PREFIX = "MHTCET"
SECTIONS = [
    ("pc", [["mhtcetPhyMech", "mhtcetPhyWaves", "mhtcetPhyElec"],
            ["mhtcetChemPhys", "mhtcetChemInorg", "mhtcetChemOrg"]]),
    ("maths", [["mhtcetMathAlg", "mhtcetMathCalc"]]),
]
PARTS = [p for _, ps in SECTIONS for p in ps]
SECTION_OF = {d: s for s, ps in SECTIONS for p in ps for d in p}
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl, ans=None):
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if ans is not None:
        q["_ans"] = ans
    return q


UNIT = re.compile(r"^[A-Za-z°%Ωµμ²³/·\s]*$")
SAFE = re.compile(r"^[0-9.+\-*/() ]*(?:(?:sqrt|pi)[0-9.+\-*/() ]*)*$")


def _expr(s):
    """Turn a small KaTeX or plain number into a Python expression, or None."""
    s = s.strip()
    s = re.sub(r"\\frac\{([^{}]+)\}\{([^{}]+)\}", r"((\1)/(\2))", s)
    s = re.sub(r"\\sqrt\{([^{}]+)\}", r"sqrt(\1)", s)
    s = re.sub(r"\^\{([^{}]+)\}", r"**(\1)", s)
    s = re.sub(r"\^(\d)", r"**\1", s)
    s = s.replace("\\times", "*").replace("\\cdot", "*").replace("\\pi", "pi").replace("√", "sqrt")
    s = s.replace("−", "-")
    s = re.sub(r"(\d|\))\s*(sqrt|pi|\()", r"\1*\2", s)
    s = re.sub(r"(pi)\s*(\d|\()", r"\1*\2", s)
    if not s or not SAFE.match(s.replace("**", "*")):
        return None
    if not re.search(r"\d|pi", s):
        return None
    return s


def _num(o):
    """(value, unit) for a number option such as '50 m', '-0.85 eV', '7/2',
    '$3.77 \\times 10^{-3}$ T' or '$\\frac{\\pi}{4}$', else None."""
    o = o.strip()
    m = re.match(r"^\$([^$]+)\$\s*(.*)$", o)
    if m:
        body, unit = m.group(1), m.group(2)
    else:
        m = re.match(r"^([+\-−]?\d+(?:\.\d+)?(?:/\d+)?)\s*(.*)$", o)
        if not m:
            return None
        body, unit = m.group(1), m.group(2)
    if not UNIT.match(unit):
        return None
    e = _expr(body)
    if e is None:
        return None
    try:
        v = eval(e, {"__builtins__": {}}, {"sqrt": math.sqrt, "pi": math.pi})
    except Exception:
        return None
    return float(v), unit.strip()


def numeric(opts):
    vals = [_num(o) for o in opts]
    if any(v is None for v in vals) or len({u for _, u in vals}) != 1:
        return None
    nums = [v for v, _ in vals]
    if len(set(round(x, 12) for x in nums)) != len(nums):
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
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any(t.count("$") % 2 for t in texts):
        warn.append("odd number of $ (unbalanced KaTeX)")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if len(q["options"][0]) > max(len(o) for o in q["options"][1:]):
        warn.append("key longest")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    if "_ans" in q:
        v = _num(q["options"][0])
        assert v is not None, f"{where}: ans given but key is not a number"
        assert abs(v[0] - q["_ans"]) <= 1e-6 + 0.006 * abs(q["_ans"]), f"{where}: key {v[0]} != computed {q['_ans']}"
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "mhtcet_source", "sqrt": math.sqrt, "pi": math.pi, "math": math}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
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
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION_OF[q["domain"]], "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
            for k in ("stem", "options", "correct", "lockedOrder", "explanation"):
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
    print("  domains:", DOMAINS)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    numq = [q for q in out if numeric(q["options"]) is not None]
    ends = sum(1 for q in numq if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  all-number items: {len(numq)}, key in an end slot: {ends} = {ends / max(1, len(numq)):.0%}")
    for q in numq:
        v = numeric(q["options"])
        assert v == sorted(v), q["id"]
    print("  computed keys asserted:", sum(1 for q in allq if "_ans" in q))
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        for w in warnings:
            if "key longest" in w:
                print("  LONGEST", w)


if __name__ == "__main__":
    build()
