"""Build data/canada-drone-advanced-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first and placed in slot i % 4, so each letter lands on about 25%.
Four real-length tests of 50 (4x each per-test count), no training-only spares.
Computed keys are asserted below.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("adv", 20), ("dec", 28), ("evl", 24), ("air", 32), ("rad", 20), ("wx", 28), ("ops", 24), ("sys", 24)]

# Computed keys
assert 40 + 30 == 70                         # EVL: sheltered beside a 40 m tower, 30 m above it
assert 3 / 2 == 1.5                          # WX: medium RPA, half the ground visibility
assert 10 * 6 == 60 and 5 * 6 == 30          # WX: GFA, 5 kt is 30 NM in 6 h, so 10 kt is 60 NM
assert 0.5 * 4 * 15 ** 2 == 450              # SYS: kinetic energy of 4 kg at 15 m/s
assert 700 < 0.5 * 20 * 10 ** 2 < 34000      # SYS: 20 kg at 10 m/s is 1,000 J, middle 922.07 band
assert 8 ** 4 == 4096                        # SYS: Mode A, four octal digits
assert 2 ** 2 == 4                           # SYS: energy at twice the speed

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "canada-drone-advanced-questions.json")
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
        rows.append({"type": "CADRONEADV", "state": "ALL", "questionId": f"CADRONEADV-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
