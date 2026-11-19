"""Build data/ctec-tax-preparer-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is written first. Items whose four options are all numbers are sorted ascending (the key
lands where its value falls); the other items get the key placed in a seeded, balanced slot so
each letter ends near 25% overall. Computed keys are asserted at the top of each source file.
"""
import importlib.util, json, os, random, re, sys
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["eth", "fil", "inc", "gns", "bus", "ded", "crd", "car", "cai", "cac"]
POOLS = {"eth": 16, "fil": 24, "inc": 28, "gns": 16, "bus": 20, "ded": 24, "crd": 24,
         "car": 16, "cai": 20, "cac": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "ctec-tax-preparer-questions.json")

NUM = re.compile(r"^\$?([0-9][0-9,]*(?:\.[0-9]+)?)( ?%)?$")
def numval(s):
    t = s.replace(" 1/2", ".5")
    m = NUM.match(t)
    return float(m.group(1).replace(",", "")) if m else None

items = []
for m in ORDER:
    spec = importlib.util.spec_from_file_location(m, os.path.join(HERE, "q_" + m + ".py"))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        assert "\u2014" not in q + key + expl + "".join(wrong), (m, i)
        items.append((mod, i, q, key, wrong, expl))

# numeric items first: sorted, fixed key position
pos = {}
counts = [0, 0, 0, 0]
for n, (mod, i, q, key, wrong, expl) in enumerate(items):
    vals = [numval(x) for x in [key] + wrong]
    if all(v is not None for v in vals):
        opts = sorted([key] + wrong, key=numval)
        pos[n] = opts
        counts[opts.index(key)] += 1
total = len(items)
need = [total // 4 - c for c in counts]
rest = [n for n in range(total) if n not in pos]
extra = len(rest) - sum(max(0, x) for x in need)
need = [max(0, x) for x in need]
k = 0
while extra > 0:
    need[k % 4] += 1; extra -= 1; k += 1
while sum(need) > len(rest):
    need[need.index(max(need))] -= 1
slots = [s for s in range(4) for _ in range(need[s])]
assert len(slots) == len(rest), (len(slots), len(rest))
random.Random(42900).shuffle(slots)
for n, s in zip(rest, slots):
    mod, i, q, key, wrong, expl = items[n]
    opts = list(wrong); opts.insert(s, key)
    pos[n] = opts

rows = []
for n, (mod, i, q, key, wrong, expl) in enumerate(items):
    opts = pos[n]; k = opts.index(key)
    rows.append({"type": "CTEC", "state": "ALL", "questionId": f"CTEC-{mod.SEG}-{i+1:03d}",
        "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
        "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
c = [sum(1 for r in rows if r["correctIndex"] == j) for j in range(4)]
print(len(rows), "rows ->", out, "letters", c, "numeric", sum(1 for n in range(total) if all(numval(x) is not None for x in [items[n][3]] + items[n][4])))
