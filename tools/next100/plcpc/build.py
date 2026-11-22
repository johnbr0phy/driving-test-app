"""Build data/poland-driver-cpc-questions.json from the q_*.py sources.

Usage: python3 -I tools/next100/plcpc/build.py [out.json] [--report]
Keys are written as the first option in the sources; each item is placed in slot (i-1) % 4 of
its segment, so A, B, C and D each hold the key 25% of the time.
"""
import json, os, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_eco import ITEMS as ECO
from q_brakes import ITEMS as BRAKES
from q_hours import ITEMS as HOURS
from q_tacho import ITEMS as TACHO
from q_safety import ITEMS as SAFETY
from q_crime import ITEMS as CRIME
from q_health import ITEMS as HEALTH
from q_emergency import ITEMS as EMERGENCY
from q_image import ITEMS as IMAGE
from q_loads import ITEMS as LOADS
from q_freight import ITEMS as FREIGHT
from q_passengers import ITEMS as PASSENGERS
from q_passrules import ITEMS as PASSRULES

# (category key, ID segment, items, pool). Pool = 4 tests x per-test count.
CATS = [
    ("plcpcEco", "ECO", ECO, 16),
    ("plcpcBrakes", "BRK", BRAKES, 16),
    ("plcpcHours", "HRS", HOURS, 24),
    ("plcpcTacho", "TAC", TACHO, 16),
    ("plcpcSafety", "SAF", SAFETY, 16),
    ("plcpcCrime", "CRM", CRIME, 8),
    ("plcpcHealth", "HLT", HEALTH, 12),
    ("plcpcEmergency", "EMG", EMERGENCY, 16),
    ("plcpcImage", "IMG", IMAGE, 12),
    ("plcpcLoads", "LOD", LOADS, 16),
    ("plcpcFreight", "FRT", FREIGHT, 16),
    ("plcpcPassengers", "PSG", PASSENGERS, 16),
    ("plcpcPassRules", "PRL", PASSRULES, 16),
]
rows = []
report = "--report" in sys.argv
bad = False
longest_n = 0
for key, seg, items, n in CATS:
    if len(items) != n:
        print(f"{key}: {len(items)} items, want {n}")
        bad = True
    for i, it in enumerate(items, 1):
        stem, k, w1, w2, w3, expl = it
        pos = (i - 1) % 4
        wrong = [w1, w2, w3]
        opts = wrong[:pos] + [k] + wrong[pos:]
        rows.append({
            "type": "PLCPC", "state": "ALL", "questionId": f"PLCPC-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        longest = len(k) > max(len(w) for w in wrong)
        longest_n += longest
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{seg}-{i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else os.path.join(HERE, "..", "..", "..", "data", "poland-driver-cpc-questions.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(len(rows), "rows ->", os.path.normpath(out), f"| key strictly longest: {longest_n}/{len(rows)} ({100*longest_n/len(rows):.1f}%)")
sys.exit(1 if bad else 0)
