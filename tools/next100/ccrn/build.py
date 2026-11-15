"""Build data/ccrn-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each q_*.py holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The options are shuffled by a seed taken from the stem, so the key letter has no pattern. Write the key first and short, then three wrong options of the same shape.
"""
import hashlib, importlib.util, json, random, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["cardio", "resp", "endoheme", "girenal", "neuro", "psych", "multi", "prof"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "ccrn-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    if not os.path.exists(p):
        continue
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        opts = [key] + list(wrong)
        random.Random(int(hashlib.sha256(q.encode("utf-8")).hexdigest()[:16], 16)).shuffle(opts)
        k = opts.index(key)
        rows.append({"type": "CCRN", "state": "ALL", "questionId": f"CCRN-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
