"""Build data/cpa-far-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["stm", "nfp", "pub", "cur", "lla", "lia", "chg", "rev", "tax"]
POOLS = {"stm": 28, "nfp": 16, "pub": 24, "cur": 24, "lla": 28, "lia": 20, "chg": 20, "rev": 16, "tax": 24}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cpa-far-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong, (m, i)
        k = i % 4  # rotate the key A, B, C, D within each category
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CPAFAR", "state": "ALL", "questionId": f"CPAFAR-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
