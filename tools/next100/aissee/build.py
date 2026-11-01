#!/usr/bin/env python3
"""Build the AISSEE Class 6 v2 bank from per-domain source files.

Usage: python3 -I tools/next100/aissee/build.py

Sources are Python data files in tools/next100/aissee/<domain>.py (one per
drill domain) plus stimuli.py (the reading passages). Each item calls
  S(test, difficulty, skill, stem, options, explanation, stim=None)
with the correct option FIRST. The build then orders the options:
- options that are all plain numbers (one shared unit, rupee sign or %
  allowed) are sorted ascending and locked, so the runtime keeps them in
  order; the key is found again by value after sorting;
- every other item is shuffled with a seed taken from the stem, so key
  positions spread out and stay stable between builds.
test is 1, 2 or 0 (drill only). Every item is four-option single answer,
like the real OMR paper.

Ids: AISSEE-T1-001.. in the real paper's order (Language 001-020,
Mathematics 021-060, Intelligence 061-080, General Knowledge 081-100),
AISSEE-T2-.., AISSEE-D-... Items that share a passage stay together in
source order; the other domains of a part are interleaved.

Lint (printed, never fatal): key strictly longest, em or en dashes, curly
quotes, "of the above", duplicate options or stems, a dollar sign.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "aissee"
PREFIX = "AISSEE"
SECTION = "ais"
# Parts in paper order. A part's domains are interleaved unless they use stimuli.
PARTS = [
    ["aisseeGrammar", "aisseeReading"],
    ["aisseeNumbers", "aisseeCommercial", "aisseeGeometry"],
    ["aisseeReasoning"],
    ["aisseeIndia", "aisseeScience"],
]
DOMAINS = [d for p in PARTS for d in p]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 4, stem
    assert len(set(opts)) == 4, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


NUM = re.compile(r"^(₹\s?)?(-?[\d,]*\.?\d+)\s*(.*)$")


def numeric_values(opts):
    """Values when every option is a number with the same prefix and unit, else None."""
    vals, shapes = [], set()
    for o in opts:
        m = NUM.match(o.strip())
        if not m:
            return None
        raw = m.group(2).replace(",", "")
        try:
            vals.append(float(raw))
        except ValueError:
            return None
        shapes.add((m.group(1) or "", m.group(3)))
    return vals if len(shapes) == 1 else None


def ordered(q):
    opts = q["options"]
    vals = numeric_values(opts)
    out = dict(q)
    if vals is not None:
        key_val = vals[0]
        order = sorted(range(4), key=lambda i: vals[i])
        out["options"] = [opts[i] for i in order]
        out["correct"] = [out["options"].index(opts[0])]
        assert vals[order[out["correct"][0]]] == key_val
        out["lockedOrder"] = True
        return out
    seed = int(hashlib.sha256((q["stem"] + "|" + "|".join(opts)).encode()).hexdigest()[:12], 16)
    order = list(range(4))
    random.Random(seed).shuffle(order)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(c in t for t in texts for c in "—–‘’“”"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if any("$" in t for t in texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    return len(q["options"][k]) > max(len(o) for i, o in enumerate(q["options"]) if i != k)


def load(name):
    g = {"S": S, "__name__": "aissee_source"}
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
        seq = []
        for part in PARTS:
            loose, blocks = [], []
            for di, d in enumerate(part):
                mine = [q for q in items[d] if q["test"] == test]
                if any(q.get("stimulusId") for q in mine):
                    blocks += mine
                    continue
                for i, q in enumerate(mine):
                    loose.append(((i + 0.5) / len(mine), di, q))
            loose.sort(key=lambda b: (b[0], b[1]))
            seq += [b[2] for b in loose] + blocks
        for n, q in enumerate(seq, 1):
            q = ordered(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
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
        print(f"  test {test}: {row} = {sum(row)}")
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    free = [q for q in out if not q.get("lockedOrder")]
    print("  key positions (shuffled items):", dict(sorted(Counter(q["correct"][0] for q in free).items())))
    locked = [q for q in out if q.get("lockedOrder")]
    ends = sum(1 for q in locked if q["correct"][0] in (0, 3))
    print(f"  sorted number items: {len(locked)}, key in an end slot {ends} = {ends / max(1, len(locked)):.0%}",
          dict(sorted(Counter(q["correct"][0] for q in locked).items())))
    for (sid, s), n in Counter((q.get("stimulusId"), q["stem"]) for q in out).items():
        if n > 1:
            print("  WARN duplicate stem:", sid, s[:80])
    refs = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    for sid in sorted(stim_ids):
        if refs[sid] != 5:
            print(f"  WARN stimulus {sid} has {refs[sid]} questions")
    for q in out:
        if not q.get("stimulusId") and re.search(r"\bthe passage\b|\bthe story\b", q["stem"], re.I):
            print("  WARN passage wording without stimulusId:", q["id"])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        for q in longest:
            print("  LONGEST", q["id"], q["domain"], q["options"][q["correct"][0]])
    if os.environ.get("SHOW_LOCKED"):
        for q in locked:
            print("  LOCKED", q["id"], q["correct"][0], q["options"])


if __name__ == "__main__":
    build()
