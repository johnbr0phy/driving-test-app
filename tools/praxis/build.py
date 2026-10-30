#!/usr/bin/env python3
"""Build the Praxis Core v2 bank from per-domain source files.

Usage: python3 -I tools/praxis/build.py

Sources are Python data files in tools/praxis/<domain>.py (one per domain)
plus stimuli.py for the shared reading passages and revision drafts. Each item
carries test (1, 2 or 0 = drill only), difficulty (1 to 3) and a skill label.

Helpers:
  S(...)   single answer, key written FIRST; the build shuffles the options
           with a seed taken from the stem, so key positions spread out.
  SF(...)  single answer in a fixed order (usage "No error" items and sentence
           correction, where choice A repeats the original); key index given.
  M(...)   select all that apply, keys written first, shuffled like S.
  N(...)   numeric entry ("Type the number only").
Keyword args: passage=..., stim=<stimulus id>, step=<order inside it>,
basics=<Basics skill id the item exercises>.

Ids: PRAXIS-T1-001.., PRAXIS-T2-001.., PRAXIS-D-001... Within a test the
sections run Reading, Writing, Math; inside a section the single items of each
domain interleave and each stimulus stays one block in step order.

Text is written as the bank stores it: "$...$" is KaTeX, money is "\\$".
Lint (printed, never fatal): key strictly longest, numeric stems without
"Type the number only", dashes and curly quotes, "of the above".
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "praxis"
PREFIX = "PRAXIS"
SECTIONS = {
    "reading": ["praxisIdeas", "praxisCraft", "praxisIntegration"],
    "writing": ["praxisRevision", "praxisLanguage"],
    "math": ["praxisNumber", "praxisData", "praxisAlgGeo"],
}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def _base(fmt, t, d, skill, stem, expl, passage=None, stim=None, step=0, basics=None):
    q = {"test": t, "difficulty": d, "skill": skill, "format": fmt, "stem": stem, "explanation": expl}
    if passage:
        q["passage"] = passage
    if stim:
        q["stimulusId"] = stim
        q["step"] = step
    if basics:
        q["basics"] = basics
    return q


def S(t, d, skill, stem, opts, expl, **kw):
    q = _base("single", t, d, skill, stem, expl, **kw)
    q["options"], q["correct"] = opts, [0]
    return q


def SF(t, d, skill, stem, opts, key, expl, **kw):
    q = _base("single", t, d, skill, stem, expl, **kw)
    q["options"], q["correct"], q["lockedOrder"] = opts, [key], True
    return q


def M(t, d, skill, stem, opts, n, expl, **kw):
    q = _base("multi", t, d, skill, stem, expl, **kw)
    q["options"], q["correct"] = opts, list(range(n))
    return q


def N(t, d, skill, stem, answers, expl, **kw):
    q = _base("numeric", t, d, skill, stem, expl, **kw)
    q["numeric"] = {"answers": answers, "tolerance": 0}
    return q


def shuffled(q):
    if q["format"] not in ("single", "multi") or q.get("lockedOrder"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def key_longest(q):
    if q["format"] != "single":
        return False
    k = q["correct"][0]
    others = [len(o) for i, o in enumerate(q["options"]) if i != k]
    return len(q["options"][k]) > max(others)


def lint(q, where):
    warn = []
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", [])]
    if any(c in t for t in texts for c in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("dash or curly quote")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "numeric":
        if "type the number only" not in q["stem"].lower():
            warn.append("numeric stem does not say 'Type the number only'")
        for a in q["numeric"]["answers"]:
            if any(c not in "0123456789./-" for c in a):
                warn.append(f"numeric answer {a!r} has other characters")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(name):
    g = {"S": S, "SF": SF, "M": M, "N": N, "__name__": "praxis_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g


def build():
    stimuli = load("stimuli")["STIMULI"]
    stim_ids = {s["id"] for s in stimuli}
    items, warnings = {}, []
    domains = [d for ds in SECTIONS.values() for d in ds]
    for d in domains:
        src = load(d)["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            if q.get("stimulusId") and q["stimulusId"] not in stim_ids:
                warnings.append(f"{d}[{i}]: unknown stimulus {q['stimulusId']}")
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, sec_domains in SECTIONS.items():
            blocks = []
            for di, d in enumerate(sec_domains):
                singles = [q for q in items[d] if q["test"] == test and not q.get("stimulusId")]
                for i, q in enumerate(singles):
                    blocks.append(((i + 0.5) / len(singles), di, [q]))
            cases = {}
            for d in sec_domains:
                for q in items[d]:
                    if q["test"] == test and q.get("stimulusId"):
                        cases.setdefault(q["stimulusId"], []).append(q)
            for k, sid in enumerate(sorted(cases)):
                qs = sorted(cases[sid], key=lambda q: q["step"])
                blocks.append(((k + 0.75) / (len(cases) + 0.5), -1, qs))
            blocks.sort(key=lambda b: (b[0], b[1]))
            if section == "writing":
                # The real selected-response section runs usage, sentence
                # correction, revision in context, then research skills.
                def part(b):
                    s = b[2][0]["skill"]
                    return 0 if s.startswith("Usage") else 1 if s.startswith("Sentence") else 3 if s.startswith("Research") else 2
                blocks.sort(key=part)
            for _, _, qs in blocks:
                for q in qs:
                    n += 1
                    q = shuffled(q)
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                            "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                    for k in ("basics", "stimulusId", "passage", "stem", "options", "correct", "lockedOrder", "numeric", "explanation"):
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
        row = {d: per[(test, d)] for d in domains}
        print(f"  test {test}: {row} = {sum(row.values())}")
    fmt = Counter((q["test"], q["format"]) for q in out)
    print("  formats:", dict(sorted(fmt.items())))
    singles = [q for q in out if q["format"] == "single"]
    longest = sum(1 for q in singles if key_longest(q))
    print(f"  key strictly longest: {longest}/{len(singles)} singles = {longest / len(singles):.0%}")
    keys = Counter(q["correct"][0] for q in singles)
    print("  single-key positions:", dict(sorted(keys.items())))
    used = Counter(q["stimulusId"] for q in out if q.get("stimulusId"))
    for s in stimuli:
        if not used[s["id"]]:
            print("  WARN unused stimulus", s["id"])
    stems = Counter((q.get("passage", ""), q["stem"]) for q in out)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[1][:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
