"""Build data/fortigate-questions.json from q_<category>.py. Usage: python3 -I build.py [out]

Each source holds ITEMS = [(stem, [A, B, C, D], key letter, explanation), ...], written with the
key in slot i % 4 so every letter lands at 25%.
"""
import importlib.util, json, os, sys
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
CATS = [("fgtSystem", "SYS", 20), ("fgtHaLog", "HAL", 20), ("fgtCloud", "CLD", 8), ("fgtPolicy", "POL", 20), ("fgtNat", "NAT", 16),
        ("fgtAuth", "AUT", 12), ("fgtSslInspect", "SSL", 16), ("fgtSecProfiles", "SEC", 40),
        ("fgtRouting", "RTE", 28), ("fgtVpn", "VPN", 20)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "fortigate-questions.json")
rows = []
for cat, seg, pool in CATS:
    p = os.path.join(HERE, f"q_{cat}.py")
    spec = importlib.util.spec_from_file_location(cat, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.ITEMS) == pool, (cat, len(mod.ITEMS))
    for i, (q, opts, key, expl) in enumerate(mod.ITEMS):
        assert len(opts) == 4 and len(set(opts)) == 4, (cat, i)
        k = "ABCD".index(key)
        assert k == i % 4, (cat, i)
        rows.append({"type": "FGT", "state": "ALL", "questionId": f"FGT-{seg}-{i+1:03d}", "category": cat,
            "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": key, "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
