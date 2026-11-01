#!/usr/bin/env python3
"""Build the JAMB UTME Physics v2 bank from per-domain source files.

Usage: python3 -I tools/next100/jambphys/build.py

Copied from tools/next100/jambeng/build.py, with the numeric handling of
tools/next100/neet/build.py. Sources are Python data files in
tools/next100/jambphys/<domain>.py (one per drill domain), each defining ITEMS
with two helpers:

  S(test, difficulty, skill, stem, options, explanation)
      key written FIRST. Shuffled with a seed from the stem, unless every
      option is a number with one shared unit, in which case the options are
      sorted ascending and locked.
  N(test, difficulty, skill, stem, ans, calc, wrong, unit, explanation)
      a calculation. ans is the value shown as the key, calc the formula
      evaluated in Python: the build asserts they agree to 0.6%, that the
      explanation states the key exactly as displayed, and that the four
      displayed options differ. Options are sorted ascending and locked
      (lockedOrder), so the key lands wherever its value sorts.

test is 1, 2 or 0 (drill only). Values of 100000 or more, or under 0.001, are
shown in standard form ("2.5 × 10¹¹"). g = 10 m s⁻² throughout, stated in
the stem where it matters.

Ids: JAMBPHYS-T1-001..040, JAMBPHYS-T2-.., JAMBPHYS-D-..., in domain order.
Lint (printed, never fatal): key strictly longest, em or en dashes, "of the
above", duplicate options or stems, dollar signs, letter references.
"""
import hashlib, json, math, os, random, re
from collections import Counter

EXAM = "jambphys"
PREFIX = "JAMBPHYS"
SECTION = "phys"
DOMAINS = ["jambphysMotion", "jambphysForces", "jambphysHeat", "jambphysWaves",
           "jambphysElectricity", "jambphysMagnetism", "jambphysModern"]
PER_TEST = {"jambphysMotion": 7, "jambphysForces": 7, "jambphysHeat": 7, "jambphysWaves": 7,
            "jambphysElectricity": 5, "jambphysMagnetism": 4, "jambphysModern": 3}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
SUP = str.maketrans("-0123456789", "⁻⁰¹²³⁴⁵⁶⁷⁸⁹")


def fmt(v):
    """Display a number: up to 4 significant figures, standard form when large or small."""
    if v != 0 and (abs(v) >= 1e5 or abs(v) < 1e-3):
        e = math.floor(math.log10(abs(v)))
        m = v / 10 ** e
        if round(abs(m), 3) >= 10:
            m, e = m / 10, e + 1
        ms = f"{m:.3g}"
        return f"{ms} × 10{str(e).translate(SUP)}"
    s = f"{v:.4g}"
    if "e" in s:
        s = f"{v:.6f}".rstrip("0").rstrip(".")
    return s


def show(v, unit):
    if not unit:
        return fmt(v)
    return f"{fmt(v)}{unit}" if unit in ("%", "°") else f"{fmt(v)} {unit}"


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts),
            "correct": [0], "explanation": expl}


def N(t, d, skill, stem, ans, calc, wrong, unit, expl):
    assert len(wrong) == 3, stem
    assert abs(ans - calc) <= 0.006 * abs(calc) + 1e-12, f"{stem[:60]!r}: ans {ans} vs calc {calc}"
    vals = [ans, *wrong]
    opts = [show(v, unit) for v in vals]
    assert len(set(opts)) == 4, f"{stem[:60]!r}: duplicate displayed options {opts}"
    assert fmt(ans) in expl, f"{stem[:60]!r}: explanation does not state {fmt(ans)}"
    order = sorted(range(4), key=lambda i: vals[i])
    return {"test": t, "difficulty": d, "skill": skill, "stem": stem,
            "options": [opts[i] for i in order], "correct": [order.index(0)],
            "explanation": expl, "lockedOrder": True, "numeric": True}


NUMOPT = re.compile(r"^(-?\d+(?:\.\d+)?)(?:\s*(.*))?$")


def numeric_values(opts):
    vals, units = [], set()
    for o in opts:
        m = NUMOPT.match(o.strip())
        if not m:
            return None
        vals.append(float(m.group(1)))
        units.add((m.group(2) or "").strip())
    if len(units) != 1 or len(set(vals)) != 4:
        return None
    return vals


def arrange(q):
    if q.get("numeric"):
        return q
    opts = q["options"]
    nums = numeric_values(opts)
    if nums is not None:
        order = sorted(range(4), key=lambda i: nums[i])
        out = dict(q, options=[opts[i] for i in order], correct=[order.index(0)], lockedOrder=True)
        out["numeric"] = True
        return out
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(4))
    random.Random(seed).shuffle(order)
    return dict(q, options=[opts[i] for i in order], correct=[order.index(0)])


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
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


def sind(x):
    return math.sin(math.radians(x))


def cosd(x):
    return math.cos(math.radians(x))


def load(name):
    g = {"S": S, "N": N, "math": math, "sind": sind, "cosd": cosd, "pi": math.pi,
         "sqrt": math.sqrt, "__name__": "jambphys_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = [arrange(q) for q in load(d)]
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
        items[d] = src
        for t in (1, 2):
            n = sum(1 for q in src if q["test"] == t)
            if n != PER_TEST[d]:
                warnings.append(f"{d}: test {t} has {n}, expected {PER_TEST[d]}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for d in DOMAINS:
            for q in items[d]:
                if q["test"] != test:
                    continue
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
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
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    nums = [q for q in out if q.get("lockedOrder")]
    ends = sum(1 for q in nums if q["correct"][0] in (0, 3))
    print(f"  sorted number items: {len(nums)}, key in an end slot: {ends} ({ends / max(1, len(nums)):.0%})")
    print("  sorted key slots:", dict(sorted(Counter(q["correct"][0] for q in nums).items())))
    stems = Counter(q["stem"] for q in out)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
