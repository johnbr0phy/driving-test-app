#!/usr/bin/env python3
"""Build the Agniveer Vayu (Science subjects) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/agniveervayu/build.py

Copied from tools/next100/sscmts/build.py, with three sections (English,
Physics, Mathematics, the three subjects of the real Science subjects test)
and sorted, locked all-number options. Sources are Python data files in
tools/next100/agniveervayu/<domain>.py (one per drill domain) plus
stimuli.json for the reading passages. Each file
defines ITEMS with the helper S(test, difficulty, skill, stem, options,
explanation, stim=None, step=0); the domain comes from the file name.
test is 1, 2 or 0 (drill only).

Authoring convention (as in tools/pmp): the correct option is written first.
The build shuffles options with a seed taken from the stem, so key positions
spread out and stay stable from build to build.

Ids: AGNIVEERVAYU-T1-001.., -T2-001.., -D-001... Section eng is English
(grammar and vocabulary interleaved, then the reading passage), phy is
Physics (three domains interleaved) and math is Mathematics (three domains
interleaved). Drill-only items (test 0) keep the section of their domain.

Option order: error-spotting parts stay in sentence order with 'No error'
last, 'No improvement' stays last, and options that are all plain numbers
(with one shared unit, fractions allowed) are sorted ascending. All of these
get lockedOrder so the app does not reshuffle them.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems, an unbalanced "$".
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "agniveervayu"
PREFIX = "AGNIVEERVAYU"
SECTIONS = [
    ("eng", [["agniveervayuGrammar", "agniveervayuReading"]]),
    ("phy", [["agniveervayuMechanics", "agniveervayuHeatOptics", "agniveervayuElectricity"]]),
    ("math", [["agniveervayuAlgebra", "agniveervayuGeometry", "agniveervayuCalculus"]]),
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


FIXED_LAST = ("No improvement",)
CONCLUSIONS = ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"]


NUM = re.compile(r"^\$?([+-]?\d+(?:\.\d+)?(?:/\d+)?)\$?\s*(.*)$")


def _num(s):
    """(value, unit) for a plain number option such as '50 m', '+2 D', '7/2' or '$7$'."""
    m = NUM.match(s.strip())
    if not m:
        return None
    v = m.group(1)
    if "/" in v:
        a, b = v.split("/")
        return float(a) / float(b), m.group(2)
    return float(v), m.group(2)


def numeric(opts):
    vals = [_num(o) for o in opts]
    if any(v is None for v in vals) or len({u for _, u in vals}) != 1:
        return None
    return [v for v, _ in vals]


def shuffled(q):
    """Seeded shuffle, except where the option order carries meaning (as in
    tools/next100/sscgd/build.py). Those items get a fixed display order and
    lockedOrder, so the runtime does not shuffle them either: error-spotting
    parts in sentence order with 'No error' last, and 'No improvement' last."""
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    nums = numeric(opts)
    if nums is not None:
        order = sorted(range(len(opts)), key=lambda i: nums[i])
        locked = True
    elif sorted(opts) == sorted(CONCLUSIONS):
        order = [opts.index(c) for c in CONCLUSIONS]
        locked = True
    elif opts[-1] == "No error":
        body = q["stem"].split("\n\n")[-1]
        parts = sorted(range(len(opts) - 1), key=lambda i: body.find(opts[i]))
        order = parts + [len(opts) - 1]
        locked = True
    elif opts[-1] in FIXED_LAST:
        head = order[:-1]
        random.Random(seed).shuffle(head)
        order = head + [order[-1]]
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
    if any(t.count("$") % 2 for t in texts):
        warn.append("odd number of $ (unbalanced KaTeX)")
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
    g = {"S": S, "__name__": "agniveervayu_source"}
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
    nonnum = [q for q in allq if numeric(q["options"]) is None]
    lng = sum(1 for q in nonnum if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest (non-number items): {lng}/{len(nonnum)} = {lng / len(nonnum):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    numq = [q for q in out if numeric(q["options"]) is not None]
    ends = sum(1 for q in numq if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  all-number items: {len(numq)}, key in an end slot: {ends} = {ends / max(1, len(numq)):.0%}")
    for q in numq:
        v = numeric(q["options"])
        assert v == sorted(v), q["id"]
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1 and not s.startswith("Select the correctly spelt"):
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
