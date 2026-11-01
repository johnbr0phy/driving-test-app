# Physics 2: electricity, magnetism, optics and modern physics (NEET units 11
# to 20: electrostatics, current electricity, magnetic effects, induction and
# AC, electromagnetic waves, optics, dual nature, atoms and nuclei,
# electronic devices). Key written first; numbers asserted below.
from math import isclose, pi, sqrt

# capacitors: two 3 uF in series (1.5) in parallel with a third (3)
assert isclose(1 / (1 / 3 + 1 / 3) + 3, 4.5)
# energy in 5 uF at 200 V (mJ); 1/2 CV (no square) = 0.5 mJ; CV = 1 mC
assert isclose(0.5 * 5e-6 * 200 ** 2 * 1e3, 100)
assert isclose(0.5 * 5e-6 * 200 * 1e3, 0.5) and isclose(5e-6 * 200 * 1e3, 1)
# terminal voltage: 4.5 V, r = 0.3, R = 1.2
assert isclose(4.5 / 1.5 * 1.2, 3.6)
# radius ratio deuteron/proton at equal kinetic energy: sqrt(m) ratio, same q
assert isclose(sqrt(2 * 2) / sqrt(2 * 1), sqrt(2))
# solenoid: n = 500 per m, I = 3 A
assert isclose(4 * pi * 1e-7 * 500 * 3, 6 * pi * 1e-4)
# lenses in contact: +20 cm and -40 cm
assert isclose(100 / 20 - 100 / 40, 2.5)
# photoelectric: 6.2 eV photon, 4.5 eV work function
assert isclose(6.2 - 4.5, 1.7)
# 6 || 3 then + 4, 12 V: current in the 3 ohm branch
I = 12 / (6 * 3 / 9 + 4)
assert isclose(I * 2 / 3, 4 / 3)
# shunt: Ig = 50 mA, G = 45, I = 0.5 A
assert isclose(0.05 * 45 / (0.5 - 0.05), 5)
# motional emf
assert isclose(0.25 * 0.6 * 3, 0.45)
# transformer
assert isclose(230 * 1000 / 50, 4600)
# half-life: 20 g, 15 days, T = 5 days
assert isclose(20 / 2 ** (15 / 5), 2.5)
# hydrogen n = 2
assert isclose(-13.6 / 4, -3.4)

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 2, "Coulomb's law", "Two point charges repel with a force F in air. They are moved to half their separation and placed in a medium of dielectric constant 4. What is the new force?",
      ["F", "4F", "F/4", "16F"],
      "Halving r multiplies the force by 4, and a medium of dielectric constant 4 divides it by 4, so the force is F again. 16F ignores the medium."),
    S(1, 2, "Capacitors", "Two 3 μF capacitors are joined in series, and the pair is connected in parallel with a third 3 μF capacitor. What is the equivalent capacitance?",
      ["4.5 μF", "2 μF", "9 μF", "1 μF"],
      "The series pair gives 3/2 = 1.5 μF; adding 3 μF in parallel gives 4.5 μF. 1 μF is all three in series, and 9 μF all three in parallel."),
    S(1, 2, "Energy in a capacitor", "A 5 μF capacitor is charged to 200 V. How much energy does it store?",
      ["100 mJ", "10 mJ", "1 mJ", "0.5 mJ"],
      "U = ½CV² = ½ × 5 × 10⁻⁶ × 40,000 = 0.1 J = 100 mJ. 10 mJ slips a power of ten, 1 mJ is the charge CV in millicoulombs, not an energy, and 0.5 mJ forgets to square V."),
    S(1, 2, "Internal resistance", "A cell of emf 4.5 V and internal resistance 0.3 Ω is connected across a 1.2 Ω resistor. What is the potential difference across the cell's terminals?",
      ["3.6 V", "4.5 V", "0.9 V", "5.4 V"],
      "I = 4.5/(1.2 + 0.3) = 3 A, so the terminal voltage is IR = 3 × 1.2 = 3.6 V. 0.9 V is the drop across the internal resistance, and 5.4 V adds that drop instead of subtracting it."),
    S(1, 3, "Resistance", "A wire of resistance R is drawn out uniformly until its radius is half the original. What is its new resistance?",
      ["16R", "4R", "8R", "2R"],
      "Halving the radius cuts the area to a quarter, and since the volume is fixed the length becomes 4 times. R = ρL/A rises by 4 × 4 = 16. 4R counts only the change in area."),
    S(1, 3, "Motion in a magnetic field", "A proton and a deuteron with the same kinetic energy enter the same uniform magnetic field at right angles to it. What is the ratio of the radius of the deuteron's path to that of the proton?",
      ["√2", "2", "1", "1/√2"],
      "r = mv/(qB) = √(2mK)/(qB). Both carry charge e, and the deuteron has twice the mass, so its radius is √2 times larger. 2 would be the ratio at equal speeds."),
    S(1, 2, "Solenoid", "A long solenoid has 500 turns per metre and carries a current of 3 A. What is the magnetic field inside it? (μ₀ = 4π × 10⁻⁷ T m/A)",
      ["6π × 10⁻⁴ T", "3π × 10⁻⁴ T", "6π × 10⁻⁷ T", "12π × 10⁻⁴ T"],
      "B = μ₀nI = 4π × 10⁻⁷ × 500 × 3 = 6π × 10⁻⁴ T, about 1.9 mT. 3π × 10⁻⁴ T is the field at either end of the solenoid, half the value inside."),
    L(1, 2, "Lenz's law", "Assertion (A): A strong magnet dropped down a long vertical copper tube falls with an acceleration less than g.\n\nReason (R): The changing flux induces eddy currents in the tube that oppose the magnet's motion.\n\nChoose the correct answer:",
      AR, 0,
      "Both are true and R explains A. By Lenz's law the eddy currents set up a field that opposes the change, so they brake the falling magnet; copper is not magnetic, so without induction it would fall freely."),
    S(1, 2, "AC circuits", "In a series LCR circuit at resonance, what is the phase difference between the current and the applied voltage?",
      ["Zero", "π/2", "π", "π/4"],
      "At resonance X(L) = X(C), so the reactances cancel, the impedance equals R and the current is in phase with the voltage. The power factor is 1."),
    S(1, 2, "Lenses", "A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 40 cm. What is the power of the combination?",
      ["+2.5 D", "+7.5 D", "-2.5 D", "+5 D"],
      "P = 100/f(cm): +5 D for the convex lens and -2.5 D for the concave lens. In contact the powers add: +2.5 D. +7.5 D forgets the concave lens is negative."),
    S(1, 2, "Interference", "Why must the two slits in Young's experiment be lit from one single source rather than two separate lamps?",
      ["So their phase difference stays fixed", "So both slits are equally bright", "So the light has one wavelength", "So the fringes are wider"],
      "A sustained interference pattern needs coherent sources, whose phase difference does not change with time. Two independent lamps change phase randomly, so the fringes would wash out."),
    S(1, 2, "Photoelectric effect", "Photons of energy 6.2 eV fall on a metal whose work function is 4.5 eV. What is the stopping potential?",
      ["1.7 V", "4.5 V", "6.2 V", "10.7 V"],
      "The maximum kinetic energy of the photoelectrons is 6.2 - 4.5 = 1.7 eV, so a retarding potential of 1.7 V stops them. 10.7 V adds the work function instead of subtracting it."),
    # ---------- Practice Test 2 ----------
    S(2, 2, "Electric dipole", "In which orientation does an electric dipole in a uniform electric field have the least potential energy?",
      ["Along the field", "Against the field", "At 90° to the field", "At 45° to the field"],
      "U = -pE cos θ, which is least (-pE) at θ = 0, with the dipole moment along the field. That is the stable equilibrium; at 180° the energy is greatest."),
    S(2, 2, "Gauss's law", "A closed surface encloses an electric dipole made of charges +q and -q. What is the net electric flux through the surface?",
      ["Zero", "q/ε₀", "2q/ε₀", "q/2ε₀"],
      "By Gauss's law the flux depends only on the net charge enclosed, which is +q - q = 0. Field lines leave from +q and the same number end on -q inside."),
    L(2, 2, "Electrostatics of conductors", "Statement I: Electric field lines cross an equipotential surface at right angles.\n\nStatement II: Two different equipotential surfaces can intersect each other.\n\nChoose the correct answer:",
      ST, 2,
      "Statement I is true: a field component along the surface would do work moving a charge between points at the same potential. Statement II is false: at a crossing point the field would have two directions, one normal to each surface, which is impossible."),
    S(2, 3, "Drift velocity", "A steady current flows through a copper wire. At a point where the wire's diameter is half as large, the drift velocity of the electrons is:",
      ["4 times", "2 times", "Half", "Unchanged"],
      "I = neAv(d) is the same everywhere along the wire. Halving the diameter cuts the area to a quarter, so the drift velocity rises 4 times."),
    S(2, 2, "Circuits", "A 6 Ω and a 3 Ω resistor in parallel are connected in series with a 4 Ω resistor across a 12 V battery of negligible internal resistance. What current flows through the 3 Ω resistor?",
      ["4/3 A", "6 A", "2 A", "4 A"],
      "The parallel pair is 2 Ω, so the total is 6 Ω and the battery current is 2 A. The pair has 4 V across it, so the 3 Ω resistor carries 4/3 A and the 6 Ω carries 2/3 A. 6 A leaves out the 4 Ω resistor."),
    S(2, 3, "Electric power", "A 100 W and a 40 W bulb, both rated for 220 V, are connected in series across a 220 V supply. Which glows brighter?",
      ["The 40 W bulb", "The 100 W bulb", "Both equally", "Neither lights"],
      "R = V²/P, so the 40 W bulb has the larger resistance (1210 Ω against 484 Ω). In series both carry the same current, and P = I²R is larger in the bigger resistance, so the 40 W bulb glows brighter."),
    S(2, 1, "Magnetic materials", "Which of these substances is diamagnetic?",
      ["Bismuth", "Aluminium", "Nickel", "Platinum"],
      "Bismuth has a small negative susceptibility and is weakly repelled by a magnet. Aluminium and platinum are paramagnetic, and nickel is ferromagnetic."),
    S(2, 3, "Galvanometer to ammeter", "A galvanometer of resistance 45 Ω gives full-scale deflection at 50 mA. How is it converted to an ammeter reading up to 0.5 A?",
      ["5 Ω in parallel", "5 Ω in series", "45 Ω in parallel", "4.5 Ω in series"],
      "A shunt S in parallel carries the extra current: S = I(g)G/(I - I(g)) = 0.05 × 45 / 0.45 = 5 Ω. A resistance in series would make a voltmeter instead."),
    S(2, 2, "Motional emf", "A rod 0.6 m long moves at 3 m/s through a uniform magnetic field of 0.25 T, with the rod, its velocity and the field all mutually perpendicular. What emf is induced across its ends?",
      ["0.45 V", "0.9 V", "1.8 V", "0.15 V"],
      "ε = Blv = 0.25 × 0.6 × 3 = 0.45 V. 0.9 V doubles the length, 0.15 V leaves out the speed, and 1.8 V leaves out the field."),
    S(2, 2, "Transformer", "An ideal transformer has 50 turns in its primary and 1000 in its secondary. The primary is connected to 230 V AC. What is the secondary voltage?",
      ["4600 V", "11.5 V", "2300 V", "460 V"],
      "V(s)/V(p) = N(s)/N(p) = 20, so V(s) = 230 × 20 = 4600 V. 11.5 V uses the turns ratio upside down."),
    S(2, 1, "Electromagnetic waves", "Which electromagnetic waves are produced when fast electrons are suddenly stopped by a metal target?",
      ["X-rays", "Gamma rays", "Ultraviolet rays", "Microwaves"],
      "Rapidly decelerated electrons radiate X-rays, as in an X-ray tube. Gamma rays come from changes inside atomic nuclei."),
    S(2, 2, "Rectifiers", "A full-wave rectifier is fed from a 50 Hz AC supply. What is the fundamental frequency of the ripple in its output?",
      ["100 Hz", "50 Hz", "25 Hz", "200 Hz"],
      "A full-wave rectifier passes both half-cycles, giving two output pulses per input cycle, so the ripple is at 2 × 50 = 100 Hz. A half-wave rectifier would give 50 Hz."),
    # ---------- Drill only ----------
    S(0, 2, "Radioactivity", "A radioactive isotope has a half-life of 5 days. How much of a 20 g sample remains undecayed after 15 days?",
      ["2.5 g", "5 g", "10 g", "6.67 g"],
      "15 days is three half-lives, so 20 × (½)³ = 2.5 g remains. 10 g is after one half-life, and 6.67 g divides 20 by 3, treating the decay as linear."),
    S(0, 2, "Logic gates", "Which logic gate is called a universal gate because any other gate can be built from it alone?",
      ["NAND", "OR", "AND", "XOR"],
      "NAND (and also NOR) can be combined to make NOT, AND, OR and every other gate. AND, OR and XOR cannot make NOT on their own."),
    S(0, 2, "Bohr model", "The energy of the electron in the ground state of hydrogen is -13.6 eV. What is its energy in the n = 2 state?",
      ["-3.4 eV", "-13.6 eV", "-6.8 eV", "-27.2 eV"],
      "E(n) = -13.6/n² eV, so E(2) = -13.6/4 = -3.4 eV. -6.8 eV divides by n instead of n², and -27.2 eV multiplies by n."),
]
