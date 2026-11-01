# Physics: electrostatics, current electricity, magnetic effects of current
# and magnetism, electromagnetic induction and alternating currents, and
# electromagnetic waves (JEE (Main) 2027 syllabus units 11 to 15). Key written
# first; numerical value answers are computed here and asserted by N().
from math import sqrt, pi

# Field zero between +4 and +1 microcoulomb, 30 cm apart: 4/x^2 = 1/(30-x)^2.
assert 4 / 20**2 == 1 / 10**2
# 2, 3 and 6 microfarad in series on 12 V.
assert abs(1 / (1 / 2 + 1 / 3 + 1 / 6) - 1.0) < 1e-12
# Bulbs in series.
_r100, _r25 = 220**2 / 100, 220**2 / 25
_i = 220 / (_r100 + _r25)

ITEMS = [
    # ---------- Practice Test 1: Section A ----------
    S(1, 2, "Electric field", "Point charges of $+4\\ \\mu$C and $+1\\ \\mu$C are 30 cm apart. Where on the line between them is the electric field zero?",
      ["20 cm from the 4 $\\mu$C charge", "10 cm from the 4 $\\mu$C charge", "15 cm from each charge", "24 cm from the 4 $\\mu$C charge"],
      "The fields cancel where $\\frac{4}{x^2} = \\frac{1}{(30 - x)^2}$, so $\\frac{x}{30 - x} = 2$ and $x = 20$ cm from the larger charge. The null point is always nearer the smaller charge; 24 cm uses the ratio 4 instead of its square root 2."),
    S(1, 1, "Capacitors", "Capacitors of 2, 3 and 6 $\\mu$F are joined in series across a 12 V battery. What charge does each one hold?",
      ["12 $\\mu$C", "6 $\\mu$C", "24 $\\mu$C", "132 $\\mu$C"],
      "$\\frac{1}{C} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = 1$, so $C = 1\\ \\mu$F and $Q = CV = 12\\ \\mu$C, the same on each capacitor in series. 132 $\\mu$C uses the parallel value $11\\ \\mu$F."),
    S(1, 2, "Gauss's law", "A point charge $q$ sits at one corner of a cube. What is the total electric flux through the cube's six faces?",
      ["$\\frac{q}{8\\varepsilon_0}$", "$\\frac{q}{\\varepsilon_0}$", "$\\frac{q}{6\\varepsilon_0}$", "$\\frac{q}{24\\varepsilon_0}$"],
      "Eight such cubes meeting at the corner would enclose the charge completely and share $\\frac{q}{\\varepsilon_0}$ equally, so one cube gets $\\frac{q}{8\\varepsilon_0}$. The three faces that meet at the charge carry no flux, and each of the other three carries $\\frac{q}{24\\varepsilon_0}$."),
    S(1, 1, "Internal resistance", "A cell of emf 9 V and internal resistance 0.5 $\\Omega$ is connected across a 4 $\\Omega$ resistor. What is the terminal voltage?",
      ["8 V", "1 V", "4.5 V", "9 V"],
      "$I = \\frac{9}{4 + 0.5} = 2$ A, so $V = E - Ir = 9 - 1 = 8$ V, which is also $IR = 2 \\times 4$. 1 V is the drop inside the cell, and 9 V is the emf, the terminal voltage only when no current flows."),
    S(1, 1, "Magnetic field of a wire", "A long straight wire carries a current of 10 A. What is the magnetic field 5 cm from it? ($\\mu_0 = 4\\pi \\times 10^{-7}$ T m/A)",
      ["$4 \\times 10^{-5}$ T", "$2 \\times 10^{-5}$ T", "$4\\pi \\times 10^{-5}$ T", "$8 \\times 10^{-5}$ T"],
      "$B = \\frac{\\mu_0 I}{2\\pi r} = \\frac{2 \\times 10^{-7} \\times 10}{0.05} = 4 \\times 10^{-5}$ T. $4\\pi \\times 10^{-5}$ T uses the loop formula $\\frac{\\mu_0 I}{2r}$ by mistake."),
    S(1, 1, "Lenz's law", "The south pole of a bar magnet, held close to one face of a closed coil, is pulled away from it. What does that face of the coil become while the magnet moves?",
      ["A north pole, attracting the magnet", "A south pole, repelling the magnet", "A south pole, attracting the magnet", "No pole, as there is no iron core"],
      "By Lenz's law the induced current opposes the change that causes it, here the retreat of a south pole, so the near face becomes a north pole and pulls on the magnet, opposing its removal. Work done against that pull is what appears as electrical energy."),
    # ---------- Practice Test 1: Section B ----------
    N(1, 2, "Combinations of resistors", "A uniform wire of resistance 16 $\\Omega$ is bent into a circle. What is the resistance, in ohms, between two points that divide the circumference in the ratio 1 : 3?",
      round(1 / (1 / 4 + 1 / 12)), 3,
      "The two arcs are 4 $\\Omega$ and 12 $\\Omega$, in parallel between the points: $\\frac{4 \\times 12}{4 + 12} = 3\\ \\Omega$."),
    N(1, 2, "Alternating current", "A series LCR circuit has $L = 0.5$ H and $C = 8\\ \\mu$F. What is its resonant angular frequency, in rad/s?",
      round(1 / sqrt(0.5 * 8e-6)), 500,
      "$\\omega_0 = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{0.5 \\times 8 \\times 10^{-6}}} = \\frac{1}{\\sqrt{4 \\times 10^{-6}}} = \\frac{1}{2 \\times 10^{-3}} = 500$ rad/s. The resistance does not affect it."),
    # ---------- Practice Test 2: Section A ----------
    S(2, 2, "Electric potential", "The potential along the $x$-axis is $V = 4x^2$ volts ($x$ in metres). What is the electric field at $x = 1$ m?",
      ["8 V/m along $-x$", "8 V/m along $+x$", "4 V/m along $-x$", "4 V/m along $+x$"],
      "$E = -\\frac{dV}{dx} = -8x$, which is $-8$ V/m at $x = 1$: 8 V/m pointing along $-x$, towards falling potential. 4 V/m is the potential itself, not its gradient."),
    S(2, 2, "Dielectrics", "A capacitor storing energy $U$ stays connected to its battery while a slab of dielectric constant $K$ is slid in to fill the gap. What is the stored energy now?",
      ["$KU$", "$\\frac{U}{K}$", "$U$", "$K^2U$"],
      "The battery holds $V$ fixed while $C$ becomes $KC$, so $U = \\frac{1}{2}CV^2$ rises to $KU$; the battery supplies the extra charge. $\\frac{U}{K}$ is the result when the battery is disconnected first, fixing $Q$."),
    S(2, 2, "Resistance", "A wire is stretched uniformly until it is 20% longer. By what percentage does its resistance increase?",
      ["44%", "20%", "22%", "40%"],
      "The volume is fixed, so the area falls by the same factor the length rises: $R \\propto L^2$, and $1.2^2 = 1.44$, a 44% increase. 40% is the small-change estimate $2 \\times 20\\%$, which is not accurate for so large a stretch."),
    S(2, 3, "Motion in a magnetic field", "A proton and an alpha particle with equal kinetic energies move at right angles to the same uniform magnetic field. What is the ratio of the radius of the proton's path to that of the alpha particle's?",
      ["1 : 1", "1 : 2", "2 : 1", "1 : 4"],
      "$r = \\frac{mv}{qB} = \\frac{\\sqrt{2mK}}{qB}$. The alpha particle has 4 times the mass and 2 times the charge: $\\frac{\\sqrt{4}}{2} = 1$, so the radii are equal. 1 : 2 is the answer for equal speeds."),
    S(2, 3, "Galvanometer", "A galvanometer of resistance 50 $\\Omega$ gives full-scale deflection at 5 mA. How is it made into an ammeter reading up to 1 A?",
      ["About 0.25 $\\Omega$ in parallel", "About 0.25 $\\Omega$ in series", "About 200 $\\Omega$ in series", "About 4 $\\Omega$ in parallel"],
      "A shunt in parallel carries the excess: $S = \\frac{I_gG}{I - I_g} = \\frac{0.005 \\times 50}{0.995} \\approx 0.25\\ \\Omega$. A large resistance in series would make it a voltmeter instead."),
    S(2, 2, "Electromagnetic waves", "In an electromagnetic wave travelling in a vacuum, what is the ratio of the electric field amplitude $E_0$ to the magnetic field amplitude $B_0$?",
      ["$c$", "$\\frac{1}{c}$", "$c^2$", "$1$"],
      "In a plane electromagnetic wave $E_0 = cB_0$, so $\\frac{E_0}{B_0} = c = 3 \\times 10^8$ m/s. The fields are in phase and at right angles to each other and to the direction of travel."),
    # ---------- Practice Test 2: Section B ----------
    N(2, 1, "Self-induction", "The current in a coil of self-inductance 0.4 H falls steadily from 10 A to 2 A in 0.1 s. What is the size of the induced emf, in volts?",
      round(0.4 * (10 - 2) / 0.1), 32,
      "$|e| = L\\frac{\\Delta I}{\\Delta t} = 0.4 \\times \\frac{8}{0.1} = 32$ V."),
    N(2, 3, "Electric power", "Bulbs rated 100 W, 220 V and 25 W, 220 V are joined in series across a 220 V supply. What power, in watts, does the 25 W bulb use?",
      round(_i**2 * _r25), 16,
      "$R = \\frac{V^2}{P}$ gives 484 $\\Omega$ and 1936 $\\Omega$. The current is $\\frac{220}{2420} = \\frac{1}{11}$ A, so the 25 W bulb uses $\\frac{1936}{121} = 16$ W, more than the 100 W bulb's 4 W."),
    # ---------- Drill only ----------
    S(0, 2, "Electric dipole", "How much work is needed to turn an electric dipole of moment $p$ in a uniform field $E$ from lying along the field to pointing against it?",
      ["$2pE$", "$pE$", "$0$", "$4pE$"],
      "$U = -pE\\cos\\theta$ goes from $-pE$ at $0^\\circ$ to $+pE$ at $180^\\circ$, so the work needed is $2pE$. $pE$ is the work to turn it only to $90^\\circ$."),
    S(0, 2, "Metre bridge", "In a metre bridge, an unknown resistance $X$ is in the left gap and 6 $\\Omega$ in the right gap. The balance point is 40 cm from the left end. What is $X$?",
      ["4 $\\Omega$", "2.4 $\\Omega$", "6 $\\Omega$", "9 $\\Omega$"],
      "At balance $\\frac{X}{6} = \\frac{40}{60}$, so $X = 4\\ \\Omega$. 9 $\\Omega$ puts the lengths the wrong way round."),
    S(0, 1, "Alternating current", "An alternating current is $i = 10\\sin\\omega t$ amperes. What is its rms value?",
      ["$5\\sqrt{2}$ A", "10 A", "5 A", "$10\\sqrt{2}$ A"],
      "$I_{rms} = \\frac{I_0}{\\sqrt{2}} = \\frac{10}{\\sqrt{2}} = 5\\sqrt{2} \\approx 7.07$ A. 5 A halves the peak instead of dividing it by $\\sqrt{2}$."),
    S(0, 2, "Conductors", "Statement I: The electric field inside a charged hollow conducting sphere is zero. Statement II: The electric potential inside a charged hollow conducting sphere is zero. Which is correct?",
      [STATEMENTS[2], STATEMENTS[0], STATEMENTS[1], STATEMENTS[3]],
      "There is no charge inside, so $E = 0$ there. With $E = 0$ the potential is constant inside, equal to its surface value $\\frac{kQ}{R}$, which is not zero."),
    N(0, 1, "Energy in a capacitor", "A 10 $\\mu$F capacitor is charged to 40 V. How much energy does it store, in millijoules?",
      round(0.5 * 10e-6 * 40**2 * 1000), 8,
      "$U = \\frac{1}{2}CV^2 = \\frac{1}{2} \\times 10 \\times 10^{-6} \\times 1600 = 8 \\times 10^{-3}$ J $= 8$ mJ."),
    N(0, 1, "Force on a conductor", "A straight wire 0.8 m long carries 5 A at right angles to a uniform magnetic field of 0.5 T. What force, in newtons, acts on it?",
      round(5 * 0.8 * 0.5), 2,
      "$F = BIL\\sin 90^\\circ = 0.5 \\times 5 \\times 0.8 = 2$ N."),
]
