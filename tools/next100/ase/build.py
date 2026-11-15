"""Build data/ase-questions.json from q_a1.py .. q_a8.py. Usage: python3 -I build.py [out]

ASE Automobile and Light Truck tests A1 to A8. Every item is original, written from ASE's 2026
Automobile Study Guide task lists and the primary rules in sources.md. One category per A-test,
40 items each (320 in all). Inside a category the ASE content areas (tagged A, B, C... in the
sources) are interleaved in id order, so each practice test's slice of the pool spreads over the
content areas in about the official proportions. Keys are written first; the key moves to slot
i % 4 so each letter lands at exactly 25%.
"""
import importlib.util, json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
POOL = 40
ORDER = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "ase-questions.json")


def interleave(items):
    """Spread items over the pool by content area: sort by (j + 0.5) / n within each area."""
    by_area = {}
    for it in items:
        by_area.setdefault(it[0], []).append(it)
    keyed = []
    for ai, (area, lst) in enumerate(by_area.items()):
        for j, it in enumerate(lst):
            keyed.append(((j + 0.5) / len(lst), ai, it))
    keyed.sort(key=lambda t: (t[0], t[1]))
    return [t[2] for t in keyed]


rows = []
stems = set()
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    if not os.path.exists(p):
        continue
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOL, (m, len(mod.Q), POOL)
    for i, (area, q, key, wrong, expl) in enumerate(interleave(mod.Q)):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "key repeated")
        assert q not in stems, (m, q, "stem repeated")
        stems.add(q)
        assert "—" not in q + key + "".join(wrong) + expl, (m, i, "em-dash")
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ASE", "state": "ALL", "questionId": f"ASE-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
