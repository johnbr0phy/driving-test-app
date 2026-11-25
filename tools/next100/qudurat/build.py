#!/usr/bin/env python3
"""Build the Qudurat (GAT, English version) v2 bank from Python-data sources.

Usage: python3 -I tools/next100/qudurat/build.py

Sources, each defining ITEMS = {module: [...]} and STIMULI = [...]:

  verbal_t1.py, verbal_t2.py   verbal section of practice test 1 and 2, modules 1 to 3
  quant_t1.py,  quant_t2.py    quantitative section of practice test 1 and 2, modules 1 and 2
  drill.py                     drill-only items (test 0), ITEMS = {"verbal": [...], "quant": [...]}

Shape (ETEC's GAT page and English Test-Taker's Guide, fetched 2026-11-25): five
sections of 24 questions, 120 in all, in 125 minutes; verbal domains weighted
17 / 7 / 10 / 21 and quantitative (Science Tracks) 23 / 10 / 4 / 8. A practice
test is the same 120 questions and 125 minutes, regrouped by section: verbal in
three timed parts of 22 (23 minutes each), quantitative in two of 27
(28 minutes each). Per test: analogies and odd one out 20, sentence completion
9, contextual error 12, reading 25; arithmetic 28, geometry 12, algebra 5,
data analysis 9.

Ids are QUDURAT-T<n>-V<m>-NN and QUDURAT-T<n>-Q<m>-NN (drill only QUDURAT-D-V-NN,
QUDURAT-D-Q-NN), so the session builder's id sort keeps the authored order and
every passage and data set stays together.

Authoring: the key is listed first and the options are shuffled by a seed from
the stem. Quantitative comparison keeps ETEC's four fixed choices in their
order (lockedOrder, key given as a letter) and checks the letter against the
values passed in `vals`. Contextual error items mark four words with {braces};
those words become the options in sentence order (locked). Every quantitative
item passes `ans`, a Python expression of the key's value, and the build fails
when the key option does not equal it. All-number options are sorted and
locked.
"""
import hashlib, json, os, random, re, sys
from collections import Counter
from fractions import Fraction

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
EXAM = "qudurat"
PREFIX = "QUDURAT"

DOM = {
    "an": "qdAnalogy", "sc": "qdCompletion", "ce": "qdContext", "rc": "qdReading",
    "ar": "qdArith", "ge": "qdGeometry", "al": "qdAlgebra", "da": "qdData",
}
SECTION = {"an": "verbal", "sc": "verbal", "ce": "verbal", "rc": "verbal",
           "ar": "quant", "ge": "quant", "al": "quant", "da": "quant"}
PER_TEST = {"an": 20, "sc": 9, "ce": 12, "rc": 25, "ar": 28, "ge": 12, "al": 5, "da": 9}
MODULE_SIZE = {"verbal": {1: 22, 2: 22, 3: 22}, "quant": {1: 27, 2: 27}}

# Basics each drill opens with (lib/v2/exams/qudurat.ts). A `b=` tag must name one of its own drill's.
BASICS = {
    "an": [],
    "sc": ["sentenceCompletion", "logicalCompletion", "transitions", "toneWords"],
    "ce": ["causeEffect", "sequenceEvents", "preciseWords", "commonlyConfused"],
    "rc": ["mainIdea", "findingDetail", "inference", "wordsInContext"],
    "ar": ["fractionOps", "percents", "ratios", "rateProblems"],
    "ge": ["areaPerimeter", "circleBasics", "pythagorean", "triangleAngles", "volume"],
    "al": ["solveX", "inequalities", "distributing", "factoring"],
    "da": ["readingTable", "trends", "percentChange", "meanMedian"],
}

QC_OPTIONS = [
    "The first value is greater",
    "The second value is greater",
    "The two values are equal",
    "The information given is insufficient",
]


def _q(dom, d, stem, expl, b=None, **kw):
    q = {"domain": dom, "difficulty": d, "format": "single", "stem": stem, "explanation": expl}
    if b:
        q["basics"] = b
    q.update({k: v for k, v in kw.items() if v is not None})
    return q


def AN(d, pair, opts, expl, b=None):
    """Verbal analogy: the stem pair 'a : b', four pairs, key first."""
    a, c = [w.strip() for w in pair.split(":")]
    q = _q("an", d, f"**{a.upper()} : {c.upper()}**\n\nWhich pair has the same relationship?", expl, b, skill="Verbal analogy")
    q["options"], q["correct"] = list(opts), [0]
    return q


def OO(d, opts, expl, b=None):
    """Odd one out: four words, the odd one first."""
    q = _q("an", d, "Which word does not belong with the other three?", expl, b, skill="Odd one out")
    q["options"], q["correct"] = list(opts), [0]
    return q


def SC(d, text, opts, expl, b=None):
    """Sentence completion: ____ marks each blank; two-blank options are 'x ... y'."""
    gaps = text.count("____")
    ask = "Which word best completes the sentence?" if gaps == 1 else "Which words best complete the sentence?"
    if any(" " in o.replace(" ... ", "") for o in opts) and gaps == 1:
        ask = "Which choice best completes the sentence?"
    q = _q("sc", d, f"{text}\n\n{ask}", expl, b, skill="Sentence completion")
    q["options"], q["correct"] = list(opts), [0]
    return q


BRACE = re.compile(r"\{([^{}]+)\}")


def CE(d, text, key, expl, b=None):
    """Contextual error: four {words} in the sentence; the key is the one that breaks its meaning."""
    words = BRACE.findall(text)
    stem = BRACE.sub(lambda m: f"__{m.group(1)}__", text)
    q = _q("ce", d, f"{stem}\n\nWhich underlined word does not fit the meaning of the sentence?", expl, b, skill="Contextual error")
    q["options"], q["correct"], q["lockedOrder"] = words, [words.index(key)], True
    return q


def RC(d, stim, stem, opts, expl, b=None, skill="Reading comprehension"):
    q = _q("rc", d, stem, expl, b, stimulusId=stim, skill=skill)
    q["options"], q["correct"] = list(opts), [0]
    return q


def M(dom):
    def make(d, stem, opts, expl, ans=None, b=None, skill=None):
        q = _q(dom, d, stem, expl, b, skill=skill)
        q["options"], q["correct"] = list(opts), [0]
        q["_ans"] = ans
        return q
    return make


def QC(dom):
    def make(d, info, one, two, letter, expl, vals, b=None):
        stem = (info + "\n\n" if info else "") + f"**First value:** {one}\n\n**Second value:** {two}\n\nCompare the two values:"
        q = _q(dom, d, stem, expl, b, skill="Quantitative comparison")
        q["options"], q["correct"], q["lockedOrder"] = list(QC_OPTIONS), ["ABCD".index(letter)], True
        q["_vals"] = vals
        return q
    return make


def DA(d, stim, stem, opts, expl, ans=None, b=None, skill="Data analysis"):
    q = _q("da", d, stem, expl, b, stimulusId=stim, skill=skill)
    q["options"], q["correct"] = list(opts), [0]
    q["_ans"] = ans
    return q


HELPERS = {
    "AN": AN, "OO": OO, "SC": SC, "CE": CE, "RC": RC, "DA": DA,
    "AR": M("ar"), "GE": M("ge"), "AL": M("al"),
    "ARC": QC("ar"), "GEC": QC("ge"), "ALC": QC("al"),
    "F": Fraction,
}

FRAC = re.compile(r"^(-?)\\(?:d)?frac\{(-?\d+)\}\{(\d+)\}$")
UNITS = r"(SAR|riyals?|%|°C|cm\^2|cm\^3|cm²|cm³|m²|m³|cm|mm|km/h|km|kg|g|m|L|litres?|hours?|minutes?|seconds?|days?|years?|students?|people|books|points|degrees|°|\^\\circ|\^\{\\circ\})"


def num(s):
    """The value of an all-number option ('SAR 600', '0.25', '$\\frac{3}{4}$', '40%', '12 cm'), else None."""
    t = s.strip()
    if t.startswith("$") and t.endswith("$"):
        t = t[1:-1].strip()
    t = t.replace("\\,", "").replace(",", "")
    t = re.sub(r"^SAR\s*", "", t)
    for _ in range(2):
        t = re.sub(r"\s*" + UNITS + r"$", "", t).strip()
    m = FRAC.match(t)
    if m:
        v = Fraction(int(m.group(2)), int(m.group(3)))
        return -v if m.group(1) else v
    m = re.match(r"^(-?\d+)\s*/\s*(\d+)$", t)
    if m:
        return Fraction(int(m.group(1)), int(m.group(2)))
    t = t.replace("−", "-")
    try:
        return Fraction(t)
    except (ValueError, ZeroDivisionError):
        return None


def check_quant(q, where):
    warn = []
    if "_vals" in q:
        vals = q.pop("_vals")
        letter = "ABCD"[q["correct"][0]]
        rel = lambda a, b: "A" if a > b else ("B" if a < b else "C")
        rels = {rel(Fraction(a).limit_denominator(10**9) if isinstance(a, float) else a,
                    Fraction(b).limit_denominator(10**9) if isinstance(b, float) else b) for a, b in vals}
        if letter == "D":
            if len(rels) < 2:
                warn.append(f"QC keyed D but every case gives {rels}")
        elif rels != {letter}:
            warn.append(f"QC keyed {letter} but the values give {sorted(rels)}")
    if "_ans" in q:
        ans = q.pop("_ans")
        if ans is None:
            warn.append("quantitative item without ans")
        else:
            got = num(q["options"][0])
            want = Fraction(ans).limit_denominator(10**6) if isinstance(ans, float) else Fraction(ans) if isinstance(ans, int) else ans
            if isinstance(ans, str):
                if q["options"][0] != ans:
                    warn.append(f"key {q['options'][0]!r} is not {ans!r}")
            elif got is None or abs(float(got) - float(want)) > 1e-9:
                warn.append(f"key {q['options'][0]!r} is not the computed {float(want)}")
            for o in q["options"][1:]:
                v = num(o)
                if not isinstance(ans, str) and v is not None and abs(float(v) - float(want)) < 1e-9:
                    warn.append(f"distractor {o!r} equals the key")
    return [f"{where}: {w}" for w in warn]


SLOT = [0]


def finish(q):
    seed = int(hashlib.sha256((q["stem"] + q.get("stimulusId", "")).encode()).hexdigest()[:12], 16)
    rng = random.Random(seed)
    if q.get("lockedOrder"):
        return q
    nums = [num(o) for o in q["options"]]
    if all(n is not None for n in nums):
        if len(set(nums)) != len(nums):
            raise SystemExit(f"equal numeric options: {q['stem'][:60]}")
        order = sorted(range(len(nums)), key=lambda i: nums[i])
        q["lockedOrder"] = True
    else:
        # Text options: the distractors are shuffled by the seed and the key takes the next
        # slot in an A, B, C, D rotation, so every letter carries a quarter of the keys.
        wrong = [i for i in range(len(q["options"])) if i not in q["correct"]]
        rng.shuffle(wrong)
        slot = SLOT[0] % len(q["options"])
        SLOT[0] += 1
        order = wrong[:slot] + [q["correct"][0]] + wrong[slot:]
    q["options"] = [q["options"][i] for i in order]
    q["correct"] = [order.index(c) for c in q["correct"]]
    return q


BAD = re.compile(r"all of the above|none of the above|both a and b", re.I)
CURLY = "\u2014\u2013\u2018\u2019\u201c\u201d"


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any(ch in t for t in texts for ch in CURLY):
        warn.append("em/en dash or curly quote")
    if any(BAD.search(o) for o in q.get("options", [])):
        warn.append("all/none of the above")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    if len(q.get("options", [])) != 4:
        warn.append(f"{len(q.get('options', []))} options, want 4")
    if q["domain"] in ("rc", "da") and not q.get("stimulusId"):
        warn.append("passage or data item without stimulus")
    if q["domain"] == "sc":
        gaps = q["stem"].count("____")
        for o in q["options"]:
            if o.count(" ... ") != gaps - 1:
                warn.append(f"SC option {o!r} does not fill {gaps} blanks")
    if q["domain"] == "ce" and len(q["options"]) != 4:
        warn.append("contextual error needs four marked words")
    if q.get("basics") and q["basics"] not in BASICS[q["domain"]]:
        warn.append(f"basics tag {q['basics']} is not one its drill opens with")
    if re.search(r"\b(first|second|third|fourth|last) (option|choice|answer)\b|\bchoice [A-D]\b|\boption [A-D]\b", q["explanation"], re.I):
        warn.append("explanation points at an option by position")
    return [f"{where}: {w}" for w in warn]


def load(name):
    g = dict(HELPERS, __name__=f"qudurat_{name}")
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path, encoding="utf-8").read(), path, "exec"), g)
    return g["ITEMS"], g.get("STIMULI", [])


def emit(q, qid, section, test, module, out, warnings):
    q = dict(q)
    warnings += lint(q, qid)
    warnings += check_quant(q, qid)
    q = finish(q)
    item = {"id": qid, "section": section, "test": test, "module": module, "domain": DOM[q["domain"]],
            "skill": q.get("skill"), "difficulty": q["difficulty"], "format": q["format"]}
    for k in ("basics", "stimulusId", "stem", "options", "correct", "lockedOrder", "explanation"):
        if k in q:
            item[k] = q[k]
    if not item["skill"]:
        del item["skill"]
    out.append(item)


def build():
    out, stimuli, warnings = [], [], []
    for test in (1, 2):
        for section, name in (("verbal", f"verbal_t{test}"), ("quant", f"quant_t{test}")):
            items, st = load(name)
            stimuli += st
            letter = "V" if section == "verbal" else "Q"
            for module, want in MODULE_SIZE[section].items():
                lst = items.get(module, [])
                if len(lst) != want:
                    warnings.append(f"test {test} {section} module {module}: {len(lst)} items, want {want}")
                for n, q in enumerate(lst, 1):
                    if SECTION[q["domain"]] != section:
                        warnings.append(f"test {test} {section} module {module} item {n}: {q['domain']} in the wrong section")
                    emit(q, f"{PREFIX}-T{test}-{letter}{module}-{n:02d}", section, test, module, out, warnings)
    items, st = load("drill")
    stimuli += st
    for section, letter in (("verbal", "V"), ("quant", "Q")):
        for n, q in enumerate(items.get(section, []), 1):
            emit(q, f"{PREFIX}-D-{letter}-{n:02d}", section, 0, 1, out, warnings)

    for test in (1, 2):
        got = Counter(q["domain"] for q in out if q["test"] == test)
        for k, v in PER_TEST.items():
            if got[DOM[k]] != v:
                warnings.append(f"test {test}: {DOM[k]} has {got[DOM[k]]}, want {v}")

    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w", encoding="utf-8") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for test in (1, 2, 0):
        print(f"  test {test}:", dict(Counter(q["domain"] for q in out if q["test"] == test)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    shuffled = [q for q in out if not q.get("lockedOrder")]
    print("  shuffled key positions:", dict(sorted(Counter(q["correct"][0] for q in shuffled).items())))
    for dom in ("qdContext",):
        print(f"  {dom} keys:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out if q["domain"] == dom).items())))
    qc = [q for q in out if q.get("skill") == "Quantitative comparison"]
    print(f"  quantitative comparison: {len(qc)}, keys", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in qc).items())))
    numeric = [q for q in out if q.get("lockedOrder") and q.get("skill") != "Quantitative comparison" and q["domain"] != "qdContext"]
    ends = sum(q["correct"][0] in (0, len(q["options"]) - 1) for q in numeric)
    if numeric:
        print(f"  all-number items: {len(numeric)}, key in an end slot {ends} = {ends / len(numeric):.0%}")
        print("  all-number key slots:", dict(sorted(Counter(q["correct"][0] for q in numeric).items())))
    text = [q for q in shuffled]
    longest = [q["id"] for q in text if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0])]
    print(f"  key strictly longest (shuffled text items): {len(longest)}/{len(text)} = {len(longest) / max(1, len(text)):.0%}")
    with_b = sum(1 for q in out if q.get("basics"))
    print(f"  basics tags: {with_b}")

    stems = Counter((q.get("stimulusId", ""), q["stem"]) for q in out if q.get("skill") != "Odd one out")
    for s, k in stems.items():
        if k > 1:
            warnings.append(f"duplicate stem: {s[1][:70]}")
    sets = Counter(tuple(sorted(q["options"])) for q in out if q.get("skill") != "Quantitative comparison")
    for s, k in sets.items():
        if k > 1:
            warnings.append(f"shared option set: {s}")
    sids = Counter(s["id"] for s in stimuli)
    for s, k in sids.items():
        if k > 1:
            warnings.append(f"duplicate stimulus id {s}")
    used = {q.get("stimulusId") for q in out}
    for s in sids:
        if s not in used:
            warnings.append(f"unused stimulus {s}")
    for q in out:
        if q.get("stimulusId") and q["stimulusId"] not in sids:
            warnings.append(f"unknown stimulus {q['id']} {q['stimulusId']}")
    for s in stimuli:
        if any(ch in s["text"] for ch in CURLY):
            warnings.append(f"stimulus {s['id']}: em/en dash or curly quote")
    for w in warnings:
        print("  WARN", w)
    return 1 if warnings else 0


if __name__ == "__main__":
    sys.exit(build())
