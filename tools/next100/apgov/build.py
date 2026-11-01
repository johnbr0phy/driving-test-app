#!/usr/bin/env python3
"""Build the AP U.S. Government and Politics v2 bank from Python-data sources.

Usage: python3 -I tools/next100/apgov/build.py

Sources (one file per domain, in unit order): u1.py (Unit 1), congress.py
and courts.py (Unit 2), u3.py (Unit 3), u4.py (Unit 4), voting.py and
groups.py (Unit 5). Each file has STIMULI (foundational document excerpts,
original practice texts, hypothetical data tables and visuals described in
words) and ITEMS, each
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, lock=False)
with test 1 or 2 (a practice-test item) or 0 (drill only). Skill names are
the AP U.S. Government skill categories assessed in the multiple choice,
given to the sources as the constants CA (concept application), SC (SCOTUS
application), DA (data analysis) and SA (source analysis). The key is
always written first; the build shuffles the four options with a seed from
the stem. Options that are all numbers are sorted ascending and locked;
lock=True sorts a positional list of labels (President A to D, age groups)
into natural order and locks it, so the key lands wherever its label falls.

Each practice test is one section `mcq`, one 55-item module, in unit order,
each stimulus set kept together in authored order. Ids: APGOV-T<n>-NNN and
APGOV-D-NNN (drill only), so the id sort keeps that order.
"""
import hashlib, json, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APGOV"
DOMAINS = [("u1", "apgovFoundations", 10), ("congress", "apgovCongress", 9), ("courts", "apgovCourts", 8),
           ("u3", "apgovRights", 9), ("u4", "apgovIdeology", 7), ("voting", "apgovVoting", 6),
           ("groups", "apgovCampaigns", 6)]
DRILL_ONLY = 13
SKILLS = {
    "CA": "Concept application",
    "SC": "SCOTUS application",
    "DA": "Data analysis",
    "SA": "Source analysis",
}


def Q(test, d, skill, stem, opts, expl, stim=None, lock=False):
    assert len(opts) == 4, stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "explanation": expl,
            "stim": stim, "lock": lock}


NUM = re.compile(r"^-?\d+(\.\d+)?%?$")


def _num(s):
    return float(re.match(r"-?\d+(\.\d+)?", s).group(0)) if NUM.match(s) else None


def load(name):
    g = {"Q": Q, **SKILLS}
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g.get("STIMULI", []), g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16))
    nums = [_num(o) for o in q["options"]]
    out = {}
    if all(n is not None for n in nums):
        order = sorted(range(4), key=lambda i: nums[i])
        out["lockedOrder"] = True
    elif q["lock"]:
        order = sorted(range(4), key=lambda i: q["options"][i])  # labels sort into natural order
        out["lockedOrder"] = True
    else:
        order = list(range(4))
        rng.shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    if "$" in " ".join(texts):
        warn.append("dollar sign")
    if q["skill"] not in SKILLS.values():
        warn.append("unknown skill")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli, domains = [], []
    for name, dom, per in DOMAINS:
        st, items = load(name)
        stimuli += st
        domains.append((dom, per, items))
    for s in stimuli:
        if any(ch in s["text"] + s["title"] for ch in "\u2014\u2013\u2019\u201c\u201d"):
            print("  WARN dash or curly quote in", s["id"])
    out, warnings, authored = [], [], []

    def emit(q, dom, qid, test):
        warnings.extend(lint(q, qid))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": "mcq", "test": test, "module": 1, "domain": dom, "skill": q["skill"],
                "difficulty": q["difficulty"], "format": "single"}
        if q["stim"]:
            item["stimulusId"] = q["stim"]
        item.update({"stem": q["stem"], "options": f["options"], "correct": f["correct"]})
        if f.get("lockedOrder"):
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append(item)

    for test in (1, 2):
        n = 0
        for dom, per, items in domains:
            mine = [q for q in items if q["test"] == test]
            assert len(mine) == per, (dom, test, len(mine))
            for q in mine:
                assert q["stim"] is None or q["stim"].startswith(f"{PREFIX}-T{test}-"), (dom, q["stem"])
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for dom, per, items in domains:
        mine = [q for q in items if q["test"] == 0]
        assert len(mine) == DRILL_ONLY, (dom, len(mine))
        for q in mine:
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    used = Counter(q.get("stimulusId") for q in out if q.get("stimulusId"))
    assert set(used) == {s["id"] for s in stimuli}, ("stimulus not used or unknown", set(used) ^ {s["id"] for s in stimuli})
    for sid, k in used.items():
        if k < 2 or k > 4:
            print(f"  WARN stimulus {sid} has {k} questions")
    dst = os.path.join(ROOT, "data/v2/apgov/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"apgov: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in out if q["test"] == t)))
    print("  drill pools (test 1 + drill-only):", dict(Counter(q["domain"] for q in out if q["test"] in (0, 1))))
    print("  skills:", dict(Counter(q["skill"] for q in out)))
    cand = [(qid, q) for qid, q in authored if not all(_num(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand if len(q["options"][0]) > max(len(o) for o in q["options"][1:])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    over = [qid for qid, q in cand if len(q["options"][0]) > 1.2 * sum(len(o) for o in q["options"][1:]) / 3]
    print(f"  key over 120% of wrong-option mean: {len(over)}/{len(cand)} = {len(over) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in out).items())))
    stems = Counter(q["stem"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)


if __name__ == "__main__":
    build()
