CAT = "nzhamInterference"; SEG = "EMC"
# NZART Study Guide topics 29 (interference and filtering) and 30 (digital systems).
# Numbers computed and asserted. See sources.md.

fs = 2 * 3.4; assert abs(fs - 6.8) < 1e-9
levels = 2 ** 8; assert levels == 256
levels10 = 2 ** 10; assert levels10 == 1024

Q = [
("A neighbour's TV is swamped whenever you transmit on HF, but your signal has no harmonics. What usually cures it?",
 "A high-pass filter at the TV", ["A low-pass filter at the TV", "More power from your station", "A longer TV antenna lead"],
 "The TV's front end is being overloaded by your fundamental signal. A high-pass filter at the TV input stops HF while passing the higher TV frequencies."),
("Your transmitter's harmonics are being heard by others. Where should the filter go?",
 "At the transmitter output", ["At the receiver input", "In the mains lead only", "In the microphone lead at the radio"],
 "Harmonics are generated in your transmitter, so they must be filtered with a low-pass filter at its output before they reach the antenna."),
("A neighbour hears your voice from their stereo speakers. What is the usual cause?",
 "Audio rectification of your signal", ["Harmonics from your transmitter", "A fault in their power supply", "Their radio is on your frequency"],
 "Long speaker or input leads pick up RF and a transistor rectifies it, recovering your audio. Ferrite chokes and bypass capacitors on the leads usually cure it."),
("RF is flowing on the outside of your coax shield into the shack. What helps stop it?",
 "A ferrite choke on the coax", ["A longer coax feed line", "A higher transmitter power", "A high-pass filter at the radio"],
 "Common-mode current on the outer shield can be choked off with ferrite cores or a coiled choke near the feed point, and a balun helps with a dipole."),
("A neighbour complains of interference that they say comes from you. What is a good first step?",
 "Check your station with a dummy load", ["Refuse to discuss it", "Raise your power to test it", "Change your callsign to a new one"],
 "Transmitting into a dummy load shows whether the problem follows your radiated signal or something else, such as a fault in your own equipment."),
("Interference shows on many channels of a TV only when you transmit. Which is most likely?",
 "Overload of the TV's front end", ["A fault in the TV's speaker", "Your power supply is faulty", "A loose plug somewhere in your shack"],
 "Strong signals near a receiver can overload its first stages even when the transmitter is clean, so filtering at the receiver is the fix."),
("How does good station earthing help with interference?",
 "It gives RF currents a short path", ["It doubles the transmit power", "It removes all harmonics", "It changes the operating band"],
 "A short, solid RF earth keeps RF off the equipment cases and mains wiring, which reduces RF in the shack and interference to nearby electronics."),
("Speech up to 3.4 kHz is to be sampled for digital transmission. What minimum sampling rate does the Nyquist rule give?",
 f"{fs:g} kHz", ["3.4 kHz", "1.7 kHz", "13.6 kHz"],
 "The sampling rate must be at least twice the highest frequency (the Nyquist rate): 2 x 3.4 = 6.8 kHz. Sampling more slowly produces aliasing."),
("How many different levels can an 8-bit analogue to digital converter represent?",
 f"{levels}", ["8", "64", "512"],
 "Each bit doubles the number of levels, so 8 bits give 2 to the power 8, which is 256."),
("How many different levels can a 10-bit converter represent?",
 f"{levels10}", ["100", "512", "2048"],
 "10 bits give 2 to the power 10, which is 1024 levels, four times as many as an 8-bit converter."),
("What kind of modulation does RTTY normally use?",
 "Frequency shift keying", ["Amplitude modulation", "Pulse width modulation", "Single sideband voice"],
 "RTTY sends each bit as one of two tones or frequencies, mark and space, which is frequency shift keying (FSK)."),
("Why do many digital modes add error-checking data to each block they send?",
 "To find and fix corrupted bits", ["To raise the signal power", "To hide what is being sent", "To shorten the callsign sent each time"],
 "Checksums and error-correcting codes let the receiver detect, and often correct, bits damaged by noise or fading. They are not encryption, which the GURL forbids."),
]
