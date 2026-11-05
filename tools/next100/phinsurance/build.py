"""Build data/philippines-insurance-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["prn", "con", "llw", "prd", "val", "und", "agt", "reg"]
POOLS = {"prn": 20, "con": 32, "llw": 32, "prd": 32, "val": 24, "und": 20, "agt": 24, "reg": 16}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "philippines-insurance-questions.json")
rows = []
longest = 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert "—" not in q + key + "".join(wrong) + expl, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        if len(key) > max(len(w) for w in wrong):
            longest += 1
        rows.append({"type": "PHINS", "state": "ALL", "questionId": f"PHINS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
print(f"key strictly longest: {longest}/{len(rows)} = {100*longest/len(rows):.1f}%")
