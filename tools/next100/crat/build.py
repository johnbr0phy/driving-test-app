"""Build data/crat-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random, re, hashlib
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["ini", "tst", "nrm", "atr", "jav", "ven", "pac", "fnd"]
POOLS = {"cratInit": 20, "cratTests": 16, "cratNormal": 32, "cratAtrial": 36, "cratJunctAV": 28,
         "cratVent": 28, "cratPaced": 28, "cratFindings": 12}

def rate(boxes): return 1500 / boxes
def pm(x): return f"{x:g} per minute"
# Every computed key, recomputed here independently of the q_*.py files (stem fragment -> key).
CHECKS = {
    "R waves 15 small boxes apart": pm(rate(15)),
    "R waves 6 large boxes apart": pm(300 / 6),
    "R-R interval of a regular rhythm is 0.48 s": pm(60 / 0.48),
    "holds 11 QRS complexes": pm(11 * 10),
    "PR interval spans 5.5 small boxes": f"{5.5 * 0.04:.2f} s, prolonged",
    "QRS spans 2 small boxes": f"{2 * 0.04:.2f} s",
    "contains 16 QRS complexes": pm(16 * 10),
    "Flutter waves occur at 280 per minute": pm(280 / 2),
    "Flutter waves are 6 small boxes apart": pm(rate(6)),
    "Flutter at 240 per minute conducts 3:1": pm(240 / 3),
    "atrial rate is 90, and every other P": pm(90 / 2),
    "PR interval spans 7 small boxes": f"{7 * 0.04:.2f} s",
    "PRs measure 0.20, 0.26 and 0.30 s": f"{0.30 - 0.20:.2f} s",
    "holds 17 QRS complexes": pm(17 * 10),
    "7 small boxes apart. What is the rate": f"About {round(rate(7))} per minute",
    "spikes are 20 small boxes apart": pm(rate(20)),
    "spikes are 5 large boxes apart": pm(300 / 5),
    "A QRS spans 3 small boxes": f"{3 * 0.04:.2f} s, wide QRS",
    "standardization mark on a monitor strip is 20 mm": "20 mm/mV, double gain",
    "large box?": f"{5 * 0.04:.2f} s",
}
NUM = re.compile(r"^(About )?-?[0-9][0-9,]*(\.[0-9]+)?( |$)")
NUMS = re.compile(r"-?\d+(?:\.\d+)?")

def num(o):
    return float(re.sub(r"^About ", "", o).split(" ")[0].replace(",", ""))

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "crat-questions.json")
rows, checked, problems = [], 0, []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (mod.CAT, len(mod.Q))
    slots = [j % 4 for j in range(len(mod.Q))]
    random.Random("crat-" + mod.CAT).shuffle(slots)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        for frag, want in CHECKS.items():
            if frag in q:
                assert key == want, (m, i, key, want); checked += 1
        # KEY-ORDER check: a numeric key's number must appear in the explanation, and no wrong
        # option's leading number may be the explanation's final number.
        kn = NUMS.findall(key)
        if kn:
            en = NUMS.findall(expl)
            if kn[0] not in en:
                problems.append((m, i, "key number not in explanation", key))
            for w in wrong:
                wn = NUMS.findall(w)
                if wn and en and wn[0] == en[-1] and wn[0] not in kn:
                    problems.append((m, i, "explanation ends on a wrong option's number", w))
        allnum = all(NUM.match(o) for o in [key] + list(wrong))
        units = {o.split(" ", 1)[1] if " " in re.sub(r"^About ", "", o) else "" for o in [key] + list(wrong)}
        if allnum and len(units) == 1:
            opts = sorted([key] + list(wrong), key=num)
            k = opts.index(key)
        else:
            k = slots[i]
            rng = random.Random(hashlib.sha1(q.encode()).hexdigest())
            opts = list(wrong); rng.shuffle(opts); opts.insert(k, key)
        rows.append({"type": "CRAT", "state": "ALL", "questionId": f"CRAT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
for pr in problems: print("KEY-ORDER", pr)
assert not problems
assert checked == len(CHECKS), (checked, len(CHECKS))
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out, "| computed keys checked:", checked)
