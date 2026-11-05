"""Build data/singapore-vocational-licence-questions.json from q_*.py.

Usage: python3 -I build.py [out]

Each source item is (question, key, [3 wrong], explanation), key written first. Within each category
the items are ranked by a hash of the stem and the key slots are dealt A, B, C, D in that rank order,
so every letter is keyed a quarter of the time but there is no visible A-B-C-D cycle in ID order.
Prints the share of items whose key is strictly the longest option and the letter spread.
"""
import hashlib, importlib.util, json, os, sys
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["saf", "pas", "inc", "lic", "con", "far", "stp", "rte"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "singapore-vocational-licence-questions.json")
rows, longest, letters = [], 0, Counter()
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    rank = sorted(range(len(mod.Q)), key=lambda j: hashlib.sha1(mod.Q[j][0].encode("utf-8")).hexdigest())
    slot = {j: n % 4 for n, j in enumerate(rank)}
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = slot[i]
        opts = list(wrong); opts.insert(k, key)
        if all(len(key) > len(w) for w in wrong):
            longest += 1
        letters["ABCD"[k]] += 1
        rows.append({"type": "SGVL", "state": "ALL", "questionId": f"SGVL-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
print(f"key strictly longest: {longest}/{len(rows)} = {100*longest/len(rows):.1f}%")
print("letters:", dict(sorted(letters.items())))
