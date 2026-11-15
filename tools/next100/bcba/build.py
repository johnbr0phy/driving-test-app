"""Build the bank from q_*.py using spec.json. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
spec = json.load(open(os.path.join(HERE, "spec.json"), encoding="utf-8"))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, spec["dataFile"])
rows = []
for cat in spec["categories"]:
    p = os.path.join(HERE, "q_" + cat["file"] + ".py")
    s = importlib.util.spec_from_file_location(cat["file"], p); mod = importlib.util.module_from_spec(s); s.loader.exec_module(mod)
    assert len(mod.Q) == cat["pool"], (cat["key"], len(mod.Q), cat["pool"])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (cat["key"], i)
        assert key not in wrong, (cat["key"], i)
        k = i % 4  # rotate the key letter A, B, C, D within each segment
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": spec["stateCode"], "state": "ALL",
            "questionId": f"{spec['prefix']}{cat['segment']}-{i+1:03d}",
            "category": cat["key"], "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
