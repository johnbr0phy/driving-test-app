"""Build data/aafcs-hnfs-questions.json from q_*.py. Usage: python3 -I build.py [out]

AAFCS Hospitality, Nutrition, and Food Science (HNFS) exam. Every item is original, written from
the AAFCS HNFS exam specifications and the primary sources in sources.md. Keys are written first;
the key moves to slot i % 4 so each letter lands at exactly 25%.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("foundations", 28), ("careers", 20), ("nutrients", 28), ("diet", 28), ("foodsci", 24),
         ("safety", 32), ("prep", 20), ("ops", 20)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "aafcs-hnfs-questions.json")
rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "key repeated")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "AAFCS", "state": "ALL", "questionId": f"AAFCS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
