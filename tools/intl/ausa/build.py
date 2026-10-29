"""Build data/sa-learners-questions.json from the cat_*.py sources.

Usage: python3 -I build.py <repo root>
The key letter rotates A, B, C, D within each segment; wrong options fill the other slots in order.
"""
import importlib.util, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
CATS = [  # key, segment, module, perTest
    ("ausaGiveWay", "GW", "cat_giveway", 8),
    ("ausaLicence", "LIC", "cat_licence", 7),
    ("ausaSpeed", "SPD", "cat_speed", 6),
    ("ausaSigns", "SGN", "cat_signs", 7),
    ("ausaRoad", "ROAD", "cat_road", 7),
    ("ausaShare", "SHR", "cat_share", 6),
    ("ausaParking", "PRK", "cat_parking", 3),
    ("ausaSafety", "SAFE", "cat_safety", 6),
]

def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m.ITEMS

rows, flags = [], []
for key, seg, mod, per in CATS:
    items = load(mod)
    assert len(items) == per * 4, (key, len(items), per * 4)
    for i, (q, k, w1, w2, w3, ex) in enumerate(items):
        idx = i % 4
        wrong = [w1, w2, w3]
        opts = wrong[:idx] + [k] + wrong[idx:]
        qid = f"AUSA-{seg}-{i + 1:03d}"
        rows.append({
            "type": "AUSA", "state": "ALL", "questionId": qid, "category": key,
            "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[idx], "correctIndex": idx, "explanation": ex,
        })
        avgw = sum(map(len, wrong)) / 3
        if len(k) > 1.2 * avgw or len(k) > max(map(len, wrong)):
            flags.append(f"{qid} key={len(k)} avgw={avgw:.0f} maxw={max(map(len, wrong))} | {k}")

out = os.path.join(sys.argv[1], "data/sa-learners-questions.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out)
print(len(flags), "length flags")
for x in flags: print(" ", x)
