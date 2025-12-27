# Agentic Question Rewrite

Fresh generation of all 2,160 driving test questions using a multi-agent system with self-correction.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SUPERVISOR AGENT                           │
│         Orchestrates pipeline, analyzes issues,                 │
│         decides: fix individual questions or update prompts     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
   ┌───────────┐        ┌───────────┐        ┌───────────┐
   │ Generator │        │ Generator │        │ Generator │
   │ Universal │        │ State x50 │   ...  │ (batched) │
   └─────┬─────┘        └─────┬─────┘        └─────┬─────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
              ┌───────────────────────────────┐
              │      VALIDATOR AGENTS         │
              │  (run in parallel on output)  │
              ├───────────┬───────────────────┤
              │ Distrib.  │ Memorization      │
              │ Checker   │ Checker           │
              ├───────────┼───────────────────┤
              │ Format    │ Answer Length     │
              │ Checker   │ Checker           │
              └───────────┴─────────┬─────────┘
                                    │
                              ▼─────┴─────▼
                    ┌─────────────────────────┐
                    │  Issues Found?          │
                    │                         │
                    │  PASS → Complete        │
                    │  MINOR → Fixer Agent    │
                    │  SYSTEMIC → Update      │
                    │    prompts & regenerate │
                    └─────────────────────────┘
```

---

## Folder Structure

```
/agentic-rewrite/
├── AGENT-PROMPT.md          # Core rules for question generation
├── STATE-RESEARCH.md        # Research checklist for state-specific questions
├── README.md                # This file
│
├── validators/
│   ├── SUPERVISOR-AGENT.md      # Orchestrates full pipeline
│   ├── FIXER-AGENT.md           # Fixes individual question issues
│   ├── DISTRIBUTION-CHECKER.md  # Validates A/B/C/D balance
│   ├── MEMORIZATION-CHECKER.md  # Flags $, points, X/Y/Z formats
│   ├── FORMAT-CHECKER.md        # Validates JSON structure
│   └── ANSWER-LENGTH-CHECKER.md # Flags verbose padding
│
├── universal/
│   └── universal.json       # 160 universal questions
│
├── states/
│   └── {STATE}.json         # 40 questions per state (50 files)
│
└── compiled/
    └── all-questions.csv    # Final merged output for review
```

---

## Agent Descriptions

| Agent | Role |
|-------|------|
| **Supervisor** | Runs the pipeline, analyzes validator results, decides corrective action |
| **Generator** | Creates questions following AGENT-PROMPT.md rules |
| **Distribution Checker** | Ensures 25% each A/B/C/D |
| **Memorization Checker** | Flags specific numbers, dollar amounts |
| **Format Checker** | Validates JSON, required fields, IDs |
| **Answer Length Checker** | Flags verbose/padded answers |
| **Fixer** | Surgically fixes individual flagged questions |

---

## Self-Correction Logic

| Issue Type | Threshold | Action |
|------------|-----------|--------|
| Distribution skew | >30% any letter | Update prompt, regenerate |
| Distribution skew | 5-30% | Update prompt, regenerate affected |
| Memorization | >10% of questions | Add category guidance, regenerate |
| Memorization | <10% | Fixer agent rewrites |
| Format errors | Any | Fixer agent corrects |
| Verbose answers | >20% | Strengthen rules, regenerate |
| Verbose answers | <20% | Fixer agent shortens |

---

## Progress

### Universal Questions
- [ ] Generated
- [ ] Validated
- [ ] Fixed (if needed)

### State Questions (50 states)
| | | | | |
|---|---|---|---|---|
| [ ] AL | [ ] AK | [ ] AZ | [ ] AR | [ ] CA |
| [ ] CO | [ ] CT | [ ] DE | [ ] FL | [ ] GA |
| [ ] HI | [ ] ID | [ ] IL | [ ] IN | [ ] IA |
| [ ] KS | [ ] KY | [ ] LA | [ ] ME | [ ] MD |
| [ ] MA | [ ] MI | [ ] MN | [ ] MS | [ ] MO |
| [ ] MT | [ ] NE | [ ] NV | [ ] NH | [ ] NJ |
| [ ] NM | [ ] NY | [ ] NC | [ ] ND | [ ] OH |
| [ ] OK | [ ] OR | [ ] PA | [ ] RI | [ ] SC |
| [ ] SD | [ ] TN | [ ] TX | [ ] UT | [ ] VT |
| [ ] VA | [ ] WA | [ ] WV | [ ] WI | [ ] WY |

### Final Steps
- [ ] All validators pass
- [ ] Compiled to CSV
- [ ] User review complete
- [ ] Merged to main dataset

---

## Totals

| Component | Questions |
|-----------|-----------|
| Universal | 160 |
| State-Specific | 2,000 (40 × 50) |
| **Total** | **2,160** |
