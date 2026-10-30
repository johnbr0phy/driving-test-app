"""Item helpers for the GCSE Combined Science source files.

Each domain file (bio1.py ... phys2.py) lists ITEMS built with these helpers.
`t` is the practice test (1 or 2) or 0 for drill-only; `d` is difficulty 1-3.
For single and multi items the key(s) are written first; build.py places them
so the key letter rotates. Order items list their steps in the right order.
"""


def _base(t, d, skill, fmt, stem, expl, basics=None, calc=False):
    item = {"test": t, "difficulty": d, "skill": skill, "format": fmt, "stem": stem, "explanation": expl}
    if basics:
        item["basics"] = basics
    if calc:
        item["calculator"] = True
    return item


def S(t, d, skill, stem, key, wrongs, expl, basics=None, calc=False):
    item = _base(t, d, skill, "single", stem, expl, basics, calc)
    item["_keys"] = [key]
    item["_wrongs"] = list(wrongs)
    return item


def M(t, d, skill, stem, keys, wrongs, expl, basics=None):
    item = _base(t, d, skill, "multi", stem, expl, basics)
    item["select"] = len(keys)
    item["_keys"] = list(keys)
    item["_wrongs"] = list(wrongs)
    return item


def N(t, d, skill, stem, answers, expl, basics=None, tol=0):
    if "number only" not in stem:
        stem = stem + " Type the number only."
    item = _base(t, d, skill, "numeric", stem, expl, basics, calc=True)
    item["numeric"] = {"answers": list(answers), "tolerance": tol}
    return item


def O(t, d, skill, stem, steps, expl):
    item = _base(t, d, skill, "order", stem, expl)
    item["options"] = list(steps)
    item["correct"] = list(range(len(steps)))
    return item


def X(t, d, skill, stem, rows, columns, correct, expl):
    item = _base(t, d, skill, "matrix", stem, expl)
    item["rows"] = list(rows)
    item["columns"] = list(columns)
    item["correct"] = list(correct)
    return item
