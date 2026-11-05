"""Build data/safe-pass-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["law", "acc", "risk", "elec", "exc", "hgt", "veh", "hlt", "ppe"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "safe-pass-questions.json")
sys.dont_write_bytecode = True
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "IESAFEPASS", "state": "ALL", "questionId": f"IESP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
longest = sum(1 for r in rows if len(r["option" + r["correctAnswer"]]) > max(len(r["option" + L]) for L in "ABCD" if L != r["correctAnswer"]))
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, f"key strictly longest: {longest} ({100*longest/len(rows):.1f}%)")
