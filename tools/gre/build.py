#!/usr/bin/env python3
"""Build the GRE v2 bank from Python-data sources.

Usage: python3 -I tools/gre/build.py

Sources: tools/gre/test1.py, test2.py (full tests) and drill.py (test 0,
drill only). Each defines STIMULI (shared reading passages) and STAGES, a
dict from a stage tag to its items in presented order:

  V1  Verbal section 1 (12 items, average difficulty)
  V2L Verbal section 2, easier variant (15)    V2U  harder variant (15)
  Q1  Quant section 1 (12)
  Q2L Quant section 2, easier variant (15)     Q2U  harder variant (15)
  V / Q (drill.py only): drill-only verbal / quant items

Ids are GRE-T<test>-<stage>-NN (drills GRE-D-<V|Q>-NN), so the session
builder's id sort keeps the authored order inside each stage.

Authoring: single and multi items list the key(s) first; the build shuffles
options (and each cloze blank's choices) with a seed from the stem.
A reading item with neither passage nor stim continues the shared passage
of the item before it. Quantitative comparison items keep the four fixed GRE choices in order
(lockedOrder). Problem-solving items whose options are all numbers are
sorted ascending and locked, as on the real test. Write money as \\$.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
PREFIX = "GRE"
DOM = {"tc": "greTextCompletion", "se": "greSentenceEquivalence", "rc": "greReading",
       "ar": "greArithmetic", "al": "greAlgebra", "ge": "greGeometry", "da": "greData"}
QC_OPTIONS = [
    "Quantity A is greater.",
    "Quantity B is greater.",
    "The two quantities are equal.",
    "The relationship cannot be determined from the information given.",
]
STAGE_DEF = {
    "V1": ("verbal", 1, None), "V2L": ("verbal", 2, "lower"), "V2U": ("verbal", 2, "upper"),
    "Q1": ("quant", 1, None), "Q2L": ("quant", 2, "lower"), "Q2U": ("quant", 2, "upper"),
    "V": ("verbal", 1, None), "Q": ("quant", 1, None),
}


def _q(fmt, dom, d, skill, stem, expl, **kw):
    q = {"format": fmt, "domain": DOM[dom], "difficulty": d, "skill": skill, "stem": stem, "explanation": expl}
    q.update({k: v for k, v in kw.items() if v is not None})
    return q


def TC(d, stem, opts, expl):
    q = _q("single", "tc", d, "Text completion, one blank", stem, expl)
    q["options"], q["correct"] = opts, [0]
    return q


def TCB(d, stem, blanks, expl):
    n = len(blanks)
    q = _q("cloze", "tc", d, f"Text completion, {'two' if n == 2 else 'three'} blanks", stem, expl)
    q["blanks"], q["correct"] = blanks, [0] * n
    return q


def SE(d, stem, opts, expl):
    q = _q("multi", "se", d, "Sentence equivalence", stem + "\n\nSelect the two words that complete the sentence and give it the same meaning.", expl)
    q["options"], q["correct"], q["select"] = opts, [0, 1], 2
    return q


def RC(d, stem, opts, expl, stim=None, passage=None, skill="Reading comprehension"):
    q = _q("single", "rc", d, skill, stem, expl, stimulusId=stim, passage=passage)
    q["options"], q["correct"] = opts, [0]
    return q


def AR(d, passage, stem, opts, expl):
    return RC(d, stem, opts, expl, passage=passage, skill="Argument analysis")


def RCM(d, stem, opts, n, expl, stim=None, passage=None):
    q = _q("multi", "rc", d, "Reading comprehension, select all", stem + " Consider each of the choices separately and select all that apply.", expl,
           stimulusId=stim, passage=passage)
    q["options"], q["correct"] = opts, list(range(n))
    return q


def HL(d, passage, stem, key, expl):
    q = _q("highlight", "rc", d, "Select in passage", stem, expl, passage=passage)
    q["correct"] = [key]
    return q


def QC(dom, d, a, b, key, expl, info=None):
    stem = (info + "\n\n" if info else "") + f"**Quantity A:** {a}\n\n**Quantity B:** {b}\n\nCompare Quantity A and Quantity B."
    q = _q("single", dom, d, "Quantitative comparison", stem, expl)
    q["options"], q["correct"], q["lockedOrder"] = list(QC_OPTIONS), [key], True
    return q


def PS(dom, d, stem, opts, expl, skill="Problem solving"):
    q = _q("single", dom, d, skill, stem, expl)
    q["options"], q["correct"] = opts, [0]
    return q


def MA(dom, d, stem, opts, n, expl):
    q = _q("multi", dom, d, "Multiple answer", stem, expl)
    q["options"], q["correct"] = opts, list(range(n))
    return q


def NE(dom, d, stem, answers, expl):
    q = _q("numeric", dom, d, "Numeric entry", stem, expl)
    q["numeric"] = {"answers": answers, "tolerance": 0}
    return q


def _num(s):
    t = s.replace("\\$", "").replace(",", "").replace("%", "").replace("$", "").strip()
    try:
        return float(t)
    except ValueError:
        return None


def finish(q):
    rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
    if q["format"] in ("single", "multi") and not q.get("lockedOrder"):
        nums = [_num(o) for o in q["options"]]
        if q["domain"] in (DOM["ar"], DOM["al"], DOM["ge"], DOM["da"]) and all(n is not None for n in nums):
            order = sorted(range(len(nums)), key=lambda i: nums[i])
            q["lockedOrder"] = True
        else:
            order = list(range(len(q["options"])))
            rng.shuffle(order)
        q["options"] = [q["options"][i] for i in order]
        q["correct"] = sorted(order.index(c) for c in q["correct"])
    if q["format"] == "cloze":
        blanks, key = [], []
        for b, c in zip(q["blanks"], q["correct"]):
            order = list(range(len(b)))
            rng.shuffle(order)
            blanks.append([b[i] for i in order])
            key.append(order.index(c))
        q["blanks"], q["correct"] = blanks, key
    return q


def lint(q, where):
    warn = []
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", []), *[c for b in q.get("blanks", []) for c in b]]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if q["format"] == "numeric" and "type the number only" not in q["stem"].lower():
        warn.append("numeric stem lacks 'Type the number only'")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    if q["domain"] == DOM["rc"] and not (q.get("passage") or q.get("stimulusId")):
        warn.append("reading item without passage or stimulus")
    return [f"{where}: {w}" for w in warn]


def load(name):
    g = {k: v for k, v in globals().items() if k in ("TC", "TCB", "SE", "RC", "AR", "RCM", "HL", "QC", "PS", "MA", "NE")}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["STAGES"]


def build():
    out, stimuli, warnings, authored = [], [], [], []
    for name, test in (("test1", 1), ("test2", 2), ("drill", 0)):
        stims, stages = load(name)
        stimuli += stims
        for tag, items in stages.items():
            section, module, variant = STAGE_DEF[tag]
            last_stim = None
            for n, q in enumerate(items, 1):
                # A reading item with no passage of its own continues the previous item's shared passage.
                if q["domain"] == DOM["rc"] and not q.get("passage") and not q.get("stimulusId") and last_stim:
                    q["stimulusId"] = last_stim
                last_stim = q.get("stimulusId") if q["domain"] == DOM["rc"] and not q.get("passage") else None
                qid = f"{PREFIX}-T{test}-{tag}-{n:02d}" if test else f"{PREFIX}-D-{tag}-{n:02d}"
                warnings += lint(q, qid)
                authored.append((qid, dict(q)))
                q = finish(dict(q))
                item = {"id": qid, "section": section, "test": test, "module": module}
                if variant:
                    item["variant"] = variant
                for k in ("domain", "skill", "difficulty", "format", "stimulusId", "passage", "stem", "options", "select",
                          "correct", "blanks", "numeric", "lockedOrder", "explanation"):
                    if k in q:
                        item[k] = q[k]
                out.append(item)
    dst = os.path.join(ROOT, "data/v2/gre/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"gre: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["section"], q["module"], q.get("variant", ""), q["domain"]) for q in out)
    for key in sorted(per):
        pass
    stage = Counter((q["test"], q["section"], q["module"], q.get("variant", "")) for q in out)
    for k in sorted(stage):
        doms = Counter(q["domain"] for q in out if (q["test"], q["section"], q["module"], q.get("variant", "")) == k)
        print(f"  {k}: {stage[k]}  {dict(doms)}")
    pools = Counter(q["domain"] for q in out if q["test"] in (0, 1))
    print("  drill pools (test 1 + drill-only):", dict(pools))
    print("  formats:", dict(Counter(q["format"] for q in out)))
    # key-longest over items whose options are words or sentences (not QC, not numbers)
    cand = [q for _, q in authored if q["format"] == "single" and not q.get("lockedOrder")
            and not all(_num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in authored if q in cand and len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    keys = Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-key positions:", dict(sorted(keys.items())))
    qc = Counter(q["correct"][0] for q in out if q.get("skill") == "Quantitative comparison")
    print("  QC keys (A,B,=,?):", dict(sorted(qc.items())))
    stems = Counter(q["stem"] for _, q in authored)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)


if __name__ == "__main__":
    build()
