#!/usr/bin/env python3
"""Build the TABE v2 bank from Python-data sources.

Usage: python3 -I tools/next100/tabe/build.py

The practice test is TABE 13&14 Level D (AE-CCR level D), written to DRC's
Level D blueprints for Reading, Mathematics and Language (sources.md).

Sources, one file per subtest: reading.py, math.py, language.py. Each has
STIMULI (original passages, drafts and tables) and ITEMS, written with:
  Q(test, domain, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, basics=None)
      the key is written first; the build places it so the keys rotate over
      A to D and orders the other three by a seed from the stem. Options that
      are all numbers are sorted ascending and locked instead.
  L(test, domain, difficulty, skill, stem, [A, B, C, D], key_index, explanation, stim=None, basics=None)
      options kept in the written order (lockedOrder).
  N(test, domain, difficulty, skill, stem, [answers], explanation, stim=None, basics=None, whole=True)
      a typed numeric answer, standing in for TABE's gridded-response items.
test is 1 or 2 (a practice-test item) or 0 (drill only). Within a test the
items keep their authored order; sections run Reading, Mathematics, Language.
Ids: TABE-T<n>-NNN and TABE-D-NNN.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "TABE"

DOMAIN_CODES = {
    "KEY": "tabeReadKey", "CRAFT": "tabeReadCraft", "INT": "tabeReadIntegration",
    "NUM": "tabeMathNumber", "ALG": "tabeMathAlgebra", "DATA": "tabeMathData", "GEO": "tabeMathGeometry",
    "TEXT": "tabeLangText", "CONV": "tabeLangConventions", "KNOW": "tabeLangKnowledge",
}
# (source file, section, {domain: (per practice test, drill only)})
SECTIONS = [
    ("reading", "read", {"tabeReadKey": (10, 9), "tabeReadCraft": (9, 6), "tabeReadIntegration": (3, 4)}),
    ("math", "math", {"tabeMathNumber": (6, 12), "tabeMathAlgebra": (5, 13), "tabeMathData": (5, 6), "tabeMathGeometry": (4, 6)}),
    ("language", "lang", {"tabeLangText": (7, 12), "tabeLangConventions": (5, 7), "tabeLangKnowledge": (6, 5)}),
]
# The Basics each drill opens with (lib/v2/exams/tabe.ts), keyed by domain. A
# basics tag must name a skill its own drill opens with.
DRILL_BASICS = {
    "tabeReadKey": ["mainIdea", "findingDetail", "inference", "causeEffect"],
    "tabeMathNumber": ["negativeNumbers", "fractionOps", "ratios", "percents", "rateProblems"],
    "tabeLangConventions": ["subjectVerb", "commaSplices", "pronounCase", "verbTense", "commonlyConfused", "apostrophes"],
    "tabeLangKnowledge": ["subjectVerb", "commaSplices", "pronounCase", "verbTense", "commonlyConfused", "apostrophes"],
}


def Q(test, domain, d, skill, stem, opts, expl, stim=None, basics=None):
    assert len(opts) == 4, stem
    return {"test": test, "domain": DOMAIN_CODES[domain], "difficulty": d, "skill": skill, "stem": stem,
            "options": list(opts), "key": None, "explanation": expl, "stim": stim, "basics": basics, "num": None}


def L(test, domain, d, skill, stem, opts, key, expl, stim=None, basics=None):
    assert len(opts) == 4 and 0 <= key < 4, stem
    return {"test": test, "domain": DOMAIN_CODES[domain], "difficulty": d, "skill": skill, "stem": stem,
            "options": list(opts), "key": key, "explanation": expl, "stim": stim, "basics": basics, "num": None}


def N(test, domain, d, skill, stem, answers, expl, stim=None, basics=None, whole=True):
    assert answers, stem
    return {"test": test, "domain": DOMAIN_CODES[domain], "difficulty": d, "skill": skill, "stem": stem,
            "options": None, "key": None, "explanation": expl, "stim": stim, "basics": basics,
            "num": {"answers": [str(a) for a in answers], "whole": whole}}


NUM = re.compile(r"^-?(\\\$)?-?\d[\d,]*(\.\d+)?( ?%| [a-z][a-z. ]*)?$")


FRAC = re.compile(r"^\$(-?)(\d+)?\\frac\{(\d+)\}\{(\d+)\}\$( [a-z]+)?$")


def _num(s):
    m = FRAC.match(s)
    if m:
        v = int(m.group(2) or 0) + int(m.group(3)) / int(m.group(4))
        return -v if m.group(1) else v
    if not NUM.match(s):
        return None
    return float(re.search(r"\d[\d,]*(\.\d+)?", s).group(0).replace(",", "")) * (-1 if s.lstrip("\\$").startswith("-") else 1)


def load(name):
    g = {"Q": Q, "L": L, "N": N, **{k: k for k in DOMAIN_CODES}}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *(q["options"] or [])]
    if any(ch in t for t in texts for ch in "—–’‘“”"):
        warn.append("em/en dash or curly quote")
    if q["options"] is not None:
        if len(set(q["options"])) != 4:
            warn.append("duplicate option")
        if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
            warn.append("banned option")
    if not q["stem"].rstrip().endswith(("?", ":")):
        warn.append("stem does not end in ? or :")
    b = q["basics"]
    if b and b not in DRILL_BASICS.get(q["domain"], []):
        warn.append(f"basics tag {b} not opened by its drill")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, sections = [], []
    for name, sec, plan in SECTIONS:
        st, items = load(name)
        stimuli += st
        sections.append((sec, plan, items))
    for s in stimuli:
        if any(ch in s["text"] + s["title"] for ch in "—–’‘“”"):
            raise SystemExit(f"dash or curly quote in stimulus {s['id']}")
    out, warnings = [], []
    rot = Counter()

    def emit(q, sec, qid, test):
        warnings.extend(lint(q, qid))
        item = {"id": qid, "section": sec, "test": test, "module": 1, "domain": q["domain"],
                "skill": q["skill"], "difficulty": q["difficulty"]}
        if q["basics"]:
            item["basics"] = q["basics"]
        if q["stim"]:
            item["stimulusId"] = q["stim"]
        if q["num"] is not None:
            item["format"] = "numeric"
            item["stem"] = q["stem"]
            item["numeric"] = {"answers": q["num"]["answers"], "tolerance": 0}
            if q["num"]["whole"]:
                item["numeric"]["wholeNumber"] = True
            item["explanation"] = q["explanation"]
            out.append(item)
            return
        item["format"] = "single"
        opts = q["options"]
        nums = [_num(o) for o in opts]
        locked = False
        if q["key"] is not None:
            locked = True
            order = list(range(4))
            key_at = q["key"]
        elif all(n is not None for n in nums):
            assert len(set(nums)) == 4, ("duplicate number", q["stem"])
            order = sorted(range(4), key=lambda i: nums[i])
            locked = True
            key_at = order.index(0)
        else:
            rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
            rest = [1, 2, 3]
            rng.shuffle(rest)
            target = rot[sec] % 4
            rot[sec] += 1
            order = rest[:target] + [0] + rest[target:]
            key_at = target
        item.update({"stem": q["stem"], "options": [opts[i] for i in order], "correct": [key_at]})
        if locked:
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    for test in (1, 2):
        n = 0
        for sec, plan, items in sections:
            mine = [q for q in items if q["test"] == test]
            got = Counter(q["domain"] for q in mine)
            want = {d: v[0] for d, v in plan.items()}
            assert dict(got) == want, (sec, test, dict(got), want)
            for q in mine:
                assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-T{test}-"), (sec, q["stem"])
                n += 1
                emit(q, sec, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for sec, plan, items in sections:
        mine = [q for q in items if q["test"] == 0]
        got = Counter(q["domain"] for q in mine)
        want = {d: v[1] for d, v in plan.items()}
        assert dict(got) == want, (sec, "drill", dict(got), want)
        for q in mine:
            assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-D-"), (sec, q["stem"])
            n += 1
            emit(q, sec, f"{PREFIX}-D-{n:03d}", 0)

    used = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    assert set(used) == {s["id"] for s in stimuli}, ("stimulus not used or unknown", set(used) ^ {s["id"] for s in stimuli})
    stems = Counter(q["stem"] for q in out if not q.get("stimulusId"))
    for s, k in stems.items():
        if k > 1:
            warnings.append(f"duplicate stem: {s}")
    stems2 = Counter((q.get("stimulusId"), q["stem"]) for q in out if q.get("stimulusId"))
    for s, k in stems2.items():
        if k > 1:
            warnings.append(f"duplicate stem on one passage: {s}")
    dst = os.path.join(ROOT, "data/v2/tabe/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    singles = [q for q in out if q["format"] == "single"]
    letters = Counter("ABCD"[q["correct"][0]] for q in singles)
    unlocked = [q for q in singles if not q.get("lockedOrder")]
    longest = sum(1 for q in unlocked if
                  len(q["options"][q["correct"][0]]) == max(len(o) for o in q["options"]) and
                  sorted(len(o) for o in q["options"])[-1] != sorted(len(o) for o in q["options"])[-2])
    for w in warnings:
        print("  WARN", w)
    print(f"tabe: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")
    print("  keys:", dict(sorted(letters.items())), f" key strictly longest: {longest}/{len(unlocked)} unlocked"
          f" ({100 * longest / max(1, len(unlocked)):.0f}%)", " numeric:", len(out) - len(singles))
    if warnings:
        raise SystemExit(1)


if __name__ == "__main__":
    build()
