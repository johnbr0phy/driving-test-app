#!/usr/bin/env python3
"""Build the RRB ALP CBT 1 v2 bank from per-domain source files.

Usage: python3 -I tools/next100/rrbalp/build.py

Sources are Python data files in tools/next100/rrbalp/<domain>.py (one per
drill domain). Each calls S(test, difficulty, skill, stem, options,
explanation) with the correct option FIRST; the build shuffles options with a
seed taken from the stem, so key positions spread out and stay stable between
builds. test is 1, 2 or 0 (drill only). Every item is four-option single
answer, the only format on the real CBT.

Options whose order carries meaning are fixed and get lockedOrder, so the
app does not shuffle them either:
- all-number options (same unit on every option) are sorted ascending, and
  the key is found again by value after sorting;
- the conclusion and assumption sets (Only I / Only II / Both / Neither)
  keep that order.

Ids: RRBALP-T1-001.., RRBALP-T2-.., RRBALP-D-... Within a test the items are
grouped by subject (Mathematics, then General Intelligence and Reasoning,
then General Science), with the drill domains interleaved inside each
subject.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "rrbalp"
PREFIX = "RRBALP"
SECTION = "cbt"
SUBJECTS = [
    ["rrbalpArithmetic", "rrbalpMaths"],
    ["rrbalpVerbal", "rrbalpLogical"],
    ["rrbalpPhysics", "rrbalpChemistry", "rrbalpBiology"],
]
DOMAINS = [d for s in SUBJECTS for d in s]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


CONCLUSIONS = ["Only conclusion I follows", "Only conclusion II follows",
               "Both I and II follow", "Neither I nor II follows"]
ASSUMPTIONS = ["Only assumption I is implicit", "Only assumption II is implicit",
               "Both I and II are implicit", "Neither I nor II is implicit"]
NUM = re.compile(r"^(₹\s?)?(-?\d[\d,]*(?:\.\d+)?)(?:\s*/\s*(\d+))?(.*)$")


def numeric(opts):
    """Values of the options if every option is a number with the same prefix
    and unit, else None."""
    vals, tails = [], set()
    for o in opts:
        m = NUM.match(o.strip())
        if not m:
            return None
        tail = m.group(4).strip()
        if re.search(r"\d", tail):
            return None
        v = float(m.group(2).replace(",", ""))
        if m.group(3):
            v /= float(m.group(3))
        vals.append(v)
        tails.add(((m.group(1) or "").strip(), tail))
    if len(tails) != 1 or len(set(vals)) != len(vals):
        return None
    return vals


def shuffled(q):
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    vals = numeric(opts)
    fixed = next((f for f in (CONCLUSIONS, ASSUMPTIONS) if sorted(opts) == sorted(f)), None)
    if fixed:
        order = [opts.index(c) for c in fixed]
        locked = True
    elif vals is not None:
        order = sorted(order, key=lambda i: vals[i])
        locked = True
    else:
        random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    if locked:
        out["lockedOrder"] = True
        if vals is not None:
            assert vals[order[out["correct"][0]]] == vals[0]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if any("$" in t for t in texts):
        warn.append("dollar sign (KaTeX delimiter)")
    key = len(q["options"][0])
    if key > max(len(o) for o in q["options"][1:]):
        warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "rrbalp_source"}
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
            row = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                   "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                   "skill": q["skill"], "stem": q["stem"], "options": q["options"],
                   "correct": q["correct"], "explanation": q["explanation"]}
            if q.get("lockedOrder"):
                row["lockedOrder"] = True
            out.append(row)
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
    free = [q for q in out if not q.get("lockedOrder")]
    print("  key positions (shuffled items):", dict(sorted(Counter(q["correct"][0] for q in free).items())))
    nums = [q for q in out if q.get("lockedOrder") and numeric(q["options"]) is not None]
    ends = sum(1 for q in nums if q["correct"][0] in (0, 3))
    if nums:
        print(f"  sorted number items: {len(nums)}, key in an end slot {ends} = {ends / len(nums):.0%}")
    for s, n in Counter(q["stem"] for q in allq).items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
