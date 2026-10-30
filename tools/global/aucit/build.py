"""Build data/aucit-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each file is written by topic. Before IDs are assigned the items are interleaved
(sorted by (i % k, i), k = ceil(n / PER_TEST)) so every 20-question practice test
takes a spread of topics from each part rather than one run of capitals or flags.
The key goes in slot i % 4 of the final order, so letters rotate A, B, C, D per segment.
"""
import importlib.util, json, math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["people", "democracy", "gov", "values"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "aucit-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    n = len(mod.Q); k = math.ceil(n / mod.PER_TEST)
    order = sorted(range(n), key=lambda i: (i % k, i))
    for j, src in enumerate(order):
        q, key, wrong, expl = mod.Q[src]
        assert len(wrong) == 3, (m, src)
        slot = j % 4
        opts = list(wrong); opts.insert(slot, key)
        rows.append({"type": "AUCIT", "state": "ALL", "questionId": f"AUCIT-{mod.SEG}-{j+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[slot], "correctIndex": slot, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
