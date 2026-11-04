"""Build data/cisa-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds Q = [(stem, key, [three wrong options], explanation), ...] with the key written
first; the key is placed at slot i % 4 so every letter lands at 25%.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["aud", "gov", "acq", "ops", "pro"]
POOLS = {"aud": 36, "gov": 36, "acq": 24, "ops": 52, "pro": 52}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cisa-questions.json")
only = sys.argv[2].split(",") if len(sys.argv) > 2 else ORDER
rows = []
for m in only:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    if len(only) == len(ORDER):
        assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CISA", "state": "ALL", "questionId": f"CISA-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
