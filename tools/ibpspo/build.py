#!/usr/bin/env python3
"""Build the IBPS PO Prelims v2 bank from per-domain source files.

Usage: python3 -I tools/ibpspo/build.py

Sources are Python data files in tools/ibpspo/<domain>.py (one per drill
domain) plus stimuli.py (reading passages, cloze passages, para jumbles, data
interpretation tables and puzzles as text). Every item is five-option single
answer, the only format on the real Prelims.

Helpers:
  S(test, difficulty, skill, stem, options, explanation, stim=None)
      correct option FIRST; the build shuffles with a seed from the stem.
  L(test, difficulty, skill, stem, options, key, explanation, stim=None)
      fixed option order (error spotting letters, quadratic relations,
      inequality and syllogism conclusions, jumble letters); `key` is the index
      and the item carries lockedOrder so the runner never shuffles it.
test is 1, 2 or 0 (drill only).

Ids: IBPSPO-T1-001.. (English 001-030, Quant 031-065, Reasoning 066-100 in
each test), IBPSPO-T2-.., IBPSPO-D-... Items sharing a stimulus stay together
in source order.

Lint (printed, never fatal): key strictly longest, em or en dashes, double
underscores (RichText underline), "of the above", duplicate options or stems,
an item reused across tests.
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "ibpspo"
PREFIX = "IBPSPO"
SECTIONS = [
    ("eng", ["engReading", "engCloze", "engGrammar"]),
    ("quant", ["qtNumber", "qtDI", "qtArith"]),
    ("reason", ["rsLogic", "rsPuzzle", "rsVerbal"]),
]
DOMAINS = [d for _, ds in SECTIONS for d in ds]
SECTION_OF = {d: s for s, ds in SECTIONS for d in ds}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))

# Shared fixed option sets.
QUAD = ["x > y", "x < y", "x ≥ y", "x ≤ y", "x = y or no relation can be established"]
CONC = ["Only I follows", "Only II follows", "Either I or II follows", "Neither I nor II follows", "Both I and II follow"]
LETTERS = ["A", "B", "C", "D", "E"]
ERR = "Read the sentence and find the part that contains an error. If there is no error, choose E."


def S(t, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 5, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def L(t, d, skill, stem, opts, key, expl, stim=None):
    assert len(opts) == 5 and 0 <= key < 5, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [key], "lockedOrder": True, "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def shuffled(q):
    if q.get("lockedOrder"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode() + "|".join(q["options"]).encode()).hexdigest()[:12], 16)
    order = list(range(5))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("__" in t for t in texts):
        warn.append("double underscore")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(set(q["options"])) != 5:
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    others = [len(o) for i, o in enumerate(q["options"]) if i != k]
    return len(q["options"][k]) > max(others)


def load(name):
    g = {"S": S, "L": L, "QUAD": QUAD, "CONC": CONC, "LETTERS": LETTERS, "ERR": ERR, "__name__": "ibpspo_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g


def build():
    stimuli = load("stimuli")["STIMULI"]
    stim_ids = {s["id"] for s in stimuli}
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
            if q.get("stimulusId") and q["stimulusId"] not in stim_ids:
                warnings.append(f"{d}[{i}]: unknown stimulus {q['stimulusId']}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, doms in SECTIONS:
            for d in doms:
                for q in items[d]:
                    if q["test"] != test:
                        continue
                    n += 1
                    q = shuffled(q)
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                            "domain": d, "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
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
        secs = Counter(SECTION_OF[d] for d in DOMAINS for _ in range(per[(test, d)]))
        print(f"  test {test}: {row} = {sum(row)}  {dict(secs)}")
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    stems = Counter((q.get("stimulusId"), q["stem"]) for q in out)
    for (sid, s), n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", sid, s[:80])
    used = Counter(s["id"] for s in stimuli)
    refs = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    for sid in stim_ids:
        if not refs[sid]:
            print("  WARN unused stimulus", sid)
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
