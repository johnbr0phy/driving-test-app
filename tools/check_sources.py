#!/usr/bin/env python3
"""Check an exam's sources.md before its bank ships (exam-bank skill, step 0).

    python3 -I tools/check_sources.py <examId> [--max-age 30]

Finds tools/**/<examId>/sources.md and fails when:
  - it is missing,
  - it does not say the questions are original,
  - it lists fewer than 3 distinct https source pages,
  - fewer than 2 of them are on hosts that are not prep, forum or question sites (one owner's
    site can supply several: the outline page, the handbook, the law),
  - it has no "fetched YYYY-MM-DD" / "checked YYYY-MM-DD" date, or the newest one is older
    than --max-age days (a new build must have read its sources recently).
Question and forum sites (Quizlet, Reddit, YouTube...) are listed as errors: they are never a
source. It cannot judge whether a host is the official one; that is the writer's job.
"""
import argparse
import datetime as dt
import pathlib
import re
import sys
from urllib.parse import urlparse

ROOT = pathlib.Path(__file__).resolve().parent.parent

# Never a source for a fact or a question.
BANNED = (
    "quizlet.com", "reddit.com", "youtube.com", "youtu.be", "brainly.", "chegg.com",
    "coursehero.com", "examtopics.com", "scribd.com", "facebook.com", "tiktok.com",
    "quora.com", "chatgpt.com", "chat.openai.com", "gemini.google.com", "claude.ai",
)
# May point to a source or support format facts ("guides say"); never counts as primary.
SECONDARY = (
    "wikipedia.org", "medium.com", "blog.", "testprep", "practice-test", "prep",
    "studyguide", "study.com", "uworld", "kaplan", "magoosh", "examcompass",
    "open-exam-prep.com", "testbook.com", "adda247.com", "gradeup", "jagranjosh",
)

URL_RE = re.compile(r"https://[^\s)>\]`\"']+")
DATE_RE = re.compile(r"(?:fetched|checked|read|accessed)[^0-9\n]{0,20}(\d{4}-\d{2}-\d{2}|\d{1,2} [A-Z][a-z]+ \d{4})", re.I)


def find(exam_id: str) -> pathlib.Path | None:
    hits = sorted((ROOT / "tools").glob(f"**/{exam_id}/sources.md"))
    return hits[0] if hits else None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("exam_id")
    ap.add_argument("--max-age", type=int, default=30, help="days; newest fetched date must be this recent")
    a = ap.parse_args()

    path = find(a.exam_id)
    if not path:
        print(f"ERROR no tools/**/{a.exam_id}/sources.md")
        return 1
    text = path.read_text(encoding="utf-8")
    errors, warnings = [], []

    if not re.search(r"\boriginal\b", text, re.I):
        errors.append('does not say the questions are original ("All N questions are original...")')

    urls: dict[str, str] = {}  # url -> host
    for url in URL_RE.findall(text):
        url = url.rstrip(".,;:")
        urls.setdefault(url, urlparse(url).netloc.lower().removeprefix("www."))

    def kind(host: str) -> str:
        if any(b in host for b in BANNED):
            return "banned"
        if any(x in host for x in SECONDARY):
            return "secondary"
        return "primary"

    by_kind: dict[str, list[str]] = {"banned": [], "secondary": [], "primary": []}
    for url, host in urls.items():
        by_kind[kind(host)].append(url)
    banned_hosts = sorted({urls[u] for u in by_kind["banned"]})
    secondary_hosts = sorted({urls[u] for u in by_kind["secondary"]})
    primary = by_kind["primary"]

    for h in banned_hosts:
        errors.append(f"{h} is a question or forum site, never a source: remove it")
    usable = len(primary) + len(by_kind["secondary"])
    if usable < 3:
        errors.append(f"only {usable} source pages; read at least 3")
    if len(primary) < 2:
        errors.append(f"only {len(primary)} primary source pages; fetch the exam owner's outline "
                      "or handbook and the primary law or standard")
    if secondary_hosts:
        warnings.append(f"prep or secondary hosts {', '.join(secondary_hosts)}: format facts only, labelled 'guides say'")

    dates = []
    for d in DATE_RE.findall(text):
        for fmt in ("%Y-%m-%d", "%d %B %Y"):
            try:
                dates.append(dt.datetime.strptime(d, fmt).date())
                break
            except ValueError:
                pass
    if not dates:
        errors.append('no "fetched YYYY-MM-DD" dates: record when each source was read')
    else:
        age = (dt.date.today() - max(dates)).days
        if age > a.max_age:
            errors.append(f"newest fetched date is {max(dates)} ({age} days old); re-read the sources")

    print(f"{path.relative_to(ROOT)}: {len(primary)} primary pages, {len(by_kind['secondary'])} secondary, {len(dates)} dated reads")
    for w in warnings:
        print(f"WARN  {w}")
    for e in errors:
        print(f"ERROR {e}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
