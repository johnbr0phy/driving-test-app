"""Build data/corrections-officer-questions.json from q_*.py (correctional officer entrance written exam).
Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first and placed in slot i % 4, so each letter lands near 25%.
An item with a fifth element "fixed" lists all four options in their natural order (numbers,
dates, durations ascending) with the key among them; its slot is wherever the key sits.
"""
import importlib.util, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["rules", "reading", "writing", "reasoning", "math", "spatial"]
POOLS = {"corrRules": 40, "corrReading": 32, "corrWriting": 40, "corrReasoning": 40,
         "corrMath": 24, "corrSpatial": 24}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "corrections-officer-questions.json")

rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, item in enumerate(mod.Q):
        q, key, opts, expl = item[:4]
        if len(item) == 5:
            assert item[4] == "fixed", (m, i + 1)
            assert len(opts) == 4 and opts.count(key) == 1, (m, i + 1, opts)
            opts = list(opts); k = opts.index(key)
        else:
            assert len(opts) == 3 and key not in opts, (m, i + 1)
            k = i % 4
            opts = list(opts); opts.insert(k, key)
        assert len(set(opts)) == 4, (m, i + 1, opts)
        assert "—" not in q + expl + "".join(opts), (m, i + 1, "em dash")
        rows.append({"type": "CORRECTIONS", "state": "ALL", "questionId": f"CORR-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})

for c, n in POOLS.items():
    got = sum(1 for r in rows if r["category"] == c)
    assert got == n, (c, got, n)

with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
