"""Build data/cpc-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
FILES = ["found", "codesets", "surgery", "other"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cpc-questions.json")
rows = []
for m in FILES:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for cat, seg, items in mod.SECTIONS:
        for i, (q, key, wrong, expl) in enumerate(items):
            assert len(wrong) == 3, (cat, i)
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
            rows.append({"type": "CPC", "state": "ALL", "questionId": f"CPC-{seg}-{i+1:03d}",
                "category": cat, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
                "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
