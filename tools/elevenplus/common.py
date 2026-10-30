"""Shared helpers for the 11+ bank sources (tools/elevenplus/*.py)."""
import string

A = string.ascii_uppercase
_WORDS = None


def words():
    """Lower-case word set from the system dictionary (web2), used only to check items."""
    global _WORDS
    if _WORDS is None:
        try:
            _WORDS = {w.strip().lower() for w in open("/usr/share/dict/words") if w.strip().isalpha()}
        except OSError:
            _WORDS = set()
    return _WORDS


def pos(ch):
    return A.index(ch.upper()) + 1


def shift(ch, n):
    i = A.index(ch.upper()) + n
    assert 0 <= i < 26, f"wrap {ch}{n:+d}"
    return A[i]


def item(domain, test, skill, difficulty, stem, options, correct, explanation, **extra):
    assert len(set(options)) == len(options), f"duplicate options: {stem}"
    assert 0 <= correct < len(options)
    q = {"domain": domain, "test": test, "skill": skill, "difficulty": difficulty, "format": "single",
         "stem": stem, "options": list(options), "correct": [correct], "explanation": explanation}
    q.update(extra)
    return q


def rotate(options, key_text, k):
    """Place key_text at index k % len, keeping the other options in order. Returns (options, index)."""
    others = [o for o in options if o != key_text]
    k %= len(options)
    out = others[:k] + [key_text] + others[k:]
    return out, k
