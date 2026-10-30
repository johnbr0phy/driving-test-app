"""Build data/icbc-questions.json from src/*.py. Usage: python3 -I build.py <out.json>"""
import importlib.util, json, os, sys, statistics

HERE = os.path.dirname(os.path.abspath(__file__))
ORDER = ["signs", "row", "lanes", "std", "share", "imp", "emg", "lic"]
TYPE, PREFIX = "CABC", "CABC-"


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, "src", name + ".py"))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


rows, report = [], []
for name in ORDER:
    m = load(name)
    for i, (stem, key, wrongs, expl) in enumerate(m.ITEMS):
        assert len(wrongs) == 3, (name, i)
        pos = i % 4
        opts = list(wrongs)
        opts.insert(pos, key)
        rows.append({
            "type": TYPE, "state": "ALL",
            "questionId": f"{PREFIX}{m.SEG}-{i + 1:03d}",
            "category": m.KEY, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        wavg = statistics.mean(len(w) for w in wrongs)
        if len(key) > 1.2 * wavg or len(key) > max(len(w) for w in wrongs):
            report.append(f"{m.SEG}-{i+1:03d} key {len(key)} wrong avg {wavg:.0f} | {key} | {wrongs}")
    print(name, m.KEY, len(m.ITEMS))

json.dump(rows, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(sys.argv[1], "a").write("\n")
print(len(rows), "rows")
print("\n".join(report))
print(len(report), "flagged")
