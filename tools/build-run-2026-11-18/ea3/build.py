"""Build data/enrolled-agent-part-3-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation).
The key is authored first; it is placed in slot i % 4 so each letter lands on 25%.
Computed keys are asserted below and in q_cas.py.
"""
import importlib.util, json, sys, os, datetime
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["pra", "san", "poa", "cas", "col", "exa", "fil"]
POOLS = {"pra": 36, "san": 24, "poa": 28, "cas": 32, "col": 28, "exa": 20, "fil": 32}

# Computed keys
assert 90 // 50 == 1                      # PRA: a 90-minute program earns one 50-minute contact hour
assert 2 * 6 >= 11                        # FIL: firm aggregate of 12 covered returns meets the 11-return test
assert 80 > 50                            # FIL: an $80 AGI change exceeds the $50 tolerance
assert 18000 <= 25000                     # EXA: each period within the small case limit
claim = datetime.date(2026, 9, 1)         # CAS: refund lookback 3 years + 6-month extension
assert datetime.date(2023, 3, 1) <= datetime.date(2023, 4, 18) <= claim
assert (datetime.date(2026, 6, 1) - datetime.date(2024, 12, 1)).days < 2 * 365  # CAS: late return 18 months before petition

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "enrolled-agent-part-3-questions.json")
rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "EA3", "state": "ALL", "questionId": f"EA3-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
