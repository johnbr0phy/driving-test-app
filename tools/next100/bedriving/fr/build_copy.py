"""Write lib/examTranslations/bedriving.fr.json and lib/landings/bedriving.fr.json from copy_src.py.

Run from the repo root:  python3 -I tools/next100/bedriving/fr/build_copy.py
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
sys.path.insert(0, HERE)

from build import typo  # noqa: E402
from copy_src import LANDING, TRANSLATION  # noqa: E402

KEEP = {"landingPath", "locale", "url"}


def walk(v, key=None):
    if isinstance(v, dict):
        return {k: walk(x, k) for k, x in v.items()}
    if isinstance(v, list):
        return [walk(x) for x in v]
    if isinstance(v, str):
        if "\u2014" in v or "\u2013" in v:
            raise SystemExit(f"dash in {key}: {v!r}")
        return v if key in KEEP else typo(v)
    return v


def main() -> int:
    assert len(TRANSLATION["copy"]["heroSubs"]) == 5
    for rel, data in (("lib/examTranslations/bedriving.fr.json", TRANSLATION), ("lib/landings/bedriving.fr.json", LANDING)):
        with open(os.path.join(ROOT, rel), "w", encoding="utf-8") as f:
            json.dump(walk(data), f, ensure_ascii=False, indent=2)
            f.write("\n")
        print("wrote", rel)
    return 0


if __name__ == "__main__":
    sys.exit(main())
