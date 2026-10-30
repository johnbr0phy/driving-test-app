#!/usr/bin/env python3
"""Build the GMAT Focus v2 bank from the section source files.

Usage: python3 -I tools/gmat/build.py

Sources are Python data in tools/gmat/quant.py, verbal.py and di.py. Each
defines TESTS = {1: [...], 2: [...], 0: [...]} with the items of that section
in presentation order (0 = drill only), plus STIMULI (shared passages and
multi-source sets). The build numbers items in order across a test's sections
(Quant, then Verbal, then Data Insights): GMAT-T1-001..064, GMAT-T2-..,
GMAT-D-.., so questionsForStage (sorted by id) shows them in authored order
and every shared-stimulus block stays together.

Option order:
- Quant problem solving, Data Sufficiency and numeric Data Insights items
  keep the authored order (lockedOrder), as on the real exam: numbers run
  smallest to largest and Data Sufficiency choices are the fixed five.
  Their key index is authored explicitly.
- Verbal items list the key first and are shuffled by a seed taken from the
  stem, so key positions spread out and stay stable from build to build
  (the runner shuffles again per attempt).

Write currency as \\$ and math as $...$ (KaTeX) in the sources.
Lint (printed, never fatal): key strictly longest among verbal singles,
em or en dashes, curly quotes, duplicate options or stems.
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "gmat"
PREFIX = "GMAT"
SECTIONS = ["quant", "verbal", "di"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))

DS_OPTIONS = [
    "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
    "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
    "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
    "EACH statement ALONE is sufficient.",
    "Statements (1) and (2) TOGETHER are not sufficient.",
]


def _base(fmt, domain, d, skill, stem, expl, passage=None, stim=None):
    q = {"domain": domain, "difficulty": d, "skill": skill, "format": fmt, "stem": stem, "explanation": expl}
    if passage:
        q["passage"] = passage
    if stim:
        q["stimulusId"] = stim
    return q


def PS(domain, d, skill, stem, opts, key, expl, **kw):
    """Problem solving or any numeric single: options in authored order, key index given."""
    q = _base("single", domain, d, skill, stem, expl, **kw)
    q["options"], q["correct"], q["lockedOrder"] = opts, [key], True
    return q


def V(domain, d, skill, stem, opts, expl, **kw):
    """Verbal single: key first, shuffled by the build."""
    q = _base("single", domain, d, skill, stem, expl, **kw)
    q["options"], q["correct"], q["shuffle"] = opts, [0], True
    return q


def DS(d, skill, question, s1, s2, letter, expl):
    stem = f"{question}\n\n(1) {s1}\n\n(2) {s2}"
    q = _base("single", "gmatDS", d, skill, stem, expl)
    q["options"], q["correct"], q["lockedOrder"] = DS_OPTIONS, ["ABCDE".index(letter)], True
    return q


def X(domain, d, skill, stem, rows, cols, key, expl, **kw):
    q = _base("matrix", domain, d, skill, stem, expl, **kw)
    q["rows"], q["columns"], q["correct"] = rows, cols, key
    return q


def C(domain, d, skill, stem, blanks, key, expl, **kw):
    q = _base("cloze", domain, d, skill, stem, expl, **kw)
    q["blanks"], q["correct"] = blanks, key
    return q


HELPERS = {"PS": PS, "V": V, "DS": DS, "X": X, "C": C}


def shuffled(q):
    if not q.pop("shuffle", False):
        return q
    seed = int(hashlib.sha256(q["stem"].encode() + (q.get("passage") or "").encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(c) for c in q["correct"]]
    return out


def lint(q, where):
    warn = []
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", []),
             *[c for b in q.get("blanks", []) for c in b]]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2018\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    for b in q.get("blanks", []):
        if len(set(b)) != len(b):
            warn.append("duplicate cloze choice")
    if q.get("shuffle"):
        key = len(q["options"][0])
        if key > max(len(o) for o in q["options"][1:]):
            warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    return [f"{where}: {w}" for w in warn]


def load(section):
    g = dict(HELPERS, __name__=f"gmat_{section}")
    path = os.path.join(HERE, f"{section}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["TESTS"], g.get("STIMULI", [])


def build():
    tests, stimuli, warnings = {}, [], []
    for sec in SECTIONS:
        t, s = load(sec)
        tests[sec] = t
        stimuli += s
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for sec in SECTIONS:
            for i, q in enumerate(tests[sec].get(test, [])):
                warnings += lint(q, f"{sec} t{test}[{i}] {q['stem'][:50]!r}")
                q = shuffled(dict(q))
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": sec, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                for k in ("stimulusId", "passage", "stem", "options", "rows", "columns", "blanks", "correct", "lockedOrder", "explanation"):
                    if k in q:
                        item[k] = q[k]
                out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for test in (1, 2, 0):
        row = Counter((q["section"], q["domain"]) for q in out if q["test"] == test)
        secs = Counter(q["section"] for q in out if q["test"] == test)
        print(f"  test {test}: {dict(secs)}  {dict(sorted(row.items()))}")
    fmt = Counter(q["format"] for q in out)
    print("  formats:", dict(fmt))
    verbal = [q for q in out if q["section"] == "verbal"]
    singles = [q for q in out if q["format"] == "single" and q["domain"] != "gmatDS"]
    def key_longest(q):
        k = len(q["options"][q["correct"][0]])
        return k > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0])
    lv = sum(key_longest(q) for q in verbal)
    ls = sum(key_longest(q) for q in singles)
    print(f"  key strictly longest: verbal {lv}/{len(verbal)} = {lv / len(verbal):.0%}; all non-DS singles {ls}/{len(singles)} = {ls / len(singles):.0%}")
    for name, group in (("quant", [q for q in out if q["section"] == "quant"]), ("verbal", verbal),
                        ("DS", [q for q in out if q["domain"] == "gmatDS"])):
        print(f"  {name} key positions:", dict(sorted(Counter(q["correct"][0] for q in group).items())))
    stems = Counter((q.get("passage", ""), q.get("stimulusId", ""), q["stem"]) for q in out)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[2][:80])
    sids = {s["id"] for s in stimuli}
    for q in out:
        if q.get("stimulusId") and q["stimulusId"] not in sids:
            print("  WARN unknown stimulus", q["id"], q["stimulusId"])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
