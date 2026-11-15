#!/usr/bin/env python3
"""Build the AFOQT v2 bank from Python-data sources.

Usage: python3 -I tools/next100/afoqt/build.py

Sources: verbal.py (Verbal Analogies, Word Knowledge), quant.py (Arithmetic
Reasoning, Math Knowledge), reading.py (Reading Comprehension, with STIMULI),
science.py (Physical Science, Aviation Information). Table Reading items are
generated here from seeded number grids, so every key is computed.

  Q(test, domain, difficulty, skill, stem, [key, wrong x4], explanation, stim=None, basics=None, v=None)
      Five options like the AFOQT. The key is written first; the build rotates it
      over A to E and orders the wrong options by a seed from the stem. Options that
      are all numbers with one shared unit are sorted ascending and locked instead,
      and v (the computed answer) must match the key's number.
test is 1 or 2 (a practice-test item) or 0 (drill only). Sections run in the
Form T order: VA, AR, WK, MK, RC, PS, TR, AI. Ids: AFOQT-T<n>-NNN and AFOQT-D-NNN.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "AFOQT"

DOMAIN_CODES = {
    "VA": "afoqtVerbal", "AR": "afoqtArithmetic", "WK": "afoqtWord", "MK": "afoqtMath",
    "RC": "afoqtReading", "PS": "afoqtScience", "TR": "afoqtTable", "AI": "afoqtAviation",
}
# (section key, domain, per practice test, drill only)
SECTIONS = [
    ("va", "afoqtVerbal", 12, 6),
    ("ar", "afoqtArithmetic", 12, 6),
    ("wk", "afoqtWord", 12, 6),
    ("mk", "afoqtMath", 12, 6),
    ("rc", "afoqtReading", 12, 6),
    ("ps", "afoqtScience", 10, 6),
    ("tr", "afoqtTable", 20, 8),
    ("ai", "afoqtAviation", 10, 6),
]
SECTION_OF = {d: s for s, d, _, _ in SECTIONS}
# The Basics each drill opens with (lib/v2/exams/afoqt.ts). A basics tag must
# name a skill of its own drill, or its brush-up card can never show.
DRILL_BASICS = {
    "afoqtArithmetic": ["wordProblems", "percents", "ratios", "rateProblems"],
    "afoqtMath": ["solveX", "exponentRules", "factoring", "pythagorean", "inequalities"],
}


def Q(test, domain, d, skill, stem, opts, expl, stim=None, basics=None, v=None):
    assert len(opts) == 5, stem
    return {"test": test, "domain": DOMAIN_CODES[domain], "difficulty": d, "skill": skill, "stem": stem,
            "options": list(opts), "explanation": expl, "stim": stim, "basics": basics, "v": v}


NUM = re.compile(r"^(?:\\\$)?(-?\d[\d,]*(?:\.\d+)?)(?: ?(.*))?$")


def parse_num(s):
    """(value, unit) for '12.5 minutes', '\\$46.00', '-12', '9.8 m/s²'; None otherwise."""
    if "$" in s.replace("\\$", ""):
        return None
    m = NUM.match(s.strip())
    if not m:
        return None
    unit = (m.group(2) or "").strip()
    if unit and not re.fullmatch(r"[A-Za-zΩ°²³·/ .]+", unit):
        return None
    return float(m.group(1).replace(",", "")), unit


def load(name):
    g = {"Q": Q, **{k: k for k in DOMAIN_CODES}}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def seed(text):
    return int(hashlib.sha256(text.encode()).hexdigest()[:12], 16)


# ---------------- Table Reading ----------------
XS = list(range(-3, 4))
YS = list(range(3, -4, -1))


def signed(n):
    return f"+{n}" if n > 0 else str(n)


def make_table(tid, n_items, test):
    rng = random.Random(seed(tid))
    while True:
        grid = {(x, y): rng.randint(10, 99) for x in XS for y in YS}
        # Neighbors in a row or column differ, so a slip of one cell always changes the answer.
        ok = all(grid[(x, y)] != grid.get((x + 1, y)) and grid[(x, y)] != grid.get((x, y - 1)) for x in XS for y in YS)
        if ok:
            break
    head = "| Y / X | " + " | ".join(signed(x) for x in XS) + " |"
    sep = "|" + "---|" * (len(XS) + 1)
    rows = [f"| **{signed(y)}** | " + " | ".join(str(grid[(x, y)]) for x in XS) + " |" for y in YS]
    text = ("X values run across the top and Y values down the left side. Each entry is the value where its "
            "column and row meet.\n\n" + "\n".join([head, sep, *rows]))
    stim = {"id": tid, "title": "Table Reading", "text": text}
    coords = [(x, y) for x in XS for y in YS]
    rng.shuffle(coords)
    items = []
    for (x, y) in coords:
        if len(items) == n_items:
            break
        key = grid[(x, y)]
        cands, where = [], []
        for c in [(y, x), (x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1), (-x, y), (x, -y)]:
            if c in grid and c != (x, y) and grid[c] != key and grid[c] not in cands:
                cands.append(grid[c])
                where.append(c)
        if len(cands) < 4:
            continue
        wrong = cands[:4]

        def place(c):
            cx, cy = c
            at = f"{grid[c]} is at X = {signed(cx)}, Y = {signed(cy)}"
            if c == (y, x):
                return at + ", with X and Y swapped"
            if abs(cx - x) + abs(cy - y) == 1:
                return at + ", one cell away"
            if cx == -x:
                return at + ", where X has the wrong sign"
            return at + ", where Y has the wrong sign"
        why = "; ".join(place(c) for c in where[:4])
        why = why[0].upper() + why[1:]
        expl = (f"Go across to the X = {signed(x)} column and down to the Y = {signed(y)} row: the entry is {key}. "
                + why + ".")
        items.append({"test": test, "domain": "afoqtTable", "difficulty": 1, "skill": "Reading a table",
                      "stem": f"What is the entry at X = {signed(x)}, Y = {signed(y)}?",
                      "options": [str(key)] + [str(w) for w in wrong], "explanation": expl,
                      "stim": tid, "basics": None, "v": key})
    assert len(items) == n_items, tid
    return stim, items


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’‘“”"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 5:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-e] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if not q["stem"].rstrip().endswith(("?", ":")):
        warn.append("stem does not end in ? or :")
    b = q["basics"]
    if b and b not in DRILL_BASICS.get(q["domain"], []):
        warn.append(f"basics tag {b} not opened by its drill")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, items = [], []
    for name in ("verbal", "quant", "reading", "science"):
        st, it = load(name)
        stimuli += st
        items += it
    for test, tabs in ((1, [("AFOQT-T1-TR1", 10), ("AFOQT-T1-TR2", 10)]),
                       (2, [("AFOQT-T2-TR1", 10), ("AFOQT-T2-TR2", 10)]),
                       (0, [("AFOQT-D-TR1", 8)])):
        for tid, n in tabs:
            st, it = make_table(tid, n, test)
            stimuli.append(st)
            items += it
    for s in stimuli:
        if any(ch in s["text"] + s["title"] for ch in "—–’‘“”"):
            raise SystemExit(f"dash or curly quote in stimulus {s['id']}")

    out, warnings = [], []
    rot = Counter()
    used_letters = Counter()
    longest = Counter()

    def emit(q, qid, test):
        warnings.extend(lint(q, qid))
        sec = SECTION_OF[q["domain"]]
        opts = q["options"]
        item = {"id": qid, "section": sec, "test": test, "module": 1, "domain": q["domain"],
                "skill": q["skill"], "difficulty": q["difficulty"], "format": "single"}
        if q["basics"]:
            item["basics"] = q["basics"]
        if q["stim"]:
            item["stimulusId"] = q["stim"]
        nums = [parse_num(o) for o in opts]
        locked = False
        if all(n is not None for n in nums) and len({n[1] for n in nums}) == 1:
            vals = [n[0] for n in nums]
            assert len(set(vals)) == 5, ("duplicate number", q["stem"])
            if q["v"] is not None:
                assert abs(vals[0] - q["v"]) < 1e-6, ("key does not match computed value", q["stem"], vals[0], q["v"])
            order = sorted(range(5), key=lambda i: vals[i])
            locked = True
            key_at = order.index(0)
        else:
            if q["v"] is not None and nums[0] is not None:
                assert abs(nums[0][0] - q["v"]) < 1e-6, ("key does not match computed value", q["stem"])
            rng = random.Random(seed(q["stem"] + q["options"][0]))
            rest = [1, 2, 3, 4]
            rng.shuffle(rest)
            # Balance the letters across the bank: locked number items put their keys where
            # the value falls, so the unlocked ones take whichever letter is used least so far.
            target = min(range(5), key=lambda i: (used_letters[i], (i - rot[sec]) % 5))
            rot[sec] += 1
            order = rest[:target] + [0] + rest[target:]
            key_at = target
            lens = sorted(len(o) for o in opts)
            if len(opts[0]) == lens[-1] and lens[-1] != lens[-2]:
                longest[sec] += 1
            wrong_avg = sum(len(o) for o in opts[1:]) / 4
            if len(opts[0]) > 1.4 * wrong_avg and len(opts[0]) > 12:
                warnings.append(f"{qid}: key much longer than the wrong options")
        item.update({"stem": q["stem"], "options": [opts[i] for i in order], "correct": [key_at]})
        used_letters[key_at] += 1
        if locked:
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    for test in (1, 2):
        n = 0
        for sec, dom, per_test, _ in SECTIONS:
            mine = [q for q in items if q["test"] == test and q["domain"] == dom]
            assert len(mine) == per_test, (sec, test, len(mine), per_test)
            for q in mine:
                assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-T{test}-"), (sec, q["stem"])
                n += 1
                emit(q, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for sec, dom, _, drill_only in SECTIONS:
        mine = [q for q in items if q["test"] == 0 and q["domain"] == dom]
        assert len(mine) == drill_only, (sec, "drill", len(mine), drill_only)
        for q in mine:
            assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-D-"), (sec, q["stem"])
            n += 1
            emit(q, f"{PREFIX}-D-{n:03d}", 0)

    used = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    assert set(used) == {s["id"] for s in stimuli}, ("stimulus not used or unknown", set(used) ^ {s["id"] for s in stimuli})
    stems = Counter(q["stem"] for q in out if not q.get("stimulusId"))
    for s, k in stems.items():
        if k > 1:
            warnings.append(f"duplicate stem: {s}")
    dst = os.path.join(ROOT, "data/v2/afoqt/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    letters = Counter("ABCDE"[q["correct"][0]] for q in out)
    for w in warnings:
        print("  WARN", w)
    print(f"afoqt: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")
    print("  keys:", dict(sorted(letters.items())))
    print("  key strictly longest (unlocked), by section:", dict(longest), "of", dict(rot))
    if warnings:
        raise SystemExit(1)


if __name__ == "__main__":
    build()
