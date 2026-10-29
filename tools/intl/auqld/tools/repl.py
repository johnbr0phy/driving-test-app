import sys, json
f, pairs = sys.argv[1], json.loads(sys.argv[2])
s = open(f).read()
for a, b in pairs:
    n = s.count('"%s"' % a)
    if n != 1:
        print("NOT UNIQUE", f, a, n); continue
    s = s.replace('"%s"' % a, '"%s"' % b)
open(f, "w").write(s)
