"""Item constructors for the EQAO Grade 9 Math bank (tools/eqao9/q_*.py).

Every item starts with a placement tag:
  "1a1"   test 1, session A, stage 1 (the medium module everyone sits)
  "1a2L"  test 1, session A, stage 2, lower (low/medium) module
  "1a2U"  test 1, session A, stage 2, upper (medium/high) module
  "2b1"   test 2, session B, stage 1, and so on
  "0"     drill only (session A, module 1, never in a test)
Single-answer items list the key first; build.py rotates it so keys spread
over A to D. Multi items list their keys first; build.py shuffles them in.
Cloze blanks list each blank's key first. Money is written with a plain $;
build.py escapes it for the rich-text renderer. No KaTeX is used: powers and
roots are Unicode (x², 10⁻³, √), and code is a numbered two-column table
because plain lines are joined into one paragraph.
"""
import re

TAG = re.compile(r"^(?:0|([12])([ab])([12])([LU]?))$")


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


def _base(tag, diff, skill, fmt, stem, expl, basics, passage):
    m = TAG.match(tag)
    assert m, tag
    if tag == "0":
        place = {"test": 0, "section": "a", "module": 1}
    else:
        t, s, mod, v = m.groups()
        place = {"test": int(t), "section": s, "module": int(mod)}
        if mod == "2":
            assert v, f"stage 2 needs L or U: {tag}"
            place["variant"] = "lower" if v == "L" else "upper"
        else:
            assert not v, tag
    q = dict(place, difficulty=diff, skill=skill, format=fmt)
    if basics:
        q["basics"] = basics
    if passage:
        q["passage"] = passage
    q["stem"] = stem
    q["explanation"] = expl
    return q


def S(tag, diff, skill, stem, opts, expl, basics=None, passage=None, locked=False):
    """Single answer; opts[0] is the key."""
    q = _base(tag, diff, skill, "single", stem, expl, basics, passage)
    q["options"] = list(opts)
    q["correct"] = [0]
    if locked:
        q["lockedOrder"] = True
    return q


def M(tag, diff, skill, stem, opts, nkeys, expl, basics=None, passage=None):
    """Multiple selection: the first nkeys options are the keys ("Select N")."""
    q = _base(tag, diff, skill, "multi", stem, expl, basics, passage)
    q["options"] = list(opts)
    q["correct"] = list(range(nkeys))
    q["select"] = nkeys
    return q


def N(tag, diff, skill, stem, answers, expl, basics=None, passage=None, whole=False, tol=0):
    """Key entry: a typed number."""
    q = _base(tag, diff, skill, "numeric", stem, expl, basics, passage)
    q["numeric"] = {"answers": [str(a) for a in answers], "tolerance": tol}
    if whole:
        q["numeric"]["wholeNumber"] = True
    return q


def O(tag, diff, skill, stem, steps, expl, basics=None, passage=None):
    """Drag into order: steps are listed in the right order."""
    q = _base(tag, diff, skill, "order", stem, expl, basics, passage)
    q["options"] = list(steps)
    q["correct"] = list(range(len(steps)))
    return q


def MX(tag, diff, skill, stem, rows, cols, correct, expl, basics=None, passage=None):
    """Drag each row to a column (one column per row)."""
    q = _base(tag, diff, skill, "matrix", stem, expl, basics, passage)
    q["rows"] = list(rows)
    q["columns"] = list(cols)
    q["correct"] = list(correct)
    return q


def CL(tag, diff, skill, stem, blanks, expl, basics=None, passage=None):
    """Drop-down menus [[1]], [[2]]...: each blank's first choice is its key."""
    q = _base(tag, diff, skill, "cloze", stem, expl, basics, passage)
    q["blanks"] = [list(b) for b in blanks]
    q["correct"] = [0] * len(blanks)
    return q
