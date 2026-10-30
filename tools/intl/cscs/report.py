import json, sys
rows = json.load(open(sys.argv[1]))
for r in rows:
    opts = [r["option"+c] for c in "ABCD"]; k = r["correctIndex"]; key = opts[k]
    wrong = [o for i,o in enumerate(opts) if i != k]; avg = sum(map(len,wrong))/3
    longest = len(key) > max(map(len,wrong)); big = len(key) > 1.2*avg
    if longest or big:
        print(f'{r["questionId"]} {"L" if longest else " "}{"B" if big else " "} {len(key)}/{avg:.0f} | {key} || ' + " | ".join(wrong))
