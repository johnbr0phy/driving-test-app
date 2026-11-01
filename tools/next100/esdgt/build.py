"""Build data/spain-dgt-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (stem, key, [3 wrong], explanation), key written first. The key goes to slot
i % 4 so letters rotate A, B, C, D. Items whose four options are all numbers (same unit) are
sorted ascending instead, so the options read in a natural order, and the key's letter is found
after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("licence", 20), ("signs", 33), ("markings", 20), ("priority", 27), ("speed", 27),
         ("overtaking", 20), ("parking", 14), ("lights", 20), ("safety", 19)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "spain-dgt-questions.json")
NUM = re.compile(r"^(\d[\d,]*(?:\.\d+)?)\s*(\S*)$")

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    units = {p.group(2) for p in parts}
    if len(units) != 1:
        return None
    return [float(p.group(1).replace(",", "")) for p in parts]

rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "dup")
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ESDGT", "state": "ALL", "questionId": f"ESDGT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
