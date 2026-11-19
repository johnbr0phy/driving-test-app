"""Build data/pesticide-applicator-questions.json from q_*.py. Usage: python3 -I build.py [out]

Pesticide applicator core exam practice bank, exam id `pesticide`. Every item is original,
written from the federal certification standards (40 CFR 171.103, 171.105, 171.107, 171.201),
the label rules (40 CFR 156), the Worker Protection Standard (40 CFR 170), EPA pages and the
EPA-supported National Pesticide Applicator Certification Core Manual (see sources.md). Keys are
written first; the build places each key in a seeded, balanced slot so every letter lands at
exactly 25% per category.
"""
import importlib.util, json, sys, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("mgt", 24), ("law", 24), ("lbl", 28), ("frm", 20), ("haz", 24), ("ppe", 16), ("env", 24), ("sto", 16), ("app", 24)]
PER_TEST = [6, 6, 7, 5, 6, 4, 6, 4, 6]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "pesticide-applicator-questions.json")

# Computed keys in q_app.py, rechecked here.
assert 500 * 2 / 100 == 10 and 15 * 3.5 == 52.5 and 3 * 3.5 == 10.5 and 400 / 20 == 20
assert 5000 / 1000 * 2 == 10 and 8000 / 1000 * 0.5 == 4 and 1 / 0.50 == 2 and 1 / 4 * 4 == 1
assert 208.71 ** 2 > 43559 and 208.72 ** 2 > 43560 > 208.70 ** 2
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    slots = [j % 4 for j in range(n)]
    random.Random("pesticide-" + mod.SEG).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "PESTICIDE", "state": "ALL", "questionId": f"PESTICIDE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
