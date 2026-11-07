"""Build data/romania-cpi-questions.json from q_*.py. Usage: python3 -I build.py [out] [--report]

Keys are written first in the sources; item i of each segment goes in slot i % 4, so A, B, C and D
each hold the key 25% of the time.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("eco", 20), ("tech", 24), ("loads", 24), ("passengers", 20), ("hours", 28),
         ("tacho", 20), ("rules", 20), ("safety", 24), ("emergency", 20)]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else os.path.join(ROOT, "data", "romania-cpi-questions.json")
rows = []
longest = 0
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location("rocpi_" + m, p)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        if len(key) > max(len(w) for w in wrong):
            longest += 1
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ROCPI", "state": "ALL", "questionId": f"ROCPI-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, f"| key strictly longest in {longest} ({longest/len(rows):.0%})")
