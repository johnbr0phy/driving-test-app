"""Build data/italy-cils-b1-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (domanda, risposta giusta, [3 sbagliate], spiegazione), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D within every category. Reading
passages are quoted with « »; any « » inside a passage is turned into “ ” so the outer
quotation stays unambiguous.
"""
import importlib.util, json, os, re, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 5/5/5/5/6/5/5/4/4/6 per test, pools exactly 4x.
ORDER = [("avvisi", 20), ("mail", 20), ("testi", 20), ("preposizioni", 20), ("passato", 24),
         ("verbi", 20), ("pronomi", 20), ("aggettivi", 16), ("connettivi", 16), ("lessico", 24)]
READING = {"avvisi", "mail", "testi"}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "italy-cils-b1-questions.json")
BAD = ["\u2014", "\u2013", '"', "Tutte le precedenti", "Nessuna delle precedenti", "A e B"]


def inner_quotes(q):
    a, b = q.find("«"), q.rfind("»")
    if a < 0 or b < 0:
        return q
    mid = q[a + 1:b].replace("«", "“").replace("»", "”")
    return q[:a + 1] + mid + q[b:]


rows, warn = [], []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        q = inner_quotes(q)
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        if m in READING:
            words = len(q[q.find("«") + 1:q.rfind("»")].split())
            if not 55 <= words <= 125:
                warn.append(f"{m} {i+1}: passage {words} words")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ITCILS", "state": "ALL", "questionId": f"ITCILS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})

with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
for w in warn:
    print("WARN", w)
# Length report per category: key longest (unique) and key > 1.2x wrong mean.
by = {}
for r in rows:
    o = [r["option" + L] for L in "ABCD"]; k = r["correctIndex"]
    ln = [len(x) for x in o]; others = [ln[j] for j in range(4) if j != k]
    st = by.setdefault(r["category"], [0, 0, 0, []])
    st[0] += 1
    st[1] += ln[k] == max(ln) and ln.count(ln[k]) == 1
    st[2] += ln[k] > 1.2 * statistics.mean(others)
    st[3].extend(ln)
tl = tf = 0
for c, (n, l, f_, lens) in by.items():
    tl += l; tf += f_
    print(f"{c:22} n={n:3} keyLongest={l:3} keyFar={f_:3} avgOpt={statistics.mean(lens):.1f}")
print(f"TOTAL keyLongest {tl/len(rows):.0%} keyFar {tf/len(rows):.0%} avgOpt {statistics.mean(len(r['option'+L]) for r in rows for L in 'ABCD'):.1f}")
