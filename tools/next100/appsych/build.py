#!/usr/bin/env python3
"""Build the AP Psychology v2 bank from Python-data sources.

Usage: python3 -I tools/next100/appsych/build.py

Sources (one file per domain): unit1_bio.py, unit2_cognition.py,
unit3_devlearn.py, unit4_social.py, unit5_health.py and research.py (science
practices 2 and 3, set in all five units, with STIMULI: shared study
summaries and data tables). Each item is
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None)
with test 1 or 2 (a practice-test item) or 0 (drill only). The key is
always written first; the build shuffles the four options with a seed from
the stem. Options that are all numbers (with an optional unit) are sorted
ascending and locked instead.

Each practice test is one section `mcq`, one 75-item module, laid out as
Unit 1 (11) + research block (4), Unit 2 (11) + block, ... Unit 5 (11) +
block. Research blocks are taken four at a time in authored order, so a
stimulus set of three stays together. Ids: APPSYCH-T<n>-NNN and
APPSYCH-D-NNN (drill only), so the id sort keeps that order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APPSYCH"
UNITS = [("unit1_bio", "appsychBio"), ("unit2_cognition", "appsychCognition"), ("unit3_devlearn", "appsychDevLearning"),
         ("unit4_social", "appsychSocial"), ("unit5_health", "appsychHealth")]
RESEARCH = ("research", "appsychResearch")
PER_UNIT, PER_BLOCK = 11, 4


def Q(test, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "explanation": expl, "stim": stim}


NUM = re.compile(r"^-?\d+(\.\d+)?(%| ms)?$")


def _num(s):
    return float(re.match(r"-?\d+(\.\d+)?", s).group(0)) if NUM.match(s) else None


def load(name):
    g = {"Q": Q}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
    nums = [_num(o) for o in q["options"]]
    out = {}
    if all(n is not None for n in nums):
        order = sorted(range(4), key=lambda i: nums[i])
        out["lockedOrder"] = True
    else:
        order = list(range(4))
        rng.shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


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
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, research = load(RESEARCH[0])
    units = [(dom, load(name)[1]) for name, dom in UNITS]
    out, warnings, authored = [], [], []

    def emit(q, dom, qid, test):
        warnings.extend(lint(q, qid))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": "mcq", "test": test, "module": 1, "domain": dom, "skill": q["skill"],
                "difficulty": q["difficulty"], "format": "single"}
        if q["stim"]:
            item["stimulusId"] = q["stim"]
        item.update({"stem": q["stem"], "options": f["options"], "correct": f["correct"]})
        if f.get("lockedOrder"):
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    for test in (1, 2):
        rs = [q for q in research if q["test"] == test]
        assert len(rs) == PER_BLOCK * len(units), (test, len(rs))
        n = 0
        for u, (dom, items) in enumerate(units):
            mine = [q for q in items if q["test"] == test]
            assert len(mine) == PER_UNIT, (dom, test, len(mine))
            for q in mine + []:
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
            for q in rs[u * PER_BLOCK:(u + 1) * PER_BLOCK]:
                n += 1
                emit(q, RESEARCH[1], f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for dom, items in units + [(RESEARCH[1], research)]:
        for q in items:
            if q["test"] == 0:
                n += 1
                emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    used = {q.get("stimulusId") for q in out}
    assert used - {None} == {s["id"] for s in stimuli}, "stimulus not used or unknown"
    dst = os.path.join(ROOT, "data/v2/appsych/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"appsych: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    cand = [(qid, q) for qid, q in authored if not all(_num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out).items())))
    avg = sum(len(o) for q in out for o in q["options"]) / (4 * len(out))
    print(f"  mean option length: {avg:.1f} chars")
    stems = Counter(q["stem"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)


if __name__ == "__main__":
    build()
