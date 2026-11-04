"""Build data/acca-fa-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["ctx", "bkp", "inv", "nca", "acr", "cap", "rec", "fst", "con", "int"]
POOLS = {"ctx": 16, "bkp": 20, "inv": 16, "nca": 28, "acr": 24, "cap": 20, "rec": 24, "fst": 28, "con": 16, "int": 8}
sys.dont_write_bytecode = True
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "acca-fa-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location("accafa_" + m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i, key, wrong)
        assert "—" not in q + key + "".join(wrong) + expl, (m, i)
        k = i % 4  # rotate the key A, B, C, D within each category
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ACCAFA", "state": "ALL", "questionId": f"ACCAFA-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
