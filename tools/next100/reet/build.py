#!/usr/bin/env python3
"""Build the REET Level 1 v2 bank from per-domain source files.

Usage: python3 -I tools/next100/reet/build.py

Template: tools/ctet/build.py. Sources are Python data files, one per domain,
plus stimuli.py for the reading passages (Hindi gadyansh and English prose).
Every item carries test (1, 2 or 0 = drill only), difficulty (1 to 3) and a
skill label (the REET syllabus unit).

Authoring convention: a single item lists its correct option first. The build
shuffles options with a seed taken from the stem, so key positions spread out
and stay stable from build to build. When every option is a number, the
options are sorted ascending instead and the item gets lockedOrder, so the
runtime never reshuffles them; the key is found by value after sorting.

Ids: REET-T1-001.., REET-T2-001.., REET-D-001... Within a test the sections run
in paper order (CDP, Language I Hindi, Language II English, Mathematics, EVS);
inside a section the passage items come first, then each domain in order
(content before pedagogy).
"""
import hashlib, json, os, random, re
from collections import Counter
from fractions import Fraction

EXAM = "reet"
PREFIX = "REET"
SECTIONS = {
    "cdp": ["reetCdp"],
    "hindi": ["reetHindi", "reetHindiPed"],
    "english": ["reetEnglish", "reetEnglishPed"],
    "maths": ["reetMaths", "reetMathsPed"],
    "evs": ["reetEvs", "reetEvsPed"],
}
DOMAINS = [d for ds in SECTIONS.values() for d in ds]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def _base(fmt, t, d, skill, stem, expl, stim=None, step=0):
    q = {"test": t, "difficulty": d, "skill": skill, "format": fmt, "stem": stem, "explanation": expl}
    if stim:
        q["stimulusId"] = stim
        q["caseStep"] = step
    return q


def S(t, d, skill, stem, opts, expl, **kw):
    q = _base("single", t, d, skill, stem, expl, **kw)
    q["options"], q["correct"] = opts, [0]
    return q


def N(t, d, skill, stem, answers, expl, **kw):
    q = _base("numeric", t, d, skill, stem, expl, **kw)
    q["numeric"] = {"answers": answers, "tolerance": 0, "wholeNumber": all(a.isdigit() for a in answers)}
    return q


NUM = re.compile(r"^(\d[\d,]*(?:\.\d+)?(?:/\d+)?)(?: (.+))?$")


def as_number(opts):
    """Return numeric values when every option is a number with the same unit, else None."""
    vals, units = [], set()
    for o in opts:
        m = NUM.match(o)
        if not m:
            return None
        units.add(m.group(2) or "")
        vals.append(Fraction(m.group(1).replace(",", "")))
    return vals if len(units) == 1 else None


def arrange(q):
    if q["format"] != "single":
        return q
    out = dict(q)
    vals = as_number(q["options"])
    if vals is not None:
        order = sorted(range(len(vals)), key=lambda i: vals[i])
        out["lockedOrder"] = True
    else:
        seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
        order = list(range(len(q["options"])))
        random.Random(seed).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "numeric" and "type the number only" not in q["stem"].lower():
        warn.append("numeric stem does not say 'Type the number only'")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def load(name):
    g = {"S": S, "N": N, "__name__": "reet_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path, encoding="utf-8").read(), path, "exec"), g)
    return g


def build():
    stimuli = load("stimuli")["STIMULI"]
    stim_ids = {s["id"] for s in stimuli}
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            if q.get("stimulusId"):
                assert q["stimulusId"] in stim_ids, q["stimulusId"]
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:60]!r}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, doms in SECTIONS.items():
            mine = [q for d in doms for q in items[d] if q["test"] == test]
            cases = {}
            for q in mine:
                if q.get("stimulusId"):
                    cases.setdefault(q["stimulusId"], []).append(q)
            ordered = []
            for sid in sorted(cases):
                ordered += sorted(cases[sid], key=lambda q: q["caseStep"])
            ordered += [q for q in mine if not q.get("stimulusId")]
            for q in ordered:
                n += 1
                q = arrange(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                for k in ("stimulusId", "stem", "options", "correct", "lockedOrder", "numeric", "explanation"):
                    if k in q:
                        item[k] = q[k]
                out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w", encoding="utf-8") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    singles = [q for q in allq if q["format"] == "single"]
    longest = sum(1 for q in singles if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(singles)} singles = {longest / len(singles):.0%}")
    keys = Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-key positions:", dict(sorted(keys.items())))
    locked = [q for q in out if q.get("lockedOrder")]
    ends = sum(1 for q in locked if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  number items (sorted, locked): {len(locked)}, key in an end slot: {ends}")
    for q in locked:
        print(f"    {q['id']}: {q['options']} key {q['options'][q['correct'][0]]}")
    for s, c in Counter(q["stem"] for q in allq).items():
        if c > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
