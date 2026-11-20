"""Build data/cemap-2-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# MRT1 (Mortgage Law, Practice and Application) then MRT2 (Mortgage Products and Post Completion)
ORDER = ["def", "bor", "mcb", "mkt", "adv", "sec", "fee", "sur", "val",
         "rai", "chg", "dcn", "arr", "rep", "prd", "sch"]
POOLS = {"def": 12, "bor": 12, "mcb": 16, "mkt": 12, "adv": 16, "sec": 8, "fee": 8, "sur": 16, "val": 12,
         "rai": 16, "chg": 16, "dcn": 8, "arr": 16, "rep": 12, "prd": 12, "sch": 8}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cemap-2-questions.json")
import re
def lean(o):
    # Options are bare noun phrases: drop a leading The/A/An (house style).
    m = re.match(r"^(The|A|An) (.+)$", o)
    if not m: return o
    rest = m.group(2)
    if re.match(r"^[A-Za-z-]+'s ", rest):  # keep "The borrower's ..." readable
        return o
    return rest[0].upper() + rest[1:]
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong, (m, i)
        k = i % 4  # rotate the key A, B, C, D within each category
        key = lean(key); wrong = [lean(w) for w in wrong]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CEMAP2", "state": "ALL", "questionId": f"CEMAP2-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
