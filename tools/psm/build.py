#!/usr/bin/env python3
"""Build the PSM I v2 bank from per-domain source files.

Usage: python3 -I tools/psm/build.py

Sources are Python data files in tools/psm/<domain>.py (one per drill domain).
Every item carries test (1, 2 or 0 = drill only), difficulty (1 to 3) and a
skill label (the Scrum Guide 2020 section it is written from).

Helpers:
  S(test, diff, skill, stem, [key, distractors...], explanation)
  M(test, diff, skill, stem, [keys..., distractors...], n_keys, explanation)
  TF(test, diff, skill, statement, truth, explanation)  -> single, options True/False

Authoring convention (as in tools/pmp): single and multi items list their
correct option(s) first and the build shuffles them with a seed taken from the
stem, so key positions spread out and stay stable from build to build. True /
False items keep the fixed order True, False.

Ids follow tools/build_v2_bank.py: PSM-T1-001.., PSM-T2-001.., PSM-D-001..,
with the domains interleaved through each test.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options, duplicate stems.
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "psm"
PREFIX = "PSM"
SECTION = "psm"
DOMAINS = ["psmTheory", "psmTeam", "psmEvents", "psmArtifacts", "psmValue", "psmFacilitation"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def _base(fmt, t, d, skill, stem, expl):
    return {"test": t, "difficulty": d, "skill": skill, "format": fmt, "stem": stem, "explanation": expl}


def S(t, d, skill, stem, opts, expl):
    q = _base("single", t, d, skill, stem, expl)
    q["options"], q["correct"] = opts, [0]
    return q


def M(t, d, skill, stem, opts, n, expl):
    q = _base("multi", t, d, skill, stem, expl)
    q["options"], q["correct"], q["select"] = opts, list(range(n)), n
    return q


def TF(t, d, skill, stem, truth, expl):
    q = _base("single", t, d, skill, "True or false: " + stem, expl)
    q["options"], q["correct"], q["tf"] = ["True", "False"], [0 if truth else 1], True
    return q


def shuffled(q):
    if q.get("tf") or q["format"] not in ("single", "multi"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def key_longest(q):
    if q["format"] != "single":
        return False
    k = q["correct"][0]
    others = [len(o) for i, o in enumerate(q["options"]) if i != k]
    return len(q["options"][k]) > max(others)


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if key_longest(q) and not q.get("tf"):
        k = q["correct"][0]
        warn.append(f"key longest ({len(q['options'][k])} vs {max(len(o) for i, o in enumerate(q['options']) if i != k)})")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "M": M, "TF": TF, "__name__": "psm_source"}
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
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(blocks, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
            for k in ("stem", "select", "options", "correct", "explanation"):
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
    for test in tests:
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    for test in tests:
        mine = [q for q in allq if q["test"] == test]
        fmt = Counter("tf" if q.get("tf") else q["format"] for q in mine)
        print(f"  test {test} formats {dict(fmt)}")
    longest = sum(1 for q in allq if key_longest(q))
    singles = [q for q in allq if q["format"] == "single"]
    print(f"  key strictly longest (True/False keyed False included): {longest}/{len(allq)} items = {longest / len(allq):.0%}; "
          f"{longest}/{len(singles)} singles = {longest / len(singles):.0%}")
    keys = Counter(q["correct"][0] for q in out if q["format"] == "single" and len(q["options"]) > 2)
    print("  single-key positions (4-option):", dict(sorted(keys.items())))
    tf = Counter(q["correct"][0] for q in allq if q.get("tf"))
    print(f"  true/false keys: True {tf[0]}, False {tf[1]}")
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
