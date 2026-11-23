CAT = "auhamTech"; SEG = "TEC"
# Source: ACMA Foundation syllabus (February 2024) section 3, Technical basics. Every
# calculation below is computed and asserted.

def close(a, b, tol=0.005):
    return abs(a - b) <= tol * max(abs(a), abs(b), 1e-9)

assert close(7.2 / 24, 0.3)             # I = V / R
assert close(0.35 * 47, 16.45)          # V = I x R
assert close(12 / 0.08, 150)            # R = V / I
assert close(13.8 * 1.5, 20.7)          # P = V x I
assert round(10 / 13.8, 2) == 0.72      # I = P / V
assert close(9 * 9 / 18, 4.5)           # P = V^2 / R
assert close(5 * 5 * 6.8, 170)          # P = I^2 x R
assert close(250 / 1000, 0.25)          # 250 mA
assert close(3.3 * 1000, 3300)          # 3.3 kohm
assert close(147.25 * 1000, 147250)     # MHz to kHz
assert round(300 / 7.15, 1) == 42.0     # wavelength in metres
assert round(300 / 438.5, 3) == 0.684
assert close(300 / 2.0, 150)            # 2 m wavelength -> 150 MHz
assert close(300 / 10.4, 28.846, 0.001)

Q = [
("What is the unit of electrical resistance?",
 "Ohm", ["Watt", "Volt", "Farad"],
 "Resistance is measured in ohms, symbol the Greek letter omega. Watts measure power and volts measure electromotive force."),
("Which unit measures electrical power?",
 "Watt", ["Ampere", "Ohm", "Hertz"],
 "Power, the rate at which energy is used, is measured in watts (W). Amperes measure current."),
("The abbreviation A on a power supply's rating plate stands for:",
 "Amperes of current", ["Audio frequency", "Antenna gain", "Alternating voltage"],
 "A is the symbol for the ampere, the unit of current. A supply rated 20 A can deliver 20 amperes."),
("A handheld draws 250 mA when transmitting. How many amperes is that?",
 "0.25 A", ["2.5 A", "25 A", "0.025 A"],
 "Milli means one thousandth, so 250 mA is 250 / 1000 = 0.25 A. Using a factor of one hundred gives 2.5 A."),
("A resistor is marked 3.3 kilohms. What is that in ohms?",
 "3300 ohms", ["330 ohms", "33 000 ohms", "3.3 million ohms"],
 "Kilo means one thousand, so 3.3 kilohms is 3.3 x 1000 = 3300 ohms."),
("A repeater output is on 147.25 MHz. What is that in kilohertz?",
 "147 250 kHz", ["14 725 kHz", "1472.5 kHz", "147.25 kHz"],
 "Mega means one million and kilo one thousand, so each megahertz is 1000 kHz: 147.25 x 1000 = 147 250 kHz."),
("The abbreviation DC means:",
 "Direct current", ["Dual channel", "Detected carrier", "Distributed charge"],
 "Direct current flows in one direction only, as from a battery. Alternating current reverses direction regularly."),
("What makes alternating current different from direct current?",
 "It reverses direction", ["It flows in only one wire", "It never changes in level", "It is always a lower voltage"],
 "AC reverses its direction of flow over and over, as the mains supply does 50 times a second. DC keeps flowing one way."),
("A normal human ear hears frequencies from about:",
 "20 Hz to 20 kHz", ["300 Hz to 3 kHz", "3 kHz to 30 kHz", "50 Hz to 500 Hz"],
 "Normal human hearing runs roughly from 20 Hz to 20 kHz. The narrower 300 Hz to 3 kHz range is what radiotelephony uses for speech."),
("Speech sent by radiotelephony mostly uses audio frequencies of about:",
 "300 Hz to 3 kHz", ["20 Hz to 20 kHz", "3 kHz to 30 kHz", "30 Hz to 300 Hz"],
 "Communications transmitters pass roughly 300 Hz to 3 kHz, which keeps speech understandable in a narrow bandwidth."),
("Which of these is a radio frequency rather than an audio frequency?",
 "3.6 MHz", ["1 kHz", "440 Hz", "12 kHz"],
 "Audio frequencies lie within human hearing, below about 20 kHz. 3.6 MHz is far above that, in the HF radio spectrum."),
("In amplitude modulation (AM), which property of the carrier follows the audio?",
 "Its strength", ["Its frequency", "Its polarisation", "Its direction"],
 "In AM the amplitude, or strength, of the radio frequency carrier rises and falls with the audio. FM varies the frequency instead."),
("In frequency modulation (FM), the audio changes the carrier's:",
 "Frequency", ["Amplitude", "Polarisation", "Phase of the mains"],
 "FM shifts the carrier frequency up and down in step with the audio while its amplitude stays constant."),
("Voltage is best described as:",
 "Pressure that drives current", ["The rate charge flows past a point", "Opposition to the flow of current", "Energy used in each second"],
 "Voltage, or electromotive force, is the electrical pressure that pushes current around a circuit. The rate of charge flow is current."),
("Electric current is:",
 "The flow of electric charge", ["The pressure behind the charge", "Opposition to charge flow", "Energy stored in a battery"],
 "Current is the movement of charge, measured in amperes. The pressure behind it is voltage."),
("What does resistance do in a circuit?",
 "Opposes current flow", ["Stores electric charge", "Raises the supply voltage", "Changes AC into DC"],
 "Resistance opposes current, turning some energy into heat. Storing charge is the job of a capacitor."),
("A 24 ohm load is fed from a 7.2 V battery pack. What current does it draw?",
 "0.3 A", ["3.33 A", "172.8 A", "0.03 A"],
 "By Ohm's law I = V / R = 7.2 / 24 = 0.3 A. Dividing the resistance by the voltage gives 3.33, and multiplying gives 172.8."),
("A current of 0.35 A flows through a 47 ohm resistor. What voltage is across it?",
 "16.45 V", ["134.3 V", "1.65 V", "47.35 V"],
 "V = I x R = 0.35 x 47 = 16.45 V. Dividing 47 by 0.35 gives about 134.3, the result of the wrong operation."),
("A 12 V lamp draws 0.08 A. What is its resistance?",
 "150 ohms", ["0.96 ohms", "15 ohms", "1500 ohms"],
 "R = V / I = 12 / 0.08 = 150 ohms. Multiplying the two gives 0.96, which is the power in watts, not resistance."),
("A transceiver draws 1.5 A from a 13.8 V supply. How much power does it take?",
 "20.7 W", ["9.2 W", "15.3 W", "2.07 W"],
 "P = V x I = 13.8 x 1.5 = 20.7 W. Dividing 13.8 by 1.5 gives 9.2, which is a resistance in ohms."),
("A 10 W device runs from a 13.8 V supply. About what current does it draw?",
 "0.72 A", ["1.38 A", "138 A", "7.2 A"],
 "I = P / V = 10 / 13.8 = about 0.72 A. Dividing the voltage by the power gives 1.38, the wrong way round."),
("A 9 V battery is connected across an 18 ohm resistor. How much power does the resistor take?",
 "4.5 W", ["2 W", "0.5 W", "162 W"],
 "First I = 9 / 18 = 0.5 A, then P = V x I = 9 x 0.5 = 4.5 W. Stopping at 0.5 gives the current, not the power."),
("A current of 5 A flows through a 6.8 ohm load. How much power is turned into heat?",
 "170 W", ["34 W", "1.36 W", "231 W"],
 "V = 5 x 6.8 = 34 V, so P = V x I = 34 x 5 = 170 W. Stopping at 34 gives the voltage, not the power."),
("You connect a 13.8 V radio to a 24 V truck supply. The most likely result is:",
 "Damage to the radio", ["Higher output, no harm", "Better receive audio", "Automatic voltage sharing"],
 "The syllabus warns that electronic circuits can be damaged by applying an excessive voltage. Check a supply matches the radio before connecting it."),
("The red and black leads to a radio are swapped on the supply. This can:",
 "Damage the circuits", ["Reverse the band", "Improve the signal", "Switch it to FM"],
 "Applying a voltage of the wrong polarity can damage electronic circuits. Many radios have a fuse or diode for protection, but not all."),
("A signal completing one full cycle every second has a frequency of:",
 "1 hertz", ["1 watt", "1 henry", "1 kilohertz"],
 "The hertz is one cycle per second, so one cycle each second is 1 Hz. A kilohertz is a thousand cycles per second."),
("A steady tone from an oscillator is viewed on an oscilloscope. Its shape is a:",
 "Smooth sine wave", ["Flat straight line", "Single sharp spike", "Random noise pattern"],
 "The syllabus says sine waves are produced by oscillators. A pure tone shows as a smooth, repeating sine wave."),
("The household mains supply in Australia is nominally:",
 "230 V at 50 Hz", ["120 V at 60 Hz", "240 V at 60 Hz", "110 V at 50 Hz"],
 "Australia's nominal mains supply is 230 V AC at 50 Hz. 120 V at 60 Hz is the North American supply."),
("A station transmits on 21.2 MHz. Which part of the spectrum is that in?",
 "HF", ["VHF", "UHF", "LF"],
 "High frequency (HF) runs from 3 to 30 MHz, so 21.2 MHz is HF. VHF starts at 30 MHz."),
("A repeater on 438.5 MHz is in which part of the spectrum?",
 "UHF", ["HF", "VHF", "SHF"],
 "Ultra high frequency (UHF) covers 300 to 3000 MHz, which includes the 430 to 450 MHz amateur band."),
("What is the approximate wavelength of a 7.15 MHz signal?",
 "42 metres", ["21 metres", "7 metres", "84 metres"],
 "Wavelength in metres is about 300 divided by the frequency in MHz: 300 / 7.15 = about 42 m. Halving that gives the 21 m length of a half wave."),
("A signal has a wavelength of 10.4 metres. Its frequency is closest to:",
 "28.8 MHz", ["3.12 MHz", "14.4 MHz", "57.7 MHz"],
 "Frequency in MHz is about 300 divided by the wavelength in metres: 300 / 10.4 = about 28.8 MHz, inside the 10 m band."),
]
