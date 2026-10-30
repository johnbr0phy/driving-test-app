"""Authoring helpers for the GCSE Maths Higher bank (tools/gcsehigher/q_*.py).

Every item names its practice test (1, 2, or 0 = drill only) and its paper
(1 = non-calculator, 2 and 3 = calculator). Drill-only items are written for
Paper 1 (no calculator), because drills run on the phone without one and a
drill draws its pool from one section. For single-answer items the key is
written first; build.py rotates it so keys spread over A to D.
"""


def _base(test, paper, diff, skill, stem, expl, basics, passage):
    if test == 0:
        paper = 1
    q = {"test": test, "paper": paper, "difficulty": diff, "skill": skill, "stem": stem, "explanation": expl}
    if basics:
        q["basics"] = basics
    if passage:
        q["passage"] = passage
    return q


def S(test, paper, diff, skill, stem, options, expl, basics=None, passage=None):
    """Single answer; options[0] is the key."""
    q = _base(test, paper, diff, skill, stem, expl, basics, passage)
    q.update({"format": "single", "options": list(options), "correct": [0]})
    return q


def N(test, paper, diff, skill, stem, answers, expl, tol=0, basics=None, passage=None):
    """Typed numeric answer. The stem always ends "Type the number only." so
    nobody types a unit, a currency sign or a percent sign."""
    if "Type the number only" not in stem:
        stem = stem.rstrip() + " Type the number only."
    q = _base(test, paper, diff, skill, stem, expl, basics, passage)
    q.update({"format": "numeric", "numeric": {"answers": list(answers), "tolerance": tol}})
    return q


def M(test, paper, diff, skill, stem, options, correct, expl, select=None, basics=None, passage=None):
    """Multiple answer ("Choose two" when select is set)."""
    q = _base(test, paper, diff, skill, stem, expl, basics, passage)
    q.update({"format": "multi", "options": list(options), "correct": list(correct)})
    if select:
        q["select"] = select
    return q
