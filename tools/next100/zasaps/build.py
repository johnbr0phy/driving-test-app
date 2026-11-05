"""Build data/saps-recruitment-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source file holds Q = [(stem, key, [three wrong options], explanation), ...] with the key
written first. Item i of a segment puts its key at slot i % 4 (A, B, C, D, A, ...), so every
letter lands at 25%; the app shuffles options per attempt anyway.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("grammar", 32), ("vocab", 24), ("reading", 32), ("number", 28), ("wordproblems", 28),
         ("data", 16), ("verbal", 20), ("logic", 20)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "saps-recruitment-questions.json")
rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "key repeated")
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ZASAPS", "state": "ALL", "questionId": f"ZASAPS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
