#!/usr/bin/env python3
"""Merge the per-domain sources into the bank, in spec order. Run from the repo root."""
import json

items = []
for seg in ["agt", "ccd", "prm", "tol", "ctx"]:
    with open(f"tools/next100/ccaf/{seg}.json") as f:
        items += json.load(f)
with open("data/claude-certified-architect-questions.json", "w") as f:
    json.dump(items, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(len(items), "questions")
