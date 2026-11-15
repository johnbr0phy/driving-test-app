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
  run       4+ questions in a row (ID order, which is the order a training set
            shows them) whose keys share a word the stem does not give away,
            like RBT-SDOC-001 to -006, all "tell the supervisor"

A word that appears in every option of a question says nothing there, so those
questions are left out of its count.

Each bank is measured on what one student meets: the DMV bank (data/questions.json)
as each state's 200 (its 160 universal plus its 40), not all 2,200 at once. The
headline is marks per 50-question test: a test-wise student who always picks an
option holding one of the bank's tell words gains this many marks over guessing.
A few scattered tells move it by less than one mark; RBT's scenarios before the
Nov 2026 fix gained several.

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
RUN_MIN = 4

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
        out.append((q.get("questionId") or q.get("id") or "?", q.get("category") or q.get("domain") or "", opts, k,
                    q.get("question") or q.get("stem") or "", q.get("state"), q.get("type")))
    return out


def analyse(items):
    stat = defaultdict(lambda: [0, 0, 0.0, [], 0.0])  # n, keyed, expected, ids, rule hits
    for qid, _cat, opts, k, *_ in items:
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
    for qid, cat, opts, k, *_ in items:
        keys[(cat, " ".join(opts[k].lower().split()))].append(qid)
    repeats = [{"category": c, "key": t, "ids": ids} for (c, t), ids in keys.items() if len(ids) >= REPEAT_MIN and len(t) > 3]

    # Runs: in ID order within a category, 3+ keys in a row sharing a word that is
    # not in every option and not in the stem.
    runs = []
    by_cat = defaultdict(list)
    for it in items:
        by_cat[it[1]].append(it)
    for cat, its in by_cat.items():
        its.sort(key=lambda it: it[0])
        streak = {}
        for qid, _c, opts, k, stem_text, *_ in its:
            sets = [terms(o) for o in opts]
            cue = sets[k] - set.intersection(*sets) - terms(stem_text)
            nxt = {}
            for t in cue:
                nxt[t] = streak.get(t, []) + [qid]
            for t, ids in streak.items():
                if t not in nxt and len(ids) >= RUN_MIN:
                    runs.append({"category": cat, "term": t, "ids": ids})
            streak = nxt
        for t, ids in streak.items():
            if len(ids) >= RUN_MIN:
                runs.append({"category": cat, "term": t, "ids": ids})
    # One run per stretch of questions, the longest word.
    seen, uniq = set(), []
    for r in sorted(runs, key=lambda r: -len(r["ids"])):
        if r["ids"][0] in seen:
            continue
        seen.update(r["ids"])
        uniq.append(r)
    runs = uniq

    # Marks a test-wise student gains per 50-question test: on every question
    # where an option holds a tell word, pick among those options at random.
    tell_terms = {t["term"] for t in tells}
    gain = 0.0
    for qid, _c, opts, k, *_ in items:
        holders = [i for i, o in enumerate(opts) if terms(o) & tell_terms]
        if holders and len(holders) < len(opts):
            gain += (1 / len(holders) if k in holders else 0) - 1 / len(opts)
    marks = round(50 * gain / len(items), 1) if items else 0.0
    return {"items": len(items), "tells": tells, "antiTells": antis, "repeats": repeats, "runs": runs, "edge": marks}


def all_banks():
    # questions_proof.json is the DMV proofreading copy, not a bank a student answers (as in check_banks.py).
    v1 = [p for p in glob.glob(os.path.join(ROOT, "data", "*questions*.json"))
          if not re.search(r"_[a-z]{2}\.json$", p) and os.path.basename(p) != "questions_proof.json"]
    v2 = glob.glob(os.path.join(ROOT, "data", "v2", "*", "questions.json"))
    v2 += [p for p in glob.glob(os.path.join(ROOT, "data", "v2", "*", "*.json")) if not p.endswith("questions.json")]
    return sorted(set(v1 + v2))


def bank_key(path):
    rel = os.path.relpath(path, ROOT)
    if rel.startswith(os.path.join("data", "v2")):
        return "v2:" + rel.split(os.sep)[2]
    return rel


def score(res):
    return len(res["tells"]) + len(res["repeats"]) + len(res["runs"])


def student_pools(key, items):
    """What one student meets. The DMV bank is 51 states: each sees the
    universal questions plus its own."""
    if key != os.path.join("data", "questions.json"):
        return [(key, items)]
    universal = [it for it in items if it[6] == "Universal"]
    states = sorted({it[5] for it in items if it[6] != "Universal" and it[5]})
    return [(f"{key}:{st}", universal + [it for it in items if it[5] == st and it[6] != "Universal"]) for st in states]


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
    pools = [pool for key in sorted(groups) for pool in student_pools(key, groups[key])]
    for key, items in pools:
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

    flagged = [(k, r) for k, r in results.items() if r["tells"] or r["repeats"] or r["runs"]]
    if base_path:  # only the banks that got worse
        flagged = [(k, r) for k, r in flagged if k in worse]
    flagged.sort(key=lambda kr: -kr[1]["edge"])
    for key, r in flagged:
        if summary:
            top = ", ".join(f'{t["term"]} {t["key"]}/{t["n"]}' for t in r["tells"][:3])
            print(f'{r["edge"]:5.1f}  {key}  tells: {top or "-"}  repeats: {len(r["repeats"])}  runs: {len(r["runs"])}')
            continue
        print(f'\n{key}: {r["items"]} questions; picking the tell words gains {r["edge"]} marks per 50-question test')
        for t in r["tells"]:
            print(f'  TELL  "{t["term"]}" is in the key {t["key"]} of {t["n"]} times; picking it scores {t["rule"]} against {t["n"] / 4:g} by guessing: {", ".join(t["ids"][:8])}{" ..." if len(t["ids"]) > 8 else ""}')
        for t in r["antiTells"][:5]:
            print(f'  anti  "{t["term"]}" is in the key {t["key"]} of {t["n"]} times (chance {t["chance"]})')
        for rep in r["repeats"]:
            print(f'  REPEAT [{rep["category"]}] "{rep["key"]}" keyed {len(rep["ids"])} times: {", ".join(rep["ids"])}')
        for run in r["runs"]:
            print(f'  RUN   [{run["category"]}] {len(run["ids"])} keys in a row share "{run["term"]}": {", ".join(run["ids"])}')
    if not flagged:
        print(f"checked {len(results)} banks: " + ("none worse than the baseline" if base_path else "no answer patterns"))
    elif summary:
        print(f"\n{len(flagged)} of {len(results)} banks have a tell, a repeated key or a run (first column: marks gained per 50-question test)")

    if base_path and worse:
        print("\nWorse than the baseline (new tells, repeated keys or runs): " + ", ".join(worse))
        print("Rewrite those questions (see .claude/skills/exam-bank/SKILL.md, \"No answer patterns\").")
        return 1
    if strict and flagged:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
