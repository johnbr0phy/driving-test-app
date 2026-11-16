"""Build data/nz-real-estate-questions.json from q_*.py. Usage: python3 -I build.py [out] [--partial]"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["lic", "con", "dis", "agy", "dsc", "tru", "spa", "ten", "cnl", "law", "mkt"]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
partial = "--partial" in sys.argv
out = args[0] if args else os.path.join(ROOT, "data", "nz-real-estate-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    if partial and not os.path.exists(p):
        continue
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NZRE", "state": "ALL", "questionId": f"NZRE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
