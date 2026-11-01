#!/usr/bin/env python3
"""Build the JAMB UTME Biology v2 bank from per-domain source files.

Usage: python3 -I tools/next100/jambbio/build.py

Sources are Python data files in tools/next100/jambbio/<domain>.py, one per
drill domain, each holding ITEMS, a list of
  S(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation)
The key is written FIRST; the build shuffles the four options with a seed from
the stem and options. When every option is a number (optionally with a % sign)
the options are sorted ascending and locked instead, and the build checks the
key's value after sorting. test is 1, 2 or 0 (drill only).

Ids: JAMBBIO-T1-001..040 in syllabus order (variety of organisms, nutrition,
transport/respiration/excretion/support, reproduction/growth/coordination,
ecology, heredity/variation/evolution), JAMBBIO-T2-.., JAMBBIO-D-...

Lint (printed, never fatal): key strictly longest, dashes, "of the above",
"both", duplicate options or stems, dollar signs, letter references.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "jambbio"
PREFIX = "JAMBBIO"
SECTION = "bio"
DOMAINS = ["jambbioVariety", "jambbioNutrition", "jambbioTransport",
           "jambbioReproduction", "jambbioEcology", "jambbioGenetics"]
PER_TEST = {"jambbioVariety": 8, "jambbioNutrition": 6, "jambbioTransport": 6,
            "jambbioReproduction": 6, "jambbioEcology": 8, "jambbioGenetics": 6}
DRILL_ONLY = {"jambbioVariety": 23, "jambbioNutrition": 20, "jambbioTransport": 20, "jambbioReproduction": 20, "jambbioEcology": 20, "jambbioGenetics": 20}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
SALT = "#4"
NUM = re.compile(r"^-?\d+(\.\d+)?%?$")


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "stem": stem,
            "options": list(opts), "explanation": expl}


def numval(s):
    return float(s.rstrip("%"))


def arrange(q):
    out = dict(q)
    if all(NUM.match(o) for o in q["options"]):
        key = q["options"][0]
        opts = sorted(q["options"], key=numval)
        out["options"] = opts
        out["correct"] = [opts.index(key)]
        out["lockedOrder"] = True
        assert opts[out["correct"][0]] == key
        return out
    seed = int(hashlib.sha256((SALT + q["stem"]).encode() + "|".join(q["options"]).encode()).hexdigest()[:12], 16)
    order = list(range(4))
    random.Random(seed).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() or t.lower().startswith("both ") for t in q["options"]):
        warn.append("all/none of the above or both")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    if re.search(r"\b(option|choice) [A-D]\b", q["explanation"]):
        warn.append("letter reference in explanation")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    others = [len(o) for i, o in enumerate(q["options"]) if i != k]
    return len(q["options"][k]) > max(others)


def load(name):
    g = {"S": S, "__name__": "jambbio_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)["ITEMS"]
        for i, q in enumerate(src):
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
        items[d] = src
        for t, want in ((1, PER_TEST[d]), (2, PER_TEST[d]), (0, DRILL_ONLY[d])):
            n = sum(1 for q in src if q["test"] == t)
            if n != want:
                warnings.append(f"{d}: test {t} has {n}, expected {want}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for d in DOMAINS:
            for q in items[d]:
                if q["test"] != test:
                    continue
                n += 1
                q = arrange(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                        "domain": d, "difficulty": q["difficulty"], "format": "single", "skill": q["skill"],
                        "stem": q["stem"], "options": q["options"], "correct": q["correct"]}
                if q.get("lockedOrder"):
                    item["lockedOrder"] = True
                item["explanation"] = q["explanation"]
                out.append(item)
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
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    print("  key longest by domain:", dict(Counter(q["domain"] for q in longest)))
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    locked = [q for q in out if q.get("lockedOrder")]
    ends = sum(1 for q in locked if q["correct"][0] in (0, 3))
    print(f"  all-number items: {len(locked)}, key in an end slot: {ends}")
    stems = Counter(q["stem"] for q in out)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
