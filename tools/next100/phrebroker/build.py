"""Build data/philippines-re-broker-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["own", "eth", "rsa", "law", "sub", "con", "sml", "doc", "brk", "fin", "urb", "pln", "eco", "apr"]
POOLS = {"own": 16, "eth": 12, "rsa": 12, "law": 12, "sub": 12, "con": 12, "sml": 12, "doc": 12,
         "brk": 20, "fin": 16, "urb": 16, "pln": 16, "eco": 16, "apr": 16}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "philippines-re-broker-questions.json")
rows = []
longest = 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        if all(len(key) > len(w) for w in wrong):
            longest += 1
        rows.append({"type": "PHREB", "state": "ALL", "questionId": f"PHREB-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, "| key strictly longest:", longest, f"({longest/len(rows):.0%})")
