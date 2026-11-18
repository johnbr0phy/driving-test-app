"""Stem length and answer filler of a question bank against the rest of the site.

Answers: options are flagged when more than 25% start with "The", "A" or "An"
(site median about 12%). "Appeal Board" reads faster than "The Appeal Board";
the Nov 2026 batch ran 28% to 46%. Keep the article only where it is needed
("A comma" in a punctuation question is fine).

Prints the median words per stem (v1 `question`, v2 `stem`; a v2 passage or
shared stimulus is not counted) and where it sits among every other bank.
A median over 20 words is flagged: the site's median is about 15, and the
Nov 2026 batch that ran 20 to 26 read as wordy. Reading and data-heavy exams
can run longer; compare with their nearest peers before trimming.

Usage:
  python3 -I tools/check_stem_length.py data/x-questions.json data/v2/y
  python3 -I tools/check_stem_length.py --all --baseline tools/stem_length_baseline.json
  python3 -I tools/check_stem_length.py --all --write-baseline tools/stem_length_baseline.json

With --all it fails (exit 1) on any bank whose median is over the limit and
not in the baseline, or whose median grew past its baseline. Older banks over
the limit are listed in the baseline and may only get shorter.
"""
import glob
import json
import os
import re
import statistics as st
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMIT = 20
ARTICLE_LIMIT = 0.25
ARTICLE = re.compile(r"(The|A|An) ")


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
    qs = d["questions"] if isinstance(d, dict) else d
    if not isinstance(qs, list) or not qs:
        return []
    if "question" in qs[0]:
        return [words(q["question"]) for q in qs]
    return [words(q.get("stem")) for q in qs]


def options(path):
    files = glob.glob(os.path.join(path, "*.json")) if os.path.isdir(path) else [path]
    out = []
    for f in files:
        d = json.load(open(f))
        qs = d["questions"] if isinstance(d, dict) else d
        if not isinstance(qs, list):
            continue
        for q in qs:
            if isinstance(q.get("options"), list):
                out += [o for o in q["options"] if isinstance(o, str)]
            else:
                out += [q[k] for k in ("optionA", "optionB", "optionC", "optionD") if isinstance(q.get(k), str)]
    return out


NON_ENGLISH = re.compile(r"[áéíóúöőüűãõçâêôàèìòùăîșțåæøäß]", re.I)


def article_share(path):
    """Share of options that open with an English article; 0 for a bank in
    another language (Hungarian and Portuguese also use "A")."""
    o = options(path)
    if o and sum(1 for x in o if NON_ENGLISH.search(x)) / len(o) > 0.1:
        return 0.0
    return (sum(1 for x in o if ARTICLE.match(x)) / len(o)) if o else 0.0


def all_banks():
    v1 = [p for p in glob.glob(os.path.join(ROOT, "data", "*-questions.json")) if not re.search(r"_[a-z]{2}\.json$", p)]
    v2 = [p.rstrip("/") for p in glob.glob(os.path.join(ROOT, "data", "v2", "*/"))]
    return v1 + v2


def key(path):
    rel = os.path.relpath(os.path.abspath(path), ROOT)
    return rel.replace(os.sep, "/")


def check_all(argv):
    base_path = argv[argv.index("--baseline") + 1] if "--baseline" in argv else None
    write_path = argv[argv.index("--write-baseline") + 1] if "--write-baseline" in argv else None
    baseline = json.load(open(base_path)) if base_path else {}
    if "stems" not in baseline:  # older format: {path: median}
        baseline = {"stems": baseline, "articles": {}}
    over, art_over, failed = {}, {}, []
    for p in sorted(all_banks()):
        s = stems(p)
        if len(s) < 50:
            continue
        k = key(p)
        m = st.median(s)
        if m > LIMIT:
            over[k] = m
            b = baseline["stems"].get(k)
            if b is None or m > b:
                failed.append(f"{k}: median {m:.0f} words per stem (limit {LIMIT}" + (f", baseline {b:.0f})" if b is not None else ")"))
        a = round(article_share(p), 3)
        if a > ARTICLE_LIMIT:
            art_over[k] = a
            b = baseline["articles"].get(k)
            if b is None or a > b:
                failed.append(f"{k}: {a:.0%} of options start with The/A/An (limit {ARTICLE_LIMIT:.0%}"
                              + (f", baseline {b:.0%})" if b is not None else ")"))
    if write_path:
        with open(write_path, "w") as f:
            json.dump({"stems": dict(sorted(over.items())), "articles": dict(sorted(art_over.items()))}, f, indent=1)
            f.write("\n")
        print(f"wrote {len(over)} banks over {LIMIT} words and {len(art_over)} over {ARTICLE_LIMIT:.0%} articles to {write_path}")
        return 0
    if failed:
        print("Question wording too padded:\n  " + "\n  ".join(failed))
        print("Say the fact or situation and the ask, nothing more: cut scenario padding and stacked qualifiers, "
              "and drop a leading The/A/An from answers (.claude/skills/exam-bank, Short stems).")
        return 1
    print("stem length and answer filler: OK (none over the limits except baselined banks, none worse than their baseline)")
    return 0


def main(argv):
    if "--all" in argv:
        return check_all(argv)
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
        art = article_share(a)
        aflag = "  FILLER: drop leading The/A/An from answers" if art > ARTICLE_LIMIT else ""
        print(f"{a}: {art:.0%} of options start with The/A/An (limit {ARTICLE_LIMIT:.0%}){aflag}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
