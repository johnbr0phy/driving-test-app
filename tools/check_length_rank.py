#!/usr/bin/env python3
"""Find banks where the key's length rank gives it away.

validate_bank.py stops the key from being the longest option too often. Writers
met that rule by trimming the key until it was just shorter than one distractor,
so the key became the second-longest option instead. In Nov 2026 "always pick the
second-longest option" scored 52% on PALS and 50% on SHRM-CP and PHR, against 25%
for a guess, and 136 of 407 v1 banks were at 40% or more. A blind review reads
one question at a time and cannot see this; only the bank as a whole shows it.

Options are shuffled on screen, so letters say nothing, but lengths are visible.
For each rank r (1 = longest .. 4 = shortest) this scores the strategy "pick the
r-th longest option, at random among options of equal length". The bank's score
is its best rank. Chance is 25%.

  python3 -I tools/check_length_rank.py data/pals-questions.json [...]
  python3 -I tools/check_length_rank.py --all --baseline tools/length_rank_baseline.json
  python3 -I tools/check_length_rank.py --all --write-baseline tools/length_rank_baseline.json

With --all it fails (exit 1) on any bank over LIMIT that is not in the baseline,
or that grew past its baseline. Older banks are listed in the baseline and may
only get better. Fix a bank by lengthening a distractor or shortening the key
where the key sits at the giveaway rank, so key lengths spread over all ranks.
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMIT = 0.40
SLACK = 0.005


def questions(path):
    d = json.load(open(path))
    qs = d["questions"] if isinstance(d, dict) else d
    out = []
    for q in qs if isinstance(qs, list) else []:
        if not isinstance(q, dict) or "optionD" not in q or q.get("correctAnswer") not in ("A", "B", "C", "D"):
            continue
        opts = [str(q.get("option" + k) or "") for k in "ABCD"]
        if not all(opts):
            continue
        out.append((opts, "ABCD".index(q["correctAnswer"])))
    return out


def rank_scores(qs):
    """Expected score of 'pick the r-th longest' for r = 1..4."""
    score = [0.0] * 4
    for opts, k in qs:
        lens = [len(o) for o in opts]
        ordered = sorted(lens, reverse=True)
        for r in range(4):
            v = ordered[r]
            if lens[k] == v:
                score[r] += 1 / lens.count(v)
    n = len(qs) or 1
    return [s / n for s in score]


def measure(path):
    qs = questions(path)
    if len(qs) < 40:
        return None
    s = rank_scores(qs)
    best = max(s)
    return best, s.index(best) + 1, s, len(qs)


def all_banks():
    return sorted(p for p in glob.glob(os.path.join(ROOT, "data", "*-questions.json"))
                  if not re.search(r"_[a-z]{2}\.json$", p))


def key(path):
    return os.path.relpath(os.path.abspath(path), ROOT).replace(os.sep, "/")


def line(path, m):
    best, r, s, n = m
    gain = (best - 0.25) * 50
    return (f"{key(path)}: best rank {r} scores {best:.0%} (chance 25%, limit {LIMIT:.0%}, "
            f"+{gain:.1f} marks per 50)  by rank {[f'{x:.0%}' for x in s]}  n={n}")


def check_all(argv):
    base_path = argv[argv.index("--baseline") + 1] if "--baseline" in argv else None
    write_path = argv[argv.index("--write-baseline") + 1] if "--write-baseline" in argv else None
    baseline = json.load(open(base_path)) if base_path else {}
    failed, new_base = [], {}
    for p in all_banks():
        m = measure(p)
        if not m:
            continue
        k, best = key(p), m[0]
        if best > LIMIT:
            new_base[k] = round(best, 3)
            b = baseline.get(k)
            if b is None or best > b + SLACK:
                failed.append(line(p, m) + (f"  baseline {b:.0%}" if b is not None else ""))
    if write_path:
        json.dump(dict(sorted(new_base.items())), open(write_path, "w"), indent=1)
        open(write_path, "a").write("\n")
        print(f"wrote {len(new_base)} baselined banks to {write_path}")
        return 0
    if failed:
        print("key length rank gives the answer away:")
        for f in failed:
            print("  " + f)
        return 1
    print("key length rank: OK (none over the limit except baselined banks, none worse than their baseline)")
    return 0


def main(argv):
    if "--all" in argv:
        return check_all(argv)
    if not argv:
        print(__doc__)
        return 2
    bad = 0
    for a in argv:
        m = measure(a)
        if not m:
            print(f"{key(a)}: too few 4-option items")
            continue
        print(line(a, m) + ("  OVER LIMIT" if m[0] > LIMIT else "  OK"))
        bad |= m[0] > LIMIT
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
