"""Build data/romania-taxi-attestation-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (question, key, [3 wrong], explanation). The key is placed at index i % 4,
so every letter is keyed about a quarter of the time. Prints the share of items whose key is
strictly the longest option.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("law", 28), ("drv", 28), ("veh", 20), ("mtr", 28), ("ren", 20), ("cus", 28), ("rod", 24), ("sec", 24)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "romania-taxi-attestation-questions.json")
rows, longest = [], 0
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "key repeated")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        if all(len(key) > len(w) for w in wrong):
            longest += 1
        rows.append({"type": "ROTAXI", "state": "ALL", "questionId": f"ROTAXI-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
print(f"key strictly longest: {longest}/{len(rows)} = {100*longest/len(rows):.1f}%")
