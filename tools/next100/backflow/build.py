"""Build data/backflow-questions.json from q_*.py. Usage: python3 -I build.py [out]

Backflow Prevention Assembly Tester practice bank (ASSE 5110 written exam), exam id `backflow`.
Every item is original, written from ASSE's tester course objectives, ASSE's field test flow
charts and report forms, the EPA Cross-Connection Control Manual and 40 CFR 141/143 and
29 CFR 1910.146 (see sources.md). Keys are written first; the build places each key in a
seeded, balanced slot so every letter lands at exactly 25% per category.
"""
import importlib.util, json, sys, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("intro", 24), ("prog", 28), ("hyd", 28), ("dev", 40), ("kit", 16), ("test", 40), ("trbl", 24)]
PER_TEST = [6, 7, 7, 10, 4, 10, 6]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "backflow-questions.json")

# Computed keys, rechecked here.
assert round(50 + 14.7, 1) == 64.7 and round(-5.0 + 14.7, 1) == 9.7
assert round(1 / 0.433, 2) == 2.31 and round(100 * 0.433, 1) == 43.3
assert round(46.2 * 0.433, 1) == 20.0 and round(20 + 43.3, 1) == 63.3 and round(33.3 - 43.3, 1) == -10.0
assert 2 * 2 == 4 and max(2 * 3 / 8, 1) == 1
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    slots = [j % 4 for j in range(n)]
    random.Random("backflow-" + mod.SEG).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "BACKFLOW", "state": "ALL", "questionId": f"BACKFLOW-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
