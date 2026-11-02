"""Build data/cca-questions.json from q_*.py.

Usage: python3 -I build.py [--out path] [--only icd,reimb,...]
Each q_<name>.py defines SECTIONS = [(category, segment, items)], each item
(stem, key, [3 wrong options], explanation). The key goes in slot i % 4, so every
segment keys A, B, C, D in turn.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
FILES = ["icd", "reimb", "records"]  # spec order: icd (ICD-CM, PCS, CPT, E/M), reimb (payment, claims, compliance), records (records, IT, privacy)
ORDER = ["ccaIcdcm", "ccaPcs", "ccaCpt", "ccaEm", "ccaPayment", "ccaClaims", "ccaRecords", "ccaCompliance", "ccaIt", "ccaPrivacy"]
args = sys.argv[1:]
out = os.path.join(ROOT, "data", "cca-questions.json")
only = None
while args:
    a = args.pop(0)
    if a == "--out": out = args.pop(0)
    elif a == "--only": only = args.pop(0).split(",")
sections = []
for m in FILES:
    if only and m not in only: continue
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    sections += mod.SECTIONS
sections.sort(key=lambda s: ORDER.index(s[0]))
rows = []
for cat, seg, items in sections:
    for i, (q, key, wrong, expl) in enumerate(items):
        assert len(wrong) == 3, (cat, i, q)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "CCA", "state": "ALL", "questionId": f"CCA-{seg}-{i+1:03d}",
            "category": cat, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
