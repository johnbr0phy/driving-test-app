#!/usr/bin/env python3
"""Build data/v2/staaralg1/questions.json from tools/next100/staaralg1/q_*.py.

Usage (repo root): python3 -I tools/next100/staaralg1/build.py
Then: python3 -I tools/validate_v2_bank.py staaralg1 '{"1": {"alg": {"1": 50}}, "2": {"alg": {"1": 50}}}'

Each practice test is one 50-question section, like the real STAAR Algebra I EOC
(TEA blueprint effective 2022-23: 50 questions, 59 points). Per test the domains
follow the blueprint's reporting categories, mid-range of each band:
  RC1 Number and Algebraic Methods 10: polynomials and factoring 5, exponents,
      radicals, functions and sequences 5
  RC2 Describing and Graphing Linear Functions 11
  RC3 Writing and Solving Linear Functions 13: writing 6, solving 7
  RC4 Quadratic Functions and Equations 10
  RC5 Exponential Functions and Equations 6
Drill-only items (test 0) bring every drill pool (Test 1 plus drill-only) to 20.
Ids interleave the domains (STAARA1-T1-001.., -T2-.., -D-..). Single-answer keys
rotate over A to D; options that are all numbers are sorted and locked.
"""
import collections, json, os, random, re, sys
from fractions import Fraction

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import q_poly, q_expr, q_graph, q_write, q_solve, q_quad, q_exp  # noqa: E402

PREFIX = "STAARA1"
MODULES = [q_poly, q_expr, q_graph, q_write, q_solve, q_quad, q_exp]
DOMAINS = [m.DOMAIN for m in MODULES]
PER_TEST = {"staaralg1Poly": 5, "staaralg1Expr": 5, "staaralg1Graph": 11, "staaralg1Write": 6,
            "staaralg1Solve": 7, "staaralg1Quad": 10, "staaralg1Exp": 6}
# The Basics each drill opens with (lib/v2/exams/staaralg1.ts). A tag outside
# its drill's list can never show a brush-up card, so the build drops it.
DRILL_BASICS = {
    "staaralg1Poly": {"distributing", "factoring", "gcfLcm", "negativeNumbers"},
    "staaralg1Expr": {"exponentRules", "squareRoots", "functionNotation", "substitution"},
    "staaralg1Solve": {"solveX", "inequalities", "systems", "fractionOps"},
}
DST = os.path.join(HERE, "..", "..", "..", "data", "v2", "staaralg1", "questions.json")
DOLLAR = re.compile(r"(?<!\\)\$")
POSITIONAL = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)s?\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)


def esc(v):
    if isinstance(v, str):
        return DOLLAR.sub(r"\\$", v)
    if isinstance(v, list):
        return [esc(x) for x in v]
    return v


def as_number(s):
    t = s.replace("$", "").replace(",", "").replace("−", "-").strip()
    t = re.sub(r"\s*(feet|ft|meters|m|seconds|hours|days|years|inches|units|square units|dollars|people|items|tickets|cm)$", "", t)
    try:
        if re.fullmatch(r"-?\d+(\.\d+)?|-?\d+/\d+", t):
            return Fraction(t)
    except (ValueError, ZeroDivisionError):
        return None
    return None


def main():
    rng = random.Random(1)
    items = {m.DOMAIN: [dict(q, domain=m.DOMAIN) for q in m.ITEMS] for m in MODULES}
    problems = []
    for d in DOMAINS:
        for test in (1, 2):
            n = sum(1 for q in items[d] if q["test"] == test)
            if n != PER_TEST[d]:
                problems.append(f"{d} test {test}: {n} items, want {PER_TEST[d]}")
        pool = sum(1 for q in items[d] if q["test"] in (0, 1))
        if pool < 20:
            problems.append(f"{d}: drill pool {pool}, want at least 20")
    stems = collections.Counter(re.sub(r"\W+", " ", q["stem"].lower()) + "|" + (q.get("passage") or "") for d in DOMAINS for q in items[d])
    for s, c in stems.items():
        if c > 1:
            problems.append(f"duplicate stem x{c}: {s[:60]}")
    out, rot = [], 0
    longest = singles = over = 0
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        order = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            mine.sort(key=lambda q: q["difficulty"])
            for i, q in enumerate(mine):
                order.append(((i + 0.5) / len(mine), di, q))
        order.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(order, 1):
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": "alg", "test": test, "module": 1,
                    "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
            if q.get("basics") in DRILL_BASICS.get(q["domain"], set()):
                item["basics"] = q["basics"]
            if q.get("passage"):
                item["passage"] = esc(q["passage"])
            item["stem"] = esc(q["stem"])
            f = q["format"]
            text = q["stem"] + " " + q["explanation"]
            if POSITIONAL.search(text):
                problems.append(f"{item['id']}: points at an option by position")
            if f == "single":
                opts = list(q["options"])
                key = opts[0]
                if len(set(opts)) != 4:
                    problems.append(f"{item['id']}: duplicate options")
                nums = [as_number(o) for o in opts]
                if all(x is not None for x in nums):
                    srt = [o for _, o in sorted(zip(nums, opts), key=lambda p: p[0])]
                    item["lockedOrder"] = True
                    item["options"], item["correct"] = esc(srt), [srt.index(key)]
                elif q.get("lockedOrder"):
                    item["lockedOrder"] = True
                    item["options"], item["correct"] = esc(opts), [0]
                else:
                    rest = opts[1:]
                    pos = rot % 4
                    rot += 1
                    rest.insert(pos, key)
                    item["options"], item["correct"] = esc(rest), [pos]
                    singles += 1
                    wrong = opts[1:]
                    if len(key) > max(len(w) for w in wrong):
                        longest += 1
                    if len(key) > 1.2 * sum(len(w) for w in wrong) / 3 + 2:
                        over += 1
            elif f == "multi":
                idx = list(range(len(q["options"])))
                rng.shuffle(idx)
                item["options"] = esc([q["options"][i] for i in idx])
                item["correct"] = sorted(idx.index(c) for c in q["correct"])
                item["select"] = q["select"]
            elif f == "cloze":
                blanks, cor = [], []
                for b in q["blanks"]:
                    idx = list(range(len(b)))
                    rng.shuffle(idx)
                    blanks.append(esc([b[i] for i in idx]))
                    cor.append(idx.index(0))
                item["blanks"], item["correct"] = blanks, cor
            elif f == "matrix":
                item["rows"], item["columns"], item["correct"] = esc(q["rows"]), esc(q["columns"]), q["correct"]
            elif f == "numeric":
                item["numeric"] = q["numeric"]
                for a in q["numeric"]["answers"]:
                    if " " in a.strip() or "−" in a:
                        problems.append(f"{item['id']}: bad numeric answer {a!r}")
            item["calculator"] = True
            item["explanation"] = esc(q["explanation"])
            out.append(item)
    for q in out:
        blob = json.dumps(q, ensure_ascii=False)
        if re.search("[—–’‘“”]", blob):
            problems.append(f"{q['id']}: em/en dash or curly quote")
        if re.search(r"(all|none) of the above|\bboth [A-D] and\b", blob, re.I):
            problems.append(f"{q['id']}: banned option wording")
        if q["format"] != "cloze" and not re.search(r"[?:]$|Choose two\.$|Choose three\.$", q["stem"].strip()):
            problems.append(f"{q['id']}: stem ending {q['stem'][-25:]!r}")
    if singles and longest / singles > 0.25:
        problems.append(f"key is the single longest option in {longest}/{singles} shuffled single items (max 25%)")
    if singles and over / singles > 0.30:
        problems.append(f"key over 1.2x wrong average in {over}/{singles} items (max 30%)")
    os.makedirs(os.path.dirname(DST), exist_ok=True)
    with open(DST, "w") as fh:
        json.dump(out, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"staaralg1: wrote {len(out)} questions -> data/v2/staaralg1/questions.json")
    c = collections.Counter((q["test"], q["domain"]) for q in out)
    for d in DOMAINS:
        print(f"  {d}: T1 {c[(1, d)]}, T2 {c[(2, d)]}, drill-only {c[(0, d)]}, drill pool {c[(1, d)] + c[(0, d)]}")
    print("  formats:", dict(collections.Counter(q["format"] for q in out)))
    print("  single key positions:", dict(sorted(collections.Counter(q["correct"][0] for q in out if q["format"] == "single").items())))
    print(f"  key longest {longest}/{singles}, key over 1.2x avg {over}/{singles}")
    if problems:
        print("PROBLEMS:")
        for p in problems:
            print("  " + p)
        sys.exit(1)


if __name__ == "__main__":
    main()
