"""Two shortcuts a test-wise student can use that a one-question-at-a-time
review never sees.

1. Option families (the "quartet" build). In Nov 2026 a whole batch of ten
   banks (#876, #877) was written as groups of four questions sharing the same
   four options, each option keyed exactly once. It gives perfectly even keys
   and a clean options-only review, but in a training set the student meets the
   same four options four times, so the last ones fall to elimination, and the
   wrong options are borrowed from neighbouring questions instead of written
   for the one in front of the student.

   Reported: the share of questions whose exact option set (any order) is also
   used by another question of the bank. Fixed answer formats that are
   legitimately the same everywhere (True / False / Not Given, Yes / No,
   quantitative comparison, Statement I / II, "Sentence 3", number answers)
   are left out, and so are questions on one shared passage, table or puzzle
   (v2 stimulusId), which naturally offer the same names or rows, and any set
   offered in 6+ questions (a standard format of that exam, such as UPSC's
   "1 only / 2 only / Both / Neither" or a data-sufficiency set). The quartet
   build shows up as many sets of 2 to 5 questions each.

2. Stem echo. Pick the option that alone shares the most words with the
   question. In good banks that rule is right about as often as guessing
   (26 to 38%); in the Nov 2026 batch it was right 63 to 74% of the time, so a
   student who knew nothing scored 44 to 49%. An options-only review hides the
   stem, so it cannot see this.

   Reported: marks per 50-question test that the echo rule gains over
   guessing, and the reverse (a writer who overcorrects so the echoing option
   is never the key makes "rule it out" a cue too).

Limits (a bank fails at or above either; older banks over a limit are listed
in tools/option_reuse_baseline.json and may only get better):
  shared option sets   10% of questions
  echo gain            4.5 marks per 50

Usage:
  python3 -I tools/check_option_reuse.py data/x-questions.json data/v2/y/questions.json
  python3 -I tools/check_option_reuse.py --all
  python3 -I tools/check_option_reuse.py --all --baseline tools/option_reuse_baseline.json
  python3 -I tools/check_option_reuse.py --all --write-baseline tools/option_reuse_baseline.json
  add --list to print the shared option sets and echo-keyed questions of each bank
"""
import glob
import json
import os
import re
import sys
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_answer_patterns import load_items, all_banks, bank_key, STOP, ROOT  # noqa: E402

FAMILY_LIMIT = 0.10
# A set offered in this many questions or more is a standard answer format of the
# exam (data sufficiency, "Only I follows", fluid categories 1-5), not a family.
FORMAT_MIN = 6
ECHO_LIMIT = 4.5

WORD = re.compile(r"[a-zA-ZÀ-ɏͰ-ϿЀ-ӿऀ-ॿ]+")
STOP_EXTRA = set("""
which what following most best first should would does question answer option options choose select
statement describes described describe correct true false example shows show given above below
""".split())

FIXED = re.compile(r"^(true|false|not given|yes|no|neither|both|uncertain|"
                   r"quantity [ab] is greater|the two quantities are equal|the relationship cannot be determined|"
                   r"statement (i|ii|1|2)\b.*|sentence \d+|paragraph \d+|no change|no error|no mistake|"
                   r"(i|ii|iii|iv)( and (i|ii|iii|iv))?( only)?|[a-e] only|all of the above|none of the above)\.?$",
                   re.I)
NUMERIC = re.compile(r"^[\s$\\(){}.,:/%+\-\d£€₹a-z]{0,6}[\d][\s$\\(){}.,:/%+\-\d]*(\s?[a-zA-Z%°]{0,8}\.?)?$")


def words(text):
    out = set()
    for w in WORD.findall(text or ""):
        w = w.lower()
        if len(w) < 4 or w in STOP or w in STOP_EXTRA:
            continue
        out.add(w[:6])
    return out


def norm(o):
    return re.sub(r"\s+", " ", (o or "").strip().lower())


def fixed_set(opts):
    """A format that is the same everywhere by design, or a list of numbers."""
    n = [norm(o) for o in opts]
    return all(FIXED.match(o) for o in n) or all(NUMERIC.match(o) for o in n)


def stimuli(paths):
    """question id -> its shared stimulus, for v2 banks."""
    out = {}
    for p in paths:
        data = json.load(open(p, encoding="utf-8"))
        qs = data.get("questions", []) if isinstance(data, dict) else data
        for q in qs:
            if isinstance(q, dict) and q.get("stimulusId"):
                out[q.get("id")] = q["stimulusId"]
    return out


def analyse(items, stim=None):
    stim = stim or {}
    fams = defaultdict(list)
    for it in items:
        opts = it[2]
        if fixed_set(opts):
            continue
        fams[tuple(sorted(norm(o) for o in opts))].append(it[0])
    # several questions on one passage or puzzle may share its names
    shared = {k: v for k, v in fams.items() if 1 < len(v) <= FORMAT_MIN - 1
              and not (all(stim.get(i) for i in v) and len({stim[i] for i in v}) == 1)}
    n_shared = sum(len(v) for v in shared.values())

    fire = hit = 0
    echoed = []
    for qid, _cat, opts, k, stem_text, *_ in items:
        sw = words(stem_text)
        ov = [len(words(o) & sw) for o in opts]
        m = max(ov)
        if m > 0 and ov.count(m) == 1:
            fire += 1
            if ov.index(m) == k:
                hit += 1
                echoed.append(qid)
    n = len(items)
    chance = 1 / 4
    # score of "echo where it fires, guess elsewhere" minus pure guessing, per 50
    gain = ((hit + chance * (n - fire)) / n - chance) * 50 if n else 0.0
    # The reverse cue, from overcorrecting: the echoing option is never the key,
    # so ruling it out and guessing among the other three beats guessing.
    anti = (((fire - hit) / 3 - fire * chance) / n) * 50 if n else 0.0
    return {
        "n": n,
        "shared": n_shared,
        "shared_pct": n_shared / n if n else 0.0,
        "families": shared,
        "echo_fire": fire,
        "echo_hit": hit,
        "echo_gain": gain,
        "anti_echo_gain": anti,
        "echoed": echoed,
    }


def exam_groups(paths):
    """v2 exams spread over several files (SAT, ACT) are one bank to a student."""
    groups = defaultdict(list)
    for p in paths:
        groups[bank_key(p)].append(p)
    return groups


def over(res):
    return res["shared_pct"] >= FAMILY_LIMIT or max(res["echo_gain"], res["anti_echo_gain"]) >= ECHO_LIMIT


def main(argv):
    lst = "--list" in argv
    base_path = argv[argv.index("--baseline") + 1] if "--baseline" in argv else None
    write_path = argv[argv.index("--write-baseline") + 1] if "--write-baseline" in argv else None
    skip = {base_path, write_path}
    files = [a for a in argv if not a.startswith("--") and a not in skip]
    paths = all_banks() if "--all" in argv else [os.path.abspath(f) for f in files]
    if not paths:
        print(__doc__)
        return 2
    baseline = json.load(open(base_path)) if base_path else {}
    out_base = {}
    failed = []
    for key, ps in sorted(exam_groups(paths).items()):
        items = []
        for p in ps:
            items += load_items(p)
        if len(items) < 20:
            continue
        res = analyse(items, stimuli(ps))
        flag = over(res)
        if write_path and flag:
            out_base[key] = {"shared_pct": round(res["shared_pct"], 3), "echo_gain": round(res["echo_gain"], 2)}
        if base_path:
            b = baseline.get(key)
            worse = flag and (b is None or res["shared_pct"] > b["shared_pct"] + 0.005
                              or res["echo_gain"] > b["echo_gain"] + 0.05)
        else:
            worse = flag
        if worse:
            failed.append(key)
        if worse or lst or (not base_path and not write_path):
            print(f"{key}: {res['n']} items, shared option sets {res['shared']} ({res['shared_pct']:.0%}, limit {FAMILY_LIMIT:.0%}), "
                  f"echo rule right {res['echo_hit']}/{res['echo_fire']}, gain {res['echo_gain']:.1f} marks per 50, ruling the echo out gains {res['anti_echo_gain']:.1f} (limit {ECHO_LIMIT})"
                  + ("  FAIL" if worse else ""))
            if lst:
                for fam, ids in list(res["families"].items())[:15]:
                    print("   same options:", ", ".join(ids), "|", " / ".join(fam)[:160])
                if res["echoed"]:
                    print("   key alone echoes the stem:", ", ".join(res["echoed"][:40]) + (" ..." if len(res["echoed"]) > 40 else ""))
    if write_path:
        with open(write_path, "w") as f:
            json.dump(dict(sorted(out_base.items())), f, indent=1)
            f.write("\n")
        print(f"wrote {len(out_base)} banks over a limit to {write_path}")
        return 0
    if failed:
        print(f"\n{len(failed)} bank(s) over a limit" + (" and worse than the baseline" if base_path else "") + ": " + ", ".join(failed))
        print("Write each question's own wrong options (no option set shared with another question), and make the key no "
              "more likely than the wrong options to repeat the question's words. See .claude/skills/exam-bank (option design).")
        return 1
    print("option reuse and stem echo: OK" + (" (none worse than the baseline)" if base_path else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
