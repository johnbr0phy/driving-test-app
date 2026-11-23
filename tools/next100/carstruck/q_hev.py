CAT = "rsttmHybridEv"; SEG = "HEV"
Q = [
("What does pulling a hybrid truck's high-voltage service disconnect do?",
 "Breaks the battery pack circuit", ["Discharges the 12 V batteries", "Locks the traction motor", "Turns off the cab display"],
 "The service disconnect splits the high-voltage battery circuit so the pack can no longer feed the system. Capacitors still need time to discharge, and the circuit is verified dead with a meter."),
("After the service disconnect is removed on an EV, what confirms the high-voltage side is dead?",
 "A zero meter reading", ["The dash going dark", "The key being removed", "The 12 V battery unplugged"],
 "After isolating and waiting the OEM's time, verify zero voltage with a CAT-rated meter checked on a known source before and after."),
("Why is a hybrid truck's battery pack temperature controlled?",
 "Heat shortens its life", ["To heat the cab", "To lower its voltage", "To speed up charging alone"],
 "Lithium-ion cells work best in a narrow temperature range. The battery management system controls cooling and heating to protect capacity and life."),
("What does regenerative braking do on an electric truck?",
 "Recharges the battery", ["Applies the spring brakes", "Cools the motor", "Engages the ABS"],
 "The traction motor works as a generator when slowing, turning motion back into stored energy and reducing service brake wear."),
]
