#!/usr/bin/env python3
"""Build the NEET-UG v2 bank from per-domain source files.

Usage: python3 -I tools/next100/neet/build.py

Copied from tools/next100/nda/build.py (sections, one per subject). Sources
are Python data files in tools/next100/neet/<domain>.py (one per drill
domain). Each file defines ITEMS with the helpers
  S(test, difficulty, skill, stem, options, explanation)  key written first;
  L(test, difficulty, skill, stem, options, key, explanation)  options kept in
    the written order with lockedOrder (Statement I/II, assertion-reason and
    other positional option sets), key given by index.
The domain comes from the file name; test is 1, 2 or 0 (drill only). Source
files may assert computed answers; they run when loaded.

S items are shuffled with a seed taken from the stem, so key positions spread
and stay stable from build to build. All-number options with one shared unit
are sorted ascending and locked instead.

Ids: NEET-T1-001.., NEET-T2-001.., NEET-D-001... Section 'phy' (Physics),
'chem' (Chemistry), 'bio' (Biology: Botany domains, then Zoology), each in
domain order. Drill-only items (test 0) keep the section of their domain.

Lint (printed, never fatal): key strictly longest, em or en dashes, "all/none
of the above", duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "neet"
PREFIX = "NEET"
SECTIONS = [
    ("phy", ["neetMech", "neetElectro"]),
    ("chem", ["neetPhysChem", "neetInorg", "neetOrg"]),
    ("bio", ["neetDiversity", "neetGenetics", "neetEcology", "neetHumanPhys"]),
]
SECTION_OF = {d: s for s, ds in SECTIONS for d in ds}
DOMAINS = [d for _, ds in SECTIONS for d in ds]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": list(opts), "correct": [0], "explanation": expl}


def L(t, d, skill, stem, opts, key, expl):
    assert 0 <= key < len(opts), stem
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": list(opts), "correct": [key], "explanation": expl, "locked": True}


# NEET's two positional option sets (kept in this order, lockedOrder).
ST = ["Both Statement I and Statement II are true", "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false", "Statement I is false but Statement II is true"]
AR = ["Both A and R are true, and R explains A", "Both A and R are true, but R does not explain A",
      "A is true but R is false", "A is false but R is true"]


NUM = re.compile(r"^(-?\d+(?:\.\d+)?)(?:/(\d+))?(\s*[A-Za-z°/ ²³⁻¹ΩμλΔ%·]*)?$")


def numeric_key(opts):
    """Values when every option is a number or simple fraction with the same
    unit, else None."""
    vals, units = [], set()
    for o in opts:
        m = NUM.match(o.strip())
        if not m:
            return None
        v = float(m.group(1))
        if m.group(2):
            v /= float(m.group(2))
        vals.append(v)
        units.add((m.group(3) or "").strip())
    if len(units) != 1 or len(set(vals)) != len(vals):
        return None
    return vals


def shuffled(q):
    opts = q["options"]
    if q.get("locked"):
        out = dict(q)
        out.pop("locked")
        out["lockedOrder"] = True
        return out
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    nums = numeric_key(opts)
    if nums is not None:
        order = sorted(order, key=lambda i: nums[i])
        locked = True
    else:
        random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    if locked:
        out["lockedOrder"] = True
    return out


def key_text(q):
    return q["options"][q["correct"][0]]


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("$" in t for t in texts):
        warn.append("dollar sign (KaTeX delimiter)")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    k = key_text(q)
    if len(k) > max(len(o) for o in q["options"] if o is not k):
        warn.append("key longest")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "L": L, "ST": ST, "AR": AR, "__name__": "neet_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def is_longest(q):
    k = key_text(q)
    others = [o for i, o in enumerate(q["options"]) if i != q["correct"][0]]
    return len(k) > max(len(o) for o in others)


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        ordered = [q for d in DOMAINS for q in items[d] if q["test"] == test]
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION_OF[q["domain"]], "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
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
    longest = sum(1 for q in out if is_longest(q))
    print(f"  key strictly longest: {longest}/{len(out)} = {longest / len(out):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    nums = [q for q in out if q.get("lockedOrder") and numeric_key(q["options"]) is not None]
    ends = sum(1 for q in nums if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  sorted number items: {len(nums)}, key in an end slot: {ends} ({ends / max(1, len(nums)):.0%})")
    print("  locked:", sum(1 for q in out if q.get("lockedOrder")))
    stems = Counter(q["stem"] for q in out)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
