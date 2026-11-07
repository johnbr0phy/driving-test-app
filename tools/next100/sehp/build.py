#!/usr/bin/env python3
"""Build the Högskoleprovet (sehp) v2 bank from Python-data sources.

Usage: python3 -I tools/next100/sehp/build.py

Sources, one file per delprov, each defining ITEMS = {1: [...], 2: [...], 0: [...]}
(test 1, test 2, 0 = drill only) and STIMULI (shared texts, tables, maps):

  verbal  ord.py (ORD)  las.py (LÄS)  mek.py (MEK)  elf.py (ELF)
  kvant   xyz.py (XYZ)  kva.py (KVA)  nog.py (NOG)  dtk.py (DTK)

A practice test is one verbal provpass and one kvantitativ provpass in the real
order (ORD 10, LÄS 10, MEK 10, ELF 10; XYZ 12, KVA 10, NOG 6, DTK 12). Ids are
SEHP-T<n>-V-NN and SEHP-T<n>-K-NN (drill only SEHP-D-V-NN, SEHP-D-K-NN), so the
session builder's id sort keeps the authored order and every shared text stays
together.

Authoring: ORD, LÄS, MEK, ELF and DTK-text items list the key first and are
shuffled by a seed from the stem. KVA keeps its four fixed alternatives and NOG
its five, in the real order (lockedOrder, key given as a letter). XYZ and DTK
items whose options are all numbers are sorted ascending and locked; the key is
found again after sorting. Swedish decimals use a comma: write 0,5 in plain
text and 0{,}5 inside $...$.
"""
import hashlib, json, os, random, re, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
EXAM = "sehp"
PREFIX = "SEHP"
DOM = {
    "ord": "sehpOrd", "las": "sehpLas", "mek": "sehpMek", "elf": "sehpElf",
    "xyz": "sehpXyz", "kva": "sehpKva", "nog": "sehpNog", "dtk": "sehpDtk",
}
SECTION = {"ord": "verbal", "las": "verbal", "mek": "verbal", "elf": "verbal",
           "xyz": "kvant", "kva": "kvant", "nog": "kvant", "dtk": "kvant"}
ORDER = {"verbal": ["ord", "las", "mek", "elf"], "kvant": ["xyz", "kva", "nog", "dtk"]}
PER_TEST = {"ord": 10, "las": 10, "mek": 10, "elf": 10, "xyz": 12, "kva": 10, "nog": 6, "dtk": 12}
SKILL = {"ord": "Ordförståelse", "las": "Svensk läsförståelse", "mek": "Meningskomplettering",
         "elf": "Engelsk läsförståelse", "xyz": "Matematisk problemlösning", "kva": "Kvantitativa jämförelser",
         "nog": "Kvantitativa resonemang", "dtk": "Diagram, tabeller och kartor"}

KVA_OPTIONS = ["I är större än II", "II är större än I", "I är lika med II", "informationen är otillräcklig"]
NOG_OPTIONS = ["i (1) men ej i (2)", "i (2) men ej i (1)", "i (1) tillsammans med (2)",
               "i (1) och (2) var för sig", "ej genom de båda påståendena"]


def _q(dom, d, stem, expl, **kw):
    q = {"domain": dom, "difficulty": d, "format": "single", "stem": stem, "explanation": expl}
    q.update({k: v for k, v in kw.items() if v is not None})
    return q


def ORD(d, word, opts, expl):
    """Ordförståelse: the word in bold, five alternatives, key first."""
    q = _q("ord", d, f"Vad betyder **{word}**?", expl)
    q["options"], q["correct"] = list(opts), [0]
    return q


def LAS(d, stim, stem, opts, expl):
    q = _q("las", d, stem, expl, stimulusId=stim)
    q["options"], q["correct"] = list(opts), [0]
    return q


def MEK(d, text, opts, expl):
    """Meningskomplettering: ___ marks each gap; multi-gap options are joined with ' ... '."""
    gaps = text.count("___")
    ask = "Vilket ord passar bäst i luckan?" if gaps == 1 else "Vilka ord passar bäst i luckorna?"
    q = _q("mek", d, f"{text}\n\n{ask}", expl)
    q["options"], q["correct"] = list(opts), [0]
    return q


def ELF(d, stim, stem, opts, expl):
    q = _q("elf", d, stem, expl, stimulusId=stim)
    q["options"], q["correct"] = list(opts), [0]
    return q


def XYZ(d, stem, opts, expl):
    q = _q("xyz", d, stem, expl)
    q["options"], q["correct"] = list(opts), [0]
    return q


def KVA(d, info, one, two, letter, expl):
    stem = (info + "\n\n" if info else "") + f"**Kvantitet I:** {one}\n\n**Kvantitet II:** {two}\n\nJämför kvantitet I och kvantitet II:"
    q = _q("kva", d, stem, expl)
    q["options"], q["correct"], q["lockedOrder"] = list(KVA_OPTIONS), ["ABCD".index(letter)], True
    return q


def NOG(d, question, s1, s2, letter, expl):
    stem = f"{question}\n\n(1) {s1}\n\n(2) {s2}\n\nTillräcklig information för lösningen erhålls:"
    q = _q("nog", d, stem, expl)
    q["options"], q["correct"], q["lockedOrder"] = list(NOG_OPTIONS), ["ABCDE".index(letter)], True
    return q


def DTK(d, stim, stem, opts, expl):
    q = _q("dtk", d, stem, expl, stimulusId=stim)
    q["options"], q["correct"] = list(opts), [0]
    return q


HELPERS = {"ORD": ORD, "LAS": LAS, "MEK": MEK, "ELF": ELF, "XYZ": XYZ, "KVA": KVA, "NOG": NOG, "DTK": DTK}

FRAC = re.compile(r"^(-?)\\frac\{(-?\d+)\}\{(\d+)\}$")


def num(s):
    """The value of an all-number option ('12 500 kr', '0,25', '$\\frac{3}{4}$', '40 %'), else None."""
    t = s.strip()
    if t.startswith("$") and t.endswith("$"):
        t = t[1:-1].strip()
    t = t.replace("{,}", ",").replace("\\,", "").replace(" ", " ")
    m = FRAC.match(t)
    if m:
        v = int(m.group(2)) / int(m.group(3))
        return -v if m.group(1) else v
    t = re.sub(r"\s*(kr|%|procent|cm|cm\^2|cm\^3|m|m\^2|km|km/h|kg|g|liter|år|timmar|minuter|st|grader|\^\\circ|°|personer|dagar|mil|gånger|grad|grader)$", "", t)
    t = t.replace(" ", "").replace(",", ".").replace("\u2212", "-")
    try:
        return float(t)
    except ValueError:
        return None


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
        order = list(range(len(q["options"])))
        rng.shuffle(order)
    q["options"] = [q["options"][i] for i in order]
    q["correct"] = [order.index(c) for c in q["correct"]]
    return q


BAD_SV = re.compile(r"alla ovanstående|inget av ovanstående|ingen av ovanstående|alla svaren|alla alternativen|all of the above|none of the above", re.I)


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2018\u2019\u201c\u201d\u201e"):
        warn.append("em/en dash or curly quote")
    if any(BAD_SV.search(o) for o in q.get("options", [])):
        warn.append("all/none of the above")
    if len(set(q.get("options", []))) != len(q.get("options", [])):
        warn.append("duplicate option")
    if q["domain"] in ("las", "elf", "dtk") and not q.get("stimulusId"):
        warn.append("text item without stimulus")
    if q["domain"] == "ord" and len(q["options"]) != 5:
        warn.append("ORD needs 5 alternatives")
    if q["domain"] in ("las", "mek", "elf", "xyz", "dtk") and len(q["options"]) != 4:
        warn.append(f"{q['domain']} needs 4 alternatives")
    if q["domain"] == "mek":
        gaps = q["stem"].count("___")
        for o in q["options"]:
            if o.count(" ... ") != gaps - 1:
                warn.append(f"MEK option {o!r} does not fill {gaps} gaps")
    return [f"{where}: {w}" for w in warn]


def load(name):
    g = dict(HELPERS, __name__=f"sehp_{name}")
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path, encoding="utf-8").read(), path, "exec"), g)
    return g["ITEMS"], g.get("STIMULI", [])


def build():
    items, stimuli, warnings, authored = {}, [], [], []
    for name in DOM:
        it, st = load(name)
        items[name] = it
        stimuli += st
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        for section, names in ORDER.items():
            n = 0
            letter = "V" if section == "verbal" else "K"
            for name in names:
                lst = items[name].get(test, [])
                if test and len(lst) != PER_TEST[name]:
                    warnings.append(f"{name} test {test}: {len(lst)} items, want {PER_TEST[name]}")
                for q in lst:
                    n += 1
                    qid = f"{PREFIX}-{tag}-{letter}-{n:02d}"
                    q = dict(q)
                    q["domain"] = name
                    warnings += lint(q, qid)
                    authored.append((qid, dict(q)))
                    q = finish(q)
                    item = {"id": qid, "section": section, "test": test, "module": 1, "domain": DOM[name],
                            "skill": SKILL[name], "difficulty": q["difficulty"], "format": q["format"]}
                    for k in ("stimulusId", "stem", "options", "correct", "lockedOrder", "explanation"):
                        if k in q:
                            item[k] = q[k]
                    out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w", encoding="utf-8") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for test in (1, 2, 0):
        print(f"  test {test}:", dict(Counter(q["domain"] for q in out if q["test"] == test)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    cand = [(qid, q) for qid, q in authored if q["domain"] in ("ord", "las", "mek", "elf", "xyz", "dtk")
            and not all(num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    numeric = [q for q in out if q.get("lockedOrder") and q["domain"] in (DOM["xyz"], DOM["dtk"])]
    ends = sum(q["correct"][0] in (0, len(q["options"]) - 1) for q in numeric)
    if numeric:
        print(f"  all-number items: {len(numeric)}, key in an end slot {ends} = {ends / len(numeric):.0%}")
    for dom in ("sehpKva", "sehpNog"):
        print(f"  {dom} keys:", dict(sorted(Counter("ABCDE"[q["correct"][0]] for q in out if q["domain"] == dom).items())))
    shuffled = [q for q in out if not q.get("lockedOrder")]
    print("  shuffled key positions:", dict(sorted(Counter(q["correct"][0] for q in shuffled).items())))
    stems = Counter((q.get("stimulusId", ""), q["stem"]) for q in out)
    for s, k in stems.items():
        if k > 1:
            warnings.append(f"duplicate stem: {s[1][:70]}")
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
        if any(ch in s["text"] for ch in "\u2014\u2013\u2018\u2019\u201c\u201d\u201e"):
            warnings.append(f"stimulus {s['id']}: em/en dash or curly quote")
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)
    return 1 if warnings else 0


if __name__ == "__main__":
    sys.exit(build())
