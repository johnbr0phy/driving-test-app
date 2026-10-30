#!/usr/bin/env python3
"""Build the EQAO Grade 9 Math v2 bank from tools/eqao9/q_*.py.

Usage: python3 -I tools/eqao9/build.py
Then:  python3 -I tools/validate_v2_bank.py eqao9 '<plan>' (plan in sources.md)

Sections are the real assessment's two sessions, A and B. Each session has
stage 1 (13 items, medium) and an adaptive stage 2 (12 items, a lower or an
upper module picked from stage 1), so a student answers 25 per session and
50 per test, the real operational count. Per session the strands follow the
EQAO blueprint (Number 10, Algebra 18, Data 8, Geometry and Measurement 8,
Financial Literacy 6 of 50):
  stage 1: 3 number, 4 algebra, 2 data, 2 geometry, 2 financial
  stage 2: 2 number, 5 algebra, 2 data, 2 geometry, 1 financial (each variant)
Drill-only items (test 0) sit in session A because a drill draws from one
section. Ids interleave the strands (EQAO9-T1-001.., -T2-.., -D-..). The
single-answer key rotates over A to D; multi and cloze choices are shuffled
with a fixed seed.
"""
import json, os, re, sys, random, collections

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import q_number, q_algebra, q_data, q_geometry, q_financial  # noqa: E402

PREFIX = "EQAO9"
MODULES = [q_number, q_algebra, q_data, q_geometry, q_financial]
DOMAINS = [m.DOMAIN for m in MODULES]
STAGE1 = {"eqao9Number": 3, "eqao9Algebra": 4, "eqao9Data": 2, "eqao9Geometry": 2, "eqao9Financial": 2}
STAGE2 = {"eqao9Number": 2, "eqao9Algebra": 5, "eqao9Data": 2, "eqao9Geometry": 2, "eqao9Financial": 1}
DRILL = {"eqao9Number": 10, "eqao9Algebra": 8, "eqao9Data": 11, "eqao9Geometry": 11, "eqao9Financial": 12}
BLOCKS = [(1, None), (2, "lower"), (2, "upper")]
DST = os.path.join(HERE, "..", "..", "data", "v2", "eqao9", "questions.json")
DOLLAR = re.compile(r"(?<!\\)\$")


def esc(v):
    if isinstance(v, str):
        return DOLLAR.sub(r"\\$", v)
    if isinstance(v, list):
        return [esc(x) for x in v]
    return v


def main():
    rng = random.Random(9)
    items = {m.DOMAIN: [dict(q, domain=m.DOMAIN) for q in m.ITEMS] for m in MODULES}
    problems = []
    for d in DOMAINS:
        for test in (1, 2):
            for sec in ("a", "b"):
                for mod, var in BLOCKS:
                    n = sum(1 for q in items[d] if q["test"] == test and q["section"] == sec and q["module"] == mod and q.get("variant") == var)
                    want = STAGE1[d] if mod == 1 else STAGE2[d]
                    if n != want:
                        problems.append(f"{d} test {test} session {sec} module {mod} {var or ''}: {n} items, want {want}")
        n = sum(1 for q in items[d] if q["test"] == 0)
        if n != DRILL[d]:
            problems.append(f"{d} drill-only: {n} items, want {DRILL[d]}")
    out, rot = [], 0
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        blocks = [(s, m, v) for s in ("a", "b") for m, v in BLOCKS] if test else [("a", 1, None)]
        for sec, mod, var in blocks:
            order = []
            for di, d in enumerate(DOMAINS):
                mine = [q for q in items[d] if q["test"] == test and q["section"] == sec and q["module"] == mod and q.get("variant") == var]
                for i, q in enumerate(mine):
                    order.append(((i + 0.5) / len(mine), di, q))
            order.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in order:
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": sec, "test": test, "module": mod}
                if var:
                    item["variant"] = var
                item.update({"domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]})
                for k in ("basics", "passage"):
                    if q.get(k):
                        item[k] = esc(q[k])
                item["stem"] = esc(q["stem"])
                f = q["format"]
                if f == "single":
                    opts = list(q["options"])
                    key = opts.pop(0)
                    if q.get("lockedOrder"):
                        opts.insert(0, key)
                        pos = q["options"].index(key)
                        item["lockedOrder"] = True
                    else:
                        pos = rot % len(q["options"])
                        rot += 1
                        opts.insert(pos, key)
                    item["options"], item["correct"] = esc(opts), [pos]
                    longest = max(len(o) for o in q["options"])
                    if len(key) == longest and sum(len(o) == longest for o in q["options"]) == 1 and len(key) > 12:
                        problems.append(f"{item['id']}: key is the single longest option ({key[:40]!r})")
                    if len(set(q["options"])) != len(q["options"]):
                        problems.append(f"{item['id']}: duplicate options")
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
                elif f == "order":
                    item["options"], item["correct"] = esc(q["options"]), q["correct"]
                elif f == "matrix":
                    item["rows"], item["columns"], item["correct"] = esc(q["rows"]), esc(q["columns"]), q["correct"]
                elif f == "numeric":
                    item["numeric"] = q["numeric"]
                    for a in q["numeric"]["answers"]:
                        if " " in a.strip():
                            problems.append(f"{item['id']}: numeric answer with a space {a!r}")
                item["calculator"] = True
                item["explanation"] = esc(q["explanation"])
                out.append(item)
    for q in out:
        blob = json.dumps(q, ensure_ascii=False)
        if re.search("[—–’‘“”]", blob):
            problems.append(f"{q['id']}: em/en dash or curly quote")
        if re.search(r"(all|none) of the above", blob, re.I):
            problems.append(f"{q['id']}: all/none of the above")
    os.makedirs(os.path.dirname(DST), exist_ok=True)
    with open(DST, "w") as fh:
        json.dump(out, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"eqao9: wrote {len(out)} questions -> data/v2/eqao9/questions.json")
    c = collections.Counter((q["test"], q["domain"]) for q in out)
    for d in DOMAINS:
        pool = sum(1 for q in out if q["domain"] == d and q["section"] == "a" and q["test"] in (0, 1))
        print(f"  {d}: T1 {c[(1, d)]}, T2 {c[(2, d)]}, drill-only {c[(0, d)]}, drill pool {pool}")
    print("  formats:", dict(collections.Counter(q["format"] for q in out)))
    print("  single-answer key positions:", dict(sorted(collections.Counter(q["correct"][0] for q in out if q["format"] == "single").items())))
    if problems:
        print("PROBLEMS:")
        for p in problems:
            print("  " + p)
        sys.exit(1)


if __name__ == "__main__":
    main()
