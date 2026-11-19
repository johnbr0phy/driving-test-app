"""Build data/bowhunter-questions.json from q_*.py. Usage: python3 -I build.py [out]

Bowhunter education practice bank, exam id `bowhunter`. Every item is original, written from the
IHEA-USA bowhunter education standards (hosted by NBEF) and the NBEF-approved course study guide
(see sources.md). Keys are written first; the build places each key in a seeded, balanced slot
so every letter lands at about 25% per category.
"""
import importlib.util, json, sys, os, random, math
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("eqp", 20), ("arw", 24), ("xbw", 16), ("saf", 20), ("std", 24), ("sht", 20), ("mth", 12), ("plc", 20), ("rec", 16), ("eth", 16), ("why", 12)]
PER_TEST = [5, 6, 4, 5, 6, 5, 3, 5, 4, 4, 3]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "bowhunter-questions.json")

# Computed keys, rechecked here.
assert 70 / 2.5 == 28 and 150 / 2 == 75 and 150 / 3 == 50
assert math.isclose(math.sqrt(13 ** 2 - 5 ** 2), 12)
assert round((1 - 24 / 160) * 100) == 85
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    slots = [j % 4 for j in range(n)]
    random.Random("bowhunter-" + mod.SEG).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "BOWHUNTER", "state": "ALL", "questionId": f"BOW-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
