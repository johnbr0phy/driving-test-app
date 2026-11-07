"""Build data/be-toelatingsexamen-arts-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (vraag, juist antwoord, [3 foute], uitleg), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Dutch decimal comma, minus sign or hyphen, optional "·10⁻³"
power of ten, e.g. "0,40 mol/L", "1,6·10⁻¹³ N", "−11", "75 %") are sorted ascending instead,
and the key's letter is found after sorting (asserted against the key text).
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 10/10/10/10 KIW + 4 EMCO + 6 VAARDIG, pools 4x.
ORDER = [("biologie", 40), ("fysica", 40), ("chemie", 40), ("wiskunde", 40),
         ("emco", 16), ("vaardig", 24)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "be-toelatingsexamen-arts-questions.json")
SUP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻", "0123456789-")
NUM = re.compile(r"^([−-]?\d+(?:,\d+)?)(?:·10([⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?(?:\s*(\S+))?$")
BAD = ["\u2014", "– ", '"', "Alle bovenstaande", "Geen van de bovenstaande", "Alle antwoorden"]
LETTER_REF = re.compile(r"\b[ABCD]\s+(en|of)\s+[ABCD]\b")

def val(o):
    m = NUM.match(o)
    if not m:
        return None
    v = float(m.group(1).replace("−", "-").replace(",", "."))
    if m.group(2):
        v *= 10 ** int(m.group(2).translate(SUP))
    return v, (m.group(3) or "")

def numeric(opts):
    parts = [val(o) for o in opts]
    if not all(parts) or len({p[1] for p in parts}) != 1:
        return None
    return [p[0] for p in parts]

rows = []
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        for o in [key] + list(wrong):
            assert not LETTER_REF.search(o), (m, i, "letter ref", o)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            assert len(set(vals)) == 4, (m, i, "equal values")
            opts = sorted([key] + list(wrong), key=lambda o: val(o)[0])
            k = opts.index(key)
            assert opts[k] == key
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "BETOEL", "state": "ALL", "questionId": f"BETOEL-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
