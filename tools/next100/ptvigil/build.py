"""Build data/pt-vigilante-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (pergunta, resposta certa, [3 erradas], explicação), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with a unit (decimal comma, e.g. "0,30 m", "30 dias", "6 meses", "112") are sorted
ascending instead (mixed time units converted to days), and the key's letter is found after
sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool, perTest). Eight 20-question tests: 4/2/3/3/2/2/1/3 per test; the last items
# of each pool (40 in all) are training-only.
ORDER = [("regime", 36, 4), ("direitos", 20, 2), ("penal", 28, 3), ("acessos", 28, 3),
         ("vigilancia", 20, 2), ("conflitos", 20, 2), ("relatorios", 12, 1), ("emergencia", 36, 3)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "pt-vigilante-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
SCALE = {"": ("n", 1), "m": ("d", 1), "horas": ("t", 1 / 24), "hora": ("t", 1 / 24), "dias": ("t", 1),
         "dia": ("t", 1), "meses": ("t", 30), "mês": ("t", 30), "anos": ("t", 365), "ano": ("t", 365),
         "minutos": ("t", 1 / 1440)}
BAD = ["\u2014", "\u2013 ", '"', "Todas as anteriores", "Nenhuma das anteriores", "A e B", "A ou B",
       "Ambas", "Ambos"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts) or any(p.group(2) not in SCALE for p in parts):
        return None
    if len({SCALE[p.group(2)][0] for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(",", ".")) * SCALE[p.group(2)][1] for p in parts]

rows = []
for m, n, per in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    assert 8 * per <= n, (m, per, n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            pairs = sorted(zip(vals, [key] + list(wrong)))
            opts = [o for _, o in pairs]
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "PTVIGIL", "state": "ALL", "questionId": f"PTVIG-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
