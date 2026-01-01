# DMV Handbook Version Tracking

Track which handbook versions were used for question generation.

## How to Use

Before regenerating questions:
1. Web search for the latest DMV handbook version for each state
2. Compare against the version listed below
3. If newer version exists, update this file and regenerate questions

## State Handbook Versions

| State | Handbook Version | Last Generated | Needs Regen | Source URL |
|-------|-----------------|----------------|-------------|------------|
| NJ | 2024 | 2026-01-01 | No | https://www.nj.gov/mvc/about/manuals.htm |
| CA | - | - | Yes | https://www.dmv.ca.gov/portal/handbook/ |
| TX | - | - | Yes | https://www.dps.texas.gov/section/driver-license/online-driver-handbooks |
| FL | - | - | Yes | https://www.flhsmv.gov/driver-licenses-id-cards/handbooks-manuals/ |
| NY | - | - | Yes | https://dmv.ny.gov/driver-license/drivers-manual |
| PA | - | - | Yes | https://www.dmv.pa.gov/Driver-Services/Driver-Manuals/ |
| IL | - | - | Yes | https://www.ilsos.gov/publications/dsd_a112.html |
| OH | - | - | Yes | https://www.bmv.ohio.gov/dl-manuals.aspx |
| GA | - | - | Yes | https://dds.georgia.gov/drivers-manuals |
| NC | - | - | Yes | https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/driver-handbook.aspx |

## Universal Questions

| Type | Last Generated | Last Verified | Needs Regen |
|------|----------------|---------------|-------------|
| Universal (150) | - | - | Yes |

## Version Check Command

Run this to check for new handbook versions:

```
/ralph-loop "Search the web for the latest [STATE] DMV driver manual/handbook version. Check if it's newer than what's listed in handbook-versions.md. Update the file if a newer version exists. Say <promise>VERSION CHECK COMPLETE</promise> when done." --max-iterations 5 --completion-promise "VERSION CHECK COMPLETE"
```

## Change Log

| Date | State | Action | Notes |
|------|-------|--------|-------|
| 2026-01-01 | NJ | Generated | Initial 50 questions, all verified |
| 2026-01-01 | - | Setup | Created ralph-loop folder structure |
