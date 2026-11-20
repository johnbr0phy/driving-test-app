#!/usr/bin/env python3
"""Build data/ham-extra-questions.json from the official NCVEC 2024-2028 Extra class pool.

    python3 -I tools/next100/hamextra/build.py

pool.json is the public-domain Element 4 pool (4th errata, Feb 4 2026) parsed from the NCVEC
.docx; explanations.json holds Tigertest's own explanation per pool id. Questions that need a
pool figure are left out. Within each subelement the ids interleave across its groups
(E1A01, E1B01, ... E1F01, E1A02, ...), so test N, which takes slice N of each category in id
order, draws one question from each group like the real exam.
"""
import json, pathlib, re
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent.parent
CATS = [("E1", "hxRules"), ("E2", "hxOperating"), ("E3", "hxPropagation"), ("E4", "hxPractices"),
        ("E5", "hxElectrical"), ("E6", "hxComponents"), ("E7", "hxCircuits"), ("E8", "hxSignals"),
        ("E9", "hxAntennas"), ("E0", "hxSafety")]
pool = [q for q in json.load(open(HERE / "pool.json")) if not q["figure"]]
expl = json.load(open(HERE / "explanations.json"))
rows = []
for sub, cat in CATS:
    groups = {}
    for q in sorted((q for q in pool if q["id"].startswith(sub)), key=lambda q: q["id"]):
        groups.setdefault(q["id"][:3], []).append(q)
    order, i = [], 0
    while any(i < len(g) for g in groups.values()):
        for g in sorted(groups):
            if i < len(groups[g]):
                order.append(groups[g][i])
        i += 1
    for n, q in enumerate(order, 1):
        e = expl[q["id"]].strip()
        assert not re.search("[–—]", e), q["id"]
        rows.append({
            "type": "HAMEXTRA", "state": "ALL", "questionId": f"HAMX-{sub}-{n:03d}", "category": cat,
            "question": q["question"], "optionA": q["A"], "optionB": q["B"], "optionC": q["C"], "optionD": q["D"],
            "correctAnswer": q["key"], "correctIndex": "ABCD".index(q["key"]), "explanation": e,
        })
assert len(set(expl)) >= len(pool)
(ROOT / "data" / "ham-extra-questions.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n")
from collections import Counter
print(len(rows), dict(Counter(r["category"] for r in rows)))
