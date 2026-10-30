#!/usr/bin/env python3
"""Build the CTET Paper I v2 bank from per-domain source files.

Usage: python3 -I tools/ctet/build.py

Sources are Python data files in tools/ctet/<domain>.py (one per drill domain)
plus stimuli.json for the Language I reading passages. Every item carries test
(1, 2 or 0 = drill only), difficulty (1 to 3) and a skill label (the CTET
syllabus unit it maps to).

Authoring convention (as in tools/pmp): a single or multi item lists its
correct option(s) first. The build shuffles options with a seed taken from the
stem, so key positions spread out and stay stable from build to build.

Ids: CTET-T1-001.., CTET-T2-001.., CTET-D-001... Within a test the sections
run in paper order (CDP, Language I, Mathematics, EVS); inside a section the
passage items come first (in passage and step order), then each domain in
syllabus order (content before pedagogy), as on the real paper.

Lint (printed, never fatal): key strictly longest, numeric stems that do not
say "Type the number only", em or en dashes, "all/none of the above".
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "ctet"
PREFIX = "CTET"
SECTIONS = {
    "cdp": ["ctetDev", "ctetLearn"],
    "lang": ["ctetComp", "ctetLangPed"],
    "maths": ["ctetMaths", "ctetMathsPed"],
    "evs": ["ctetEvs", "ctetEvsPed"],
}
DOMAINS = [d for ds in SECTIONS.values() for d in ds]
SECTION_OF = {d: s for s, ds in SECTIONS.items() for d in ds}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


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


def M(t, d, skill, stem, opts, n, expl, **kw):
    q = _base("multi", t, d, skill, stem, expl, **kw)
    q["options"], q["correct"], q["select"] = opts, list(range(n)), n
    return q


def N(t, d, skill, stem, answers, expl, **kw):
    q = _base("numeric", t, d, skill, stem, expl, **kw)
    q["numeric"] = {"answers": answers, "tolerance": 0, "wholeNumber": all(a.isdigit() for a in answers)}
    return q


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
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
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
    if "$" in q["stem"] or any("$" in o for o in q.get("options", [])):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "M": M, "N": N, "__name__": "ctet_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    stimuli = json.load(open(os.path.join(HERE, "stimuli.json")))
    stim_ids = {s["id"] for s in stimuli}
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            q["domain"] = d
            if q.get("stimulusId"):
                assert q["stimulusId"] in stim_ids, q["stimulusId"]
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:60]!r}")
        items[d] = src
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
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
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                for k in ("stimulusId", "stem", "select", "options", "correct", "numeric", "explanation"):
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
    for test in tests:
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    for test in tests:
        fmt = Counter(q["format"] for q in allq if q["test"] == test)
        print(f"  test {test} formats {dict(fmt)}")
    singles = [q for q in allq if q["format"] == "single"]
    longest = sum(1 for q in singles if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(singles)} singles = {longest / len(singles):.0%}")
    keys = Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-key positions:", dict(sorted(keys.items())))
    stems = Counter(q["stem"] for q in allq)
    for s, c in stems.items():
        if c > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
