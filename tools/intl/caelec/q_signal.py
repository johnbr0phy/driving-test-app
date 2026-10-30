# caelecSignal: RSOS MWA E, signalling and communication systems (fire alarm and
# other signalling, communication cabling, integrated building controls).
# 20 items, 5 per test, written by task and interleaved round-robin.
# Tuple: (stem, key, wrong1, wrong2, wrong3, explanation)

SIGNALLING = [
("Which standard covers the installation of fire alarm systems in Canada?",
 "CAN/ULC-S524", "CAN/ULC-S536", "CAN/ULC-S531", "CSA C22.2 No. 141",
 "CAN/ULC-S524 is the installation standard. S536 covers inspection and testing, S537 verification, and S531 smoke alarms."),
("Which standard covers the periodic inspection and testing of fire alarm systems?",
 "CAN/ULC-S536", "CAN/ULC-S524", "CAN/ULC-S537", "CSA Z462",
 "CAN/ULC-S536 sets the inspection and testing of existing fire alarm systems. S537 is the verification of a new or altered system."),
("On a Class B initiating circuit, how does the fire alarm panel detect an open wire?",
 "Through an end-of-line resistor", "Through a ground detector", "By polling each device", "Through the battery charger",
 "A small supervisory current flows through the end-of-line resistor. An open wire stops it and the panel shows a trouble signal."),
("What advantage does a Class A circuit have over a Class B circuit?",
 "Devices work past one open", "It needs no supervision", "It uses fewer conductors", "It costs less to install",
 "A Class A circuit loops back to the panel, so it is fed from both ends and devices beyond a single open still work. It needs more wire, not less."),
("In a two-stage fire alarm system, the first stage sounds:",
 "An alert signal", "The evacuation signal", "Only the sprinkler bell", "Nothing at all",
 "Stage one sounds an alert signal for staff to investigate. The alarm (evacuation) signal follows automatically after a set time or by manual action."),
("The alarm (evacuation) signal of a Canadian fire alarm system uses which pattern?",
 "Temporal-3", "A continuous tone", "March time", "A slow whoop",
 "The evacuation signal is the temporal-3 pattern: three pulses, a pause, repeated. It is the same pattern used by residential smoke alarms."),
("What is the difference between a smoke alarm and a smoke detector?",
 "An alarm has its own sounder", "A detector has its own sounder", "An alarm senses only heat", "A detector runs only on batteries",
 "A smoke alarm (CAN/ULC-S531) senses smoke and sounds by itself. A smoke detector (CAN/ULC-S529) only signals a fire alarm control unit."),
("In a new house with several smoke alarms, how must they be connected?",
 "Interconnected so all sound", "On separate branch circuits", "On batteries only", "Through a GFCI",
 "The building code requires the smoke alarms in a dwelling unit to be interconnected so one alarm sounds them all. Exact supply rules vary by province."),
("A closed sprinkler control valve reports to the fire alarm panel as a:",
 "Supervisory signal", "Trouble signal", "Alarm signal", "Alert signal",
 "A valve tamper switch sends a supervisory signal: an abnormal condition in the fire protection system. Trouble signals are faults in the alarm system's own wiring or power."),
("An open wire on a supervised initiating circuit produces a:",
 "Trouble signal", "Supervisory signal", "Alarm signal", "Pre-alarm signal",
 "Faults in the fire alarm system itself, such as opens, ground faults or power loss, give a trouble signal. Supervisory signals are for sprinkler and other monitored equipment."),
]

COMMS = [
("What is the maximum length of a horizontal permanent link in twisted-pair Ethernet cabling?",
 "90 m", "100 m", "55 m", "150 m",
 "The permanent link is limited to 90 m. Adding up to 10 m of patch and equipment cords gives the 100 m channel."),
("When terminating Category 6 cable, how much may each pair be untwisted?",
 "13 mm", "25 mm", "50 mm", "6 mm",
 "Keep pair twists to within 13 mm (0.5 in) of the termination. More untwist raises crosstalk and can fail certification."),
("What is the difference between the T568A and T568B wiring schemes?",
 "Orange and green pairs swap", "Blue and brown pairs swap", "A uses 2 pairs, B uses 4", "B is for fibre only",
 "The two schemes differ only in that the orange and green pairs trade places. Both use all four pairs and perform the same."),
("Which fibre type suits the longest runs between buildings?",
 "Single-mode", "Multimode OM1", "Multimode OM3", "Plastic optical",
 "Single-mode fibre has a very small core and carries light over many kilometres. Multimode fibre is limited to shorter distances at high data rates."),
("Which instrument locates a break along a fibre-optic cable?",
 "OTDR", "Tone generator", "Megohmmeter", "Wiremap tester",
 "An optical time-domain reflectometer sends pulses down the fibre and times the reflections to show the distance to breaks, splices and connectors."),
("Why are data cables kept apart from power wiring?",
 "To reduce induced noise", "To lower power losses", "To meet colour codes", "To save conduit fill",
 "Power conductors induce noise into data cabling. Separation or barriers also keep power voltages off the communication system, as the CEC requires."),
]

INTEGRATED = [
("Which open protocol, developed by ASHRAE, is widely used for building automation?",
 "BACnet", "DALI", "Modbus", "Zigbee",
 "BACnet is the ASHRAE standard protocol for building automation and control. DALI is for lighting control and Modbus is an older industrial protocol."),
("In 0-10 V lighting control, what does 10 V on the control pair mean?",
 "Full light output", "Fixture off", "Half output", "Emergency mode",
 "In 0-10 V dimming, 10 V calls for full output and the level falls as voltage drops. Most drivers reach minimum output near 1 V rather than switching off."),
("How many control gear addresses can one DALI line support?",
 "64", "16", "128", "256",
 "A DALI line supports 64 short addresses for control gear, which can also be grouped into 16 groups."),
("When the fire alarm activates, a building automation system typically:",
 "Shuts down air-handling fans", "Starts every air handler", "Turns off emergency lighting", "Locks all exit doors",
 "Unless a fan is part of a smoke control system, air handlers shut down on alarm so they do not spread smoke. Exit doors with electromagnetic locks release."),
]

GROUPS = [SIGNALLING, COMMS, INTEGRATED]
ITEMS = []
while any(GROUPS):
    for g in GROUPS:
        if g:
            ITEMS.append(g.pop(0))
