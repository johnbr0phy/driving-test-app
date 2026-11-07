"""Build data/portugal-cam-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (pergunta, resposta certa, [3 erradas], explicação), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (decimal comma, e.g. "0,2 g/l", "1,5 metros", "56 horas") are sorted
ascending instead, and the key's letter is found after sorting.
Three 60-question tests (10/7/7/9/6/5/5/7/4); the last items of each pool are training-only.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool, per test)
ORDER = [("racional", 32, 10), ("carga", 23, 7), ("passageiros", 23, 7), ("tempos", 29, 9),
         ("tacografo", 20, 6), ("regulamentacao", 17, 5), ("saude", 17, 5),
         ("emergencias", 23, 7), ("economia", 16, 4)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "portugal-cam-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
BAD = ["\u2014", "\u2013 ", '"', "todas as anteriores", "nenhuma das anteriores", "todas as respostas", "você"]
BAD_OPT = ["Ambas", "Ambos", "A e B", "A ou B"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({p.group(2) for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(",", ".")) for p in parts]

rows = []; longest = 0; ends = 0; nums = 0
assert sum(p for _, _, p in ORDER) == 60 and sum(n for _, n, _ in ORDER) == 200
for m, n, per in ORDER:
    assert n >= 3 * per, m
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        for b in BAD_OPT:
            assert all(b not in o for o in [key] + list(wrong)), (m, i, "banned option", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key); nums += 1; ends += k in (0, 3)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        if len(key) > max(len(w) for w in wrong):
            longest += 1
        rows.append({"type": "PTCAM", "state": "ALL", "questionId": f"PTCAM-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
print(f"key strictly longest: {longest}/{len(rows)} = {longest/len(rows):.1%}; numeric items {nums}, key at an end {ends}")
