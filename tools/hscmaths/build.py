#!/usr/bin/env python3
"""Build the HSC Maths Standard 2 v2 bank from tools/hscmaths/q_*.py.

Usage: python3 -I tools/hscmaths/build.py
Then:  python3 -I tools/validate_v2_bank.py hscmaths '{"1": {"s1": {"1": 15}, "s2": {"1": 25}}, "2": {"s1": {"1": 15}, "s2": {"1": 25}}}'

Per practice test: Section I 15 multiple choice (2 algebra, 3 finance,
3 measurement, 2 networks, 2 bivariate, 3 probability), Section II 25 short
answer (4, 5, 5, 4, 3, 4). Drill-only items (test 0) sit in Section II.
Ids interleave the domains (HSCM-T1-001.., -T2-.., -D-..), and the
single-answer key is rotated so it lands evenly on A to D.
"""
import json, os, re, sys, collections

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import q_algebra, q_finance, q_measure, q_networks, q_bivariate, q_probability  # noqa: E402

PREFIX = "HSCM"
MODULES = [q_algebra, q_finance, q_measure, q_networks, q_bivariate, q_probability]
DOMAINS = [m.DOMAIN for m in MODULES]
PER = {
    "hscmathsAlgebra": (2, 4), "hscmathsFinance": (3, 5), "hscmathsMeasure": (3, 5),
    "hscmathsNetworks": (2, 4), "hscmathsBivariate": (2, 3), "hscmathsProbability": (3, 4),
}
DRILL_ONLY = 20
DST = os.path.join(HERE, "..", "..", "data", "v2", "hscmaths", "questions.json")


MATH = re.compile(r"(?<!\\)\$(.+?)(?<!\\)\$")


def katex_degrees(text):
    """Inside $...$, write a degree sign as ^{\\circ} so KaTeX never sees a bare unicode symbol."""
    return MATH.sub(lambda m: "$" + m.group(1).replace("°", "^{\\circ}") + "$", text)


def tidy(item):
    for k in ("stem", "explanation"):
        item[k] = katex_degrees(item[k])
    if "options" in item:
        item["options"] = [katex_degrees(o) for o in item["options"]]
    return item


def main():
    items = {m.DOMAIN: [dict(q, domain=m.DOMAIN) for q in m.ITEMS] for m in MODULES}
    problems = []
    for d in DOMAINS:
        for test in (1, 2):
            for sec in (1, 2):
                n = sum(1 for q in items[d] if q["test"] == test and q["sec"] == sec)
                if n != PER[d][sec - 1]:
                    problems.append(f"test {test} section {sec} {d}: {n} items, want {PER[d][sec - 1]}")
        n0 = sum(1 for q in items[d] if q["test"] == 0)
        if n0 != DRILL_ONLY:
            problems.append(f"{d}: {n0} drill-only items, want {DRILL_ONLY}")
        for q in items[d]:
            if q["sec"] == 1 and q["format"] != "single":
                problems.append(f"{d}: Section I item is not multiple choice: {q['stem'][:50]}")
    out, rot = [], 0
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for sec in (1, 2):
            blocks = []
            for di, d in enumerate(DOMAINS):
                mine = [q for q in items[d] if q["test"] == test and q["sec"] == sec]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": f"s{sec}", "test": test, "module": 1,
                        "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
                if q.get("basics"):
                    item["basics"] = q["basics"]
                item["stem"] = q["stem"]
                if q["format"] == "single":
                    opts = list(q["options"])
                    key = opts.pop(0)
                    pos = rot % 4
                    rot += 1
                    opts.insert(pos, key)
                    item["options"], item["correct"] = opts, [pos]
                    longest = max(len(o) for o in q["options"])
                    if len(key) == longest and sum(len(o) == longest for o in q["options"]) == 1 and len(key) > 14:
                        problems.append(f"{item['id']}: key is the single longest option ({key[:40]!r})")
                elif q["format"] == "numeric":
                    item["numeric"] = q["numeric"]
                item["calculator"] = True
                item["explanation"] = q["explanation"]
                out.append(tidy(item))
    for q in out:
        blob = json.dumps(q, ensure_ascii=False)
        if re.search("[—–’‘]", blob):
            problems.append(f"{q['id']}: em/en dash or curly quote")
        if re.search(r"(all|none) of the above", blob, re.I):
            problems.append(f"{q['id']}: all/none of the above")
        if re.search(r"\b(color|center|meter|liter|practicing|favorite|analyze)\b", blob):
            problems.append(f"{q['id']}: US spelling")
    seen = collections.Counter(q["stem"] for q in out)
    for s, c in seen.items():
        if c > 1:
            problems.append(f"duplicate stem x{c}: {s[:60]}")
    os.makedirs(os.path.dirname(DST), exist_ok=True)
    with open(DST, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = collections.Counter((q["test"], q["domain"]) for q in out)
    print(f"hscmaths: wrote {len(out)} questions -> data/v2/hscmaths/questions.json")
    for d in DOMAINS:
        pool = counts[(0, d)] + sum(1 for q in out if q["domain"] == d and q["test"] == 1 and q["section"] == "s2")
        print(f"  {d}: T1 {counts[(1, d)]}, T2 {counts[(2, d)]}, drill-only {counts[(0, d)]}, drill pool {pool}")
    print("  formats:", dict(collections.Counter(q["format"] for q in out)))
    keys = collections.Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-answer key positions:", dict(sorted(keys.items())))
    if problems:
        print("PROBLEMS:")
        for p in problems:
            print("  " + p)
        sys.exit(1)


if __name__ == "__main__":
    main()
