#!/usr/bin/env python3
"""Build the STAAR English I v2 bank from Python-data sources.

Usage: python3 -I tools/next100/staareng1/build.py

Models the reading and the revising and editing parts of the STAAR English I
end-of-course test (TEA blueprint effective as of spring 2023): per practice
test, a reading section of 30 items on two single passages and one paired
passage, and a writing section of 21 items on two revising and two editing
drafts. The extended constructed response is not modelled.

Sources: t1.py, t2.py (the practice tests), dread.py and dwrite.py (drill
only). Each file has STIMULI and ITEMS made with these helpers (key written
first; d is difficulty 1 to 3):

  Q(test, d, dom, skill, stem, [key, wrong, wrong, wrong], expl, stim)       single choice
  M(test, d, dom, skill, stem, [key, key], [wrong, wrong, wrong], expl, stim) choose two
  C(test, d, dom, skill, stem with [[1]], [key, wrong, wrong, wrong], expl, stim)  inline choice
  H(test, d, dom, skill, stem with {{...}} markers, key_index, expl, stim)    select a sentence

Domains are given to the sources as VOC, CMP, LIT, INF, CRF (reading) and ORG,
CLR, SEN, MEC (writing). Single-choice options that are all numbers or all
"Sentence N" are sorted and locked; everything else is shuffled with a seeded,
balanced key slot. Ids: STAARE1-T<n>-NNN and STAARE1-D-NNN in passage order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "STAARE1"
FILES = [f for f in os.environ.get("STAAR_FILES", "t1,t2,dread,dwrite").split(",") if f]

DOMS = {
    "VOC": "staareng1Vocab", "CMP": "staareng1Comp", "LIT": "staareng1Literary",
    "INF": "staareng1Info", "CRF": "staareng1Craft",
    "ORG": "staareng1Organize", "CLR": "staareng1Clarity", "SEN": "staareng1Sentences", "MEC": "staareng1Mechanics",
}
SECTION = {d: ("read" if k in ("VOC", "CMP", "LIT", "INF", "CRF") else "write") for k, d in DOMS.items()}
PER_TEST = {"staareng1Vocab": 3, "staareng1Comp": 9, "staareng1Literary": 7, "staareng1Info": 5, "staareng1Craft": 6,
            "staareng1Organize": 5, "staareng1Clarity": 6, "staareng1Sentences": 5, "staareng1Mechanics": 5}
SKILLS = {
    "CONTEXT": "Words in context", "CONNOTE": "Connotation and denotation", "FOREIGN": "Foreign words and phrases",
    "INFER": "Inference", "KEYIDEA": "Key ideas", "SUMMARY": "Summary", "SYNTH": "Synthesizing two texts",
    "THEME": "Theme", "CHAR": "Characterization", "PLOT": "Plot structure", "SETTING": "Setting",
    "POETRY": "Poetry", "DRAMA": "Drama",
    "THESIS": "Thesis and evidence", "ORGPAT": "Organizational patterns", "CLAIM": "Claims and appeals",
    "COUNTER": "Counterarguments", "AUDIENCE": "Audience",
    "PURPOSE": "Author's purpose", "STRUCT": "Text structure", "FEATURES": "Print and graphic features",
    "LANG": "Language and tone", "DEVICES": "Literary and rhetorical devices",
    "ORGANIZE": "Organization", "DEVELOP": "Development", "CLARITY": "Clarity and word choice",
    "COMBINE": "Sentence effectiveness",
    "BOUND": "Sentence boundaries", "VERB": "Verb tense and voice", "PRONOUN": "Pronoun agreement",
    "CAPS": "Capitalization", "PUNCT": "Punctuation", "SPELL": "Spelling",
}


def _q(kind, test, d, dom, skill, stem, expl, stim, **kw):
    assert skill in SKILLS.values(), skill
    return {"kind": kind, "test": test, "difficulty": d, "domain": DOMS[dom], "skill": skill,
            "stem": stem, "explanation": expl, "stim": stim, **kw}


def Q(test, d, dom, skill, stem, opts, expl, stim):
    assert len(opts) == 4, stem
    return _q("single", test, d, dom, skill, stem, expl, stim, options=list(opts))


def M(test, d, dom, skill, stem, keys, wrongs, expl, stim):
    assert len(keys) == 2 and len(wrongs) in (3, 4), stem
    return _q("multi", test, d, dom, skill, stem, expl, stim, keys=list(keys), wrongs=list(wrongs))


def C(test, d, dom, skill, stem, opts, expl, stim):
    assert len(opts) == 4 and stem.count("[[1]]") == 1, stem
    return _q("cloze", test, d, dom, skill, stem, expl, stim, options=list(opts))


def H(test, d, dom, skill, stem, key, expl, stim):
    n = len(re.findall(r"\{\{[^{}]+\}\}", stem))
    assert 4 <= n <= 10 and 0 <= key < n, stem
    return _q("highlight", test, d, dom, skill, stem, expl, stim, key=key)


NUM = re.compile(r"^-?\d+(\.\d+)?%?$")
SENT = re.compile(r"^(?:After |Before )?[Ss]entence (\d+)$")
BAD = "—–’‘“”"
POS = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)\b|\b(option|choice)\s+[A-D]\b", re.I)


def load(name):
    g = {"Q": Q, "M": M, "C": C, "H": H, **{k: k for k in DOMS}, **SKILLS}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def seed(s):
    return random.Random(int(hashlib.sha256(s.encode()).hexdigest()[:12], 16))


def lockable(o):
    return all(NUM.match(x) for x in o) or all(SENT.match(x) for x in o)


def build():
    stimuli, items = [], []
    for name in FILES:
        st, it = load(name)
        stimuli += st
        items += it
    warns = []
    for s in stimuli:
        if any(ch in s["text"] + s["title"] for ch in BAD):
            warns.append(f"{s['id']}: dash or curly quote")

    # Balanced key slots for every shuffled single/cloze item.
    free = [q for q in items if q["kind"] in ("single", "cloze") and not lockable(q["options"])]
    slots = [i % 4 for i in range(len(free))]
    random.Random(20261114).shuffle(slots)
    for q, s in zip(free, slots):
        q["slot"] = s

    out = []
    counters = Counter()
    order = [q for t in (1, 2, 0) for q in items if q["test"] == t]
    for q in order:
        t = q["test"]
        counters[t] += 1
        qid = f"{PREFIX}-T{t}-{counters[t]:03d}" if t else f"{PREFIX}-D-{counters[t]:03d}"
        want = f"{PREFIX}-T{t}-" if t else f"{PREFIX}-D-"
        assert q["stim"].startswith(want), (qid, q["stim"])
        texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("keys", []), *q.get("wrongs", [])]
        if any(ch in x for x in texts for ch in BAD):
            warns.append(f"{qid}: dash or curly quote")
        if POS.search(q["stem"]) or POS.search(q["explanation"]):
            warns.append(f"{qid}: refers to an option by position")
        item = {"id": qid, "section": SECTION[q["domain"]], "test": t, "module": 1, "domain": q["domain"],
                "skill": q["skill"], "difficulty": q["difficulty"]}
        k = q["kind"]
        if k in ("single", "cloze"):
            o = q["options"]
            if len(set(o)) != 4:
                warns.append(f"{qid}: duplicate option")
            if lockable(o):
                idx = sorted(range(4), key=lambda i: float(o[i].rstrip("%")) if NUM.match(o[i]) else int(SENT.match(o[i]).group(1)))
                locked = True
            else:
                rest = [1, 2, 3]
                seed(q["stem"]).shuffle(rest)
                idx = rest[:q["slot"]] + [0] + rest[q["slot"]:]
                locked = False
            opts = [o[i] for i in idx]
            item.update({"format": "single" if k == "single" else "cloze", "stimulusId": q["stim"], "stem": q["stem"]})
            if k == "single":
                item.update({"options": opts, "correct": [idx.index(0)]})
                if locked:
                    item["lockedOrder"] = True
            else:
                item.update({"blanks": [opts], "correct": [idx.index(0)]})
        elif k == "multi":
            opts = [(x, True) for x in q["keys"]] + [(x, False) for x in q["wrongs"]]
            seed(q["stem"]).shuffle(opts)
            item.update({"format": "multi", "select": 2, "stimulusId": q["stim"], "stem": q["stem"],
                         "options": [x for x, _ in opts], "correct": [i for i, (_, y) in enumerate(opts) if y]})
        else:
            item.update({"format": "highlight", "stimulusId": q["stim"], "stem": q["stem"], "correct": [q["key"]]})
        item["explanation"] = q["explanation"]
        out.append(item)

    for t in sorted({q["test"] for q in out} - {0}):
        got = Counter(q["domain"] for q in out if q["test"] == t)
        assert got == Counter(PER_TEST), (t, got)
    used = {q["stimulusId"] for q in out}
    assert used == {s["id"] for s in stimuli}, used ^ {s["id"] for s in stimuli}
    stems = Counter(q["stem"] for q in out)
    for s, n in stems.items():
        if n > 1:
            warns.append(f"duplicate stem: {s[:70]}")

    dst = os.path.join(ROOT, "data/v2/staareng1/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"staareng1: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    print("  formats:", dict(Counter(q["format"] for q in out)))
    for s in stimuli:
        print(f"  {s['id']}: {len(s['text'].split())} words, {sum(1 for q in out if q['stimulusId'] == s['id'])} items")
    cand = [q for q in items if q["kind"] in ("single", "cloze") and not lockable(q["options"])]
    longest = sum(1 for q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    over = sum(1 for q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3)
    print(f"  key strictly longest: {longest}/{len(cand)} = {longest / max(1, len(cand)):.0%}")
    print(f"  key over 120% of wrong mean: {over}/{len(cand)} = {over / max(1, len(cand)):.0%}")
    singles = [q for q in out if q["format"] in ("single", "cloze")]
    print("  key letters:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in singles).items())))
    for w in warns:
        print("  WARN", w)


if __name__ == "__main__":
    build()
