"""Helpers for the frm1 sources. N() checks a computed key: the key text is formatted from a value
computed in Python, and the explanation must contain that same text, so a hand slip in either fails
the build."""
import math

def N(stem, val, fmt, wrong, expl):
    key = fmt.format(val)
    assert key in expl, ("key not in explanation", stem, key)
    for w in wrong:
        assert w != key, ("distractor equals key", stem, key)
    return (stem, key, wrong, expl)

def Ncdf(x):
    return 0.5 * (1 + math.erf(x / math.sqrt(2)))
