#!/usr/bin/env python3
"""Build the CUET-UG General Aptitude Test v2 bank from per-domain sources.

Usage: python3 -I tools/next100/cuet/build.py

Sources are Python data files in tools/next100/cuet/<domain>.py (one per
drill domain). Each defines ITEMS with the helper S(test, difficulty, skill,
stem, options, explanation); the domain comes from the file name. test is 1,
2 or 0 (drill only).

Authoring convention (as in tools/ssccgl and tools/next100/delhipolice): the
correct option is written first. The build shuffles options with a seed taken
from the stem, so key positions spread out and stay stable from build to
build. Options whose order carries meaning get a fixed order and lockedOrder:
the statement-conclusion, statement-assumption and course-of-action sets in
I / II / both / neither order, and all-number options (same prefix and unit) sorted ascending.
After sorting, the build checks that the marked option still holds the value
written first.

Ids: CUET-T1-001.., -T2-.., -D-... The real paper has no fixed section order,
so a test runs in the syllabus order (general knowledge, general mental
ability, numerical ability, quantitative reasoning, logical and analytical
reasoning), the drill domains of each part interleaved.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "cuet"
PREFIX = "CUET"
SECTION = "gat"
PARTS = [
    ["cuetHistory", "cuetGeoPolity", "cuetScience"],
    ["cuetMental"],
    ["cuetNumerical"],
    ["cuetQuant"],
    ["cuetLogical", "cuetAnalytical"],
]
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


CONCLUSIONS = ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"]
ASSUMPTIONS = ["Only assumption I is implicit", "Only assumption II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"]
COURSES = ["Only course I follows", "Only course II follows", "Both I and II follow", "Neither I nor II follows"]
FIXED = [CONCLUSIONS, ASSUMPTIONS, COURSES]
NUM = re.compile(r"^(₹|About )?([-−]?\d[\d,]*(?:\.\d+)?)(?:/(\d+))?(\s*[A-Za-z/%.°²³ ]*)?$")


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
        units.add(((m.group(1) or ""), (m.group(4) or "").strip().replace("st", "").replace("nd", "").replace("rd", "").replace("th", "")))
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


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("$" in t for t in texts):
        warn.append("dollar sign (KaTeX delimiter)")
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
    g = {"S": S, "__name__": "cuet_source"}
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
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
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
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    locked_num = [q for q in out if q.get("lockedOrder") and numeric_key(q["options"]) is not None]
    ends = sum(1 for q in locked_num if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  locked: {sum(1 for q in out if q.get('lockedOrder'))}; all-number {len(locked_num)}, key in an end slot {ends}")
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
