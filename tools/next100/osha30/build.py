"""Build data/osha30-questions.json from q_*.py. Usage: python3 -I build.py [out]

OSHA 30-hour Construction Outreach course final practice bank, exam id `osha30`. Every item is
original, written from OSHA's Outreach Training Program Construction Industry Procedures (2024)
topic list and the 29 CFR 1926, 1904 and 1910 text on osha.gov (see sources.md).
Keys are written first; each category gets a seeded, balanced shuffle of key slots, so every letter
lands at exactly 25% with no rotation pattern in ID order.
"""
import importlib.util, json, sys, os, math
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# OTP 30-hour construction topic order; per-test counts are Tigertest's split (no official weights).
ORDER = [("intro", 24), ("falls", 32), ("scaffold", 20), ("electrical", 20), ("excavation", 16),
         ("cranes", 20), ("concrete", 16), ("health", 20), ("ppe", 16), ("fire", 16)]
PER_TEST = [6, 8, 5, 5, 4, 5, 4, 5, 4, 4]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "osha30-questions.json")
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

# Worked numbers in the bank
assert round(4000 / (2 * math.sin(math.radians(30)))) == 4000          # CRN sling tension
assert 5 < 8 <= 10                                                     # FAL net 8 ft below -> 10 ft band
assert 90 + 5 == 95 and 95 + 5 == 100                                  # HLT noise table steps (8h, 4h, 2h)

import random, zlib
rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    slots = [s for s in range(4) for _ in range(n // 4)]
    random.Random(zlib.crc32(("O30" + mod.SEG).encode())).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "OSHA30", "state": "ALL", "questionId": f"O30-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
