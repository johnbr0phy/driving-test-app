"""Build data/philippines-midwife-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each q_*.py holds CAT, SEG and Q, a list of (stem, key, [3 wrong], explanation). The key is
authored first; it is placed at position i % 4 so letters rotate A, B, C, D within a segment.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["obstetrics", "fundamentals", "infant", "phc", "professional"]
POOLS = {"obstetrics": 40, "fundamentals": 40, "infant": 40, "phc": 40, "professional": 40}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "philippines-midwife-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "PHMIDWIFE", "state": "ALL", "questionId": f"PHMW-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
