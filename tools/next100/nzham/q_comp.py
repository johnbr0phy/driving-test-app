CAT = "nzhamComponents"; SEG = "CMP"
# NZART Study Guide topics 8 (alternating current), 9 (capacitors, inductors and resonance),
# 11 (semiconductors) and 12 (device recognition). Numbers computed and asserted. See sources.md.
import math

t1 = 1 / 50; assert abs(t1 - 0.02) < 1e-12
pk2 = 230 * math.sqrt(2); assert round(pk2) == 325
rms3 = 20 / math.sqrt(2); assert round(rms3, 1) == 14.1
cp4 = 100 + 220; assert cp4 == 320
cs4 = 1 / (1 / 100 + 1 / 220); assert round(cs4) == 69
cs5 = 1 / (1 / 10 + 1 / 10); assert abs(cs5 - 5) < 1e-12
f8 = 1 / (2 * math.pi * math.sqrt(10e-6 * 100e-12)); assert round(f8 / 1e6, 1) == 5.0
f11 = 1 / math.sqrt(4); assert abs(f11 - 0.5) < 1e-12   # 4x capacitance halves the frequency
v12 = 230 / 10; assert abs(v12 - 23) < 1e-12
ls = 4 + 6; assert ls == 10
xl = 2 * math.pi * 7e6 * 1e-6; assert round(xl) == 44

Q = [
("New Zealand mains electricity is 50 Hz. How long is one cycle?",
 f"{round(t1 * 1000)} ms", ["50 ms", "2 ms", "200 ms"],
 "The period is 1 / f = 1 / 50 = 0.02 s, which is 20 ms."),
("The mains supply is 230 V RMS. About what is its peak voltage?",
 f"{round(pk2)} V", ["163 V", "460 V", "230 V"],
 "Peak = RMS x 1.414, so 230 x 1.414 is about 325 V. Dividing by 1.414 instead gives 163 V."),
("A sine wave has a peak of 20 V. About what is its RMS value?",
 f"{rms3:.1f} V", ["28.3 V", "10 V", "40 V"],
 "RMS = peak x 0.707, so 20 x 0.707 is about 14.1 V. Multiplying by 1.414 gives 28.3 V, which would be the peak of a 20 V RMS wave."),
("Capacitors of 100 pF and 220 pF are connected in parallel. What is the total capacitance?",
 f"{cp4} pF", [f"{round(cs4)} pF", "120 pF", "160 pF"],
 "Capacitors in parallel add: 100 + 220 = 320 pF. About 69 pF is what the same two give in series."),
("Two 10 µF capacitors are connected in series. What is the total capacitance?",
 f"{round(cs5)} µF", ["20 µF", "10 µF", "2.5 µF"],
 "Equal capacitors in series give half of one, so 5 µF. Series capacitors combine like parallel resistors."),
("A 4 µH and a 6 µH inductor are in series, far enough apart not to couple. What is the total inductance?",
 f"{ls} µH", ["2.4 µH", "24 µH", "5 µH"],
 "Uncoupled inductors in series add like resistors: 4 + 6 = 10 µH. 2.4 µH is the parallel result."),
("What happens to an inductor's reactance as the frequency rises?",
 "It increases", ["It decreases", "It stays the same", "It falls to zero"],
 "Inductive reactance is XL = 2πfL, so it rises in step with frequency. That is why an inductor passes DC but blocks RF."),
("What happens to a capacitor's reactance as the frequency rises?",
 "It decreases", ["It increases", "It stays the same", "It becomes infinite"],
 "Capacitive reactance is XC = 1 / (2πfC), so it falls as frequency rises. A capacitor blocks DC and passes RF."),
("About what is the reactance of a 1 µH inductor at 7 MHz?",
 f"{round(xl)} Ω", ["7 Ω", "440 Ω", "4.4 Ω"],
 "XL = 2πfL = 6.28 x 7 000 000 x 0.000 001, which is about 44 Ω."),
("A tuned circuit has a 10 µH inductor and a 100 pF capacitor. About what is its resonant frequency?",
 f"{f8 / 1e6:.1f} MHz", ["1.6 MHz", "16 MHz", "50 MHz"],
 "f = 1 / (2π x square root of LC) = 1 / (6.28 x square root of 1 x 10 to the minus 15), which is about 5.0 MHz."),
("The capacitance in a tuned circuit is made four times larger. What happens to the resonant frequency?",
 "It halves", ["It doubles", "It falls to a quarter", "It stays the same"],
 "Resonant frequency depends on 1 / square root of LC, so four times the capacitance divides the frequency by the square root of 4, which is 2."),
("At resonance, what is the impedance of a series tuned circuit?",
 "At its lowest", ["At its highest", "Exactly 50 Ω", "Purely inductive"],
 "At resonance the inductive and capacitive reactances cancel, leaving only the resistance, so a series circuit has its minimum impedance. A parallel tuned circuit is the opposite, at its maximum."),
("What does a higher Q factor give a tuned circuit?",
 "A narrower bandwidth", ["A wider bandwidth", "A lower resonant frequency", "A higher resistance loss"],
 "Q compares reactance with loss resistance. A high Q means low loss and a sharp, narrow response, which improves selectivity."),
("A transformer has a 10:1 turns ratio and 230 V on its primary. What is the secondary voltage?",
 f"{round(v12)} V", ["2300 V", "2.3 V", "11.5 V"],
 "Voltage follows the turns ratio in a step-down transformer: 230 / 10 = 23 V. Multiplying by 10 would be a step-up."),
("When does a diode conduct?",
 "When it is forward biased", ["When it is reverse biased", "Only at radio frequencies", "Only above 50 V"],
 "A diode conducts when its anode is more positive than its cathode by more than its forward voltage. Reverse biased, it blocks."),
("About what voltage drops across a silicon diode when it conducts?",
 "About 0.6 V", ["About 0.2 V", "About 1.5 V", "About 6 V"],
 "A silicon junction drops roughly 0.6 to 0.7 V when forward biased. About 0.2 to 0.3 V is typical of germanium."),
("What is a Zener diode most often used for?",
 "Holding a steady voltage", ["Rectifying the mains supply", "Giving off light", "Tuning a receiver"],
 "A Zener diode is used reverse biased at its breakdown voltage, which stays nearly constant, so it makes a simple voltage reference or regulator."),
("Why are varactor (varicap) diodes used in tuned circuits?",
 "Capacitance changes with voltage", ["They give off light as they are tuned", "They drop a fixed 5 V", "They amplify the signal"],
 "The depletion layer of a reverse-biased diode acts as a capacitor whose value changes with the reverse voltage, so a varactor lets a voltage tune a circuit."),
("Why is a quartz crystal used in an oscillator?",
 "For very stable frequency", ["For a wide tuning range", "For high output power", "For lower cost than a tuned circuit"],
 "A quartz crystal resonates at a frequency set by its cut and size, with a very high Q, so it holds an oscillator on frequency far better than a coil and capacitor."),
("What must you check before fitting an electrolytic capacitor?",
 "That its polarity is correct", ["That it is not polarised", "That its value is in pF", "That it is wired in series with the load"],
 "Electrolytic capacitors are polarised. Fitted the wrong way round they can overheat, leak or burst."),
]
