# Agentic Question Rewrite

Fresh generation of all 2,160 driving test questions using sub-agents.

## Structure

```
/agentic-rewrite/
├── AGENT-PROMPT.md      # Core rules for question generation
├── STATE-RESEARCH.md    # Research checklist for state-specific questions
├── README.md            # This file
├── universal/
│   └── universal.json   # 160 universal questions
├── states/
│   └── {STATE}.json     # 40 questions per state (50 files)
└── compiled/
    └── all-questions.csv  # Final merged output for review
```

## Progress

### Universal Questions
- [ ] Universal (160 questions)

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

### Compilation
- [ ] All JSONs merged to CSV
- [ ] User review complete
- [ ] Merged to main dataset

## Totals

| Component | Questions |
|-----------|-----------|
| Universal | 160 |
| State-Specific | 2,000 (40 × 50) |
| **Total** | **2,160** |
