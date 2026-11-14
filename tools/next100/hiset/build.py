#!/usr/bin/env python3
"""Build the HiSET v2 bank from Python-data sources.

Usage: python3 -I tools/next100/hiset/build.py

Sources, one file per subtest: reading.py, writing.py, math.py, science.py,
social.py. Each has STIMULI (original passages, drafts, tables and excerpts)
and ITEMS, written with two helpers:
  Q(test, domain, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, basics=None)
      the key is written first; the build places it so the keys rotate over
      A to D, and orders the other three by a seed from the stem. Options that
      are all numbers are sorted ascending and locked instead.
  L(test, domain, difficulty, skill, stem, [A, B, C, D], key_index, explanation, stim=None, basics=None)
      options kept in the written order (lockedOrder), e.g. "NO CHANGE" first.
test is 1 or 2 (a practice-test item) or 0 (drill only). Within a test the
items keep their authored order; the sections run Reading, Writing,
Mathematics, Science, Social Studies. Ids: HISET-T<n>-NNN and HISET-D-NNN.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "HISET"

DOMAIN_CODES = {
    "LIT": "hisetLiterary", "INFO": "hisetInformational",
    "ORG": "hisetOrganization", "LANG": "hisetLanguage", "CONV": "hisetConventions",
    "NUM": "hisetNumber", "GEO": "hisetGeometry", "DATA": "hisetData", "ALG": "hisetAlgebra",
    "LIFE": "hisetLife", "PHYS": "hisetPhysical", "EARTH": "hisetEarth",
    "HIST": "hisetHistory", "CIV": "hisetCivics", "ECON": "hisetEconomics", "GEOG": "hisetGeography",
}
# (source file, section, {domain: (per practice test, drill only)})
SECTIONS = [
    ("reading", "read", {"hisetLiterary": (8, 4), "hisetInformational": (12, 4)}),
    ("writing", "write", {"hisetOrganization": (4, 8), "hisetLanguage": (9, 4), "hisetConventions": (7, 6)}),
    ("math", "math", {"hisetNumber": (4, 8), "hisetGeometry": (4, 8), "hisetData": (4, 8), "hisetAlgebra": (10, 2)}),
    ("science", "science", {"hisetLife": (10, 2), "hisetPhysical": (5, 7), "hisetEarth": (5, 7)}),
    ("social", "social", {"hisetHistory": (7, 5), "hisetCivics": (7, 5), "hisetEconomics": (4, 3), "hisetGeography": (2, 3)}),
]
# The Basics each drill opens with (lib/v2/exams/hiset.ts). A basics tag must
# name a skill of its own drill, or its brush-up card can never show.
DRILL_BASICS = {
    "hisetLiterary": ["inference", "wordsInContext", "toneWords", "figurativeLanguage", "storyTheme"],
    "hisetInformational": ["mainIdea", "findingDetail", "authorPurpose", "claimSupport", "factOpinion", "textStructure"],
    "hisetOrganization": ["transitions", "addingSentence", "deletingSentence", "topicSentences", "keepOnGoal"],
    "hisetLanguage": ["preciseWords", "matchingTone", "concision", "redundancy", "danglingModifiers"],
    "hisetConventions": ["subjectVerb", "commaSplices", "apostrophes", "pronounCase", "verbTense", "commonlyConfused", "listIntroCommas"],
    "hisetNumber": ["fractionOps", "percents", "ratios", "scientificNotation", "exponentRules", "unitConversion"],
    "hisetGeometry": ["areaPerimeter", "circleBasics", "pythagorean", "triangleAngles", "volume"],
    "hisetData": ["meanMedian", "probabilityTable", "readingTable", "trends"],
    "hisetAlgebra": ["solveX", "slope", "systems", "inequalities", "factoring", "functionNotation", "distributing"],
    "hisetLife": ["variables", "controls", "dataSupports", "nextExperiment"],
}


def Q(test, domain, d, skill, stem, opts, expl, stim=None, basics=None):
    assert len(opts) == 4, stem
    return {"test": test, "domain": DOMAIN_CODES[domain], "difficulty": d, "skill": skill, "stem": stem,
            "options": list(opts), "key": None, "explanation": expl, "stim": stim, "basics": basics}


def L(test, domain, d, skill, stem, opts, key, expl, stim=None, basics=None):
    assert len(opts) == 4 and 0 <= key < 4, stem
    return {"test": test, "domain": DOMAIN_CODES[domain], "difficulty": d, "skill": skill, "stem": stem,
            "options": list(opts), "key": key, "explanation": expl, "stim": stim, "basics": basics}


NUM = re.compile(r"^-?(\\\$)?-?\d[\d,]*(\.\d+)?( ?%| [a-z][a-z. ]*)?$")


def _num(s):
    s2 = s.replace("$", "") if s.startswith("$") and s.endswith("$") and s.count("$") == 2 else s
    if not NUM.match(s2):
        return None
    return float(re.search(r"\d[\d,]*(\.\d+)?", s2).group(0).replace(",", "")) * (-1 if s2.lstrip("\\$").startswith("-") else 1)


def load(name):
    g = {"Q": Q, "L": L, **{k: k for k in DOMAIN_CODES}}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’‘“”"):
        warn.append("em/en dash or curly quote")
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
        opts = q["options"]
        item = {"id": qid, "section": sec, "test": test, "module": 1, "domain": q["domain"],
                "skill": q["skill"], "difficulty": q["difficulty"], "format": "single"}
        if q["basics"]:
            item["basics"] = q["basics"]
        if q["stim"]:
            item["stimulusId"] = q["stim"]
        nums = [_num(o) for o in opts]
        locked = False
        if q["key"] is not None:
            locked = True
            if opts[0] == "NO CHANGE" and q["key"] != 0:
                # Keep NO CHANGE first; rotate the key over B, C and D.
                rng = random.Random(int(hashlib.sha256(q["stem"].encode() + q["explanation"].encode()).hexdigest()[:12], 16))
                rest = [i for i in (1, 2, 3) if i != q["key"]]
                rng.shuffle(rest)
                slot = rot["locked"] % 3
                rot["locked"] += 1
                order = [0] + rest[:slot] + [q["key"]] + rest[slot:]
            else:
                order = list(range(4))
            key_at = order.index(q["key"])
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
        if sec == "math":
            item["calculator"] = True
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
    dst = os.path.join(ROOT, "data/v2/hiset/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    letters = Counter("ABCD"[q["correct"][0]] for q in out)
    longest = sum(1 for q in out if not q.get("lockedOrder") and
                  len(q["options"][q["correct"][0]]) == max(len(o) for o in q["options"]) and
                  sorted(len(o) for o in q["options"])[-1] != sorted(len(o) for o in q["options"])[-2])
    for w in warnings:
        print("  WARN", w)
    print(f"hiset: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")
    print("  keys:", dict(sorted(letters.items())), " key strictly longest (unlocked):", longest)
    if warnings:
        raise SystemExit(1)


if __name__ == "__main__":
    build()
