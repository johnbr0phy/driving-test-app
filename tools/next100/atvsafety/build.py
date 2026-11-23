"""Build data/atv-snowmobile-safety-questions.json from q_*.py. Usage: python3 -I build.py [out]

ATV and snowmobile safety course practice bank, exam id `atvsafety`. Every item is original,
written from the state course outlines (Minnesota rules 6102.0070 and 6100.5500), the NY State
Parks snowmobile safety course guide, CPSC's ATV pages and the ASI Tips & Practice Guide hosted by
Oregon Parks (see sources.md). Keys are written first; the build places each key in a seeded,
balanced slot so every letter lands at about 25% per category.
"""
import importlib.util, json, sys, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("mch", 16), ("ger", 16), ("rid", 20), ("ter", 24), ("saf", 20), ("rsp", 16),
         ("smc", 16), ("spr", 16), ("srd", 24), ("shz", 16), ("srl", 16)]
PER_TEST = [4, 4, 5, 6, 5, 4, 4, 4, 6, 4, 4]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "atv-snowmobile-safety-questions.json")
assert sum(PER_TEST) == 50 and [n for _, n in ORDER] == [4 * x for x in PER_TEST]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    slots = [j % 4 for j in range(n)]
    random.Random("atvsafety-" + mod.SEG).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        assert q not in seen, (m, i, "duplicate stem"); seen.add(q)
        k = slots[i]
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ATVSAFE", "state": "ALL", "questionId": f"ATVS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
