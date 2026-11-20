"""Equipment Operation and Maintenance: pumps, motors, power and compressors."""
SEG = "PMP"
CAT = "wtoPumps"

WHP = 600 * 132 / 3960
assert WHP == 20.0
BHP = WHP / 0.80
assert BHP == 25.0
MHP = 600 * 132 / (3960 * 0.80 * 0.90)
assert round(MHP, 1) == 27.8
FT = 52 * 2.31
assert round(FT) == 120
MGD = 1040 / 694
assert round(MGD, 2) == 1.50
WATTS = 240 * 20
assert WATTS == 4800
AMPS = 120 / 12
assert AMPS == 10
KW = 30 * 0.746
assert round(KW, 1) == 22.4
POWER_SHARE = 0.8 ** 3
assert round(POWER_SHARE * 100) == 51
TDH = 15 + 95 + 8
assert TDH == 118

Q = [
    ("In a centrifugal pump, which part adds energy to the water?",
     "Impeller", ["Volute casing", "Packing gland", "Wear ring"],
     "The spinning impeller throws water outward, adding velocity that the volute then turns into pressure."),
    ("Cavitation starts when pressure at the impeller eye falls below the liquid's:",
     "Vapor pressure", ["Shutoff head", "Static head", "Discharge pressure"],
     "DOE's pumping sourcebook explains that below vapor pressure the water boils into bubbles, which collapse violently and pit the impeller."),
    ("Which noise most suggests a pump is cavitating?",
     "Gravel-like rattling", ["Steady low humming", "High squeal at startup", "Single click at shutoff"],
     "Collapsing vapor bubbles sound like gravel or marbles passing through the pump, usually with vibration and lost capacity."),
    ("How is pump packing different from a mechanical seal in normal service?",
     "Packing allows some leakage", ["Packing never needs replacing", "Packing seals with spring faces", "Packing costs more to install"],
     "DOE's sourcebook notes packing is cheaper and used where some leakage is acceptable, while mechanical seals stop leakage more completely but cost more."),
    ("What happens when a positive-displacement pump is run against closed discharge valves?",
     "Pressure keeps rising", ["Flow drops smoothly to zero", "Motor load falls off", "The pump loses prime"],
     "DOE calls this deadheading: pressure rises until a relief valve lifts, a pipe or fitting ruptures or the motor stalls. Metering pumps need relief valves for this reason."),
    ("A diaphragm chemical metering pump moves liquid by:",
     "A fixed volume per stroke", ["Centrifugal force on water", "Venturi jet suction", "Lifting with air bubbles"],
     "Each stroke of the diaphragm moves a fixed volume, which is why stroke length and speed set the feed rate."),
    ("If a centrifugal pump's speed drops by 20 percent, its flow drops by about:",
     "20 percent", ["36 percent", "49 percent", "10 percent"],
     "Under the affinity laws, flow changes in direct proportion to speed. Head changes with speed squared and power with speed cubed."),
    ("Running a pump at 80 percent speed cuts its power draw to roughly what share of full-speed power?",
     "51 percent", ["64 percent", "80 percent", "40 percent"],
     "Power changes with speed cubed: 0.8 x 0.8 x 0.8 = 0.51. That is why slowing a pump with a drive saves so much energy."),
    ("A pump delivers 600 gpm against 132 ft of head. What is the water horsepower?",
     "20.0 hp", ["2.0 hp", "200 hp", "26.7 hp"],
     "Water hp = flow x head / 3,960 = 600 x 132 / 3,960 = 20.0 hp."),
    ("The same 600 gpm, 132 ft pump is 80 percent efficient. What is its brake horsepower?",
     "25.0 hp", ["16.0 hp", "20.0 hp", "31.3 hp"],
     "Brake hp = water hp / pump efficiency = 20.0 / 0.80 = 25.0 hp. Multiplying by 0.80 instead gives 16.0."),
    ("A pump with 20 water hp is 80% efficient and its motor is 90% efficient. What motor hp is needed?",
     "27.8 hp", ["25.0 hp", "18.0 hp", "14.4 hp"],
     "Motor hp = water hp / (pump eff x motor eff) = 20 / (0.80 x 0.90) = 27.8 hp."),
    ("A discharge gauge reads 52 psi. About how many feet of head is that?",
     "120 ft", ["22.5 ft", "52 ft", "240 ft"],
     "1 psi = 2.31 ft of water, so 52 x 2.31 = 120 ft. Multiplying by 0.433 instead gives 22.5."),
    ("A pump runs at a steady 1,040 gpm. About how many MGD is that?",
     "1.50 MGD", ["0.72 MGD", "1.04 MGD", "15.0 MGD"],
     "1 MGD = 694 gpm, so 1,040 / 694 = 1.50 MGD."),
    ("A pump has a 15 ft suction lift, a 95 ft discharge head and 8 ft of friction loss. What is its total dynamic head?",
     "118 ft", ["110 ft", "80 ft", "103 ft"],
     "Total dynamic head = suction lift + discharge head + friction losses = 15 + 95 + 8 = 118 ft."),
    ("A pump with a suction lift keeps losing prime. The most likely cause is:",
     "Air leaks in the suction", ["Discharge valve opened wide", "Motor running too cool", "A clean intake screen"],
     "A leaking suction joint or packing lets air in under vacuum, so the pump loses its water column. Check joints and the foot valve."),
    ("Slow-closing pump control valves on a long force main help prevent:",
     "Water hammer", ["Cavitation", "Air binding", "Motor overheating"],
     "Stopping a moving water column suddenly sends a pressure surge down the line. Valves that open and close slowly limit the surge."),
    ("A DC circuit draws 20 amps at 240 volts. How much power does it use?",
     "4,800 watts", ["12 watts", "260 watts", "2,400 watts"],
     "Watts (DC) = volts x amps = 240 x 20 = 4,800 W. For AC the WPI table also multiplies by the power factor."),
    ("A 120-volt circuit has 12 ohms of resistance. How much current flows?",
     "10 amps", ["1,440 amps", "0.1 amps", "132 amps"],
     "Ohm's law: amps = volts / ohms = 120 / 12 = 10 amps."),
    ("A 30 hp motor is rated at about how many kilowatts?",
     "22.4 kW", ["40.2 kW", "2.24 kW", "746 kW"],
     "1 hp = 0.746 kW, so 30 x 0.746 = 22.4 kW. Dividing by 0.746 instead gives 40.2."),
    ("Worn wear rings in a centrifugal pump mainly cause:",
     "Lost efficiency", ["Higher shutoff head", "Less vibration", "Lower motor temperature"],
     "DOE explains that wider wear ring gaps let water slip from the high-pressure side back to the suction side, so the pump moves less water for the same power."),
    ("Running a pump far to the left of its best efficiency point tends to cause:",
     "Recirculation damage", ["Higher efficiency", "Lower bearing loads", "Cooler, smoother running"],
     "At low flow, water recirculates in the impeller, causing cavitation-like damage, vibration and higher radial loads. DOE notes bearing loads are lowest near BEP."),
    ("Two identical pumps run in parallel into the same header mainly to increase:",
     "Total flow", ["Total head", "Suction lift", "Shaft speed"],
     "Pumps in parallel add their flows at the same head. Pumps in series add head at the same flow."),
    ("An adjustable speed drive saves energy on a pump by:",
     "Matching motor speed to demand", ["Raising motor voltage", "Throttling the discharge valve", "Adding a second impeller"],
     "Instead of burning energy across a throttled valve, a drive slows the motor so the pump makes only the flow and head the system needs."),
    ("Measuring bearing vibration over time to plan repairs before failure is:",
     "Predictive maintenance", ["Corrective maintenance", "Breakdown maintenance", "Emergency maintenance"],
     "Predictive maintenance uses condition data such as vibration, temperature and amperage trends to schedule work before a failure."),
    ("An automatic transfer switch on a standby generator:",
     "Moves load to the generator", ["Starts the high-service pumps", "Shuts off the chlorine feed", "Resets tripped breakers"],
     "When utility power fails, the transfer switch starts the generator and moves the plant's load to it, then moves it back when power returns."),
    ("Water is drained from compressed air receiver tanks regularly to prevent:",
     "Rust and wet air lines", ["Higher discharge pressure", "Lower motor current", "Overcooling the compressor"],
     "Compressing air condenses moisture. Left in the receiver it corrodes the tank and carries water into valve actuators and air lines."),
    ("Air scour blowers on gravity filters are used during:",
     "Backwash", ["Coagulation", "Disinfection", "Sedimentation"],
     "Air scour agitates the media before or with the water wash so dirt breaks loose, which helps prevent mudballs."),
    ("A three-phase motor's amperage is rising over several weeks at the same load. This trend suggests:",
     "A developing fault", ["Normal break-in wear", "Lower water demand", "A cleaner intake screen"],
     "Rising current at a steady load means the motor is working harder, often from failing bearings, misalignment or a binding pump, and should be checked."),
]
