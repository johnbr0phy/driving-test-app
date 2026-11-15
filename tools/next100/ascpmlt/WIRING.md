# ascpmlt wiring

Paste-ready blocks are in `wiring/`, in the same sections as `tools/next100/ascppbt/wiring/`:
- `config.ts.txt`: the ExamConfig for `lib/exams.ts` (add `"ascpmlt"` to the `ExamId` union; icon
  `microscope`, or another from the union if that is not in it).
- `types.txt`: state code `ASCPMLT` and the ten category keys for `types/index.ts`.
- `labels.json`: category labels for every `i18n/*.ts` (English text, like ascppbt).
- `theme.txt`: `[data-theme="ascpmlt"]` brand `151 25% 22%` for `app/globals.css` (hue given by the run).
- `catalog.json`: testCatalog blurb, org, hub group (after ascppbt), aliases, search tests, region US,
  TEACHER_LED + TEACHES ("an MLT program"), borrowed tiger (`htl` in `BORROWED_SETS`), share copy,
  RELATED_OVERRIDES.
- `facts.ts.txt`: the `lib/examFacts.ts` entry.
- `claude.md`: the CLAUDE.md bullet.
Also: `lib/banks/all.ts` line `import "./ascpmlt";`, `scripts/build-training-parts.ts` run, a
`lib/seoDates.ts` / landing dates bump, screenshots `/landing/ascpmlt-{mobile,desktop}.png`.
Premium: standard v1 locks (nothing to add).
