"""Replace CDM items by question ID and rewrite their source file.

    python3 -I tools/next20/cdm/edit_items.py <edits.json>

edits.json maps "CDM-SEG-NNN" to [stem, key, [three wrong], explanation, source]. Keeps
every other item and its position; the build then assigns the same IDs.
"""
import json
import runpy
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
FILES = {"NUT": "nutrition", "FOO": "foodservice", "PER": "personnel", "SAF": "safety", "BUS": "business"}


def write(path, items, header):
    out = [header, "ITEMS=["]
    for stem, key, wrong, expl, src in items:
        out.append(f" ({stem!r},\n  {key!r},\n  {wrong!r},\n  {expl!r},\n  {src!r}),")
    out.append("]")
    path.write_text("\n".join(out) + "\n")


def main(edits_path):
    edits = json.load(open(edits_path))
    by_file = {}
    for qid, item in edits.items():
        _, seg, num = qid.split("-")
        by_file.setdefault(FILES[seg], {})[int(num)] = item
    for name, changes in by_file.items():
        path = HERE / f"{name}.py"
        header = path.read_text().splitlines()[0]
        items = [list(x) for x in runpy.run_path(str(path))["ITEMS"]]
        for num, item in changes.items():
            assert len(item) == 5 and len(item[2]) == 3, (name, num)
            items[num - 1] = item
        write(path, [tuple(x) for x in items], header if header.startswith("#") else "# CDM items")
        print(name, "changed", sorted(changes))


if __name__ == "__main__":
    main(sys.argv[1])
