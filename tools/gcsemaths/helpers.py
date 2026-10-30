"""Item constructors for the GCSE Maths Foundation source files.

test: 1 or 2 (practice tests, 2 is held out of the drills) or 0 (drill only).
paper: 1 (non-calculator), 2 or 3 (calculator). Drill-only items take their
domain's drill paper (see DRILL_PAPER in build.py), so pass 0.
"""


def S(test, paper, skill, d, stem, options, key, expl, basics=None, locked=False, passage=None):
    q = {"test": test, "paper": paper, "skill": skill, "difficulty": d, "format": "single",
         "stem": stem, "options": options, "correct": [key], "explanation": expl}
    if locked:
        q["lockedOrder"] = True
    if basics:
        q["basics"] = basics
    if passage:
        q["passage"] = passage
    return q


def N(test, paper, skill, d, stem, answers, expl, basics=None, tol=0, passage=None):
    q = {"test": test, "paper": paper, "skill": skill, "difficulty": d, "format": "numeric",
         "stem": stem, "numeric": {"answers": answers, "tolerance": tol}, "explanation": expl}
    if basics:
        q["basics"] = basics
    if passage:
        q["passage"] = passage
    return q
