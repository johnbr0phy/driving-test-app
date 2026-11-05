"""Build data/nz-nursing-state-final-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (question, key, [three wrong options], explanation), key written first.
The key is placed at index i % 4 so every letter lands at 25% within each category."""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["tir", "law", "asm", "med", "acu", "ltc", "mha", "chw", "lds"]
POOLS = {"tir": 20, "law": 24, "asm": 24, "med": 28, "acu": 36, "ltc": 20, "mha": 16, "chw": 16, "lds": 16}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "nz-nursing-state-final-questions.json")
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
        rows.append({"type": "NZSFE", "state": "ALL", "questionId": f"NZSFE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
