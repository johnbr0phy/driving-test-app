#!/usr/bin/env python3
"""Build the AZ-900 (Microsoft Azure Fundamentals) v2 bank from per-domain sources.

Usage: python3 -I tools/az900/build.py

Sources are tools/az900/<domain>.py, each defining ITEMS with the helpers
below (S single, M multi, YN yes/no statement set, MT matching), so the key
is always written first. Same id scheme as tools/build_v2_bank.py (which this
exam does not edit): AZ900-T1-001.., -T2-001.., -D-001.., each test
interleaving its domains. Single and multi options are shuffled by a seed
taken from the stem, so key positions are spread out and stable.

Prints per-test domain and format counts, key positions, and the share of
single/multi items whose longest option is a key (must stay at or under 25%).
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "az900"
PREFIX = "AZ900"
SECTIONS = {"az900": ["azCloud", "azServiceTypes", "azCore", "azComputeNet", "azStorage", "azIdentity", "azCostGov", "azManage"]}
SOURCE_ONLY = {"domain", "test", "skill", "difficulty", "format"}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def S(test, diff, skill, stem, key, wrongs, exp):
    return {"test": test, "skill": skill, "difficulty": diff, "format": "single", "stem": stem,
            "options": [key, *wrongs], "correct": [0], "explanation": exp}


def M(test, diff, skill, stem, keys, wrongs, exp):
    return {"test": test, "skill": skill, "difficulty": diff, "format": "multi", "select": len(keys), "stem": stem,
            "options": [*keys, *wrongs], "correct": list(range(len(keys))), "explanation": exp}


def YN(test, diff, skill, stem, rows, exp):
    return {"test": test, "skill": skill, "difficulty": diff, "format": "matrix", "stem": stem,
            "rows": [r for r, _ in rows], "columns": ["Yes", "No"], "correct": [0 if yes else 1 for _, yes in rows],
            "explanation": exp}


def MT(test, diff, skill, stem, columns, rows, exp):
    return {"test": test, "skill": skill, "difficulty": diff, "format": "matrix", "stem": stem,
            "rows": [r for r, _ in rows], "columns": columns, "correct": [c for _, c in rows], "explanation": exp}


def shuffled(q):
    if q["format"] not in ("single", "multi"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "multi" and f"(Choose {['', 'one', 'two', 'three'][q['select']]}.)" not in q["stem"]:
        warn.append("multi stem does not say how many to choose")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    """The longest option is a key and strictly longer than every distractor."""
    keys = [len(q["options"][c]) for c in q["correct"]]
    others = [len(o) for i, o in enumerate(q["options"]) if i not in q["correct"]]
    return max(keys) > max(others)


def build():
    domains = [d for ds in SECTIONS.values() for d in ds]
    helpers = {"S": S, "M": M, "YN": YN, "MT": MT}
    items, warnings, stems = {}, [], Counter()
    for d in domains:
        env = dict(helpers)
        exec(compile(open(os.path.join(HERE, f"{d}.py")).read(), f"{d}.py", "exec"), env)
        for i, q in enumerate(env["ITEMS"]):
            q["domain"] = d
            stems[q["stem"]] += 1
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
        items[d] = env["ITEMS"]
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
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"]}
                if q.get("skill"):
                    item["skill"] = q["skill"]
                item.update({k: v for k, v in q.items() if k not in SOURCE_ONLY})
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
    print("  formats:", dict(sorted(Counter((q["test"], q["format"]) for q in out).items())))
    print("  single-key positions:", dict(sorted(Counter(q["correct"][0] for q in out if q["format"] == "single").items())))
    yn = Counter(c for q in out if q["columns" if q["format"] == "matrix" else "format"] == ["Yes", "No"] for c in q["correct"])
    print("  yes/no rows (0=Yes):", dict(yn))
    choice = [q for q in out if q["format"] in ("single", "multi")]
    longest = [q for q in choice if key_longest(q)]
    print(f"  key-longest: {len(longest)}/{len(choice)} = {100 * len(longest) / len(choice):.1f}%")
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
