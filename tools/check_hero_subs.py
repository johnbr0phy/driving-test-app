#!/usr/bin/env python3
"""Fail if any dashboard hero subtitle (copy.heroSubs) runs over MAX characters.

The subtitle sits beside the tiger and the N/N counter on a phone, so anything
longer than about two lines pushes the steps below the fold.
"""
import glob
import re
import sys

MAX = 80

files = ["lib/exams.ts"] + sorted(glob.glob("lib/v2/exams/*.ts"))
bad = []
for f in files:
    src = open(f, encoding="utf-8").read()
    for block in re.finditer(r"heroSubs:\s*\[(.*?)\]", src, re.S):
        for sub in re.findall(r'"((?:[^"\\]|\\.)*)"', block.group(1)):
            if len(sub) > MAX:
                bad.append(f"{f}: {len(sub)} chars: {sub}")

if bad:
    print(f"Hero subtitles over {MAX} characters:")
    print("\n".join(bad))
    sys.exit(1)
print(f"All hero subtitles are {MAX} characters or fewer.")
