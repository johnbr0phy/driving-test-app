#!/usr/bin/env python3
"""Build the COBIT 2019 Foundation v2 bank.

Usage: python3 -I tools/next100/cobit/build.py

Sources are Python data files, one per domain, in tools/next100/cobit/<domain>.py.
Each holds ITEMS built with:
  Q(test, difficulty, skill, stem, options, explanation)   single answer, key first
test is 1, 2 or 0 (drill only). The build moves the key to a slot chosen from a
seed taken from the stem (balanced over A to D, never a fixed cycle) and shuffles
the wrong options; the app shuffles again at runtime.

Ids follow tools/build_v2_bank.py: each practice test interleaves its domains,
COBIT-T1-001.., COBIT-T2-.., COBIT-D-...
"""
import hashlib, json, os, random, runpy, re
from collections import Counter

EXAM = "cobit"
PREFIX = "COBIT"
SECTIONS = {"cobit": ["cobitIntro", "cobitPrinciples", "cobitComponents", "cobitCascade",
                      "cobitObjectives", "cobitPerformance", "cobitDesign",
                      "cobitImplementation", "cobitBusinessCase"]}
PER_TEST = {"cobitIntro": 9, "cobitPrinciples": 10, "cobitComponents": 13, "cobitCascade": 10,
            "cobitObjectives": 17, "cobitPerformance": 3, "cobitDesign": 5,
            "cobitImplementation": 6, "cobitBusinessCase": 2}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def Q(test, difficulty, skill, stem, options, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "single",
            "stem": stem, "options": options, "correct": [0], "explanation": explanation}


def place(q, slot):
    rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
    wrong = q["options"][1:]
    rng.shuffle(wrong)
    opts = wrong[:slot] + [q["options"][0]] + wrong[slot:]
    out = dict(q)
    out["options"] = opts
    out["correct"] = [slot]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–‘’“”"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    if not q["stem"].rstrip().endswith(("?", ":")):
        warn.append("stem must end in ? or :")
    return [f"{where}: {w}" for w in warn]


def build():
    domains = [d for ds in SECTIONS.values() for d in ds]
    items, warnings, stems = {}, [], Counter()
    for d in domains:
        src = runpy.run_path(os.path.join(HERE, f"{d}.py"), init_globals={"Q": Q})["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            stems[q["stem"]] += 1
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
        items[d] = src
        for t in (1, 2):
            n = sum(1 for q in src if q["test"] == t)
            if n != PER_TEST[d]:
                warnings.append(f"{d} test {t}: {n} items, want {PER_TEST[d]}")
    warnings += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
    # Balanced key slots: a stem-seeded shuffle of a list with each slot equally often.
    allq = [q for d in domains for q in items[d]]
    slots = [i % 4 for i in range(len(allq))]
    random.Random(2019).shuffle(slots)
    slot_of = {id(q): s for q, s in zip(sorted(allq, key=lambda q: hashlib.sha256(q["stem"].encode()).hexdigest()), slots)}
    out = []
    tests = [1, 2, 0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        n = 0
        for section, sec_domains in SECTIONS.items():
            blocks = []
            for di, d in enumerate(sec_domains):
                mine = [q for q in items[d] if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                q = place(q, slot_of[id(q)])
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                        "skill": q["skill"]}
                item.update({k: q[k] for k in ("stem", "options", "correct", "explanation")})
                out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in tests:
        row = [per[(test, d)] for d in domains]
        print(f"  test {test}: {row} = {sum(row)}")
    print("  pools:", [sum(1 for q in out if q["domain"] == d) for d in domains])
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    longest = [q for q in out
               if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0])]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {100 * len(longest) / len(out):.1f}%")
    over = [q for q in out if len(q["options"][q["correct"][0]]) > 1.2 * sum(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]) / 3]
    print(f"  key >120% of wrong average: {len(over)}/{len(out)} = {100 * len(over) / len(out):.1f}%")
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
