# Survey of the Natural Sciences: Organic Chemistry. Original items on the ADA Organic Chemistry
# specifications as updated in April 2026. Structures are named or written as condensed formulas;
# curved-arrow mechanisms are asked in words.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)
# Per test 15; drill-only 4.

O = "datOrgChem"
MECH, SYN, AB, PROP, STRUCT = ("Mechanisms", "Chemical synthesis", "Acid-base chemistry",
                               "Chemical and physical properties", "Structural evaluation")

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, O, MECH, "The rate of an SN2 reaction depends on the concentration of what?",
      ["Both reactants", "Substrate only", "Nucleophile only", "Leaving group only"],
      "SN2 is one concerted step in which the nucleophile attacks as the leaving group departs, so both reactants, substrate "
      "and nucleophile, appear in the rate law. An SN1 rate depends on the substrate alone."),
    Q(1, 3, O, MECH, "(R)-2-Bromobutane reacts with sodium cyanide in DMSO. What is the configuration of the 2-methylbutanenitrile formed?",
      ["S, by inversion", "R, by retention", "A racemic mixture", "R, by inversion"],
      "A secondary halide with a good nucleophile in a polar aprotic solvent reacts by SN2, with backside attack and inversion. "
      "The cyano group takes the top priority that bromine held, so the inverted center is S."),
    Q(1, 1, O, SYN, "Propene reacts with HBr with no peroxides present. What is the major product?",
      ["2-Bromopropane", "1-Bromopropane", "1,2-Dibromopropane", "Propane"],
      "Protonation gives the more stable secondary carbocation, which bromide then attacks (Markovnikov addition). "
      "1-Bromopropane forms by the radical path when peroxides are present."),
    Q(1, 2, O, SYN, "Which reagents convert propene into 1-propanol?",
      ["BH₃·THF, then H₂O₂ and NaOH", "H₂O with catalytic H₂SO₄", "Hg(OAc)₂ in water, then NaBH₄", "HBr, then aqueous NaOH"],
      "Hydroboration-oxidation adds OH to the less substituted carbon (anti-Markovnikov). Acid-catalyzed hydration and "
      "oxymercuration both put OH on the middle carbon, giving 2-propanol, and HBr then hydroxide also leads there."),
    Q(1, 3, O, SYN, "2-Bromo-2-methylbutane is heated with potassium tert-butoxide. What is the major product?",
      ["2-Methyl-1-butene", "2-Methyl-2-butene", "2-Methyl-2-butanol", "2-tert-Butoxy-2-methylbutane"],
      "A bulky base removes the most accessible hydrogen, on the methyl group, giving the less substituted (Hofmann) alkene. "
      "A small base such as ethoxide favors the more substituted Zaitsev product, 2-methyl-2-butene."),
    Q(1, 1, O, STRUCT, "Which carbocation is the least stable?",
      ["Methyl", "Isopropyl", "Ethyl", "tert-Butyl"],
      "Carbocation stability rises with the number of alkyl groups on the positive carbon, which donate electron density by "
      "hyperconjugation and induction: tertiary > secondary > primary > methyl. The methyl cation has none."),
    Q(1, 1, O, SYN, "2-Butanone is treated with NaBH₄, then water. What is the product?",
      ["2-Butanol", "1-Butanol", "Butanoic acid", "2-Butene"],
      "Sodium borohydride delivers hydride to the carbonyl carbon, and workup protonates the alkoxide. A ketone is reduced to a "
      "secondary alcohol, so 2-butanone gives 2-butanol."),
    Q(1, 2, O, SYN, "Ethylmagnesium bromide reacts with carbon dioxide, and the mixture is then treated with aqueous acid. What is the product?",
      ["Propanoic acid", "Butanoic acid", "Propan-1-ol", "Acetic acid"],
      "The Grignard carbon attacks CO₂ to give a carboxylate, which acid protonates. The new acid has one more carbon than the "
      "Grignard reagent: two from the ethyl group plus one from CO₂."),
    Q(1, 2, O, AB, "Which compound is the strongest acid?",
      ["Cl₃CCOOH", "ClCH₂COOH", "CH₃COOH", "CH₃CH₂OH"],
      "Electronegative chlorines pull electron density away from the carboxylate and stabilize it by the inductive effect, so "
      "acidity rises with each Cl. Ethanol, with no resonance-stabilized base, is the weakest."),
    Q(1, 2, O, AB, "Which compound is the strongest base?",
      ["Methylamine", "Diphenylamine", "Acetamide", "Pyridine"],
      "Methylamine's lone pair is localized and pushed outward by the methyl group. In diphenylamine the lone pair is spread "
      "over two rings and in acetamide into the carbonyl, and pyridine holds its lone pair in a tighter sp² orbital."),
    Q(1, 3, O, STRUCT, "Which species is aromatic?",
      ["Cyclopentadienyl anion", "Cycloheptatrienyl anion", "Cyclopentadienyl cation", "Cyclooctatetraene"],
      "The cyclopentadienyl anion is cyclic, planar and fully conjugated with 6 π electrons, which fits Hückel's 4n + 2 rule. "
      "The cyclopentadienyl cation (4 π electrons) and cycloheptatrienyl anion (8) are antiaromatic, and cyclooctatetraene is not planar."),
    Q(1, 1, O, STRUCT, "What is the hybridization of each carbon atom in ethyne (HC≡CH)?",
      ["sp", "sp²", "sp³", "sp³d"],
      "Each carbon forms two σ bonds (one to H, one to C) and two π bonds, so it uses two hybrid orbitals: sp, with a 180° bond "
      "angle. sp² is the alkene carbon."),
    Q(1, 2, O, PROP, "An infrared spectrum shows a strong, sharp absorption near 1715 cm⁻¹. Which group does it indicate?",
      ["C=O", "O-H", "C≡C", "C-H"],
      "A strong band near 1700 to 1750 cm⁻¹ is the carbonyl stretch; 1715 cm⁻¹ is typical of a ketone. An alcohol O-H gives a "
      "broad band near 3200 to 3550 cm⁻¹."),
    Q(1, 2, O, STRUCT, "What is the IUPAC name of CH₃CH₂CH(CH₃)CH₂OH?",
      ["2-Methylbutan-1-ol", "3-Methylbutan-1-ol", "2-Ethylpropan-1-ol", "3-Methylbutan-2-ol"],
      "The longest chain holding the OH carbon has four carbons, numbered from the OH end, with a methyl on C2. 2-Ethylpropan-1-ol "
      "misses the longer chain through the ethyl group."),
    Q(1, 3, O, STRUCT, "How many stereoisomers does 2,3-dibromobutane have?",
      ["3", "4", "2", "1"],
      "Two stereocenters allow up to 2² = 4, but the two centers carry identical groups, so the (2R,3S) form has an internal "
      "mirror plane and is meso. That leaves one pair of enantiomers plus the meso form: 3.", chk=3),

    # ---------------- Practice Test 2 ----------------
    Q(2, 2, O, MECH, "Which conditions favor an SN1 reaction?",
      ["Tertiary halide, polar protic solvent", "Primary halide, polar aprotic solvent", "Methyl halide, strong nucleophile",
       "Primary halide, bulky strong base"],
      "SN1 goes through a carbocation, which forms best from a tertiary substrate and is stabilized by a polar protic solvent "
      "such as water or ethanol. Polar aprotic solvents and unhindered substrates favor SN2."),
    Q(2, 2, O, MECH, "On a reaction coordinate diagram for a two-step reaction, which step is rate-determining?",
      ["The one with the highest transition state", "The one with the most stable intermediate",
       "The one with the largest overall ΔH", "The one that comes first in time"],
      "The slowest step is the one that must climb to the highest-energy transition state on the diagram. An intermediate sits "
      "in a valley between the two transition states."),
    Q(2, 3, O, MECH, "Ethanol is protonated by H₃O⁺. In the curved-arrow mechanism, where does the arrow begin?",
      ["Ethanol's oxygen lone pair", "The O-H bond of ethanol", "A hydrogen of H₃O⁺", "The positive charge on H₃O⁺"],
      "Curved arrows start at electrons. Ethanol's oxygen lone pair attacks a hydrogen of hydronium, and a second arrow moves "
      "the O-H bonding pair of H₃O⁺ onto its oxygen, leaving water."),
    Q(2, 2, O, MECH, "1,3-Butadiene and ethene react by a Diels-Alder reaction. What is the product?",
      ["Cyclohexene", "Cyclohexane", "1,3-Cyclohexadiene", "Benzene"],
      "A diene and a dienophile join in one concerted [4+2] step, forming two new σ bonds and a six-membered ring. One π bond "
      "remains, between the old C2 and C3 of the diene, so the product is cyclohexene."),
    Q(2, 2, O, SYN, "Benzene is treated with acetyl chloride and AlCl₃. What is the product?",
      ["Acetophenone", "Toluene", "Benzaldehyde", "Phenyl acetate"],
      "Friedel-Crafts acylation: AlCl₃ makes an acylium ion that the ring attacks, giving the aryl ketone C₆H₅COCH₃. Phenyl "
      "acetate is an ester, which would need phenol."),
    Q(2, 2, O, SYN, "Toluene is nitrated with HNO₃ and H₂SO₄. Where does the nitro group mainly go?",
      ["Ortho and para", "Meta only", "Para only, no ortho", "On the methyl group"],
      "A methyl group donates electron density and stabilizes the carbocation intermediates of ortho and para attack, so it is "
      "an ortho, para director. Ortho and para products both form; para is favored somewhat by sterics."),
    Q(2, 1, O, SYN, "Ethyl acetate is heated with aqueous NaOH. What are the products?",
      ["Sodium acetate and ethanol", "Acetic acid and sodium ethoxide", "Acetaldehyde and ethanol", "Ethyl alcohol and CO₂"],
      "Saponification: hydroxide attacks the ester carbonyl and expels ethoxide, which takes the proton from the acid. In base "
      "the acid ends up as its carboxylate salt."),
    Q(2, 1, O, SYN, "A primary alcohol is oxidized with PCC in dichloromethane. What forms?",
      ["An aldehyde", "A carboxylic acid", "A ketone", "An alkene"],
      "PCC is a mild oxidant used without water, so oxidation stops at the aldehyde. Chromic acid in water would carry it on to "
      "the carboxylic acid; ketones come from secondary alcohols."),
    Q(2, 3, O, SYN, "Which order of steps makes 1-bromo-3-nitrobenzene from benzene?",
      ["Nitrate, then brominate", "Brominate, then nitrate", "Brominate, then reduce", "Nitrate, then reduce"],
      "The nitro group is a meta director, so nitrating first and then brominating puts Br meta to NO₂. Bromine is an ortho, "
      "para director, so brominating first would give mainly the ortho and para isomers."),
    Q(2, 2, O, SYN, "Two molecules of acetaldehyde react in dilute NaOH at room temperature. What is the product?",
      ["3-Hydroxybutanal", "But-2-enal (crotonaldehyde)", "Butanoic acid", "Ethyl acetate"],
      "In the aldol addition the enolate of one acetaldehyde attacks the carbonyl of another, giving a β-hydroxy aldehyde. "
      "Heating would dehydrate it to 2-butenal, the aldol condensation product."),
    Q(2, 3, O, SYN, "Sodium methoxide in methanol opens 2-methyloxirane. Where does methoxide attack?",
      ["The less substituted carbon", "The more substituted carbon", "The epoxide oxygen atom", "Each carbon equally often"],
      "Under basic conditions a strong nucleophile opens the epoxide by an SN2-like attack at the less hindered carbon. In acid "
      "the more substituted carbon is attacked, because it carries more positive charge."),
    Q(2, 2, O, AB, "Which base removes the proton of a terminal alkyne (pKa about 25) essentially completely?",
      ["NaNH₂", "NaOH", "NaHCO₃", "CH₃CO₂Na"],
      "An acid-base equilibrium favors the side with the weaker acid. NH₃ (pKa about 38) is far weaker than the alkyne, so amide "
      "deprotonates it fully; water (pKa about 15.7) is a stronger acid than the alkyne, so hydroxide cannot."),
    Q(2, 2, O, PROP, "Benzoic acid and naphthalene are dissolved in diethyl ether. Which wash moves the benzoic acid into the water layer?",
      ["Aqueous NaHCO₃", "Aqueous HCl", "Pure water", "Saturated NaCl"],
      "Bicarbonate deprotonates benzoic acid to sodium benzoate, an ionic salt that dissolves in water, while neutral "
      "naphthalene stays in the ether. Acid leaves benzoic acid neutral and in the organic layer."),
    Q(2, 2, O, PROP, "How many signals does ethyl acetate, CH₃COOCH₂CH₃, show in its ¹H NMR spectrum?",
      ["3", "2", "4", "5"],
      "There are three sets of equivalent hydrogens: the acetyl CH₃ (a singlet), the OCH₂ (a quartet) and the ethyl CH₃ (a "
      "triplet).", chk=3),
    Q(2, 3, O, STRUCT, "How are (2R,3S)-2-bromo-3-chlorobutane and (2S,3S)-2-bromo-3-chlorobutane related?",
      ["Diastereomers", "Enantiomers", "Identical", "Constitutional isomers"],
      "They differ at C2 but match at C3. Stereoisomers that are not mirror images are diastereomers; enantiomers would differ "
      "at every stereocenter, as (2R,3S) and (2S,3R) do."),

    # ---------------- Drill-only ----------------
    Q(0, 1, O, STRUCT, "Which conformation about the C2-C3 bond of butane is the most stable?",
      ["Anti", "Gauche", "Eclipsed", "Fully eclipsed"],
      "In the anti conformation the two methyl groups are 180° apart, so there is no steric strain between them. Gauche puts "
      "them 60° apart, and the eclipsed forms add torsional strain."),
    Q(0, 2, O, PROP, "A mixture is run on a silica gel TLC plate with hexane and ethyl acetate. Which compound has the lowest Rf?",
      ["Benzoic acid", "Ethylbenzene", "Benzaldehyde", "Methyl benzoate"],
      "Silica is polar, so the most polar compound sticks hardest and moves least. Benzoic acid hydrogen bonds to the silica; "
      "ethylbenzene, the least polar, runs nearly with the solvent front."),
    Q(0, 3, O, PROP, "How many signals does 1,4-dimethylbenzene (p-xylene) show in its ¹³C NMR spectrum?",
      ["3", "2", "4", "8"],
      "Symmetry makes the two methyl carbons equivalent, the two ring carbons bearing methyls equivalent, and the four ring CH "
      "carbons equivalent: 3 signals for 8 carbons.", chk=3),
    Q(0, 2, O, AB, "Why is phenol much more acidic than cyclohexanol?",
      ["Its anion is resonance-stabilized", "It hydrogen bonds more weakly", "Its molar mass is a little lower",
       "Its oxygen atom is sp³ hybridized"],
      "In phenoxide the negative charge spreads from oxygen into the ring by resonance, which stabilizes the base. The "
      "cyclohexoxide charge stays on one oxygen, so cyclohexanol (pKa about 16) is far weaker than phenol (about 10)."),
]
