"""Build data/ascp-mls-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, math, random, sys, os
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["bpr", "bsr", "urn", "chg", "chs", "hem", "hst", "imm", "mic", "ops"]
POOLS = {"mlsBbProd": 16, "mlsBbSero": 24, "mlsUa": 16, "mlsChemGen": 20, "mlsChemSpec": 16,
         "mlsHeme": 24, "mlsHemost": 16, "mlsImmuno": 16, "mlsMicro": 36, "mlsOps": 16}

def fmt(x, d=0):
    return f"{x:,.{d}f}"

# Every computed key, recomputed here from the numbers in the stem (stem fragment -> expected key).
CHECKS = {
    # corrected count increment = (post - pre) x BSA / dose (x10^11)
    "corrected count increment": fmt((30 - 10) * 1000 * 1.8 / 3.6),
    # RhIG: fetal bleed (mL) = % fetal cells x 5,000 / 100; vials = round(bleed / 30) + 1
    "Kleihauer-Betke stain shows 1.3%": f"{round(1.3 * 5000 / 100 / 30) + 1} vials",
    # Henderson-Hasselbalch
    "Bicarbonate is 12 mmol/L": f"{6.1 + math.log10(12 / (0.03 * 40)):.2f}",
    # TIBC = iron + UIBC
    "unsaturated iron-binding capacity is 270": f"{90 + 270} µg/dL",
    # MCHC = Hgb / Hct x 100
    "Hemoglobin is 10.5 g/dL and hematocrit is 35%": f"{10.5 / 35 * 100:.1f} g/dL",
    # corrected reticulocyte = retic x Hct / 45
    "corrected reticulocyte count": f"{6.0 * 27 / 45:.1f}%",
    # hemocytometer: 9 squares x 1 mm2 x 0.1 mm = 0.9 uL, undiluted
    "nine large squares": f"{round(45 / (9 * 1 * 0.1))} cells/µL",
    # absolute CD4 = WBC x lymph% x CD4%
    "absolute CD4 count": f"{round(5000 * 0.30 * 0.20)} cells/µL",
    # INR = (PT / MNPT) ^ ISI
    "the ISI is 1.5": f"{(24 / 12) ** 1.5:.1f}",
    # CV = SD / mean x 100
    "coefficient of variation": f"{10 / 250 * 100:.1f}%",
    # NPV = TN / (TN + FN)
    "negative predictive value": f"{round(190 / (190 + 10) * 100)}%",
    # serial dilution: factors multiply
    "diluted 1:4, and that dilution": f"{12 * 4 * 5} mg/dL",
    # mmol/L -> mg/dL: x atomic mass (mg/mmol), / 10 (L -> dL)
    "A calcium of 2.5 mmol/L": f"{round(2.5 * 40 / 10)} mg/dL",
}
# Numbers quoted in explanations that the build also checks.
assert abs(60 / 2.0 - 30) < 1e-9          # BUN/creatinine ratio in CHG
assert round(90 / 360 * 100) == 25        # transferrin saturation in CHS explanation
assert round(1.3 * 5000 / 100 / 30, 1) == 2.2

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "ascp-mls-questions.json")
rows = []
checked = set()
# Seeded, balanced key slots: 50 per letter, shuffled once with a fixed seed.
SLOTS = [0, 1, 2, 3] * 50
random.Random(20261118).shuffle(SLOTS)
slot_i = 0
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
                assert key == want, (m, i, key, want); checked.add(frag)
                assert want.split()[0] in expl, (m, i, "key value missing from explanation")
        k = SLOTS[slot_i]; slot_i += 1
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ASCPMLS", "state": "ALL", "questionId": f"MLS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert checked == set(CHECKS), set(CHECKS) - checked
assert slot_i == len(SLOTS), slot_i
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, f"({len(checked)} computed keys checked)")
