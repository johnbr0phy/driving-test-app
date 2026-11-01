#!/usr/bin/env python3
"""Build the AP Human Geography v2 bank from Python-data sources.

Usage: python3 -I tools/next100/aphug/build.py

Sources, one file per unit: u1.py (Thinking Geographically) to u7.py
(Industrial and Economic Development). Each file has STIMULI (original
practice stimuli: hypothetical data tables, and maps, landscapes and
population pyramids described in words) and ITEMS, each
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong, wrong], explanation, stim=None)
with test 1 or 2 (a practice-test item) or 0 (drill only). Skill names are
the five AP Human Geography skill categories, given to the sources as the
constants CP, SR, DA, SA and SC. The key is always written first; the
build shuffles the five options with a seed from the stem. Options that are
all numbers are sorted ascending and locked instead.

Each practice test is one section `mcq`, one 60-item module, in unit order
(Unit 1 first, Unit 7 last), each stimulus set kept together in authored
order. Ids: APHUG-T<n>-NNN and APHUG-D-NNN (drill only), so the id sort
keeps that order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APHUG"
NOPT = 5
# Salt for the stem seed, picked so the keys spread evenly over A to E.
SEED_SALT = "d"
# (source file, domain, items per practice test, drill-only items)
DOMAINS = [("u1", "aphugU1", 6, 12), ("u2", "aphugU2", 9, 12), ("u3", "aphugU3", 9, 12),
           ("u4", "aphugU4", 9, 12), ("u5", "aphugU5", 9, 12), ("u6", "aphugU6", 9, 12),
           ("u7", "aphugU7", 9, 12)]
SKILLS = {
    "CP": "Concepts and processes",
    "SR": "Spatial relationships",
    "DA": "Data analysis",
    "SA": "Source analysis",
    "SC": "Scale analysis",
}


def Q(test, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == NOPT, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "explanation": expl, "stim": stim}


NUM = re.compile(r"^-?\d[\d,]*(\.\d+)?( ?%| years| million| people per square km)?$")


def _num(s):
    return float(re.match(r"-?\d[\d,]*(\.\d+)?", s).group(0).replace(",", "")) if NUM.match(s) else None


def load(name):
    g = {"Q": Q, **SKILLS}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256((q["stem"] + SEED_SALT).encode()).hexdigest()[:12], 16))
    nums = [_num(o) for o in q["options"]]
    out = {}
    if all(n is not None for n in nums):
        assert len(set(nums)) == NOPT, ("duplicate number", q["stem"])
        order = sorted(range(NOPT), key=lambda i: nums[i])
        out["lockedOrder"] = True
    else:
        order = list(range(NOPT))
        rng.shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    # The key stays the authored first option after sorting.
    assert out["options"][out["correct"][0]] == q["options"][0]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != NOPT:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-e] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    if q["skill"] not in SKILLS.values():
        warn.append("unknown skill")
    if q["stim"] is None and re.search(r"\b(the|this) (table|map|passage|pyramid|landscape|description|account)\b", q["stem"].lower()):
        warn.append("refers to a stimulus but has none")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, domains = [], []
    for name, dom, per, drill in DOMAINS:
        st, items = load(name)
        stimuli += st
        domains.append((dom, per, drill, items))
    for s in stimuli:
        if any(ch in s["text"] + s["title"] for ch in "\u2014\u2013\u2019\u201c\u201d"):
            print("  WARN dash or curly quote in", s["id"])
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
        n = 0
        for dom, per, _, items in domains:
            mine = [q for q in items if q["test"] == test]
            assert len(mine) == per, (dom, test, len(mine))
            for q in mine:
                assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-T{test}-"), (dom, q["stem"])
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
        assert n == 60, n
    n = 0
    for dom, _, drill, items in domains:
        mine = [q for q in items if q["test"] == 0]
        assert len(mine) == drill, (dom, len(mine))
        for q in mine:
            assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-D-"), (dom, q["stem"])
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    used = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    assert set(used) == {s["id"] for s in stimuli}, ("stimulus not used or unknown", set(used) ^ {s["id"] for s in stimuli})
    for sid, k in used.items():
        if k < 2 or k > 4:
            print(f"  WARN stimulus {sid} has {k} questions")
    dst = os.path.join(ROOT, "data/v2/aphug/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"aphug: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
        if t:
            k = sum(1 for q in out if q["test"] == t and q.get("stimulusId"))
            print(f"    stimulus items: {k}/60 = {k / 60:.0%}")
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    print("  skills:", dict(Counter(q["skill"] for q in out)))
    cand = [(qid, q) for qid, q in authored if not all(_num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    shortest = [qid for qid, q in cand if len(q["options"][0]) < min(len(o) for o in q["options"][1:])]
    print(f"  key strictly shortest: {len(shortest)}/{len(cand)} = {len(shortest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 4]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCDE"[q["correct"][0]] for q in out).items())))
    locked = [q for q in out if q.get("lockedOrder")]
    ends = sum(1 for q in locked if q["correct"][0] in (0, NOPT - 1))
    if locked:
        print(f"  locked number items: {len(locked)}, key in an end slot {ends} = {ends / len(locked):.0%}")
        if os.environ.get("SHOW_LOCKED"):
            for q in locked:
                print("   ", q["id"], q["options"], "key", q["options"][q["correct"][0]])
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
