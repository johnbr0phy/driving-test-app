#!/usr/bin/env python3
"""Build the AP Italian Language and Culture v2 bank from Python-data sources.

Usage: python3 -I tools/next100/apitalian/build.py

Models Section II Part B (Reading) of the revised AP Italian Language and
Culture Exam (course and exam description effective fall 2026, first exam
May 2027): 30 multiple-choice questions in 40 minutes, six question sets of
five questions, each set on one print source of one of four task types
(Article, Article and Chart, Literary Text, Promotional Material).

Sources: one file per course unit, u1.py (Families and Communities) to
u6.py (Global Contexts). Each file has STIMULI (original practice texts in
Italian, each opening with an "Introduzione" line like the real exam) and
ITEMS, each
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim)
with test 1 or 2 (a practice-test item) or 0 (drill only). Stems and options
are in Italian, explanations in English. Skill names are the Skill Category 1
learning objectives (1.A.1 to 1.C.3), given to the sources as constants.
The key is always written first; the build puts it in a slot drawn from a
seeded, balanced list (each block of four items keys A, B, C and D once) and
shuffles the wrong options with a seed from the stem. Options that are all numbers are sorted ascending and
locked instead.

Each practice test is one section `read`, one 30-item module, six sets in
unit order (one set per unit). Every set has exactly five questions. Ids:
APITAL-T<n>-NNN and APITAL-D-NNN (drill only), so the id sort keeps that
order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APITAL"
DOMAINS = [("u1", "apitalianFamilies"), ("u2", "apitalianLanguage"), ("u3", "apitalianArt"),
           ("u4", "apitalianScience"), ("u5", "apitalianContemporary"), ("u6", "apitalianGlobal")]
PER_TEST = 5
DRILL_ONLY = 25
SKILLS = {
    "DET": "Supporting details",
    "DATA": "Data points and trends",
    "MAIN": "Main idea or purpose",
    "AUD": "Intended audience",
    "TONE": "Point of view and tone",
    "ORG": "Organization and strategies",
    "WORD": "Words in context",
    "CONN": "Connecting information",
    "CONC": "Logical conclusions",
    "INF": "Implied meaning",
}
TASKS = ("Articolo", "Articolo e grafico", "Testo letterario", "Materiale promozionale")


def Q(test, d, skill, stem, opts, expl, stim):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "explanation": expl, "stim": stim}


NUM = re.compile(r"^-?\d+([.,]\d+)?%?$")


def _num(s):
    return float(re.match(r"-?\d+([.,]\d+)?", s).group(0).replace(",", ".")) if NUM.match(s) else None


def load(name):
    g = {"Q": Q, **SKILLS}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


_SLOTS = []
_SLOT_RNG = random.Random(20261112)


def _next_slot():
    # Balanced key positions: each block of four shuffled items puts the key
    # once in every slot, in a seeded random order.
    if not _SLOTS:
        block = [0, 1, 2, 3]
        _SLOT_RNG.shuffle(block)
        _SLOTS.extend(block)
    return _SLOTS.pop(0)


def finish(q):
    rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
    nums = [_num(o) for o in q["options"]]
    out = {}
    if all(n is not None for n in nums):
        order = sorted(range(4), key=lambda i: nums[i])
        out["lockedOrder"] = True
    else:
        wrong = [1, 2, 3]
        rng.shuffle(wrong)
        slot = _next_slot()
        order = wrong[:slot] + [0] + wrong[slot:]
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


BAD = "\u2014\u2013\u2019\u2018\u201c\u201d"


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in BAD):
        warn.append("em/en dash or curly quote")
    if len(set(o.lower() for o in q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|tutte le precedenti|nessuna delle precedenti", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    if q["skill"] not in SKILLS.values():
        warn.append("unknown skill")
    if not re.search(r"[?:]$|\.\.\.$", q["stem"].strip()):
        warn.append("stem should end in ? or :")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, domains = [], []
    for name, dom in DOMAINS:
        st, items = load(name)
        stimuli += st
        domains.append((dom, items))
    for s in stimuli:
        if any(ch in s["text"] + s["title"] for ch in BAD):
            print("  WARN dash or curly quote in", s["id"])
        if not s["title"].startswith(TASKS):
            print("  WARN unknown task type in title", s["id"])
        if not s["text"].startswith("Introduzione:"):
            print("  WARN stimulus without Introduzione", s["id"])
    out, warnings, authored = [], [], []

    def emit(q, dom, qid, test):
        warnings.extend(lint(q, qid))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": "read", "test": test, "module": 1, "domain": dom, "skill": q["skill"],
                "difficulty": q["difficulty"], "format": "single", "stimulusId": q["stim"],
                "stem": q["stem"], "options": f["options"], "correct": f["correct"]}
        if f.get("lockedOrder"):
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    for test in (1, 2):
        n = 0
        for dom, items in domains:
            mine = [q for q in items if q["test"] == test]
            assert len(mine) == PER_TEST, (dom, test, len(mine))
            for q in mine:
                assert q["stim"].startswith(f"{PREFIX}-T{test}-"), (dom, q["stem"])
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for dom, items in domains:
        mine = [q for q in items if q["test"] == 0]
        assert len(mine) == DRILL_ONLY, (dom, len(mine))
        for q in mine:
            assert q["stim"].startswith(f"{PREFIX}-D-"), (dom, q["stem"])
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    used = Counter(q["stimulusId"] for q in out)
    assert set(used) == {s["id"] for s in stimuli}, ("stimulus not used or unknown", set(used) ^ {s["id"] for s in stimuli})
    for sid, k in used.items():
        if k != 5:
            print(f"  WARN stimulus {sid} has {k} questions")
    # sets stay together in order
    seq = [q["stimulusId"] for q in out]
    for sid in used:
        idx = [i for i, s in enumerate(seq) if s == sid]
        assert idx == list(range(idx[0], idx[0] + len(idx))), ("set split", sid)
    dst = os.path.join(ROOT, "data/v2/apitalian/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"apitalian: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    for t in (1, 2):
        tt = Counter(next(s["title"].split(":")[0] for s in stimuli if s["id"] == sid)
                     for sid in dict.fromkeys(q["stimulusId"] for q in out if q["test"] == t))
        print(f"  test {t} task types:", dict(tt))
    print("  skills:", dict(Counter(q["skill"] for q in out)))
    words = [len(s["text"].split()) for s in stimuli]
    print(f"  stimulus words: min {min(words)}, max {max(words)}, mean {sum(words) / len(words):.0f}")
    cand = [(qid, q) for qid, q in authored if not all(_num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    shortest = [qid for qid, q in cand if len(q["options"][0]) < min(len(o) for o in q["options"][1:])]
    print(f"  key strictly shortest: {len(shortest)}/{len(cand)} = {len(shortest) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out).items())))
    stems = Counter(q["stem"] + "|" + q["stim"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem in one set:", s[:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)


if __name__ == "__main__":
    build()
