#!/usr/bin/env python3
"""Build the SBI Clerk (Junior Associates) Prelims v2 bank from per-domain source files.

Usage: python3 -I tools/next100/sbiclerk/build.py

Copied from tools/next100/ibpsclerk/build.py (the IBPS Clerk template). Sources are Python
data files in this folder, one per drill domain, plus stimuli.py (reading
passages, cloze passages, data tables and puzzles as text).
Every item is five-option single answer, the only format on the real Prelims.

Helpers:
  S(test, difficulty, skill, stem, options, explanation, stim=None)
      correct option FIRST; the build shuffles with a seed from the stem.
  L(test, difficulty, skill, stem, options, key, explanation, stim=None)
      fixed option order (error spotting letters, sentence improvement with
      'No improvement' last, phrase rearrangement sequences, inequality and
      syllogism conclusions); `key` is the index and the item carries lockedOrder.
  N(test, difficulty, skill, stem, key, wrong, explanation, stim=None)
      all-number options, sorted ascending and locked.
test is 1, 2 or 0 (drill only).

Ids: SBICLK-T1-001.. (English 001-030, Numerical Ability 031-065, Reasoning
066-100 in each test), SBICLK-T2-.., SBICLK-D-... Items sharing a stimulus
stay together in source order.

Lint (printed, never fatal): key strictly longest, em or en dashes, double
underscores, "of the above", duplicate options or stems, dollar signs, and a
stem, or the same set of numbers in a stem, shared with any other India bank.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "sbiclerk"
PREFIX = "SBICLK"
SECTIONS = [
    ("eng", ["sbiclerkReading", "sbiclerkCloze", "sbiclerkGrammar"]),
    ("quant", ["sbiclerkNumber", "sbiclerkDI", "sbiclerkArith"]),
    ("reason", ["sbiclerkLogic", "sbiclerkPuzzle", "sbiclerkVerbal"]),
]
DOMAINS = [d for _, ds in SECTIONS for d in ds]
SECTION_OF = {d: s for s, ds in SECTIONS for d in ds}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
SIBLINGS = ["ibpsclerk", "ibpspo", "ssccgl", "rrbntpc", "ctet", "rrbgroupd", "sscgd", "sscchsl", "sscmts",
            "uppolice", "jnvst", "sbipo", "ibpsrrb", "delhipolice", "biharpolice", "rajpolice", "mppolice"]

CONC = ["Only I follows", "Only II follows", "Either I or II follows", "Neither I nor II follows", "Both I and II follow"]
LETTERS = ["A", "B", "C", "D", "E"]
ERR = "Read the sentence and find the part that contains an error. If there is no error, choose E."


def S(t, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 5, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": opts, "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def L(t, d, skill, stem, opts, key, expl, stim=None):
    assert len(opts) == 5 and 0 <= key < 5, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [key], "lockedOrder": True, "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def _parse(s):
    m = re.fullmatch(r"(\D*?)(-?[\d,]*\.?\d+)(.*)", s)
    assert m, s
    pre, num, suf = m.groups()
    dec = len(num.split(".")[1]) if "." in num else 0
    return pre, float(num.replace(",", "")), suf, dec, "," in num


def _fmt(pre, v, suf, dec, comma):
    if suf in ("st", "nd", "rd", "th"):
        n = int(v)
        suf = "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    body = f"{v:,.{dec}f}" if comma or abs(v) >= 10000 else f"{v:.{dec}f}"
    if "." in body:
        body = body.rstrip("0").rstrip(".")
    return f"{pre}{body}{suf}"


def N(t, d, skill, stem, key, wrong, expl, stim=None, fixed=False):
    """All-number options: sorted ascending and locked, like the real paper.

    Unless `fixed` or a distractor is named in the explanation (a deliberate
    trap value), the four distractors are respaced around the key at the
    authored list's smallest spacing so that the key's position (0-4) comes from a stem
    seed instead of sitting in the middle of a symmetric list. `fixed` keeps
    the authored options.
    """
    opts = [key] + list(wrong)
    assert len(opts) == 5 and len(set(opts)) == 5, stem
    def val(s):
        return float(re.sub(r"[^0-9.\-]", "", s.split()[0].replace(",", "")) or 0)
    named = any(re.search(r"(?<![\d.,])" + re.escape(w) + r"(?![\d,]|\.\d)", expl) for w in wrong)
    vals = sorted(val(o) for o in opts)
    if not fixed and not named:
        pre, k, suf, dec, comma = _parse(key)
        dec = max(_parse(o)[3] for o in opts)
        step = min(round(b - a, 6) for a, b in zip(vals, vals[1:]))
        seed = int(hashlib.sha256(stem.encode()).hexdigest()[:8], 16)
        ok = [p for p in range(5) if k - p * step > 0]
        p = ok[seed % len(ok)]
        opts = [_fmt(pre, round(k + (i - p) * step, 6), suf, dec, comma) for i in range(5)]
        opts[p] = key
        assert len(set(opts)) == 5, opts
    ordered = sorted(opts, key=val)
    return L(t, d, skill, stem, ordered, ordered.index(key), expl, stim)


def shuffled(q):
    if q.get("lockedOrder"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode() + "|".join(q["options"]).encode()).hexdigest()[:12], 16)
    order = list(range(5))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("__" in t for t in texts):
        warn.append("double underscore")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(set(q["options"])) != 5:
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    others = [len(o) for i, o in enumerate(q["options"]) if i != k]
    return len(q["options"][k]) > max(others)


def load(name):
    g = {"S": S, "L": L, "N": N, "CONC": CONC, "LETTERS": LETTERS, "ERR": ERR, "__name__": "sbiclerk_source"}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def numbers(s):
    nums = re.findall(r"\d+(?:\.\d+)?", s.replace(",", ""))
    return tuple(sorted(nums)) if len(nums) >= 3 else None


def sibling_stems():
    out, nums = set(), {}
    for ex in SIBLINGS:
        p = os.path.join(ROOT, f"data/v2/{ex}/questions.json")
        if not os.path.exists(p):
            continue
        d = json.load(open(p))
        qs = d["questions"] if isinstance(d, dict) else d
        for q in qs:
            if not q.get("stimulusId"):
                out.add(norm(q["stem"]))
                n = numbers(q["stem"])
                if n:
                    nums[n] = f"{ex} {q['id']}"
    return out, nums


def build():
    stimuli = load("stimuli")["STIMULI"]
    stim_ids = {s["id"] for s in stimuli}
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][-50:]!r}")
            if q.get("stimulusId") and q["stimulusId"] not in stim_ids:
                warnings.append(f"{d}[{i}]: unknown stimulus {q['stimulusId']}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, doms in SECTIONS:
            for d in doms:
                for q in items[d]:
                    if q["test"] != test:
                        continue
                    n += 1
                    q = shuffled(q)
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                            "domain": d, "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
                    for k in ("stimulusId", "stem", "options", "correct", "lockedOrder", "explanation"):
                        if k in q:
                            item[k] = q[k]
                    out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        secs = Counter(SECTION_OF[d] for d in DOMAINS for _ in range(per[(test, d)]))
        print(f"  test {test}: {row} = {sum(row)}  {dict(secs)}")
    longest = [q for q in out if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(out)} = {len(longest) / len(out):.0%}")
    shuf = [q for q in out if not q.get("lockedOrder")]
    print("  key positions (shuffled items):", dict(sorted(Counter(q["correct"][0] for q in shuf).items())))
    print("  key positions (all):", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    stems = Counter((q.get("stimulusId"), q["stem"]) for q in out)
    for (sid, s), n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", sid, s[:80])
    sib, sibnums = sibling_stems()
    for q in out:
        if not q.get("stimulusId") and norm(q["stem"]) in sib:
            print("  WARN stem also in a sibling bank:", q["id"], q["stem"][-80:])
        n = None if q.get("stimulusId") else numbers(q["stem"])
        if n and n in sibnums:
            print("  WARN same numbers as", sibnums[n], ":", q["id"], q["stem"][-80:])
    refs = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    for sid in stim_ids:
        if not refs[sid]:
            print("  WARN unused stimulus", sid)
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
