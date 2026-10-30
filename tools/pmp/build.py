#!/usr/bin/env python3
"""Build the PMP v2 bank from per-domain source files.

Usage: python3 -I tools/pmp/build.py

Sources are Python data files in tools/pmp/<domain>.py (one per drill
domain) plus stimuli.json for the case studies. Each file calls the helpers
below; the domain comes from the file name. Every item carries test (1, 2 or
0 = drill only), difficulty (1 to 3), a skill label (the ECO task it maps to)
and an approach tag ("P" predictive, "A" adaptive/agile, "H" hybrid) that is
only used to report the mix against PMI's stated 40/60 split.

Authoring convention (as in tools/rexpn): a single or multi item lists its
correct option(s) first. The build shuffles options with a seed taken from the
stem, so key positions spread out and stay stable from build to build.

Ids follow tools/build_v2_bank.py: PMP-T1-001.., PMP-T2-001.., PMP-D-001...
Each test opens with its case study (the real exam starts with the case-study
section), then the single items interleave the domains.

Currency: write "$" in sources; the build escapes it to "\\$" for RichText.
Lint (printed, never fatal): key strictly longest, numeric stems that do not
say "Type the number only", em or en dashes, "all/none of the above".
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "pmp"
PREFIX = "PMP"
SECTION = "pmp"
DOMAINS = ["pmpTeam", "pmpStakeholders", "pmpPlanning", "pmpScheduleCost", "pmpDelivery", "pmpGovernance", "pmpRisk"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def _base(fmt, t, d, skill, ap, stem, expl, passage=None, stim=None, step=0):
    assert ap in ("P", "A", "H"), ap
    q = {"test": t, "difficulty": d, "skill": skill, "approach": ap, "format": fmt, "stem": stem, "explanation": expl}
    if passage:
        q["passage"] = passage
    if stim:
        q["stimulusId"] = stim
        q["caseStep"] = step
    return q


def S(t, d, skill, ap, stem, opts, expl, **kw):
    q = _base("single", t, d, skill, ap, stem, expl, **kw)
    q["options"], q["correct"] = opts, [0]
    return q


def M(t, d, skill, ap, stem, opts, n, expl, **kw):
    q = _base("multi", t, d, skill, ap, stem, expl, **kw)
    q["options"], q["correct"], q["select"] = opts, list(range(n)), n
    return q


def X(t, d, skill, ap, stem, rows, cols, key, expl, **kw):
    q = _base("matrix", t, d, skill, ap, stem, expl, **kw)
    q["rows"], q["columns"], q["correct"] = rows, cols, key
    return q


def N(t, d, skill, ap, stem, answers, expl, tol=0, **kw):
    q = _base("numeric", t, d, skill, ap, stem, expl, **kw)
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
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "numeric" and "type the number only" not in q["stem"].lower():
        warn.append("numeric stem does not say 'Type the number only'")
    if q["format"] == "single":
        key = len(q["options"][0])
        if key > max(len(o) for o in q["options"][1:]):
            warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "M": M, "X": X, "N": N, "__name__": "pmp_source"}
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
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:60]!r}")
        items[d] = src
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        cases = {}
        for d in DOMAINS:
            for q in items[d]:
                if q["test"] == test and q.get("stimulusId"):
                    cases.setdefault(q["stimulusId"], []).append(q)
        ordered = []
        for sid in sorted(cases):
            ordered += sorted(cases[sid], key=lambda q: q["caseStep"])
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test and not q.get("stimulusId")]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        ordered += [b[2] for b in blocks]
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
            for k in ("stimulusId", "passage", "stem", "select", "options", "rows", "columns", "correct", "numeric", "explanation"):
                if k in q:
                    item[k] = q[k]
            for k in ("passage", "stem", "explanation"):
                if k in item:
                    item[k] = esc(item[k])
            for k in ("options", "rows", "columns"):
                if k in item:
                    item[k] = [esc(x) for x in item[k]]
            out.append(item)
    for s in stimuli:
        s["text"] = esc(s["text"])
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in tests:
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    for test in tests:
        mine = [q for q in allq if q["test"] == test]
        fmt = Counter(q["format"] for q in mine)
        ap = Counter(q["approach"] for q in mine)
        pred = ap["P"] / len(mine)
        print(f"  test {test} formats {dict(fmt)}  approach P/A/H {ap['P']}/{ap['A']}/{ap['H']} (predictive {pred:.0%})")
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


if __name__ == "__main__":
    build()
