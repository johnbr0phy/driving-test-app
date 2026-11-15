#!/usr/bin/env python3
"""Build the CAT (IIM Common Admission Test) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/iimcat/build.py

Copied from tools/next100/sbiclerk/build.py. Sources are Python data files in
this folder, one per drill domain, plus stimuli.py (reading passages and DILR
sets as text) and checks.py (brute-force checks of every DILR set's answers).

The real CAT has MCQs (+3, -1) and typed non-MCQ answers (TITA: +3, no
penalty). Here MCQs have four options and TITA items are `numeric`.

Helpers:
  S(test, difficulty, skill, stem, options, explanation, stim=None)
      MCQ, correct option FIRST; the build shuffles with a seed from the stem.
  N(test, difficulty, skill, stem, key, wrong, explanation, stim=None)
      MCQ with all-number options, sorted ascending and locked.
  T(test, difficulty, skill, stem, answers, explanation, stim=None)
      TITA (typed answer): `answers` is a string or a list of accepted spellings.
test is 1, 2 or 0 (drill only).

Ids: IIMCAT-T1-001.. (VARC 001-024, DILR 025-044, QA 045-066 in each test),
IIMCAT-T2-.., IIMCAT-D-... Items sharing a stimulus stay together in source order.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "iimcat"
PREFIX = "IIMCAT"
SECTIONS = [
    ("varc", ["catRC", "catVA"]),
    ("dilr", ["catDI", "catLR"]),
    ("qa", ["catArith", "catAlgebra", "catGeometry", "catNumbers"]),
]
DOMAINS = [d for _, ds in SECTIONS for d in ds]
SECTION_OF = {d: s for s, ds in SECTIONS for d in ds}
# Per-test counts the mock tests must hit (Tigertest's model; the IIMs publish none).
PER_TEST = {"catRC": 16, "catVA": 8, "catDI": 8, "catLR": 12,
            "catArith": 8, "catAlgebra": 7, "catGeometry": 4, "catNumbers": 3}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
SIBLINGS = ["ibpsclerk", "ibpspo", "ssccgl", "rrbntpc", "ctet", "rrbgroupd", "sscgd", "sscchsl", "sscmts",
            "uppolice", "jnvst", "sbipo", "sbiclerk", "ibpsrrb", "delhipolice", "biharpolice", "rajpolice",
            "mppolice", "ssccpo", "rrbalp", "rpfconst", "nda", "agniveer", "agniveervayu", "jeemain", "neet",
            "mhtcet", "cuet", "upscse", "aissee", "jkssbja", "tgsi", "ugcnet", "reet", "uptet", "gmat", "gre"]


def S(t, d, skill, stem, opts, expl, stim=None):
    assert len(opts) == 4 and len(set(opts)) == 4, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def _val(s):
    m = re.search(r"-?[\d,]*\.?\d+", s.replace("−", "-"))
    assert m, s
    v = m.group(0).replace(",", "")
    if "/" in s and re.fullmatch(r"\s*-?\d+\s*/\s*\d+\s*", s):
        a, b = s.split("/")
        return float(a) / float(b)
    return float(v)


def N(t, d, skill, stem, key, wrong, expl, stim=None):
    opts = [key] + list(wrong)
    assert len(opts) == 4 and len(set(opts)) == 4, stem
    ordered = sorted(opts, key=_val)
    assert len({_val(o) for o in opts}) == 4, stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": ordered, "correct": [ordered.index(key)], "lockedOrder": True, "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def T(t, d, skill, stem, answers, expl, stim=None):
    if isinstance(answers, str):
        answers = [answers]
    whole = all(re.fullmatch(r"\d+", a) for a in answers)
    num = {"answers": list(answers), "tolerance": 0}
    if whole:
        num["wholeNumber"] = True
    q = {"test": t, "difficulty": d, "skill": skill, "format": "numeric", "stem": stem,
         "numeric": num, "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


_USED = Counter({0: 0, 1: 0, 2: 0, 3: 0})


def shuffled(q):
    """Key into the least-used slot so far (locked items count too) so letters stay balanced; distractors shuffled by a stem seed."""
    if q.get("lockedOrder") or q["format"] != "single":
        return q
    seed = int(hashlib.sha256(q["stem"].encode() + "|".join(q["options"]).encode()).hexdigest()[:12], 16)
    wrong = q["options"][1:]
    random.Random(seed).shuffle(wrong)
    least = min(_USED.values())
    free = [i for i in range(4) if _USED[i] == least]
    slot = free[seed % len(free)]
    opts = wrong[:slot] + [q["options"][0]] + wrong[slot:]
    out = dict(q)
    out["options"] = opts
    out["correct"] = [slot]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *(q.get("options") or [])]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options") or []):
        warn.append("all/none of the above")
    if re.search(r"(?<!\\)\$(?!\s)", "".join(texts)) and "\\$" not in "".join(texts):
        pass
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    others = [len(o) for i, o in enumerate(q["options"]) if i != k]
    return len(q["options"][k]) > max(others)


def load(name, extra=None):
    g = {"S": S, "N": N, "T": T, "HERE": HERE, "__name__": "iimcat_source"}
    if extra:
        g.update(extra)
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
    load("checks")
    stimuli = load("stimuli")["STIMULI"]
    stim_ids = {s["id"] for s in stimuli}
    assert len(stim_ids) == len(stimuli)
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][-50:]!r}")
            if q.get("stimulusId") and q["stimulusId"] not in stim_ids:
                raise SystemExit(f"{d}[{i}]: unknown stimulus {q['stimulusId']}")
        items[d] = src
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, doms in SECTIONS:
            for d in doms:
                cnt = sum(1 for q in items[d] if q["test"] == test)
                if test:
                    assert cnt == PER_TEST[d], (test, d, cnt, PER_TEST[d])
                for q in items[d]:
                    if q["test"] != test:
                        continue
                    n += 1
                    q = shuffled(q)
                    if q["format"] == "single":
                        _USED[q["correct"][0]] += 1
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                            "domain": d, "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                    for k in ("stimulusId", "stem", "options", "correct", "lockedOrder", "numeric", "explanation"):
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
        print(f"  test {test}: {row} = {sum(row)}")
    fmt = Counter((q["test"], q["format"]) for q in out)
    print("  formats:", dict(sorted(fmt.items())))
    mcq = [q for q in out if q["format"] == "single"]
    longest = [q for q in mcq if key_longest(q)]
    print(f"  key strictly longest: {len(longest)}/{len(mcq)} = {len(longest) / len(mcq):.0%}")
    print("  key positions (all MCQ):", dict(sorted(Counter(q["correct"][0] for q in mcq).items())))
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
