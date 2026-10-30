"""Build data/white-card-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each q_<name>.py holds CAT, SEG and Q, a list of (question, key, [3 wrong], explanation).
The key is inserted at index i % 4, so letters rotate A, B, C, D within every segment."""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["law", "risk", "heights", "plant", "health", "env", "signs", "emerg"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "white-card-questions.json")
spec = json.load(open(os.path.join(HERE, "spec.json")))
pools = {c["key"]: c["perTest"] * 4 for c in spec["categories"]}
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    s = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(s); s.loader.exec_module(mod)
    assert len(mod.Q) == pools[mod.CAT], (m, len(mod.Q), pools[mod.CAT])
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "AUWHITE", "state": "ALL", "questionId": f"AUWHITE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out)
