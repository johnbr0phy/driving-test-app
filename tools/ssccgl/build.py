#!/usr/bin/env python3
"""Build the SSC CGL Tier 1 v2 bank from per-domain source files.

Usage: python3 -I tools/ssccgl/build.py

Sources are Python data files in tools/ssccgl/<domain>.py (one per drill
domain) plus stimuli.json for the cloze and reading passages. Each file
defines ITEMS with the helper S(test, difficulty, skill, stem, options,
explanation, stim=None, step=0); the domain comes from the file name.
test is 1, 2 or 0 (drill only).

Authoring convention (as in tools/pmp): the correct option is written first.
The build shuffles options with a seed taken from the stem, so key positions
spread out and stay stable from build to build.

Ids: SSCCGL-T1-001.., SSCCGL-T2-001.., SSCCGL-D-001... A test runs in the real
exam's section order (Reasoning, General Awareness, Quantitative Aptitude,
English), the two drill domains of each part interleaved, and the English part
ends with its cloze passage then its reading passage.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate options or stems, a "$" anywhere.
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "ssccgl"
PREFIX = "SSCCGL"
SECTION = "cgl"
PARTS = [
    ["cglVerbal", "cglLogical"],
    ["cglPolity", "cglScience"],
    ["cglArithmetic", "cglAdvanced"],
    ["cglGrammar", "cglVocab"],
]
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def S(t, d, skill, stem, opts, expl, stim=None, step=0):
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"], q["caseStep"] = stim, step
    return q


POSITIONAL = ("No error", "No improvement")


def shuffled(q):
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    fixed = next((o for o in q["options"] if o in POSITIONAL), None)
    if fixed:
        # Positional options keep a natural order the app must not shuffle:
        # error-spotting parts in sentence order, then "No error"; for sentence
        # improvement the alternatives as shuffled, then "No improvement".
        last = q["options"].index(fixed)
        order = [i for i in order if i != last]
        if fixed == "No error":
            parts = [p.strip().rstrip(".") for p in q["stem"].split("\n")[-1].split(" / ")]
            order.sort(key=lambda i: parts.index(q["options"][i].rstrip(".")))
        order.append(last)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    if fixed:
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
    g = {"S": S, "__name__": "ssccgl_source"}
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
            # cloze (CL) before reading (RC), as on the real paper
            for sid in sorted(cases, key=lambda s: (0 if "-CL" in s else 1, s)):
                ordered += sorted(cases[sid], key=lambda q: q["caseStep"])
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
            for k in ("stimulusId", "stem", "options", "correct", "explanation", "lockedOrder"):
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
        if n > 1 and not s.startswith("In the passage"):
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
