# Survey of the Natural Sciences: General Chemistry. Original items.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None, locked=False, chk=None)
# Per test 15 across the ADA's General Chemistry topics; drill-only 4.

G = "datGenChem"
STO, GAS, LIQ, SOL, AB, EQ, THERMO, KIN, REDOX, ATOM, PER, NUC, LAB = (
    "Stoichiometry", "Gases", "Liquids and solids", "Solutions", "Acids and bases", "Chemical equilibria",
    "Thermodynamics and thermochemistry", "Chemical kinetics", "Oxidation-reduction", "Atomic and molecular structure",
    "Periodic properties", "Nuclear reactions", "Laboratory")

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, G, STO, "How many moles of water are in 9.0 g of H₂O (molar mass 18 g/mol)?",
      ["0.50 mol", "2.0 mol", "0.25 mol", "9.0 mol"],
      "Moles = mass / molar mass = 9.0 g / 18 g/mol = 0.50 mol. 2.0 mol comes from dividing the wrong way.", chk=0.5),
    Q(1, 2, G, STO, "A compound is 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. What is its empirical formula?",
      ["CH₂O", "CHO", "C₂H₄O", "CH₃O"],
      "In 100 g: 40.0/12 = 3.33 mol C, 6.7/1.0 = 6.7 mol H, 53.3/16 = 3.33 mol O. Dividing by 3.33 gives 1 : 2 : 1, so CH₂O."),
    Q(1, 2, G, STO, "When C₃H₈ + O₂ → CO₂ + H₂O is balanced with the smallest whole numbers, what is the coefficient of O₂?",
      ["5", "3", "4", "7"],
      "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. The products hold 3 × 2 + 4 × 1 = 10 oxygen atoms, which is 5 O₂.", chk=5),
    Q(1, 2, G, GAS, "The pressure on a sample of ideal gas is doubled while its kelvin temperature is also doubled. What happens to its volume?",
      ["It is unchanged", "It doubles in size", "It falls by half", "It grows fourfold"],
      "V = nRT/P. Doubling T doubles V and doubling P halves it, so the two cancel and the volume is unchanged."),
    Q(1, 2, G, GAS, "A tank holds 2.0 mol of N₂ and 1.0 mol of O₂ at a total pressure of 900 torr. What is the partial pressure of O₂?",
      ["300 torr", "450 torr", "600 torr", "900 torr"],
      "By Dalton's law the partial pressure is the mole fraction times the total: (1.0 / 3.0) × 900 = 300 torr. 600 torr is the "
      "partial pressure of N₂.", chk=300),
    Q(1, 1, G, LIQ, "Which substance has the highest normal boiling point?",
      ["H₂O", "H₂S", "CH₄", "Ne"],
      "Water molecules hydrogen bond to one another, which takes far more energy to overcome than the dipole forces in H₂S or "
      "the dispersion forces in CH₄ and Ne."),
    Q(1, 2, G, SOL, "Which 0.10 m aqueous solution has the lowest freezing point?",
      ["CaCl₂", "NaCl", "Glucose", "KBr"],
      "Freezing point depression is proportional to the number of dissolved particles. CaCl₂ gives three ions per formula "
      "unit, NaCl and KBr two, and glucose one."),
    Q(1, 1, G, AB, "What is the pH of 0.010 M HCl?",
      ["2", "1", "10", "12"],
      "HCl is a strong acid, so [H⁺] = 0.010 M = 10⁻² M and pH = 2. pH 12 is the value for 0.010 M NaOH.", chk=2),
    Q(1, 2, G, AB, "Which of these is a weak acid in water?",
      ["HF", "HCl", "HBr", "HNO₃"],
      "HF ionizes only partly because the H-F bond is strong and F⁻ is small and tightly holds the proton. HCl, HBr and HNO₃ "
      "are strong acids that ionize completely."),
    Q(1, 2, G, EQ, "For N₂ + 3 H₂ ⇌ 2 NH₃, the forward reaction is exothermic. What happens when the temperature is raised?",
      ["Shifts left; K falls", "Shifts right; K rises", "Shifts left; K is unchanged", "No shift; K rises"],
      "Heat acts as a product of an exothermic reaction, so adding heat shifts the equilibrium left. Unlike pressure or "
      "concentration changes, a temperature change alters K itself, and here K falls."),
    Q(1, 2, G, THERMO, "Under which conditions is a reaction spontaneous at every temperature?",
      ["ΔH < 0 and ΔS > 0", "ΔH > 0 and ΔS > 0", "ΔH < 0 and ΔS < 0", "ΔH > 0 and ΔS < 0"],
      "ΔG = ΔH - TΔS. With ΔH negative and ΔS positive, both terms make ΔG negative at any temperature. With matching signs, "
      "spontaneity depends on temperature."),
    Q(1, 2, G, KIN, "A reaction has the rate law rate = k[A]². If [A] is doubled, by what factor does the rate change?",
      ["4", "2", "8", "1"],
      "The rate depends on [A] squared, so doubling [A] multiplies the rate by 2² = 4. A first-order reaction would double.", chk=4),
    Q(1, 2, G, REDOX, "What is the oxidation number of manganese in KMnO₄?",
      ["+7", "+5", "+6", "+4"],
      "K is +1 and four O atoms are -8, so Mn must be +7 for a neutral compound: +1 + Mn - 8 = 0.", chk=7),
    Q(1, 3, G, ATOM, "What is the ground-state electron configuration of Fe²⁺ (iron is element 26)?",
      ["[Ar] 3d⁶", "[Ar] 4s² 3d⁴", "[Ar] 4s² 3d⁶", "[Ar] 4s¹ 3d⁵"],
      "Neutral iron is [Ar] 4s² 3d⁶. Transition metals lose their 4s electrons first, so Fe²⁺ is [Ar] 3d⁶, not [Ar] 4s² 3d⁴."),
    Q(1, 2, G, NUC, "Carbon-14 undergoes beta-minus decay. What nucleus is formed?",
      ["Nitrogen-14", "Boron-14", "Carbon-13", "Nitrogen-15"],
      "In beta-minus decay a neutron becomes a proton and an electron is emitted, so the atomic number rises by 1 (C to N) and "
      "the mass number stays 14."),

    # ---------------- Practice Test 2 ----------------
    Q(2, 1, G, STO, "What is the mass percent of oxygen in CO₂ (C = 12, O = 16)?",
      ["72.7%", "36.4%", "66.7%", "27.3%"],
      "CO₂ has a molar mass of 44 g/mol, 32 g of it oxygen: 32 / 44 = 72.7%. 66.7% is the mole fraction of O atoms, not the "
      "mass fraction.", chk=72.7),
    Q(2, 3, G, STO, "4.0 g of H₂ reacts with 16 g of O₂ by 2 H₂ + O₂ → 2 H₂O. What is the greatest mass of water that can form?",
      ["18 g", "36 g", "20 g", "32 g"],
      "4.0 g H₂ is 2.0 mol and 16 g O₂ is 0.50 mol. O₂ is limiting: 0.50 mol O₂ gives 1.0 mol H₂O, which is 18 g. 36 g assumes "
      "all the hydrogen reacts.", chk=18),
    Q(2, 1, G, GAS, "What volume does 0.50 mol of an ideal gas occupy at STP (0 °C and 1 atm)?",
      ["11.2 L", "22.4 L", "5.6 L", "44.8 L"],
      "One mole of ideal gas fills 22.4 L at STP, so 0.50 mol fills 11.2 L.", chk=11.2),
    Q(2, 2, G, GAS, "At the same temperature, which gas has the highest average molecular speed?",
      ["H₂", "O₂", "CO₂", "Cl₂"],
      "Every gas at one temperature has the same average kinetic energy, so the lightest molecules move fastest. H₂ (2 g/mol) "
      "is far lighter than O₂, CO₂ or Cl₂."),
    Q(2, 2, G, LIQ, "A liquid's vapor pressure equals the external pressure at which temperature?",
      ["Its boiling point", "Its melting point", "Its triple point", "Its critical point"],
      "A liquid boils when its vapor pressure reaches the pressure above it, which is why water boils below 100 °C at high "
      "altitude."),
    Q(2, 2, G, ATOM, "What is the molecular geometry of NH₃?",
      ["Trigonal pyramidal", "Trigonal planar", "Tetrahedral", "Trigonal bipyramidal"],
      "Nitrogen has three bonds and one lone pair: four electron domains arranged tetrahedrally, but the shape of the atoms "
      "alone is trigonal pyramidal. Trigonal planar has no lone pair, as in BF₃."),
    Q(2, 2, G, SOL, "4.0 g of NaOH (molar mass 40 g/mol) is dissolved in water to make 250 mL of solution. What is the molarity?",
      ["0.40 M", "0.10 M", "0.016 M", "1.6 M"],
      "4.0 g is 0.10 mol, and 0.10 mol / 0.250 L = 0.40 M. 0.10 M forgets to divide by the volume in liters.", chk=0.4),
    Q(2, 2, G, AB, "What is the conjugate base of H₂PO₄⁻?",
      ["HPO₄²⁻", "H₃PO₄", "PO₄³⁻", "HPO₃²⁻"],
      "A conjugate base has one fewer proton: H₂PO₄⁻ minus H⁺ is HPO₄²⁻. H₃PO₄ is its conjugate acid."),
    Q(2, 2, G, AB, "A buffer contains equal concentrations of acetic acid (pKa 4.76) and sodium acetate. What is its pH?",
      ["4.76", "7.00", "9.24", "2.38"],
      "By the Henderson-Hasselbalch equation, pH = pKa + log([A⁻]/[HA]). With equal concentrations the log term is 0, so pH = "
      "pKa = 4.76.", chk=4.76),
    Q(2, 2, G, EQ, "Solid NaCl is added to a saturated solution of AgCl. What happens to the solubility of AgCl?",
      ["It decreases", "It increases", "It stays the same", "It doubles"],
      "Added Cl⁻ is a common ion: it pushes AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left, so less AgCl dissolves. Ksp is unchanged."),
    Q(2, 3, G, THERMO, "For A → B, ΔH = -100 kJ. What is ΔH for 2 B → 2 A?",
      ["+200 kJ", "-200 kJ", "+100 kJ", "-50 kJ"],
      "Reversing a reaction changes the sign of ΔH (+100 kJ), and doubling it doubles ΔH, giving +200 kJ.", chk=200),
    Q(2, 2, G, KIN, "A first-order reaction has a half-life of 10 minutes. What fraction of the reactant remains after 30 minutes?",
      ["1/8", "1/3", "1/6", "1/4"],
      "30 minutes is three half-lives: 1/2 × 1/2 × 1/2 = 1/8. 1/3 would assume the amount falls in equal steps.", chk=0.125),
    Q(2, 1, G, REDOX, "In a galvanic cell, where does oxidation take place?",
      ["At the anode", "At the cathode", "In the salt bridge", "In the voltmeter"],
      "Oxidation happens at the anode and reduction at the cathode in every electrochemical cell. The salt bridge only lets ions "
      "flow to keep each half-cell neutral."),
    Q(2, 2, G, PER, "Which element has the highest first ionization energy?",
      ["Neon", "Chlorine", "Sodium", "Magnesium"],
      "Ionization energy rises across a period, and neon's full valence shell holds its electrons most tightly. Sodium, at the "
      "far left, has the lowest."),
    Q(2, 2, G, LAB, "How many milliliters of a 2.0 M stock solution are needed to make 100 mL of a 0.50 M solution?",
      ["25 mL", "400 mL", "100 mL", "50 mL"],
      "M₁V₁ = M₂V₂: 2.0 × V₁ = 0.50 × 100, so V₁ = 25 mL, then dilute to 100 mL. Inverting the ratio (2.0 × 100 / 0.50) gives 400 mL, more than the final volume.", chk=25),

    # ---------------- Drill-only ----------------
    Q(0, 2, G, KIN, "What does a catalyst change in a reaction?",
      ["The activation energy", "The enthalpy change", "The equilibrium constant", "The products formed"],
      "A catalyst offers a path with a lower activation energy, so equilibrium is reached faster. ΔH and K are unchanged, "
      "because the reactants and products are the same."),
    Q(0, 2, G, ATOM, "What is the greatest number of electrons that the n = 3 shell can hold?",
      ["18", "8", "9", "32"],
      "A shell holds 2n² electrons: 2 × 3² = 18 (3s, 3p and 3d). 8 is the count of the 3s and 3p subshells alone, and 32 is "
      "n = 4.", chk=18),
    Q(0, 1, G, GAS, "2.0 L of gas at 1.0 atm is compressed to 0.50 L at constant temperature. What is the new pressure?",
      ["4.0 atm", "0.25 atm", "2.0 atm", "1.0 atm"],
      "By Boyle's law P₁V₁ = P₂V₂: 1.0 × 2.0 = P₂ × 0.50, so P₂ = 4.0 atm.", chk=4.0),
    Q(0, 2, G, LAB, "A balance reads every mass 0.20 g too high. What kind of error is this, and what does it affect?",
      ["Systematic; accuracy", "Random; precision", "Random; accuracy", "Systematic; precision"],
      "An error in the same direction every time is systematic and moves results away from the true value (accuracy). The "
      "readings can still agree closely with each other, so precision is unaffected."),
]
