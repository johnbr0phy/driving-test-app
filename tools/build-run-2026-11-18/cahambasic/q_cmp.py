CAT = "cahamComponents"; SEG = "CMP"
# RIC-3 Basic syllabus 5.1.4 (Circuit Components, topics 4-1 to 4-6): amplifiers, diodes,
# bipolar and field-effect transistors, triode tubes, resistor colour codes. Values computed
# and asserted here. See sources.md.
import math

R1 = 33 * 10 ** 1          # orange orange brown
assert R1 == 330
R2 = 68 * 10 ** 4          # blue grey yellow
assert R2 == 680000
GAIN = 10 * math.log10(30 / 3)
assert abs(GAIN - 10) < 1e-9

Q = [
("A silicon diode conducts when its anode is:",
 "Positive relative to the cathode", ["Negative relative to the cathode", "At the same voltage as the cathode", "Connected to the gate lead"],
 "A diode is forward biased, and conducts, when the anode is more positive than the cathode. Reversed, it blocks current until breakdown."),
("Which diode is designed to hold a fixed voltage when reverse biased?",
 "Zener diode", ["Light-emitting diode", "Point-contact diode", "Varactor diode"],
 "A Zener diode is built to break down at a set reverse voltage and hold it, which is why it appears as the regulator in a power supply. A varactor acts as a variable capacitor."),
("The three leads of a bipolar transistor are:",
 "Emitter, base and collector", ["Source, gate and drain", "Cathode, grid and plate", "Anode, gate and cathode"],
 "A bipolar junction transistor has an emitter, base and collector. Source, gate and drain belong to a FET, and cathode, grid and plate to a triode tube."),
("In a bipolar transistor, a small current into which lead controls a larger current?",
 "Base", ["Emitter", "Collector", "Gate"],
 "A small base current controls a much larger collector current, which is how the transistor amplifies. The gate is a FET's control lead, worked by voltage."),
("A field-effect transistor's drain current is controlled by the voltage on its:",
 "Gate", ["Source", "Drain", "Base"],
 "In a FET the gate voltage controls the channel between source and drain. Very little current flows into the gate."),
("Compared with a bipolar transistor, a field-effect transistor has:",
 "Very high input impedance", ["Very low input impedance", "No need for any bias supply", "Only two leads"],
 "Because the gate draws almost no current, a FET presents a very high input impedance, which loads the previous stage very lightly."),
("In a triode vacuum tube, which element controls the electron flow?",
 "Control grid", ["Plate (anode)", "Cathode", "Heater"],
 "Electrons leave the heated cathode for the plate, and the voltage on the control grid between them sets how many get through."),
("What is the value of a resistor banded orange, orange, brown?",
 "330 ohms", ["33 ohms", "3300 ohms", "331 ohms"],
 "Orange is 3, so the first two bands give 33, and brown is a multiplier of 10, giving 330 ohms. Reading brown as a third digit gives 331."),
("What is the value of a resistor banded blue, grey, yellow?",
 "680 kilohms", ["68 kilohms", "6.8 megohms", "684 ohms"],
 "Blue is 6 and grey 8, giving 68; yellow is a multiplier of 10 000, so 68 x 10 000 = 680 000 ohms, or 680 kilohms."),
("A resistor's tolerance band is silver. Its tolerance is:",
 "10%", ["5%", "20%", "1%"],
 "Silver marks 10% tolerance and gold 5%. A resistor with no tolerance band is 20%."),
("A resistor with a positive temperature coefficient:",
 "Rises in value as it heats", ["Falls in value as it heats", "Keeps its value as it heats", "Opens when it gets warm"],
 "A positive coefficient means resistance increases with temperature. A negative coefficient part loses resistance as it warms."),
("An amplifier turns a 3 W input into a 30 W output. Its power gain is:",
 "10 dB", ["20 dB", "3 dB", "27 dB"],
 "Power gain in decibels is 10 log of the ratio: 30 / 3 = 10 times, and 10 log 10 = 10 dB. Using 20 log, the voltage formula, gives 20 dB."),
]
