"""Authoring helpers for the Fortinet NSE 1 / FCF sources (tools/next100/fortinse/<domain>.py).

S(test, skill, stem, options, expl, diff=2) returns a single-answer source item.
List the correct option FIRST; build.py shuffles the options with a stem-seeded
RNG, so stored key positions are spread out. test is 1, 2 or 0 (drill only).
Explanations never name an option by letter or position.
"""


def S(test, skill, stem, options, expl, diff=2):
    assert test in (0, 1, 2) and diff in (1, 2, 3)
    assert len(options) == 4, stem
    return {"test": test, "skill": skill, "difficulty": diff, "format": "single",
            "stem": stem, "explanation": expl, "options": options, "correct": [0]}
