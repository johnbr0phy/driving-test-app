#!/usr/bin/env python3
"""Build the SSC CPO Paper-I v2 bank from per-domain source files.

Usage: python3 -I tools/next100/ssccpo/build.py

Sources are Python data files in tools/next100/ssccpo/<domain>.py (one per
drill domain) plus stimuli.json for the cloze and reading passages. Each file
defines ITEMS with the helper S(test, difficulty, skill, stem, options,
explanation, stim=None, step=0); the domain comes from the file name.
test is 1, 2 or 0 (drill only).

Authoring convention (as in tools/ssccgl): the correct option is written
first. The build shuffles options with a seed taken from the stem, so key
positions spread out and stay stable from build to build.

Shape: the SSC CPO 2026 notice (para 12.1) gives Paper-I a sectional timer of
15 minutes for each of its four parts of 25 questions, so each part is its own
section (one module of 25 in 15 minutes), in the notice's order: General
Intelligence and Reasoning, General Knowledge and General Awareness,
Quantitative Aptitude, English Comprehension. Inside a section the two drill
domains are interleaved; the English section ends with its cloze passage then
its reading passage. All-number options are sorted ascending and locked.

Ids: SSCCPO-T1-001.., SSCCPO-T2-001.., SSCCPO-D-001...

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "ssccpo"
PREFIX = "SSCCPO"
SECTIONS = [
    ("gi", ["ssccpoVerbal", "ssccpoLogic"]),
    ("ga", ["ssccpoHistory", "ssccpoScience"]),
    ("qa", ["ssccpoArith", "ssccpoAdvanced"]),
    ("eng", ["ssccpoGrammar", "ssccpoVocab"]),
]
DOMAINS = [d for _, p in SECTIONS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl, stim=None, step=0):
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"], q["caseStep"] = stim, step
    return q


CONCLUSION_SETS = [
    ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
    ["Only I is implicit", "Only II is implicit", "Both are implicit", "Neither is implicit"],
]


NUM = re.compile(r"^(\u20b9|About )?(\d[\d,]*(?:\.\d+)?)(?:/(\d+))?(\s*[A-Za-z/%.\u00b0 ]*)?$")


def numeric_key(opts):
    """Sort values when every option is a number (or fraction) with the same
    prefix and unit, else None."""
    vals, units = [], set()
    for o in opts:
        m = NUM.match(o.strip())
        if not m:
            return None
        v = float(m.group(2).replace(",", ""))
        if m.group(3):
            v /= float(m.group(3))
        vals.append(v)
        unit = re.sub(r"^(st|nd|rd|th)", "", (m.group(4) or "").strip())
        units.add(((m.group(1) or ""), unit))
    if len(units) != 1:
        return None
    return vals


def shuffled(q):
    """Seeded shuffle, except where the option order carries meaning. Those
    items get a fixed display order and lockedOrder, so the runtime does not
    shuffle them either: error-spotting parts in sentence order with 'No error'
    last, 'No improvement' last, and the conclusion or assumption options in
    their usual I / II / both / neither order."""
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    fixed = next((c for c in CONCLUSION_SETS if sorted(opts) == sorted(c)), None)
    nums = numeric_key(opts)
    if fixed:
        order = [opts.index(c) for c in fixed]
        locked = True
    elif nums is not None:
        # All-number options are shown in ascending order, as on the real
        # paper, and locked so the key's slot is the value's rank.
        order = sorted(order, key=lambda i: nums[i])
        locked = True
    elif "No error" in opts:
        body = q["stem"].split("\n\n")[-1]
        last = opts.index("No error")
        parts = sorted((i for i in order if i != last), key=lambda i: body.find(opts[i]))
        order = parts + [last]
        locked = True
    elif "No improvement" in opts:
        last = opts.index("No improvement")
        head = [i for i in order if i != last]
        random.Random(seed).shuffle(head)
        order = head + [last]
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
    if any("\u2014" in t or "\u2013" in t for t in texts):
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
    g = {"S": S, "__name__": "ssccpo_source"}
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
        n = 0
        for section, part in SECTIONS:
            blocks = []
            for di, d in enumerate(part):
                mine = [q for q in items[d] if q["test"] == test and not q.get("stimulusId")]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            ordered = [b[2] for b in blocks]
            cases = {}
            for d in part:
                for q in items[d]:
                    if q["test"] == test and q.get("stimulusId"):
                        cases.setdefault(q["stimulusId"], []).append(q)
            for sid in sorted(cases, key=lambda s: (0 if "-CL" in s else 1, s)):
                ordered += sorted(cases[sid], key=lambda q: q["caseStep"])
            for q in ordered:
                n += 1
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
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
    nums = [q for q in out if numeric_key(q["options"]) is not None]
    ends = sum(1 for q in nums if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  all-number items: {len(nums)}, key in an end slot: {ends} ({ends / max(1, len(nums)):.0%})")
    for q in nums:
        vals = numeric_key(q["options"])
        assert vals == sorted(vals), q["id"]
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    stems = Counter(q["stem"] for q in allq)
    for s, c in stems.items():
        if c > 1 and not s.startswith("In the passage") and not s.startswith("Blank"):
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
