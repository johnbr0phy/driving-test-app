"""Build data/hk-nursing-licensing-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (question, key, [three wrong options], explanation), key written first.
The key is placed at index i % 4 so every letter lands at 25% within each category."""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["psy", "law", "bas", "car", "dig", "neu", "per", "lif", "fa", "ana", "nut", "pub", "mic", "pha"]
POOLS = {"psy": 12, "law": 12, "bas": 28, "car": 16, "dig": 16, "neu": 16, "per": 12, "lif": 16, "fa": 12,
         "ana": 16, "nut": 8, "pub": 12, "mic": 12, "pha": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "hk-nursing-licensing-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "HKNURSE", "state": "ALL", "questionId": f"HKNURSE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200, len(rows)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
