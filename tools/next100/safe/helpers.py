"""Authoring helper for the SAFe Agilist sources (tools/next100/safe/<domain>.py).

single(test, skill, difficulty, stem, [key, wrong, wrong, wrong], explanation)
test is 1, 2 or 0 (drill only); difficulty 1 to 3. The key is listed FIRST;
build.py shuffles the options with a seed taken from the stem. The real exam
is single select only, so this bank has no other format. Explanations never
name an option by letter or position.
"""


def single(test, skill, diff, stem, options, expl):
    assert test in (0, 1, 2) and diff in (1, 2, 3)
    assert len(options) == 4, stem
    return {"test": test, "skill": skill, "difficulty": diff, "format": "single",
            "stem": stem, "options": list(options), "correct": [0], "explanation": expl}
