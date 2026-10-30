import json, os, statistics, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_reg import ITEMS as REG
from q_wrn import ITEMS as WRN
from q_wrk import ITEMS as WRK
from q_sig import ITEMS as SIG
from q_lic import ITEMS as LIC
from q_row import ITEMS as ROW
from q_drv import ITEMS as DRV
from q_shr import ITEMS as SHR
from q_con import ITEMS as CON

# (key, segment, items, pool) in spec order; pool = 5 tests x per-test count
CATS = [
    ("cansRegSigns", "REG", REG, 30),
    ("cansWarnSigns", "WRN", WRN, 30),
    ("cansWorkSigns", "WRK", WRK, 15),
    ("cansSignals", "SIG", SIG, 25),
    ("cansLicence", "LIC", LIC, 20),
    ("cansRightOfWay", "ROW", ROW, 20),
    ("cansDriving", "DRV", DRV, 25),
    ("cansSharing", "SHR", SHR, 20),
    ("cansConditions", "CON", CON, 15),
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
            "type": "CANS", "state": "ALL", "questionId": f"CANS-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            longest = len(k) > max(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{seg} {i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
here = os.path.dirname(os.path.abspath(__file__))
default = os.path.join(here, "..", "..", "..", "data", "nova-scotia-learners-questions.json")
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else os.path.normpath(default)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(len(rows), "rows ->", out)
