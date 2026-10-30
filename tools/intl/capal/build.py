"""Build data/canadian-firearms-questions.json from q_*.py. Usage: python3 -I build.py [out] [--report]"""
import json, os, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_evo import ITEMS as EVO
from q_act import ITEMS as ACT
from q_amm import ITEMS as AMM
from q_saf import ITEMS as SAF
from q_han import ITEMS as HAN
from q_fir import ITEMS as FIR
from q_car import ITEMS as CAR
from q_sto import ITEMS as STO
from q_law import ITEMS as LAW

CATS = [
    ("capalHistory", "EVO", EVO, 20),
    ("capalActions", "ACT", ACT, 24),
    ("capalAmmo", "AMM", AMM, 24),
    ("capalSafety", "SAF", SAF, 32),
    ("capalHandling", "HAN", HAN, 24),
    ("capalFiring", "FIR", FIR, 16),
    ("capalCare", "CAR", CAR, 12),
    ("capalStorage", "STO", STO, 24),
    ("capalLaw", "LAW", LAW, 24),
]
rows = []
report = "--report" in sys.argv
for key, seg, items, n in CATS:
    if len(items) != n:
        print(f"{key}: {len(items)} items, want {n}")
    for i, it in enumerate(items, 1):
        stem, k, w1, w2, w3, expl = it
        pos = (i - 1) % 4
        wrong = [w1, w2, w3]
        opts = wrong[:pos] + [k] + wrong[pos:]
        rows.append({
            "type": "CAPAL", "state": "ALL", "questionId": f"CAPAL-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            longest = len(k) > max(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{key} {i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else os.path.join(HERE, "..", "..", "..", "data", "canadian-firearms-questions.json")
json.dump(rows, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(out, "a").write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
