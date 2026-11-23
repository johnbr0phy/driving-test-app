#!/usr/bin/env python3
"""Build the Garda Trainee Stage 1 reasoning practice bank (v2).

Usage: python3 -I tools/next100/iegarda/build.py

Sources (Python data, original passages and invented tables):
  verbal_t1.py, verbal_t2.py, verbal_drill.py   PASSAGES: P(test, title, text, items)
      TF(statement, "T"|"F"|"C", explanation)   True / False / Cannot say, locked order
      MC(skill, stem, [key, wrong, wrong, wrong], explanation)   key written first, shuffled
  numerical.py                                   TABLES: T(test, title, header, rows, questions)
      N(domain, skill, stem, key, [4 wrong values], fmt, explanation)   numbers, sorted and locked
      L(domain, skill, stem, [key, wrong, wrong, wrong], explanation)   text answers, shuffled

Each practice test has a verbal section (5 passages x 6 = 30 questions) and a numerical section
(4 tables x 5 = 20 questions). Drill-only items (test 0) are 10 passages and 8 tables.
Statements are shuffled inside each passage with a seed from the passage title, so the True,
False and Cannot say keys do not fall in a fixed position; the two single-answer questions follow.

Ids: IEGARDA-T1-V-01.., IEGARDA-T1-N-01.., IEGARDA-D-V-.., IEGARDA-D-N-..; stimuli
IEGARDA-T1-P1.., IEGARDA-T1-TB1.., IEGARDA-D-P1.., IEGARDA-D-TB1...
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "iegarda"
PREFIX = "IEGARDA"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
TFC = ["True", "False", "Cannot say"]
KEYS = {"T": 0, "F": 1, "C": 2}


def P(test, title, text, items):
    return {"test": test, "title": title, "text": text, "items": items}


def TF(statement, key, expl):
    return {"kind": "TF", "statement": statement, "key": key, "explanation": expl}


def MC(skill, stem, opts, expl):
    return {"kind": "MC", "skill": skill, "stem": stem, "options": opts, "explanation": expl}


def T(test, title, header, rows, questions):
    return {"test": test, "title": title, "header": header, "rows": rows, "questions": questions}


def N(domain, skill, stem, key, wrongs, fmt, expl):
    return {"kind": "N", "domain": domain, "skill": skill, "stem": stem, "key": key, "wrongs": wrongs, "fmt": fmt, "explanation": expl}


def L(domain, skill, stem, opts, expl):
    return {"kind": "L", "domain": domain, "skill": skill, "stem": stem, "options": opts, "explanation": expl}


def load(name, var):
    g = {"P": P, "TF": TF, "MC": MC, "T": T, "N": N, "L": L, "__name__": "garda_source"}
    path = os.path.join(HERE, name)
    exec(compile(open(path).read(), path, "exec"), g)
    return g[var]


def fmt(v, f):
    if f == "int":
        return f"{v:,.0f}"
    if f == "dec1":
        return f"{v:,.1f}"
    if f == "dec2":
        return f"{v:,.2f}"
    if f == "pct0":
        return f"{v:.0f}%"
    if f == "pct1":
        return f"{v:.1f}%"
    if f == "eur":
        return f"€{v:,.0f}"
    if f == "eur2":
        return f"€{v:,.2f}"
    if f == "hours0":
        return f"{v:.0f} hours"
    if f == "hours1":
        return f"{v:.1f} hours"
    if f == "hours2":
        return f"{v:.2f} hours"
    if f == "litres1":
        return f"{v:.1f} litres"
    if f == "km1":
        return f"{v:.1f} km"
    if f == "kmh1":
        return f"{v:.1f} km/h"
    if f == "ratio1":
        return f"{v:.1f} to 1"
    if f == "pts":
        return f"{v:.0f} percentage points"
    raise ValueError(f)


def seed_of(s):
    return int(hashlib.sha256(s.encode()).hexdigest()[:12], 16)


def shuffle_key_first(opts, stem):
    order = list(range(len(opts)))
    random.Random(seed_of(stem)).shuffle(order)
    return [opts[i] for i in order], order.index(0)


def table_md(t):
    lines = ["| " + " | ".join(t["header"]) + " |", "|" + "---|" * len(t["header"])]
    for row in t["rows"]:
        lines.append("| " + " | ".join(str(c) for c in row) + " |")
    return "\n".join(lines)


def lint(texts, where):
    out = []
    for s in texts:
        if "—" in s or "–" in s:
            out.append(f"{where}: dash")
        if "of the above" in s.lower():
            out.append(f"{where}: of the above")
    return out


def build():
    warnings = []
    passages = load("verbal_t1.py", "PASSAGES") + load("verbal_t2.py", "PASSAGES") + load("verbal_drill.py", "PASSAGES")
    tables = load("numerical.py", "TABLES")
    stimuli, questions = [], []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        vn = 0
        for pi, p in enumerate([p for p in passages if p["test"] == test], 1):
            sid = f"{PREFIX}-{tag}-P{pi}"
            stimuli.append({"id": sid, "title": p["title"], "text": p["text"]})
            tfs = [i for i in p["items"] if i["kind"] == "TF"]
            mcs = [i for i in p["items"] if i["kind"] == "MC"]
            if len(tfs) != 4 or len(mcs) != 2:
                warnings.append(f"{sid}: {len(tfs)} TF, {len(mcs)} MC")
            random.Random(seed_of(p["title"])).shuffle(tfs)
            for it in tfs + mcs:
                vn += 1
                q = {"id": f"{PREFIX}-{tag}-V-{vn:02d}", "section": "verbal", "test": test, "module": 1}
                if it["kind"] == "TF":
                    q.update({"domain": "gardaVerbalTfc", "skill": "True, False or Cannot say", "difficulty": 2,
                              "stimulusId": sid, "format": "single",
                              "stem": f"{it['statement']}\n\nOn the passage alone, is this statement True, False or Cannot say?",
                              "options": list(TFC), "correct": [KEYS[it["key"]]], "lockedOrder": True})
                else:
                    opts, k = shuffle_key_first(it["options"], it["stem"])
                    if len(it["options"][0]) > max(len(o) for o in it["options"][1:]):
                        warnings.append(f"{q['id']}: key longest")
                    q.update({"domain": "gardaVerbalInfer", "skill": it["skill"], "difficulty": 2,
                              "stimulusId": sid, "format": "single", "stem": it["stem"],
                              "options": opts, "correct": [k]})
                q["explanation"] = it["explanation"]
                warnings += lint([q["stem"], q["explanation"], *q["options"], p["text"]], q["id"])
                questions.append(q)
        nn = 0
        for ti, t in enumerate([t for t in tables if t["test"] == test], 1):
            sid = f"{PREFIX}-{tag}-TB{ti}"
            stimuli.append({"id": sid, "title": t["title"], "text": table_md(t)})
            if len(t["questions"]) != 5:
                warnings.append(f"{sid}: {len(t['questions'])} questions")
            for it in t["questions"]:
                nn += 1
                q = {"id": f"{PREFIX}-{tag}-N-{nn:02d}", "section": "numerical", "test": test, "module": 1,
                     "domain": it["domain"], "skill": it["skill"], "difficulty": 2, "stimulusId": sid,
                     "format": "single", "stem": it["stem"]}
                if it["kind"] == "N":
                    vals = [it["key"]] + list(it["wrongs"])
                    texts = [fmt(v, it["fmt"]) for v in vals]
                    if len(set(texts)) != 5:
                        warnings.append(f"{q['id']}: duplicate options {texts}")
                    order = sorted(range(5), key=lambda i: vals[i])
                    q["options"] = [texts[i] for i in order]
                    q["correct"] = [order.index(0)]
                    q["lockedOrder"] = True
                    keynum = re.search(r"\d[\d.,]*", texts[0]).group(0).rstrip(".,")
                    if keynum not in it["explanation"]:
                        warnings.append(f"{q['id']}: key {texts[0]} not in explanation")
                else:
                    opts, k = shuffle_key_first(it["options"], it["stem"])
                    q["options"], q["correct"] = opts, [k]
                    m = re.search(r"\d[\d.,]*", it["options"][0])
                    if m and m.group(0).rstrip(".,") not in it["explanation"]:
                        warnings.append(f"{q['id']}: key number not in explanation")
                q["explanation"] = it["explanation"]
                warnings += lint([q["stem"], q["explanation"], *q["options"]], q["id"])
                questions.append(q)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": questions}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(questions)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in questions)
    for test in (1, 2, 0):
        print(f"  test {test}:", {d: per[(test, d)] for d in ("gardaVerbalTfc", "gardaVerbalInfer", "gardaNumPct", "gardaNumCalc")})
    tf = Counter(q["options"][q["correct"][0]] for q in questions if q["domain"] == "gardaVerbalTfc")
    print("  True/False/Cannot say keys:", dict(tf))
    other = Counter(q["correct"][0] for q in questions if not q.get("lockedOrder"))
    print("  shuffled key positions:", dict(sorted(other.items())))
    locked = Counter(q["correct"][0] for q in questions if q.get("lockedOrder") and q["domain"] != "gardaVerbalTfc")
    print("  sorted number key positions:", dict(sorted(locked.items())))
    stems = Counter(q["stem"] for q in questions)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
