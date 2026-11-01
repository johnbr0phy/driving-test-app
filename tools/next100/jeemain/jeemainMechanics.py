# Physics: units and measurements, kinematics, laws of motion, work energy
# and power, rotational motion, gravitation, properties of solids and liquids,
# and oscillations (JEE (Main) 2027 syllabus units 1 to 7 and 10). Take
# g = 10 m/s^2 unless stated. Key written first; numerical value answers are
# computed here and asserted by N().
from math import sqrt, sin, radians

g = 10
# Projectile, Test 1: 40 m/s at 30 degrees.
assert round(40**2 * sin(radians(30))**2 / (2 * g)) == 20
# Atwood machine, 3 kg and 2 kg.
assert 2 * 3 * 2 * g / (3 + 2) == 24
# Explosion, Test 2.
assert 0.5 * 1 * 12**2 + 0.5 * 2 * 6**2 == 108

ITEMS = [
    # ---------- Practice Test 1: Section A ----------
    S(1, 1, "Dimensions", "What are the dimensions of Planck's constant $h$?",
      ["$[ML^2T^{-1}]$", "$[ML^2T^{-2}]$", "$[MLT^{-1}]$", "$[ML^2T^{-3}]$"],
      "$E = h\\nu$, so $h = \\frac{E}{\\nu}$ has dimensions $\\frac{[ML^2T^{-2}]}{[T^{-1}]} = [ML^2T^{-1}]$, the same as angular momentum. $[ML^2T^{-2}]$ is energy itself."),
    S(1, 2, "Errors in measurement", "$P = \\dfrac{a^2b^3}{c}$, and $a$, $b$ and $c$ are measured with errors of 1%, 2% and 3%. What is the largest possible percentage error in $P$?",
      ["11%", "5%", "6%", "8%"],
      "Relative errors add, each multiplied by its power: $2(1\\%) + 3(2\\%) + 1(3\\%) = 11\\%$. Dividing by $c$ still adds its error; subtracting it gives 5%, and ignoring the powers gives 6%."),
    S(1, 1, "Projectile motion", "A ball is thrown at $30^\\circ$ above the horizontal at 40 m/s. What is its greatest height?",
      ["20 m", "40 m", "60 m", "80 m"],
      "$H = \\frac{u^2\\sin^2\\theta}{2g} = \\frac{1600 \\times \\frac{1}{4}}{20} = 20$ m. Using $\\cos^2\\theta$ gives 60 m, and leaving out the 2 in $2g$ gives 40 m."),
    S(1, 2, "Laws of motion", "Masses of 3 kg and 2 kg hang from the ends of a light string over a smooth, light pulley. What is the tension in the string?",
      ["24 N", "20 N", "25 N", "30 N"],
      "$a = \\frac{(3 - 2)g}{5} = 2$ m/s$^2$. For the 2 kg mass, $T - 20 = 2 \\times 2$, so $T = 24$ N, between the two weights of 20 N and 30 N as it must be."),
    S(1, 1, "Friction", "What is the least coefficient of static friction that lets a block rest on a rough plane inclined at $30^\\circ$?",
      ["$\\frac{1}{\\sqrt{3}}$", "$\\sqrt{3}$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$"],
      "The block stays put when $\\mu mg\\cos\\theta \\geq mg\\sin\\theta$, so $\\mu \\geq \\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$. $\\frac{1}{2}$ is $\\sin 30^\\circ$ alone."),
    S(1, 2, "Work by a variable force", "A force $F = 3x^2$ newtons acts along the $x$-axis. How much work does it do as the body moves from $x = 0$ to $x = 2$ m?",
      ["8 J", "4 J", "12 J", "24 J"],
      "$W = \\int_0^2 3x^2\\,dx = [x^3]_0^2 = 8$ J. 24 J multiplies the final force of 12 N by the 2 m, treating the force as constant."),
    S(1, 2, "Rolling motion", "A uniform disc rolls without slipping on a level floor. What fraction of its kinetic energy is rotational?",
      ["1/3", "2/7", "1/2", "2/3"],
      "$K_{rot} = \\frac{1}{2} \\cdot \\frac{1}{2}mr^2\\omega^2 = \\frac{1}{4}mv^2$ and $K_{total} = \\frac{1}{2}mv^2 + \\frac{1}{4}mv^2 = \\frac{3}{4}mv^2$, so the fraction is $\\frac{1}{3}$. 1/2 is the value for a ring, 2/7 for a solid sphere, and 2/3 is the disc's translational share."),
    S(1, 2, "Escape speed", "A planet has the same mass as Earth but half its radius. Earth's escape speed is 11.2 km/s. What is the planet's?",
      ["15.8 km/s", "7.9 km/s", "11.2 km/s", "22.4 km/s"],
      "$v_e = \\sqrt{\\frac{2GM}{R}}$, so halving $R$ at the same $M$ multiplies it by $\\sqrt{2}$: $11.2 \\times 1.414 \\approx 15.8$ km/s. 22.4 km/s doubles it, forgetting the square root, and 7.9 km/s divides by $\\sqrt{2}$."),
    # ---------- Practice Test 1: Section B ----------
    N(1, 2, "Conservation of momentum", "A 50 g bullet moving at 200 m/s embeds itself in a 950 g block at rest on a smooth table. At what speed, in m/s, does the block move off?",
      round(0.050 * 200 / (0.050 + 0.950)), 10,
      "Momentum is conserved in the impact: $0.05 \\times 200 = (0.05 + 0.95)v$, so $v = 10$ m/s. Kinetic energy is not conserved, since the collision is perfectly inelastic."),
    N(1, 2, "Simple harmonic motion", "A 0.2 kg block on a spring of force constant 80 N/m oscillates with amplitude 3 cm. What is its greatest speed, in cm/s?",
      round(3 * sqrt(80 / 0.2)), 60,
      "$\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{400} = 20$ rad/s, and $v_{max} = A\\omega = 3 \\times 20 = 60$ cm/s, reached at the mean position."),
    # ---------- Practice Test 2: Section A ----------
    S(2, 1, "Relative velocity", "Rain falls vertically at 6 m/s. A cyclist rides horizontally at 8 m/s. At what speed does the rain hit the cyclist, relative to the cyclist?",
      ["10 m/s", "2 m/s", "8 m/s", "14 m/s"],
      "$\\vec{v}_{rain/cyclist} = \\vec{v}_{rain} - \\vec{v}_{cyclist}$; the two are at right angles, so its size is $\\sqrt{6^2 + 8^2} = 10$ m/s. 14 and 2 m/s add or subtract the speeds as if they were in a line."),
    S(2, 2, "Kinematics", "A particle moves along a line with $x = t^3 - 6t^2 + 9t$ (in metres, $t$ in seconds). What is its acceleration the first time it is momentarily at rest?",
      ["-6 m/s²", "-12 m/s²", "0 m/s²", "6 m/s²"],
      "$v = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$ is first zero at $t = 1$ s. $a = 6t - 12 = -6$ m/s$^2$ then. At the second stop, $t = 3$ s, it is $+6$ m/s$^2$."),
    S(2, 2, "Circular motion", "A curve of radius 90 m is banked at $45^\\circ$. At what speed can a car take it with no friction needed?",
      ["30 m/s", "15 m/s", "25 m/s", "90 m/s"],
      "Without friction, $\\tan\\theta = \\frac{v^2}{rg}$, so $v = \\sqrt{rg\\tan\\theta} = \\sqrt{90 \\times 10 \\times 1} = 30$ m/s. Using $\\sin 45^\\circ$ in place of $\\tan 45^\\circ$ gives about 25 m/s."),
    S(2, 2, "Explosions", "A 3 kg shell at rest bursts into pieces of 1 kg and 2 kg. The 1 kg piece flies off at 12 m/s. How much kinetic energy does the burst release?",
      ["108 J", "36 J", "54 J", "72 J"],
      "Momentum stays zero, so the 2 kg piece moves at 6 m/s the other way. Energy released $= \\frac{1}{2}(1)(12^2) + \\frac{1}{2}(2)(6^2) = 72 + 36 = 108$ J. 72 J counts the small piece only."),
    S(2, 2, "Angular momentum", "A disc spins freely about its axis. An identical disc, not rotating, is dropped gently onto it along the same axis, and the two turn together. What fraction of the original kinetic energy is lost?",
      ["One half", "None of it", "One quarter", "Three quarters"],
      "No outside torque acts, so $L = I\\omega$ is conserved: $I\\omega = 2I\\omega'$ and $\\omega' = \\frac{\\omega}{2}$. The new energy is $\\frac{1}{2}(2I)\\left(\\frac{\\omega}{2}\\right)^2 = \\frac{1}{2} \\cdot \\frac{1}{2}I\\omega^2$, half the old, so one half is lost to friction between the discs. Three quarters assumes $\\omega$ halves while $I$ stays the same."),
    S(2, 2, "Acceleration due to gravity", "At what height above Earth's surface does $g$ fall to one ninth of its surface value? ($R$ is Earth's radius.)",
      ["$2R$", "$3R$", "$\\frac{R}{3}$", "$8R$"],
      "$g' = g\\frac{R^2}{(R + h)^2} = \\frac{g}{9}$ needs $R + h = 3R$, so $h = 2R$. $3R$ is the distance from Earth's centre, not the height above the surface."),
    S(2, 3, "Viscosity", "Two identical raindrops falling at terminal speed $v$ merge into one drop. What is the terminal speed of the new drop?",
      ["$2^{2/3}v$", "$2v$", "$2^{1/3}v$", "$4v$"],
      "Volume doubles, so the radius becomes $2^{1/3}r$. Terminal speed is proportional to $r^2$ (Stokes' law), so it becomes $2^{2/3}v$, about $1.59v$."),
    S(2, 2, "Elasticity", "A wire is stretched by a load. A second wire of the same material has twice the length and twice the radius and carries the same load. How does its extension compare?",
      ["Half as much", "The same", "Twice as much", "A quarter as much"],
      "Extension $\\Delta L = \\frac{FL}{AY}$ is proportional to $\\frac{L}{r^2}$, here $\\frac{2}{4} = \\frac{1}{2}$. A quarter forgets that the length also doubled."),
    # ---------- Practice Test 2: Section B ----------
    N(2, 1, "Power", "A pump lifts 600 kg of water through a height of 20 m in one minute. What is its power output, in watts?",
      round(600 * g * 20 / 60), 2000,
      "$P = \\frac{mgh}{t} = \\frac{600 \\times 10 \\times 20}{60} = 2000$ W."),
    N(2, 2, "Simple pendulum", "The length of a simple pendulum is increased by 44%. By what percentage does its period increase?",
      round((sqrt(1.44) - 1) * 100), 20,
      "$T \\propto \\sqrt{L}$, so the new period is $\\sqrt{1.44}\\,T = 1.2T$, an increase of 20%. The small-error rule $\\frac{1}{2} \\times 44\\% = 22\\%$ is only approximate for a change this large."),
    # ---------- Drill only ----------
    S(0, 1, "Apparent weight", "A 50 kg person stands on a scale in a lift that accelerates upwards at 2 m/s$^2$. What does the scale read?",
      ["600 N", "400 N", "500 N", "700 N"],
      "$N - mg = ma$, so $N = m(g + a) = 50 \\times 12 = 600$ N. 400 N is the reading when the lift accelerates downwards."),
    S(0, 1, "Collisions", "A ball hits an identical ball at rest head-on in a perfectly elastic collision. What happens?",
      ["The balls exchange velocities", "Both move on at half the speed", "The first ball bounces straight back", "Both stop"],
      "For equal masses in a head-on elastic collision, momentum and kinetic energy can both be conserved only if the velocities swap: the first ball stops and the second moves off with its speed. Moving on together at half the speed loses kinetic energy."),
    S(0, 2, "Centre of mass", "How far from the centre is the centre of mass of a thin uniform semicircular ring of radius $R$?",
      ["$\\frac{2R}{\\pi}$", "$\\frac{4R}{3\\pi}$", "$\\frac{R}{2}$", "$\\frac{R}{\\pi}$"],
      "For a ring, $y_{cm} = \\frac{1}{\\pi R}\\int_0^{\\pi} R\\sin\\theta \\cdot R\\,d\\theta = \\frac{2R}{\\pi}$. $\\frac{4R}{3\\pi}$ is the value for a semicircular disc."),
    S(0, 2, "Kepler's laws", "Statement I: A planet's radius vector sweeps out equal areas in equal times. Statement II: The gravitational force on a planet is directed towards the Sun, so its angular momentum about the Sun is constant. Which is correct?",
      [STATEMENTS[0], STATEMENTS[1], STATEMENTS[2], STATEMENTS[3]],
      "A central force exerts no torque about the Sun, so $L$ is conserved, and areal speed $\\frac{dA}{dt} = \\frac{L}{2m}$ is then constant. Both statements are true, and II explains I."),
    N(0, 2, "Projectile motion", "A stone is thrown at 30 m/s at $15^\\circ$ above the horizontal over level ground. How far away, in metres, does it land?",
      round(30**2 * sin(radians(30)) / g), 45,
      "$R = \\frac{u^2\\sin 2\\theta}{g} = \\frac{900 \\times \\sin 30^\\circ}{10} = 45$ m."),
    N(0, 2, "Torque", "A disc with moment of inertia 2 kg m$^2$ spins at 10 rad/s. A steady opposing torque of 4 N m acts on it. How many seconds does it take to stop?",
      round(2 * 10 / 4), 5,
      "$\\alpha = \\frac{\\tau}{I} = 2$ rad/s$^2$, so $t = \\frac{\\omega}{\\alpha} = \\frac{10}{2} = 5$ s. Equivalently, the angular impulse $\\tau t$ equals the angular momentum $I\\omega = 20$."),
]
