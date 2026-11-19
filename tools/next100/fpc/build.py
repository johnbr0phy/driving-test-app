"""Build data/fpc-questions.json from q_*.py.

Usage: python3 -I build.py [out]

Each source item is (stem, key, [three wrong options], explanation[, meta]). meta {"num": True}
marks an item whose options are all numbers: they are sorted ascending and the key lands where it
falls. meta {"chk": value} also asserts that the key equals the value computed in the source, so
every calculated answer is recomputed at build time. Other items get key letters from a seeded,
per-category bag that balances A to D, so there is no fixed letter cycle.
"""
from __future__ import annotations
import hashlib, importlib.util, json, os, random, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["status", "tax", "compliance", "gross", "net", "systems", "admin", "audit", "accounting"]
POOLS = {"fpcStatus": 28, "fpcTax": 28, "fpcCompliance": 24, "fpcGross": 24, "fpcNet": 24,
         "fpcSystems": 28, "fpcAdmin": 12, "fpcAudit": 16, "fpcAccounting": 16}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "fpc-questions.json")
sys.dont_write_bytecode = True


def value(s: str) -> float:
    nums = re.findall(r"-?\d[\d,]*\.?\d*", s)
    assert nums, s
    return float(nums[-1].replace(",", ""))


def check_key(key: str, chk: float, where: str) -> None:
    if key.startswith("$") and "." in key:
        want = f"${chk:,.2f}"
        assert key == want, f"{where}: key {key} != computed {want}"
    else:
        assert abs(value(key) - chk) < 0.005, f"{where}: key {key} != computed {chk}"


rows = []
for m in ORDER:
    spec = importlib.util.spec_from_file_location(m, os.path.join(HERE, "q_" + m + ".py"))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    items = mod.Q
    assert len(items) == POOLS[mod.CAT], (mod.CAT, len(items))
    placed = {}
    for i, it in enumerate(items):
        q, key, wrong = it[0], it[1], it[2]
        meta = it[4] if len(it) > 4 else {}
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        if "chk" in meta:
            check_key(key, meta["chk"], f"{mod.SEG}-{i+1:03d}")
        if meta.get("num"):
            opts = sorted([key] + list(wrong), key=value)
            assert len({value(o) for o in opts}) == 4, (m, i, opts)
            placed[i] = opts
    # balance the remaining keys: each letter n/4 per category, minus what numeric items used
    n = len(items)
    need = {k: n // 4 for k in range(4)}
    for i, opts in placed.items():
        need[opts.index(items[i][1])] -= 1
    bag = []
    for k in range(4):
        bag += [k] * max(0, need[k])
    free = [i for i in range(n) if i not in placed]
    while len(bag) < len(free):
        bag.append(min(range(4), key=lambda k: bag.count(k)))
    rnd = random.Random(int(hashlib.sha1(mod.CAT.encode()).hexdigest(), 16))
    for _ in range(200):
        rnd.shuffle(bag)
        seq = [None] * n
        for i, opts in placed.items():
            seq[i] = opts.index(items[i][1])
        for i, k in zip(free, bag):
            seq[i] = k
        if all(not (seq[j] == seq[j + 1] == seq[j + 2]) for j in range(n - 2)):
            break
    for i, it in enumerate(items):
        q, key, wrong, expl = it[0], it[1], it[2], it[3]
        if i in placed:
            opts = placed[i]
        else:
            others = list(wrong)
            random.Random(q).shuffle(others)
            opts = others[:]
            opts.insert(seq[i], key)
        k = opts.index(key)
        rows.append({"type": "FPC", "state": "ALL", "questionId": f"FPC-{mod.SEG}-{i+1:03d}",
                     "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1],
                     "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[k],
                     "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
from collections import Counter
print(len(rows), "rows ->", out, dict(sorted(Counter(r["correctAnswer"] for r in rows).items())))
