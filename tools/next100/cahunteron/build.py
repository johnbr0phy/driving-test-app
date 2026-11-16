"""Build data/ontario-hunter-education-questions.json from q_*.py.
Usage: python3 -I build.py [out] [--report]"""
import importlib.util, json, os, statistics, sys
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = [("lic", 24), ("tag", 24), ("rul", 32), ("eqp", 28), ("lnd", 20), ("eth", 20), ("wld", 32), ("car", 20)]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
report = "--report" in sys.argv
out = args[0] if args else os.path.join(ROOT, "data", "ontario-hunter-education-questions.json")
rows, longest_n = [], 0
for m, want in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location("q_" + m, p)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    assert len(mod.Q) == want, (m, len(mod.Q), want)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong)
        opts.insert(k, key)
        if len(key) > max(len(w) for w in wrong):
            longest_n += 1
            if report:
                print(f"LONGEST {m} {i+1:03d} {len(key)} vs {statistics.mean(len(w) for w in wrong):.0f}: {key} | {wrong}")
        rows.append({"type": "CAHUNTERON", "state": "ALL", "questionId": f"CAHON-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
print(f"key strictly longest: {longest_n}/{len(rows)} = {100*longest_n/len(rows):.1f}%")
