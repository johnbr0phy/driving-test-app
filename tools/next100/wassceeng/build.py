#!/usr/bin/env python3
"""Build the WAEC WASSCE English Language v2 bank from source files.

Usage: python3 -I tools/next100/wassceeng/build.py

Sources are Python data files beside this script: lexis.py, structure.py and
orals.py. Each defines one list per domain (ITEMS[domain] = [...]).

Helpers:
  S(test, difficulty, skill, stem, options, explanation)
      correct option FIRST; the build shuffles with a seed from the stem and
      options.
  N(...) same, for all-number options: sorted ascending and locked in order.
test is 1, 2 or 0 (drill only).

Sections: Paper 1 (`p1`, lexis and structure, 80 per test) and Paper 3
(`p3`, Test of Orals, 30 per test). Ids: WASSCEENG-T1-001.. in paper order,
WASSCEENG-T2-.., WASSCEENG-D-...

Lint (printed, never fatal): key strictly longest, em or en dashes, "of the
above", duplicate options or stems, dollar signs, letter references.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "wassceeng"
PREFIX = "WASSCEENG"
DOMAINS = [
    ("p1", "wassceengFields", 16), ("p1", "wassceengSynonyms", 14), ("p1", "wassceengIdioms", 10),
    ("p1", "wassceengConcord", 14), ("p1", "wassceengTenses", 13), ("p1", "wassceengStructure", 13),
    ("p3", "wassceengVowels", 10), ("p3", "wassceengConsonants", 8), ("p3", "wassceengRhymes", 4),
    ("p3", "wassceengStress", 8),
]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


def N(t, d, skill, stem, opts, expl):
    q = S(t, d, skill, stem, opts, expl)
    q["lock"] = True
    return q


def shuffled(q):
    if q.get("lock"):
        key = q["options"][0]
        opts = sorted(q["options"], key=lambda o: float(re.sub(r"[^\d.]", "", o)))
        out = dict(q)
        out["options"] = opts
        out["correct"] = [opts.index(key)]
        out["lockedOrder"] = True
        return out
    seed = int(hashlib.sha256(q["stem"].encode() + "|".join(q["options"]).encode()).hexdigest()[:12], 16)
    order = list(range(4))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    if re.search(r"\b(option|choice) [A-D]\b", q["explanation"], re.I):
        warn.append("letter reference in explanation")
    if re.search(r"\b(first|second|third|fourth|last) (option|choice|answer)\b", " ".join(texts), re.I):
        warn.append("positional option reference")
    return [f"{where}: {w}" for w in warn]


def plain(s):
    return s.replace("__", "")


def key_longest(q):
    k = q["correct"][0]
    others = [len(plain(o)) for i, o in enumerate(q["options"]) if i != k]
    return len(plain(q["options"][k])) > max(others)


def load(name):
    g = {"S": S, "N": N, "__name__": "wassceeng_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    items = {}
    for name in ("lexis", "structure", "orals"):
        items.update(load(name))
    warnings = []
    for sec, d, per in DOMAINS:
        src = items[d]
        for i, q in enumerate(src):
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][-50:]!r}")
        for t in (1, 2):
            n = sum(1 for q in src if q["test"] == t)
            if n != per:
                warnings.append(f"{d}: test {t} has {n}, expected {per}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for sec, d, _ in DOMAINS:
            for q in items[d]:
                if q["test"] != test:
                    continue
                n += 1
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": sec, "test": test, "module": 1,
                        "domain": d, "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
                for k in ("stem", "options", "correct", "lockedOrder", "explanation"):
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
    for test in (1, 2, 0):
        row = [per[(test, d)] for _, d, _ in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    print("  key longest by domain:", dict(Counter(q["domain"] for q in longest)))
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    stems = Counter((q["stem"], tuple(sorted(q["options"]))) for q in out)
    for (s, _), n in stems.items():
        if n > 1:
            print("  WARN duplicate question:", s[-80:])
    bare = Counter(q["stem"] for q in out)
    for s, n in bare.items():
        if n > 1:
            print(f"  note: stem used {n} times (options differ):", s[-70:].replace("\n", " "))
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
