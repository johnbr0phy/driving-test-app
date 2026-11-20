#!/usr/bin/env python3
"""Build data/ham-general-questions.json from the official NCVEC General pool.

    python3 -I tools/next100/hamgeneral/build.py

pool.json is the 2023-2027 General class (Element 3) pool with the 6th errata (Feb 4 2026),
parsed from NCVEC's public-release docx; its stems, options and keys are used as published.
expl/out_*.json hold Tigertest's original explanations. The five G7A items that need the
G7-1 schematic are left out. Ids are interleaved round-robin across the groups of each
subelement, so practice test N (slice N of each subelement in id order) draws one question
from every group, like the real exam.
"""
import json, pathlib
from collections import defaultdict
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent.parent
FIGURE = {"G7A09", "G7A10", "G7A11", "G7A12", "G7A13"}
SUBS = [  # subelement, category, questions per exam (one per group)
    ("G1", "hamgRules", 5), ("G2", "hamgOperating", 5), ("G3", "hamgPropagation", 3),
    ("G4", "hamgPractices", 5), ("G5", "hamgElectrical", 3), ("G6", "hamgComponents", 2),
    ("G7", "hamgCircuits", 3), ("G8", "hamgSignals", 3), ("G9", "hamgAntennas", 4),
    ("G0", "hamgSafety", 2),
]
pool = json.load(open(HERE / "pool.json", encoding="utf-8"))["qs"]
expl = {}
for p in sorted((HERE / "expl").glob("out_?.json")):
    expl.update(json.load(open(p, encoding="utf-8")))
def stem(t):
    # One pool stem ends inside its quotes ("sends “QRS?”"); move the question mark out so
    # the stem ends with one, as every bank's stems do. Wording is otherwise unchanged.
    return t[:-2] + "”?" if t.endswith("?”") else t


rows = []
for sub, cat, per in SUBS:
    groups = defaultdict(list)
    for q in pool:
        if q["id"][:2] == sub and q["id"] not in FIGURE:
            groups[q["id"][:3]].append(q)
    assert len(groups) == per, (sub, sorted(groups))
    order = []
    rnd = 0
    while any(len(g) > rnd for g in groups.values()):
        for gk in sorted(groups):
            if len(groups[gk]) > rnd:
                order.append(groups[gk][rnd])
        rnd += 1
    for n, q in enumerate(order, 1):
        k = "ABCD".index(q["key"])
        rows.append({
            "type": "HAMG", "state": "ALL", "questionId": f"HAMG-{sub}-{n:03d}",
            "category": cat, "question": stem(q["stem"]),
            "optionA": q["opts"][0], "optionB": q["opts"][1], "optionC": q["opts"][2], "optionD": q["opts"][3],
            "correctAnswer": q["key"], "correctIndex": k,
            "explanation": expl[q["id"]],
        })
out = ROOT / "data" / "ham-general-questions.json"
out.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(len(rows), "rows ->", out)
