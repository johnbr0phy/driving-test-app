CAT = "cahamPowerSafety"; SEG = "PSU"
# RIC-3 Basic syllabus 5.1.3 topics 3-8 and 3-16 to 3-21: regulated power supplies, cells and
# batteries, electrical, tower and lightning safety, RF exposure. Supply layout from ISED's
# Formulas and Block Diagrams (May 2025); RF exposure from Health Canada Safety Code 6 (2015).
# See sources.md.

CELLS = 6 * 1.2
assert abs(CELLS - 7.2) < 1e-9
HOURS = 20 / 4
assert HOURS == 5

Q = [
("In a linear regulated power supply, what comes right after the rectifier?",
 "Filter capacitor", ["Zener regulator", "Step-down transformer", "Load resistor"],
 "ISED's linear regulated supply runs AC mains, transformer, rectifier, filter, regulator and load. The filter smooths the rectifier's pulsating DC before regulation."),
("In a linear regulated supply, which block holds the output voltage steady as the load changes?",
 "Regulator", ["Bridge rectifier", "Step-down transformer", "Filter capacitor"],
 "The regulator, shown with a Zener diode symbol in ISED's diagram, keeps the output voltage constant. The filter only smooths ripple."),
("What does the rectifier in a power supply do?",
 "Changes AC to pulsing DC", ["Steps down the AC voltage", "Smooths out the ripple", "Holds the voltage steady"],
 "A rectifier, such as a four-diode bridge, lets current flow one way only, turning AC into pulsating DC. The transformer changes the voltage and the filter smooths it."),
("What is the nominal voltage of one lead-acid cell?",
 "2.0 V", ["1.2 V", "1.5 V", "3.7 V"],
 "A lead-acid cell is about 2 V, so a 12 V car-type battery has six cells. Nickel cells are about 1.2 V, alkaline 1.5 V and lithium-ion about 3.7 V."),
("Six 1.2 V nickel-metal hydride cells connected in series give:",
 "7.2 V", ["1.2 V", "6.0 V", "9.0 V"],
 "Cells in series add their voltages: 6 x 1.2 V = 7.2 V. Connecting them in parallel would keep 1.2 V and add capacity instead."),
("Connecting identical batteries in parallel increases their:",
 "Capacity, not voltage", ["Voltage, not capacity", "Voltage and capacity", "Internal resistance"],
 "In parallel the voltage stays that of one battery while the ampere-hour capacity adds. Series connection adds voltage."),
("A fully charged 20 Ah battery supplies a steady 4 A. About how long will it last?",
 "5 hours", ["80 hours", "16 hours", "0.2 hours"],
 "Ampere-hours divided by amperes gives hours: 20 Ah / 4 A = 5 h. Multiplying instead gives 80, a common slip."),
("The fuse in a mobile radio's 12 V power lead is there mainly to protect the:",
 "Wiring from overheating", ["Radio from high voltage", "Battery from overcharging", "Antenna from lightning"],
 "A short or fault can draw hundreds of amperes from a car battery; the fuse opens before the power wiring overheats or starts a fire. It does nothing about voltage, charging or lightning."),
("What is the main hazard of shorting a charged car battery's terminals?",
 "Huge current and burns", ["A slow loss of charge", "Reversed battery polarity", "A brief voltage rise"],
 "A lead-acid battery can deliver hundreds of amperes into a short, enough to melt a tool or ring, cause burns and even make the battery burst."),
("Why are station equipment cases bonded to the electrical safety ground?",
 "So a fault trips the protection", ["To reduce RF on the feed line", "To improve receiver sensitivity", "To raise the supply voltage"],
 "If a live wire touches a grounded case, the fault current flows to ground and blows the fuse or trips the breaker instead of making the case live."),
("Which path of electric current through the body is most dangerous?",
 "Across the chest", ["Through one fingertip", "Along one forearm", "Between two toes"],
 "Current passing through the chest can upset the heart's rhythm, which is why touching live parts with both hands is so dangerous. Keep one hand clear when working near voltage."),
("What is a tower climber's main protection against a fall?",
 "Full-body harness", ["Body belt", "Positioning lanyard alone", "Work-positioning saddle"],
 "A full-body harness (CSA Z259.10) with a proper lanyard and anchor arrests a fall. CCOHS notes that body belts and saddles are for work positioning and travel restraint, not for arresting a fall."),
("A Class A ground fault circuit interrupter (GFCI) trips at a leakage current of at most:",
 "6 mA", ["30 mA", "15 mA", "100 mA"],
 "CCOHS says a Class A GFCI trips at a maximum of 6 mA, cutting power when current leaks to ground. It reduces risk, but a painful shock can still happen before it trips."),
("Which Safety Code 6 exposure limits are stricter?",
 "Public (uncontrolled)", ["Workplace (controlled)", "Both are the same", "Only those above 6 GHz"],
 "Health Canada's Safety Code 6 sets lower limits for uncontrolled environments, where the public may not know about RF exposure, than for controlled ones where people are aware and can manage it."),
("Safety Code 6 limits based on body heating are averaged over a reference period of:",
 "6 minutes", ["1 minute", "30 minutes", "1 hour"],
 "Safety Code 6 averages its SAR-based (thermal) limits over 6 minutes. Short peaks may exceed a reference level if the 6-minute average stays within the limit."),
("Below 10 MHz, Safety Code 6 also limits exposure to prevent:",
 "Nerve stimulation", ["Eye lens heating", "Hearing damage", "Skin heating only"],
 "From 3 kHz to 10 MHz Safety Code 6 sets limits on internal electric field strength to prevent nerve stimulation, as well as heating limits from 100 kHz."),
]
