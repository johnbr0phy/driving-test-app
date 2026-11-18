CAT = "cahamInterference"; SEG = "EMC"
# RIC-3 Basic syllabus 5.1.8 (Interference and Suppression, topics 8-1 to 8-5): front-end
# overload, cross-modulation, audio rectification, bypass capacitors and ferrites,
# intermodulation, key clicks, harmonics, splatter and filters. See sources.md.

F = 50.125
H2 = 2 * F
assert abs(H2 - 100.25) < 1e-9
assert abs(F / 2 - 25.0625) < 1e-9 and abs(3 * F - 150.375) < 1e-9 and abs(1.5 * F - 75.1875) < 1e-9

Q = [
("A strong nearby signal swamps a receiver's first stage and blocks weaker signals. This is:",
 "Front-end overload", ["Image response", "Key clicks", "Audio rectification"],
 "When a very strong signal drives the RF amplifier or mixer beyond its range, the receiver desensitizes and blocks other signals. A filter or attenuator ahead of it helps."),
("You hear an unwanted station's modulation on top of every signal you tune. This is:",
 "Cross-modulation", ["Front-end overload", "Harmonic radiation", "Splatter"],
 "Cross-modulation happens when a strong signal's modulation is impressed on wanted signals in an overloaded stage, so it rides along on everything you tune."),
("Your voice is heard from a neighbour's stereo even with the volume at zero. The likely cause is:",
 "Audio rectification", ["Harmonic radiation", "Transmitter splatter", "Intermodulation"],
 "A transistor junction in the stereo's audio circuit rectifies your RF and recovers the audio. The signal reaches it through speaker leads or cables acting as antennas."),
("A common cure for audio rectification in a neighbour's stereo is:",
 "Ferrite chokes on its speaker leads", ["A high-pass filter on your antenna", "A lower volume setting on the stereo", "A low-pass filter on its mains plug"],
 "Ferrite chokes and bypass capacitors keep RF out of the audio circuits. A filter at your antenna cannot help, since your signal is legitimate."),
("Small bypass capacitors across an amplifier's audio inputs reduce RF pickup by:",
 "Shunting RF to ground", ["Raising the audio gain", "Blocking the DC supply", "Tuning the input to RF"],
 "A small capacitor has low reactance at radio frequencies but high reactance at audio, so it diverts RF to ground while leaving the audio alone."),
("Two strong signals mix in a receiver and create false signals on other frequencies. This is:",
 "Intermodulation", ["Cross-modulation", "Key clicks", "Splatter"],
 "Intermodulation products appear at sums and differences of the two signals and their multiples, so you hear signals where nobody is transmitting."),
("Key clicks heard either side of a Morse signal are caused by:",
 "Too-sharp keying edges", ["Too much speech compression", "A low SWR on the line", "Sending Morse too slowly"],
 "Switching the carrier on and off too abruptly creates wide sidebands heard as clicks. Shaping the rise and fall of each element cures them."),
("A 6 m transmitter on 50.125 MHz has its second harmonic at:",
 "100.25 MHz", ["25.0625 MHz", "150.375 MHz", "75.1875 MHz"],
 "The second harmonic is twice the fundamental: 2 x 50.125 = 100.25 MHz, inside the FM broadcast band. 150.375 MHz is the third harmonic."),
("Splatter heard either side of an SSB signal is usually caused by:",
 "Overdriving the transmitter", ["Too little microphone gain", "A low-pass filter at the output", "A well-matched antenna"],
 "Too much audio drive or compression pushes the amplifier into non-linear operation, which spreads the signal well beyond its normal bandwidth."),
("To keep your transmitter's harmonics out of VHF receivers nearby, fit a:",
 "Low-pass filter at the transmitter", ["High-pass filter at the transmitter", "Low-pass filter at each receiver", "Band-pass filter at each receiver"],
 "Harmonics are above the operating frequency, so a low-pass filter at the transmitter output passes the wanted signal and removes them before they are radiated."),
("A filter at a TV antenna input that blocks your HF signals while passing TV channels is a:",
 "High-pass filter", ["Low-pass filter", "Audio filter", "Band-pass HF filter"],
 "A high-pass filter passes frequencies above its cutoff, the TV channels, and rejects the lower HF signals that overload the TV's front end."),
("To stop one strong 2 m signal from overloading a scanner while passing others, use a:",
 "Band-reject (notch) filter", ["Low-pass filter", "High-pass filter", "Ferrite bead on the power cord"],
 "A band-reject or notch filter removes a narrow range of frequencies and passes everything else, so the scanner hears other bands normally."),
]
