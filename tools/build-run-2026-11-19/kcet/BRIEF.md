# Writer brief: KCET (Karnataka CET) PCM practice bank (Tigertest)

You write original multiple-choice questions for one or more domain source files of a new v2 exam:
KCET, the Karnataka Examinations Authority's Common Entrance Test (UGCET) for engineering,
Physics, Chemistry and Mathematics papers.

## The real exam (official KEA Information Bulletin, UGCET-2026)
- Questions are based on the First and Second PUC syllabi of Karnataka's Department of
  Pre-University Education, which uses the NCERT textbooks for Physics, Chemistry and Mathematics.
- Each paper: 60 one-mark MCQs, four options, 80 minutes, no negative marking.
- KCET is an NCERT-level speed test: mostly direct concept and short-calculation questions, a
  minute and twenty seconds each, easier than JEE Main. Aim for that: difficulty 1 (direct recall
  or one step), 2 (two or three steps), 3 (multi-step but still doable in about 2 minutes).
  Roughly a third each.

## Syllabus: the current NCERT rationalised textbooks (Reprint 2026-27). Write ONLY on these chapters
Physics XI: Units and Measurements; Motion in a Straight Line; Motion in a Plane; Laws of Motion;
Work, Energy and Power; System of Particles and Rotational Motion; Gravitation; Mechanical
Properties of Solids; Mechanical Properties of Fluids; Thermal Properties of Matter;
Thermodynamics; Kinetic Theory; Oscillations; Waves.
Physics XII: Electric Charges and Fields; Electrostatic Potential and Capacitance; Current
Electricity; Moving Charges and Magnetism; Magnetism and Matter; Electromagnetic Induction;
Alternating Current; Electromagnetic Waves; Ray Optics and Optical Instruments; Wave Optics; Dual
Nature of Radiation and Matter; Atoms; Nuclei; Semiconductor Electronics.
Chemistry XI: Some Basic Concepts of Chemistry; Structure of Atom; Classification of Elements and
Periodicity; Chemical Bonding and Molecular Structure; Thermodynamics; Equilibrium; Redox
Reactions; Organic Chemistry: Some Basic Principles and Techniques; Hydrocarbons.
Chemistry XII: Solutions; Electrochemistry; Chemical Kinetics; The d- and f-Block Elements;
Coordination Compounds; Haloalkanes and Haloarenes; Alcohols, Phenols and Ethers; Aldehydes,
Ketones and Carboxylic Acids; Amines; Biomolecules.
Mathematics XI: Sets; Relations and Functions; Trigonometric Functions; Complex Numbers and
Quadratic Equations; Linear Inequalities; Permutations and Combinations; Binomial Theorem;
Sequences and Series; Straight Lines; Conic Sections; Introduction to Three Dimensional Geometry;
Limits and Derivatives; Statistics; Probability.
Mathematics XII: Relations and Functions; Inverse Trigonometric Functions; Matrices;
Determinants; Continuity and Differentiability; Application of Derivatives; Integrals;
Application of Integrals; Differential Equations; Vector Algebra; Three Dimensional Geometry;
Linear Programming; Probability.

Do NOT write on content removed in NCERT rationalisation or no longer in these books: solid state,
surface chemistry, s-block and p-block element chapters, hydrogen, environmental chemistry,
polymers, chemistry in everyday life, isolation of elements (metallurgy), mathematical reasoning,
communication systems, physical world, error-analysis formulas (propagation of errors), Bohr
orbit natural phenomena like rainbows. If you are unsure a topic is still in the current book,
leave it out.

## Domains (file `tools/build-run-2026-11-19/kcet/<domain>.py`), counts per Test 1 / Test 2 / drill-only
| domain | chapters | T1 | T2 | D |
|---|---|---|---|---|
| kcetPhyMech | Phys XI ch 1 to 7 | 8 | 8 | 6 |
| kcetPhyThermo | Phys XI ch 8 to 14 (solids, fluids, heat, thermodynamics, kinetic theory, oscillations, waves) | 7 | 7 | 6 |
| kcetPhyElec | Phys XII ch 1 to 8 | 8 | 8 | 6 |
| kcetPhyModern | Phys XII ch 9 to 14 (optics, dual nature, atoms, nuclei, semiconductors) | 7 | 7 | 6 |
| kcetChemPhys | Chem XI basic concepts, thermodynamics, equilibrium, redox; XII solutions, electrochemistry, kinetics | 10 | 10 | 6 |
| kcetChemInorg | Chem XI structure of atom, periodicity, bonding; XII d- and f-block, coordination compounds | 8 | 8 | 6 |
| kcetChemOrg | Chem XI GOC, hydrocarbons; XII haloalkanes to biomolecules | 12 | 12 | 6 |
| kcetMathAlg | sets, relations and functions (XI and XII), complex numbers and quadratics, inequalities, P&C, binomial, sequences, matrices, determinants | 8 | 8 | 6 |
| kcetMathCalc | limits and derivatives, continuity and differentiability, application of derivatives, integrals, application of integrals, differential equations | 10 | 10 | 6 |
| kcetMathGeom | trigonometric functions, inverse trig, straight lines, conic sections, intro 3D, vector algebra, 3D geometry | 7 | 7 | 6 |
| kcetMathStats | statistics, probability (XI and XII), linear programming | 5 | 5 | 6 |

Spread each domain's items across its chapters (no chapter with more than about a third). Mix
Class XI and XII material roughly as the table shows. Test 1 and Test 2 should be similar in
difficulty and coverage; drill-only items (test 0) are for practice.

## File format (copy the shape of `tools/next100/mhtcet/mhtcetPhyMech.py`)
```python
# One comment line: domain and chapters covered.
# Key written first; ans= is the key's value computed here and asserted by build.py.
ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 2, "Gravitation", "stem ending with ? or :",
      ["key", "wrong 1", "wrong 2", "wrong 3"],
      r"Explanation: 1 to 3 sentences. Why the key is right, why the most tempting wrong one is wrong.",
      ans=<python expression giving the key's value, for numeric keys>),
    # ---------- Practice Test 2 ----------
    ...
    # ---------- Drill only ----------
    S(0, 1, ...),
]
```
`S(test, difficulty, skill, stem, options, explanation, ans=None)`. `skill` is the NCERT chapter
name (short form is fine, for example "Gravitation", "Coordination compounds", "Integrals").
- **Key first** in the options list. The build shuffles by a seed, or, if every option is a number
  with one shared unit, sorts them ascending and locks the order. So never refer to options by
  position anywhere ("the first option", "option B", "the last two"). Name the option by what it
  says.
- **Every numeric key gets `ans=`**, a Python expression computing it (math, sqrt, pi available).
  The build asserts the key matches within 0.6%. Recompute everything; a wrong key is the worst
  failure.
- Maths and formulas in KaTeX `$...$` (use raw strings `r"..."`). Units in plain text: "5 m/s²",
  "2.4 eV", "0.5 mol L⁻¹". Keep `$` balanced.
- Numeric distractors are values a real mistake produces (forgot to square, used diameter for
  radius, Celsius for kelvin, the reciprocal, sign error). Say in the explanation which mistake
  gives the tempting one.

## House style (reviewers fail these)
- **Options short**: a value, a formula, a compound name, a short phrase. Average 5 to 30 chars.
- **Key must not stand out**: write the three wrong options in the same form and length. The key
  may be strictly the longest option in at most 20% of your items.
- **Every question its own options**: no option set repeated, no key reused word for word in a
  file, no families of questions sharing options.
- **Key must not echo the stem**: if a stem word appears in the key, use it in wrong options too.
- **Exactly one defensible answer.** Check each wrong option is actually wrong, including sign,
  units and significant rounding. "Which is correct" items must have exactly one true statement.
- **Stems short and self-contained**: median 12 to 20 words. Data given in the stem. No diagrams:
  describe any setup in words. Use g = 10 m/s² unless 9.8 matters, and say which in the stem.
- No "All of the above", "None of the above", "Both A and B", "Statement I and II" families
  (Assertion-Reason is fine only if written as a single question with four distinct options; avoid
  it mostly). No em or en dashes anywhere (use commas, colons, "to").
- Indian context is fine for word problems (rupees, Bengaluru, Mysuru) but most items are pure
  science. No questions about the exam itself, KEA, cut-offs, fees or dates.
- All questions original. Never copy or reword KCET past papers, NCERT exercise or example
  questions, or any coaching material. Do not reuse the stems or numbers of
  `tools/next100/mhtcet/*.py`, `data/v2/jeemain/questions.json` or `data/v2/neet/questions.json`.

## Checks
After writing, run from the repo root: `python3 -I tools/build-run-2026-11-19/kcet/build.py`
(other writers' files may be missing; that is fine). Fix every WARN and assertion for your
domains. Then report back: per domain the T1/T2/D counts, how many keys are strictly longest, and
anything you were unsure about.
