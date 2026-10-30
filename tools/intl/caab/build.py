import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from questions import CATEGORIES, Q
OUT = "/home/user/driving-test-app/data/alberta-class-7-questions.json"
rows = []
for key, label, per, seg in CATEGORIES:
    items = Q[key]
    assert len(items) == per * 4, (key, len(items), per * 4)
    for i, (stem, ans, ds, expl) in enumerate(items):
        assert len(ds) == 3
        slot = i % 4
        opts = list(ds)
        opts.insert(slot, ans)
        letter = "ABCD"[slot]
        rows.append({
            "type": "CAAB", "state": "ALL",
            "questionId": f"CAAB-{seg}-{i+1:03d}", "category": key,
            "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": letter, "correctIndex": slot, "explanation": expl,
        })
json.dump(rows, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(OUT, "a").write("\n")
print(len(rows))
