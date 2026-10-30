#!/usr/bin/env python3
"""Build the NAPLAN Year 7 v2 bank from the source files in tools/naplan7/.

Usage: python3 -I tools/naplan7/build.py            (writes data/v2/naplan7/questions.json)

Each source file (reading.py, spelling.py, grammar.py, noncalc.py, number.py,
measure.py, stats.py, plus stimuli.py) is plain Python run with the helpers
below injected. `at(test, module, variant)` sets the stage for the items that
follow (test 0 = drill only). Write the key first: S("stem", "key",
["distractor", ...], "explanation"); the build rotates the key through the
option positions so letters vary. Ids are assigned here in test order:
NAP7-T1-001.., NAP7-T2-001.., NAP7-D-001.. (the session builder orders a stage by
id), with spelling before grammar in Conventions and the three numeracy
strands interleaved. The Year 9 sibling is tools/naplan/ (prefix NAP).
"""
import json, os, runpy, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
PREFIX = "NAP7"
# file -> (domain, section)
SOURCES = [
    ("reading", "nap7Reading", "reading"),
    ("spelling", "nap7Spelling", "conventions"),
    ("grammar", "nap7Grammar", "conventions"),
    ("noncalc", "nap7NonCalc", "numeracyNC"),
    ("number", "nap7Number", "numeracy"),
    ("measure", "nap7Measure", "numeracy"),
    ("stats", "nap7Stats", "numeracy"),
]
SECTION_ORDER = ["reading", "conventions", "numeracyNC", "numeracy"]
VARIANT_ORDER = {None: 0, "lower": 1, "upper": 2}


def load(name, domain, section):
    items, ctx = [], {"test": 1, "module": 1, "variant": None}
    counter = [0]

    def at(test, module=1, variant=None):
        ctx.update(test=test, module=module, variant=variant)

    def rot(key, distractors):
        """Key first in, rotated to position counter % n out."""
        n = len(distractors) + 1
        pos = counter[0] % n
        counter[0] += 1
        opts = list(distractors)
        opts.insert(pos, key)
        return opts, pos

    def base(fmt, stem, expl, kw):
        q = {"_test": ctx["test"], "_module": ctx["module"], "_variant": ctx["variant"],
             "section": section, "domain": domain, "difficulty": kw.pop("d", 2), "format": fmt}
        if kw.get("skill"):
            q["skill"] = kw.pop("skill")
        if kw.get("basics"):
            q["basics"] = kw.pop("basics")
        for k in ("stimulusId", "passage"):
            if kw.get(k):
                q[k] = kw.pop(k)
        q["stem"] = stem
        return q, kw

    def finish(q, expl, kw):
        if section == "numeracy":
            q["calculator"] = True
        q.update(kw)
        q["explanation"] = expl
        items.append(q)
        return q

    def S(stem, key, distractors, expl, **kw):
        q, kw = base("single", stem, expl, kw)
        opts, pos = rot(key, distractors)
        q["options"], q["correct"] = opts, [pos]
        return finish(q, expl, kw)

    def M(stem, keys, distractors, expl, **kw):
        """Choose N: keys interleaved with distractors deterministically."""
        q, kw = base("multi", stem, expl, kw)
        opts = list(distractors)
        n = len(keys) + len(distractors)
        start = counter[0] % n
        counter[0] += 1
        positions = sorted({(start + 2 * i) % n for i in range(len(keys))})
        if len(positions) < len(keys):
            positions = list(range(len(keys)))
        out, ki, di = [], 0, 0
        for p in range(n):
            if p in positions:
                out.append(keys[ki]); ki += 1
            else:
                out.append(distractors[di]); di += 1
        q["options"], q["correct"] = out, positions
        q["select"] = len(keys)
        return finish(q, expl, kw)

    def N(stem, answers, expl, tol=0, **kw):
        q, kw = base("numeric", stem, expl, kw)
        q["numeric"] = {"answers": [str(a) for a in answers], "tolerance": tol}
        return finish(q, expl, kw)

    def C(stem, blanks, expl, **kw):
        """blanks: list of (key, [distractors])."""
        q, kw = base("cloze", stem, expl, kw)
        bl, cor = [], []
        for key, ds in blanks:
            opts, pos = rot(key, ds)
            bl.append(opts); cor.append(pos)
        q["blanks"], q["correct"] = bl, cor
        return finish(q, expl, kw)

    def H(stem, correct, expl, **kw):
        q, kw = base("highlight", stem, expl, kw)
        q["correct"] = correct
        return finish(q, expl, kw)

    def O(stem, steps, expl, **kw):
        q, kw = base("order", stem, expl, kw)
        q["options"], q["correct"] = steps, list(range(len(steps)))
        return finish(q, expl, kw)

    def X(stem, rows, columns, correct, expl, **kw):
        q, kw = base("matrix", stem, expl, kw)
        q["rows"], q["columns"], q["correct"] = rows, columns, correct
        return finish(q, expl, kw)

    runpy.run_path(os.path.join(HERE, f"{name}.py"),
                   init_globals={"at": at, "S": S, "M": M, "N": N, "C": C, "H": H, "O": O, "X": X})
    return items


def interleave(groups):
    """Spread several domain lists through one stage by relative position."""
    blocks = []
    for gi, g in enumerate(groups):
        for i, q in enumerate(g):
            blocks.append(((i + 0.5) / len(g), gi, q))
    blocks.sort(key=lambda b: (b[0], b[1]))
    return [b[2] for b in blocks]


def build():
    stimuli = runpy.run_path(os.path.join(HERE, "stimuli.py"))["STIMULI"]
    pool = []
    for name, domain, section in SOURCES:
        pool += load(name, domain, section)
    out = []
    tests = sorted({q["_test"] for q in pool} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        n = 0
        mine = [q for q in pool if q["_test"] == test]
        for section in SECTION_ORDER:
            sec = [q for q in mine if q["section"] == section]
            stages = sorted({(q["_module"], q["_variant"]) for q in sec}, key=lambda s: (s[0], VARIANT_ORDER[s[1]]))
            for module, variant in stages:
                st = [q for q in sec if q["_module"] == module and q["_variant"] == variant]
                if section == "numeracy":
                    doms = []
                    for d in ("nap7Number", "nap7Measure", "nap7Stats"):
                        g = [q for q in st if q["domain"] == d]
                        if g:
                            doms.append(g)
                    st = interleave(doms)
                # conventions: spelling items come first (source order), as on the real test
                for q in st:
                    n += 1
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": q["section"], "test": test, "module": module}
                    if variant:
                        item["variant"] = variant
                    item.update({k: v for k, v in q.items() if not k.startswith("_") and k != "section"})
                    out.append(item)
    used = {q.get("stimulusId") for q in out} - {None}
    known = {s["id"] for s in stimuli}
    missing = used - known
    if missing:
        sys.exit(f"unknown stimuli: {sorted(missing)}")
    unused = known - used
    if unused:
        print(f"warning: unused stimuli {sorted(unused)}")
    dst = os.path.join(ROOT, "data/v2/naplan7/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    # Summary: counts per test, section, module, variant and per domain pool.
    from collections import Counter
    c = Counter((q["test"], q["section"], q["module"], q.get("variant")) for q in out)
    for k in sorted(c, key=lambda k: (k[0] or 99, SECTION_ORDER.index(k[1]), k[2], VARIANT_ORDER[k[3]])):
        print(k, c[k])
    d = Counter((q["domain"], "heldout" if q["test"] == 2 else "drillpool") for q in out)
    for k in sorted(d):
        print(k, d[k])
    print(f"naplan7: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")


if __name__ == "__main__":
    build()
