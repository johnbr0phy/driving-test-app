"""Build data/cpa-isc-questions.json from q_*.py (CPA ISC). Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation[, value]).
The key is authored first; it is placed in slot i % 4 so each letter lands on 25%.
When a fifth element is given it is the value the key must state, computed in the source as a
Python expression from the numbers in the stem. The build checks it against the first number in
the key text, and checks that the key's number also appears in the explanation, so a typo in a
stem, key or explanation fails the build.
"""
import importlib.util, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["inf", "ais", "avl", "chg", "dat", "frm", "thr", "mit", "cnf", "inc", "spl", "srp"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cpa-isc-questions.json")
NUM = re.compile(r"-?\$?(\d[\d,]*(?:\.\d+)?)")

def first_num(s):
    m = NUM.search(s)
    return float(m.group(1).replace(",", "")) if m else None

def nums(s):
    return {float(m.group(1).replace(",", "")) for m in NUM.finditer(s)}

rows = []; checked = 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, item in enumerate(mod.Q):
        q, key, wrong, expl = item[:4]
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        if len(item) == 5:
            v = item[4]
            got = first_num(key)
            assert got is not None and abs(got - v) < 0.006, (m, i + 1, key, v)
            assert got in nums(expl), (m, i + 1, "key value missing from explanation", key)
            checked += 1
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CPAISC", "state": "ALL", "questionId": f"CPAISC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})

POOLS = {"cpaiscInfra": 16, "cpaiscAis": 16, "cpaiscAvail": 16, "cpaiscChange": 16, "cpaiscData": 16,
         "cpaiscFrameworks": 20, "cpaiscThreats": 16, "cpaiscMitigation": 20, "cpaiscPrivacy": 12,
         "cpaiscIncident": 12, "cpaiscSocPlan": 20, "cpaiscSocReport": 20}
for c, n in POOLS.items():
    got = sum(1 for r in rows if r["category"] == c)
    assert got == n, (c, got, n)

with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, "| checked", checked, "computed keys")
