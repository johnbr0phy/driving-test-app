"""Authoring helpers for the PMI-ACP sources (tools/next100/pmiacp/<domain>.py).

Every helper returns a source item dict: test (1, 2 or 0 = drill only),
skill (the syllabus learning objective), difficulty (1 to 3), format and the
format's fields (data/v2/SCHEMA.md). Conventions:
- S (single) / M (multi): list the correct option(s) FIRST; build.py shuffles
  the options with a stem-seeded RNG. M's stem says "(Choose two.)".
- N: an all-number single item. Give the key value and three wrong values;
  build.py sorts them ascending, locks the order and finds the key by value.
- L: a single item whose options keep the given order (lockedOrder), e.g.
  rule labels R1 to R4; `key` is the index of the correct option.
- Explanations never name an option by letter or position.

Pseudocode is shown in monospace through KaTeX (RichText has no code block):
code(lines...) returns a display block for its own paragraph of the stem.
"""

_ESC = {"\\": r"\textbackslash{}", "{": r"\{", "}": r"\}", "#": r"\#", "$": r"\$", "%": r"\%",
        "&": r"\&", "_": r"\_", "^": r"\^{}", "~": r"\~{}"}


def _tt(text):
    assert "'" not in text and "`" not in text and '"' not in text, f"quote in code text: {text!r}"
    out, i = [], 0
    while i < len(text):
        ch = text[i]
        if ch == " ":
            j = i
            while j < len(text) and text[j] == " ":
                j += 1
            run = j - i
            out.append(" " if run == 1 and i > 0 and j < len(text) else r"\ " * run)
            i = j
            continue
        out.append(_ESC.get(ch, ch))
        i += 1
    return "".join(out)


def code(*lines):
    body = "\\\\".join("\\texttt{" + (_tt(l) if l else "\\ ") + "}" for l in lines)
    return "$$\\begin{array}{l}" + body + "\\end{array}$$"


def _base(test, skill, diff, fmt, stem, expl):
    assert test in (0, 1, 2) and diff in (1, 2, 3)
    return {"test": test, "skill": skill, "difficulty": diff, "format": fmt, "stem": stem, "explanation": expl}


def S(test, skill, diff, stem, options, expl):
    q = _base(test, skill, diff, "single", stem, expl)
    q.update(options=options, correct=[0])
    return q


def M(test, skill, diff, stem, options, expl):
    q = _base(test, skill, diff, "multi", stem, expl)
    q.update(options=options, correct=[0, 1], select=2)
    return q


def N(test, skill, diff, stem, key, wrong, expl, unit=""):
    """All-number options, sorted ascending and locked. key and wrong are numbers."""
    vals = [key] + list(wrong)
    assert len(set(vals)) == 4, vals
    fmt = lambda v: (f"{v:g}" if isinstance(v, float) else str(v)) + unit
    srt = sorted(vals)
    q = _base(test, skill, diff, "single", stem, expl)
    q.update(options=[fmt(v) for v in srt], correct=[srt.index(key)], lockedOrder=True)
    return q


def L(test, skill, diff, stem, options, key, expl):
    q = _base(test, skill, diff, "single", stem, expl)
    q.update(options=options, correct=[key], lockedOrder=True)
    return q


def X(test, skill, diff, stem, rows, columns, key, expl):
    """Matching grid: one column per row. key lists the column index for each row."""
    assert len(rows) == len(key) and all(0 <= k < len(columns) for k in key)
    q = _base(test, skill, diff, "matrix", stem, expl)
    q.update(rows=rows, columns=columns, correct=list(key))
    return q
