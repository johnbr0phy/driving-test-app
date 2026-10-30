#!/usr/bin/env python3
"""Build the OSSLT v2 bank: data/v2/osslt/questions.json.

Usage (from the repo root): python3 -I tools/osslt/build.py

Content lives in tools/osslt/reading.py (passages + reading items) and
tools/osslt/writing.py (writing selected-response items). Those files call the
helpers below; they are exec'd here so the build runs under `python3 -I`.
Authors write the key FIRST in every options list (and first in every cloze
blank); this script rotates key positions so letters spread evenly. Order
items are written in the right order and stored shuffled.

Ids follow tools/build_v2_bank.py: each test lists its reading passages
(each passage's items stay together) then its writing items, interleaved by
domain: OSSLT-T1-001.., OSSLT-T2-001.., OSSLT-D-001.. (drill only).
"""
import json, os, random

ROOT = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(ROOT))
SECTIONS = {
    "reading": ["ossltInfo", "ossltNews", "ossltDialogue", "ossltNarrative"],
    "writing": ["ossltIdeas", "ossltOrganize", "ossltConventions"],
}
SECTION_OF = {d: s for s, ds in SECTIONS.items() for d in ds}
ITEMS, STIMULI = [], []
_n = [0]


def _base(domain, test, skill, diff, stem, expl, basics, stim, passage):
    assert domain in SECTION_OF, domain
    q = {"domain": domain, "test": test, "skill": skill, "difficulty": diff, "stem": stem, "explanation": expl}
    if basics:
        q["basics"] = basics
    if stim:
        q["stimulusId"] = stim
    if passage:
        q["passage"] = passage
    _n[0] += 1
    return q


def P(pid, title, text):
    STIMULI.append({"id": pid, "title": title, "text": text})


def S(domain, test, skill, diff, stem, options, expl, basics=None, stim=None, passage=None, key=0, locked=False):
    """Single choice. Key is options[0] unless `key` is given; rotated unless locked."""
    q = _base(domain, test, skill, diff, stem, expl, basics, stim, passage)
    opts = list(options)
    if locked:
        q.update(format="single", options=opts, correct=[key], lockedOrder=True)
    else:
        k = opts.pop(key)
        pos = _n[0] % len(options)
        opts.insert(pos, k)
        q.update(format="single", options=opts, correct=[pos])
    ITEMS.append(q)


def M(domain, test, skill, diff, stem, keys, others, expl, basics=None, stim=None, passage=None):
    """Multiple select ("Choose two"): keys and distractors, mixed deterministically."""
    q = _base(domain, test, skill, diff, stem, expl, basics, stim, passage)
    rnd = random.Random(f"osslt-m-{_n[0]}")
    opts = [(o, True) for o in keys] + [(o, False) for o in others]
    rnd.shuffle(opts)
    q.update(format="multi", select=len(keys), options=[o for o, _ in opts], correct=[i for i, (_, k) in enumerate(opts) if k])
    ITEMS.append(q)


def O(domain, test, skill, diff, stem, steps, expl, basics=None, stim=None, passage=None):
    """Order: steps written in the right order, stored shuffled."""
    q = _base(domain, test, skill, diff, stem, expl, basics, stim, passage)
    rnd = random.Random(f"osslt-o-{_n[0]}")
    idx = list(range(len(steps)))
    while idx == sorted(idx):
        rnd.shuffle(idx)
    opts = [steps[i] for i in idx]
    q.update(format="order", options=opts, correct=[idx.index(i) for i in range(len(steps))])
    ITEMS.append(q)


def C(domain, test, skill, diff, stem, blanks, expl, basics=None, passage=None):
    """Cloze: each blank's key written first, rotated."""
    q = _base(domain, test, skill, diff, stem, expl, basics, None, passage)
    out, cor = [], []
    for bi, b in enumerate(blanks):
        b = list(b)
        k = b.pop(0)
        pos = (_n[0] + bi) % (len(b) + 1)
        b.insert(pos, k)
        out.append(b)
        cor.append(pos)
    q.update(format="cloze", blanks=out, correct=cor)
    ITEMS.append(q)


def H(domain, test, skill, diff, stem, correct, expl, basics=None, passage=None):
    """Highlight: {{markers}} in passage (or stem); correct = marker indices."""
    q = _base(domain, test, skill, diff, stem, expl, basics, None, passage)
    q.update(format="highlight", correct=list(correct))
    ITEMS.append(q)


def build():
    env = {"P": P, "S": S, "M": M, "O": O, "C": C, "H": H}
    for f in ("reading.py", "writing.py"):
        path = os.path.join(ROOT, f)
        exec(compile(open(path).read(), path, "exec"), env)
    out = []
    tests = sorted({q["test"] for q in ITEMS} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        n = 0
        for section, doms in SECTIONS.items():
            blocks = []
            for di, d in enumerate(doms):
                singles = [q for q in ITEMS if q["domain"] == d and q["test"] == test and not q.get("stimulusId")]
                for i, q in enumerate(singles):
                    blocks.append(((i + 0.5) / len(singles), di, [q]))
            cases = {}
            for q in ITEMS:
                if q["test"] == test and q.get("stimulusId") and SECTION_OF[q["domain"]] == section:
                    cases.setdefault(q["stimulusId"], []).append(q)
            for k, (sid, qs) in enumerate(sorted(cases.items())):
                blocks.append(((k + 1) / (len(cases) + 1), -1, qs))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, qs in blocks:
                for q in qs:
                    n += 1
                    item = {"id": f"OSSLT-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                            "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                    item.update({k: v for k, v in q.items() if k not in ("domain", "test", "skill", "difficulty", "format")})
                    out.append(item)
    # House-style warnings: key longer than every distractor, em dashes, curly quotes.
    for q in out:
        if q["format"] == "single" and not q.get("lockedOrder"):
            key = q["options"][q["correct"][0]]
            others = [o for i, o in enumerate(q["options"]) if i != q["correct"][0]]
            if len(key) > max(len(o) for o in others) + 8:
                print(f"  warn {q['id']}: key is the longest option by {len(key) - max(len(o) for o in others)} chars")
    text = json.dumps({"stimuli": STIMULI, "questions": out}, ensure_ascii=False)
    for bad in ("—", "–", "’", "“", "”"):
        assert bad not in text, f"forbidden character {bad!r}"
    dst = os.path.join(REPO, "data/v2/osslt/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": STIMULI, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    by = {}
    for q in out:
        by.setdefault((q["test"], q["domain"]), 0)
        by[(q["test"], q["domain"])] += 1
    print(f"osslt: wrote {len(out)} questions, {len(STIMULI)} stimuli -> {dst}")
    for t in tests:
        print(f"  test {t}: " + ", ".join(f"{d} {by.get((t, d), 0)}" for ds in SECTIONS.values() for d in ds))


if __name__ == "__main__":
    build()
