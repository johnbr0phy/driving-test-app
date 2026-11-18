"""Build data/canada-amateur-radio-basic-questions.json from q_*.py. Usage: python3 -I build.py [out]

Every calculated key is computed in its q_*.py file and asserted there; the build only
places the key in a rotating slot (A, B, C, D per segment) so each letter lands at 25%.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["regs", "bands", "ops", "stn", "psu", "cmp", "ele", "ant", "pro", "emc"]
POOLS = {"cahamRegs": 28, "cahamBands": 24, "cahamOperating": 16, "cahamStation": 28,
         "cahamPowerSafety": 16, "cahamComponents": 12, "cahamElectronics": 24,
         "cahamAntennas": 24, "cahamPropagation": 16, "cahamInterference": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "canada-amateur-radio-basic-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (m, len(mod.Q), POOLS[mod.CAT])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        assert "—" not in q + key + "".join(wrong) + expl, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CAHAM", "state": "ALL", "questionId": f"CAHAM-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200, len(rows)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
