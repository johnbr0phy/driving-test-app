"""Authoring helpers for the Network+ sources (tools/netplus/<domain>.py).

Every helper returns a source item dict: test (1, 2 or 0 = drill only),
skill, difficulty (1 to 3), format and the format's own fields
(data/v2/SCHEMA.md). Conventions:
- single / multi: list the correct option(s) FIRST; build.py shuffles the
  options with a stem-seeded RNG, so stored key positions are spread out.
  multi(..., expl, n=2) means the first n options are the keys and the stem says
  "(Choose two.)" or "(Choose three.)".
- order: list the steps in the correct order (the app shows them shuffled).
- matrix: `key` gives a column index per row.
- numeric: digits only, the stem ends "Type the number only."
- Explanations never name options by letter (the options are shuffled).

CLI output and commands are monospace through KaTeX (RichText has no code
block): cmd("show vlan brief") inline, cli(lines...) as a display block on
its own line of the stem. No single quotes inside CLI (KaTeX curls them).
"""

_ESC = {"\\": r"\textbackslash{}", "{": r"\{", "}": r"\}", "#": r"\#", "$": r"\$", "%": r"\%",
        "&": r"\&", "_": r"\_", "^": r"\^{}", "~": r"\~{}"}


def _tt(text):
    assert "'" not in text and "`" not in text, f"quote in CLI text: {text!r}"
    out, i = [], 0
    while i < len(text):
        ch = text[i]
        if ch == " ":
            j = i
            while j < len(text) and text[j] == " ":
                j += 1
            run = j - i
            # Single interior spaces survive in \texttt; runs and leading spaces need \ .
            out.append(" " if run == 1 and i > 0 and j < len(text) else r"\ " * run)
            i = j
            continue
        out.append(_ESC.get(ch, ch))
        i += 1
    return "".join(out)


def cmd(text):
    """An inline command or keyword in monospace."""
    return "$\\texttt{" + _tt(text) + "}$"


def cli(*lines):
    """A block of CLI output or config, one string per line. Put it on its own line in the stem."""
    body = "\\\\".join("\\texttt{" + (_tt(l) if l else "\\ ") + "}" for l in lines)
    return "$$\\begin{array}{l}" + body + "\\end{array}$$"


def _base(test, skill, diff, fmt, stem, expl):
    assert test in (0, 1, 2) and diff in (1, 2, 3)
    return {"test": test, "skill": skill, "difficulty": diff, "format": fmt, "stem": stem, "explanation": expl}


def single(test, skill, diff, stem, options, expl):
    q = _base(test, skill, diff, "single", stem, expl)
    q.update(options=options, correct=[0])
    return q


def multi(test, skill, diff, stem, options, expl, n=2):
    q = _base(test, skill, diff, "multi", stem, expl)
    q.update(options=options, correct=list(range(n)), select=n)
    return q


def numeric(test, skill, diff, stem, answer, expl):
    q = _base(test, skill, diff, "numeric", stem, expl)
    q["numeric"] = {"answers": [str(answer)], "tolerance": 0, "wholeNumber": True}
    return q


def order(test, skill, diff, stem, steps, expl):
    q = _base(test, skill, diff, "order", stem, expl)
    q.update(options=steps, correct=list(range(len(steps))))
    return q


def matrix(test, skill, diff, stem, rows, columns, key, expl):
    q = _base(test, skill, diff, "matrix", stem, expl)
    q.update(rows=rows, columns=columns, correct=key)
    return q
