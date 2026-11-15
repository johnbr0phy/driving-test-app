CAT = "nzhamSafetyPower"; SEG = "PSU"
# NZART Study Guide topics 10 (safety), 13 (meters), 14 (decibels), 21 (power supplies) and
# 22 (regulated power supplies). Numbers computed and asserted. See sources.md.
import math

db1 = 10 * math.log10(100); assert abs(db1 - 20) < 1e-9
r2 = 10 ** (6 / 10); assert round(r2) == 4
out3 = 400 / 10 ** (10 / 10); assert abs(out3 - 40) < 1e-9
pk4 = 12 * math.sqrt(2); assert round(pk4) == 17
rip5 = 2 * 50; assert rip5 == 100
db6 = 10 * math.log10(50 / 400); assert round(db6) == -9

Q = [
("What makes a residual current device (RCD) cut the supply?",
 "Live and neutral currents differ", ["The load draws over 10 A", "The voltage rises too high", "The earth wire has been unplugged"],
 "An RCD compares the phase (live) and neutral currents. If they differ, current is leaking another way, possibly through a person, and it disconnects the supply."),
("You find someone unconscious and touching a live mains conductor. What do you do first?",
 "Switch off or isolate the power", ["Pull them clear by the arm", "Start CPR on them straight away", "Pour water on the contact"],
 "Your own safety comes first. Touching the person while the supply is on can give you a shock too, so isolate the power before going near them."),
("Before working inside a mains-powered power supply, what should you do?",
 "Switch off and pull out the plug", ["Turn the volume to zero", "Set the output to the lowest voltage", "Disconnect the antenna lead"],
 "Turning the power off and removing the plug from the outlet stops the risk of contact with mains voltage. Then remember stored charge."),
("What is a bleeder resistor across a power supply's filter capacitors for?",
 "Draining their charge at switch-off", ["Raising the output voltage", "Limiting the inrush current", "Filtering out RF on the leads"],
 "Filter capacitors can stay charged to a dangerous voltage after the supply is turned off. A bleeder resistor slowly discharges them, but still check with a meter before touching anything."),
("In a modern New Zealand appliance lead, what colour is the earth wire?",
 "Green and yellow", ["Blue", "Brown", "Red and black stripes"],
 "Brown is phase (live), blue is neutral and green and yellow is earth. The earth goes to the larger bottom pin of the plug."),
("What is a Class II appliance?",
 "Double insulated, with no earth", ["Earthed through its exposed metal case", "Rated for outdoor use", "Fused at 10 A or less"],
 "A Class II appliance has two layers of insulation between live parts and anything you can touch, so it has no earth connection. A Class I appliance relies on an earthed metal case."),
("What internal resistance should a good ammeter have?",
 "Very low", ["Very high", "Exactly 50 Ω", "The same as the load"],
 "An ammeter is placed in the current path, so its own resistance must be very low or it would reduce the current it is measuring. A voltmeter is the opposite and needs a very high resistance."),
("When measuring an unknown voltage with a multimeter, which range should you start on?",
 "The highest range", ["The lowest range", "The resistance range", "The current range"],
 "Starting high protects the meter from an overload. Step down to a lower range to read the value more accurately."),
("A power ratio of 100 to 1 is how many decibels?",
 f"{round(db1)} dB", ["100 dB", "10 dB", "40 dB"],
 "Decibels = 10 x log of the power ratio. log 100 is 2, so 10 x 2 = 20 dB."),
("An amplifier has a gain of 6 dB. About how many times does it multiply the power?",
 f"{round(r2)} times", ["6 times", "2 times", "60 times"],
 "Every 3 dB doubles the power, so 6 dB is 2 x 2, about 4 times."),
("A feed line has 10 dB of loss and 400 W goes into it. How much reaches the antenna?",
 f"{round(out3)} W", ["390 W", "200 W", "4 W"],
 "10 dB is a factor of 10, so 400 / 10 = 40 W. Subtracting 10 from 400 treats decibels as watts."),
("A transformer gives 12 V RMS into a rectifier and filter capacitor. About what DC voltage does the capacitor charge to with no load?",
 f"About {round(pk4)} V", ["About 8.5 V", "About 12 V", "About 24 V"],
 "With no load the capacitor charges to the peak voltage, 12 x 1.414, which is about 17 V less the small diode drop."),
("A full-wave rectifier runs from 50 Hz mains. What is the ripple frequency?",
 f"{rip5} Hz", ["50 Hz", "25 Hz", "200 Hz"],
 "A full-wave rectifier uses both halves of each cycle, so it gives two pulses per cycle: 2 x 50 = 100 Hz. A half-wave rectifier gives 50 Hz."),
("How many diodes does a bridge rectifier use?",
 "Four", ["One", "Two", "Six"],
 "A bridge uses four diodes so that both halves of the AC wave flow the same way through the load, giving full-wave rectification without a centre-tapped transformer."),
("In a simple regulated power supply, what does the Zener diode provide?",
 "A reference voltage", ["The smoothing of the ripple", "The current limit", "The rectification"],
 "The Zener holds a steady reference voltage on the base of the series pass transistor, which then holds the output steady as the load changes."),
("What is the job of a fuse in a power supply lead?",
 "To break the circuit on overcurrent", ["To smooth the output voltage", "To filter out incoming RF interference", "To lower the output voltage"],
 "A fuse is a deliberately weak link that melts when the current is too high, so a fault cannot overheat the wiring or start a fire."),
]
