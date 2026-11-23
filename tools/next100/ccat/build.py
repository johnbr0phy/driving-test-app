#!/usr/bin/env python3
"""Build the Criteria Cognitive Aptitude Test (CCAT) practice bank (v2) from per-domain sources.

Usage: python3 -I tools/next100/ccat/build.py

Sources are Python data files in tools/next100/ccat/<domain>.py (one per
drill domain). Each defines ITEMS with the helper S(test, difficulty, skill,
stem, options, explanation); the domain comes from the file name. test is 1,
2 or 0 (drill only); difficulty is 1 (easy), 2 or 3 (hard).

Authoring convention (as in tools/next100/cuet): the correct option is written
first. The build shuffles options with a seed taken from the stem, so key
positions spread out and stay stable from build to build. Options whose order
carries meaning get a fixed order and lockedOrder: True / False / Uncertain
sets, and all-number options (same prefix and unit) sorted ascending. After
sorting, the build checks the marked option still holds the value written
first.

Criteria does not say whether difficulty rises through the CCAT, so each
practice test mixes difficulty, with the domains interleaved through it.
Every item has five options, A to E, like the real test.

Dollar amounts are written with a plain "$" in the sources and escaped to
"\\$" in the JSON (RichText reads $...$ as KaTeX).

Ids: CCAT-T1-001.., -T2-.., -D-...
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "ccat"
PREFIX = "CCAT"
SECTION = "ccat"
DOMAINS = ["ccatVocab", "ccatAnalogy", "ccatSentence", "ccatArith", "ccatWord", "ccatSeries", "ccatLogic", "ccatSpatial"]
PER_TEST = {"ccatVocab": 6, "ccatAnalogy": 6, "ccatSentence": 6, "ccatArith": 6, "ccatWord": 8, "ccatSeries": 5, "ccatLogic": 5, "ccatSpatial": 8}
POOL = {"ccatVocab": 24, "ccatAnalogy": 24, "ccatSentence": 24, "ccatArith": 24, "ccatWord": 32, "ccatSeries": 20, "ccatLogic": 20, "ccatSpatial": 32}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


TFU = ["True", "False", "Uncertain"]
FIXED = [TFU]
NUM = re.compile(r"^(\$|About )?([-−]?\d[\d,]*(?:\.\d+)?)(?:/(\d+))?(\s*[A-Za-z/%.°²³ ]*)?$")


def numeric_key(opts):
    """Values to sort by when every option is a number (or fraction) with the
    same prefix and unit, else None."""
    vals, units = [], set()
    for o in opts:
        m = NUM.match(o.strip())
        if not m:
            return None
        v = float(m.group(2).replace(",", "").replace("−", "-"))
        if m.group(3):
            v /= float(m.group(3))
        vals.append(v)
        units.add(((m.group(1) or ""), (m.group(4) or "").strip()))
    if len(units) != 1 or len(set(vals)) != len(vals):
        return None
    return vals


def shuffled(q):
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    nums = numeric_key(opts)
    fixed = next((f for f in FIXED if sorted(opts) == sorted(f)), None)
    if fixed:
        order = [opts.index(c) for c in fixed]
        locked = True
    elif nums is not None:
        order = sorted(order, key=lambda i: nums[i])
        locked = True
    else:
        random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    assert out["options"][out["correct"][0]] == opts[0], q["stem"]
    if locked:
        out["lockedOrder"] = True
    return out


def esc(s):
    return s.replace("$", "\\$")


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    n = len(q["options"])
    if n != 5 and sorted(q["options"]) not in [sorted(f) for f in FIXED]:
        warn.append(f"{n} options")
    if len(q["options"][0]) > max(len(o) for o in q["options"][1:]):
        warn.append("key longest")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    if q["difficulty"] not in (1, 2, 3):
        warn.append("difficulty")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "ccat_source"}
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
        for t in (1, 2):
            n = sum(1 for q in src if q["test"] == t)
            if n != PER_TEST[d]:
                warnings.append(f"{d}: test {t} has {n}, want {PER_TEST[d]}")
        if len(src) != POOL[d]:
            warnings.append(f"{d}: pool {len(src)}, want {POOL[d]}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        ordered = []
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        ordered += [b[2] for b in blocks]
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"],
                    "stem": esc(q["stem"]), "options": [esc(o) for o in q["options"]], "correct": q["correct"]}
            if q.get("lockedOrder"):
                item["lockedOrder"] = True
            item["explanation"] = esc(q["explanation"])
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
    diffs = Counter((q["test"], q["difficulty"]) for q in out)
    print("  difficulty per test:", {t: [diffs[(t, d)] for d in (1, 2, 3)] for t in (1, 2, 0)})
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    print(f"  locked: {sum(1 for q in out if q.get('lockedOrder'))}")
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
