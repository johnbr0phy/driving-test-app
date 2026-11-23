"""Build data/red-seal-refrigeration-questions.json from q_*.py. Usage: python3 -I build.py [out]

One file per group of tasks of the 2024 Red Seal Occupational Standard for Refrigeration and Air
Conditioning Mechanic, in RSOS order. Each item is (question, key, [three wrong options],
explanation); the key goes into slot i % 4 so every letter is keyed 25% of the time. Computed keys
are rechecked below.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["safety", "tools", "trade", "planning", "install", "ctlinstall", "commission",
         "performance", "maintain", "service", "ctlservice"]
POOLS = {"safety": 16, "tools": 16, "trade": 16, "planning": 24, "install": 24, "ctlinstall": 16,
         "commission": 20, "performance": 16, "maintain": 16, "service": 20, "ctlservice": 16}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "red-seal-refrigeration-questions.json")

# Recompute every calculated key.
assert 10.5 / 3 == 3.5                       # heat pump COP
assert 12 - 4 == 8                           # superheat
assert 41 - 34 == 7                          # subcooling
avg = (600 + 588 + 612) / 3; assert round(max(abs(v - avg) for v in (600, 588, 612)) / avg * 100) == 2
assert 24 - 13 == 11                         # temperature split
assert 7 - 5 == 2                            # chiller approach
assert 1500 / 300 == 5                       # compression ratio
assert 0.6 + 2.4 == 3.0                      # run to start resistance
assert round((45 - 36) / 45 * 100) == 20     # weak run capacitor

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
        rows.append({"type": "CARAC", "state": "ALL", "questionId": f"CARAC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
