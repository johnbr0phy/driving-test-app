#!/usr/bin/env python3
"""Build the MCAT v2 bank from Python-data sources.

Usage: python3 -I tools/next100/mcat/build.py

Sources, one file per section, in test-day order: cp.py (Chemical and
Physical Foundations), cars.py (Critical Analysis and Reasoning Skills),
bb.py (Biological and Biochemical Foundations), ps.py (Psychological,
Social, and Biological Foundations of Behavior). Each file has STIMULI
(the passages) and ITEMS. Each item is
  Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong],
    explanation, stim=None, locked=False, chk=None)
with test 1 or 2 (both practice tests; there are no drill-only items, the
drills draw on Practice Test 1 and Test 2 is held out). The key is always
written first; the build shuffles the four options with a seed from the
stem. Options that are all numbers (with an optional unit) are sorted and
locked, and locked=True keeps the authored order.

chk: for a computed answer, the value the key must show. The build parses
the first number in each option, asserts the key equals chk (within 1%)
and that no distractor does.

Each practice test is four sections, one module each: cp 30, cars 27,
bb 30, ps 30, in authored order (a passage set stays together). Ids
MCAT-T<n>-<SEC>-NN, so the id sort keeps that order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "MCAT"
SECTIONS = [("cp", "CP", 30), ("cars", "CARS", 27), ("bb", "BB", 30), ("ps", "PS", 30)]
BLUEPRINT = {
    "cp": {"mcatFc4": 12, "mcatFc5": 18},
    "cars": {"mcatCarsComp": 8, "mcatCarsWithin": 8, "mcatCarsBeyond": 11},
    "bb": {"mcatFc1": 16, "mcatFc2": 6, "mcatFc3": 8},
    "ps": {"mcatFc6": 8, "mcatFc7": 10, "mcatFc8": 6, "mcatFc9": 4, "mcatFc10": 2},
}
SHUFFLE_SALT = os.environ.get("MCAT_SALT", "#73")


def Q(test, d, domain, skill, stem, opts, expl, stim=None, locked=False, chk=None):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "domain": domain, "skill": skill, "stem": stem, "options": list(opts),
            "explanation": expl, "stim": stim, "locked": locked, "chk": chk}


NUM = re.compile(r"^-?[\d,]*\.?\d+(\s?(x|×)\s?10\^?-?\d+)?(\s?[A-Za-zµ°%/^²³·\-]+[A-Za-z0-9µ°%/^²³·\-]*)*$")
FIRST = re.compile(r"-?\d[\d,]*\.?\d*(?:\s?(?:x|×)\s?10\^?(-?\d+))?")


def first_num(s):
    m = FIRST.search(s)
    if not m:
        return None
    base = m.group(0)
    exp = m.group(1)
    mant = re.match(r"-?\d[\d,]*\.?\d*", base).group(0).replace(",", "")
    v = float(mant)
    if exp is not None:
        v *= 10 ** int(exp)
    return v


def all_numeric(opts):
    return all(NUM.match(o.strip()) for o in opts)


def load(name):
    g = {"Q": Q}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256((q["stem"] + SHUFFLE_SALT).encode()).hexdigest()[:12], 16))
    out = {}
    if q["locked"]:
        order = list(range(4))
        out["lockedOrder"] = True
    elif all_numeric(q["options"]):
        nums = [first_num(o) for o in q["options"]]
        order = sorted(range(4), key=lambda i: nums[i])
        out["lockedOrder"] = True
    else:
        order = list(range(4))
        rng.shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


BAD_REF = re.compile(r"\b(the )?(first|second|third|fourth|last) (option|choice|answer)\b|\bchoice [A-D]\b", re.I)


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’“”"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    if BAD_REF.search(q["stem"] + " " + q["explanation"]):
        warn.append("refers to an option by position")
    return [f"{where}: {w}" for w in warn]


def check_numeric(q, where):
    if q["chk"] is None:
        return
    vals = [first_num(o) for o in q["options"]]
    assert vals[0] is not None, f"{where}: key has no number"
    tol = max(abs(q["chk"]) * 0.01, 1e-12)
    assert abs(vals[0] - q["chk"]) <= tol, f"{where}: key {q['options'][0]!r} != computed {q['chk']}"
    for v, o in zip(vals[1:], q["options"][1:]):
        assert v is None or abs(v - q["chk"]) > tol, f"{where}: distractor {o!r} equals computed {q['chk']}"


def build():
    stimuli, out, warnings, authored = [], [], [], []
    loaded = {}
    for key, _, _ in SECTIONS:
        s, items = load(key)
        stimuli.extend(s)
        loaded[key] = items
    for test in (1, 2):
        for key, code, count in SECTIONS:
            mine = [q for q in loaded[key] if q["test"] == test]
            assert len(mine) == count, (key, test, len(mine))
            got = Counter(q["domain"] for q in mine)
            assert got == Counter(BLUEPRINT[key]), (key, test, dict(got))
            for n, q in enumerate(mine, 1):
                qid = f"{PREFIX}-T{test}-{code}-{n:02d}"
                warnings.extend(lint(q, qid))
                check_numeric(q, qid)
                authored.append((qid, q))
                f = finish(q)
                item = {"id": qid, "section": key, "test": test, "module": 1, "domain": q["domain"], "skill": q["skill"],
                        "difficulty": q["difficulty"], "format": "single"}
                if q["stim"]:
                    item["stimulusId"] = q["stim"]
                item.update({"stem": q["stem"], "options": f["options"], "correct": f["correct"]})
                if f.get("lockedOrder"):
                    item["lockedOrder"] = True
                item["explanation"] = q["explanation"]
                out.append(item)
    for key in loaded:
        extra = [q for q in loaded[key] if q["test"] not in (1, 2)]
        assert not extra, f"{key}: items with test {extra[0]['test']}"
    ids = {s["id"] for s in stimuli}
    assert len(ids) == len(stimuli), "duplicate stimulus id"
    used = {q.get("stimulusId") for q in out}
    assert used - {None} == ids, f"stimulus not used or unknown: {(used - {None}) ^ ids}"
    for s in stimuli:
        idx = [i for i, q in enumerate(out) if q.get("stimulusId") == s["id"]]
        assert idx == list(range(idx[0], idx[0] + len(idx))), s["id"]
        assert len({out[i]["test"] for i in idx}) == 1, s["id"]
        assert len({out[i]["section"] for i in idx}) == 1, s["id"]
    dst = os.path.join(ROOT, "data/v2/mcat/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"mcat: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    cand = [(qid, q) for qid, q in authored if not q["locked"] and not all_numeric(q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out).items())))
    print("  passage items:", sum(1 for q in out if q.get("stimulusId")), "discrete:", sum(1 for q in out if not q.get("stimulusId")))
    stems = Counter(q["stem"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest, "over:", over)


if __name__ == "__main__":
    build()
