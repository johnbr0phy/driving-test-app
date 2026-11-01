#!/usr/bin/env python3
"""Build the UPTET Paper 1 v2 bank from per-domain source files.

Usage: python3 -I tools/next100/uptet/build.py

Template: tools/ctet/build.py. Sources are Python data files in
tools/next100/uptet/<domain>.py (one per drill domain) plus stimuli.json for the
Hindi and English reading passages. Every item carries test (1, 2 or 0 = drill
only), difficulty (1 to 3) and a skill label.

Authoring convention: a single item lists its correct option FIRST. The build
shuffles options with a seed taken from the stem, so key positions spread out
and stay stable from build to build. Options that are all numbers (optionally
with the same unit, a "Rs " prefix, Indian digit commas or a/b fractions) are
sorted ascending instead and marked lockedOrder, so the app never reshuffles
them; the build then finds the key by value and asserts it.

Ids: UPTET-T1-001.., UPTET-T2-.., UPTET-D-... Within a test the sections run in
paper order (CDP, Language I Hindi, Language II English, Mathematics, EVS);
inside a section the passage items come first (in passage and step order), then
each domain in syllabus order (content before pedagogy).

Lint (printed, never fatal): key strictly longest, numeric stems that do not
say "Type the number only", em or en dashes, "all/none of the above".
"""
import hashlib, json, os, random, re
from collections import Counter
from fractions import Fraction

EXAM = "uptet"
PREFIX = "UPTET"
SECTIONS = {
    "cdp": ["uptetDev", "uptetLearn"],
    "hindi": ["uptetHindi", "uptetHindiPed"],
    "english": ["uptetEnglish"],
    "maths": ["uptetMaths", "uptetMathsPed"],
    "evs": ["uptetEvs", "uptetEvsPed"],
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
    assert len(opts) == 4, stem
    q = _base("single", t, d, skill, stem, expl, **kw)
    q["options"], q["correct"] = opts, [0]
    return q


def N(t, d, skill, stem, answers, expl, **kw):
    q = _base("numeric", t, d, skill, stem, expl, **kw)
    q["numeric"] = {"answers": answers, "tolerance": 0, "wholeNumber": all(a.isdigit() for a in answers)}
    return q


NUM = re.compile(r"^(Rs )?(\d+/\d+|\d[\d,]*(?:\.\d+)?)(\s?[^\d\s/].*)?$")


def numeric_value(opt):
    """(value, unit) when an option is a plain number, else None."""
    m = NUM.match(opt.strip())
    if not m:
        return None
    raw = m.group(2).replace(",", "")
    val = Fraction(raw) if "/" in raw else Fraction(raw)
    return val, (m.group(1) or "") + "|" + (m.group(3) or "")


def arranged(q):
    if q["format"] != "single":
        return q
    out = dict(q)
    vals = [numeric_value(o) for o in q["options"]]
    if all(vals) and len({v[1] for v in vals}) == 1:
        order = sorted(range(4), key=lambda i: vals[i][0])
        assert len({v[0] for v in vals}) == 4, f"equal values: {q['stem']}"
        out["lockedOrder"] = True
    else:
        seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
        order = list(range(4))
        random.Random(seed).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    assert out["options"][out["correct"][0]] == q["options"][0]
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
    if q["format"] == "single":
        key = len(q["options"][0])
        if key > max(len(o) for o in q["options"][1:]):
            warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
        if len(set(q["options"])) != 4:
            warn.append("duplicate option")
    if any("$" in t for t in texts):
        warn.append("dollar sign")
    low = q["stem"].lower()
    if not q.get("stimulusId") and ("passage" in low or "गद्यांश" in q["stem"]):
        warn.append("mentions a passage but has no stimulusId")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "N": N, "__name__": "uptet_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path, encoding="utf-8").read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    stimuli = json.load(open(os.path.join(HERE, "stimuli.json"), encoding="utf-8"))
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
                q = arranged(q)
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
    print("  domains:", DOMAINS)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    singles = [q for q in allq if q["format"] == "single"]
    longest = sum(1 for q in singles if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(singles)} singles = {longest / len(singles):.0%}")
    built = [q for q in out if q["format"] == "single"]
    print("  shuffled key positions:", dict(sorted(Counter(q["correct"][0] for q in built if not q.get("lockedOrder")).items())))
    locked = [q for q in built if q.get("lockedOrder")]
    ends = sum(1 for q in locked if q["correct"][0] in (0, 3))
    print(f"  sorted number items: {len(locked)}, key in an end slot {ends} ({ends / max(1, len(locked)):.0%}),",
          dict(sorted(Counter(q["correct"][0] for q in locked).items())))
    for s, c in Counter(q["stem"] for q in allq).items():
        if c > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
