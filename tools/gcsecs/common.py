"""Item constructors for the GCSE Computer Science source files.

Every constructor takes the correct option FIRST; build.py moves it to a
rotating position (and permutes multi/cloze choices) so keys are spread
across letters. Pseudocode is shown as a two-column table (line number, code)
because rich text joins plain lines into one paragraph.
"""


def code(*lines):
    for l in lines:
        assert "|" not in l, l
        assert l.count("*") < 2, l
        assert "__" not in l, l
    rows = "\n".join(f"| {i} | {l} |" for i, l in enumerate(lines, 1))
    return f"| Line | Code |\n|---|---|\n{rows}"


def table(head, *rows):
    out = ["| " + " | ".join(head) + " |", "|" + "---|" * len(head)]
    out += ["| " + " | ".join(str(c) for c in r) + " |" for r in rows]
    return "\n".join(out)


def _base(test, diff, skill, fmt, stem, expl, basics=None, passage=None):
    q = {"test": test, "difficulty": diff, "skill": skill, "format": fmt}
    if basics:
        q["basics"] = basics
    if passage:
        q["passage"] = passage
    q["stem"] = stem
    q["explanation"] = expl
    return q


def S(test, diff, skill, stem, opts, expl, basics=None, passage=None, locked=False):
    q = _base(test, diff, skill, "single", stem, expl, basics, passage)
    q["options"] = list(opts)
    q["correct"] = [0]
    if locked:
        q["lockedOrder"] = True
    return q


def M(test, diff, skill, stem, opts, nkeys, expl, basics=None, passage=None):
    """Multi: the first `nkeys` options are the keys; 'Choose N' is set."""
    q = _base(test, diff, skill, "multi", stem, expl, basics, passage)
    q["options"] = list(opts)
    q["correct"] = list(range(nkeys))
    q["select"] = nkeys
    return q


def N(test, diff, skill, stem, answers, expl, basics=None, passage=None, whole=True):
    q = _base(test, diff, skill, "numeric", stem, expl, basics, passage)
    q["numeric"] = {"answers": [str(a) for a in answers], "tolerance": 0}
    if whole:
        q["numeric"]["wholeNumber"] = True
    return q


def O(test, diff, skill, stem, steps, expl, basics=None, passage=None):
    q = _base(test, diff, skill, "order", stem, expl, basics, passage)
    q["options"] = list(steps)
    q["correct"] = list(range(len(steps)))
    return q


def MX(test, diff, skill, stem, rows, cols, correct, expl, basics=None, passage=None):
    q = _base(test, diff, skill, "matrix", stem, expl, basics, passage)
    q["rows"] = list(rows)
    q["columns"] = list(cols)
    q["correct"] = list(correct)
    return q


def CL(test, diff, skill, stem, blanks, expl, basics=None, passage=None):
    """Cloze: each blank's first choice is its key."""
    q = _base(test, diff, skill, "cloze", stem, expl, basics, passage)
    q["blanks"] = [list(b) for b in blanks]
    q["correct"] = [0] * len(blanks)
    return q


def HL(test, diff, skill, stem, passage, correct, expl, basics=None):
    q = _base(test, diff, skill, "highlight", stem, expl, basics, passage)
    q["correct"] = list(correct)
    return q
