"""Authoring helpers for the Platform App Builder sources
(tools/build-run-2026-11-18/sfappbuilder/<domain>.py).

Every helper returns a source item without a test number; assign(items, n)
gives the first n items to Practice Test 1, the next n to Practice Test 2
(held out of the drills) and the rest to the drills only (test 0).
Conventions:
- single / multi: list the correct option(s) FIRST; build.py shuffles the
  options with a stem-seeded RNG. multi(..., n=2) keys the first two options
  and the stem must say "(Choose two.)".
- order: steps in the correct order (the app shows them shuffled).
- matrix: `key` gives a column index per row.
- numeric: digits only, the stem ends "Type the number only."
- Explanations never name options by letter or position.
"""


def _base(skill, diff, fmt, stem, expl):
    assert diff in (1, 2, 3)
    return {"skill": skill, "difficulty": diff, "format": fmt, "stem": stem, "explanation": expl}


def single(skill, diff, stem, options, expl):
    assert len(options) == 4, stem
    q = _base(skill, diff, "single", stem, expl)
    q.update(options=options, correct=[0])
    return q


def multi(skill, diff, stem, options, expl, n=2):
    q = _base(skill, diff, "multi", stem, expl)
    q.update(options=options, correct=list(range(n)), select=n)
    return q


def numeric(skill, diff, stem, answer, expl):
    q = _base(skill, diff, "numeric", stem, expl)
    q["numeric"] = {"answers": [str(answer)], "tolerance": 0, "wholeNumber": True}
    return q


def order(skill, diff, stem, steps, expl):
    q = _base(skill, diff, "order", stem, expl)
    q.update(options=steps, correct=list(range(len(steps))))
    return q


def matrix(skill, diff, stem, rows, columns, key, expl):
    q = _base(skill, diff, "matrix", stem, expl)
    q.update(rows=rows, columns=columns, correct=key)
    return q


def assign(items, per_test):
    out = []
    for i, q in enumerate(items):
        t = 1 if i < per_test else 2 if i < 2 * per_test else 0
        out.append(dict(q, test=t))
    return out
