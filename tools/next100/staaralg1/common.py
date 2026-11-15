"""Item constructors for the STAAR Algebra I bank (tools/next100/staaralg1/q_*.py).

Every item starts with a placement tag: "1" Practice Test 1, "2" Practice Test 2
(held out of the drills), "0" drill only. All items sit in the one section, "alg".
Single-answer items list the key first; build.py rotates it over A to D, or, when
every option is a number, sorts the options and locks their order. Multi items list
their keys first and are shuffled in. Cloze blanks list each blank's key first.
Money is written with a plain $; build.py escapes it for the rich-text renderer.
No KaTeX: powers and roots are Unicode (x², √), minus signs are "−" in text and
"-" in typed answers.
"""

TAGS = {"0", "1", "2"}


def table(head, *rows):
    out = ["| " + " | ".join(str(c) for c in head) + " |", "|" + "---|" * len(head)]
    out += ["| " + " | ".join(str(c) for c in r) + " |" for r in rows]
    return "\n".join(out)


def _base(tag, diff, skill, fmt, stem, expl, basics, passage):
    assert tag in TAGS, tag
    assert diff in (1, 2, 3), diff
    q = {"test": int(tag), "difficulty": diff, "skill": skill, "format": fmt}
    if basics:
        q["basics"] = basics
    if passage:
        q["passage"] = passage
    q["stem"] = stem
    q["explanation"] = expl
    return q


def S(tag, diff, skill, stem, opts, expl, basics=None, passage=None, locked=False):
    """Single answer; opts[0] is the key."""
    assert len(opts) == 4, stem
    q = _base(tag, diff, skill, "single", stem, expl, basics, passage)
    q["options"] = list(opts)
    q["correct"] = [0]
    if locked:
        q["lockedOrder"] = True
    return q


def M(tag, diff, skill, stem, opts, nkeys, expl, basics=None, passage=None):
    """Multiselect: the first nkeys options are the keys."""
    q = _base(tag, diff, skill, "multi", stem, expl, basics, passage)
    q["options"] = list(opts)
    q["correct"] = list(range(nkeys))
    q["select"] = nkeys
    return q


def N(tag, diff, skill, stem, answers, expl, basics=None, passage=None, tol=0):
    """Text entry: a typed number."""
    q = _base(tag, diff, skill, "numeric", stem, expl, basics, passage)
    answers = [str(a) for a in answers]
    q["numeric"] = {"answers": answers, "tolerance": tol}
    if all(a.isdigit() for a in answers):
        q["numeric"]["wholeNumber"] = True
    return q


def MX(tag, diff, skill, stem, rows, cols, correct, expl, basics=None, passage=None):
    """Match table grid: one column per row."""
    q = _base(tag, diff, skill, "matrix", stem, expl, basics, passage)
    q["rows"] = list(rows)
    q["columns"] = list(cols)
    q["correct"] = list(correct)
    return q


def CL(tag, diff, skill, stem, blanks, expl, basics=None, passage=None):
    """Inline choice [[1]], [[2]]...: each blank's first choice is its key."""
    q = _base(tag, diff, skill, "cloze", stem, expl, basics, passage)
    q["blanks"] = [list(b) for b in blanks]
    q["correct"] = [0] * len(blanks)
    return q
