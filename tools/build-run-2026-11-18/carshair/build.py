"""Build data/red-seal-hairstylist-questions.json from q_*.py. Usage: python3 -I build.py [out]

One file per category, in Red Seal Occupational Standard (Hairstylist, 2019) order. Each item is
(question, key, [three wrong options], explanation); the key goes into slot i % 4 so every letter
is keyed 25% of the time. Computed keys are rechecked below.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["safety", "client", "scalp", "cut", "facial", "style", "wave", "relax",
         "colour", "lighten", "correct", "special", "salon"]
POOLS = {"safety": 12, "client": 12, "scalp": 20, "cut": 32, "facial": 8, "style": 28,
         "wave": 16, "relax": 12, "colour": 16, "lighten": 12, "correct": 12, "special": 8,
         "salon": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "red-seal-hairstylist-questions.json")

# Recompute every calculated key.
assert 30 * 0.3 == 9                         # 30 volume developer is 9% peroxide
assert (30 + 10) / 2 == 20                   # equal parts 30 vol + 10 vol
assert round(9.00 * 1.60, 2) == 14.40        # 60% markup on a $9.00 cost
assert round(9.00 / 0.60, 2) == 15.00        # the margin mistake offered as a distractor
assert round(1350 * 0.40, 2) == 540          # 40% commission on $1,350
assert round(1350 * 0.60, 2) == 810          # the salon's share, offered as a distractor
assert round(4 / 8 * 25.4) == 13             # number 4 guard = 4/8 inch, about 13 mm
assert round(40.00 * (1 - 0.15), 2) == 34.00  # 15% off a $40.00 service

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
        rows.append({"type": "CAHAIR", "state": "ALL", "questionId": f"CAHAIR-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
    print(m, len(mod.Q))
assert len(rows) == 200
json.dump(rows, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(out, "a").write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
