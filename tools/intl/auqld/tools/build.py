import json, sys, importlib.util, os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "src")
CATS = [("gw", "auqldGiveWay", "GW", 48), ("lic", "auqldLicence", "LIC", 40), ("sig", "auqldSigns", "SIG", 40),
        ("road", "auqldRoad", "ROAD", 36), ("safe", "auqldSafety", "SAFE", 36)]
out = []
for mod, key, seg, n in CATS:
    spec = importlib.util.spec_from_file_location(mod, os.path.join(SRC, mod + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    items = m.ITEMS
    if len(items) != n:
        print(f"{key}: {len(items)} items, want {n}")
    for i, (q, k, ds, ex) in enumerate(items):
        slot = i % 4
        opts = list(ds); opts.insert(slot, k)
        out.append({"type": "AUQLD", "state": "ALL", "questionId": f"AUQLD-{seg}-{i+1:03d}", "category": key,
                    "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
                    "correctAnswer": "ABCD"[slot], "correctIndex": slot, "explanation": ex})
json.dump(out, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(sys.argv[1], "a").write("\n")
print(len(out), "rows")
