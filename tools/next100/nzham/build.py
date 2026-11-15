"""Build data/nz-amateur-radio-questions.json from q_*.py. Usage: python3 -I build.py [out]

Every calculated key is computed in its q_*.py file and asserted there; the build only
places the key in a rotating slot (A, B, C, D per segment) so each letter lands at 25%.
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["regs", "ops", "fund", "comp", "psu", "rx", "tx", "ant", "prop", "emc"]
POOLS = {"nzhamRegs": 32, "nzhamOperating": 16, "nzhamFundamentals": 32, "nzhamComponents": 20,
         "nzhamSafetyPower": 16, "nzhamReceivers": 20, "nzhamTransmitters": 16, "nzhamAntennas": 20,
         "nzhamPropagation": 16, "nzhamInterference": 12}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "nz-amateur-radio-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (m, len(mod.Q), POOLS[mod.CAT])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NZHAM", "state": "ALL", "questionId": f"NZHAM-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200, len(rows)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
