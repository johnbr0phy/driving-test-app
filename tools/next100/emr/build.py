#!/usr/bin/env python3
"""Build the NREMT Emergency Medical Responder (EMR) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/emr/build.py

Sources are Python data files in tools/next100/emr/<domain>.py, one per drill
domain, each defining ITEMS (and, for the clinical judgment domain, CASES).
Helpers, with the correct answer always written first:
  S(test, diff, skill, stem, [key, w1, w2, w3], expl)        single answer
  M(test, diff, skill, stem, [keys..., wrongs...], expl)     multiple response; the stem ends
                                                             "Select two." or "Select three."
  O(test, diff, skill, stem, [steps in the right order], expl)  build list
  X(test, diff, skill, stem, rows, columns, keys, expl)      options box
  N(test, diff, skill, stem, answer, expl)                   typed whole number
test is 1, 2 or 0 (drill only). Keyword arguments: case= (a CASES id, the item
then belongs to that scenario and takes its test from it), step= (order inside
the scenario) and passage= (new information shown above the scenario).

The build shuffles options with a seed taken from the stem, so key positions
spread and stay stable from build to build. When every option of a single
item is a number (with one unit) the options are sorted ascending and locked
(lockedOrder), and the key is found again after sorting.

Ids follow tools/build_v2_bank.py: EMR-T1-001.., -T2-001.., -D-001..;
within a test the domains interleave and a scenario stays one block.
"""
import hashlib, json, os, random, re, sys
from collections import Counter

EXAM = "emr"
PREFIX = "EMR"
SECTION = "emr"
DOMAINS = ["emrScene", "emrAirway", "emrCirc", "emrSecondary", "emrTreatment", "emrOps"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def _base(t, d, skill, stem, expl, fmt, kw):
    q = {"test": t, "difficulty": d, "skill": skill, "format": fmt, "stem": stem, "explanation": expl}
    for k in ("case", "step", "passage"):
        if k in kw:
            q[k] = kw[k]
    return q


def S(t, d, skill, stem, opts, expl, **kw):
    q = _base(t, d, skill, stem, expl, "single", kw)
    q["options"], q["correct"] = list(opts), [0]
    return q


def M(t, d, skill, stem, opts, expl, **kw):
    """Options list the keys first; the count comes from "Select two." or "Select three." in the stem."""
    q = _base(t, d, skill, stem, expl, "multi", kw)
    m = re.search(r"Select (two|three)\.$", stem)
    assert m, stem
    n = {"two": 2, "three": 3}[m.group(1)]
    q["options"] = list(opts)
    q["correct"] = list(range(n))
    q["select"] = n
    return q


def O(t, d, skill, stem, steps, expl, **kw):
    q = _base(t, d, skill, stem, expl, "order", kw)
    q["options"] = list(steps)
    q["correct"] = list(range(len(steps)))
    return q


def X(t, d, skill, stem, rows, cols, keys, expl, **kw):
    q = _base(t, d, skill, stem, expl, "matrix", kw)
    assert len(rows) == len(keys), stem
    q["rows"], q["columns"], q["correct"] = list(rows), list(cols), list(keys)
    return q


def N(t, d, skill, stem, answer, expl, **kw):
    q = _base(t, d, skill, stem, expl, "numeric", kw)
    q["numeric"] = {"answers": [str(answer)], "wholeNumber": True}
    return q


NUM = re.compile(r"^(\d+(?:\.\d+)?)(?:\s|$)")


def numval(o):
    m = NUM.match(o)
    return float(m.group(1)) if m else None


def unit(o):
    return re.sub(r"^[\d.]+\s*", "", o)


def seed_of(q):
    return int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)


def arrange(q):
    """Shuffle (or sort and lock) a source item. Returns the built fields."""
    out = dict(q)
    f = q["format"]
    rng = random.Random(seed_of(q))
    if f in ("single", "multi"):
        opts = q["options"]
        vals = [numval(o) for o in opts]
        if f == "single" and all(v is not None for v in vals) and len(set(vals)) == len(vals) and len({unit(o) for o in opts}) == 1:
            order = sorted(range(len(opts)), key=lambda i: vals[i])
            out["lockedOrder"] = True
        else:
            order = list(range(len(opts)))
            rng.shuffle(order)
        out["options"] = [opts[i] for i in order]
        out["correct"] = sorted(order.index(c) for c in q["correct"])
    elif f == "order":
        order = list(range(len(q["options"])))
        while order == sorted(order):
            rng.shuffle(order)
        out["options"] = [q["options"][i] for i in order]
        out["correct"] = [order.index(i) for i in range(len(order))]
    elif f == "matrix":
        order = list(range(len(q["rows"])))
        rng.shuffle(order)
        out["rows"] = [q["rows"][i] for i in order]
        out["correct"] = [q["correct"][i] for i in order]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], q.get("passage", ""), *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
    if any("—" in t or "–" in t or "’" in t or "“" in t for t in texts):
        warn.append("em/en dash or curly quote")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "single":
        if len(q["options"]) != 4:
            warn.append(f"{len(q['options'])} options")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    if not re.search(r"[?:.]$", q["stem"].strip()):
        warn.append("stem ending")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "M": M, "O": O, "X": X, "N": N, "__name__": "emr_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"], g.get("CASES", [])


def esc(s):
    return s.replace("\\$", "$").replace("$", "\\$")


def build():
    items, cases, warnings = {}, {}, []
    for d in DOMAINS:
        src, cs = load(d)
        for c in cs:
            cases[c["id"]] = c
        for i, q in enumerate(src):
            q["domain"] = d
            if "case" in q:
                q["test"] = cases[q["case"]]["test"]
            warnings += lint(q, f"{d}[{i}] {q['stem'][:60]!r}")
        items[d] = src
    out, used_cases = [], set()
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            units = []
            for q in mine:
                if "case" in q:
                    if q["case"] in [u[0].get("case") for u in units]:
                        continue
                    group = sorted([x for x in mine if x.get("case") == q["case"]], key=lambda x: x["step"])
                    units.append(group)
                else:
                    units.append([q])
            for i, u in enumerate(units):
                blocks.append(((i + 0.5) / len(units), di, u))
        blocks.sort(key=lambda b: (b[0], b[1]))
        n = 0
        for _, _, unit_ in blocks:
            for q in unit_:
                n += 1
                b = arrange(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                        "domain": b["domain"], "difficulty": b["difficulty"], "format": b["format"], "skill": b["skill"]}
                if "case" in b:
                    item["stimulusId"] = b["case"]
                    used_cases.add(b["case"])
                if b.get("passage"):
                    item["passage"] = esc(b["passage"])
                item["stem"] = esc(b["stem"])
                if b["format"] in ("single", "multi", "order"):
                    item["options"] = [esc(o) for o in b["options"]]
                if b["format"] == "multi":
                    item["select"] = b["select"]
                if b["format"] == "matrix":
                    item["rows"] = [esc(r) for r in b["rows"]]
                    item["columns"] = [esc(c) for c in b["columns"]]
                if b["format"] == "numeric":
                    item["numeric"] = b["numeric"]
                else:
                    item["correct"] = b["correct"]
                item["explanation"] = esc(b["explanation"])
                if b.get("lockedOrder"):
                    item["lockedOrder"] = True
                out.append(item)
    stimuli = [{"id": c["id"], "title": c["title"], "text": esc(c["text"])} for c in cases.values() if c["id"] in used_cases]
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out} if stimuli else out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} scenarios -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    print("  formats:", dict(Counter(q["format"] for q in out)))
    singles = [q for qs in items.values() for q in qs if q["format"] == "single"]
    longest = sum(1 for q in singles if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest (single): {longest}/{len(singles)} = {longest / len(singles):.0%}")
    ranks = Counter(sorted(q["options"], key=len, reverse=True).index(q["options"][0]) for q in singles)
    print("  key length rank (0 = longest):", dict(sorted(ranks.items())))
    print("  key positions (single):", dict(sorted(Counter(q["correct"][0] for q in out if q["format"] == "single").items())))
    ends = sum(1 for q in out if q.get("lockedOrder") and q["correct"][0] in (0, len(q["options"]) - 1))
    locked = sum(1 for q in out if q.get("lockedOrder"))
    print(f"  locked numeric items: {locked}, key in an end slot: {ends}")
    # key-order check: the key's number must appear in the explanation
    for q in out:
        if q["format"] == "single" and any(re.search(r"\d", o) for o in q["options"]):
            key = q["options"][q["correct"][0]]
            nums = re.findall(r"\d+(?:\.\d+)?", key)
            if nums and not all(n in q["explanation"] for n in nums):
                print("  CHECK key number not in explanation:", q["id"], key)
    stems = Counter(q["stem"] for q in out)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
