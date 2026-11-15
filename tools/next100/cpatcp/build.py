"""Build data/cpa-tcp-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source holds CAT, SEG and Q, a list of (stem, key, [three wrong options], explanation[, value]).
The key is authored first; it is placed in slot i % 4 so each letter lands on 25%.
When a fifth element is given it is the value the key must state: the build recomputes
nothing by itself, so every computed key is written as a Python number in the source and
checked here against the first number in the key text.
"""
import importlib.util, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["ind", "pal", "gft", "pfp", "cco", "sco", "ptr", "trx", "frm", "opl", "ntx", "chr", "rel"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cpa-tcp-questions.json")
NUM = re.compile(r"-?\$?(\d[\d,]*(?:\.\d+)?)")

def first_num(s):
    m = NUM.search(s)
    return float(m.group(1).replace(",", "")) if m else None

rows = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, item in enumerate(mod.Q):
        q, key, wrong, expl = item[:4]
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        if len(item) == 5:
            v = item[4]
            got = first_num(key)
            assert got is not None and abs(got - v) < 0.006, (m, i, key, v)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CPATCP", "state": "ALL", "questionId": f"CPATCP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})

# Arithmetic behind the computed keys, recomputed here so a typo in a source value fails the build.
calc = {
    "IND-002": 2000 * (25 - 9), "IND-004": 500 * 50, "IND-010": min(3600, 2500),
    "IND-018": round(2400 * (0.22 + 0.0765), 2), "IND-021": 6000 - 0.005 * 200000, "IND-024": min(0.9 * 40000, 50000) - 22000,
    "PAL-001": 30000 + 20000, "PAL-004": min(12000, 25000), "PAL-005": 13000 * 20000 / 25000, "PAL-006": 15000 - 4000,
    "PAL-009": 30000 - (70000 - 50000), "PAL-012": min(30000, 24000, 18000),
    "GFT-001": 50000 - 19000, "GFT-002": 2 * (30000 - 19000),
    "PFP-005": round(60000 / 90000 * 500, 2), "PFP-006": round(2.6 / 0.65, 2), "PFP-007": 5.0 * 0.76,
    "PFP-011": 2500 * 0.85 / 10000 * 100,
    "CCO-001": -(400000 - 500000 - 0.5 * 50000), "CCO-003": min(140000, 100000), "CCO-004": 5000000 * 0.034,
    "CCO-006": 30000 - 8000 - 5000 - 10000, "CCO-007": min(100000 - 40000, 15000), "CCO-008": 40000 + 15000,
    "CCO-009": 90000 - 70000, "CCO-011": 90000 - 30000, "CCO-013": (40000 - (10000 + 15000)) - 8000,
    "CCO-014": 150000 - 40000, "CCO-018": 300000 + 100000 - 15000 - 20000, "CCO-020": 25000 + 30000, "CCO-024": 0.30 * 200000,
    "SCO-001": 30000 - 45000 + (45000 - 30000), "SCO-003": 20000 - (18000 - 5000), "SCO-005": 40000 + 15000 - 25000,
    "SCO-008": 73000 / 365 * 146 * 0.5, "SCO-014": 0.21 * min(340000 - 180000, 300000 - 180000), "SCO-016": 20000,
    "PTR-001": (60000 - 20000) - 30000, "PTR-005": min(20000, 25000 - 10000), "PTR-006": 50000 - 10000 - 15000,
    "PTR-007": 50000 - 10000 - 15000, "PTR-008": 30000 + 0.4 * (100000 - 30000), "PTR-010": 90000 - 50000,
    "PTR-014": 120000 * 0.25 * 3 / 12, "PTR-015": 0.25 * 50000, "PTR-016": (50000 - 20000) + (56000 - 50000) / 2,
    "PTR-020": 40000 + 3000 + 8000 - 5000 - 1000 - 15000,
    "TRX-006": (20000 + 10000 + 8000 - 3000) - 8000, "TRX-007": (38000 - 3000) - 27000 - 300, "TRX-008": min(40000, 30000) - 6000,
    "FRM-006": (500000 - 0.21 * 300000) - 100000, "FRM-007": 300000 + (500000 - (100000 + 300000)),
    "OPL-001": 0.21 * min(200000, 0.8 * 150000), "OPL-003": round((60 + 70 + 10) / 3, 2), "OPL-005": min(120000, 80000) / 4,
    "OPL-006": 200000 / 4 + (200000 / 4 - 100000 / 4),
    "NTX-001": min(500000 - 300000, 50000), "NTX-002": 300000 - 50000 + 50000, "NTX-003": min((520000 + 100000 - 20000) - 200000, 100000 - 20000),
    "NTX-008": 400000 - 360000, "NTX-009": 360000 - ((400000 - 250000) - 40000),
    "CHR-001": min(70000 - 30000, 50000), "CHR-002": 50000, "CHR-003": min(650000 - 380000, 120000), "CHR-005": 0.2 * 120000,
    "CHR-006": min(30000 - 12000, 10000), "CHR-008": min(130000, 100000), "CHR-010": (200000 - 120000) / 200000 * 50000,
    "CHR-011": 30000 + (100000 - 70000) / 100000 * 20000,
    "REL-002": 30 + 15, "REL-003": 10 + 0.6 * 50, "REL-005": (12000 - 6000) - 4000, "REL-006": 6000 - 5000,
}
byid = {r["questionId"][len("CPATCP-"):]: r for r in rows}
for qid, v in calc.items():
    r = byid[qid]
    key = r["option" + r["correctAnswer"]]
    got = first_num(key)
    assert got is not None and abs(got - v) < 0.006, (qid, key, v)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, "| checked", len(calc), "computed keys")
