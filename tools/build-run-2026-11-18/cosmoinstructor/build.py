"""Build data/cosmetology-instructor-questions.json from q_*.py. Usage: python3 -I build.py [out]

NIC National Instructor Theory Examination practice bank (exam id `cosmoinstructor`). Every item
is original, written from the NIC content outline (bulletin effective December 1, 2024, revised
January 1, 2026) and the federal sources in sources.md. Keys are written first; the key moves to
a seeded, balanced slot (a shuffled list of 50 per letter, seed 40800,
every slot used once), so each letter lands at exactly 25%.
"""
import importlib.util, json, sys, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# Instructional Planning 16, Instructional Methods 17, Theory and Practical Classroom 17 (33/33/34%).
ORDER = [("curriculum", 24), ("learners", 16), ("materials", 12), ("assessplan", 12),
         ("methods", 20), ("obstacles", 12), ("communication", 16), ("time", 8), ("evaluation", 12),
         ("environment", 20), ("professional", 28), ("safety", 20)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cosmetology-instructor-questions.json")
rows = []
SLOTS = [i % 4 for i in range(200)]
random.Random(40800).shuffle(SLOTS)
n_row = 0
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "\u2014" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = SLOTS[n_row]; n_row += 1
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CINSTR", "state": "ALL", "questionId": f"CINST-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
# No computed keys. Numeric keys are sourced rule figures: 45 days (34 CFR 99.10), 150% and one
# payment period (34 CFR 668.34), monthly and annual (29 CFR 1910.157, 1910.1030).
BP = [6, 4, 3, 3, 5, 3, 4, 2, 3, 5, 7, 5]
assert sum(BP) == 50 and sum(BP[:4]) == 16 and sum(BP[4:9]) == 17 and sum(BP[9:]) == 17
assert [n for _, n in ORDER] == [4 * x for x in BP]
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
