#!/usr/bin/env python3
"""Build data/v2/nclex/questions.json from per-domain source files.

Usage: python3 -I tools/build_nclex.py tools/nclex

Each source item has domain, test (1, 2 or 0), skill, difficulty, format,
optional passage, stem, options, correct, explanation. Ids are assigned here
so each practice test interleaves the eight Client Needs areas (the session
builder orders a test by id): NCLEX-T1-001.., NCLEX-T2-001.., NCLEX-D-001...
Ids follow source order, so append new items to a source file rather than
inserting them, or saved progress will point at different questions.
"""
import json, os, sys

DOMAINS = ["nclexCare", "nclexSafety", "nclexHealth", "nclexPsych", "nclexComfort", "nclexPharm", "nclexRisk", "nclexPhys"]
PREFIX = {1: "NCLEX-T1-", 2: "NCLEX-T2-", 0: "NCLEX-D-"}

src = sys.argv[1]
by_domain = {d: json.load(open(os.path.join(src, f"{d}.json"))) for d in DOMAINS}
out = []
for test in (1, 2, 0):
    slots = []
    for di, d in enumerate(DOMAINS):
        items = [q for q in by_domain[d] if q["test"] == test]
        for i, q in enumerate(items):
            slots.append(((i + 0.5) / len(items), di, q))
    slots.sort(key=lambda s: (s[0], s[1]))
    for n, (_, _, q) in enumerate(slots, 1):
        item = {"id": f"{PREFIX[test]}{n:03d}", "section": "nclex", "test": test, "module": 1, "domain": q["domain"],
                "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
        if q.get("passage"):
            item["passage"] = q["passage"]
        item.update({"stem": q["stem"], "options": q["options"], "correct": q["correct"], "explanation": q["explanation"]})
        out.append(item)
os.makedirs("data/v2/nclex", exist_ok=True)
with open("data/v2/nclex/questions.json", "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"wrote {len(out)} questions")
