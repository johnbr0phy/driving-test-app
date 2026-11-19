"""Build data/ie-plumbing-phase2-questions.json from q_*.py. Usage: python3 -I build.py [out]

Ireland plumbing apprenticeship Phase 2 theory bank, exam id `ieplumbt2`. Every item is original,
written from SOLAS's Phase 2 module list, the Technical Guidance Documents, the DHLGH/SEAI heating
guide, the HSA and Uisce Éireann pages in sources.md. Keys are written first; the build places each
key in a seeded, balanced slot so every letter lands at about 25% per category.
"""
import importlib.util, json, sys, os, random, math
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("saf", 20), ("cop", 28), ("stl", 28), ("cld", 28), ("vlv", 16), ("hot", 28), ("htg", 36), ("com", 16)]
PER_TEST = [5, 7, 7, 7, 4, 7, 9, 4]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "ie-plumbing-phase2-questions.json")

assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    slots = [j % 4 for j in range(n)]
    random.Random("ieplumbt2-" + mod.SEG).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "IEPLUMBT2", "state": "ALL", "questionId": f"IEPT2-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
