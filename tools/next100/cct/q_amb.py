CAT = "cctAmbulatory"; SEG = "AMB"
# Performing Ambulatory Monitoring (4% of the CCT exam): task list D1-D4.
# Source: 2017 ISHNE-HRS expert consensus statement on ambulatory ECG and external cardiac
# monitoring/telemetry.
Q = [
("Traditional Holters are worn for 1 to 2 days. How long can some newer Holter-type recorders run?",
 "Up to 30 days", ["Up to 6 hours", "Up to 6 months", "Up to 3 years"],
 "The ISHNE-HRS statement notes that some newer continuous recorders permit recording periods of up to 30 consecutive days."),
("Which ambulatory device can record for as long as 36 months?",
 "Implantable loop recorder", ["Patch monitor", "Mobile cardiac telemetry", "Post-event recorder"],
 "In the ISHNE-HRS table, only the implantable loop recorder covers recording periods of up to 36 months."),
("Which device saves the rhythm from just before the patient presses the button?",
 "External loop recorder", ["Post-event recorder", "Exercise console", "Signal-averaged ECG"],
 "Loop recorders keep a rolling memory, so a button press or autotrigger stores the 'prior-to-event to postevent' strip. Post-event recorders capture only after activation."),
("What sets mobile cardiac telemetry apart from a standard Holter?",
 "Real-time transmission of events", ["It records only while awake", "It needs no skin electrodes", "It outputs a wired 12-lead"],
 "MCT devices stream or transmit events wirelessly to a reading center in near real time; a Holter is analyzed only after it is returned."),
("A standard Holter recorder most often records how many independent leads?",
 "2 or 3 channels", ["1 channel", "6 channels", "15 channels"],
 "Ambulatory recorders typically use 2-channel or 3-channel formats, though 12-channel and EASI formats exist."),
("A Holter shows a 4-second 'pause' in one channel while the other channel shows steady QRS complexes. Most likely cause?",
 "Recording artifact", ["Sinus arrest", "Complete heart block", "Pacemaker failure"],
 "A true pause appears in every channel. ISHNE-HRS notes recording artifacts can create pseudo-pauses, recognized by comparing simultaneous channels."),
("Why are Holter lead wires taped in a small stress loop near each electrode?",
 "To absorb pull on the wire", ["To shorten the recording", "To mark the lead colors", "To boost the signal gain"],
 "A loop of slack, taped down, takes the strain of movement so the electrode stays in contact and motion artifact is reduced."),
("Before sending a Holter patient home, how is the recorder checked?",
 "View a live strip on every channel", ["Print a full 12-lead tracing", "Weigh the battery on a scale", "Run it on the treadmill first"],
 "Function is verified at hookup by viewing a clean test signal on every channel, so a bad electrode is fixed before 24 hours are lost."),
]
