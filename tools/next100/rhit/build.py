"""Build data/rhit-questions.json from q_*.py.

Usage: python3 -I build.py [--out path]
Each q_<name>.py defines SECTIONS = [(category, segment, items)], each item
(stem, key, [3 wrong options], explanation). The key goes in slot i % 4, so every
segment keys A, B, C, D in turn.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
FILES = ["content", "privacy", "stats", "revenue", "compliance"]
ORDER = ["rhitContent", "rhitEhr", "rhitPrivacy", "rhitStats", "rhitCoding", "rhitRevenue", "rhitCompliance", "rhitLeadership"]
POOLS = {"rhitContent": 24, "rhitEhr": 20, "rhitPrivacy": 32, "rhitStats": 28, "rhitCoding": 24, "rhitRevenue": 20, "rhitCompliance": 32, "rhitLeadership": 20}
args = sys.argv[1:]
out = os.path.join(ROOT, "data", "rhit-questions.json")
while args:
    a = args.pop(0)
    if a == "--out": out = args.pop(0)
sys.dont_write_bytecode = True
sections = []
for m in FILES:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    sections += mod.SECTIONS
sections.sort(key=lambda s: ORDER.index(s[0]))
rows = []
bad = False
for cat, seg, items in sections:
    if len(items) != POOLS[cat]:
        print("POOL", cat, len(items), "want", POOLS[cat]); bad = True
    for i, (q, key, wrong, expl) in enumerate(items):
        assert len(wrong) == 3, (cat, i, q)
        assert key not in wrong, (cat, i, q)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "RHIT", "state": "ALL", "questionId": f"RHIT-{seg}-{i+1:03d}",
            "category": cat, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
if bad: sys.exit(1)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
