"""Build data/cfa-level-1-questions.json from q_*.py. Usage: python3 -I build.py [out]
Items are (stem, key, [three wrong options], explanation), key written first; the build
rotates the key through A, B, C, D within each category (the app shuffles options anyway)."""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["eth", "qnt", "eco", "fsa", "crp", "eqt", "fix", "der", "alt", "prt"]
POOLS = {"eth": 24, "qnt": 24, "eco": 16, "fsa": 24, "crp": 16, "eqt": 24, "fix": 24, "der": 16, "alt": 16, "prt": 16}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cfa-level-1-questions.json")
partial = os.environ.get("PARTIAL") == "1"
sys.dont_write_bytecode = True
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    if partial and not os.path.exists(p):
        continue
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert partial or len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CFAL1", "state": "ALL", "questionId": f"CFAL1-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
