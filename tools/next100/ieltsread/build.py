#!/usr/bin/env python3
"""Build the IELTS Academic Reading v2 bank from Python-data sources.

Usage: python3 -I tools/next100/ieltsread/build.py

Models IELTS Academic Reading (ielts.org format page, fetched 2026-11-14):
3 passages, 40 questions, 60 minutes, one mark per question. Every
statement or gap is its own one-mark item, so the official raw-score-to-band
table applies to a 40-item test.

Sources: t1.py and t2.py (the two practice tests, three passages each) and
d1.py to d6.py (drill-only passages, two each; d6 holds two short ones the landing can print as samples). Each file defines
PASSAGES = [(stimulus, [items]), ...] where a stimulus is
{"id", "title", "text"} and items are made with these helpers (difficulty d
is 1 to 3):

  TF(d, statement, "T"|"F"|"NG", explanation)       True/False/Not Given
  YN(d, claim, "Y"|"N"|"NG", explanation)           Yes/No/Not Given
  HEAD(d, paragraph, key, [4 wrong headings], expl)  matching headings
  MI(d, info, key_letter, letters, expl)            matching information
  MF(d, stem, key, [names in list order], expl)     matching features
  SE(d, beginning, key, [3 or 4 wrong endings], expl) sentence endings
  MC(d, stem, key, [3 wrong], expl)                 multiple choice
  CZ(d, kind, stem with [[1]], key, [3 or 4 wrong], expl)  completion

Keys are written first; shuffled formats get a balanced key slot. Ids:
IELTSR-T<n>-NNN (test) and IELTSR-D-NNN (drill only), in passage order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "IELTSR"
FILES = ["t1", "t2", "d1", "d2", "d3", "d4", "d5", "d6"]
PER_TEST = 40
TF_OPTS = ["True", "False", "Not Given"]
YN_OPTS = ["Yes", "No", "Not Given"]
KEYMAP = {"T": 0, "Y": 0, "F": 1, "N": 1, "NG": 2}


def TF(d, s, key, expl):
    return {"kind": "TF", "d": d, "stem": f"{s}\n\nDoes this agree with the information in the passage: True, False or Not Given?",
            "options": TF_OPTS, "correct": KEYMAP[key], "lock": True, "explanation": expl,
            "domain": "ieltsTfng", "skill": "True/False/Not Given"}


def YN(d, s, key, expl):
    return {"kind": "YN", "d": d, "stem": f"{s}\n\nDoes this agree with the claims of the writer: Yes, No or Not Given?",
            "options": YN_OPTS, "correct": KEYMAP[key], "lock": True, "explanation": expl,
            "domain": "ieltsYnng", "skill": "Yes/No/Not Given"}


def HEAD(d, para, key, wrongs, expl):
    assert len(wrongs) == 4, key
    return {"kind": "HEAD", "d": d, "stem": f"Which heading best fits Paragraph {para}?", "options": [key, *wrongs],
            "correct": 0, "lock": False, "explanation": expl, "domain": "ieltsHeadings", "skill": "Matching headings"}


def MI(d, info, key, letters, expl):
    assert key in letters and 4 <= len(letters) <= 6
    return {"kind": "MI", "d": d, "stem": f"Which paragraph contains {info}?", "options": [f"Paragraph {c}" for c in letters],
            "correct": letters.index(key), "lock": True, "explanation": expl, "domain": "ieltsMatchInfo", "skill": "Matching information"}


def MF(d, stem, key, names, expl):
    assert key in names and 3 <= len(names) <= 6, stem
    return {"kind": "MF", "d": d, "stem": stem, "options": list(names), "correct": names.index(key), "lock": True,
            "explanation": expl, "domain": "ieltsMatchFeatures", "skill": "Matching features"}


def SE(d, beginning, key, wrongs, expl):
    assert 3 <= len(wrongs) <= 4
    return {"kind": "SE", "d": d, "stem": f"Choose the correct ending for this sentence:\n\n{beginning} ...", "options": [key, *wrongs],
            "correct": 0, "lock": False, "explanation": expl, "domain": "ieltsMatchFeatures", "skill": "Matching sentence endings"}


def MC(d, stem, key, wrongs, expl):
    assert len(wrongs) == 3, stem
    return {"kind": "MC", "d": d, "stem": stem, "options": [key, *wrongs], "correct": 0, "lock": False,
            "explanation": expl, "domain": "ieltsMcq", "skill": "Multiple choice"}


KINDS = ("Sentence completion", "Summary completion", "Note completion", "Table completion",
         "Flow-chart completion", "Diagram label completion", "Short-answer questions")


def CZ(d, kind, stem, key, wrongs, expl):
    assert kind in KINDS, kind
    assert stem.count("[[1]]") == 1 and "[[2]]" not in stem, stem
    assert 3 <= len(wrongs) <= 4
    return {"kind": "CZ", "d": d, "stem": stem, "blank": [key, *wrongs], "explanation": expl,
            "domain": "ieltsCompletion", "skill": kind}


_SLOTS, _RNG = {}, random.Random(20261114)


def slot(n):
    lst = _SLOTS.setdefault(n, [])
    if not lst:
        block = list(range(n))
        _RNG.shuffle(block)
        lst.extend(block)
    return lst.pop(0)


def place(opts, seed):
    rng = random.Random(int(hashlib.sha256(seed.encode()).hexdigest()[:12], 16))
    wrong = list(range(1, len(opts)))
    rng.shuffle(wrong)
    s = slot(len(opts))
    order = wrong[:s] + [0] + wrong[s:]
    return [opts[i] for i in order], order.index(0)


BAD = "—–’‘“”"
POS = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)\b|\b(option|choice)\s+[A-F]\b", re.I)


def load(name):
    g = {"TF": TF, "YN": YN, "HEAD": HEAD, "MI": MI, "MF": MF, "SE": SE, "MC": MC, "CZ": CZ}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["PASSAGES"]


def build():
    stimuli, out, warns = [], [], []
    counters = Counter()
    for name in FILES:
        for stim, items in load(name):
            sid = stim["id"]
            m = re.match(rf"{PREFIX}-(T(\d)|D)-", sid)
            assert m, sid
            test = int(m.group(2)) if m.group(2) else 0
            stimuli.append(stim)
            for t in (stim["text"], stim["title"]):
                if any(ch in t for ch in BAD):
                    warns.append(f"{sid}: dash or curly quote in passage")
            for it in items:
                counters[test] += 1
                qid = f"{PREFIX}-T{test}-{counters[test]:03d}" if test else f"{PREFIX}-D-{counters[test]:03d}"
                texts = [it["stem"], it["explanation"], *(it.get("options") or it["blank"])]
                if any(ch in t for t in texts for ch in BAD):
                    warns.append(f"{qid}: dash or curly quote")
                if POS.search(it["explanation"]) or POS.search(it["stem"]):
                    warns.append(f"{qid}: refers to an option by position")
                q = {"id": qid, "section": "read", "test": test, "module": 1, "domain": it["domain"], "skill": it["skill"],
                     "difficulty": it["d"], "stimulusId": sid}
                if it["kind"] == "CZ":
                    blank, key = place(it["blank"], it["stem"] + sid)
                    if len(set(b.lower() for b in blank)) != len(blank):
                        warns.append(f"{qid}: duplicate choice")
                    q.update({"format": "cloze", "stem": it["stem"], "blanks": [blank], "correct": [key]})
                else:
                    if it["lock"]:
                        opts, key = it["options"], it["correct"]
                    else:
                        opts, key = place(it["options"], it["stem"] + sid)
                    if len(set(o.lower() for o in opts)) != len(opts):
                        warns.append(f"{qid}: duplicate option")
                    q.update({"format": "single", "stem": it["stem"], "options": opts, "correct": [key]})
                    if it["lock"]:
                        q["lockedOrder"] = True
                q["explanation"] = it["explanation"]
                out.append(q)
    for t in (1, 2):
        assert counters[t] == PER_TEST, (t, counters[t])
    stems = Counter((q["stem"], q["stimulusId"]) for q in out)
    for (s, sid), k in stems.items():
        if k > 1:
            warns.append(f"duplicate stem on {sid}: {s[:60]}")
    dst = os.path.join(ROOT, "data/v2/ieltsread/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"ieltsread: wrote {len(out)} questions, {len(stimuli)} passages -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    print("  pools (test 1 + drills):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    print("  skills:", dict(Counter(q["skill"] for q in out)))
    for s in stimuli:
        n = len(s["text"].split())
        print(f"  {s['id']}: {n} words, {sum(1 for q in out if q['stimulusId'] == s['id'])} questions")
    for t in (1, 2):
        w = sum(len(s["text"].split()) for s in stimuli if s["id"].startswith(f"{PREFIX}-T{t}-"))
        print(f"  test {t} total words: {w}")
    tf = Counter(q["options"][q["correct"][0]] for q in out if q.get("lockedOrder") and q["options"][0] in ("True", "Yes"))
    print("  TF/YN keys:", dict(tf))
    shuffled = [q for q in out if not q.get("lockedOrder")]
    print("  shuffled key slots:", dict(sorted(Counter(q["correct"][0] for q in shuffled).items())))
    longest = 0
    cand = 0
    for q in shuffled:
        opts = q.get("options") or q["blanks"][0]
        k = opts[q["correct"][0]]
        others = [o for i, o in enumerate(opts) if i != q["correct"][0]]
        cand += 1
        if len(k) > max(len(o) for o in others):
            longest += 1
    print(f"  key strictly longest (shuffled items): {longest}/{cand} = {longest / max(1, cand):.0%}")
    for w in warns:
        print("  WARN", w)


if __name__ == "__main__":
    build()
