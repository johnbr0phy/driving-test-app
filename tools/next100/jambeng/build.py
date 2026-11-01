#!/usr/bin/env python3
"""Build the JAMB UTME Use of English v2 bank from per-domain source files.

Usage: python3 -I tools/next100/jambeng/build.py

Sources are Python data files in tools/next100/jambeng/<domain>.py (one per
drill domain) plus stimuli.py (original comprehension and cloze passages).
Every item is four-option single answer, like the real UTME CBT.

Helper:
  S(test, difficulty, skill, stem, options, explanation, stim=None)
      correct option FIRST; the build shuffles with a seed from the stem and
      options.
test is 1, 2 or 0 (drill only).

Ids: JAMBENG-T1-001..060 (in paper order: comprehension, cloze, sentence
interpretation, synonyms and antonyms, sentence completion, oral forms),
JAMBENG-T2-.., JAMBENG-D-... Items sharing a stimulus stay together in source
order.

Lint (printed, never fatal): key strictly longest, em or en dashes, "of the
above", duplicate options or stems, dollar signs, letter references in
explanations.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "jambeng"
PREFIX = "JAMBENG"
SECTION = "eng"
DOMAINS = ["jambengComprehension", "jambengCloze", "jambengInterpretation",
           "jambengVocabulary", "jambengCompletion", "jambengOral"]
PER_TEST = {"jambengComprehension": 15, "jambengCloze": 10, "jambengInterpretation": 5,
            "jambengVocabulary": 10, "jambengCompletion": 10, "jambengOral": 10}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 4, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def shuffled(q):
    seed = int(hashlib.sha256(q["stem"].encode() + "|".join(q["options"]).encode()).hexdigest()[:12], 16)
    order = list(range(4))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    if re.search(r"\b(option|choice) [A-D]\b", q["explanation"]):
        warn.append("letter reference in explanation")
    return [f"{where}: {w}" for w in warn]


def plain(s):
    return s.replace("__", "")


def key_longest(q):
    k = q["correct"][0]
    others = [len(plain(o)) for i, o in enumerate(q["options"]) if i != k]
    return len(plain(q["options"][k])) > max(others)


def load(name):
    g = {"S": S, "__name__": "jambeng_source"}
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
        for t in (1, 2):
            n = sum(1 for q in src if q["test"] == t)
            if n != PER_TEST[d]:
                warnings.append(f"{d}: test {t} has {n}, expected {PER_TEST[d]}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for d in DOMAINS:
            for q in items[d]:
                if q["test"] != test:
                    continue
                n += 1
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                        "domain": d, "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
                for k in ("stimulusId", "stem", "options", "correct", "explanation"):
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
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    by_dom = Counter(q["domain"] for q in longest)
    print("  key longest by domain:", dict(by_dom))
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    stems = Counter((q.get("stimulusId"), q["stem"]) for q in out)
    for (sid, s), n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", sid, s[:80])
    refs = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    for sid in sorted(stim_ids):
        if not refs[sid]:
            print("  WARN unused stimulus", sid)
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
