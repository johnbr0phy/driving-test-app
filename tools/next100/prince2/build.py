#!/usr/bin/env python3
"""Build the PRINCE2 7 Foundation v2 bank from per-domain Python sources.

Usage: python3 -I tools/next100/prince2/build.py
       python3 -I tools/next100/prince2/build.py --check     (lint only, no write)

Sources are tools/next100/prince2/<domain>.py, each defining ITEMS with two helpers:
  Q(test, difficulty, skill, stem, options, explanation)   single answer, key first
  L(test, difficulty, skill, stem, options, explanation)   list style: the stem holds four
      numbered statements, the options are number pairs ("1 and 3"), key first; the build
      sorts the pairs and locks their order (lockedOrder), as the real exam shows them.
test is 1, 2 or 0 (drill only). Single options are shuffled with a seed taken from the stem,
so key positions are spread out and stable between builds; the app shuffles again.

Ids follow tools/build_v2_bank.py: PRINCE2-T1-001.., -T2-.., -D-.., each test interleaving
its domains. Fatal checks: per-test domain counts match PLAN and DRILL_ONLY, em or en dashes
or curly quotes, "of the above", option position words, stem endings, duplicate stems or
options. Printed: key letter spread and how often the key is the longest single option.
"""
import hashlib, json, os, random, re, runpy, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
EXAM, PREFIX, SECTION = "prince2", "PRINCE2", "prince2"

# Per-test counts (60 items), PRINCE2 7 Foundation syllabus exam specification:
# LO1 key concepts 3% (2), LO2 principles 8% (5), LO3 people 14% (8),
# LO4 practices 60% (36, split by practice), LO5 processes 15% (9).
PLAN = {
    "p2Concepts": 2, "p2Principles": 5, "p2People": 8,
    "p2BusinessCase": 5, "p2Organizing": 6, "p2Plans": 5, "p2Quality": 5,
    "p2Risk": 5, "p2Issues": 5, "p2Progress": 5,
    "p2Processes": 9,
}
DRILL_ONLY = {
    "p2Concepts": 5, "p2Principles": 8, "p2People": 8,
    "p2BusinessCase": 6, "p2Organizing": 6, "p2Plans": 7, "p2Quality": 7,
    "p2Risk": 7, "p2Issues": 7, "p2Progress": 8,
    "p2Processes": 11,
}


def Q(test, difficulty, skill, stem, options, explanation):
    return {"test": test, "difficulty": difficulty, "skill": skill, "format": "single",
            "stem": stem, "options": options, "correct": [0], "explanation": explanation}


def L(test, difficulty, skill, stem, options, explanation):
    q = Q(test, difficulty, skill, stem, options, explanation)
    q["list"] = True
    return q


def seed_of(q):
    return int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)


def arrange(q):
    out = dict(q)
    if q.get("list"):
        order = sorted(range(4), key=lambda i: q["options"][i])
        out["lockedOrder"] = True
    else:
        order = list(range(4))
        random.Random(seed_of(q)).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    out.pop("list", None)
    return out


def check(q, where):
    errs = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’‘“”"):
        errs.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q["options"]):
        errs.append("all/none of the above")
    if re.search(r"\b(?:first|second|third|fourth|last) (?:option|choice|answer)\b", q["explanation"] + " " + q["stem"], re.I):
        errs.append("points at an option by position")
    if not re.search(r"[?:]\s*$", q["stem"]):
        errs.append("stem does not end in ? or :")
    if len(q["options"]) != 4 or len(set(q["options"])) != 4:
        errs.append("needs four distinct options")
    if q.get("list") and not all(re.fullmatch(r"[1-4] and [1-4]", o) for o in q["options"]):
        errs.append("list options must be number pairs")
    return [f"{where}: {e}" for e in errs]


def main():
    errors, items, stems = [], {}, Counter()
    for d in PLAN:
        src = runpy.run_path(os.path.join(HERE, f"{d}.py"), init_globals={"Q": Q, "L": L})["ITEMS"]
        got = Counter(q["test"] for q in src)
        for t, want in ((1, PLAN[d]), (2, PLAN[d]), (0, DRILL_ONLY[d])):
            if got[t] != want:
                errors.append(f"{d}: test {t} has {got[t]} items, want {want}")
        for i, q in enumerate(src):
            q["domain"] = d
            stems[q["stem"]] += 1
            errors += check(q, f"{d}[{i}] {q['stem'][:50]!r}")
        items[d] = src
    errors += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(PLAN):
            mine = [q for q in items[d] if q["test"] == test]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(blocks, 1):
            q = arrange(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                    "skill": q["skill"], "stem": q["stem"], "options": q["options"],
                    "correct": q["correct"], "explanation": q["explanation"]}
            if q.get("lockedOrder"):
                item["lockedOrder"] = True
            out.append(item)
    singles = [q for q in out if not q.get("lockedOrder")]
    pos = Counter(q["correct"][0] for q in out)
    longest = [q for q in singles if all(len(q["options"][q["correct"][0]]) > len(o)
                                         for i, o in enumerate(q["options"]) if i != q["correct"][0])]
    print(f"{EXAM}: {len(out)} questions; key positions {dict(sorted(pos.items()))}")
    print(f"  key strictly longest: {len(longest)}/{len(singles)} = {100 * len(longest) / max(1, len(singles)):.1f}%")
    for d in PLAN:
        lg = [q["id"] for q in longest if q["domain"] == d]
        if lg:
            print(f"    {d}: {len(lg)} longest: {' '.join(lg)}")
    for e in errors:
        print("  ERROR", e)
    if errors:
        sys.exit(1)
    if "--check" in sys.argv:
        return
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"  wrote {os.path.relpath(dst, ROOT)}")


if __name__ == "__main__":
    main()
