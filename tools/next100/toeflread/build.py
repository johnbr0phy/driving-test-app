#!/usr/bin/env python3
"""Build the TOEFL iBT Reading v2 bank from Python-data sources.

Usage: python3 -I tools/next100/toeflread/build.py

Models the TOEFL iBT Reading section as ETS describes it from January 21, 2026
(test blueprint and specifications, test overview; tools/next100/toeflread/sources.md):
50 items in about 30 minutes, two-stage adaptive, three task types:
Complete the Words (C-test paragraphs, 10 words each), Read in Daily Life (short
non-academic texts with 2 or 3 questions) and Read an Academic Passage (about
200 words, 5 questions).

Each practice test: module 1 (the router) is two Complete the Words paragraphs,
four daily-life sets (3, 3, 2 and 2 questions) and one academic passage, 35
items; module 2 is one paragraph and one academic passage, 15 items, in an
easier (lower) and a harder (upper) version. Drill-only items are test 0.

Sources: cw.py (Complete the Words, damaged by ctest.py), daily.py and
academic.py. Keys are written first; options are shuffled into balanced key
slots. Ids: TOEFLR-T<n>-NNN (test) and TOEFLR-D-NNN (drill only), in order.
"""
import hashlib, json, os, random, re, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
sys.path.insert(0, HERE)
from ctest import damage, gap, is_function  # noqa: E402
from cw import CW  # noqa: E402
from daily import DAILY  # noqa: E402
from academic import ACAD  # noqa: E402

PREFIX = "TOEFLR"
DOM = {
    "ctwGrammar": "toeflCtwGrammar", "ctwContent": "toeflCtwContent",
    "detail_daily": "toeflDailyDetail", "infer_daily": "toeflDailyInfer",
    "detail_acad": "toeflAcadDetail", "vocab_acad": "toeflAcadVocab", "reason_acad": "toeflAcadReason",
}
SKILL = {
    "toeflCtwGrammar": "Complete the Words", "toeflCtwContent": "Complete the Words",
    "toeflDailyDetail": "Read in Daily Life", "toeflDailyInfer": "Read in Daily Life",
    "toeflAcadDetail": "Read an Academic Passage", "toeflAcadVocab": "Read an Academic Passage",
    "toeflAcadReason": "Read an Academic Passage",
}
# Real words the system word list lacks (inflections, British forms), checked by hand.
ALLOW = {"replies", "prodding", "worries", "abseil", "relying"}
WORDS = ALLOW | set(w.strip().lower() for w in open("/usr/share/dict/words")) if os.path.exists("/usr/share/dict/words") else set()

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


def cw_items(p, warns):
    text, ws = damage(p["text"])
    assert len(p["words"]) == 10, p["id"]
    stim = {"id": p["id"], "title": p["title"], "text": "Fill in the missing letters in the paragraph.\n\n" + text}
    items = []
    for w, (key, wrongs, reason) in zip(ws, p["words"]):
        assert key == w["word"], (p["id"], w["n"], key, w["word"])
        assert len(wrongs) == 3 and len(set(x.lower() for x in wrongs + [key])) == 4, (p["id"], key)
        for x in wrongs:
            assert len(x) == len(key) and x.lower().startswith(w["prefix"].lower()), (p["id"], key, x)
            if WORDS and x.lower() not in WORDS and x.lower().rstrip("s") not in WORDS and x.lower()[:-2] not in WORDS and x.lower()[:-1] not in WORDS:
                warns.append(f"{p['id']} ({w['n']}): '{x}' not in the word list (check it is a real word)")
        dom = DOM["ctwGrammar"] if is_function(key) else DOM["ctwContent"]
        items.append({
            "d": p["d"], "domain": dom,
            "stem": f"Which word completes gap ({w['n']}), **{gap(w)}**?",
            "options": [key, *wrongs],
            "explanation": f"\"{key}\" fits. {reason}",
        })
    return stim, items


def qa_items(qs, kind):
    out = []
    for q in qs:
        out.append({"d": q["d"], "domain": DOM[f"{q['dom']}_{kind}"], "stem": q["stem"],
                    "options": [q["key"], *q["wrongs"]], "explanation": q["expl"]})
    return out


def blocks():
    """Yield (test, module, variant, stimulus, items) in presentation order."""
    warns = []
    cw = {p["id"]: p for p in CW}
    daily = {p["id"]: p for p in DAILY}
    acad = {p["id"]: p for p in ACAD}
    plan = []
    for t in (1, 2):
        plan += [(t, 1, None, "cw", f"{PREFIX}-T{t}-CW1"), (t, 1, None, "cw", f"{PREFIX}-T{t}-CW2")]
        plan += [(t, 1, None, "daily", f"{PREFIX}-T{t}-DL{i}") for i in range(1, 5)]
        plan += [(t, 1, None, "acad", f"{PREFIX}-T{t}-AP1")]
        plan += [(t, 2, "lower", "cw", f"{PREFIX}-T{t}-CW3"), (t, 2, "lower", "acad", f"{PREFIX}-T{t}-AP2")]
        plan += [(t, 2, "upper", "cw", f"{PREFIX}-T{t}-CW4"), (t, 2, "upper", "acad", f"{PREFIX}-T{t}-AP3")]
    plan += [(0, 1, None, "cw", p["id"]) for p in CW if p["test"] == 0]
    plan += [(0, 1, None, "daily", p["id"]) for p in DAILY if p["test"] == 0]
    plan += [(0, 1, None, "acad", p["id"]) for p in ACAD if p["test"] == 0]
    used = set()
    out = []
    for t, m, v, kind, sid in plan:
        used.add(sid)
        if kind == "cw":
            p = cw[sid]
            assert (p["test"], p["module"], p["variant"]) == (t, m, v), sid
            stim, items = cw_items(p, warns)
        elif kind == "daily":
            p = daily[sid]
            assert p["test"] == t, sid
            assert len(p["qs"]) in (2, 3), sid
            stim, items = {"id": sid, "title": p["title"], "text": p["text"]}, qa_items(p["qs"], "daily")
        else:
            p = acad[sid]
            assert (p["test"], p["module"], p["variant"]) == (t, m, v), sid
            assert len(p["qs"]) == 5, sid
            stim, items = {"id": sid, "title": p["title"], "text": p["text"]}, qa_items(p["qs"], "acad")
        out.append((t, m, v, kind, stim, items))
    missing = (set(cw) | set(daily) | set(acad)) - used
    assert not missing, missing
    return out, warns


def build():
    data, warns = blocks()
    stimuli, questions = [], []
    counters = Counter()
    for t, m, v, kind, stim, items in data:
        stimuli.append(stim)
        if any(ch in stim["text"] + stim["title"] for ch in BAD):
            warns.append(f"{stim['id']}: dash or curly quote in text")
        for it in items:
            counters[t] += 1
            qid = f"{PREFIX}-T{t}-{counters[t]:03d}" if t else f"{PREFIX}-D-{counters[t]:03d}"
            opts, key = place(it["options"], it["stem"] + stim["id"])
            texts = [it["stem"], it["explanation"], *opts]
            if any(ch in x for x in texts for ch in BAD):
                warns.append(f"{qid}: dash or curly quote")
            if POS.search(it["explanation"]) or POS.search(it["stem"]):
                warns.append(f"{qid}: refers to an option by position")
            if len(set(o.lower() for o in opts)) != len(opts):
                warns.append(f"{qid}: duplicate option")
            q = {"id": qid, "section": "read", "test": t, "module": m}
            if v:
                q["variant"] = v
            q.update({"domain": it["domain"], "skill": SKILL[it["domain"]], "difficulty": it["d"],
                      "stimulusId": stim["id"], "format": "single", "stem": it["stem"], "options": opts,
                      "correct": [key], "explanation": it["explanation"]})
            questions.append(q)
    for t in (1, 2):
        for m, v, n in ((1, None, 35), (2, "lower", 15), (2, "upper", 15)):
            got = sum(1 for q in questions if q["test"] == t and q["module"] == m and q.get("variant") == v)
            assert got == n, (t, m, v, got)
    stems = Counter((q["stem"], q["stimulusId"]) for q in questions)
    for (s, sid), k in stems.items():
        if k > 1:
            warns.append(f"duplicate stem on {sid}: {s[:60]}")
    money = re.compile(r"(?<!\\)\$(?=\d)")
    for s in stimuli:
        s["text"] = money.sub(r"\\$", s["text"])
    for q in questions:
        q["stem"] = money.sub(r"\\$", q["stem"])
        q["options"] = [money.sub(r"\\$", o) for o in q["options"]]
        q["explanation"] = money.sub(r"\\$", q["explanation"])
    dst = os.path.join(ROOT, "data/v2/toeflread/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": questions}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"toeflread: wrote {len(questions)} questions, {len(stimuli)} texts -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in questions if q["test"] == t)))
    print("  drill pools (test 1 + drill only):", dict(Counter(q["domain"] for q in questions if q["test"] in (0, 1))))
    for s in stimuli:
        if "-CW" in s["id"]:
            continue
        print(f"  {s['id']}: {len(s['text'].split())} words")
    print("  key slots:", dict(sorted(Counter(q["correct"][0] for q in questions).items())))
    longest = sum(1 for q in questions if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]))
    over = 0
    for q in questions:
        k = len(q["options"][q["correct"][0]])
        others = [len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]]
        if k > 1.2 * sum(others) / 3:
            over += 1
    nonctw = [q for q in questions if "Ctw" not in q["domain"]]
    l2 = sum(1 for q in nonctw if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]))
    print(f"  key strictly longest: {longest}/{len(questions)}; reading items only {l2}/{len(nonctw)} = {l2 / len(nonctw):.0%}")
    print(f"  key over 120% of wrong average: {over}/{len(questions)}")
    for w in warns:
        print("  WARN", w)


if __name__ == "__main__":
    build()
