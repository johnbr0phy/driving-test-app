"""Build data/danb-rhs-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random, re, hashlib
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["lmk", "pur", "tec", "err", "phy", "pro", "ice", "ppe"]
POOLS = {"drhsLandmarks": 24, "drhsPurpose": 24, "drhsTechnique": 28, "drhsErrors": 24,
         "drhsPhysics": 24, "drhsProtection": 28, "drhsInfEquip": 24, "drhsInfPpe": 24}

CHECKS = {
    "10 mGy equals": f"{10 * 1:g} mSv",
    "One gray equals": f"{100} rad",
}
NUM = re.compile(r"^(About )?-?[0-9][0-9,]*(\.[0-9]+)?( |$)")
NUMS = re.compile(r"-?\d+(?:\.\d+)?")

def num(o):
    return float(re.sub(r"^About ", "", o).split(" ")[0].replace(",", ""))

out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "danb-rhs-questions.json")
rows, checked, problems = [], 0, []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (mod.CAT, len(mod.Q))
    slots = [j % 4 for j in range(len(mod.Q))]
    random.Random("danbrhs-" + mod.CAT).shuffle(slots)
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
        rows.append({"type": "DANBRHS", "state": "ALL", "questionId": f"DRHS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
for pr in problems: print("KEY-ORDER", pr)
assert not problems
assert checked == len(CHECKS), (checked, len(CHECKS))
assert len(rows) == 200
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out, "| computed keys checked:", checked)
