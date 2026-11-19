"""Build data/excpt-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random, re, hashlib
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["rol", "law", "csa", "cls", "top", "int", "dsp", "cal", "cmp", "saf"]
POOLS = {"excptRole": 28, "excptLaws": 20, "excptControlled": 12, "excptClasses": 16,
         "excptTopDrugs": 12, "excptIntake": 24, "excptDispense": 24, "excptCalc": 16,
         "excptCompound": 20, "excptSafety": 28}

# Every computed key, recomputed here independently of q_cal.py (stem fragment -> expected key).
CHECKS = {
    "1.5 teaspoons": f"{1.5 * 5:g} mL",
    "weighs 77 lb": f"{77 / 2.2:g} kg",
    "Cephalexin 500 mg": f"{500 * 4 / 1000:g} g",
    "56 tablets, sig 2 tabs po bid": f"{56 / 4:g} days",
    "1 cap po q6h for 7 days": f"{24 / 6 * 7:g} capsules",
    "400 mg of a suspension labeled 250 mg/5 mL": f"{400 * 5 / 250:g} mL",
    "77 degrees F": f"{(77 - 32) * 5 / 9:g} degrees C",
    "250 mL of a 0.9%": f"{0.9 * 250 / 100:g} g",
    "25% stock solution": f"{5 * 200 / 25:g} mL",
    "10% and 2% ointment": f"{120 * 3 / 8:g} g of 10% and {120 * 5 / 8:g} g of 2%",
    "1:200": f"{100 / 200:g}%",
    "20 mEq per 15 mL": f"{30 * 15 / 20:g} mL",
    "1,000 mL IV bag": f"{1000 / 8:g} mL/hr",
    "Clark's rule": f"{30 * 300 / 150:g} mg",
    "costs the pharmacy $20": f"{(26 - 20) * 100 / 20:g}%",
    "2:30 PM": f"{2 + 12}30",
}

NUM = re.compile(r"^[0-9][0-9,]*(\.[0-9]+)?")


def num(o):
    return float(NUM.match(o).group(0).replace(",", ""))


out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "excpt-questions.json")
rows, checked = [], 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (mod.CAT, len(mod.Q))
    # Seeded, balanced key slots per category: each letter equally often, order not tied to ID.
    slots = [j % 4 for j in range(len(mod.Q))]
    random.Random("excpt-" + mod.CAT).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        for frag, want in CHECKS.items():
            if frag in q:
                assert key == want, (m, i, key, want); checked += 1
        if all(NUM.match(o) for o in [key] + list(wrong)):
            # All-number options stay in ascending order, so the key's slot follows from the sort.
            opts = sorted([key] + list(wrong), key=num)
            k = opts.index(key)
        else:
            k = slots[i]
            rng = random.Random(hashlib.sha1(q.encode()).hexdigest())
            opts = list(wrong); rng.shuffle(opts); opts.insert(k, key)
        rows.append({"type": "EXCPT", "state": "ALL", "questionId": f"EXCPT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert checked == len(CHECKS), (checked, len(CHECKS))
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out)
