# Plan: Migrate Ralph Loops to Vibe Kanban

## Current State

### Ralph Loop System
- **prd.json**: Contains 18 validation rules for question quality (no dollar amounts, no insurance formats, answer length balance, etc.)
- **Tasks**: Generate 50 NJ questions (10 done) + 150 universal questions (0 done)
- **Shell scripts**: `ralph.sh` and `ralph-once.sh` run Claude in loops
- **Progress tracking**: validation.txt (rule failures) + progress.txt (notes)

### What's Complete
- 10 NJ questions in `questions/nj-questions.json`
- Validation rules defined and tested

---

## Vibe Kanban Overview

Vibe Kanban uses a `kanban.json` file as the source of truth:

```json
{
  "todo": [{ "id": "1", "task": "...", "status": "todo" }],
  "in_progress": [],
  "done": []
}
```

**Key Benefits:**
- Visual web UI (`npx vibe-kanban`)
- Parallel execution with git worktrees
- Multiple agent support (Claude Code, etc.)
- Automatic PR creation
- Machine-readable JSON format

---

## Migration Plan

### Option A: Task-Per-Batch Approach
Create tasks for batches of questions:

```json
{
  "todo": [
    { "id": "nj-batch-1", "task": "Generate NJ questions 11-20 following prd.json rules" },
    { "id": "nj-batch-2", "task": "Generate NJ questions 21-30 following prd.json rules" },
    { "id": "nj-batch-3", "task": "Generate NJ questions 31-40 following prd.json rules" },
    { "id": "nj-batch-4", "task": "Generate NJ questions 41-50 following prd.json rules" },
    { "id": "universal-batch-1", "task": "Generate universal questions 1-30 following prd.json rules" },
    { "id": "universal-batch-2", "task": "Generate universal questions 31-60 following prd.json rules" },
    // ... more batches
  ]
}
```

**Pros:** Parallel execution, clear progress tracking
**Cons:** May need merge conflicts resolution

### Option B: Task-Per-Category Approach
Create tasks by topic category:

```json
{
  "todo": [
    { "id": "nj-parking", "task": "Generate 5 NJ parking questions" },
    { "id": "nj-speed", "task": "Generate 5 NJ speed limit questions" },
    { "id": "nj-signals", "task": "Generate 5 NJ traffic signal questions" },
    { "id": "universal-safety", "task": "Generate 15 universal safety questions" },
    // ...
  ]
}
```

**Pros:** Better topic diversity, easier to parallelize (no file conflicts)
**Cons:** Need separate JSON files per category, then merge

### Option C: Sequential with Verification Tasks
Keep generation sequential but add parallel verification:

```json
{
  "todo": [
    { "id": "gen-nj-remaining", "task": "Generate remaining 40 NJ questions" },
    { "id": "gen-universal", "task": "Generate 150 universal questions" },
    { "id": "verify-nj", "task": "Verify all NJ questions against 18 rules" },
    { "id": "verify-universal", "task": "Verify all universal questions against 18 rules" },
    { "id": "integration", "task": "Integrate questions into main app" }
  ]
}
```

**Pros:** Simpler, avoids merge conflicts
**Cons:** Less parallelism

---

## Recommended Approach: Option B (Category-Based)

### Why Category-Based Works Best:
1. **No merge conflicts** - Each task writes to its own file
2. **Parallel execution** - Can run multiple agents simultaneously
3. **Better quality** - Forces topic diversity upfront
4. **Easy verification** - Can verify categories independently
5. **Flexible** - Can add more categories as needed

### Implementation Steps:

1. **Create topic breakdown** for questions:
   - NJ-specific: Parking, Speed Limits, GDL, Cell Phones, School Buses, Move Over, Headlights, Turn Signals, Passing, Seat Belts
   - Universal: Safety, Right of Way, Traffic Signs, Lane Usage, Weather Driving, Night Driving, Emergency Vehicles, Intersections, Highway Driving, Alcohol/Drugs

2. **Create kanban.json** with category tasks

3. **Create CLAUDE.md instructions** file that agents read for the 18 rules

4. **Set up output structure**:
   ```
   ralph-loop/
   └── questions/
       ├── nj/
       │   ├── parking.json
       │   ├── speed-limits.json
       │   └── ...
       └── universal/
           ├── safety.json
           ├── right-of-way.json
           └── ...
   ```

5. **Run vibe-kanban**: `npx vibe-kanban`

6. **Final merge task**: Combine all category files into final JSONs

---

## Questions to Resolve

1. **Batch size**: How many questions per task? (Suggested: 5-10)
2. **Verification strategy**: Verify during generation or as separate pass?
3. **Topic list**: Finalize the exact categories for NJ and universal questions
4. **Parallel agents**: How many agents to run simultaneously?

---

## Next Steps (After Approval)

- [ ] Install vibe-kanban (`npx vibe-kanban`)
- [ ] Create `kanban.json` with all tasks
- [ ] Create `CLAUDE.md` with rules and output format
- [ ] Set up `questions/nj/` and `questions/universal/` directories
- [ ] Test with one task to validate workflow
- [ ] Run full generation

---

## Sources
- [Vibe Kanban - Orchestrate AI Coding Agents](https://www.vibekanban.com/)
- [GitHub - BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)
