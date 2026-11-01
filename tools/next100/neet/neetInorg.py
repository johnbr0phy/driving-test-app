# Chemistry 2: inorganic chemistry (NEET units 9 to 12 and the inorganic part
# of unit 20: periodicity, p-block trends, d- and f-block, coordination
# compounds, salt analysis and titrations). Key written first.
from math import isclose, sqrt

# V3+: 2 unpaired electrons, spin-only moment
assert isclose(round(sqrt(2 * 4), 2), 2.83)
# [Pt(en)2Cl2]2+: x + 2(0) + 2(-1) = +2
assert 2 + 2 == 4

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 2, "Ionisation enthalpy", "Which of these period 3 elements has a lower first ionisation enthalpy than the element just before it?",
      ["Aluminium", "Silicon", "Phosphorus", "Chlorine"],
      "Aluminium's 3p electron is shielded by the filled 3s subshell and leaves more easily than magnesium's 3s electron, so Al is lower than Mg. Silicon, phosphorus and chlorine are each higher than the element before."),
    S(1, 2, "Electron gain enthalpy", "Why is the electron gain enthalpy of fluorine less negative than that of chlorine?",
      ["Repulsion in its small 2p subshell", "Its lower electronegativity", "Its larger atomic radius", "Its completely filled 2p subshell"],
      "The added electron enters the compact 2p subshell of fluorine, where it is strongly repelled by the electrons already there. In chlorine's larger 3p subshell the repulsion is much less."),
    L(1, 2, "Inert pair effect", "Assertion (A): For thallium, the +1 oxidation state is more stable than the +3 state.\n\nReason (R): Down group 13, the ns² electrons become increasingly reluctant to take part in bonding.\n\nChoose the correct answer:",
      AR, 0,
      "Both are true and R explains A. This inert pair effect grows down the group because the s electrons are poorly shielded by the d and f electrons, so Tl⁺ is more stable than Tl³⁺."),
    S(1, 2, "Group 15 trends", "Which group 15 element cannot expand its covalency beyond four?",
      ["Nitrogen", "Phosphorus", "Arsenic", "Antimony"],
      "Nitrogen, the first member, has no d orbitals in its valence shell, so its maximum covalency is 4 (as in NH₄⁺). Phosphorus can form PCl₅."),
    S(1, 3, "Magnetic moment", "What is the spin-only magnetic moment of the V³⁺ ion? (V: atomic number 23)",
      ["2.83 BM", "5.92 BM", "3.87 BM", "4.90 BM"],
      "V³⁺ is 3d² with 2 unpaired electrons, so μ = √(n(n + 2)) = √8 ≈ 2.83 BM. 3.87 BM is for 3 unpaired electrons, which would be V²⁺."),
    S(1, 2, "Lanthanoids", "What is the most common oxidation state shown by the lanthanoids?",
      ["+3", "+2", "+4", "+6"],
      "All lanthanoids show +3. Some also show +2 or +4 when that gives an empty, half-filled or filled 4f subshell, as Eu²⁺ and Ce⁴⁺ do."),
    S(1, 3, "Coordination compounds", "What are the coordination number and the oxidation state of platinum in [Pt(en)₂Cl₂]²⁺?",
      ["6 and +4", "4 and +2", "6 and +2", "4 and +4"],
      "Each ethane-1,2-diamine (en) is bidentate, so 2 × 2 + 2 = 6 donor atoms. en is neutral and each Cl is -1, so x - 2 = +2 and x = +4. 4 counts ligands rather than donor atoms."),
    S(1, 3, "Crystal field theory", "How many unpaired electrons are there in the complex ion [Fe(CN)₆]⁴⁻?",
      ["0", "4", "2", "1"],
      "Iron here is Fe²⁺, 3d⁶. CN⁻ is a strong-field ligand, so all six electrons pair in the t₂g set, giving a low-spin, diamagnetic complex. 4 is the high-spin count, as in [Fe(H₂O)₆]²⁺."),
    # ---------- Practice Test 2 ----------
    S(2, 2, "Ionic radii", "Which order of ionic radius is correct for these isoelectronic ions?",
      ["O²⁻ > F⁻ > Na⁺ > Mg²⁺", "Mg²⁺ > Na⁺ > F⁻ > O²⁻", "F⁻ > O²⁻ > Mg²⁺ > Na⁺", "Na⁺ > Mg²⁺ > O²⁻ > F⁻"],
      "All four have 10 electrons. The more protons pull on them, the smaller the ion, so radius falls as nuclear charge rises from O (8) to Mg (12)."),
    S(2, 2, "Group 16 hydrides", "Which of these hydrides is the strongest acid in water?",
      ["H₂Te", "H₂O", "H₂S", "H₂Se"],
      "Down group 16 the H-E bond gets longer and weaker, so the hydride gives up H⁺ more easily. H₂Te is the strongest acid and H₂O the weakest."),
    S(2, 1, "Halogens", "Which halogen is the strongest oxidising agent?",
      ["Fluorine", "Chlorine", "Bromine", "Iodine"],
      "Fluorine has the highest standard reduction potential of the halogens, helped by its low bond dissociation enthalpy and high hydration enthalpy of F⁻, so it oxidises the other halide ions."),
    S(2, 2, "Group 15 trends", "Which element of group 15 is a true metal?",
      ["Bismuth", "Arsenic", "Phosphorus", "Antimony"],
      "Metallic character increases down the group: nitrogen and phosphorus are non-metals, arsenic and antimony metalloids, and bismuth a metal."),
    S(2, 2, "Magnetic properties", "Which of these ions has the largest spin-only magnetic moment?",
      ["Mn²⁺", "Fe²⁺", "Cr³⁺", "Cu²⁺"],
      "Mn²⁺ is 3d⁵ with 5 unpaired electrons (μ ≈ 5.92 BM). Fe²⁺ has 4, Cr³⁺ 3 and Cu²⁺ 1, so their moments are smaller."),
    S(2, 3, "Potassium permanganate", "In the first step of making potassium permanganate, MnO₂ is fused with KOH in air. What product forms?",
      ["K₂MnO₄", "KMnO₄", "Mn₂O₇", "MnSO₄"],
      "Fusion with KOH and an oxidising agent turns MnO₂ (+4) into dark green potassium manganate, K₂MnO₄ (+6). This is then oxidised, chemically or electrolytically, to KMnO₄ (+7)."),
    S(2, 2, "Isomerism", "[Co(NH₃)₅(NO₂)]²⁺ and [Co(NH₃)₅(ONO)]²⁺ are an example of which kind of isomerism?",
      ["Linkage isomerism", "Ionisation isomerism", "Coordination isomerism", "Hydrate isomerism"],
      "The nitrite ligand is ambidentate: it binds through N (nitro) in one and through O (nitrito) in the other. Ionisation isomers swap a ligand with a counter ion."),
    S(2, 3, "Valence bond theory", "What are the hybridisation and shape of [Ni(CO)₄]?",
      ["sp³, tetrahedral", "dsp², square planar", "d²sp³, octahedral", "sp³d², octahedral"],
      "Nickel is in the 0 state, 3d⁸4s². Strong-field CO pairs the electrons into 3d¹⁰, leaving 4s and 4p for sp³ hybrids, so the complex is tetrahedral and diamagnetic."),
    # ---------- Drill only ----------
    S(0, 2, "Salt analysis", "In qualitative analysis, the brown ring test confirms the presence of which anion?",
      ["Nitrate", "Sulphate", "Chloride", "Carbonate"],
      "Fresh FeSO₄ and concentrated H₂SO₄ poured down the side give a brown ring of [Fe(H₂O)₅NO]²⁺ at the junction when nitrate is present."),
    L(0, 2, "Potassium dichromate", "Statement I: Acidifying a yellow solution of potassium chromate turns it orange.\n\nStatement II: In the dichromate ion, chromium is in the +7 oxidation state.\n\nChoose the correct answer:",
      ST, 2,
      "Statement I is true: in acid, 2CrO₄²⁻ + 2H⁺ gives orange Cr₂O₇²⁻. Statement II is false: chromium is +6 in both chromate and dichromate, so the change is not a redox reaction."),
    S(0, 2, "Ligands", "Which of these ligands is hexadentate?",
      ["EDTA⁴⁻", "en", "C₂O₄²⁻", "NH₃"],
      "Ethylenediaminetetraacetate binds through two N and four O atoms, wrapping a metal ion in one chelate. Ethane-1,2-diamine (en) and oxalate are bidentate, and NH₃ unidentate."),
    S(0, 2, "Titrations", "In the titration of oxalic acid against KMnO₄, why is no separate indicator added?",
      ["KMnO₄ acts as its own indicator", "Oxalic acid changes colour", "The reaction is too slow", "Phenolphthalein is already present"],
      "Permanganate is intensely purple while Mn²⁺ is almost colourless, so the first drop of excess KMnO₄ leaves a pale pink colour that marks the end point."),
]
