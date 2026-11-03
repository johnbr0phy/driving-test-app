"""Build data/aat-level-2-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["sys", "trn", "csh", "ctl", "jnl", "ccl", "cca", "bud", "law", "eco", "eth", "ent", "fin"]
POOLS = {"sys": 16, "trn": 20, "csh": 16, "ctl": 24, "jnl": 24, "ccl": 12, "cca": 16, "bud": 12,
         "law": 12, "eco": 12, "eth": 12, "ent": 12, "fin": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "aat-level-2-questions.json")
sys.dont_write_bytecode = True
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong, (m, i)
        k = i % 4  # rotate the key A, B, C, D within each category
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "AATL2", "state": "ALL", "questionId": f"AATL2-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
