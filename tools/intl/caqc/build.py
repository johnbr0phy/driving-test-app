#!/usr/bin/env python3
"""Build data/saaq-questions.json from src/*.py. Each src module has CATEGORY, SEGMENT, ITEMS.
An item is (question, key, wrong1, wrong2, wrong3, explanation). The key is placed at
position (n-1) % 4 within its segment (A, B, C, D, A, ...)."""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["licence", "rules", "signs", "signals", "rightofway", "sharing", "risk", "driving"]
rows = []
only = sys.argv[2:] if len(sys.argv) > 2 else ORDER
for name in ORDER:
    if name not in only: continue
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, "src", name + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for i, it in enumerate(m.ITEMS, 1):
        q, key, w1, w2, w3, ex = it
        pos = (i - 1) % 4
        opts = [w1, w2, w3]; opts.insert(pos, key)
        rows.append({
            "type": "CAQC", "state": "ALL",
            "questionId": f"CAQC-{m.SEGMENT}-{i:03d}", "category": m.CATEGORY,
            "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": ex,
        })
out = sys.argv[1]
json.dump(rows, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(out, "a").write("\n")
print(len(rows), "rows ->", out)
