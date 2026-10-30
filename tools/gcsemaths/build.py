#!/usr/bin/env python3
"""Build data/v2/gcsemaths/questions.json from tools/gcsemaths/q_*.py.

Usage (from the repo root): python3 tools/gcsemaths/build.py

Each practice test is three shortened papers like the real Foundation tier:
p1 non-calculator, p2 and p3 calculator, 20 items each (5 number, 4 algebra,
5 ratio, 3 geometry, 3 statistics and probability). Drill-only items (test 0)
are filed under the paper their domain's drill draws from (DRILL_PAPER), so a
drill's pool is that paper's Test 1 items in its domain plus its drill-only
items. Ids interleave the domains inside each paper the same way
tools/build_v2_bank.py does (the session orders a paper by id), and every
unlocked single-answer item has its options rotated so the key's letter
cycles A, B, C, D through the bank.
"""
import importlib, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

PREFIX = "GCSEM"
MODULES = ["q_number", "q_algebra", "q_ratio", "q_geometry", "q_stats"]
DRILL_PAPER = {"gcseNumber": 1, "gcseAlgebra": 1, "gcseRatio": 2, "gcseGeometry": 3, "gcseStats": 3}
PER_PAPER = {"gcseNumber": 5, "gcseAlgebra": 4, "gcseRatio": 5, "gcseGeometry": 3, "gcseStats": 3}
CALCULATOR = {1: False, 2: True, 3: True}
BANNED = ["all of the above", "none of the above", "—", "’", "“", "”"]


def load():
    items = {}
    for m in MODULES:
        mod = importlib.import_module(m)
        for q in mod.ITEMS:
            q = dict(q)
            q["domain"] = mod.DOMAIN
            if q["test"] == 0:
                q["paper"] = DRILL_PAPER[mod.DOMAIN]
            items.setdefault(mod.DOMAIN, []).append(q)
    return items


def check(items):
    problems = []
    for d, qs in items.items():
        for t in (1, 2):
            for p in (1, 2, 3):
                n = sum(1 for q in qs if q["test"] == t and q["paper"] == p)
                if n != PER_PAPER[d]:
                    problems.append(f"{d} test {t} paper {p}: {n} items, want {PER_PAPER[d]}")
        for q in qs:
            text = " ".join([q["stem"], q["explanation"], q.get("passage", ""), *q.get("options", [])])
            for b in BANNED:
                if b in text.lower():
                    problems.append(f"{d}: banned text {b!r} in {q['stem'][:50]}")
            if q["format"] == "single" and not q.get("lockedOrder"):
                opts, key = q["options"], q["correct"][0]
                if len(opts[key]) > max(len(o) for i, o in enumerate(opts) if i != key) + 6:
                    problems.append(f"{d}: key much longer than distractors: {q['stem'][:50]}")
    return problems


def build():
    items = load()
    problems = check(items)
    out, rot = [], 0
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for paper in (1, 2, 3):
            blocks = []
            for di, d in enumerate(DRILL_PAPER):
                mine = [q for q in items[d] if q["test"] == test and q["paper"] == paper]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": f"p{paper}", "test": test, "module": 1,
                        "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
                if q.get("basics"):
                    item["basics"] = q["basics"]
                if q.get("passage"):
                    item["passage"] = q["passage"]
                item["stem"] = q["stem"]
                if q["format"] == "single":
                    opts, key = list(q["options"]), q["correct"][0]
                    if not q.get("lockedOrder"):
                        target = rot % len(opts)
                        rot += 1
                        k = opts.pop(key)
                        rest = opts
                        opts = rest[:target] + [k] + rest[target:]
                        key = target
                    item["options"] = opts
                    item["correct"] = [key]
                    if q.get("lockedOrder"):
                        item["lockedOrder"] = True
                else:
                    item["numeric"] = q["numeric"]
                item["calculator"] = CALCULATOR[paper]
                item["explanation"] = q["explanation"]
                out.append(item)
    dst = "data/v2/gcsemaths/questions.json"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    by = {}
    for q in out:
        by.setdefault((q["test"], q["domain"]), 0)
        by[(q["test"], q["domain"])] += 1
    print(f"gcsemaths: wrote {len(out)} questions -> {dst}")
    for d in DRILL_PAPER:
        print(f"  {d}: test1 {by.get((1, d), 0)}, test2 {by.get((2, d), 0)}, drill-only {by.get((0, d), 0)}")
    keys = {}
    for q in out:
        if q["format"] == "single":
            keys[q["correct"][0]] = keys.get(q["correct"][0], 0) + 1
    print("  single-answer key positions:", dict(sorted(keys.items())))
    for p in problems:
        print("  PROBLEM:", p)
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    build()
