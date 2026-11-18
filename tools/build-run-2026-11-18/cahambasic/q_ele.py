CAT = "cahamElectronics"; SEG = "ELE"
# RIC-3 Basic syllabus 5.1.5 (Basic Electronics and Theory, topics 5-1 to 5-13), using the
# formulas on ISED's Reference Material for Amateur Radio Exam, Basic Qualification (May 2025).
# Every numeric key is computed and asserted here. See sources.md.
import math

def par(*rs):
    return 1 / sum(1 / r for r in rs)

I1 = 24 / 300; assert abs(I1 - 0.08) < 1e-9            # 80 mA
V2 = 0.25 * 56; assert abs(V2 - 14) < 1e-9             # 14 V
R3 = 15 / 0.06; assert abs(R3 - 250) < 1e-9            # 250 ohms
S4 = 150 + 270 + 390; assert S4 == 810
P5 = par(560, 560); assert abs(P5 - 280) < 1e-9
P6 = par(120, 240); assert abs(P6 - 80) < 1e-9
W7 = 9 * 1.5; assert abs(W7 - 13.5) < 1e-9
A8 = 48 / 12; assert A8 == 4
D9 = 0.2 * (0.2 * 330); assert abs(D9 - 13.2) < 1e-9 and abs(0.2 * 330 - 66) < 1e-9     # P = I x E with E = I x R
F10 = 1 / 0.002; assert abs(F10 - 500) < 1e-9
DB11 = 10 * math.log10(100 / 25); assert round(DB11) == 6
P12 = 200 / 10; assert P12 == 20
T13 = 120 / 5; assert T13 == 24
C14 = par(150, 300); assert abs(C14 - 100) < 1e-9      # capacitors in series
C15 = 220 + 470; assert C15 == 690                     # capacitors in parallel

Q = [
("A value of 4700 picofarads is the same as:",
 "4.7 nanofarads", ["47 nanofarads", "0.47 nanofarads", "4.7 microfarads"],
 "Pico is 10^-12 and nano 10^-9, so 1000 pF = 1 nF and 4700 pF = 4.7 nF."),
("A frequency of 2.35 GHz is how many megahertz?",
 "2350 MHz", ["235 MHz", "23 500 MHz", "2.35 MHz"],
 "Giga is a thousand times mega, so 2.35 GHz x 1000 = 2350 MHz."),
("Which metric prefix means one millionth?",
 "Micro", ["Milli", "Nano", "Pico"],
 "Micro is 10^-6, one millionth. Milli is one thousandth, nano one billionth and pico one trillionth."),
("Which of these materials is the best electrical conductor?",
 "Copper", ["Graphite", "Stainless steel", "Mica"],
 "Copper has very low resistivity, which is why it is used for wire and coax. Graphite and stainless steel conduct poorly by comparison, and mica is an insulator."),
("Electrical energy used over a period of time is measured in:",
 "Kilowatt-hours", ["Kilowatts", "Kilovolt-amperes", "Ampere-hours"],
 "Energy is power multiplied by time, so it is measured in watt-hours or kilowatt-hours. Kilowatts measure power, and ampere-hours measure battery charge."),
("In an open circuit, the current that flows is:",
 "Zero", ["At its maximum", "Set by the fuse", "Equal to the source rating"],
 "An open circuit has a break in the path, so no current flows. A short circuit is the opposite case, where current rises very high."),
("A 24 V source is connected across a 300 ohm resistor. The current is:",
 "80 mA", ["8 mA", "12.5 mA", "800 mA"],
 "I = E / R = 24 / 300 = 0.08 A, which is 80 mA. Dividing the resistance by the voltage gives 12.5, a common slip."),
("A current of 0.25 A flows through a 56 ohm resistor. The voltage across it is:",
 "14 V", ["224 V", "1.4 V", "28 V"],
 "E = I x R = 0.25 x 56 = 14 V. Dividing 56 by 0.25 gives 224 V instead."),
("A resistor draws 60 mA from a 15 V supply. Its resistance is:",
 "250 ohms", ["0.25 ohms", "2500 ohms", "900 ohms"],
 "R = E / I = 15 / 0.060 = 250 ohms. Leaving the current in milliamperes gives 0.25, and multiplying 15 by 60 gives 900."),
("Resistors of 150, 270 and 390 ohms are connected in series. The total is:",
 "810 ohms", ["270 ohms", "77 ohms", "390 ohms"],
 "Series resistances add: 150 + 270 + 390 = 810 ohms. Combining them as parallel resistors gives about 77 ohms."),
("Two 560 ohm resistors are connected in parallel. The total resistance is:",
 "280 ohms", ["1120 ohms", "560 ohms", "140 ohms"],
 "Two equal resistors in parallel give half of one: 560 / 2 = 280 ohms. Adding them as if in series gives 1120 ohms."),
("A 120 ohm and a 240 ohm resistor are connected in parallel. The total is:",
 "80 ohms", ["360 ohms", "180 ohms", "40 ohms"],
 "1/Rt = 1/120 + 1/240 = 3/240, so Rt = 80 ohms. A parallel total is always less than the smallest resistor."),
("A 9 V device draws 1.5 A. How much power does it use?",
 "13.5 W", ["6 W", "10.5 W", "135 W"],
 "P = I x E = 1.5 x 9 = 13.5 W. Dividing 9 by 1.5 gives 6, and adding the two gives 10.5."),
("A 48 W lamp runs from a 12 V supply. How much current does it draw?",
 "4 A", ["0.25 A", "576 A", "36 A"],
 "I = P / E = 48 / 12 = 4 A. Dividing the other way gives 0.25 A, and multiplying gives 576."),
("A current of 0.2 A flows through a 330 ohm resistor. How much power does it dissipate?",
 "13.2 W", ["66 W", "1.32 W", "132 W"],
 "First E = I x R = 0.2 x 330 = 66 V, then P = I x E = 0.2 x 66 = 13.2 W. Stopping at the voltage gives 66."),
("A sine wave repeats every 2 milliseconds. Its frequency is:",
 "500 Hz", ["2 kHz", "50 Hz", "5 kHz"],
 "Frequency is 1 divided by the period: 1 / 0.002 s = 500 Hz."),
("Raising transmitter power from 25 W to 100 W is a gain of about:",
 "6 dB", ["3 dB", "4 dB", "12 dB"],
 "100 / 25 = 4 times, and 10 log 4 is about 6 dB: each doubling adds 3 dB. 12 dB comes from using the voltage formula, 20 log."),
("A feed line with 10 dB of loss is fed 200 W. About how much reaches the antenna?",
 "20 W", ["100 W", "190 W", "2 W"],
 "A 10 dB loss divides power by 10: 200 / 10 = 20 W. Treating 10 dB as 10 W gives 190, and 20 dB would give 2 W."),
("A step-down transformer has a 5 to 1 turns ratio and 120 V on the primary. The secondary voltage is:",
 "24 V", ["600 V", "115 V", "4.8 V"],
 "Voltage scales with the turns ratio: 120 / 5 = 24 V. Using the ratio the wrong way, as a step-up, gives 600 V."),
("A 150 pF and a 300 pF capacitor are connected in series. The total capacitance is:",
 "100 pF", ["450 pF", "225 pF", "50 pF"],
 "Capacitors in series combine like resistors in parallel: 1/Ct = 1/150 + 1/300 = 3/300, so Ct = 100 pF. Adding them, as for parallel, gives 450 pF."),
("A 220 pF and a 470 pF capacitor are connected in parallel. The total is:",
 "690 pF", ["150 pF", "250 pF", "470 pF"],
 "Capacitors in parallel add: 220 + 470 = 690 pF. Treating them as series gives about 150 pF."),
("Inductance is measured in:",
 "Henrys", ["Farads", "Siemens", "Teslas"],
 "The henry is the unit of inductance. Capacitance is in farads, conductance in siemens and magnetic flux density in teslas."),
("In a tuned circuit at resonance, the inductive and capacitive reactances are:",
 "Equal", ["Both at their peak", "Both zero", "In a 2 to 1 ratio"],
 "Resonance is the frequency where inductive reactance equals capacitive reactance, so they cancel and the circuit behaves resistively."),
("A good voltmeter should have an input resistance that is:",
 "Very high", ["Very low", "Exactly 50 ohms", "Equal to the load"],
 "A voltmeter is connected across the part being measured. A very high input resistance draws little current, so it barely changes the voltage it measures."),
]
