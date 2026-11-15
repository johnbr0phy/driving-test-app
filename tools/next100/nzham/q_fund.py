CAT = "nzhamFundamentals"; SEG = "FUN"
# NZART Study Guide topics 3 to 7: electronics fundamentals, measurement units, Ohm's law,
# resistance and power. Every numeric key is computed and asserted here. See sources.md.

def g(x, places=2):
    """Format a number without trailing zeros."""
    s = f"{x:.{places}f}".rstrip("0").rstrip(".")
    return s

def par(*rs):
    return 1 / sum(1 / r for r in rs)

# Ohm's law
i1 = 12 / 48; assert abs(i1 - 0.25) < 1e-9
v2 = 2.5 * 18; assert abs(v2 - 45) < 1e-9
r3 = 230 / 0.5; assert abs(r3 - 460) < 1e-9
i4 = 9 / 3000; assert abs(i4 - 0.003) < 1e-9
r5 = 6 / 0.02; assert abs(r5 - 300) < 1e-9
# Resistance
s6 = 220 + 330 + 470; assert s6 == 1020
p6 = par(220, 330, 470); assert round(p6) == 103
p7 = par(100, 100); assert abs(p7 - 50) < 1e-9
p8 = par(60, 30); assert abs(p8 - 20) < 1e-9
p9 = par(12, 12, 12); assert abs(p9 - 4) < 1e-9
c10 = 10 * 10 ** 2; assert c10 == 1000          # brown black red
c11 = 47 * 10 ** 3; assert c11 == 47000         # yellow violet orange
c11b = 56 * 10 ** 2; assert c11b == 5600        # green blue red
mix = 100 + par(200, 200); assert abs(mix - 200) < 1e-9
# Power
p13 = 12 * 18; assert p13 == 216
k26 = 2 + 3; assert k26 == 5
p14 = 2 ** 2 * 50; assert p14 == 200
p15 = 50 ** 2 / 25; assert abs(p15 - 100) < 1e-9
i16 = 60 / 230; assert round(i16, 2) == 0.26
e17 = 100 * 5 / 1000; assert abs(e17 - 0.5) < 1e-9
pr = 0.1 ** 2 * 470; assert abs(pr - 4.7) < 1e-9
# Cells and dividers
v18 = 4 * 1.5; assert abs(v18 - 6) < 1e-9
v19 = 12 * 2000 / (1000 + 2000); assert abs(v19 - 8) < 1e-9
# Units and wavelength
assert abs(4700e-12 - 4.7e-9) < 1e-20
assert abs(0.0022 * 1000 - 2.2) < 1e-9
assert abs(1.5e6 / 1e3 - 1500) < 1e-9
w21 = 300 / 7.1; assert round(w21) == 42
f22 = 300 / 2; assert f22 == 150
t23 = 1 / 10e6; assert abs(t23 - 100e-9) < 1e-15
w24 = 300 / 432; assert round(w24 * 100) == 69

Q = [
("A 12 V supply is connected across a 48 Ω resistor. What current flows?",
 f"{g(i1)} A", ["4 A", "576 A", "0.025 A"],
 "Ohm's law gives I = V / R = 12 / 48 = 0.25 A. Dividing the resistance by the voltage gives the wrong answer of 4."),
("A current of 2.5 A flows through an 18 Ω resistor. What is the voltage across it?",
 f"{g(v2)} V", ["7.2 V", "20.5 V", "4.5 V"],
 "V = I x R = 2.5 x 18 = 45 V. Adding the two figures (20.5) or dividing them (7.2) are the common slips."),
("A heater draws 0.5 A from a 230 V supply. What is its resistance?",
 f"{g(r3)} Ω", ["115 Ω", "920 Ω", "46 Ω"],
 "R = V / I = 230 / 0.5 = 460 Ω. Multiplying 230 by 0.5 instead gives 115."),
("A 9 V battery is connected across a 3 kΩ resistor. What current flows?",
 f"{g(i4 * 1000)} mA", ["3 A", "0.3 mA", "27 mA"],
 "I = V / R = 9 / 3000 = 0.003 A, which is 3 mA. Forgetting that 3 kΩ is 3000 Ω gives 3 A."),
("A lamp draws 20 mA when 6 V is across it. What is its resistance?",
 f"{g(r5)} Ω", ["0.3 Ω", "120 Ω", "3 Ω"],
 "20 mA is 0.02 A, so R = 6 / 0.02 = 300 Ω. Leaving the current as 20 gives 0.3 Ω."),
("Resistors of 220 Ω, 330 Ω and 470 Ω are connected in series. What is the total resistance?",
 f"{s6} Ω", [f"{round(p6)} Ω", "470 Ω", "340 Ω"],
 "In series the resistances add: 220 + 330 + 470 = 1020 Ω. About 103 Ω is what the same three give in parallel."),
("Two 100 Ω resistors are connected in parallel. What is the combined resistance?",
 f"{g(p7)} Ω", ["200 Ω", "100 Ω", "25 Ω"],
 "Two equal resistors in parallel give half of one: 100 / 2 = 50 Ω. 200 Ω is the series total."),
("A 60 Ω resistor and a 30 Ω resistor are connected in parallel. What is the combined resistance?",
 f"{g(p8)} Ω", ["90 Ω", "45 Ω", "30 Ω"],
 "Product over sum: (60 x 30) / (60 + 30) = 1800 / 90 = 20 Ω. A parallel total is always less than the smallest resistor."),
("Three 12 Ω resistors are connected in parallel. What is the combined resistance?",
 f"{g(p9)} Ω", ["36 Ω", "6 Ω", "12 Ω"],
 "Equal resistors in parallel give one value divided by how many there are: 12 / 3 = 4 Ω."),
("A 100 Ω resistor is in series with two 200 Ω resistors that are in parallel with each other. What is the total?",
 f"{g(mix)} Ω", ["500 Ω", "300 Ω", "140 Ω"],
 "The parallel pair is 200 / 2 = 100 Ω, then add the series 100 Ω for 200 Ω. Adding all three gives 500 Ω."),
("A resistor has colour bands brown, black, red. What is its value?",
 "1 kΩ", ["102 Ω", "10 kΩ", "100 Ω"],
 "Brown is 1, black is 0 and red as the multiplier is x100, so 10 x 100 = 1000 Ω, or 1 kΩ."),
("A resistor has colour bands yellow, violet, orange. What is its value?",
 "47 kΩ", ["4.7 kΩ", "470 kΩ", "473 Ω"],
 "Yellow is 4, violet 7 and orange as the multiplier is x1000, so 47 x 1000 = 47 kΩ."),
("A resistor has colour bands green, blue, red. What is its value?",
 "5.6 kΩ", ["56 kΩ", "560 Ω", "562 Ω"],
 "Green is 5, blue 6 and red as the multiplier is x100, so 56 x 100 = 5600 Ω, which is 5.6 kΩ."),
("A resistor's fourth band is gold. What does that tell you?",
 "Tolerance of plus or minus 5%", ["Tolerance of plus or minus 10%", "Tolerance of plus or minus 1%", "Tolerance of plus or minus 20%"],
 "A gold tolerance band means the value is within 5% of the marked value. Silver is 10%; brown is 1%."),
("Which change increases the resistance of a length of copper wire?",
 "Making it longer", ["Making it thicker", "Cooling it down", "Making it shorter"],
 "Resistance rises with length and falls with cross-sectional area. Copper's resistance also falls as it cools, so cooling would lower it."),
("Which of these materials is a good electrical conductor?",
 "Copper", ["Glass", "Mica", "Polythene"],
 "Copper has many free electrons and conducts well. Glass, mica and PVC are insulators, which is why mica and PVC are used to insulate parts and cables."),
("A 12 V radio draws 18 A on transmit. How much power does it take from the supply?",
 f"{g(p13)} W", ["30 W", "0.67 W", "2160 W"],
 "P = V x I = 12 x 18 = 216 W. Adding the figures gives 30, and dividing them gives about 0.67."),
("A current of 2 A flows through a 50 Ω dummy load. How much power does it dissipate?",
 f"{p14} W", ["100 W", "25 W", "400 W"],
 "P = I squared x R = 2 x 2 x 50 = 200 W. Forgetting to square the current gives 100 W."),
("What power is dissipated when 50 V is across a 25 Ω resistor?",
 f"{g(p15)} W", ["2 W", "1250 W", "50 W"],
 "P = V squared / R = 2500 / 25 = 100 W. Using V / R gives 2, which is the current in amps, not the power."),
("About what current does a 60 W lamp draw from a 230 V supply?",
 f"{i16:.2f} A", ["3.8 A", "0.38 A", "2.6 A"],
 "I = P / V = 60 / 230, which is about 0.26 A. Dividing 230 by 60 gives 3.8."),
("A 100 W transceiver runs for 5 hours. How much energy does it use?",
 f"{g(e17)} kWh", ["5 kWh", "20 kWh", "0.05 kWh"],
 "Energy = power x time = 100 W x 5 h = 500 Wh, which is 0.5 kWh."),
("A current of 100 mA flows through a 470 Ω resistor. What power rating does the resistor need at least?",
 f"{g(pr)} W", ["47 W", "0.47 W", "0.21 W"],
 "100 mA is 0.1 A, so P = 0.1 x 0.1 x 470 = 4.7 W. Choose a rating above that, such as 10 W."),
("Four 1.5 V cells are connected in series. What voltage do they give?",
 f"{g(v18)} V", ["1.5 V", "3 V", "0.375 V"],
 "Cell voltages add in series: 4 x 1.5 = 6 V. In parallel the voltage would stay at 1.5 V."),
("What do identical cells connected in parallel give, compared with one cell?",
 "Same voltage, more capacity", ["Double the voltage", "Half the voltage", "Same voltage, less capacity"],
 "In parallel the voltage stays the same while the cells share the current, so the battery lasts longer. Series connection is what raises the voltage."),
("A battery's voltage drops when it supplies a heavy current. What causes this?",
 "Its internal resistance", ["Its terminal capacitance", "The load's inductance", "A rise in its EMF"],
 "Current through the cell's own internal resistance drops some voltage inside it, so less reaches the terminals as the current rises."),
("A 12 V supply feeds a 1 kΩ and a 2 kΩ resistor in series. What voltage is across the 2 kΩ resistor?",
 f"{g(v19)} V", ["4 V", "6 V", "24 V"],
 "The current is 12 / 3000 = 4 mA, and 4 mA x 2000 Ω = 8 V. The 1 kΩ resistor has the other 4 V."),
("Currents of 2 A and 3 A flow into a junction, and one wire carries current away. What current is in that wire?",
 f"{k26} A", ["1 A", "6 A", "2.5 A"],
 "Kirchhoff's current law says current into a junction equals current out: 2 + 3 = 5 A. Subtracting gives 1 A and averaging gives 2.5 A."),
("A capacitor is marked 4700 pF. What is that in nanofarads?",
 "4.7 nF", ["47 nF", "0.47 nF", "4700 nF"],
 "1 nF is 1000 pF, so 4700 pF divided by 1000 is 4.7 nF."),
("A meter reads 0.0022 A. What is that in milliamps?",
 "2.2 mA", ["22 mA", "0.22 mA", "220 mA"],
 "1 A is 1000 mA, so 0.0022 x 1000 = 2.2 mA."),
("What is 1.5 MHz in kilohertz?",
 "1500 kHz", ["150 kHz", "15 kHz", "15 000 kHz"],
 "1 MHz is 1000 kHz, so 1.5 MHz is 1500 kHz."),
("A signal is on 7.1 MHz. About what is its wavelength?",
 f"{round(w21)} m", ["21 m", "4.2 m", "84 m"],
 "Wavelength in metres is about 300 divided by the frequency in MHz: 300 / 7.1 is about 42 m, inside the 40 m band."),
("A signal has a wavelength of 69 cm. About what is its frequency?",
 "432 MHz", ["207 MHz", "4.3 MHz", "144 MHz"],
 "Frequency in MHz is 300 divided by the wavelength in metres: 300 / 0.69 is about 435 MHz, and 432 MHz in the 70 cm band is the nearest choice (it has a wavelength of 0.69 m)."),
]
