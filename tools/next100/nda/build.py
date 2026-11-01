#!/usr/bin/env python3
"""Build the NDA and NA exam v2 bank from per-domain source files.

Usage: python3 -I tools/next100/nda/build.py

Copied from tools/next100/sscmts/build.py (two sections, the real exam's two
papers). Sources are Python data files in tools/next100/nda/<domain>.py (one
per drill domain) plus stimuli.json for the reading passages. Each file
defines ITEMS with the helper S(test, difficulty, skill, stem, options,
explanation, stim=None, step=0); the domain comes from the file name.
test is 1, 2 or 0 (drill only).

Authoring convention: the correct option is written first. The build shuffles
options with a seed taken from the stem, so key positions spread out and stay
stable from build to build. Options whose order carries meaning get a fixed
order and lockedOrder (the runtime then does not shuffle them either):
- error spotting: parts in sentence order, 'No error' last;
- sentence improvement: 'No improvement' last;
- all-number options (integers, decimals, fractions, with one shared unit):
  sorted ascending.

Ids: NDA-T1-001.., NDA-T2-001.., NDA-D-001... Section 'maths' (Paper I) is
algebra, trigonometry and geometry, calculus and vectors, then statistics and
probability. Section 'gat' (Paper II) is Part A English (standalone items, then
the reading passage) and then Part B General Knowledge with its four domains
interleaved. Drill-only items (test 0) keep the section of their domain.

Lint (printed, never fatal): key strictly longest, em or en dashes, "all/none
of the above", duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "nda"
PREFIX = "NDA"
SECTIONS = [
    ("maths", [["ndaAlgebra"], ["ndaTrigGeo"], ["ndaCalculus"], ["ndaStats"]]),
    ("gat", [["ndaEnglish"], ["ndaPhysics", "ndaChemBio", "ndaHistory", "ndaGeography"]]),
]
PARTS = [p for _, ps in SECTIONS for p in ps]
SECTION_OF = {d: s for s, ps in SECTIONS for p in ps for d in p}
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl, stim=None, step=0):
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"], q["caseStep"] = stim, step
    return q


NUM = re.compile(r"^(-?\d+(?:\.\d+)?)(?:/(\d+))?(\s*[A-Za-z°/ ]*)?$")


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
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    nums = numeric_key(opts)
    if "No error" in opts:
        ne = opts.index("No error")
        body = q["stem"].split("\n\n")[-1]
        parts = [i for i in order if i != ne]
        for i in parts:
            assert body.find(opts[i].rstrip(".")) >= 0, (opts[i], body)
        parts.sort(key=lambda i: body.find(opts[i].rstrip(".")))
        order = parts + [ne]
        locked = True
    elif "No improvement" in opts:
        ni = opts.index("No improvement")
        head = [i for i in order if i != ni]
        random.Random(seed).shuffle(head)
        order = head + [ni]
        locked = True
    elif nums is not None:
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
    if len(q["options"][0]) > max(len(o) for o in q["options"][1:]):
        warn.append("key longest")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "nda_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    stimuli = json.load(open(os.path.join(HERE, "stimuli.json")))
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
        ordered = []
        for part in PARTS:
            blocks = []
            for di, d in enumerate(part):
                mine = [q for q in items[d] if q["test"] == test and not q.get("stimulusId")]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            ordered += [b[2] for b in blocks]
            cases = {}
            for d in part:
                for q in items[d]:
                    if q["test"] == test and q.get("stimulusId"):
                        cases.setdefault(q["stimulusId"], []).append(q)
            for sid in sorted(cases):
                ordered += sorted(cases[sid], key=lambda q: q["caseStep"])
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION_OF[q["domain"]], "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
            for k in ("stimulusId", "stem", "options", "correct", "lockedOrder", "explanation"):
                if k in q:
                    item[k] = q[k]
            out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    nums = [q for q in out if q.get("lockedOrder") and numeric_key(q["options"]) is not None]
    ends = sum(1 for q in nums if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  sorted number items: {len(nums)}, key in an end slot: {ends} ({ends / max(1, len(nums)):.0%})")
    print("  locked:", sum(1 for q in out if q.get("lockedOrder")))
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
