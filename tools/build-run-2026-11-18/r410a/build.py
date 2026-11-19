"""Build data/r410a-questions.json from q_*.py. Usage: python3 -I build.py [out]

ESCO Institute R-410A Safety Certification (AC&R Safety Coalition exam) practice bank, exam id
`r410a`. Every item is original, written from ESCO's program pages and pressure-temperature
chart, 40 CFR 82 and 84, DOT 49 CFR, OSHA 29 CFR, the R-410A SDS and Carrier's R-410A
installation guide (see sources.md). Keys are written first; build.py places each key in a
seeded, balanced slot so every letter lands at exactly 25% per category.
"""
import importlib.util, json, sys, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("safety", 36), ("cylinders", 24), ("props", 40), ("oil", 20),
         ("retrofit", 12), ("regs", 40), ("service", 28)]
PER_TEST = [9, 6, 10, 5, 3, 10, 7]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "r410a-questions.json")

# Computed keys, rechecked here.
PT = {0: 48, 35: 107, 40: 118, 45: 130, 50: 143, 60: 170, 70: 201, 80: 238, 100: 318,
      104: 336, 110: 365, 115: 391, 120: 418}          # ESCO chart, R-410A psig
assert round(0.5 * 675 + 0.5 * 3500) == 2088          # blend GWP
assert round(336 / 208 - 1, 2) == 0.62                  # about 60 percent higher than R-22
assert round(118 - 68.6, 1) == 49.4                     # 40 F difference vs R-22
assert round(336 + 14.7, 1) == 350.7 and 170 <= 350.7 <= 355   # psia, EPA high-pressure band
assert round(80.2 - 63.2, 1) == 17.0 and round(112.0 - 107.0, 1) == 5.0   # bubble-dew spreads
assert 56 - 45 == 11 and 120 - 107 == 13 and 110 - 85 == 25 and 50 - 40 == 10
assert PT[45] == 130 and PT[50] == 143 and PT[104] == 336 and PT[100] == 318 and PT[0] == 48
assert PT[70] == 201 and PT[80] == 238 and PT[115] == 391 and PT[35] == 107 and PT[120] == 418
assert 2088 - 675 == 1413
assert round(1 / (0.5 / 52.02 + 0.5 / 120.02), 1) == 72.6   # blend molar mass vs air 29
assert round(31.5 - 6.5, 1) == 25.0 and round(18.2 - 15.7, 1) == 2.5 and 1 + 8 / 16 == 1.5
assert round((40 - 15) * 0.6, 1) == 15.0 and round((15 - 10) * 0.6, 1) == 3.0
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    # Balanced, seeded key slots: each letter n/4 times per category, order shuffled by a fixed seed.
    slots = [j % 4 for j in range(n)]
    random.Random("r410a-" + mod.SEG).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "R410A", "state": "ALL", "questionId": f"R410A-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
