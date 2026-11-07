"""Parity and style check for the English (en-GB) detheorie bank.

Usage: python3 -I tools/next100/detheorie/en/check.py  (also run by build.py before writing)
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
BASE = os.path.join(ROOT, "data", "de-theorie-questions.json")
OUT = os.path.join(ROOT, "data", "de-theorie-questions_en.json")
TEXT = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]
SAME = ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]
BANNED = re.compile(r"[—–]|all of the above|none of the above|^both\b|\bA and B\b|„|“", re.I)
# American spellings and words where British English is wanted.
US = re.compile(r"\b(tires?|color|center|meters?|liters?|gray|trucks?|license plate|sidewalk|parking lot|highway|freeway|windshield|trunk|traffic circle|yield|gas pedal|turn signal|high beams?|low beams?)\b", re.I)
GERMAN_LEFT = re.compile(r"\b(Sie|und|oder|der|die|das|nicht|mit|Fahrbahn|Zeichen)\b")
NUMOPT = re.compile(r"^\d+(,\d+)?\s")


def check(base, out):
    errs = []
    if [r["questionId"] for r in base] != [r["questionId"] for r in out]:
        return ["questionIds or order differ"]
    for b, t in zip(base, out):
        qid = b["questionId"]
        for f in SAME:
            if b[f] != t[f]:
                errs.append(f"{qid}: {f} differs")
        for f in TEXT:
            v = t[f].strip()
            if not v:
                errs.append(f"{qid}: empty {f}")
            if BANNED.search(v):
                errs.append(f"{qid}: banned text in {f}")
            if US.search(v):
                errs.append(f"{qid}: American word in {f}: {US.search(v).group(0)}")
            if GERMAN_LEFT.search(v) and f != "explanation":
                errs.append(f"{qid}: German word left in {f}: {GERMAN_LEFT.search(v).group(0)}")
            if NUMOPT.match(v) and "," in v.split()[0]:
                errs.append(f"{qid}: decimal comma in {f}")
        opts = [t["option" + L] for L in "ABCD"]
        if len(set(opts)) != 4:
            errs.append(f"{qid}: duplicate options")
    return errs


if __name__ == "__main__":
    e = check(json.load(open(BASE, encoding="utf-8")), json.load(open(OUT, encoding="utf-8")))
    print("\n".join(e) or "PASS")
    sys.exit(1 if e else 0)
