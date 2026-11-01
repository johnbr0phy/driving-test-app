# Chemistry 1: physical chemistry (NEET units 1 to 8: basic concepts, atomic
# structure, bonding, thermodynamics, solutions, equilibrium, redox and
# electrochemistry, kinetics). Key written first; numbers asserted below.
from math import isclose

# 4.4 g CO2 -> mol of O atoms
assert isclose(4.4 / 44 * 2, 0.2)
# pOH 3 -> pH 11
assert 14 - 3 == 11
# Daniell cell
assert isclose(0.34 - (-0.76), 1.10)
# first order, 75 percent = two half-lives of 30 min
assert 2 * 30 == 60
# 4 g NaOH in 250 mL
assert isclose(4 / 40 / 0.250, 0.4)
# Hess: C -> CO
assert isclose(-393.5 - (-283.0), -110.5)
# glucose 18 g in 178.2 g water, P0 = 760
x = (18 / 180) / (18 / 180 + 178.2 / 18)
assert isclose(760 * (1 - x), 752.4)
# rate = k[A][B]^2; A x2, B x3
assert 2 * 3 ** 2 == 18
# oxidation number of N in NH2OH
assert -(2 * 1 - 2 + 1) == -1

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 1, "Mole concept", "How many moles of oxygen atoms are present in 4.4 g of carbon dioxide? (C = 12, O = 16)",
      ["0.2", "0.1", "0.4", "2"],
      "4.4 g of CO₂ is 4.4/44 = 0.1 mol of molecules, and each molecule has two O atoms, so 0.2 mol of O atoms. 0.1 counts molecules, not atoms."),
    S(1, 2, "Quantum numbers", "How many electrons in an atom can have the quantum numbers n = 3, l = 1 and mₗ = 0?",
      ["2", "6", "3", "10"],
      "n, l and mₗ together fix one orbital (one of the three 3p orbitals), and an orbital holds 2 electrons of opposite spin. 3 is the number of 3p orbitals and 6 the whole 3p subshell."),
    S(1, 3, "Molecular orbital theory", "According to molecular orbital theory, which of these species is paramagnetic?",
      ["O₂", "N₂", "CO", "CN⁻"],
      "O₂ has two unpaired electrons in its degenerate π* orbitals, which is why liquid oxygen is attracted to a magnet. N₂, CO and CN⁻ are isoelectronic with 14 electrons, all paired."),
    S(1, 2, "Spontaneity", "A reaction has a positive ΔH and a positive ΔS. When is it spontaneous?",
      ["Only at high temperature", "Only at low temperature", "At every temperature", "At no temperature"],
      "ΔG = ΔH - TΔS. With both positive, ΔG becomes negative only when TΔS exceeds ΔH, that is, above a certain temperature. The low-temperature case fits negative ΔH with negative ΔS."),
    S(1, 3, "Colligative properties", "Acetic acid dissolved in benzene forms dimers through hydrogen bonding. What is its van't Hoff factor, i, if association is nearly complete?",
      ["About 0.5", "About 2", "Exactly 1", "About 3"],
      "Two molecules join into one particle, so the number of particles is about halved and i ≈ 0.5. The observed molar mass is about twice the true value of 60. In water, acetic acid ionises slightly and i is a little above 1."),
    S(1, 1, "pH", "What is the pH of a 10⁻³ M aqueous solution of NaOH at 25 °C?",
      ["11", "3", "13", "10"],
      "[OH⁻] = 10⁻³ M, so pOH = 3 and pH = 14 - 3 = 11. 3 is the pOH, or the pH of 10⁻³ M HCl."),
    L(1, 2, "Le Chatelier's principle", "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0:\n\nStatement I: Adding a catalyst increases the equilibrium yield of ammonia.\n\nStatement II: Increasing the pressure favours the formation of ammonia.\n\nChoose the correct answer:",
      ST, 3,
      "A catalyst speeds up the forward and backward reactions equally, so equilibrium is reached sooner but the yield is unchanged. Higher pressure favours the side with fewer gas moles (2 against 4), so Statement II is true."),
    S(1, 2, "Electrochemical cells", "E° for Zn²⁺/Zn is -0.76 V and for Cu²⁺/Cu is +0.34 V. What is the standard emf of the Daniell cell?",
      ["1.10 V", "0.42 V", "-1.10 V", "0.76 V"],
      "E°cell = E°cathode - E°anode = 0.34 - (-0.76) = 1.10 V, with copper as the cathode. 0.42 V adds the two potentials, -0.76 + 0.34, and drops the sign."),
    S(1, 2, "First-order kinetics", "A first-order reaction has a half-life of 30 minutes. How long does it take to reach 75% completion?",
      ["60 min", "45 min", "90 min", "120 min"],
      "75% complete means 25% remains, which is two half-lives: 2 × 30 = 60 min. 45 min treats the reaction as zero order, scaling time with the fraction used."),
    # ---------- Practice Test 2 ----------
    S(2, 1, "Molarity", "4 g of NaOH is dissolved in water and the solution is made up to 250 mL. What is its molarity? (Na = 23, O = 16, H = 1)",
      ["0.4 M", "0.1 M", "0.04 M", "0.016 M"],
      "4 g is 4/40 = 0.1 mol, in 0.250 L: 0.1/0.25 = 0.4 M. 0.1 M is the number of moles, not divided by the volume, and 0.04 M divides by 2.5 L."),
    S(2, 2, "Hydrogen spectrum", "Which electron transition in a hydrogen atom emits a line of the Balmer series?",
      ["n = 4 to n = 2", "n = 4 to n = 1", "n = 4 to n = 3", "n = 2 to n = 4"],
      "Balmer lines end on n = 2 and lie in the visible region. Transitions to n = 1 are Lyman (ultraviolet), to n = 3 Paschen, and 2 to 4 is an absorption."),
    S(2, 2, "VSEPR theory", "Which of these molecules has a see-saw shape?",
      ["SF₄", "XeF₄", "CH₄", "BrF₃"],
      "SF₄ has four bond pairs and one lone pair around sulphur; the lone pair takes an equatorial position, giving a see-saw. XeF₄ (two lone pairs) is square planar and BrF₃ is T-shaped."),
    S(2, 3, "Hess's law", "ΔH for C(s) + O₂(g) → CO₂(g) is -393.5 kJ mol⁻¹, and for CO(g) + ½O₂(g) → CO₂(g) it is -283.0 kJ mol⁻¹. What is ΔH for C(s) + ½O₂(g) → CO(g)?",
      ["-110.5 kJ mol⁻¹", "-676.5 kJ mol⁻¹", "+110.5 kJ mol⁻¹", "-283.0 kJ mol⁻¹"],
      "Subtract the second equation from the first: -393.5 - (-283.0) = -110.5 kJ mol⁻¹. -676.5 adds the two equations instead."),
    S(2, 3, "Raoult's law", "18 g of glucose (molar mass 180) is dissolved in 178.2 g of water at 100 °C, where pure water's vapour pressure is 760 mm Hg. What is the vapour pressure of the solution?",
      ["752.4 mm Hg", "7.6 mm Hg", "684.0 mm Hg", "767.6 mm Hg"],
      "Moles: glucose 0.1, water 9.9, so the solute's mole fraction is 0.01. The lowering is 760 × 0.01 = 7.6 mm Hg, leaving 752.4 mm Hg. 7.6 is the lowering itself."),
    S(2, 1, "Buffers", "Which of these mixtures in water acts as a buffer?",
      ["CH₃COOH and CH₃COONa", "HCl and NaCl", "NaOH and NaCl", "HNO₃ and NaNO₃"],
      "A buffer needs a weak acid with its salt (or a weak base with its salt). Acetic acid and sodium acetate qualify; the others pair a strong acid or base with its salt."),
    S(2, 2, "Oxidation number", "What is the oxidation number of nitrogen in hydroxylamine, NH₂OH?",
      ["-1", "+1", "-3", "+3"],
      "With H as +1 and O as -2: x + 2(+1) + (-2) + (+1) = 0, so x = -1. -3 is nitrogen's state in ammonia."),
    S(2, 2, "Rate law", "The rate law of a reaction is rate = k[A][B]². By what factor does the rate change if [A] is doubled and [B] is tripled?",
      ["18 times", "12 times", "6 times", "36 times"],
      "The new rate is k(2[A])(3[B])² = 2 × 9 = 18 times the old one. 6 times ignores the square on [B], and 36 times squares [A] as well."),
    S(2, 2, "Rate constant", "What is the unit of the rate constant of a second-order reaction?",
      ["L mol⁻¹ s⁻¹", "mol L⁻¹ s⁻¹", "s⁻¹", "L² mol⁻² s⁻¹"],
      "For order n the unit is (mol L⁻¹)¹⁻ⁿ s⁻¹; with n = 2 that is L mol⁻¹ s⁻¹. mol L⁻¹ s⁻¹ is zero order and s⁻¹ is first order."),
    # ---------- Drill only ----------
    S(0, 2, "Avogadro number", "How many oxygen atoms are present in 0.5 mol of ozone, O₃? (Nₐ = 6.02 × 10²³ mol⁻¹)",
      ["9.03 × 10²³", "3.01 × 10²³", "6.02 × 10²³", "1.81 × 10²⁴"],
      "0.5 mol of O₃ is 0.5 × 6.02 × 10²³ = 3.01 × 10²³ molecules, each with 3 atoms: 9.03 × 10²³ atoms. 3.01 × 10²³ counts molecules."),
    L(0, 2, "Entropy and free energy", "Statement I: The entropy of a system increases when ice melts.\n\nStatement II: For a reaction at equilibrium at constant temperature and pressure, ΔG = 0.\n\nChoose the correct answer:",
      ST, 0,
      "Both are true. Liquid water is more disordered than ice, so melting raises the entropy, and at equilibrium there is no further driving force, so ΔG = 0."),
    S(0, 2, "Faraday's laws", "How much charge is needed to deposit 1 mol of copper metal from a solution of Cu²⁺ ions?",
      ["2 F", "1 F", "0.5 F", "4 F"],
      "Cu²⁺ + 2e⁻ → Cu, so each mole of copper needs 2 mol of electrons, that is 2 faradays (about 193,000 C)."),
    S(0, 2, "Effect of temperature", "Why does a small rise in temperature greatly increase the rate of most reactions?",
      ["More molecules exceed the activation energy", "The activation energy itself falls", "The equilibrium constant rises", "The reaction becomes more exothermic"],
      "At a higher temperature the Maxwell-Boltzmann distribution shifts, and the fraction of collisions with energy above Eₐ rises sharply. Eₐ itself does not change unless a catalyst is used."),
]
