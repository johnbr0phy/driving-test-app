"""Build data/wa-firearms-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["lic", "hun", "eli", "cat", "sto", "con", "han", "fld"]
POOLS = {"lic": 25, "hun": 25, "eli": 25, "cat": 25, "sto": 30, "con": 25, "han": 25, "fld": 20}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "wa-firearms-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    if not os.path.exists(p):
        print("missing", p); continue
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    if len(mod.Q) != POOLS[m]:
        print("WARN", m, len(mod.Q), "!=", POOLS[m])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "AUFAWA", "state": "ALL", "questionId": f"AUFAWA-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
