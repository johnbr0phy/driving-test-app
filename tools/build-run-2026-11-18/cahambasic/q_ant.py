CAT = "cahamAntennas"; SEG = "ANT"
# RIC-3 Basic syllabus 5.1.6 (Feedlines and Antenna Systems, topics 6-1 to 6-13). Lengths use
# the formulas on ISED's Reference Material for Amateur Radio Exam, Basic Qualification
# (May 2025): wavelength 300/F, half-wave wire 142/F, quarter-wave 71/F, loop 306/F, with F
# in MHz and lengths in metres. Every numeric key is computed and asserted here.

def r1(x):
    return round(x, 1)

W1 = 300 / 432; assert round(W1 * 100) == 69          # 70 cm band, wavelength in cm
F2 = 300 / 160; assert abs(F2 - 1.875) < 1e-9
H3 = 142 / 7.1; assert r1(H3) == 20.0
assert r1(71 / 7.1) == 10.0 and r1(300 / 7.1) == 42.3 and r1(306 / 7.1) == 43.1
Q4 = 71 / 14.2; assert r1(Q4) == 5.0
assert r1(142 / 14.2) == 10.0 and r1(300 / 14.2) == 21.1
L5 = 306 / 28.5; assert r1(L5) == 10.7
assert r1(300 / 28.5) == 10.5 and r1(142 / 28.5) == 5.0

Q = [
("A feed line's characteristic impedance is set mainly by its:",
 "Conductor size and spacing", ["Total length in metres", "Frequency of operation", "Transmitter output power"],
 "Characteristic impedance depends on the conductors' sizes, their spacing and the insulation between them. It does not change with the line's length."),
("Twin-lead and ladder line are examples of:",
 "Balanced feed line", ["Unbalanced feed line", "Hollow waveguide", "Coaxial cable"],
 "Twin-lead and ladder line have two identical conductors carrying equal and opposite currents, so they are balanced. Coax, with a centre conductor inside a shield, is unbalanced."),
("A balun is used to connect:",
 "Coax to a balanced load", ["Two coax runs end to end", "A dipole to its mast", "An amplifier to a tuner"],
 "Balun means balanced to unbalanced. It joins unbalanced coax to a balanced load such as a centre-fed dipole and keeps current off the outside of the shield."),
("Which coaxial connector gives the lowest loss at UHF?",
 "Type N", ["PL-259 (UHF type)", "RCA phono plug", "Banana plug"],
 "The Type N connector keeps a constant impedance and works well into the GHz range. Despite its name, the PL-259 UHF connector performs poorly above about 300 MHz."),
("Doubling the length of a coax run doubles its:",
 "Loss in decibels", ["Characteristic impedance", "Velocity factor", "Power rating"],
 "Line loss is quoted in dB per unit length, so twice the length gives twice the dB of loss. Impedance and velocity factor do not depend on length."),
("Which coaxial connector is common on small handheld transceivers?",
 "SMA", ["Type N", "PL-259", "F-type"],
 "Handhelds commonly use the small threaded SMA connector. Type N and PL-259 are larger connectors for base stations, and F-type is the cable TV connector."),
("An SWR of 1:1 on a feed line means:",
 "The load matches the line", ["Half the power is reflected", "The power is doubled", "The antenna is non-resonant"],
 "A 1:1 standing wave ratio means the load impedance equals the line's characteristic impedance, so no power is reflected back toward the transmitter."),
("What causes a high SWR on a feed line?",
 "Mismatched load impedance", ["Too much transmitter power", "A long ground lead", "A very short feed line"],
 "Standing waves form when the load does not match the line, so part of the power reflects. Raising power does not change the ratio."),
("An antenna tuner between the transmitter and feed line changes the:",
 "Impedance seen by the radio", ["Antenna's resonant frequency", "Antenna's radiation pattern", "Feed line's loss"],
 "A tuner transforms the impedance at the transmitter end so the transmitter sees a good match. It does not make the antenna itself resonant or change its pattern."),
("An isotropic antenna radiates:",
 "Equally in all directions", ["Mostly broadside to the wire", "Equally around the horizon", "With vertical polarization only"],
 "An isotropic source is a theoretical point radiating equally in every direction in three dimensions. A vertical radiates equally around the horizon, which is different."),
("Antenna gain given in dBi is compared with:",
 "An isotropic radiator", ["A half-wave dipole", "A quarter-wave vertical", "A 50 ohm load"],
 "The i in dBi stands for isotropic. Gain compared with a half-wave dipole is written dBd."),
("A Yagi with its elements mounted horizontally produces:",
 "Horizontal polarization", ["Vertical polarization", "Circular polarization", "Mixed polarization"],
 "An antenna's polarization follows the orientation of its elements, so horizontal elements give horizontal polarization."),
("What is the wavelength of a 432 MHz signal?",
 "About 69 cm", ["About 1.44 m", "About 35 cm", "About 6.9 cm"],
 "Wavelength = 300 / F = 300 / 432 = 0.694 m, about 69 cm. Dividing 432 by 300 gives 1.44, a common slip."),
("A wavelength of 160 m corresponds to what frequency?",
 "1.875 MHz", ["18.75 MHz", "0.533 MHz", "1.6 MHz"],
 "F = 300 / wavelength = 300 / 160 = 1.875 MHz, which is in the 160 m band (1.800 to 2.000 MHz)."),
("Using the ISED formula, a half-wave dipole for 7.1 MHz is about:",
 "20.0 m long", ["10.0 m long", "42.3 m long", "43.1 m long"],
 "A half-wave wire is 142 / F = 142 / 7.1 = 20.0 m. 10.0 m is the quarter-wave result (71 / F) and 42.3 m is a full free-space wavelength."),
("Using the ISED formula, a quarter-wave vertical for 14.2 MHz is about:",
 "5.0 m long", ["10.0 m long", "21.1 m long", "2.5 m long"],
 "A quarter-wave wire is 71 / F = 71 / 14.2 = 5.0 m. 10.0 m would be a half wave and 21.1 m a full wavelength."),
("Using the ISED formula, a full-wave quad loop for 28.5 MHz needs a total wire length of about:",
 "10.7 m", ["10.5 m", "5.0 m", "2.5 m"],
 "A full-wave loop is 306 / F = 306 / 28.5 = 10.7 m, a little longer than the free-space wavelength of 10.5 m from 300 / F."),
("Why is a practical half-wave dipole cut shorter than half a free-space wavelength?",
 "Capacitive end effects", ["The coax lengthens the wave", "The ground raises its frequency", "The balun adds a quarter wave"],
 "Capacitance at the wire ends and the wire's thickness make it act electrically longer, so it is cut about 5% short. That is why the formula uses 142 instead of 150."),
("A horizontal half-wave dipole in free space radiates most strongly:",
 "Broadside to the wire", ["Off both ends", "Straight up only", "Equally in all directions"],
 "A half-wave dipole's pattern is a figure eight, with maximum radiation at right angles to the wire and nulls off its ends."),
("The radials of a quarter-wave ground-plane antenna act as its:",
 "Artificial ground", ["Directors", "Loading coils", "Common-mode chokes"],
 "The sloping or horizontal radials form the missing half of the antenna, an artificial ground plane, so the vertical needs no real earth below it."),
("On a Yagi-Uda antenna, the directors are:",
 "Shorter than the driven one", ["Longer than the driven element", "Fed by their own coax", "As long as the reflector"],
 "Directors are slightly shorter than the driven element and sit in front of it, in the direction of maximum radiation. The reflector is longer and behind."),
("Adding more directors to a Yagi generally:",
 "Raises gain, narrows the beam", ["Lowers gain, widens the beam", "Changes it to vertical polarization", "Raises its resonant frequency only"],
 "Each added director, on a longer boom, concentrates more energy forward, raising gain and narrowing the beamwidth."),
("Each element of a cubical quad antenna is a loop about:",
 "One wavelength around", ["Half a wavelength around", "A quarter wavelength around", "Two wavelengths around"],
 "A quad uses loops about one wavelength in circumference, which is why ISED's loop formula, 306 / F, is close to a full wavelength."),
("An antenna's bandwidth is the range of frequencies over which:",
 "Its SWR stays acceptable", ["It radiates its harmonics", "Its gain exceeds 10 dBi", "Its feed line is lossless"],
 "Bandwidth is the span in which the antenna keeps an acceptable match, usually given as the range where SWR stays below a set figure such as 2:1."),
]
