"""Build data/red-seal-carpenter-questions.json from src/*.py. Usage: python3 -I build.py [out] [mods...]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["common", "layout", "concrete", "framing", "exterior", "interior", "reno"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "red-seal-carpenter-questions.json")
mods = sys.argv[2:] or ORDER
rows = []
for m in mods:
    p = os.path.join(HERE, "src", m + ".py")
    if not os.path.exists(p):
        continue
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        assert len(set(opts)) == 4, (m, i, opts)
        rows.append({"type": "CACARP", "state": "ALL", "questionId": f"CACARP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
json.dump(rows, open(os.path.abspath(out), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(os.path.abspath(out), "a").write("\n")
print(len(rows), "rows ->", os.path.abspath(out))
