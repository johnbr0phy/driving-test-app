#!/usr/bin/env python3
"""Build the STAAR Biology EOC v2 bank from Python-data sources.

Usage: python3 -I tools/next100/staarbio/build.py

Sources, one file per drill domain, in the order of TEA's Biology STAAR
Blueprint (effective Spring 2026) and assessed curriculum (2025-2026):
  cells.py       B.5A, B.5B, B.5D   biomolecules, prokaryotes and eukaryotes, viruses
  cellcycle.py   B.6A, B.6B, B.6C   cell cycle, differentiation, cancer
  energy.py      B.11A, B.11B       photosynthesis, respiration, enzymes
  systems.py     B.12A, B.12B       animal and plant systems
  dna.py         B.7A, B.7B, B.7C   DNA, protein synthesis, mutations
  inheritance.py B.8A, B.8B         meiosis and crosses
  evidence.py    B.9A, B.9B         evidence of common ancestry, rates of change
  selection.py   B.10A to B.10D     natural selection, speciation, other mechanisms
  ecology.py     B.13A to B.13D     interdependence within environmental systems
Each file has ITEMS and may have STIMULI (cluster sets: a scenario with a data
table, 3 or 4 questions). Items:
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False)
  M(test, difficulty, skill, stem, [key, key], [wrong, wrong, wrong], explanation, stim=None)  # choose two
with test 1 or 2 (a practice-test item) or 0 (drill only). The key is written
first; the build shuffles options with a seed from the stem. Options that are
all numbers or ratios (with an optional unit) are sorted and locked;
locked=True keeps the authored order.

Each practice test is one untimed section `bio`, one 35-item module, strand by
strand (Structures 13, Genetics 8, Evolution 8, Interdependence 6). A cluster
stays together in authored order. Ids: STAARBIO-T<n>-NNN and STAARBIO-D-NNN.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "STAARBIO"
DOMAINS = [("cells", "staarbioCells", 4), ("cellcycle", "staarbioCellCycle", 3), ("energy", "staarbioEnergy", 3),
           ("systems", "staarbioSystems", 3), ("dna", "staarbioDNA", 4), ("inheritance", "staarbioInheritance", 4),
           ("evidence", "staarbioEvidence", 3), ("selection", "staarbioSelection", 5), ("ecology", "staarbioEcology", 6)]
DRILL_ONLY = 12  # at least this many drill-only items per domain
# Salt for the option shuffle, chosen so single-answer keys come out near even (A 47, B 45, C 50, D 49).
SHUFFLE_SALT = os.environ.get("SALT", "#2")


def Q(test, d, skill, stem, opts, expl, stim=None, locked=False):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "keys": 1,
            "explanation": expl, "stim": stim, "locked": locked}


def M(test, d, skill, stem, keys, wrong, expl, stim=None):
    assert len(keys) == 2 and len(wrong) == 3, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(keys) + list(wrong), "keys": 2,
            "explanation": expl, "stim": stim, "locked": False}


NUM = re.compile(r"^(-?[\d,]+(\.\d+)?|\d+/\d+)( ?(%|percent|cells|hours?|days?|years?|mL|g|kg|seconds|chromosomes|amino acids|codons|nucleotides|kcal|C))?$")


def _num(s):
    m = NUM.match(s)
    if not m:
        return None
    v = m.group(1).replace(",", "")
    if ":" in v:
        parts = [int(x) for x in v.split(":")]
        return parts[0] / sum(parts)
    if "/" in v:
        a, b = v.split("/")
        return int(a) / int(b)
    return float(v)


def load(name):
    g = {"Q": Q, "M": M}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256((q["stem"] + SHUFFLE_SALT).encode()).hexdigest()[:12], 16))
    n = len(q["options"])
    nums = [_num(o) for o in q["options"]]
    out = {}
    if q["locked"]:
        order = list(range(n))
        out["lockedOrder"] = True
    elif all(v is not None for v in nums):
        order = sorted(range(n), key=lambda i: nums[i])
        out["lockedOrder"] = True
    else:
        order = list(range(n))
        rng.shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(k) for k in range(q["keys"]))
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’“”"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    if re.search(r"\b(first|second|third|fourth|last) (option|choice|answer)\b|\bchoice [a-e]\b", " ".join(texts).lower()):
        warn.append("refers to an option by position")
    if not q["stem"].rstrip().endswith(("?", ":", "Choose two.")):
        warn.append("stem does not end in ? or :")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, doms = [], []
    for name, dom, per in DOMAINS:
        s, items = load(name)
        stimuli.extend(s)
        doms.append((dom, per, items))
    out, warnings, authored = [], [], []

    def emit(q, dom, qid, test):
        warnings.extend(lint(q, qid))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": "bio", "test": test, "module": 1, "domain": dom, "skill": q["skill"],
                "difficulty": q["difficulty"], "format": "single" if q["keys"] == 1 else "multi"}
        if q["stim"]:
            item["stimulusId"] = q["stim"]
        item.update({"stem": q["stem"], "options": f["options"], "correct": f["correct"]})
        if q["keys"] > 1:
            item["select"] = q["keys"]
        if f.get("lockedOrder"):
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    for test in (1, 2):
        n = 0
        for dom, per, items in doms:
            mine = [q for q in items if q["test"] == test]
            assert len(mine) == per, (dom, test, len(mine))
            for q in mine:
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for dom, per, items in doms:
        mine = [q for q in items if q["test"] == 0]
        assert len(mine) >= DRILL_ONLY, (dom, 0, len(mine))
        for q in mine:
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    used = {q.get("stimulusId") for q in out}
    assert used - {None} == {s["id"] for s in stimuli}, "stimulus not used or unknown"
    for s in stimuli:
        idx = [i for i, q in enumerate(out) if q.get("stimulusId") == s["id"]]
        assert idx == list(range(idx[0], idx[0] + len(idx))), s["id"]
        assert len({out[i]["test"] for i in idx}) == 1, s["id"]
        assert 3 <= len(idx) <= 5, (s["id"], len(idx))
    dst = os.path.join(ROOT, "data/v2/staarbio/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"staarbio: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    cand = [(qid, q) for qid, q in authored if q["keys"] == 1 and not q["locked"] and not all(_num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions (single):", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out if q["format"] == "single").items())))
    avg = sum(len(o) for q in out for o in q["options"]) / sum(len(q["options"]) for q in out)
    print(f"  mean option length: {avg:.1f} chars")
    stems = Counter(q["stem"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)
        print("  over:", over)


if __name__ == "__main__":
    build()
