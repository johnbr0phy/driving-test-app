#!/usr/bin/env python3
"""Build the AP English Language and Composition v2 bank from Python-data sources.

Usage: python3 -I tools/next100/aplang/build.py

Sources (one file per group of passage sets): t1.py (Practice Test 1),
t2.py (Practice Test 2), drill_reading.py and drill_writing.py (drill only).
Each file has STIMULI (original passages and drafts) and ITEMS, each
  Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim)
with test 1 or 2 (a practice-test item) or 0 (drill only). Domains are the
eight AP English Language skill categories of the multiple-choice section,
given to the sources as RSR, CER, ROR, STR (reading) and RSW, CEW, ROW, STW
(writing). The key is always written first. The build then orders the four
options:
  - "(as it is now)" goes first and the order is locked, like the real exam;
  - Keep/Kept or Yes options go before Delete/Deleted or No options, locked
    (each group shuffled by a seed from the stem);
  - options that each name a sentence ("After sentence 7", "Sentence 5") are
    sorted by sentence number and locked;
  - all-number options are sorted ascending and locked;
  - anything else is shuffled with a seed from the stem, the key placed in a
    slot drawn from a seeded, balanced list so each letter keys about a quarter
    of the bank once the locked items are counted.

Each practice test is one section `mcq`, one 45-item module, five sets in the
CED order (two reading sets of 12, writing sets of 8, 8 and 5), each set kept
together in authored order. Ids: APLANG-T<n>-NNN and APLANG-D-NNN (drill only),
so the id sort keeps that order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APLANG"
FILES = ["t1", "t2", "drill_reading", "drill_writing"]

DOMS = {
    "RSR": "aplangRhetRead", "CER": "aplangClaimsRead", "ROR": "aplangReasonRead", "STR": "aplangStyleRead",
    "RSW": "aplangRhetWrite", "CEW": "aplangClaimsWrite", "ROW": "aplangReasonWrite", "STW": "aplangStyleWrite",
}
# Per practice test, inside the CED skill-category weights (reading 11-14/13-16/13-16/11-14%, writing 11-14% each).
PER_TEST = {"aplangRhetRead": 5, "aplangClaimsRead": 7, "aplangReasonRead": 6, "aplangStyleRead": 6,
            "aplangRhetWrite": 5, "aplangClaimsWrite": 6, "aplangReasonWrite": 5, "aplangStyleWrite": 5}
SET_SIZES = [12, 12, 8, 8, 5]
SKILLS = {
    "PURPOSE": "Purpose and exigence", "AUDIENCE": "Audience", "CLAIM": "Claims and thesis",
    "EVID": "Evidence", "QUAL": "Qualification and concession", "LINE": "Line of reasoning",
    "STRUCT": "Structure and placement", "TRANS": "Transitions", "DICTION": "Word choice",
    "SYNTAX": "Sentence structure", "TONE": "Tone", "PUNCT": "Punctuation",
}
ASIS = "(as it is now)"


def Q(test, d, dom, skill, stem, opts, expl, stim):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "domain": DOMS[dom], "skill": skill, "stem": stem,
            "options": list(opts), "explanation": expl, "stim": stim}


NUM = re.compile(r"^-?\d+(\.\d+)?%?$")
SENT = re.compile(r"\b[Ss]entences? (\d+)")
YES = re.compile(r"^(Yes|Keep|Kept)\b")
NO = re.compile(r"^(No|Delete|Deleted)\b")


def load(name):
    g = {"Q": Q, **{k: k for k in DOMS}, **SKILLS}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
    o = q["options"]
    idx = list(range(4))
    locked = True
    if ASIS in o:
        rest = [i for i in idx if o[i] != ASIS]
        rng.shuffle(rest)
        order = [o.index(ASIS)] + rest
    elif all(YES.match(x) or NO.match(x) for x in o):
        ys = [i for i in idx if YES.match(o[i])]
        ns = [i for i in idx if NO.match(o[i])]
        rng.shuffle(ys)
        rng.shuffle(ns)
        order = ys + ns
    elif all(SENT.search(x) for x in o):
        order = sorted(idx, key=lambda i: int(SENT.search(o[i]).group(1)))
    elif all(NUM.match(x) for x in o):
        order = sorted(idx, key=lambda i: float(o[i].rstrip("%")))
    else:
        rest = idx[1:]
        rng.shuffle(rest)
        slot = q.get("slot", rng.randrange(4))
        order = rest[:slot] + [0] + rest[slot:]
        locked = False
    return {"options": [o[i] for i in order], "correct": [order.index(0)], "lockedOrder": locked}


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u2018\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    if q["skill"] not in SKILLS.values():
        warn.append("unknown skill")
    if q["options"].count(ASIS) and q["options"][0] != ASIS and "__" not in q["stem"]:
        warn.append("as-is option without underlined text")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, items = [], []
    for name in FILES:
        st, it = load(name)
        stimuli += st
        items += it
    for s in stimuli:
        if any(ch in s["text"] + s.get("title", "") for ch in "\u2014\u2013\u2019\u2018\u201c\u201d"):
            print("  WARN dash or curly quote in", s["id"])
    out, warnings, authored = [], [], []

    def emit(q, qid):
        warnings.extend(lint(q, qid))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": "mcq", "test": q["test"], "module": 1, "domain": q["domain"],
                "skill": q["skill"], "difficulty": q["difficulty"], "format": "single",
                "stimulusId": q["stim"], "stem": q["stem"], "options": f["options"], "correct": f["correct"]}
        if f["lockedOrder"]:
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    # Balance key letters: locked items keep their natural order; each unlocked item gets a key
    # slot drawn from a seeded, balanced list so that every letter ends near a quarter of the bank.
    locked_pos = Counter(finish(q)["correct"][0] for q in items if finish(q)["lockedOrder"])
    free = [q for q in items if not finish(q)["lockedOrder"]]
    total = len(items)
    want = {i: max(0, round(total / 4) - locked_pos[i]) for i in range(4)}
    slots = [i for i in range(4) for _ in range(want[i])]
    while len(slots) < len(free):
        slots.append(min(range(4), key=lambda i: locked_pos[i] + slots.count(i)))
    random.Random(20261101).shuffle(slots)
    for q, slot in zip(free, slots):
        q["slot"] = slot

    for test in (1, 2):
        mine = [q for q in items if q["test"] == test]
        assert Counter(q["domain"] for q in mine) == Counter(PER_TEST), (test, Counter(q["domain"] for q in mine))
        sets = []
        for q in mine:
            assert q["stim"].startswith(f"{PREFIX}-T{test}-"), q["stem"]
            if not sets or sets[-1][0] != q["stim"]:
                sets.append([q["stim"], 0])
            sets[-1][1] += 1
        assert [n for _, n in sets] == SET_SIZES, (test, sets)
        for n, q in enumerate(mine, 1):
            emit(q, f"{PREFIX}-T{test}-{n:03d}")
    drill = [q for q in items if q["test"] == 0]
    for n, q in enumerate(drill, 1):
        assert q["stim"].startswith(f"{PREFIX}-D-"), q["stem"]
        emit(q, f"{PREFIX}-D-{n:03d}")

    used = Counter(q["stimulusId"] for q in out)
    assert set(used) == {s["id"] for s in stimuli}, ("stimulus not used or unknown", set(used) ^ {s["id"] for s in stimuli})
    dst = os.path.join(ROOT, "data/v2/aplang/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"aplang: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    print("  set sizes:", dict(used))
    print("  skills:", dict(Counter(q["skill"] for q in out)))
    cand = [(qid, q) for qid, q in authored if not all(NUM.match(o) for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    shortest = [qid for qid, q in cand if len(q["options"][0]) < min(len(o) for o in q["options"][1:])]
    print(f"  key strictly shortest: {len(shortest)}/{len(cand)} = {len(shortest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out).items())))
    print("  locked:", sum(1 for q in out if q.get("lockedOrder")))
    stems = Counter((q["stim"], q["stem"]) for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[1][:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)


if __name__ == "__main__":
    build()
