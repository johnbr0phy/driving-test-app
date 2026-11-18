"""Stem length of a question bank against the rest of the site.

Prints the median words per stem (v1 `question`, v2 `stem`; a v2 passage or
shared stimulus is not counted) and where it sits among every other bank.
A median over 20 words is flagged: the site's median is about 15, and the
Nov 2026 batch that ran 20 to 26 read as wordy. Reading and data-heavy exams
can run longer; compare with their nearest peers before trimming.

Usage: python3 -I tools/check_stem_length.py data/x-questions.json data/v2/y
"""
import glob
import json
import os
import re
import statistics as st
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMIT = 20


def words(s):
    return len(re.findall(r"\S+", s or ""))


def stems(path):
    if os.path.isdir(path):
        out = []
        for f in glob.glob(os.path.join(path, "*.json")):
            d = json.load(open(f))
            out += [words(q.get("stem")) for q in (d["questions"] if isinstance(d, dict) else d)]
        return out
    d = json.load(open(path))
    if not isinstance(d, list) or not d or "question" not in d[0]:
        return []
    return [words(q["question"]) for q in d]


def all_banks():
    v1 = [p for p in glob.glob(os.path.join(ROOT, "data", "*-questions.json")) if not re.search(r"_[a-z]{2}\.json$", p)]
    v2 = [p.rstrip("/") for p in glob.glob(os.path.join(ROOT, "data", "v2", "*/"))]
    return v1 + v2


def main(argv):
    if not argv:
        print(__doc__)
        return 2
    targets = {os.path.abspath(a.rstrip("/")) for a in argv}
    medians = [st.median(s) for p in all_banks() if os.path.abspath(p) not in targets and len(s := stems(p)) >= 50]
    site = st.median(medians)
    for a in argv:
        s = stems(a)
        if not s:
            print(f"{a}: no questions found")
            continue
        m = st.median(s)
        pct = sum(1 for x in medians if x < m) / len(medians) * 100
        flag = "  LONG: trim scenario padding and qualifiers" if m > LIMIT else ""
        print(f"{a}: median {m:.0f} words per stem (site median {site:.0f}; longer than {pct:.0f}% of banks){flag}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
