#!/usr/bin/env python3
"""Build the DAT v2 bank from Python-data sources.

Usage: python3 -I tools/next100/dat/build.py

Sources, in test-day order: bio.py, gc.py, oc.py (the three parts of the
Survey of the Natural Sciences), rc.py (Reading Comprehension) and qr.py
(Quantitative Reasoning). Perceptual Ability is a picture test and is not
modelled. Each file has ITEMS (and rc.py has STIMULI). Each item is
  Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong],
    explanation, stim=None, locked=False, chk=None)
with test 1 or 2 (the practice tests; Test 2 is held out of the drills) or
0 (drill-only). The key is always written first; the build shuffles the four
options with a seed from the stem. Options that are all numbers (with an
optional unit) are sorted and locked, and locked=True keeps the authored
order.

chk: for a computed answer, the value the key must show. The build parses
the first number in each option, asserts the key equals chk (within 1%)
and that no distractor does.

Each practice test is three sections, one module each: sns 50 (biology,
then general chemistry, then organic chemistry), rc 25 (two passages),
qr 20. Ids DAT-T<n>-<SEC>-NN and DAT-D-<SEC>-NN for drill-only items.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "DAT"
# section key, id code, per-test count, source files in order
SECTIONS = [("sns", "SNS", 50, ["bio", "gc", "oc"]), ("rc", "RC", 25, ["rc"]), ("qr", "QR", 20, ["qr"])]
BLUEPRINT = {
    "sns": {"datCell": 5, "datDiversity": 3, "datSystems": 5, "datGenetics": 4, "datEvolution": 3,
            "datGenChem": 15, "datOrgChem": 15},
    "rc": {"datReading": 25},
    "qr": {"datQrAlgebra": 8, "datQrData": 6, "datQrWord": 6},
}
DRILL_ONLY = {
    "sns": {"datCell": 3, "datGenetics": 3, "datDiversity": 2, "datSystems": 2, "datGenChem": 4, "datOrgChem": 4},
    "rc": {},
    "qr": {"datQrAlgebra": 6},
}
SHUFFLE_SALT = os.environ.get("DAT_SALT", "#3")


def Q(test, d, domain, skill, stem, opts, expl, stim=None, locked=False, chk=None, key=None):
    """key: for a fixed-order item (quantitative comparison), the index of the answer in opts as displayed."""
    assert len(opts) == 4, stem
    assert d in (1, 2, 3), stem
    if key is not None:
        assert chk is None and 0 <= key < 4, stem
        locked = True
    return {"test": test, "difficulty": d, "domain": domain, "skill": skill, "stem": stem, "options": list(opts),
            "explanation": expl, "stim": stim, "locked": locked, "chk": chk, "key": key}


NUM = re.compile(r"^(\\\$)?-?[\d,]*\.?\d+(\s?(x|×)\s?10\^?[-⁻]?[\d⁰¹²³⁴⁵⁶⁷⁸⁹]+)?(?:\s?[A-Za-zµ°%/^²³⁻¹·\-][A-Za-z0-9µ°%/^²³⁻¹·\-]*(?:\s[A-Za-zµ°%/^²³⁻¹·\-][A-Za-z0-9µ°%/^²³⁻¹·\-]*)*)?$")
FIRST = re.compile(r"-?\d[\d,]*\.?\d*(?:\s?(?:x|×)\s?10\^?(-?\d+))?")


FRAC = re.compile(r"^\s*(-?\d+)\s*/\s*(\d+)\s*$")


def first_num(s):
    fr = FRAC.match(s)
    if fr:
        return int(fr.group(1)) / int(fr.group(2))
    m = FIRST.search(s.replace("\\$", ""))
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
    if q["key"] is not None:
        out["options"] = list(q["options"])
        out["correct"] = [q["key"]]
        out["lockedOrder"] = True
        return out
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


BAD_REF = re.compile(r"\b(the )?(first|second|third|fourth|last) (option|choice|answer)\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’“”"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    for t in texts:
        if re.search(r"(?<!\\)\$\d[\d,.]*\b(?![^$]*\$)", t) or t.replace("\\$", "").count("$") % 2:
            warn.append("unescaped dollar sign")
    if BAD_REF.search(q["stem"] + " " + q["explanation"]):
        warn.append("refers to an option by position")
    if not q["stem"].rstrip().endswith(("?", ":")):
        warn.append("stem does not end in ? or :")
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


def item(qid, key, test, q):
    f = finish(q)
    it = {"id": qid, "section": key, "test": test, "module": 1, "domain": q["domain"], "skill": q["skill"],
          "difficulty": q["difficulty"], "format": "single"}
    if q["stim"]:
        it["stimulusId"] = q["stim"]
    it.update({"stem": q["stem"], "options": f["options"], "correct": f["correct"]})
    if f.get("lockedOrder"):
        it["lockedOrder"] = True
    it["explanation"] = q["explanation"]
    return it


def build():
    stimuli, out, warnings, authored = [], [], [], []
    loaded = {}
    for key, _, _, files in SECTIONS:
        loaded[key] = []
        for name in files:
            s, items = load(name)
            stimuli.extend(s)
            loaded[key].extend(items)
    for test in (1, 2, 0):
        for key, code, count, _ in SECTIONS:
            mine = [q for q in loaded[key] if q["test"] == test]
            want = BLUEPRINT[key] if test else DRILL_ONLY[key]
            got = Counter(q["domain"] for q in mine)
            assert got == Counter(want), (key, test, dict(got), want)
            if test:
                assert len(mine) == count, (key, test, len(mine))
            for n, q in enumerate(mine, 1):
                qid = f"{PREFIX}-T{test}-{code}-{n:02d}" if test else f"{PREFIX}-D-{code}-{n:02d}"
                warnings.extend(lint(q, qid))
                check_numeric(q, qid)
                authored.append((qid, q))
                out.append(item(qid, key, test, q))
    for key in loaded:
        extra = [q for q in loaded[key] if q["test"] not in (0, 1, 2)]
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
    dst = os.path.join(ROOT, "data/v2/dat/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"dat: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    cand = [(qid, q) for qid, q in authored if not q["locked"] and not all_numeric(q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out).items())))
    print("  mean option length:", round(sum(len(o) for _, q in authored for o in q["options"]) / (4 * len(authored)), 1))
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
