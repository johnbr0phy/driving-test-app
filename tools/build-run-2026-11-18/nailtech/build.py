"""Build data/nail-technician-questions.json from q_*.py. Usage: python3 -I build.py [out]

NIC National Nail Technology Theory Examination practice bank (exam id `nailtech`). Every item
is original, written from the NIC content outline (bulletin effective September 1, 2025, revised
March 1, 2026) and the sources in sources.md. Keys are written first; the key moves to slot i % 4
so each letter lands at exactly 25%.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("infection", 32), ("structure", 16), ("disorders", 16), ("chemistry", 20),
         ("consult", 16), ("tools", 24), ("manipedi", 36), ("enhance", 40)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "nail-technician-questions.json")
rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NAILTECH", "state": "ALL", "questionId": f"NAIL-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
# Computed keys, rechecked: 14 phalanges per hand (4 fingers x 3 + thumb x 2); 27 hand bones (8+5+14).
assert 4 * 3 + 2 == 14 and 8 + 5 + 14 == 27
# Per-test blueprint 8/4/4/5/4/6/9/10 = 50; pools are 4x per test.
assert sum([8, 4, 4, 5, 4, 6, 9, 10]) == 50 and [n for _, n in ORDER] == [4 * x for x in [8, 4, 4, 5, 4, 6, 9, 10]]
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
