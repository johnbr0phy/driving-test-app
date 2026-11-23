"""Build data/nz-first-aid-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first and placed in slot i % 4, so each letter lands on about 25%.
Four tests of 50 (4x each per-test count), no training-only spares.
"""
import importlib.util, json, sys, os, re
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("scn", 24), ("cpr", 32), ("air", 24), ("bld", 28), ("inj", 24), ("brn", 20), ("med", 32), ("env", 16)]

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "nz-first-aid-questions.json")
rows = []
num = re.compile(r"\d+(?:[.:]\d+)?")
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        # Key-order check: a key carrying a number must have that number in the explanation.
        for v in num.findall(key):
            assert v in expl, (m, i, key, v)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NZFIRSTAID", "state": "ALL", "questionId": f"NZFAID-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
