"""Build data/bc-real-estate-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source row is (stem, key, [three wrong options], explanation), key written first.
The key's slot rotates A, B, C, D within each segment so every letter lands at 25%.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["lic", "dut", "con", "tru", "lnd", "str", "fin", "val"]
POOLS = {"lic": 24, "dut": 32, "con": 24, "tru": 20, "lnd": 28, "str": 28, "fin": 24, "val": 20}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "bc-real-estate-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q), POOLS[m])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "BCRE", "state": "ALL", "questionId": f"BCRE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
