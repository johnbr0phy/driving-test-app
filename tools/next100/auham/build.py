"""Build data/au-amateur-radio-questions.json from q_*.py. Usage: python3 -I build.py [out]

Every calculated key is computed in its q_*.py file and asserted there; the build only
places the key in a rotating slot (A, B, C, D per segment) so each letter lands at 25%.
Options are never sorted, so a key's position comes only from the rotation (no key-order bug).
"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["reg", "tec", "trx", "ant", "pro", "emc", "saf"]
POOLS = {"auhamRegs": 56, "auhamTech": 32, "auhamTxRx": 24, "auhamAntennas": 32,
         "auhamPropagation": 16, "auhamInterference": 16, "auhamSafety": 24}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "au-amateur-radio-questions.json")
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
        rows.append({"type": "AUHAM", "state": "ALL", "questionId": f"AUHAM-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert len(rows) == 200, len(rows)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
