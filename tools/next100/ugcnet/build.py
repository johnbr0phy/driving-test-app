#!/usr/bin/env python3
"""Build the UGC-NET Paper 1 v2 bank from per-unit source files.

Usage: python3 -I tools/next100/ugcnet/build.py

Sources are Python data files in tools/next100/ugcnet/<domain>.py, one per
syllabus unit (the UGC NET Bureau's Paper I syllabus has ten units and sets
five questions from each), plus stimuli.py (the reading comprehension
passages and the data interpretation tables). Each item calls

  S(test, difficulty, skill, stem, options, explanation, stim=None)
      correct option FIRST; the build shuffles options with a seed taken
      from the stem, so key positions spread out and stay stable.
  L(test, difficulty, skill, stem, options, key, explanation, stim=None)
      positional option sets (Statement I / Statement II); options stay in
      the given order, key is the index of the correct one, and the item is
      emitted with lockedOrder.

An S item whose options are all plain numbers is sorted ascending and
locked (the key is found again by value after sorting). test is 1, 2 or 0
(drill only). Every item is four-option single answer, like the real CBT.

Ids: UGCNET-T1-001.., UGCNET-T2-.., UGCNET-D-... Within a test the units run
in syllabus order (I to X), five questions each; passage and table items
stay together in source order.

Lint (printed, never fatal): key strictly longest, em or en dashes, curly
quotes, "of the above", duplicate options or stems, a dollar sign, a stem
that mentions the passage or table without a stimulusId.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "ugcnet"
PREFIX = "UGCNET"
SECTION = "p1"
DOMAINS = [
    "ugcnetTeaching", "ugcnetResearch", "ugcnetComprehension", "ugcnetCommunication",
    "ugcnetMaths", "ugcnetLogic", "ugcnetData", "ugcnetIct", "ugcnetEnvironment",
    "ugcnetHigherEd",
]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))

# Statement I / Statement II option set, in NTA's usual order (locked).
STMT = [
    "Both Statement I and Statement II are true",
    "Both Statement I and Statement II are false",
    "Statement I is true but Statement II is false",
    "Statement I is false but Statement II is true",
]


def S(t, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 4, stem
    assert len(set(opts)) == 4, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def L(t, d, skill, stem, opts, key, expl, stim=None):
    q = S(t, d, skill, stem, [opts[key]] + [o for i, o in enumerate(opts) if i != key], expl, stim)
    q["options"], q["correct"], q["locked"] = list(opts), [key], True
    return q


NUMOPT = re.compile(r"^(\D*?)(-?\d[\d,]*(?:\.\d+)?)(\D*)$")


def num_parts(o):
    m = NUMOPT.match(o)
    return (m.group(1), float(m.group(2).replace(",", "")), m.group(3)) if m else None


def is_numeric(q):
    """All options are one number with the same prefix and suffix (12, 12%, 72 km/h)."""
    parts = [num_parts(o) for o in q["options"]]
    return all(parts) and len({(p[0], p[2]) for p in parts}) == 1


def arrange(q):
    out = dict(q)
    if q.get("locked"):
        out["lockedOrder"] = True
        return out
    if is_numeric(q):
        key = q["options"][q["correct"][0]]
        opts = sorted(q["options"], key=lambda o: num_parts(o)[1])
        out["options"], out["correct"], out["lockedOrder"] = opts, [opts.index(key)], True
        return out
    seed = int(hashlib.sha256((q["stem"] + "|" + "|".join(q["options"])).encode()).hexdigest()[:12], 16)
    order = list(range(4))
    random.Random(seed).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(c in t for t in texts for c in "\u2014\u2013\u2018\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if any("$" in t for t in texts):
        warn.append("dollar sign")
    low = q["stem"].lower()
    if not q.get("stimulusId") and ("the passage" in low or "the table" in low or "the chart" in low):
        warn.append("mentions a passage/table but has no stimulusId")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    return len(q["options"][k]) > max(len(o) for i, o in enumerate(q["options"]) if i != k)


def tables():
    """The data interpretation tables (ditables.py), shared by stimuli.py and ugcnetData.py."""
    g = {"__name__": "ugcnet_tables"}
    path = os.path.join(HERE, "ditables.py")
    exec(compile(open(path, encoding="utf-8").read(), path, "exec"), g)
    return g


def load(name):
    g = {"S": S, "L": L, "STMT": STMT, "TABLES": tables()["TABLES"], "render": tables()["render"], "__name__": "ugcnet_source"}
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
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:50]!r}")
            if q.get("stimulusId") and q["stimulusId"] not in stim_ids:
                warnings.append(f"{d}[{i}]: unknown stimulus {q['stimulusId']}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        ordered = [q for d in DOMAINS for q in items[d] if q["test"] == test]
        for n, q in enumerate(ordered, 1):
            q = arrange(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
            for k in ("stimulusId", "stem", "options", "correct", "lockedOrder", "explanation"):
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
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    nums = [q for q in out if q.get("lockedOrder") and is_numeric(q)]
    ends = sum(1 for q in nums if q["correct"][0] in (0, 3))
    print(f"  all-number items (sorted, locked): {len(nums)}, key in an end slot: {ends}")
    print(f"  Statement I/II items (locked): {sum(1 for q in out if q.get('lockedOrder') and not is_numeric(q))}")
    for (sid, s), n in Counter((q.get("stimulusId"), q["stem"]) for q in out).items():
        if n > 1:
            print("  WARN duplicate stem:", sid, s[:80])
    refs = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    for sid in sorted(stim_ids):
        if refs[sid] != 5:
            print(f"  WARN stimulus {sid} has {refs[sid]} questions")
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        for q in longest:
            print("  LONGEST", q["id"], q["domain"], q["options"][q["correct"][0]])
    if os.environ.get("SHOW_NUMS"):
        for q in nums:
            print("  NUM", q["id"], q["options"], "key", q["options"][q["correct"][0]])


if __name__ == "__main__":
    build()
