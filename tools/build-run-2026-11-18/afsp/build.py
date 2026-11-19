"""Build data/annual-federal-tax-refresher-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first; it is placed in a seeded, balanced slot (a shuffled list of\ntotal/4 per letter, seed 40400, every slot used once), so each letter lands on 25%.
Computed keys are recomputed and asserted at the top of each source file.
"""
import importlib.util, json, sys, os, random
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["adj", "ncr", "ndd", "fil", "inc", "sch", "itm", "crd", "gen", "sec", "pra"]
POOLS = {"adj": 12, "ncr": 12, "ndd": 32, "fil": 16, "inc": 24, "sch": 16, "itm": 12,
         "crd": 16, "gen": 20, "sec": 16, "pra": 24}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "annual-federal-tax-refresher-questions.json")
only = sys.argv[2:] if len(sys.argv) > 2 else None
total = sum(POOLS[m] for m in ORDER if not only or m in only)
assert total % 4 == 0, total
SLOTS = [k for k in range(4) for _ in range(total // 4)]
random.Random(40400).shuffle(SLOTS)
slot_i = 0
rows = []
for m in ORDER:
    if only and m not in only:
        continue
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = SLOTS[slot_i]; slot_i += 1
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "AFSP", "state": "ALL", "questionId": f"AFSP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert slot_i == len(SLOTS), (slot_i, len(SLOTS))
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
