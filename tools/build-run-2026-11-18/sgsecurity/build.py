"""Build data/singapore-security-officer-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["law", "grd", "eqp", "pat", "crm", "ter", "fir", "aid"]
POOLS = {"law": 24, "grd": 28, "eqp": 20, "pat": 28, "crm": 24, "ter": 32, "fir": 24, "aid": 20}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "singapore-security-officer-questions.json")
sys.dont_write_bytecode = True
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q), POOLS[m])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "SGSECURITY", "state": "ALL", "questionId": f"SGSEC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
