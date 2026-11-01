#!/usr/bin/env python3
"""Build the AP Biology v2 bank from Python-data sources.

Usage: python3 -I tools/next100/apbio/build.py

Sources, one file per unit of the College Board course framework (effective
fall 2025): unit1_chem.py, unit2_cells.py, unit3_energetics.py,
unit4_signaling.py, unit5_heredity.py, unit6_genes.py, unit7_evolution.py,
unit8_ecology.py. Each file has ITEMS and may have STIMULI (shared data
tables and experiment summaries). Each item is
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False)
with test 1 or 2 (a practice-test item) or 0 (drill only). The key is always
written first; the build shuffles the four options with a seed from the stem.
Options that are all numbers or fractions (with an optional unit) are sorted
ascending and locked, and locked=True keeps the authored order (labels such
as "Line 1".."Line 4").

Each practice test is one section `mcq`, one 60-item module, laid out unit
by unit in course order (6/7/8/7/6/8/10/8, the midpoints of the CED unit
weightings). A stimulus set stays together in authored order. Ids:
APBIO-T<n>-NNN and APBIO-D-NNN (drill only), so the id sort keeps that order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APBIO"
UNITS = [("unit1_chem", "apbioChem", 6), ("unit2_cells", "apbioCells", 7), ("unit3_energetics", "apbioEnergetics", 8),
         ("unit4_signaling", "apbioSignaling", 7), ("unit5_heredity", "apbioHeredity", 6), ("unit6_genes", "apbioGenes", 8),
         ("unit7_evolution", "apbioEvolution", 10), ("unit8_ecology", "apbioEcology", 8)]
DRILL_ONLY = 10
# Salt for the option shuffle, chosen so key letters come out near 50 each (A 51, B 49, C 50, D 50).
SHUFFLE_SALT = "#161"


def Q(test, d, skill, stem, opts, expl, stim=None, locked=False):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "explanation": expl,
            "stim": stim, "locked": locked}


NUM = re.compile(r"^(-?[\d,]+(\.\d+)?|\d+/\d+)( ?(%|M|MPa|bars|mm|kcal|mL/min|per year|per hour|hours?))?$")


def _num(s):
    m = NUM.match(s)
    if not m:
        return None
    v = m.group(1).replace(",", "")
    if "/" in v:
        a, b = v.split("/")
        return int(a) / int(b)
    return float(v)


def load(name):
    g = {"Q": Q}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256((q["stem"] + SHUFFLE_SALT).encode()).hexdigest()[:12], 16))
    nums = [_num(o) for o in q["options"]]
    out = {}
    if q["locked"]:
        order = list(range(4))
        out["lockedOrder"] = True
    elif all(n is not None for n in nums):
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
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, units = [], []
    for name, dom, per in UNITS:
        s, items = load(name)
        stimuli.extend(s)
        units.append((dom, per, items))
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
        for dom, per, items in units:
            mine = [q for q in items if q["test"] == test]
            assert len(mine) == per, (dom, test, len(mine))
            for q in mine:
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for dom, per, items in units:
        mine = [q for q in items if q["test"] == 0]
        assert len(mine) == DRILL_ONLY, (dom, 0, len(mine))
        for q in mine:
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    used = {q.get("stimulusId") for q in out}
    assert used - {None} == {s["id"] for s in stimuli}, "stimulus not used or unknown"
    for s in stimuli:  # a set must sit in one test and be contiguous
        idx = [i for i, q in enumerate(out) if q.get("stimulusId") == s["id"]]
        assert idx == list(range(idx[0], idx[0] + len(idx))), s["id"]
        assert len({out[i]["test"] for i in idx}) == 1, s["id"]
    dst = os.path.join(ROOT, "data/v2/apbio/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"apbio: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    cand = [(qid, q) for qid, q in authored if not q["locked"] and not all(_num(o) is not None for o in q["options"])]
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
