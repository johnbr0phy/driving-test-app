#!/usr/bin/env python3
"""Build the JKSSB Junior Assistant v2 bank from per-domain source files.

Usage: python3 -I tools/next100/jkssbja/build.py

Modelled on tools/next100/sscmts/build.py and tools/next100/mppolice/build.py.
The real written test is one OMR paper of 80 objective questions in 80
minutes in four units of 20 (JKSSB syllabus notice of 23.12.2025, Annexure
"A"): General English, General Awareness with special reference to J&K UT,
Numerical and Reasoning Ability, Basic Concepts of Computers. Here it is one
section ("paper") in that unit order; each unit is two drill domains of 10
per test, interleaved, and English ends with its reading passage.

Sources are Python data files tools/next100/jkssbja/<domain>.py, each
defining ITEMS with S(test, difficulty, skill, stem, options, explanation,
stim=None, step=0); test is 1, 2 or 0 (drill only). The correct option is
written first. The build shuffles options with a seed from the stem, except
where order carries meaning, which gets a fixed order and lockedOrder:
all-number options (ascending), the statement-and-conclusion set, and
error-spotting parts (sentence order, 'No error' last).

Ids: JKSSBJA-T1-001.., JKSSBJA-T2-001.., JKSSBJA-D-001...
Lint (printed, never fatal): key strictly longest, dashes, "of the above",
duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "jkssbja"
PREFIX = "JKSSBJA"
SECTION = "paper"
PARTS = [
    ["jkjaGrammar", "jkjaVocab"],
    ["jkjaIndia", "jkjaJK"],
    ["jkjaArith", "jkjaReason"],
    ["jkjaComputer", "jkjaOffice"],
]
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl, stim=None, step=0):
    assert len(opts) == 4, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"], q["caseStep"] = stim, step
    return q


CONCLUSIONS = ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"]
NUM = re.compile(r"^(₹)?([\d,]*\.?\d+)(st|nd|rd|th)?(.*)$")


def numeric_order(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({(m.group(1), m.group(4)) for m in parts}) != 1:
        return None
    vals = [float(m.group(2).replace(",", "")) for m in parts]
    return sorted(range(len(opts)), key=lambda i: vals[i])


def shuffled(q):
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    num = numeric_order(opts)
    if num is not None:
        order, locked = num, True
    elif sorted(opts) == sorted(CONCLUSIONS):
        order, locked = [opts.index(c) for c in CONCLUSIONS], True
    elif opts[-1] == "No error":
        body = q["stem"].split("\n\n")[-1]
        parts = sorted(range(len(opts) - 1), key=lambda i: body.find(opts[i]))
        order, locked = parts + [len(opts) - 1], True
    else:
        rng = random.Random(seed)
        rest = order[1:]
        rng.shuffle(rest)
        slot = q.get("_slot", rng.randrange(len(opts)))
        order = rest[:slot] + [0] + rest[slot:]
    out = dict(q)
    out.pop("_slot", None)
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
    if any(re.search(r"(?<!\\)\$", t) for t in texts):
        warn.append("dollar sign (KaTeX delimiter)")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"][0]) > max(len(o) for o in q["options"][1:]):
        warn.append("key longest")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    if q["options"][-1] == "No error" and q["options"][0] == "No error":
        warn.append("'No error' as key cannot be placed")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "jkssbja_source"}
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
    slot_count = Counter()
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
        ordered = [dict(q) for q in ordered]
        for q in ordered:
            if q.get("_locked") is None:
                q["_locked"] = "lockedOrder" in shuffled(q)
        for n, q in enumerate(ordered, 1):
            if not q.pop("_locked"):
                # balance key letters: put the key in the least used slot so far
                q["_slot"] = min(range(4), key=lambda k: (slot_count[k], (k + n) % 4))
            q = shuffled(q)
            slot_count[q["correct"][0]] += 1
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
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
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1 and not s.startswith("Passage"):
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
