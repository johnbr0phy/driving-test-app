"""Find answer patterns a test-wise student can use instead of the content.

Every question in a bank can be right on its own and the bank still be bad: in
Nov 2026 the RBT scenario questions keyed "tell the supervisor" in 43 of the 51
items that offered it, so "pick the supervisor one" beat the content. The blind
review (which reads one question at a time) passed them all. This check reads
the bank as a whole.

For every word in the options (lightly stemmed, so supervisor / supervision
count once) it compares how often the option holding it is the key against
what chance gives (an option among four is the key a quarter of the time):

  tell      the word marks the key: in an option in 8+ questions, and the rule
            "pick an option with this word" (at random when two have it) is
            right in 55%+ of them, at least 4 more than guessing
  anti-tell the word marks a wrong option: in an option in 10+ questions and
            the key in under 10%, at least 4 fewer than chance ("always",
            "never", "immediately"...)
  repeat    the same key, word for word, in 3+ questions of one category

A word that appears in every option of a question says nothing there, so those
questions are left out of its count. The bank's score is how much the best
single-word rule ("pick the option with WORD") beats guessing.

Usage:
  python3 -I tools/check_answer_patterns.py data/rbt-questions.json [...]
  python3 -I tools/check_answer_patterns.py --all          every v1 and v2 bank
  python3 -I tools/check_answer_patterns.py --all --summary  one line per flagged bank
  python3 -I tools/check_answer_patterns.py --strict FILE   exit 1 on any tell or repeat
  python3 -I tools/check_answer_patterns.py --all --baseline tools/answer_patterns_baseline.json
            exit 1 only on a bank whose findings are worse than the baseline
  python3 -I tools/check_answer_patterns.py --all --write-baseline tools/answer_patterns_baseline.json
"""
import glob
import json
import os
import re
import sys
from collections import defaultdict

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

TELL_MIN_N, TELL_RATE, TELL_EXCESS = 8, 0.55, 4
ANTI_MIN_N, ANTI_RATE, ANTI_DEFICIT = 10, 0.10, 4
REPEAT_MIN = 3

STOP = set("""
a an the and or but of to in on at by for with from as is are was were be been being it its this that
these those their there then than so not no do does did done has have had can could will would should
may might must shall into onto over under up down out off about after before during while each every
any all some one two three four five first second third next only also just more most less least very
your you his her he she they them we our us who whom which what when where why how if per via
""".split())

WORD = re.compile(r"[a-zA-Z][a-zA-Z'\-]*")


def stem(w):
    w = w.lower().strip("'-")
    if w.endswith("'s"):
        w = w[:-2]
    return w[:7] if len(w) > 7 else w


def terms(text):
    return {stem(w) for w in WORD.findall(text or "") if len(w) > 2 and w.lower() not in STOP}


def load_items(path):
    """(id, category, options, key index) for every single-answer item."""
    data = json.load(open(path, encoding="utf-8"))
    if isinstance(data, dict):
        data = data.get("questions", [])
    out = []
    for q in data:
        if not isinstance(q, dict):
            continue
        if "optionA" in q:
            opts = [q.get("option" + L, "") for L in "ABCD"]
            k = q.get("correctIndex")
            if k is None and q.get("correctAnswer") in list("ABCD"):
                k = "ABCD".index(q["correctAnswer"])
        elif q.get("format", "single") == "single" and isinstance(q.get("options"), list):
            opts = [o if isinstance(o, str) else (o.get("text") or "") for o in q["options"]]
            a = q.get("answer")
            k = a[0] if isinstance(a, list) and len(a) == 1 else (a if isinstance(a, int) else None)
        else:
            continue
        if k is None or not (0 <= k < len(opts)) or len(opts) < 3:
            continue
        out.append((q.get("questionId") or q.get("id") or "?", q.get("category") or q.get("domain") or "", opts, k))
    return out


def analyse(items):
    stat = defaultdict(lambda: [0, 0, 0.0, [], 0.0])  # n, keyed, expected, ids, rule hits
    for qid, _cat, opts, k in items:
        sets = [terms(o) for o in opts]
        everywhere = set.intersection(*sets) if sets else set()
        for t in set().union(*sets) - everywhere:
            holders = [i for i, s in enumerate(sets) if t in s]
            s = stat[t]
            s[0] += 1
            s[2] += len(holders) / len(opts)
            if k in holders:
                s[1] += 1
                s[3].append(qid)
                s[4] += 1 / len(holders)
    tells, antis = [], []
    for t, (n, keyed, exp, ids, hits) in stat.items():
        guess = n / 4
        if n >= TELL_MIN_N and hits / n >= TELL_RATE and hits - guess >= TELL_EXCESS:
            tells.append({"term": t, "n": n, "key": keyed, "chance": round(exp, 1), "rule": round(hits, 1), "gain": hits - guess, "ids": ids})
        if n >= ANTI_MIN_N and keyed / n < ANTI_RATE and exp - keyed >= ANTI_DEFICIT:
            antis.append({"term": t, "n": n, "key": keyed, "chance": round(exp, 1)})
    tells.sort(key=lambda r: -r["gain"])
    antis.sort(key=lambda r: -(r["chance"] - r["key"]))

    keys = defaultdict(list)
    for qid, cat, opts, k in items:
        keys[(cat, " ".join(opts[k].lower().split()))].append(qid)
    repeats = [{"category": c, "key": t, "ids": ids} for (c, t), ids in keys.items() if len(ids) >= REPEAT_MIN and len(t) > 3]

    # The best "pick the option with WORD" rule: items it answers, and its edge over guessing.
    best = None
    for t in tells:
        gain = t["gain"]
        if best is None or gain > best[1]:
            best = (t["term"], gain)
    edge = round(100 * best[1] / len(items), 1) if best and items else 0.0
    return {"items": len(items), "tells": tells, "antiTells": antis, "repeats": repeats, "edge": edge}


def all_banks():
    v1 = [p for p in glob.glob(os.path.join(ROOT, "data", "*questions*.json")) if not re.search(r"_[a-z]{2}\.json$", p)]
    v2 = glob.glob(os.path.join(ROOT, "data", "v2", "*", "questions.json"))
    v2 += [p for p in glob.glob(os.path.join(ROOT, "data", "v2", "*", "*.json")) if not p.endswith("questions.json")]
    return sorted(set(v1 + v2))


def bank_key(path):
    rel = os.path.relpath(path, ROOT)
    if rel.startswith(os.path.join("data", "v2")):
        return "v2:" + rel.split(os.sep)[2]
    return rel


def score(res):
    return len(res["tells"]) + len(res["repeats"])


def main(argv):
    strict = "--strict" in argv
    summary = "--summary" in argv
    base_path = argv[argv.index("--baseline") + 1] if "--baseline" in argv else None
    write_path = argv[argv.index("--write-baseline") + 1] if "--write-baseline" in argv else None
    skip = {base_path, write_path}
    paths = all_banks() if "--all" in argv else [a for a in argv if not a.startswith("--") and a not in skip]

    # v2 exams are checked per exam, not per file, so a pattern split across modules still counts.
    groups = defaultdict(list)
    for p in paths:
        groups[bank_key(p)].extend(load_items(p))

    baseline = json.load(open(base_path)) if base_path else {}
    results, worse = {}, []
    for key in sorted(groups):
        items = groups[key]
        if len(items) < 20:
            continue
        res = analyse(items)
        results[key] = res
        if base_path and score(res) > baseline.get(key, 0):
            worse.append(key)

    if write_path:
        json.dump({k: score(r) for k, r in results.items() if score(r)}, open(write_path, "w"), indent=1, sort_keys=True)
        open(write_path, "a").write("\n")
        print(f"wrote {write_path}")
        return 0

    flagged = [(k, r) for k, r in results.items() if r["tells"] or r["repeats"]]
    if base_path:  # only the banks that got worse
        flagged = [(k, r) for k, r in flagged if k in worse]
    flagged.sort(key=lambda kr: -kr[1]["edge"])
    for key, r in flagged:
        if summary:
            top = ", ".join(f'{t["term"]} {t["key"]}/{t["n"]}' for t in r["tells"][:3])
            print(f'{r["edge"]:5.1f}%  {key}  tells: {top or "-"}  repeats: {len(r["repeats"])}')
            continue
        print(f'\n{key}: {r["items"]} questions, best one-word rule beats guessing by {r["edge"]} points')
        for t in r["tells"]:
            print(f'  TELL  "{t["term"]}" is in the key {t["key"]} of {t["n"]} times; picking it scores {t["rule"]} against {t["n"] / 4:g} by guessing: {", ".join(t["ids"][:8])}{" ..." if len(t["ids"]) > 8 else ""}')
        for t in r["antiTells"][:5]:
            print(f'  anti  "{t["term"]}" is in the key {t["key"]} of {t["n"]} times (chance {t["chance"]})')
        for rep in r["repeats"]:
            print(f'  REPEAT [{rep["category"]}] "{rep["key"]}" keyed {len(rep["ids"])} times: {", ".join(rep["ids"])}')
    if not flagged:
        print(f"checked {len(results)} banks: " + ("none worse than the baseline" if base_path else "no answer patterns"))
    elif summary:
        print(f"\n{len(flagged)} of {len(results)} banks have a tell or a repeated key")

    if base_path and worse:
        print("\nWorse than the baseline (new tells or repeated keys): " + ", ".join(worse))
        print("Rewrite those questions (see .claude/skills/exam-bank/SKILL.md, \"No answer patterns\").")
        return 1
    if strict and flagged:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
