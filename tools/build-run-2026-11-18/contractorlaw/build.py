"""Build data/contractor-business-law-questions.json from q_*.py.

Usage: python3 -I tools/build-run-2026-11-18/contractorlaw/build.py [out]

Each q_*.py holds Q = [(question, key, [3 wrong], explanation[, calc]), ...]. The key is
written first and placed in a seeded, balanced slot (a quarter of each segment per letter). When a fifth
element is given it is a Python expression for a computed answer: the build evaluates it and
fails unless that number appears in the key, so every computed key is recomputed here.
"""
import importlib.util, json, os, random, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["org", "fin", "est", "prj", "con", "rsk", "tax", "lab", "saf"]
POOLS = {"org": 16, "fin": 28, "est": 28, "prj": 20, "con": 24, "rsk": 16, "tax": 24, "lab": 24, "saf": 20}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "contractor-business-law-questions.json")


def forms(v):
    v = float(v)
    c = {f"{v:,.0f}", f"{v:,.2f}", f"{v:,.1f}", f"{v:g}", f"{v:.2f}", f"{v:.1f}", f"{v:.0f}"}
    return {x for x in c if x not in ("-0", "0.0") or v == 0}


def check(key, expr, where):
    v = eval(expr, {"__builtins__": {}, "max": max, "min": min})
    nums = set(re.findall(r"\d[\d,]*\.?\d*", key))
    ok = any(f in nums for f in forms(v))
    assert ok, f"{where}: computed {v} not in key {key!r}"


rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    # Seeded, balanced key slots: each letter exactly a quarter of the segment, order shuffled
    # by a seed from the segment name so it is stable across rebuilds but not A, B, C, D in ID order.
    slots = [j % 4 for j in range(len(mod.Q))]
    random.Random("contractorlaw-" + mod.SEG).shuffle(slots)
    for i, item in enumerate(mod.Q):
        q, key, wrong, expl = item[:4]
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        if len(item) > 4:
            check(key, item[4], f"{mod.SEG}-{i+1:03d}")
        k = slots[i]
        opts = list(wrong)
        opts.insert(k, key)
        rows.append({"type": "CONTRLAW", "state": "ALL", "questionId": f"CBL-{mod.SEG}-{i+1:03d}",
                     "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1],
                     "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[k],
                     "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
