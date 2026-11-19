"""Build data/esthetician-questions.json from q_*.py. Usage: python3 -I build.py [out]

NIC National Esthetics Theory Examination practice bank (exam id `esthetician`). Every item
is original, written from the NIC content outline (bulletin effective September 1, 2025, revised
March 1, 2026) and the sources in sources.md. Keys are written first; each key goes to a seeded, balanced
slot (50 per letter).
"""
import importlib.util, json, sys, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("infection", 24), ("anatomy", 20), ("skin", 20), ("disorders", 24), ("hair", 8), ("chemistry", 12),
         ("consult", 20), ("facial", 28), ("electric", 12), ("makeup", 12), ("hairremoval", 12), ("body", 8)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "esthetician-questions.json")
rows = []
TOTAL = 200
SLOTS = [i % 4 for i in range(TOTAL)]
random.Random(40500).shuffle(SLOTS)  # seeded, 50 per letter
pos = 0
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = SLOTS[pos]; pos += 1
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ESTH", "state": "ALL", "questionId": f"ESTH-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
# No computed keys in this bank (numeric keys are sourced facts: SPF 15, 6 mm, 40 or 80 minutes).
# Per-test blueprint 6/5/5/6/2/3 (science 27) + 5/7/3/3/3/2 (services 23) = 50; pools are 4x per test.
BP = [6, 5, 5, 6, 2, 3, 5, 7, 3, 3, 3, 2]
assert sum(BP) == 50 and sum(BP[:6]) == 27 and [n for _, n in ORDER] == [4 * x for x in BP]
assert pos == TOTAL
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
