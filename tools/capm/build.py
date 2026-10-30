#!/usr/bin/env python3
"""Build the CAPM v2 bank from per-domain source files.

Usage: python3 -I tools/capm/build.py

Sources are Python data files in tools/capm/<domain>.py, one per drill domain.
Each holds ITEMS, built with the helpers below; the domain comes from the file
name. Every item carries test (1, 2 or 0 = drill only), difficulty (1 to 3) and
a skill label (the CAPM ECO task it maps to).

  S(test, difficulty, skill, stem, options, explanation)            single answer
  M(test, difficulty, skill, stem, options, n, explanation)         "Choose n"
  X(test, difficulty, skill, stem, rows, columns, key, explanation) matching grid
  N(test, difficulty, skill, stem, answers, explanation, tol=0)     typed number

Authoring convention (as in tools/pmp): a single or multi item lists its
correct option(s) first. The build shuffles options with a seed taken from the
stem, so key positions spread out and stay stable from build to build.

Ids follow tools/build_v2_bank.py (which this exam does not edit), so each
practice test interleaves its domains: CAPM-T1-001.., CAPM-T2-.., CAPM-D-...
Currency: write "$" in sources; the build escapes it to "\\$" for RichText.
Checks (printed, never fatal): per-test domain counts, key positions, the share
of single items whose key is the strictly longest option (keep it under 25%),
em/en dashes, "of the above", numeric stems without "Type the number only",
duplicate stems.
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "capm"
PREFIX = "CAPM"
SECTION = "capm"
DOMAINS = ["capmLifecycle", "capmRoles", "capmPredictive", "capmAgile", "capmBaRequirements", "capmBaDelivery"]
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


def X(t, d, skill, stem, rows, cols, key, expl):
    q = _base("matrix", t, d, skill, stem, expl)
    q["rows"], q["columns"], q["correct"] = rows, cols, key
    return q


def N(t, d, skill, stem, answers, expl, tol=0):
    q = _base("numeric", t, d, skill, stem, expl)
    q["numeric"] = {"answers": answers, "tolerance": tol}
    return q


def esc(s):
    return s.replace("\\$", "$").replace("$", "\\$")


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
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any(c in t for t in texts for c in "‘’“”"):
        warn.append("curly quote")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "numeric":
        if "type the number only" not in q["stem"].lower():
            warn.append("numeric stem does not say 'Type the number only'")
        for a in q["numeric"]["answers"]:
            if not all(c in "0123456789./-" for c in a):
                warn.append(f"numeric answer {a!r} has other characters")
    if q["format"] == "single":
        key = len(q["options"][0])
        if key > max(len(o) for o in q["options"][1:]):
            warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    if q["format"] == "matrix":
        assert len(q["correct"]) == len(q["rows"]), where
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "M": M, "X": X, "N": N, "__name__": "capm_source"}
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
            for k in ("stem", "select", "options", "rows", "columns", "correct", "numeric", "explanation"):
                if k in q:
                    item[k] = q[k]
            for k in ("stem", "explanation"):
                item[k] = esc(item[k])
            for k in ("options", "rows", "columns"):
                if k in item:
                    item[k] = [esc(x) for x in item[k]]
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
        fmt = Counter(q["format"] for q in allq if q["test"] == test)
        print(f"  test {test} formats {dict(fmt)}")
    singles = [q for q in allq if q["format"] == "single"]
    longest = sum(1 for q in singles if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(singles)} singles = {longest / len(singles):.0%}")
    keys = Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-key positions:", dict(sorted(keys.items())))
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        for w in warnings:
            if "key longest" in w:
                print("  LONGEST", w)


if __name__ == "__main__":
    build()
