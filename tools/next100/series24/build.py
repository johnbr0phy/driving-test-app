"""Build data/series-24-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, random, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["reg", "sup", "con", "dis", "fin", "acc", "com", "sal", "trd", "stl", "off", "res"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "series-24-questions.json")
rows = []
mods = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    mods.append(mod)
# Seeded balanced key positions: each letter keys exactly a quarter of the bank, no fixed cycle.
total = sum(len(mod.Q) for mod in mods)
assert total % 4 == 0, total
POS = [0, 1, 2, 3] * (total // 4)
random.Random(24).shuffle(POS)
n = 0
for mod in mods:
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (mod.SEG, i)
        k = POS[n]; n += 1
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "SERIES24", "state": "ALL", "questionId": f"SERIES24-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
