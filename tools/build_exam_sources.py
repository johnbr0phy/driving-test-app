#!/usr/bin/env python3
"""Write lib/examSources.json: the official pages each bank was written from,
taken from every tools/**/sources.md (first MAX_PER_EXAM https URLs, which the
files list official sources first) plus each lib/examFreshness.json source.
/api/cron/source-watch fetches a seventh of them a day and flags a page whose
text changed. Re-run after adding or editing a sources.md:
  python3 -I tools/build_exam_sources.py [--check]"""
import glob, json, os, re, sys

MAX_PER_EXAM = 3
URL = re.compile(r"https://[^\s)>\]\"'`,]+")
out: dict[str, list[str]] = {}
for path in sorted(glob.glob("tools/**/sources.md", recursive=True)):
    exam = os.path.basename(os.path.dirname(path))
    urls = []
    for u in URL.findall(open(path, encoding="utf-8").read()):
        u = u.rstrip(".;:")
        if u not in urls:
            urls.append(u)
    if urls:
        out.setdefault(exam, [])
        out[exam] += [u for u in urls[:MAX_PER_EXAM] if u not in out[exam]]
for e in json.load(open("lib/examFreshness.json", encoding="utf-8"))["events"]:
    lst = out.setdefault(e["exam"], [])
    if e["source"] not in lst:
        lst.append(e["source"])
text = json.dumps(dict(sorted(out.items())), indent=1, ensure_ascii=False) + "\n"
target = "lib/examSources.json"
if "--check" in sys.argv:
    current = open(target, encoding="utf-8").read() if os.path.exists(target) else ""
    if current != text:
        print(f"{target} is stale: run python3 -I tools/build_exam_sources.py")
        sys.exit(1)
    print(f"{target} is up to date")
    sys.exit(0)
open(target, "w", encoding="utf-8").write(text)
print(f"wrote {sum(len(v) for v in out.values())} URLs for {len(out)} exams to {target}")
