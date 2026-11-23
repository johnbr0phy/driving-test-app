CAT = "auhamInterference"; SEG = "EMC"
# Source: ACMA Foundation syllabus (February 2024) section 7, Interference; spurious emission
# limits from section 15 of the Amateur Class Licence. Every calculation is computed and asserted.
import math

# Below 30 MHz: attenuation of the lesser of 43 + 10 log(pX) dB and 50 dB.
_hf10 = min(43 + 10 * math.log10(10), 50)
assert _hf10 == 50
_hf2 = min(43 + 10 * math.log10(2), 50)
assert round(_hf2) == 46
# At or above 30 MHz: the lesser of 43 + 10 log(P) dB and 70 dB.
_vhf10 = min(43 + 10 * math.log10(10), 70)
assert _vhf10 == 53

Q = [
("Which of these is a common local source of interference to TV and broadcast radio?",
 "A faulty appliance", ["A well-tuned dipole", "A fresh battery pack", "A receive-only scanner"],
 "The syllabus lists electrical and electronic equipment and high voltage power lines, as well as transmitters, as sources of interference to broadcast reception."),
("Your neighbour's TV shows interference only when you transmit. What does this prove?",
 "Your station is the source", ["Your transmitter must be faulty", "The TV is certainly faulty", "The interference is illegal"],
 "A transmitter can be the source of interference without being its cause. Poor immunity in the affected equipment is often the reason, and technical fixes usually solve it."),
("A transmitter with a fault, such as a bad oscillator, can cause:",
 "Interference to others", ["Better reception for neighbours", "A lower mains voltage", "Stronger ground waves"],
 "The syllabus notes that faulty operation of radio transmitters can cause interference to other services, including broadcast radio and TV."),
("The ability of electronic equipment to work properly near radio transmissions is called its:",
 "Electromagnetic compatibility", ["Receiver selectivity", "Characteristic impedance", "Effective radiated power"],
 "Electromagnetic compatibility (EMC), also called radiofrequency immunity, is how well equipment works without interference in the presence of radio signals."),
("By which two paths does a transmitted signal usually get into nearby equipment?",
 "Mains wiring and direct pickup", ["Speaker cones and the screen", "Water pipes and gas lines", "Phone apps and the Wi-Fi"],
 "The syllabus says interfering signals reach equipment by conduction along mains wiring or by direct pickup by the equipment itself."),
("Which change is least likely to reduce interference to a neighbour's equipment?",
 "Aiming a beam at them", ["Lowering your transmit power", "Moving the antenna further away", "Fitting a filter on their cable"],
 "Interference depends on power, frequency, mode and distance. Pointing more gain at the neighbour raises the field at their equipment."),
("Where should you site an antenna to reduce EMC problems?",
 "Away from house wiring", ["Inside the roof near the TV", "Along the mains wiring", "On the neighbour's fence line"],
 "The syllabus says careful selection and siting of antennas minimises interference from EMC problems."),
("Which mode is more likely to cause objectionable interference to telephones and hi-fi?",
 "SSB", ["FM", "Carrier off", "Receive only"],
 "Some modes are more likely to cause objectionable interference. The varying amplitude of SSB is detected by many audio devices, while FM has a constant amplitude."),
("Where should a filter be fitted to improve an affected TV's immunity?",
 "As close to the TV as possible", ["At your transmitter's microphone", "Halfway along your feed line", "At the electricity meter box"],
 "The syllabus says filters should be fitted as close to the affected device as possible, in the antenna, power or connecting cables."),
("How is a simple RF choke filter made for a speaker lead?",
 "Loop it through a ferrite ring", ["Cut the lead into two halves", "Wrap the lead in kitchen tinfoil", "Coil the lead around a magnet"],
 "Passing several turns of the cable through a ferrite toroid or rod forms a choke that blocks RF current on the cable while passing audio."),
("What is the purpose of an RF earth at an amateur station?",
 "A ground path for RF", ["A backup mains safety earth", "A second antenna feed point", "A lightning-proof switch"],
 "The RF earth gives RF currents a path to ground so they do not enter the mains earth system and interfere with other equipment."),
("A neighbour complains angrily about interference to their sound system. The best first step is:",
 "Listen calmly and offer help", ["Deny any link to your station", "Report them to the police", "Turn your power up to test it"],
 "The syllabus stresses diplomacy in EMC disputes, knowing where to get advice, and the role of the ACMA."),
("Who can give advice and investigate when an interference dispute cannot be settled?",
 "The ACMA", ["The local council", "The ARPANSA", "The electricity retailer"],
 "The ACMA manages the radiofrequency spectrum and can investigate interference. ARPANSA sets the exposure standard."),
("A 10 W pX HF transmitter must keep spurious emissions at least how far below its in-band power?",
 "50 dB", ["53 dB", "43 dB", "70 dB"],
 "Below 30 MHz the class licence requires the lesser of 43 + 10 log(pX) dB and 50 dB. For 10 W that is the lesser of 53 and 50, so 50 dB."),
("On 2 m, a 10 W transmitter must suppress its spurious emissions by at least:",
 "53 dB", ["50 dB", "70 dB", "43 dB"],
 "At 30 MHz and above the limit is the lesser of 43 + 10 log(P) dB and 70 dB. For 10 W, 43 + 10 = 53 dB, which is less than 70."),
("Interference appears on a nearby FM radio only on some of your bands. This fits the rule that EMC problems depend on:",
 "Your transmitting frequency", ["The colour of the coax", "The time zone you are in", "Your call sign's state numeral"],
 "The syllabus says interference from EMC problems may depend on the power, frequency and type of emission of the transmitter and its distance from the equipment."),
]
