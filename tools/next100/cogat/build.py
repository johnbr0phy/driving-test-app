#!/usr/bin/env python3
"""Build data/v2/cogat/questions.json from verbal.py and quant.py in this folder.

Usage (from the repo root):  python3 -I tools/next100/cogat/build.py

CogAT Levels 9 to 12 (grades 3 to 6), the Verbal and Quantitative batteries of Forms 7
and 8 (Riverside Insights, CogAT Overview Brochure). Each battery is one section in its
real test order: Verbal Analogies, Sentence Completion, Verbal Classification; Number
Analogies, Number Puzzles, Number Series. Per test 12 items a subtest, easy to hard;
10 more per subtest are drill-only (test 0). Test 2 is held out of the drills.
Ids: COGAT-T1-001.., COGAT-T2-.., COGAT-D-..

Every quantitative key is computed here and checked: the analogy rule fits both example
pairs and no wrong answer fits a straight-line rule through them; the puzzle key makes the
equation true and every wrong answer makes it false; the series rule gives every shown
term. Number options are sorted and locked; word options rotate the key's slot.
"""
import json, os, re, runpy, sys
from fractions import Fraction as F

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SRC)))
PREFIX = "COGAT"
PER_TEST = {1: 12, 2: 12, 0: 10}
SLOTS = [0, 2, 1, 3, 2, 0, 3, 1]
POSITIONAL = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)s?\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)

problems = []


def fnum(s):
    return F(str(s))


def assign_tests(items):
    """Sort by difficulty (stable) and deal T1, T2, drill in turn until the drill pool is
    full, then T1 and T2, so each test gets the same spread of easy and hard items."""
    order = sorted(range(len(items)), key=lambda i: items[i][0])
    tests, cycle, counts = {}, [1, 2, 0], {1: 0, 2: 0, 0: 0}
    k = 0
    for i in order:
        while True:
            t = cycle[k % 3]
            k += 1
            if counts[t] < PER_TEST[t]:
                break
        tests[i] = t
        counts[t] += 1
    if counts != PER_TEST:
        problems.append(f"bad pool size {sum(counts.values())}: {counts}")
    return tests


def word_item(i, stem, key, wrong, expl):
    opts = list(wrong)
    if len(opts) != 3 or key in opts or len(set(opts)) != 3:
        problems.append(f"bad options for {stem[:40]!r}")
    slot = SLOTS[i % len(SLOTS)]
    opts.insert(slot, key)
    return {"format": "single", "stem": stem, "options": opts, "correct": [slot], "explanation": expl}


def number_item(stem, key, wrong, expl):
    opts = [str(key)] + [str(w) for w in wrong]
    if len(set(fnum(o) for o in opts)) != 4:
        problems.append(f"duplicate number options for {stem[:40]!r}")
    opts.sort(key=fnum)
    return {"format": "single", "stem": stem, "options": opts, "correct": [opts.index(str(key))],
            "lockedOrder": True, "explanation": expl}


def respace(key, wrong, target):
    """Move the key to sorted slot `target` (0-3) so the number answer is not always in
    the middle. Wrong answers already on the needed side are kept; the rest become near
    misses (one, two or three away, or ten away), the usual counting slips."""
    if not isinstance(key, int) and not str(key).isdigit():
        return wrong
    k = int(key)
    vals = [fnum(w) for w in wrong]
    if any(v.denominator != 1 for v in vals):
        return wrong
    below = sorted([int(v) for v in vals if v < k], reverse=True)
    above = sorted([int(v) for v in vals if v > k])
    need_below, need_above = target, 3 - target
    for c in (k - 1, k - 2, k - 3, k - 10, k - 4, k - 5):
        if len(below) >= need_below:
            break
        if c >= 0 and c not in below and c not in above:
            below.append(c)
    for c in (k + 1, k + 2, k + 3, k + 10, k + 4, k + 5):
        if len(above) >= need_above:
            break
        if c not in above and c not in below:
            above.append(c)
    if len(below) < need_below or len(above) < need_above:
        return wrong
    # Prefer the authored distractors: drop the near misses added last when trimming.
    below = sorted(below, key=lambda v: (v not in [int(x) for x in vals], -v))[:need_below]
    above = sorted(above, key=lambda v: (v not in [int(x) for x in vals], v))[:need_above]
    return below + above


def analogy_stem(s):
    left, right = s.split(" : ")
    a, b = [x.strip() for x in left.split("→")]
    c = right.split("→")[0].strip()
    return f"{s}\n\nWhich word goes with **{c}** the same way **{b}** goes with **{a}**?"


def classify_stem(s):
    a, b, c = [x.strip() for x in s.split(",")]
    return f"Which word goes with **{a}**, **{b}** and **{c}**?"


def verbal():
    ns = runpy.run_path(os.path.join(SRC, "verbal.py"))
    out = {}
    out["cogatVerbalAnalogies"] = ("Verbal analogies", [
        (d, word_item(i, analogy_stem(s), k, w, e)) for i, (d, s, k, w, e) in enumerate(ns["ANALOGIES"])])
    for _, s, *_ in ns["SENTENCES"]:
        if "_____" not in s:
            problems.append(f"sentence without a blank: {s[:40]!r}")
    out["cogatSentenceCompletion"] = ("Sentence completion", [
        (d, word_item(i, f"{s}\n\nWhich word best completes the sentence?", k, w, e))
        for i, (d, s, k, w, e) in enumerate(ns["SENTENCES"])])
    out["cogatVerbalClassification"] = ("Verbal classification", [
        (d, word_item(i, classify_stem(s), k, w, e)) for i, (d, s, k, w, e) in enumerate(ns["CLASSIFY"])])
    return out


def solve_check(eq, value):
    left, right = eq.split("=")

    def ev(side):
        t = side.replace("×", "*").replace("÷", "/").replace("−", "-").replace("?", "(X)")
        t = re.sub(r"\d+(?:\.\d+)?", lambda m: f"F('{m.group(0)}')", t)
        return eval(t, {"F": F, "X": value})
    return ev(left) == ev(right)


def quant():
    ns = runpy.run_path(os.path.join(SRC, "quant.py"))
    out = {}
    items = []
    for j, (d, pairs, c, rule, words, wrong) in enumerate(ns["ANALOGIES"]):
        (a1, b1), (a2, b2) = pairs
        wrong = respace(rule(c), wrong, j % 4)
        if rule(a1) != b1 or rule(a2) != b2:
            problems.append(f"analogy rule {words} does not fit {pairs}")
        key = rule(c)
        line = b1 + F(b2 - b1, a2 - a1) * (c - a1)
        if any(F(w) == line for w in wrong) or key in wrong:
            problems.append(f"analogy {pairs} {c}: a wrong answer fits another rule")
        stem = f"{a1} → {b1}  :  {a2} → {b2}  :  {c} → ?\n\nWhich number finishes the last pair by the same rule?"
        expl = f"The rule is {words}: {a1} → {b1} and {a2} → {b2}. So {c} → {key}."
        items.append((d, number_item(stem, key, wrong, expl)))
    out["cogatNumberAnalogies"] = ("Number analogies", items)
    items = []
    for j, (d, eq, key, wrong, expl) in enumerate(ns["PUZZLES"]):
        wrong = respace(key, wrong, (j + 1) % 4)
        if not solve_check(eq, fnum(key)):
            problems.append(f"puzzle {eq}: key {key} is not a solution")
        for w in wrong:
            if solve_check(eq, fnum(w)):
                problems.append(f"puzzle {eq}: wrong answer {w} also works")
        stem = f"{eq}\n\nWhich number goes where the ? is?"
        items.append((d, number_item(stem, key, wrong, expl)))
    out["cogatNumberPuzzles"] = ("Number puzzles", items)
    items = []
    for j, (d, terms, rule, words, wrong) in enumerate(ns["SERIES"]):
        if rule is None:  # decimal series with a constant step
            vals = [fnum(t) for t in terms]
            step = vals[1] - vals[0]
            if any(vals[i + 1] - vals[i] != step for i in range(len(vals) - 1)):
                problems.append(f"series {terms}: not a constant step")
            nxt = vals[-1] + step
            key = str(nxt.numerator) if nxt.denominator == 1 else str(float(nxt))
        else:
            for i, t in enumerate(terms):
                if rule(i) != t:
                    problems.append(f"series {terms}: rule gives {rule(i)} for term {i + 1}")
            key = rule(len(terms))
            wrong = respace(key, wrong, (j + 2) % 4)
        if str(key) in [str(w) for w in wrong]:
            problems.append(f"series {terms}: key among wrong answers")
        stem = "   ".join(str(t) for t in terms) + "   ?\n\nWhich number comes next?"
        expl = f"{words}. The next number is {key}."
        items.append((d, number_item(stem, key, wrong, expl)))
    out["cogatNumberSeries"] = ("Number series", items)
    return out


SECTIONS = [
    ("verbal", ["cogatVerbalAnalogies", "cogatSentenceCompletion", "cogatVerbalClassification"]),
    ("quant", ["cogatNumberAnalogies", "cogatNumberPuzzles", "cogatNumberSeries"]),
]


def main():
    pools = {**verbal(), **quant()}
    stems, placed = set(), {}
    for dom, (skill, items) in pools.items():
        tests = assign_tests(items)
        placed[dom] = (skill, [(tests[i], d, it) for i, (d, it) in enumerate(items)])
        for d, it in items:
            norm = re.sub(r"\W+", " ", it["stem"].lower()).strip()
            if norm in stems:
                problems.append(f"duplicate stem {it['stem'][:50]!r}")
            stems.add(norm)
            text = " ".join([it["stem"], it["explanation"], *it["options"]])
            if "—" in text or "’" in text or "“" in text:
                problems.append(f"em dash or curly quote in {it['stem'][:40]!r}")
            if POSITIONAL.search(it["explanation"] + " " + it["stem"]):
                problems.append(f"points at an option by position: {it['stem'][:40]!r}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, doms in SECTIONS:
            for dom in doms:
                skill, rows = placed[dom]
                for _, d, it in sorted([r for r in rows if r[0] == test], key=lambda r: r[1]):
                    n += 1
                    q = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                         "domain": dom, "skill": skill, "difficulty": d}
                    q.update(it)
                    out.append(q)
    dst = os.path.join(ROOT, "data/v2/cogat/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["domain"])] = counts.get((q["test"], q["domain"]), 0) + 1
    print(f"cogat: wrote {len(out)} questions -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out if not q.get("lockedOrder")]
    print("  word-item key slots A-D:", [keys.count(i) for i in range(4)])
    locked = [q["correct"][0] for q in out if q.get("lockedOrder")]
    print("  number-item key slots A-D:", [locked.count(i) for i in range(4)])
    for p in problems:
        print("  PROBLEM", p)
    print(f"  {len(problems)} problems")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
