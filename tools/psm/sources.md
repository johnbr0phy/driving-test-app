# PSM I (`psm`) sources

## Content source

**The Scrum Guide, November 2020**, Ken Schwaber and Jeff Sutherland, https://scrumguides.org/scrum-guide.html
(also the PDF at scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf). Licensed CC BY-SA 4.0. It is
still the current edition in October 2026. Every item is original and paraphrases the Guide; no passage is quoted
at length, and nothing is taken from Scrum.org's Open Assessments (Scrum Open, Product Owner Open...) or any
other question bank. Items were written fresh for this bank, not adapted from `tools/pmp/`.

Sections used, by drill:
- `psmTheory`: Purpose of the Scrum Guide, Scrum Definition, Scrum Theory (empiricism, lean thinking,
  transparency, inspection, adaptation), Scrum Values.
- `psmTeam`: Scrum Team (size "typically 10 or fewer", no sub-teams, cross-functional, self-managing),
  Developers, Product Owner (one person, not a committee; may delegate, remains accountable), Scrum Master
  (accountable for establishing Scrum and for the team's effectiveness).
- `psmEvents`: Scrum Events, The Sprint (one month or less, cancellation by the Product Owner only when the
  Sprint Goal becomes obsolete), Sprint Planning (8 h max), Daily Scrum (15 min), Sprint Review (4 h max),
  Sprint Retrospective (3 h max), "usually shorter" for shorter Sprints.
- `psmArtifacts`: Scrum Artifacts and their commitments (Product Backlog/Product Goal, Sprint Backlog/Sprint
  Goal, Increment/Definition of Done), refinement and sizing, multiple Increments per Sprint, Sprint Review is
  not a release gate, undone work returns to the Product Backlog.
- `psmValue`: Product Owner accountability, Product Backlog management, stakeholders at the Sprint Review,
  the forecasting paragraph in The Sprint (burn-downs, burn-ups, cumulative flows; only what has happened may
  be used for forward-looking decisions).
- `psmFacilitation`: Scrum Master's service to the Scrum Team, the Product Owner and the organization.

## Assessment format (checked 2026-10-30)

Scrum.org's PSM I page (scrum.org/assessments/professional-scrum-master-i-certification) did not render for the
fetcher; the figures below match Scrum.org search snippets and several current prep guides:
- 80 questions, 60 minutes, 85% passing score (68 of 80).
- Multiple choice, multiple answer and true/false. Modelled as `single`, `multi` with `select` ("Choose two" /
  "Choose three") and `single` with options True / False (fixed order, not shuffled).
- Online, English, no course prerequisite, certification does not expire (lifetime, no renewal fee).
- Scrum.org publishes focus areas but no per-area weighting, so the per-test split (12/14/18/14/10/12) is ours.

Not verified: the current attempt fee (sources disagree between USD 150 and 200), so no fee is stated anywhere.
Scoring here is all or nothing per item; Scrum.org does not document whether multiple answer items get partial
credit, so no claim is made about the real assessment.

## Build

`python3 -I tools/psm/build.py` writes `data/v2/psm/questions.json` (plain array, ids PSM-T1-001.., PSM-T2-001..,
PSM-D-001..), then
`python3 -I tools/validate_v2_bank.py psm '{"1": {"psm": {"1": 80}}, "2": {"psm": {"1": 80}}}'`.
