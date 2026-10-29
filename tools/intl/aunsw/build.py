import json, sys, os, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
CATS = [  # key, segment, module, perTest
    ("nswLicence", "LIC", "q_licence", 6),
    ("nswSpeed", "SPD", "q_speed", 6),
    ("nswImpair", "IMP", "q_impair", 7),
    ("nswGiveWay", "GWY", "q_giveway", 9),
    ("nswSharing", "SHR", "q_sharing", 6),
    ("nswLanes", "LAN", "q_lanes", 7),
    ("nswParking", "PRK", "q_parking", 4),
    ("nswHazards", "HAZ", "q_hazards", 5),
]
def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.ITEMS
rows = []
for key, seg, mod, per in CATS:
    items = load(mod)
    assert len(items) == per * 4, (key, len(items))
    for i, (q, k, ds, ex) in enumerate(items):
        assert len(ds) == 3
        slot = i % 4
        opts = list(ds); opts.insert(slot, k)
        L = "ABCD"[slot]
        rows.append({"type": "AUNSW", "state": "ALL", "questionId": f"AUNSW-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": L, "correctIndex": slot,
            "explanation": ex})
out = sys.argv[1]
json.dump(rows, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(out, "a").write("\n")
print(len(rows), "rows ->", out)
