"""Build data/uk-dsc1-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source row is (stem, key, [three wrong options], explanation), key written first.
The key's slot rotates A, B, C, D within each segment so every letter lands at 25%.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# module, per-test count
ORDER = [("bio", 8), ("idn", 6), ("law", 10), ("saf", 8), ("sht", 7), ("hyg", 11)]
assert sum(n for _, n in ORDER) == 50
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "uk-dsc1-questions.json")
rows = []
for m, per in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == per * 4, (m, len(mod.Q), per * 4)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(w.lower() for w in wrong + [key])) == 4, (m, i)
        for s in [q, expl, key] + wrong:
            assert "—" not in s and "–" not in s, s
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "UKDSC1", "state": "ALL", "questionId": f"UKDSC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
