#!/usr/bin/env python3
"""Build the ISC2 CISSP v2 bank.

Usage: python3 -I tools/cissp/build.py

Sources are Python data files, one per domain, in tools/cissp/<domain>.py.
Each holds ITEMS, a list built with helpers this script provides:
  Q(test, difficulty, skill, stem, options, explanation)        single answer, key first
  O(test, difficulty, skill, stem, steps, explanation)          order, steps listed in the right order
  X(test, difficulty, skill, stem, rows, columns, key, explanation)  matrix, key = column per row
test is 1, 2 or 0 (drill only). The build shuffles single and order options
with a seed taken from the stem, so key positions are spread out and stable
between builds; the app shuffles again at runtime. A "$" before a digit is
escaped so RichText does not read it as KaTeX.

Ids follow tools/build_v2_bank.py (which this exam does not edit), so each
practice test interleaves its domains: CISSP-T1-001.., CISSP-T2-.., CISSP-D-...

Checks (printed): per-test domain counts, key positions, the share of
single items whose key is the longest option (keep it under 25%), em/en
dashes, curly quotes, "of the above", duplicate stems.
"""
import hashlib, json, os, random, re, runpy
from collections import Counter

EXAM = "cissp"
PREFIX = "CISSP"
SECTIONS = {"cissp": ["cisspRisk", "cisspAsset", "cisspArch", "cisspNetwork",
                      "cisspIam", "cisspAssess", "cisspOps", "cisspSoftware"]}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def Q(test, difficulty, skill, stem, options, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "single",
            "stem": stem, "options": options, "correct": [0], "explanation": explanation}


def O(test, difficulty, skill, stem, steps, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "order",
            "stem": stem, "options": steps, "correct": list(range(len(steps))), "explanation": explanation}


def X(test, difficulty, skill, stem, rows, columns, key, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "matrix",
            "stem": stem, "rows": rows, "columns": columns, "correct": key, "explanation": explanation}


def shuffled(q):
    if q["format"] == "matrix":
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    # single: where the key went; order: new index of each step, in the right sequence
    out["correct"] = [order.index(c) for c in q["correct"]]
    return out


def esc(t):
    return re.sub(r"(?<!\\)\$(?=\d)", r"\\$", t)


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2018\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "single" and len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if q["format"] == "matrix" and len(q["correct"]) != len(q["rows"]):
        warn.append("matrix key length")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def build():
    domains = [d for ds in SECTIONS.values() for d in ds]
    items, warnings, stems = {}, [], Counter()
    for d in domains:
        src = runpy.run_path(os.path.join(HERE, f"{d}.py"), init_globals={"Q": Q, "O": O, "X": X})["ITEMS"]
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
                        "skill": q["skill"], "stem": esc(q["stem"])}
                if q["format"] == "matrix":
                    item["rows"] = [esc(r) for r in q["rows"]]
                    item["columns"] = q["columns"]
                else:
                    item["options"] = [esc(o) for o in q["options"]]
                item["correct"] = q["correct"]
                item["explanation"] = esc(q["explanation"])
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
