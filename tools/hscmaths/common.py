"""Authoring helpers for the HSC Maths Standard 2 bank (tools/hscmaths/q_*.py).

Every item names its practice test (1, 2, or 0 = drill only) and its section
(1 = Section I multiple choice, 2 = Section II short answer). Drill-only items
always go to Section II, because a drill draws its pool from one section.
For single-answer items the key is written first; build.py rotates it so keys
spread over A to D. Money in rich text is written \\$ (see data/v2/SCHEMA.md).
"""


def group(s):
    """NESA style: a space between thousands only from five digits up (5000, 36 000)."""
    whole, _, frac = s.partition(".")
    if len(whole.lstrip("-")) >= 5:
        whole = f"{int(whole):,}".replace(",", " ")
    return whole + ("." + frac if frac else "")


def money(x):
    """Dollar amount with cents, escaped for rich text."""
    return "\\$" + group(f"{x:.2f}")


def dollars(x):
    """Whole-dollar amount, escaped."""
    return "\\$" + group(str(round(x)))


def _base(test, sec, diff, skill, stem, expl, basics):
    if test == 0:
        sec = 2
    q = {"test": test, "sec": sec, "difficulty": diff, "skill": skill, "stem": stem, "explanation": expl}
    if basics:
        q["basics"] = basics
    return q


def S(test, sec, diff, skill, stem, options, expl, basics=None):
    """Single answer; options[0] is the key."""
    assert len(options) == 4, stem
    assert len(set(options)) == 4, options
    q = _base(test, sec, diff, skill, stem, expl, basics)
    q.update({"format": "single", "options": list(options)})
    return q


def N(test, sec, diff, skill, stem, answers, expl, tol=0, basics=None):
    """Typed numeric answer (Section II or drill only)."""
    assert sec == 2 or test == 0, stem
    # Every typed answer says so: units and symbols are not parsed.
    if "Type the number only" not in stem:
        last = stem.rstrip().split("\n")[-1]
        stem = stem.rstrip() + ("\n\nType the number only." if last.startswith("|") else " Type the number only.")
    q = _base(test, sec, diff, skill, stem, expl, basics)
    q.update({"format": "numeric", "numeric": {"answers": [str(a) for a in answers], "tolerance": tol}})
    return q
