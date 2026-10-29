import json, os, statistics, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_signs import ITEMS as SIGNS
from q_signals import ITEMS as SIGNALS
from q_licence import ITEMS as LICENCE
from q_row import ITEMS as ROW
from q_sharing import ITEMS as SHARING
from q_driving import ITEMS as DRIVING
from q_conditions import ITEMS as CONDITIONS

CATS = [
    ("caonSigns", "SGN", SIGNS, 56),
    ("caonSignals", "SIG", SIGNALS, 32),
    ("caonLicence", "LIC", LICENCE, 28),
    ("caonRightOfWay", "ROW", ROW, 20),
    ("caonSharing", "SHR", SHARING, 24),
    ("caonDriving", "DRV", DRIVING, 24),
    ("caonConditions", "CON", CONDITIONS, 16),
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
            "type": "CAON", "state": "ALL", "questionId": f"CAON-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            longest = len(k) > max(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{key} {i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
out = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "/home/user/driving-test-app/data/ontario-g1-questions.json"
json.dump(rows, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(out, "a").write("\n")
print(len(rows), "rows ->", out)
