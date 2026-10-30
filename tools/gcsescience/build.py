#!/usr/bin/env python3
"""Build the GCSE Combined Science v2 bank.

Usage: python3 -I tools/gcsescience/build.py   (run from the repo root)

Sources are the six domain files beside this script (bio1.py ... phys2.py),
written with the helpers in q.py. Ids are assigned like tools/build_v2_bank.py
so each practice test interleaves its two domains per section (the session
builder orders a test by id): GCSES-T1-001.., GCSES-T2-001.., GCSES-D-001...
Single-answer keys are written first in the sources and rotated here so the
key letter is spread evenly; "Choose two" keys are placed deterministically.
"""
import json, os, random, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import bio1, bio2, chem1, chem2, phys1, phys2  # noqa: E402

PREFIX = "GCSES"
SECTIONS = {"biology": [bio1, bio2], "chemistry": [chem1, chem2], "physics": [phys1, phys2]}
DST = "data/v2/gcsescience/questions.json"


def place(item, counter):
    """Turn _keys/_wrongs into options + correct."""
    if "_keys" not in item:
        return item
    keys, wrongs = item.pop("_keys"), item.pop("_wrongs")
    n = len(keys) + len(wrongs)
    if item["format"] == "single":
        pos = counter % n
        opts = list(wrongs)
        opts.insert(pos, keys[0])
        item["options"], item["correct"] = opts, [pos]
    else:
        rng = random.Random(item["stem"])
        slots = sorted(rng.sample(range(n), len(keys)))
        opts, ki, wi = [], 0, 0
        for i in range(n):
            if i in slots:
                opts.append(keys[ki]); ki += 1
            else:
                opts.append(wrongs[wi]); wi += 1
        item["options"], item["correct"] = opts, slots
    return item


def build():
    out, counter = [], 0
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, mods in SECTIONS.items():
            blocks = []
            for di, mod in enumerate(mods):
                mine = [dict(q, domain=mod.DOMAIN) for q in mod.ITEMS if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                counter += 1
                q = place(dict(q), counter)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q.pop("domain"), "skill": q.pop("skill"), "difficulty": q.pop("difficulty"),
                        "format": q.pop("format")}
                q.pop("test")
                item.update(q)
                out.append(item)
    os.makedirs(os.path.dirname(DST), exist_ok=True)
    with open(DST, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    by = {}
    for q in out:
        by.setdefault((q["domain"], q["test"]), 0)
        by[(q["domain"], q["test"])] += 1
    print(f"wrote {len(out)} questions -> {DST}")
    for k in sorted(by):
        print(f"  {k[0]:22} test {k[1]}: {by[k]}")


if __name__ == "__main__":
    build()
