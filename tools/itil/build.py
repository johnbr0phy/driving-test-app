#!/usr/bin/env python3
"""Build the ITIL 4 Foundation v2 bank.

Usage: python3 -I tools/itil/build.py

Sources are Python data files, one per domain, in tools/itil/<domain>.py.
Each holds ITEMS, a list built with two helpers this script provides:
  Q(test, difficulty, skill, stem, options, explanation)   single answer
  M(test, difficulty, skill, stem, options, explanation)   "Choose two"
test is 1, 2 or 0 (drill only). Authoring convention: the correct option(s)
come first (one for Q, two for M). The build shuffles options with a seed
taken from the stem, so key positions are spread out and stable between
builds; the app shuffles again at runtime.

Ids follow tools/build_v2_bank.py (which this exam does not edit), so each
practice test interleaves its domains: ITIL-T1-001.., ITIL-T2-.., ITIL-D-...

Checks (printed): per-test domain counts, key positions, the share of
single items whose key is the longest option (keep it under 25%), em/en
dashes, curly quotes, "of the above", duplicate stems.
"""
import hashlib, json, os, random, runpy
from collections import Counter

EXAM = "itil"
PREFIX = "ITIL"
SECTIONS = {"itil": ["itilConcepts", "itilPrinciples", "itilSystem", "itilPracticePurpose",
                     "itilChangeImprove", "itilSupport"]}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def Q(test, difficulty, skill, stem, options, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "single",
            "stem": stem, "options": options, "correct": [0], "explanation": explanation}


def M(test, difficulty, skill, stem, options, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "multi", "select": 2,
            "stem": stem, "options": options, "correct": [0, 1], "explanation": explanation}


def shuffled(q):
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–‘’“”"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q["options"]):
        warn.append("all/none of the above")
    if q["format"] == "single" and len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if q["format"] == "multi" and (len(q["options"]) != 5 or "(Choose two.)" not in q["stem"]):
        warn.append("multi needs 5 options and '(Choose two.)'")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def build():
    domains = [d for ds in SECTIONS.values() for d in ds]
    items, warnings, stems = {}, [], Counter()
    for d in domains:
        src = runpy.run_path(os.path.join(HERE, f"{d}.py"), init_globals={"Q": Q, "M": M})["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            stems[q["stem"]] += 1
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
        items[d] = src
    warnings += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
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
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"],
                        "skill": q["skill"]}
                if q["format"] == "multi":
                    item["select"] = q["select"]
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
    print("  formats:", dict(sorted(Counter((q["test"], q["format"]) for q in out).items())))
    singles = [q for q in out if q["format"] == "single"]
    print("  single-key positions:", dict(sorted(Counter(q["correct"][0] for q in singles).items())))
    longest = [q for q in singles
               if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0])]
    print(f"  key strictly longest: {len(longest)}/{len(singles)} = {100 * len(longest) / len(singles):.1f}%")
    for q in longest:
        print("    longest:", q["id"], q["options"][q["correct"][0]][:70])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
