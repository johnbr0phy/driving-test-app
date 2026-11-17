#!/usr/bin/env python3
"""Build the ISC2 Certified in Cybersecurity (CC) v2 bank from per-domain sources.

Usage: python3 -I tools/next100/isc2cc/build.py

Sources are tools/next100/isc2cc/<domain>.py, each defining ITEMS with the helpers
below (S single, M multi, O order, MT matching), so the key is always written
first (order steps are written in the right sequence). Ids: ISC2CC-T1-001..,
-T2-001.., -D-001.., each test interleaving its domains. Single, multi and order
options are shuffled by a seed taken from the stem, so key positions are spread
out and stable.

Prints per-test domain and format counts, key positions, and the share of
single/multi items whose longest option is a key (must stay at or under 25%).
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "isc2cc"
PREFIX = "ISC2CC"
SECTIONS = {"cc": ["ccConcepts", "ccRisk", "ccGovern", "ccIam", "ccNetwork", "ccArchCloud", "ccData", "ccOps"]}
SOURCE_ONLY = {"domain", "test", "skill", "difficulty", "format"}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


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


def O(test, diff, skill, stem, steps, exp):
    return {"test": test, "skill": skill, "difficulty": diff, "format": "order", "stem": stem,
            "options": list(steps), "correct": list(range(len(steps))), "explanation": exp}


def MT(test, diff, skill, stem, columns, rows, exp):
    return {"test": test, "skill": skill, "difficulty": diff, "format": "matrix", "stem": stem,
            "rows": [r for r, _ in rows], "columns": columns, "correct": [c for _, c in rows], "explanation": exp}


NUM = __import__("re").compile(r"^(\d[\d,]*(?:\.\d+)?)( [a-z]+)?$")


def numeric_locked(q):
    """All-number options (optionally with one shared unit) are sorted ascending and locked."""
    if q["format"] != "single":
        return None
    ms = [NUM.match(o) for o in q["options"]]
    if not all(ms) or len({m.group(2) for m in ms}) != 1:
        return None
    key = q["options"][q["correct"][0]]
    opts = sorted(q["options"], key=lambda o: float(NUM.match(o).group(1).replace(",", "")))
    out = dict(q)
    out["options"] = opts
    out["correct"] = [opts.index(key)]
    out["lockedOrder"] = True
    return out


SLOTS = Counter()


def shuffled(q):
    locked = numeric_locked(q)
    if locked:
        return locked
    if q["format"] not in ("single", "multi", "order"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    if q["format"] == "single":
        # Put the key in the least-used slot so letters stay balanced.
        n = len(order)
        slot = min(range(n), key=lambda i: (SLOTS[i], (i - seed) % n))
        SLOTS[slot] += 1
        order.remove(q["correct"][0])
        order.insert(slot, q["correct"][0])
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    if q["format"] == "order":
        out["correct"] = [order.index(c) for c in q["correct"]]
    else:
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
    helpers = {"S": S, "M": M, "O": O, "YN": YN, "MT": MT}
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
