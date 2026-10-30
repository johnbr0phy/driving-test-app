"""Build data/au-first-aid-questions.json from src/*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
SPEC = json.load(open(os.path.join(HERE, "spec.json")))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "au-first-aid-questions.json")
rows = []
for c in SPEC["categories"]:
    p = os.path.join(HERE, "src", c["module"] + ".py")
    spec = importlib.util.spec_from_file_location(c["module"], p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert mod.CAT == c["key"] and mod.SEG == c["segment"], c
    assert len(mod.Q) == 4 * c["perTest"], (c["key"], len(mod.Q), 4 * c["perTest"])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (c["key"], i)
        assert "—" not in q + key + "".join(wrong) + expl, (c["key"], i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "AUFIRSTAID", "state": "ALL", "questionId": f"AUFIRSTAID-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
json.dump(rows, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(out, "a").write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
