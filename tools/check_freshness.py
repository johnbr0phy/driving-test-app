#!/usr/bin/env python3
"""Check lib/examFreshness.json: every event names a real exam id, a valid
date and an https source, and done (when set) is a date. Run in CI."""
import datetime, glob, json, re, sys

ids = set()
for path in ["lib/exams.ts", *glob.glob("lib/v2/exams/*.ts")]:
    ids |= set(re.findall(r'\bid: "([a-z0-9-]+)"', open(path, encoding="utf-8").read()))
ids.add("dmv")

reg = json.load(open("lib/examFreshness.json", encoding="utf-8"))
errors = []
KINDS = {"outline", "law", "format", "sunset", "notice", "review"}
for i, e in enumerate(reg.get("events", [])):
    where = f"event {i} ({e.get('exam')})"
    if e.get("exam") not in ids:
        errors.append(f"{where}: unknown exam id")
    for key in ("date", "done"):
        if key in e:
            try:
                datetime.date.fromisoformat(e[key])
            except Exception:  # noqa: BLE001
                errors.append(f"{where}: {key} {e[key]!r} is not YYYY-MM-DD")
    if "date" not in e:
        errors.append(f"{where}: no date")
    if e.get("kind") not in KINDS:
        errors.append(f"{where}: kind must be one of {sorted(KINDS)}")
    for key in ("what", "action"):
        if not str(e.get(key, "")).strip():
            errors.append(f"{where}: no {key}")
    if not str(e.get("source", "")).startswith("https://"):
        errors.append(f"{where}: source must be an https URL")
if not isinstance(reg.get("reviewAfterDays"), int):
    errors.append("reviewAfterDays must be a number of days")
print(f"{len(reg.get('events', []))} freshness events")
if errors:
    print("FAIL\n  " + "\n  ".join(errors))
    sys.exit(1)
print("PASS")
