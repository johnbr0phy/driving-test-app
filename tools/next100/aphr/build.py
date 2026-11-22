"""Build data/aphr-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["tal", "lrn", "cmp", "rel", "cmr"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "aphr-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    # Key letters: balanced within each category, in a seeded order rather than a fixed A-B-C-D cycle.
    pos = [j % 4 for j in range(len(mod.Q))]
    random.Random("aphr-" + m).shuffle(pos)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        k = pos[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "APHR", "state": "ALL", "questionId": f"APHR-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
