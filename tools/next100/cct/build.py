"""Build data/cct-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random, re, hashlib, math
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["pre", "ecg", "ana", "str", "amb", "atr", "blk", "ven", "mea"]
POOLS = {"cctPreProc": 20, "cctResting": 28, "cct12Lead": 44, "cctStress": 20, "cctAmbulatory": 8,
         "cctSinusAtrial": 24, "cctJunctBlocks": 20, "cctVentPaced": 20, "cctMeasure": 16}

def rate(boxes): return 1500 / boxes
# Every computed key, recomputed here independently of the q_*.py files (stem fragment -> key).
CHECKS = {
    "S in V1 is 18 mm and R in V5 is 22 mm": f"{18 + 22} mm, meets LVH criteria",
    "S in V3 of 14 mm and R in aVL of 9 mm": f"{14 + 9} mm, meets LVH criteria",
    "S in V3 of 12 mm and R in aVL of 13 mm": f"{12 + 13} mm, below LVH criteria",
    "QT is 0.40 s and the RR interval is 0.64 s": f"{0.40 / math.sqrt(0.64):.2f} s",
    "reaches 8 METs": f"{8 * 3.5:g} mL/kg/min",
    "heart rate is 150 and systolic pressure is 180": f"{150 * 180:,}",
    "Flutter waves are 5 small boxes apart": f"{rate(5):g} per minute",
    "conducts with 4:1 block": f"{300 // 4} per minute",
    "13 QRS complexes in 6 seconds": f"{13 * 10} per minute",
    "R waves 30 small boxes apart": f"{rate(30):g} per minute",
    "R waves 12 small boxes apart": f"{rate(12):g} per minute",
    "R waves are 1.50 seconds apart": f"{60 / 1.50:g} per minute",
    "Sinus P waves at 84 with 2:1": f"{84 // 2} per minute",
    "R waves 8 small boxes apart": f"About {round(rate(8))} per minute",
    "spikes are 25 small boxes apart": f"{60 / (25 * 0.04):g} per minute",
    "R waves 3 large boxes apart": f"{300 / 3:g} per minute",
    "R waves 10 small boxes apart": f"{rate(10):g} per minute",
    "strip holds 7 QRS": f"{7 * 10} per minute",
    "R waves fall 0.75 s apart": f"{60 / 0.75:g} per minute",
    "PR interval spans 4 small boxes": f"{4 * 0.04:.2f} s, normal",
    "QRS spans 2.5 small boxes": f"{2.5 * 0.04:.2f} s",
    "QT spans 10 small boxes": f"{10 * 0.04:.2f} s",
    "PR interval spans 8 small boxes": f"{8 * 0.02:.2f} s",
    "Sinus pause": None,
}
CHECKS = {k: v for k, v in CHECKS.items() if v}
NUM = re.compile(r"^(About )?-?[0-9][0-9,]*(\.[0-9]+)?( |$)")

def num(o):
    return float(re.sub(r"^About ", "", o).split(" ")[0].replace(",", ""))

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "cct-questions.json")
rows, checked = [], 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (mod.CAT, len(mod.Q))
    slots = [j % 4 for j in range(len(mod.Q))]
    random.Random("cct-" + mod.CAT).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        for frag, want in CHECKS.items():
            if frag in q:
                assert key == want, (m, i, key, want); checked += 1
        allnum = all(NUM.match(o) for o in [key] + list(wrong))
        units = {o.split(" ", 1)[1] if " " in re.sub(r"^About ", "", o) else "" for o in [key] + list(wrong)}
        if allnum and len(units) == 1:
            opts = sorted([key] + list(wrong), key=num)
            k = opts.index(key)
        else:
            k = slots[i]
            rng = random.Random(hashlib.sha1(q.encode()).hexdigest())
            opts = list(wrong); rng.shuffle(opts); opts.insert(k, key)
        rows.append({"type": "CCT", "state": "ALL", "questionId": f"CCT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert checked == len(CHECKS), (checked, len(CHECKS))
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out)
