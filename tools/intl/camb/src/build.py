import json, sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
CATS = [  # module, key, segment, perTest
    ("gdl", "cambLicence", "GDL", 6),
    ("signs", "cambSigns", "SGN", 10),
    ("row", "cambRules", "ROW", 9),
    ("share", "cambSharing", "SHR", 8),
    ("speed", "cambSpeed", "SPD", 6),
    ("emerg", "cambConditions", "EMG", 6),
    ("impaired", "cambImpaired", "IMP", 5),
]
out = []
for mod, key, seg, per in CATS:
    items = importlib.import_module(mod).ITEMS
    assert len(items) == per * 4, (mod, len(items))
    for i, (q, k, wrongs, expl) in enumerate(items):
        assert len(wrongs) == 3, (mod, i)
        idx = i % 4
        opts = list(wrongs)
        opts.insert(idx, k)
        out.append({
            "type": "CAMB", "state": "ALL", "questionId": f"CAMB-{seg}-{i+1:03d}",
            "category": key, "question": q,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[idx], "correctIndex": idx, "explanation": expl,
        })
dest = sys.argv[1]
json.dump(out, open(dest, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(dest, "a").write("\n")
print(len(out), "rows ->", dest)
