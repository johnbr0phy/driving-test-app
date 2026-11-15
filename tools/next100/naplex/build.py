#!/usr/bin/env python3
"""Build the NAPLEX v2 bank.

Usage: python3 -I tools/next100/naplex/build.py

Sources are Python data files next to this script, src_<domain>.py, each
defining ITEMS, a list of tuples:
  ("S", test, difficulty, skill, stem, [key, d1, d2, d3], explanation)
  ("M", test, difficulty, skill, stem, [opt, ...], [correct indices], explanation)
        select all that apply; the stem says "Select all that apply."
  ("N", test, difficulty, skill, stem, ["answer", ...], explanation, whole)
        constructed response; the stem says how to round and "Type the number only."
  ("O", test, difficulty, skill, stem, [step1, step2, ...], explanation)
        ordered response; steps are written in the correct order.
test is 1, 2 or 0 (drill only). Single and multi options are shuffled with a
seed taken from the stem, so key positions spread out and stay stable from
build to build (the app shuffles again at runtime). Order steps are stored
shuffled with the key listing the right sequence.

Ids follow tools/build_v2_bank.py: NAPLEX-T1-001.., -T2-.., -D-.., each test
interleaving its domains so a test reads like a mixed paper.

Lint (printed, never fatal): key longest by a clear margin, numeric stems
that do not say "Type the number only", numeric answers with characters other
than digits . / -, em or en dashes, "all/none of the above", duplicate stems.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "naplex"
PREFIX = "NAPLEX"
SECTION = "naplex"
# Per practice test (100 items), scaled from the NABP NAPLEX Content Outline
# (effective May 1, 2025): Domain 1 25%, Domain 2 25%, Domain 3 40%,
# Domain 4 5%, Domain 5 5%. Domains 1 to 3 are split into drill domains.
PLAN = {
    "napFoundations": 13, "napCalc": 12,                 # Domain 1 (25)
    "napOrders": 15, "napHandling": 10,                  # Domain 2 (25)
    "napTherapy": 20, "napMonitor": 10, "napCounsel": 10,  # Domain 3 (40)
    "napPractice": 5,                                    # Domain 4 (5)
    "napManage": 5,                                      # Domain 5 (5)
}
DOMAINS = list(PLAN)
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def seed_for(text):
    return int(hashlib.sha256(text.encode()).hexdigest()[:12], 16)


def load(domain):
    path = os.path.join(HERE, f"src_{domain}.py")
    scope = {}
    exec(compile(open(path).read(), path, "exec"), scope)
    out = []
    for t in scope["ITEMS"]:
        kind = t[0]
        if kind == "S":
            _, test, diff, skill, stem, opts, expl = t
            q = {"format": "single", "options": list(opts), "correct": [0]}
        elif kind == "M":
            _, test, diff, skill, stem, opts, cor, expl = t
            q = {"format": "multi", "options": list(opts), "correct": sorted(cor)}
        elif kind == "N":
            _, test, diff, skill, stem, answers, expl, whole = t
            q = {"format": "numeric", "numeric": {"answers": list(answers), "tolerance": 0}}
            if whole:
                q["numeric"]["wholeNumber"] = True
        elif kind == "O":
            _, test, diff, skill, stem, steps, expl = t
            q = {"format": "order", "options": list(steps), "correct": list(range(len(steps)))}
        else:
            raise ValueError(f"{domain}: unknown kind {kind!r}")
        q.update({"test": test, "difficulty": diff, "skill": skill, "stem": stem, "explanation": expl})
        out.append(q)
    return out


def shuffled(q):
    if q["format"] not in ("single", "multi", "order"):
        return q
    order = list(range(len(q["options"])))
    random.Random(seed_for(q["stem"])).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    if q["format"] == "order":
        # correct lists option indices in the right sequence
        out["correct"] = [order.index(i) for i in range(len(order))]
    else:
        out["correct"] = sorted(order.index(i) for i in q["correct"])
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] in ("single", "multi", "order") and len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate options")
    if q["format"] == "single":
        if len(q["options"]) != 4:
            warn.append(f"{len(q['options'])} options")
        key = len(q["options"][0])
        others = sorted((len(o) for o in q["options"][1:]), reverse=True)
        if key > others[0] * 1.25 and key - others[0] > 12:
            warn.append(f"key clearly longest ({key} vs {others[0]})")
    elif q["format"] == "multi":
        if "select all that apply" not in q["stem"].lower():
            warn.append("multi stem lacks 'Select all that apply'")
        if not 2 <= len(q["correct"]) < len(q["options"]):
            warn.append(f"multi has {len(q['correct'])} keys of {len(q['options'])}")
    elif q["format"] == "numeric":
        if "type the number only" not in q["stem"].lower():
            warn.append("numeric stem lacks 'Type the number only'")
        for a in q["numeric"]["answers"]:
            if not re.fullmatch(r"-?[0-9./]+", a):
                warn.append(f"numeric answer {a!r} has other characters")
    return [f"{where}: {w}" for w in warn]


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
            q["domain"] = d
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            if test and len(mine) != PLAN[d]:
                warnings.append(f"test {test} {d}: {len(mine)} items, plan {PLAN[d]}")
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        if test:
            blocks.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(blocks, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"],
                    "skill": q["skill"], "calculator": True}
            item.update({k: v for k, v in q.items() if k not in ("domain", "test", "skill", "difficulty", "format")})
            out.append(item)
    stems = Counter(q["stem"] for q in out)
    warnings += [f"duplicate stem: {s[:60]!r}" for s, c in stems.items() if c > 1]
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    print("  formats:", dict(Counter((q["test"], q["format"]) for q in out)))
    singles = [q for q in out if q["format"] == "single"]
    if singles:
        keys = Counter(q["correct"][0] for q in singles)
        print("  single-key positions:", dict(sorted(keys.items())))
        longest = sum(1 for q in singles if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]))
        print(f"  key strictly longest: {longest}/{len(singles)} = {100 * longest / len(singles):.1f}%")
        over = 0
        for q in singles:
            k = len(q["options"][q["correct"][0]])
            rest = [len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]]
            if k > 1.2 * sum(rest) / len(rest):
                over += 1
        print(f"  key > 1.2x wrong average: {over}/{len(singles)} = {100 * over / len(singles):.1f}%")
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
