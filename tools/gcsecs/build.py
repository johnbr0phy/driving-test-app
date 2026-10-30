#!/usr/bin/env python3
"""Build data/v2/gcsecs/questions.json from tools/gcsecs/q_*.py.

Usage (from the repo root): python3 -I tools/gcsecs/build.py

Each q_<domain>.py lists items with the correct option first (see common.py).
This script spreads the keys across positions (single: rotating, multi and
cloze: a seeded shuffle), then assigns ids the same way tools/build_v2_bank.py
does, so each practice test interleaves its domains in id order:
GCSECS-T1-001.., -T2-.., -D-...
"""
import json, os, random, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import q_algorithms, q_programming, q_logic, q_data, q_systems, q_networks, q_impacts  # noqa: E402

PREFIX = "GCSECS"
SECTIONS = {
    "p1": [q_algorithms, q_programming, q_logic],
    "p2": [q_data, q_systems, q_networks, q_impacts],
}


def spread(q, k):
    """Move keys off position 0. k is a running counter for an even spread."""
    rng = random.Random(f"gcsecs-{q['stem'][:60]}")
    f = q["format"]
    if f == "single" and not q.get("lockedOrder"):
        opts = q["options"]
        pos = k % len(opts)
        key = opts.pop(0)
        opts.insert(pos, key)
        q["correct"] = [pos]
    elif f == "multi":
        n = len(q["options"])
        perm = list(range(n))
        rng.shuffle(perm)
        q["options"] = [q["options"][i] for i in perm]
        q["correct"] = sorted(perm.index(c) for c in q["correct"])
    elif f == "cloze":
        correct = []
        for bi, b in enumerate(q["blanks"]):
            pos = (k + bi) % len(b)
            key = b.pop(0)
            b.insert(pos, key)
            correct.append(pos)
        q["correct"] = correct
    return q


def build():
    items = {}
    k = 0
    for mods in SECTIONS.values():
        for m in mods:
            for q in m.ITEMS:
                q["domain"] = m.DOMAIN
                spread(q, k)
                k += 1
            items[m.DOMAIN] = m.ITEMS
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        n = 0
        for section, mods in SECTIONS.items():
            blocks = []
            for di, m in enumerate(mods):
                mine = [q for q in items[m.DOMAIN] if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                item.update({kk: v for kk, v in q.items() if kk not in item and kk != "test"})
                out.append(item)
    dst = "data/v2/gcsecs/questions.json"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"gcsecs: wrote {len(out)} questions -> {dst}")


if __name__ == "__main__":
    build()
