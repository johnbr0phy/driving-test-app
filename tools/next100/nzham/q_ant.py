CAT = "nzhamAntennas"; SEG = "ANT"
# NZART Study Guide topics 26 (transmission lines) and 27 (antennas). Numbers computed and
# asserted. See sources.md.
import math

hw1 = 300 / 14.2 / 2; assert round(hw1, 1) == 10.6
qw2 = 300 / 432 / 4; assert round(qw2 * 100) == 17
el4 = 300 / 7.0 / 2 * 0.66; assert round(el4, 1) == 14.1
swr10 = 100 / 50; assert swr10 == 2
swr11 = 50 / 25; assert swr11 == 2
erp18 = 100 * 10 ** ((6 - 3) / 10); assert round(erp18) == 200
qt19 = math.sqrt(50 * 200); assert abs(qt19 - 100) < 1e-9

Q = [
("About how long is a half-wave dipole cut for 14.2 MHz?",
 "About 10 m", ["About 20 m", "About 5 m", "About 40 m"],
 f"A full wavelength is 300 / 14.2, about 21.1 m, so half is about {hw1:.1f} m. In practice the wire is trimmed a few percent shorter, to about 10 m."),
("About how long is a quarter-wave vertical whip for 432 MHz?",
 "About 17 cm", ["About 35 cm", "About 69 cm", "About 9 cm"],
 "A wavelength at 432 MHz is 300 / 432, about 0.69 m, and a quarter of that is about 0.17 m, or 17 cm."),
("About what is the feed impedance of a half-wave dipole in free space?",
 "About 70 Ω", ["About 300 Ω", "About 600 Ω", "About 25 Ω"],
 "A centre-fed half-wave dipole is about 73 Ω in free space, so it is a fair match for 50 Ω or 75 Ω coax. A folded dipole is about 300 Ω."),
("Coax with a velocity factor of 0.66 is used to make an electrical half wavelength at 7 MHz. About how long is the cable?",
 f"About {el4:.1f} m", ["About 21.4 m", "About 32.5 m", "About 10.7 m"],
 "Half a wavelength in free space is 300 / 7 / 2, about 21.4 m. Signals travel slower in the cable, so multiply by 0.66 to get about 14.1 m."),
("About what is the feed impedance of a folded dipole?",
 "About 300 Ω", ["About 70 Ω", "About 50 Ω", "About 1000 Ω"],
 "Folding a half-wave dipole raises its feed impedance about four times, from roughly 73 Ω to about 300 Ω, which suits ribbon line."),
("In a Yagi antenna, how does the reflector compare with the driven element?",
 "It is a little longer", ["It is a little shorter", "It is exactly the same", "It is half the length"],
 "The reflector is slightly longer than the driven element and sits behind it; directors are slightly shorter and sit in front, toward the direction of radiation."),
("A Yagi's gain is quoted in dBd. What is it compared with?",
 "A half-wave dipole", ["An isotropic radiator", "A quarter-wave whip", "A dummy load"],
 "dBd means decibels relative to a half-wave dipole. dBi is relative to an isotropic radiator, which is about 2.15 dB below a dipole."),
("What does an isotropic radiator do?",
 "Radiates equally in all directions", ["Radiates only straight up", "Radiates only broadside", "Radiates only in one chosen direction"],
 "An isotropic radiator is an imaginary point source used as a reference: it sends the same power in every direction."),
("What is a balun used for?",
 "Joining balanced to unbalanced", ["Joining two coax lines", "Measuring the SWR", "Tuning a trap dipole to two bands"],
 "A balun (balanced to unbalanced) lets unbalanced coax feed a balanced antenna such as a dipole without current flowing on the outside of the coax."),
("A 100 Ω resistive load is connected to a 50 Ω line. What is the SWR?",
 f"{swr10:g}:1", ["1:1", "4:1", "1.5:1"],
 "For a resistive load, SWR is the larger impedance divided by the smaller: 100 / 50 = 2, so 2:1."),
("A 25 Ω resistive antenna is fed with 50 Ω coax. What is the SWR?",
 f"{swr11:g}:1", ["0.5:1", "1.25:1", "25:1"],
 "Divide the larger impedance by the smaller: 50 / 25 = 2, so 2:1. SWR is never less than 1:1."),
("What happens on a feed line when the antenna's impedance does not match it?",
 "Some power is reflected back", ["The frequency shifts upward", "The line becomes balanced", "All power is radiated by the line"],
 "A mismatch reflects part of the power back down the line toward the transmitter, setting up standing waves and raising the SWR."),
("What does it mean when coax has a velocity factor of 0.66?",
 "RF travels at 66% of light speed in it", ["It passes 66% of the power", "Its SWR is 0.66:1", "It is 66% shielded"],
 "Velocity factor is the speed of a signal in the cable compared with free space. It makes an electrical wavelength in coax shorter than in air."),
("Why is open-wire ladder line kept away from metal objects?",
 "They unbalance it and add loss", ["They raise its velocity factor", "They make it radiate less", "They lower its impedance to 50 Ω"],
 "Ladder line has very low loss, but nearby metal disturbs its balanced fields, causing loss and radiation from the line. Coax is shielded, so it is not affected this way."),
("A horizontal dipole produces signals with what polarisation?",
 "Horizontal", ["Vertical", "Circular", "Random"],
 "Polarisation follows the direction of the electric field, which lies along the wires, so a horizontal dipole is horizontally polarised."),
("Why do VHF FM mobile and repeater stations usually use vertical antennas?",
 "Both ends should share polarisation", ["Vertical antennas give more gain", "Horizontal ones cannot fit cars", "Vertical stops all forms of interference"],
 "On VHF, signals keep their polarisation, so mismatched antennas can lose a lot of signal. Mobiles use simple vertical whips, so repeaters and base stations match them."),
("What do traps in a trap dipole allow?",
 "Use on more than one band", ["Higher power on one band", "Lower noise on receive", "A fixed SWR on every band"],
 "Each trap is a tuned circuit that acts like an open switch on one band, cutting off the outer wire, so the dipole resonates on two or more bands."),
("What does a loading coil do in a short antenna?",
 "Makes it electrically longer", ["Makes it electrically shorter", "Raises its feed impedance", "Adds gain like a Yagi"],
 "A loading coil adds inductance so a physically short antenna resonates at a lower frequency, as if it were longer. Some efficiency is lost in the coil."),
("A transmitter gives 100 W into a feed line with 3 dB loss, feeding an antenna with 6 dB gain. What is the effective radiated power?",
 f"{round(erp18)} W", ["400 W", "50 W", "300 W"],
 "The net gain is 6 - 3 = +3 dB, which doubles the power: 100 W becomes 200 W ERP. Ignoring the line loss gives 400 W."),
("A quarter-wave matching section joins a 50 Ω line to a 200 Ω load. What impedance should the section be?",
 f"{round(qt19)} Ω", ["125 Ω", "150 Ω", "250 Ω"],
 "A quarter-wave transformer needs an impedance equal to the square root of the two it joins: square root of (50 x 200) = 100 Ω. 125 Ω is the average, which does not work."),
]
