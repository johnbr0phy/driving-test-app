"""Build data/oacp-certificate-questions.json from q_*.py. Usage: python3 -I build.py [out]
Each q_*.py holds CAT, SEG and Q = [(stem, key, [three wrong], explanation)]. The key goes to
slot A, B, C, D in rotation within each category, so every letter lands at 25%."""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["spelling", "vocab", "punct", "grammar", "policy", "report", "math"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "oacp-certificate-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert len({key, *wrong}) == 4, (m, i, "duplicate option")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "OACP", "state": "ALL", "questionId": f"OACP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
