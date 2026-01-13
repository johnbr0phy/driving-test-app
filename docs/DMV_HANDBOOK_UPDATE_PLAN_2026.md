# DMV Handbook Update Plan - 2026

## Overview

This document outlines the plan to update our question bank with questions reflecting the latest DMV handbook changes for 8 states.

## States Requiring Updates

| State | Code | Update Source | Current Questions | DMV Agency |
|-------|------|---------------|-------------------|------------|
| Tennessee | TN | 2026 Handbook | 40 | DDS |
| Oregon | OR | 2026 Handbook | 40 | DMV |
| North Carolina | NC | 2026 Handbook | 40 | DMV |
| Colorado | CO | 2026 Handbook | 40 | DMV |
| Illinois | IL | 2026 Handbook | 40 | SOS |
| Florida | FL | January 2026 (driving-tests.org) | 40 | FLHSMV |
| Utah | UT | 2025-2026 Edition | 40 | DLD |
| Texas | TX | Revised December 2024 | 40 | DPS |

**Total questions to review/update: 320 state-specific questions**

---

## Phase 1: Research & Document Changes

### Task 1.1: Obtain Updated Handbooks

For each state, locate the official driver handbook from:

| State | Official Handbook URL |
|-------|----------------------|
| **Tennessee** | https://www.tn.gov/safety/driver-services/classd/dlhandbook.html |
| **Oregon** | https://www.oregon.gov/odot/dmv/pages/driverid/manual.aspx |
| **North Carolina** | https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-handbook.aspx |
| **Colorado** | https://dmv.colorado.gov/driver-s-handbook |
| **Illinois** | https://www.ilsos.gov/publications/pdf_publications/dsd_a112.pdf |
| **Florida** | https://www.flhsmv.gov/driver-licenses-id-cards/handbooks-manuals/ |
| **Utah** | https://dld.utah.gov/handbooks-and-manuals/ |
| **Texas** | https://www.dps.texas.gov/section/driver-license/texas-driver-handbook |

### Task 1.2: Identify Key Changes

For each state, document changes in these areas:

1. **GDL (Graduated Driver Licensing) Laws**
   - Permit age requirements
   - Supervised driving hour requirements
   - Passenger restrictions for new drivers
   - Nighttime driving restrictions

2. **DUI/DWI Laws**
   - BAC limits (standard, commercial, under 21)
   - Implied consent laws
   - Penalties and license suspension periods
   - Ignition interlock requirements

3. **Cell Phone & Distracted Driving**
   - Hands-free requirements
   - Texting bans
   - Exceptions (emergency, navigation)
   - Penalties

4. **Insurance Requirements**
   - Minimum liability coverage amounts
   - Proof of insurance requirements
   - Penalties for driving uninsured

5. **State-Unique Rules**
   - Move Over laws
   - School zone regulations
   - Work zone penalties
   - State-specific road rules

---

## Phase 2: Question Review & Update

### Current Question Distribution per State

Each state has 40 questions distributed across these categories:

```
Category Distribution (typical):
├── gdlLicensing     ~8 questions
├── stateUnique      ~10 questions
├── duiStateLaws     ~8 questions
├── cellPhone        ~6 questions
└── insurance        ~8 questions
```

### Task 2.1: Review Existing Questions

For each state:
1. Export current questions to a review spreadsheet
2. Cross-reference each question against updated handbook
3. Flag questions with outdated information
4. Note questions that are still accurate

### Task 2.2: Update Flagged Questions

For each flagged question:
1. Update the question text if phrasing changed
2. Update answer options with new values (e.g., new BAC limits, fine amounts)
3. Update the correct answer if the law changed
4. Update the explanation with current information
5. Cite the handbook section for reference

### Task 2.3: Add New Questions (if needed)

If significant new laws were added:
1. Create new questions following the existing format
2. Ensure proper question ID sequencing (e.g., TN-041, TN-042)
3. Categorize appropriately
4. Write clear explanations

---

## Phase 3: Implementation

### Question Format Reference

```json
{
  "type": "State-Specific",
  "state": "TN",
  "questionId": "TN-001",
  "category": "gdlLicensing",
  "question": "Question text here?",
  "optionA": "First option",
  "optionB": "Second option",
  "optionC": "Third option",
  "optionD": "Fourth option",
  "correctAnswer": "B",
  "correctIndex": 1,
  "explanation": "Detailed explanation citing handbook."
}
```

### Task 3.1: Update questions.json

1. Locate state questions in `/data/questions.json`
2. Update questions in place (maintain question IDs)
3. Validate JSON structure after changes

### Task 3.2: Validation Checklist

For each updated question:
- [ ] Question text is clear and unambiguous
- [ ] All four answer options are plausible
- [ ] Correct answer matches current law
- [ ] Explanation accurately describes why answer is correct
- [ ] No spelling or grammar errors
- [ ] Numerical values (fines, limits, ages) are accurate

---

## Phase 4: Quality Assurance

### Task 4.1: Automated Validation

Run validation script to ensure:
```bash
# Check JSON validity
node scripts/validate-questions.js

# Check for duplicate questions
node scripts/check-duplicates.js

# Verify question counts per state
node scripts/count-questions.js
```

### Task 4.2: Manual Review

- Have each state's questions reviewed by a second person
- Cross-check at least 20% of questions against handbook
- Verify explanations match official handbook language

### Task 4.3: Testing

1. Run full test suite: `npm test`
2. Test state selection for each updated state
3. Complete a practice test for each state
4. Verify questions display correctly

---

## Timeline & Priority

### Priority Order (based on update recency/significance)

1. **Florida** - January 2026 update (most recent)
2. **Texas** - December 2024 revision
3. **Utah** - 2025-2026 edition
4. **Tennessee** - 2026 handbook
5. **Oregon** - 2026 handbook
6. **North Carolina** - 2026 handbook
7. **Colorado** - 2026 handbook
8. **Illinois** - 2026 handbook

---

## Common Areas to Check

### Frequently Updated Laws

1. **Cell Phone Laws** - Many states strengthening hands-free requirements
2. **Move Over Laws** - Expanding to include more vehicle types
3. **DUI Penalties** - Often increase over time
4. **GDL Restrictions** - Passenger limits and supervised hours
5. **Insurance Minimums** - Periodic increases to match inflation
6. **Electric Vehicle Rules** - New regulations appearing

### Known 2025-2026 Trends

- Stronger distracted driving penalties
- Lower BAC limits in some states
- Expanded Move Over law coverage
- Updated work zone speeding penalties
- New autonomous vehicle regulations

---

## Resources

### Official DMV Sites

| State | Contact/Resources |
|-------|------------------|
| TN | https://www.tn.gov/safety/driver-services.html |
| OR | https://www.oregon.gov/odot/dmv |
| NC | https://www.ncdot.gov/dmv |
| CO | https://dmv.colorado.gov |
| IL | https://www.ilsos.gov |
| FL | https://www.flhsmv.gov |
| UT | https://dld.utah.gov |
| TX | https://www.dps.texas.gov |

### Third-Party Verification

- driving-tests.org (confirmed FL January 2026 update)
- DMV.org state pages
- State legislature websites for recent law changes

---

## Deliverables Checklist

- [ ] Research completed for all 8 states
- [ ] Change log documented for each state
- [ ] Questions updated in questions.json
- [ ] JSON validation passed
- [ ] Manual QA review completed
- [ ] Test suite passing
- [ ] Update committed and pushed

---

## Notes

- Maintain question ID consistency (don't renumber existing questions)
- Keep answer length variation to avoid bias (per recent fix in commit 7dbe844)
- Update explanations to cite specific handbook sections where possible
- Consider adding version/date metadata for future tracking
