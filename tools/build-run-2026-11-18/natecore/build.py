"""Build data/nate-core-questions.json from q_*.py. Usage: python3 -I build.py [out]

NATE Core exam practice bank, exam id `natecore`. Every item is original, written from NATE's
Core exam KATE outline, OSHA and DOT rules, EPA, EIA, ENERGY STAR and ACCA pages, Copeland's
AE4-1331 bulletin and Fluke's capacitance guide (see sources.md), plus physics recomputed below.
Keys are written first; each category gets a seeded, balanced shuffle of key slots, so every letter
lands at exactly 25% with no rotation pattern in ID order.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# KATE order; per-test counts from the KATE weights (26/14/10/18/14/10/8 percent of 50).
ORDER = [("safety", 36), ("tools", 20), ("construction", 16), ("science", 20),
         ("comfort", 28), ("measure", 28), ("electric", 52)]
PER_TEST = [9, 5, 4, 5, 7, 7, 13]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "nate-core-questions.json")

def close(a, b, tol=0.01):
    assert abs(a - b) <= tol, (a, b)

# Weights: KATE percent of a 50-question test.
for pct, n in zip([18, 10, 8, 10, 14, 14, 26], PER_TEST):
    close(pct * 50 / 100, n, 0.01)
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

# Safety
assert 16 / 4 == 4                                  # ladder foot at one quarter of working length
# Tools
close(3 + 5 / 8, 3.625, 1e-9)
close(152 / 25.4, 6.0, 0.05)
assert 5.5 * 4 == 22
assert 12 - 1 / 16 <= 12 + 1 / 32 <= 12 + 1 / 16 and 12 + 3 / 32 > 12 + 1 / 16 and 12 + 1 / 8 > 12 + 1 / 16 and 11 + 7 / 8 < 12 - 1 / 16
assert 3 ** 2 + 4 ** 2 == 5 ** 2
# Science
assert 240 / 15 == 16 and 240 * 15 == 3600
close(24 / 60, 0.4, 1e-9)
assert 15 + 25 + 40 == 80
assert 30 * 60 / (30 + 60) == 20
assert 240 * 100 / 1000 == 24
close(120 + 14.7, 134.7, 1e-9)
close(14 * 8 / 144, 0.78, 0.005)
assert 12 * 15 * 8 == 1440 and 12 * 15 == 180
assert 4 * 12000 == 48000
close((55 - 32) * 5 / 9, 12.8, 0.05)
close(230 * 6 * 0.85, 1173, 0.01) ; assert 230 * 6 == 1380
assert 6 / 2 == 3
# Measurements
assert 40 * (110 - 60) == 2000
close(5 * 3412, 17060, 0.01)
assert 78 - 65 == 13 and 76 - 57 == 19
close(0.075 * 60 * 0.24, 1.08, 1e-9)
close(1.08 * 1200 * 20, 25920, 0.01)
close(54000 / (1.08 * 50), 1000, 0.01)
close(0.075 * 60, 4.5, 1e-9)
close(4.5 * 1000 * 8, 36000, 0.01)
# Electricity
close(1.8 + 4.6, 6.4, 1e-9)
lo, hi = 35 * 0.94, 35 * 1.06
assert not (lo <= 31.5 <= hi) and all(lo <= v <= hi for v in (33.5, 35.8, 36.9))
avg = (230 + 236 + 224) / 3; assert avg == 230
close(max(abs(v - avg) for v in (230, 236, 224)) / avg * 100, 2.6, 0.02)
close(208 * 0.9, 187, 0.21) ; close(230 * 1.1, 253, 0.01)
assert (6 - 2) / (10 - 2) == 0.5
assert 12 / 4 == 3
close(120 * 1.414, 170, 0.35)
close(40 / 24, 1.7, 0.04)

import random, zlib
rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    # Seeded, balanced key slots: each letter exactly n/4 times per category, order random.
    slots = [s for s in range(4) for _ in range(n // 4)]
    random.Random(zlib.crc32(mod.SEG.encode())).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NATECORE", "state": "ALL", "questionId": f"NATE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
