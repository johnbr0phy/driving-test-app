"""Build data/nz-forklift-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first and placed in slot i % 4, so each letter lands on about 25%.
Four tests of 50 (4x each per-test count), no training-only spares.
"""
import importlib.util, json, sys, os, re
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("law", 24), ("road", 16), ("cap", 28), ("stab", 28), ("pre", 28), ("op", 36), ("site", 20), ("att", 20)]

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "nz-forklift-questions.json")
rows = []
num = re.compile(r"\d[\d,]*(?:\.\d+)?")
bad = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        # Key-order check: every number in the key must appear in the explanation, and no
        # explanation's worked result may differ from the key.
        for v in num.findall(key):
            if v not in expl:
                bad.append((m, i, "key number missing", key, v))
        # Where the explanation works a sum, the last result after "=" must be the key's number.
        res = re.findall(r"=\s*(\d[\d,]*(?:\.\d+)?)", expl)
        if res and num.findall(key) and res[-1] not in num.findall(key):
            bad.append((m, i, "explanation's result is not the key", key, res[-1]))
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NZFORKLIFT", "state": "ALL", "questionId": f"NZFORK-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
for b in bad:
    print("KEY CHECK:", b)
assert not bad, "key-order check failed"
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
