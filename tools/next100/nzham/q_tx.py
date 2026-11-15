CAT = "nzhamTransmitters"; SEG = "TX"
# NZART Study Guide topics 18 (transmitter block diagrams), 19 (transmitter theory) and
# 20 (harmonics and parasitics). Numbers computed and asserted. See sources.md.

m5 = 48.25 * 3; assert abs(m5 - 144.75) < 1e-9
h7 = 7.05 * 3; assert abs(h7 - 21.15) < 1e-9
h7b = 3.55 * 2; assert abs(h7b - 7.1) < 1e-9
eff = 100 / 160 * 100; assert abs(eff - 62.5) < 1e-9
bw = 2 * (2.5 + 3); assert abs(bw - 11) < 1e-9
heat = 160 - 100; assert heat == 60

Q = [
("In an SSB transmitter, what does the balanced modulator remove?",
 "The carrier", ["Both sidebands", "The audio", "The harmonics"],
 "A balanced modulator gives two sidebands with the carrier suppressed. A filter after it removes one sideband to leave SSB."),
("In an SSB transmitter, what does the sideband filter do?",
 "Removes the unwanted sideband", ["Removes the carrier", "Removes harmonics", "Removes hum from the audio stage"],
 "After the balanced modulator, the filter passes one sideband and rejects the other, so only a single sideband is transmitted."),
("In an FM transmitter, what does the audio change?",
 "The carrier's frequency", ["The carrier's amplitude", "The number of sidebands", "The output power"],
 "In frequency modulation the carrier's frequency swings above and below its centre with the audio, while its amplitude stays constant."),
("In an AM transmitter, what does the audio change?",
 "The carrier's amplitude", ["The carrier's frequency", "The carrier's phase only", "The power supply voltage"],
 "Amplitude modulation varies the strength of the carrier in step with the audio, producing two sidebands either side of it."),
("A 2 m FM transmitter multiplies a 48.25 MHz oscillator by three. What is its output frequency?",
 f"{m5:g} MHz", ["96.5 MHz", "16.08 MHz", "51.25 MHz"],
 "A tripler gives 3 x 48.25 = 144.75 MHz, inside the 2 m band. Multiplying by two gives 96.5 MHz."),
("What is the purpose of a buffer stage after a transmitter's oscillator?",
 "To isolate the oscillator from loading", ["To raise the output power", "To multiply the frequency", "To filter out the harmonics it makes"],
 "A buffer stops changes in the following stages from pulling the oscillator off frequency, which keeps it stable."),
("A transmitter on 7.05 MHz has a strong third harmonic. On what frequency is it?",
 f"{h7:g} MHz", ["14.1 MHz", "10.05 MHz", "2.35 MHz"],
 "The third harmonic is three times the fundamental: 3 x 7.05 = 21.15 MHz. 14.1 MHz is the second harmonic."),
("A transmitter on 3.55 MHz radiates its second harmonic. Where does it fall?",
 f"{h7b:g} MHz", ["10.65 MHz", "1.775 MHz", "5.55 MHz"],
 "The second harmonic is twice the fundamental: 2 x 3.55 = 7.1 MHz, which lands in the 40 m band."),
("Which filter, fitted at a transmitter's output, best reduces its harmonics?",
 "A low-pass filter", ["A high-pass filter", "A notch at the fundamental", "An audio filter"],
 "Harmonics are above the operating frequency, so a low-pass filter passes the wanted signal and attenuates them. A high-pass filter does the reverse."),
("What are parasitic oscillations in a transmitter?",
 "Unwanted oscillations in a stage", ["Harmonics of the operating frequency", "Normal sidebands of the signal", "Hum from the power supply"],
 "Parasitics are unintended self-oscillations, often at frequencies unrelated to the one in use. They waste power and cause interference."),
("What is the likely result of too much microphone gain on SSB?",
 "Splatter onto nearby frequencies", ["Reduced output power", "A cleaner, louder signal on the air", "A drift in frequency"],
 "Overdriving the transmitter distorts the signal and spreads it wider than it should be, causing splatter. NZART's notes warn against excess audio drive or compression."),
("What causes key clicks on a Morse signal?",
 "Keying edges that are too sharp", ["Keying that is too slow", "A low-pass filter at the output", "A weak power supply"],
 "Switching the carrier on and off too abruptly creates wide sidebands heard as clicks either side. Shaping the rise and fall times cures them."),
("A power amplifier gives 100 W of RF from 160 W of DC input. What is its efficiency?",
 f"{eff:g}%", ["160%", "37.5%", "60%"],
 "Efficiency = output / input x 100 = 100 / 160 x 100 = 62.5%. The other 60 W becomes heat."),
("Why must an SSB transmitter use a linear amplifier?",
 "To amplify without distortion", ["To raise the carrier level", "To keep its harmonics high", "To lower its power drain"],
 "An SSB signal's amplitude varies with the speech, so the amplifier must reproduce it faithfully. A non-linear (Class C) stage would distort it and spread it in frequency."),
("By Carson's rule, about what bandwidth does an FM signal with 2.5 kHz deviation and 3 kHz audio take?",
 f"{bw:g} kHz", ["5.5 kHz", "7.5 kHz", "3 kHz"],
 "Carson's rule gives bandwidth = 2 x (deviation + highest audio) = 2 x (2.5 + 3) = 11 kHz."),
("What does the automatic level control (ALC) in a transmitter do?",
 "Stops the amplifier being overdriven", ["Sets the operating frequency", "Turns the receiver off during transmit", "Raises the audio bandwidth"],
 "ALC feeds back a voltage that reduces the drive when the output stage nears its limit, which keeps the signal clean."),
]
