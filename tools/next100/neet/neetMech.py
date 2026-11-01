# Physics 1: mechanics, properties of matter, heat and waves (NEET units 1 to
# 10: measurement, kinematics, laws of motion, work and energy, rotation,
# gravitation, solids and liquids, thermodynamics, kinetic theory,
# oscillations and waves). Key written first; numbers asserted below.
from math import sqrt, isclose

# projectile: u = 25 m/s at 53 degrees (sin 0.8), time of flight
assert isclose(2 * 25 * 0.8 / 10, 4.0)
# two blocks pulled by 20 N: tension in the string to the 3 kg block
assert isclose(3 * 20 / (5 + 3), 7.5)
# escape speed, radius x1/2, density x2: v proportional to R sqrt(rho)
assert round(11.2 * 0.5 * sqrt(2), 1) == 7.9
# Carnot refrigerator: 250 K inside, 300 K outside
assert isclose(250 / (300 - 250), 5) and round(250 / 300, 2) == 0.83
# spring: k = 100, m = 1, A = 0.05 -> vmax = A w
assert isclose(0.05 * sqrt(100 / 1), 0.5)
# closed pipe 25 cm, v = 340: second overtone = 5 v / 4L
assert isclose(5 * 340 / (4 * 0.25), 1700)
# braking from 72 km/h in 40 m
assert isclose(20 ** 2 / (2 * 40), 5)
# river crossing: 5 and 3 km/h, 1 km wide, straight across
assert isclose(1 / sqrt(5 ** 2 - 3 ** 2) * 60, 15)
# banking: v = 30, r = 90
assert isclose(30 ** 2 / (90 * 10), 1)  # tan 45
# inelastic: 2 kg at 6 m/s onto 4 kg at rest
assert isclose(0.5 * 2 * 36 - 0.5 * 6 * (12 / 6) ** 2, 24)
# limiting friction: 2 kg crate, mu_s = 0.4
assert isclose(0.4 * 2 * 10, 8)
# motor: 40 kg up 15 m in 25 s
assert isclose(40 * 10 * 15 / 25, 240)
# weight 72 N at height R/2
assert isclose(72 / 1.5 ** 2, 32)
# wire: F 100 N, L 2 m, A 1 mm2, Y 2e11
assert isclose(100 * 2 / (1e-6 * 2e11), 1e-3)
# centre of mass: 2 kg at 0, 6 kg at 4 m
assert isclose((2 * 0 + 6 * 4) / 8, 3)

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 1, "Units and dimensions", "What is the dimensional formula of the coefficient of viscosity?",
      ["[ML⁻¹T⁻¹]", "[MLT⁻²]", "[ML²T⁻¹]", "[M⁻¹L⁻¹T]"],
      "From F = ηA(dv/dx), η = F/(A × dv/dx) = [MLT⁻²]/([L²][T⁻¹]) = [ML⁻¹T⁻¹]. [MLT⁻²] is force itself."),
    S(1, 2, "Projectile motion", "A ball is thrown at 25 m/s at 53° above the horizontal. Taking g = 10 m/s² and sin 53° = 0.8, what is its time of flight?",
      ["4 s", "5 s", "3 s", "2 s"],
      "T = 2u sin θ / g = 2 × 25 × 0.8 / 10 = 4 s. 5 s forgets the sin θ, 3 s uses cos 53° = 0.6, and 2 s drops the factor of 2."),
    S(1, 2, "Laws of motion", "A 5 kg block and a 3 kg block are joined by a light string on a smooth floor. A 20 N horizontal force pulls the 5 kg block, which tows the 3 kg block behind it. What is the tension in the string?",
      ["7.5 N", "12.5 N", "20 N", "10 N"],
      "Both blocks share a = 20/8 = 2.5 m/s². The string only has to accelerate the 3 kg block, so T = 3 × 2.5 = 7.5 N. 12.5 N is the net force on the 5 kg block, and 10 N splits the pull equally."),
    S(1, 2, "Friction", "A 2 kg crate rests on a level floor. The coefficient of static friction between them is 0.4. What is the least horizontal push that just starts it moving? (g = 10 m/s²)",
      ["8 N", "20 N", "10 N", "16 N"],
      "Limiting friction is μs N = μs mg = 0.4 × 2 × 10 = 8 N, so a push just over 8 N starts the crate. 20 N is the crate's weight, 16 N doubles the friction, and 10 N would need μs = 0.5."),
    S(1, 2, "Work and energy", "The kinetic energy of a body increases by a factor of 4 while its mass stays the same. By what factor does its linear momentum change?",
      ["2", "4", "16", "√2"],
      "p = √(2mK), so p grows as the square root of K: √4 = 2. 16 squares the factor instead of taking its root."),
    S(1, 3, "Rotational motion", "What is the moment of inertia of a uniform solid sphere of mass M and radius R about a tangent to its surface?",
      ["7/5 MR²", "2/5 MR²", "2/3 MR²", "3/2 MR²"],
      "About a diameter I = 2/5 MR². By the parallel axis theorem, about a tangent I = 2/5 MR² + MR² = 7/5 MR². 2/3 MR² is a thin spherical shell about a diameter."),
    S(1, 3, "Gravitation", "A planet has half the radius of the Earth and twice its density. If the escape speed from the Earth is 11.2 km/s, what is it from this planet? (√2 ≈ 1.41)",
      ["7.9 km/s", "11.2 km/s", "5.6 km/s", "15.8 km/s"],
      "v = √(2GM/R) with M = (4/3)πR³ρ, so v is proportional to R√ρ. Here v = 11.2 × ½ × √2 ≈ 7.9 km/s. 5.6 km/s ignores the change in density."),
    L(1, 2, "Satellites", "Statement I: A geostationary satellite orbits the Earth from west to east.\n\nStatement II: The orbital period of a geostationary satellite equals the Earth's period of rotation.\n\nChoose the correct answer:",
      ST, 0,
      "Both are true. A geostationary satellite must turn in the same sense as the Earth (west to east) in the equatorial plane, with a period of one sidereal day, so it stays over one point."),
    S(1, 2, "Fluids", "Small raindrops fall at a terminal velocity given by Stokes' law. If a drop's radius is doubled, its terminal velocity becomes:",
      ["4 times", "2 times", "8 times", "Half"],
      "v = 2r²(ρ - σ)g / 9η, so terminal velocity is proportional to r². Doubling r gives 2² = 4 times. 8 times would follow the weight, which goes as r³."),
    S(1, 3, "Refrigerators", "A Carnot refrigerator keeps its interior at -23 °C in a room at 27 °C. What is its coefficient of performance?",
      ["5", "0.83", "0.2", "1.2"],
      "β = T₂/(T₁ - T₂) = 250/(300 - 250) = 5, using kelvin. 0.83 is T₂/T₁, 1.2 is T₁/T₂, and 0.2 inverts the correct ratio."),
    S(1, 2, "Kinetic theory", "The rms speed of the molecules of a gas at 300 K is v. What is it at 1200 K?",
      ["2v", "4v", "√2 v", "v/2"],
      "v(rms) = √(3RT/M), so it is proportional to √T. The temperature rises four times, so the speed doubles. 4v forgets the square root."),
    S(1, 2, "Simple harmonic motion", "A 1 kg mass on a spring of force constant 100 N/m oscillates with an amplitude of 5 cm. What is its maximum speed?",
      ["0.5 m/s", "5 m/s", "0.05 m/s", "50 m/s"],
      "ω = √(k/m) = 10 rad/s, and v(max) = Aω = 0.05 × 10 = 0.5 m/s. 5 m/s uses 5 cm as 0.5 m."),
    S(1, 3, "Sound waves", "A pipe 25 cm long is closed at one end. The speed of sound is 340 m/s. What is the frequency of its second overtone?",
      ["1700 Hz", "1020 Hz", "680 Hz", "1360 Hz"],
      "A closed pipe has only odd harmonics: f₁ = v/4L = 340 Hz, and the overtones are 3f₁ and 5f₁. The second overtone is 5 × 340 = 1700 Hz; 1020 Hz is the first overtone."),
    # ---------- Practice Test 2 ----------
    S(2, 2, "Units and dimensions", "Which pair of quantities has the same dimensions?",
      ["Work and torque", "Impulse and force", "Pressure and energy", "Power and momentum"],
      "Both work and torque are force times distance, [ML²T⁻²], though torque is not measured in joules. Impulse is force times time, so it has an extra [T]."),
    S(2, 2, "Kinematics", "A car moving at 72 km/h brakes uniformly and stops in 40 m. What is the magnitude of its deceleration?",
      ["5 m/s²", "10 m/s²", "64.8 m/s²", "129.6 m/s²"],
      "72 km/h = 20 m/s. From v² = u² - 2as, a = 20²/(2 × 40) = 5 m/s². 10 m/s² drops the 2, and 64.8 comes from leaving the speed in km/h."),
    S(2, 3, "Relative velocity", "A boat moves at 5 km/h in still water. It crosses a river 1 km wide, flowing at 3 km/h, along the straight line joining the two banks. How long does the crossing take?",
      ["15 min", "12 min", "20 min", "7.5 min"],
      "To go straight across, the boat heads upstream so its velocity across the river is √(5² - 3²) = 4 km/h. Time = 1/4 h = 15 min. 12 min uses 5 km/h as the speed across."),
    S(2, 2, "Circular motion", "A curve of radius 90 m is to be banked so that cars at 30 m/s need no friction. Taking g = 10 m/s², what is the angle of banking?",
      ["45°", "30°", "37°", "26.6°"],
      "tan θ = v²/(rg) = 900/900 = 1, so θ = 45°. 26.6° comes from tan θ = 0.5, which doubles r or g by mistake."),
    S(2, 2, "Collisions", "A 2 kg ball moving at 6 m/s strikes a 4 kg ball at rest, and the two stick together. How much kinetic energy is lost?",
      ["24 J", "12 J", "36 J", "18 J"],
      "Momentum: 12 = 6v, so v = 2 m/s. KE before = ½ × 2 × 36 = 36 J; after = ½ × 6 × 4 = 12 J. The loss is 24 J; 12 J is the energy left."),
    S(2, 1, "Power", "A motor lifts a 40 kg load through 15 m in 25 s at a steady speed. Taking g = 10 m/s², what power does it deliver?",
      ["240 W", "480 W", "2400 W", "6000 W"],
      "P = mgh/t = 40 × 10 × 15 / 25 = 240 W. 6000 W is the work done in joules, not divided by the time, and 2400 W slips a power of ten."),
    S(2, 3, "Angular momentum", "A skater spinning with arms out pulls them in, halving her moment of inertia. No external torque acts. What happens to her rotational kinetic energy?",
      ["It doubles", "It halves", "It stays the same", "It becomes four times"],
      "L = Iω is conserved, so ω doubles. KE = L²/2I, and with L fixed and I halved the energy doubles. The extra energy comes from the work her muscles do."),
    S(2, 2, "Gravitation", "A body weighs 72 N on the Earth's surface. What will it weigh at a height of R/2 above the surface, where R is the Earth's radius?",
      ["32 N", "36 N", "48 N", "72 N"],
      "g' = g × R²/(R + h)² = g/(1.5)² = 4g/9. The weight is 72 × 4/9 = 32 N. 48 N uses 1/r instead of 1/r², 36 N simply halves the weight, and 72 N ignores the height."),
    S(2, 2, "Elasticity", "A steel wire 2 m long with a cross-section of 1 mm² carries a load of 100 N. Young's modulus of steel is 2 × 10¹¹ N/m². By how much does it stretch?",
      ["1 mm", "0.5 mm", "2 mm", "10 mm"],
      "Δl = FL/(AY) = 100 × 2 / (10⁻⁶ × 2 × 10¹¹) = 10⁻³ m = 1 mm. 0.5 mm forgets the 2 m length."),
    S(2, 2, "Thermal radiation", "The absolute temperature of a black body is doubled. By what factor does the power it radiates change?",
      ["16 times", "4 times", "8 times", "2 times"],
      "Stefan-Boltzmann law: P = σAT⁴, so doubling T gives 2⁴ = 16 times. 4 times would be a T² law."),
    L(2, 2, "Thermodynamic processes", "Statement I: In an isothermal expansion of an ideal gas, the internal energy of the gas does not change.\n\nStatement II: In an adiabatic expansion of an ideal gas, the temperature of the gas stays constant.\n\nChoose the correct answer:",
      ST, 2,
      "The internal energy of an ideal gas depends only on temperature, so it is unchanged in an isothermal process. In an adiabatic expansion no heat enters, so the gas does work from its internal energy and cools."),
    S(2, 2, "Degrees of freedom", "How many degrees of freedom does a rigid diatomic gas molecule have at room temperature?",
      ["5", "3", "6", "7"],
      "It has 3 translational and 2 rotational degrees of freedom; rotation about the bond axis and vibration do not count at room temperature. 7 adds the two vibrational modes that appear at high temperature."),
    S(2, 3, "Beats", "A tuning fork of unknown frequency gives 4 beats per second with a 256 Hz fork. When the unknown fork is loaded with a little wax, the beats rise to 6 per second. What was its original frequency?",
      ["252 Hz", "260 Hz", "250 Hz", "262 Hz"],
      "The unknown fork is 252 or 260 Hz. Wax lowers its frequency: from 260 Hz the beats would fall, from 252 Hz they rise. So it was 252 Hz."),
    # ---------- Drill only ----------
    S(0, 3, "Vertical circle", "A stone tied to a string of length R is whirled in a vertical circle. What is the least speed it must have at the lowest point for the string to stay taut all the way round?",
      ["√(5gR)", "√(gR)", "√(3gR)", "√(2gR)"],
      "At the top the least speed is √(gR), when gravity alone provides the centripetal force. Energy conservation over a height 2R gives v² = gR + 4gR, so v = √(5gR) at the bottom."),
    S(0, 1, "Centre of mass", "A 2 kg particle is at x = 0 and a 6 kg particle is at x = 4 m. Where is their centre of mass?",
      ["x = 3 m", "x = 2 m", "x = 1 m", "x = 2.67 m"],
      "x = (2 × 0 + 6 × 4)/8 = 24/8 = 3 m, closer to the heavier particle. x = 1 m measures from the heavy particle by mistake."),
    L(0, 2, "Surface tension", "Statement I: Water rises higher in a narrow capillary tube than in a wide one.\n\nStatement II: The height of capillary rise is inversely proportional to the radius of the tube.\n\nChoose the correct answer:",
      ST, 0,
      "Both are true. Jurin's law, h = 2T cos θ/(rρg), gives h proportional to 1/r, which is why the narrower tube shows the greater rise."),
]
