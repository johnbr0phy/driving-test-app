"""Build data/acls-questions.json from q_*.py. Usage: python3 -I build.py [out]"""
import importlib.util, json, sys, os, random, re, hashlib
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["tea", "bls", "arr", "rhy", "pca", "spc", "acs"]
POOLS = {"aclsTeam": 16, "aclsBls": 32, "aclsArrest": 40, "aclsRhythm": 36,
         "aclsPost": 28, "aclsSpecial": 20, "aclsAcsStroke": 28}

NUM = re.compile(r"^[0-9][0-9,]*(\.[0-9]+)?")


def num(o):
    return float(NUM.match(o).group(0).replace(",", ""))


out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "acls-questions.json")
mods = []
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[mod.CAT], (mod.CAT, len(mod.Q))
    mods.append(mod)


def is_num(key, wrong):
    return all(NUM.match(o) for o in [key] + list(wrong))


# All-number options stay in ascending order, so their key slot follows from the sort. The
# other items get seeded slots that bring every letter to exactly 50 across the bank.
fixed = [sorted([k] + list(w), key=num).index(k) for mod in mods for (q, k, w, e) in mod.Q if is_num(k, w)]
need = [50 - fixed.count(i) for i in range(4)]
slots = [i for i in range(4) for _ in range(need[i])]
random.Random("acls-slots").shuffle(slots)
rows = []
for mod in mods:
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (mod.CAT, i)
        if is_num(key, wrong):
            opts = sorted([key] + list(wrong), key=num)
            k = opts.index(key)
        else:
            k = slots.pop()
            rng = random.Random(hashlib.sha1(q.encode()).hexdigest())
            opts = list(wrong); rng.shuffle(opts); opts.insert(k, key)
        rows.append({"type": "ACLS", "state": "ALL", "questionId": f"ACLS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
assert not slots
assert len(rows) == 200, len(rows)
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2); f.write("\n")
print(len(rows), "rows ->", out)
