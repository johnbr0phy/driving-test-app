"""Build data/red-seal-cook-questions.json from q_*.py. Usage: python3 -I build.py [out]

One file per Major Work Activity of the 2020 Red Seal Occupational Standard for Cook, in RSOS
order. Each item is (question, key, [three wrong options], explanation); the key goes into slot
i % 4 so every letter is keyed 25% of the time. Computed keys are rechecked below.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["safety", "skills", "produce", "stocks", "sauces", "dairy", "pasta", "grains",
         "meats", "fish", "salads", "specialty", "baking"]
POOLS = {"safety": 20, "skills": 16, "produce": 16, "stocks": 16, "sauces": 16, "dairy": 12,
         "pasta": 12, "grains": 16, "meats": 20, "fish": 20, "salads": 12, "specialty": 12,
         "baking": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "red-seal-cook-questions.json")

# Recompute every calculated key (B-5 and B-7 costing and recipe math).
assert round(3.60 / 0.30, 2) == 12.00          # menu price at 30% food cost
assert 100 / 40 == 2.5                          # recipe conversion factor
assert round(6 / 0.75, 2) == 8.0                # as-purchased weight from 75% yield
assert 3 * 5 == 15                              # dried herb about one third of fresh

rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CACOOK", "state": "ALL", "questionId": f"CACOOK-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
    print(m, len(mod.Q))
assert len(rows) == 200
json.dump(rows, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(out, "a").write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
