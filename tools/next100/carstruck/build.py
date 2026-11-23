"""Build data/red-seal-truck-transport-questions.json from q_*.py. Usage: python3 -I build.py [out]

One file per Major Work Activity (block) of the Red Seal Occupational Standard for Truck and
Transport Mechanic, in RSOS order (A to K). Each item is (question, key, [three wrong options],
explanation); the key goes into slot i % 4 so every letter is keyed 25% of the time. Computed keys
are rechecked below.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["common", "engine", "air", "electrical", "drivetrain", "chassis", "cab", "trailer",
         "climate", "hydraulic", "hev"]
POOLS = {"common": 12, "engine": 32, "air": 24, "electrical": 32, "drivetrain": 24, "chassis": 28,
         "cab": 8, "trailer": 12, "climate": 12, "hydraulic": 12, "hev": 4}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "red-seal-truck-transport-questions.json")

# Recompute every calculated key.
assert 24 / 6 == 4                                   # Ohm's law, 4 A
assert 12 * 3 == 36                                  # watts
assert round(3.14 * 2 ** 2 * 2000) == 25120          # cylinder force, A x P
assert round(3.14 * 4 ** 2 * 2000) == 100480         # radius-for-diameter error

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
        rows.append({"type": "CATTM", "state": "ALL", "questionId": f"CATTM-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
