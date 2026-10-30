import json, importlib.util, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
CATS = [("ukmotoAware","AWR","c1_aware",32),("ukmotoMachine","MCH","c2_machine",32),
        ("ukmotoHandling","HDL","c3_handling",32),("ukmotoVulnerable","VUL","c4_vulnerable",24),
        ("ukmotoRules","RUL","c5_rules",32),("ukmotoSigns","SGN","c6_signs",28),("ukmotoDocs","DOC","c7_docs",20)]
rows = []
for key, seg, mod, n in CATS:
    spec = importlib.util.spec_from_file_location(mod, os.path.join(HERE, mod + ".py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    items = m.ITEMS
    if len(items) != n: print(f"{key}: {len(items)} items, want {n}")
    for i, (q, k, wrong, ex) in enumerate(items):
        assert len(wrong) == 3, q
        pos = i % 4
        opts = list(wrong); opts.insert(pos, k)
        rows.append({"type":"UKMOTO","state":"ALL","questionId":f"UKMOTO-{seg}-{i+1:03d}","category":key,
            "question":q,"optionA":opts[0],"optionB":opts[1],"optionC":opts[2],"optionD":opts[3],
            "correctAnswer":"ABCD"[pos],"correctIndex":pos,"explanation":ex})
out = sys.argv[1]
json.dump(rows, open(out,"w",encoding="utf-8"), indent=2, ensure_ascii=False); open(out,"a").write("\n")
print(len(rows), "rows")
