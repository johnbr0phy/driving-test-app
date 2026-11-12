"""Build data/italy-celi-2-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (domanda, chiave, [3 distrattori], spiegazione), key written first.
The key goes to slot i % 4 within its category, so letters rotate A, B, C, D.
"""
import importlib.util, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 10/12/8/5/5/4/6 per test, pools exactly 4x.
ORDER = [("avvisi", 40), ("testi", 48), ("verbi", 32), ("pronomi", 20),
         ("preposizioni", 20), ("connettivi", 16), ("lessico", 24)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "italy-celi-2-questions.json")
BAD = ["—", "–", '"', "Tutte le precedenti", "Nessuna delle precedenti", "Entrambe"]

rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ITCELI", "state": "ALL", "questionId": f"ITCELI-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
