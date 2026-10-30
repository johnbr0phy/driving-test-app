"""Build data/whmis-questions.json from src/*.py. Usage: python3 -I build.py [out] [mods...]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["basics", "hazards", "pictos", "labels", "sds", "safe"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "whmis-questions.json")
mods = sys.argv[2:] or ORDER
rows = []
for m in mods:
    p = os.path.join(HERE, "src", m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CAWHMIS", "state": "ALL", "questionId": f"CAWHMIS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
json.dump(rows, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(out, "a").write("\n")
print(len(rows), "rows ->", out)
