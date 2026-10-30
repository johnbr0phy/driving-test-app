#!/usr/bin/env python3
"""Build the GCSE Maths Higher v2 bank from tools/gcsehigher/q_*.py.

Usage: python3 -I tools/gcsehigher/build.py
Then:  python3 -I tools/validate_v2_bank.py gcsehigher '<plan>' (see sources.md)

Sections are the three papers: p1 (non-calculator), p2 and p3 (calculator).
Each paper of a practice test has 20 items: 3 number, 6 algebra, 4 ratio,
4 geometry, 3 probability and statistics (15/30/20/20/15%, the DfE Higher
tier weightings). Drill-only items (test 0) sit in p1 because a drill draws
from one section and runs without a calculator. Ids interleave the domains
within each paper (GCSEH-T1-001.., -T2-.., -D-..), and the single-answer key
is rotated so it lands evenly on A to D.
"""
import json, os, re, sys, collections

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import q_number, q_algebra, q_ratio, q_geometry, q_stats  # noqa: E402

PREFIX = "GCSEH"
MODULES = [q_number, q_algebra, q_ratio, q_geometry, q_stats]
DOMAINS = [m.DOMAIN for m in MODULES]
PER_PAPER = {"gcsehigherNumber": 3, "gcsehigherAlgebra": 6, "gcsehigherRatio": 4, "gcsehigherGeometry": 4, "gcsehigherStats": 3}
DST = os.path.join(HERE, "..", "..", "data", "v2", "gcsehigher", "questions.json")


def main():
    items = {m.DOMAIN: [dict(q, domain=m.DOMAIN) for q in m.ITEMS] for m in MODULES}
    problems = []
    # Shape checks per test and paper.
    for test in (1, 2):
        for paper in (1, 2, 3):
            for d in DOMAINS:
                n = sum(1 for q in items[d] if q["test"] == test and q["paper"] == paper)
                if n != PER_PAPER[d]:
                    problems.append(f"test {test} paper {paper} {d}: {n} items, want {PER_PAPER[d]}")
    out, rot = [], 0
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for paper in (1, 2, 3):
            blocks = []
            for di, d in enumerate(DOMAINS):
                mine = [q for q in items[d] if q["test"] == test and q["paper"] == paper]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": f"p{paper}", "test": test, "module": 1,
                        "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
                for k in ("basics", "passage"):
                    if q.get(k):
                        item[k] = q[k]
                item["stem"] = q["stem"]
                if q["format"] == "single":
                    opts = list(q["options"])
                    key = opts.pop(0)
                    pos = rot % len(q["options"])
                    rot += 1
                    opts.insert(pos, key)
                    item["options"], item["correct"] = opts, [pos]
                    longest = max(len(o) for o in q["options"])
                    if len(key) == longest and sum(len(o) == longest for o in q["options"]) == 1 and len(key) > 12:
                        problems.append(f"{item['id']}: key is the single longest option ({key[:40]!r})")
                elif q["format"] == "multi":
                    item["options"], item["correct"] = q["options"], q["correct"]
                    if q.get("select"):
                        item["select"] = q["select"]
                elif q["format"] == "numeric":
                    item["numeric"] = q["numeric"]
                if paper != 1:
                    item["calculator"] = True
                item["explanation"] = q["explanation"]
                out.append(item)
    # House style: no em or en dashes, plain apostrophes, no "all/none of the above".
    for q in out:
        blob = json.dumps(q, ensure_ascii=False)
        if re.search("[—–’‘]", blob):
            problems.append(f"{q['id']}: em/en dash or curly quote")
        if re.search(r"(all|none) of the above", blob, re.I):
            problems.append(f"{q['id']}: all/none of the above")
    os.makedirs(os.path.dirname(DST), exist_ok=True)
    with open(DST, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = collections.Counter((q["test"], q["domain"]) for q in out)
    print(f"gcsehigher: wrote {len(out)} questions -> data/v2/gcsehigher/questions.json")
    for d in DOMAINS:
        print(f"  {d}: T1 {counts[(1, d)]}, T2 {counts[(2, d)]}, drill-only {counts[(0, d)]}, drill pool {counts[(0, d)] + sum(1 for q in out if q['domain'] == d and q['test'] == 1 and q['section'] == 'p1')}")
    keys = collections.Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-answer key positions:", dict(sorted(keys.items())))
    if problems:
        print("PROBLEMS:")
        for p in problems:
            print("  " + p)
        sys.exit(1)


if __name__ == "__main__":
    main()
