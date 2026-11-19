"""Build data/ascp-ht-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["fix", "pro", "emb", "snc", "sct", "smp", "ops"]
POOLS = {"htFix": 40, "htProc": 28, "htEmbed": 40, "htStainNuc": 24, "htStainCt": 24, "htStainPig": 20, "htOps": 24}

# Every computed key, recomputed here (stem fragment -> expected key).
CHECKS = {
    "0.5% w/v": f"{0.5 / 100 * 250:g} g",
    "80% ethanol": f"{80 * 200 / 100:g} mL",
    "0.2 M solution": f"{0.2 * 0.5 * 74.5:g} g",
    "4 µm is how thick": f"{4 / 1000:g} mm",
    "1:10 dilution": f"{50 / 10:g} mL",
    "10x eyepiece": f"{10 * 40:g}x",
}

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "ascp-ht-questions.json")
rows = []
checked = 0
# Seeded, balanced key slots: 50 per letter, shuffled once with a fixed seed.
SLOTS = [k for k in range(4) for _ in range(50)]
random.Random("ascpht-keys-2026").shuffle(SLOTS)
n = 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (mod.CAT, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i)
        assert len(set(wrong)) == 3, (m, i)
        for frag, want in CHECKS.items():
            if frag in q:
                assert key == want, (m, i, key, want); checked += 1
        k = SLOTS[n]; n += 1
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ASCPHT", "state": "ALL", "questionId": f"HT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert checked == len(CHECKS), checked
assert n == len(SLOTS), (n, len(SLOTS))
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
