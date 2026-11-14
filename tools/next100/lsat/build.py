#!/usr/bin/env python3
"""Build the LSAT v2 bank from Python-data sources.

Usage: python3 -I tools/next100/lsat/build.py

Sources in this folder: test1.py, test2.py (full tests) and drill.py (test 0,
drill only). Each defines STIMULI (Reading Comprehension passages) and STAGES,
a dict from a stage tag to its items in presented order:

  LR1  Logical Reasoning, first timed part (25 items)
  LR2  Logical Reasoning, second timed part (25 items)
  RC   Reading Comprehension (27 items on four passage sets)
  LR / RC (drill.py only): drill-only items

Ids are LSAT-T<test>-<stage>-NN (drills LSAT-D-<stage>-NN), so the session
builder's id sort keeps the authored order inside each stage.

Authoring: every item lists its five options with the key first; the build
shuffles the options with a seed from the question text, so the key lands on
every letter. A Reading Comprehension item without `stim` continues the passage
of the item before it. Explanations name options by what they say, never by
letter or position.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "LSAT"
DOM = {
    "st": "lsatStructure", "as": "lsatAssumption", "sw": "lsatStrengthen", "fl": "lsatFlaw",
    "in": "lsatInference", "pp": "lsatParallel",
    "rm": "lsatRcMain", "rd": "lsatRcDetail", "rx": "lsatRcComparative",
}
SKILL = {
    "mc": "Main conclusion", "role": "Role of a statement", "method": "Method of reasoning",
    "disagree": "Point of disagreement", "nec": "Necessary assumption", "suf": "Sufficient assumption",
    "str": "Strengthen", "weak": "Weaken", "eval": "Evaluate the argument", "expl": "Resolve a discrepancy",
    "flaw": "Flaw", "must": "Must be true", "msp": "Most strongly supported", "cbt": "Cannot be true",
    "par": "Parallel reasoning", "parflaw": "Parallel flaw", "prin": "Apply a principle", "pjust": "Justify with a principle",
    "main": "Main point", "purpose": "Primary purpose", "struct": "Organization", "attitude": "Author's attitude",
    "detail": "Stated information", "infer": "Inference", "context": "Meaning in context", "apply": "Application",
    "comp": "Comparative reading",
}
STAGE_DEF = {"LR1": ("lr", 1), "LR2": ("lr", 2), "RC": ("rc", 1), "LR": ("lr", 1)}


def LR(dom, skill, d, stimulus, stem, opts, expl):
    assert dom in ("st", "as", "sw", "fl", "in", "pp"), dom
    return {"domain": DOM[dom], "skill": SKILL[skill], "difficulty": d, "passage": stimulus,
            "stem": stem, "options": list(opts), "correct": [0], "explanation": expl}


def RC(dom, skill, d, stem, opts, expl, stim=None):
    assert dom in ("rm", "rd", "rx"), dom
    q = {"domain": DOM[dom], "skill": SKILL[skill], "difficulty": d, "stem": stem,
         "options": list(opts), "correct": [0], "explanation": expl}
    if stim:
        q["stimulusId"] = stim
    return q


def finish(q, slot):
    """Put the key in `slot` (rotating through A to E across the bank) and shuffle the distractors."""
    rng = random.Random(int(hashlib.sha256((q.get("passage", "") + q["stem"]).encode()).hexdigest()[:12], 16))
    wrong = q["options"][1:]
    rng.shuffle(wrong)
    q["options"] = wrong[:slot] + [q["options"][0]] + wrong[slot:]
    q["correct"] = [slot]
    return q


def lint(q, where):
    warn = []
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–’‘“”"):
        warn.append("em/en dash or curly quote")
    if len(q["options"]) != 5:
        warn.append(f"{len(q['options'])} options")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    low = q["explanation"].lower()
    for bad in (r"\bchoice [a-e]\b", r"\([a-e]\)", r"\b(first|second|third|fourth|last) (option|choice|answer)\b"):
        if re.search(bad, low):
            warn.append(f"explanation refers to position: {bad}")
    if not q["stem"].rstrip().endswith(("?", ":")):
        warn.append("stem does not end in ? or :")
    return [f"{where}: {w}" for w in warn]


def load(name):
    g = {"LR": LR, "RC": RC}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["STAGES"]


def build():
    out, stimuli, warnings, authored = [], [], [], []
    for name, test in (("test1", 1), ("test2", 2), ("drill", 0)):
        stims, stages = load(name)
        stimuli += stims
        for tag, items in stages.items():
            section, module = STAGE_DEF[tag]
            last = None
            for n, q in enumerate(items, 1):
                if section == "rc":
                    q["stimulusId"] = q.get("stimulusId") or last
                    last = q["stimulusId"]
                qid = f"{PREFIX}-T{test}-{tag}-{n:02d}" if test else f"{PREFIX}-D-{tag}-{n:02d}"
                warnings += lint(q, qid)
                authored.append((qid, dict(q)))
                q = finish(dict(q), (len(out) * 3 + test) % 5)
                item = {"id": qid, "section": section, "test": test, "module": module, "format": "single"}
                for k in ("domain", "skill", "difficulty", "stimulusId", "passage", "stem", "options", "correct", "explanation"):
                    if k in q:
                        item[k] = q[k]
                out.append(item)
    stim_ids = {s["id"] for s in stimuli}
    for q in out:
        if q["section"] == "rc" and q.get("stimulusId") not in stim_ids:
            warnings.append(f"{q['id']}: unknown stimulus {q.get('stimulusId')}")
    dst = os.path.join(ROOT, "data/v2/lsat/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"lsat: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for k in sorted(Counter((q["test"], q["section"], q["module"]) for q in out).items()):
        (t, s, m), n = k
        doms = Counter(q["domain"] for q in out if (q["test"], q["section"], q["module"]) == (t, s, m))
        print(f"  test {t} {s} module {m}: {n}  {dict(doms)}")
    pools = Counter(q["domain"] for q in out if q["test"] in (0, 1))
    print("  drill pools (test 1 + drill-only):", dict(pools))
    longest = [qid for qid, q in authored if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(authored)} = {len(longest) / len(authored):.0%}")
    over = [qid for qid, q in authored
            if len(q["options"][0]) > 1.2 * (sum(len(o) for o in q["options"][1:]) / 4)]
    print(f"  key over 120% of wrong average: {len(over)}/{len(authored)} = {len(over) / len(authored):.0%}")
    print("  key letters:", dict(sorted(Counter("ABCDE"[q["correct"][0]] for q in out).items())))
    seen = Counter((q.get("passage", ""), q.get("stimulusId", ""), q["stem"]) for _, q in authored)
    for (p, _st, s), n in seen.items():
        if n > 1:
            warnings.append(f"duplicate item: {s[:70]}")
    seen_p = Counter(q["passage"] for _, q in authored if q.get("passage"))
    for p, n in seen_p.items():
        if n > 1:
            warnings.append(f"LR stimulus used {n} times: {p[:70]}")
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        for qid, q in authored:
            if qid in longest:
                o = q["options"]
                print(f"  {qid}: key {len(o[0])} vs max other {max(len(x) for x in o[1:])}: {o[0]}")
    return 1 if warnings else 0


if __name__ == "__main__":
    raise SystemExit(build())
