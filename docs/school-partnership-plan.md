# TigerTest School Partnership Plan

## Overview

TigerTest wants to sell bulk school licenses to driving schools across the USA. Schools buy premium access for all their students rather than students buying individually. This shifts our go-to-market from pure B2C to a B2B channel that provides predictable recurring revenue and higher LTV per account.

## Competitor Research

| Competitor | Model | Pricing | Notes |
|---|---|---|---|
| **driving-tests.org** | B2B + B2C | $75/month base + $20/month per seat | Has team dashboard. Wyoming DMV adopted statewide. |
| **Zutobi** | B2C (pivoting) | $4.99/week per individual student | Pivoted to school management software |
| **Aceable** | B2C only | $40–800 per student | State-approved full courses, no B2B model |
| **DriversEd.com** | Consumer only | Varies | No school partnership offering |

**Key takeaway:** driving-tests.org is the only real B2B competitor. Their per-seat pricing gets expensive fast — a 30-student school pays $675/month ($8,100/year). TigerTest can dramatically undercut on price while offering a better product.

## Proposed Pricing Tiers

| Tier | Seats | Price | Per-Seat Cost |
|---|---|---|---|
| **Starter** | Up to 10 | $149/year | ~$14.90/student/year |
| **Growth** | Up to 30 | $349/year | ~$11.63/student/year |
| **School** | Unlimited | $699/year | Decreases with scale |

- Seats are **reusable** — remove a graduated student, add a new one.
- All tiers include full access to all 50 states, all 4 practice tests, and training mode.
- Annual billing only (simplifies invoicing for schools).

## What Needs Building

### School Admin Dashboard (separate from student-facing app)
- View all enrolled students and their progress
- Add/remove students (seat management)
- Aggregate pass rates and completion metrics
- Export reports (CSV/PDF)

### Bulk Access Code Generation
- School admin generates invite codes or links
- Students redeem codes to get premium access tied to the school
- Codes expire after configurable period

### School Landing Page
- URL: `tigertest.io/schools`
- Already built (prototype): highlights value prop, pricing, and CTA
- Needs: contact form, demo booking, testimonials section

### Invoice/Billing Flow
- Stripe integration for school subscriptions
- Annual invoicing with auto-renewal
- Seat upgrade/downgrade mid-cycle

## Target Market

### Top 10 States by Licensed Drivers
1. California
2. Texas
3. Florida
4. New York
5. Pennsylvania
6. Illinois
7. Ohio
8. Georgia
9. North Carolina
10. Michigan

### School Types
- **Independent driving schools** (primary target) — ~15,000 in the US
- **High school driver's ed programs** — longer sales cycle, budget approval needed
- **CDL training schools** — future expansion opportunity

### Revenue Goal
200 partner schools at average $349/year = **~$70K ARR**

## Outreach Strategy

### Channel 1: Cold Email
- Source school lists from state DMV databases (publicly available)
- Target 50 schools/week during outreach phase
- Personalize by state (reference state-specific questions)

### Channel 2: Industry Associations
- **ADTSEA** (American Driver and Traffic Safety Education Association) — conference sponsorship, newsletter ads
- **DSAA** (Driving School Association of the Americas)
- State-level driving school associations

### Pitch
> "Your students pass faster. You run fewer repeat lessons."

### ROI Calculation for Schools
- Average extra driving lesson cost: $80–150
- Students who fail the written test need additional lessons before retesting
- TigerTest reduces first-attempt failure rate → fewer repeat lessons → school saves time and money
- At $349/year, the tool pays for itself if it saves just 3–4 repeat lessons annually

## Phase Plan

### Phase 1: Foundation (Weeks 1–2)
- [x] Build school landing page (`/schools`)
- [ ] Build pricing page with tier comparison
- [ ] School admin dashboard MVP (student list, add/remove, basic progress view)
- [ ] Stripe integration for school subscriptions
- [ ] Access code generation system

### Phase 2: Outreach (Weeks 3–6)
- [ ] Compile target school lists for top 10 states
- [ ] Cold email campaign: 50 schools/week, 200 total
- [ ] Follow-up sequence (3 touches per school)
- [ ] Offer first 10 schools a free 30-day trial
- [ ] Collect feedback and iterate on admin dashboard

### Phase 3: Scale (Ongoing)
- [ ] Partner dashboard with advanced analytics
- [ ] Testimonials and case studies from early adopters
- [ ] CDL school expansion
- [ ] State DMV partnership exploration (following driving-tests.org's Wyoming model)
- [ ] Referral program for existing partner schools

## Success Metrics

| Milestone | Target |
|---|---|
| **Month 1** | 10 partner schools |
| **Month 3** | 50 partner schools |
| **Month 6** | 150 partner schools, $52K ARR |
| **Month 12** | 200+ partner schools, $70K+ ARR |

### Leading Indicators to Track
- Cold email reply rate (target: 10%+)
- Demo-to-signup conversion (target: 25%)
- School churn rate (target: <10% annually)
- Average students per school account
- Student pass rate improvement (vs. non-TigerTest baseline)
