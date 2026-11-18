"""Build data/canada-drone-basic-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first and placed in slot i % 4, so each letter lands on about 25%.
Five real-length tests of 35 (5x each per-test count) plus 25 training-only spares at the
end of the pools. Computed keys are asserted below.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("law", 28), ("rules", 32), ("air", 28), ("sys", 24), ("hum", 24), ("wx", 24), ("nav", 18), ("fop", 22)]

# Computed keys
assert round(920 * 14.8) == 13616              # SYS: max RPM = Kv x battery voltage
assert round(920 * 11.1) == 10212 and round(920 * 22.2) == 20424 and round(920 * 3.7) == 3404
assert (18 - 7) == 11                          # NAV: 1800Z in PDT (UTC-7) is 1100
assert 4 + 12 == 16                            # NAV: 4:15 p.m. is 1615
assert 4 * 50000 / 100 == 2000                 # NAV: 4 cm at 1:50 000 is 2,000 m
assert 3600 + 400 == 4000                      # NAV: launch elevation + height above launch
import math
assert round(1 / math.cos(math.radians(45)), 1) == 1.4 and round(1 / math.cos(math.radians(60)), 6) == 2   # FLT: load factor at 45 and 60 degrees bank

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "canada-drone-basic-questions.json")
rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CADRONE", "state": "ALL", "questionId": f"CADRONE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
