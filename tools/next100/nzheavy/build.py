"""Build data/nz-heavy-vehicle-licence-questions.json from the q_*.py sources.

Usage: python3 -I tools/next100/nzheavy/build.py [out.json] [--report]
Keys are written first in the sources; item i of each segment puts its key in slot i % 4, so each
letter holds the key about 25% of the time. Pools are 5x the per-test count plus training-only
spares (the last items of each pool).
"""
import importlib.util, json, os, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool, per test)
ORDER = [("licence", 23, 4), ("work", 34, 6), ("mass", 34, 6), ("brakes", 34, 6),
         ("road", 29, 5), ("sharing", 29, 5), ("safety", 17, 3)]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
report = "--report" in sys.argv
out = args[0] if args else os.path.join(ROOT, "data", "nz-heavy-vehicle-licence-questions.json")
rows, longest_n, bad = [], 0, False
for m, n, per in ORDER:
    spec = importlib.util.spec_from_file_location(m, os.path.join(HERE, "q_" + m + ".py"))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    if len(mod.Q) != n:
        print(f"{m}: {len(mod.Q)} items, want {n}"); bad = True
    assert 5 * per <= n, m
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "NZHEAVY", "state": "ALL", "questionId": f"NZHV-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k,
            "explanation": expl})
        longest = len(key) > max(len(w) for w in wrong)
        longest_n += longest
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            if longest or len(key) > 1.2 * lw:
                print(f"{mod.SEG}-{i+1:03d} key {len(key)} vs {lw:.0f}{' LONGEST' if longest else ''}: {key} | {wrong}")
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", os.path.relpath(out, ROOT), f"| key strictly longest: {longest_n}/{len(rows)} ({100*longest_n/len(rows):.1f}%)")
sys.exit(1 if bad else 0)
