"""Writes a quiet, warm music bed (soft pad + electric piano arpeggio) for
the mistake explainers: python3 -I tools/mistakes/music_bed.py out.wav [seconds].

Synthesised here so there is no licence and no loop seam; ffmpeg adds the
room (aecho) when the film script mixes it under the voice.
"""
import sys, wave
import numpy as np

SR = 48000
out = sys.argv[1]
secs = float(sys.argv[2]) if len(sys.argv) > 2 else 70
BAR = 60 / 72 * 4  # 72 bpm, one chord per bar

def hz(n):  # MIDI note to Hz
    return 440 * 2 ** ((n - 69) / 12)

# Fmaj9, Dm9, Bbmaj7, C6/9: warm, unresolved, loops forever.
CHORDS = [[53, 60, 64, 67, 69], [50, 57, 60, 64, 65], [46, 53, 57, 62, 65], [48, 55, 62, 64, 69]]

n = int(secs * SR)
t = np.arange(n) / SR
L = np.zeros(n); R = np.zeros(n)

def env(start, length, a, r):
    e = np.zeros(n)
    i0 = int(start * SR); i1 = min(n, int((start + length + r) * SR))
    if i0 >= n: return e
    x = (np.arange(i0, i1) / SR) - start
    e[i0:i1] = np.clip(x / a, 0, 1) * np.clip((start + length + r - (x + start)) / r, 0, 1)
    return e

bar = 0
while bar * BAR < secs:
    s = bar * BAR
    ch = CHORDS[bar % 4]
    # pad: two slightly detuned sines per note, panned apart
    e = env(s, BAR, 1.2, 1.4)
    for k, note in enumerate(ch):
        f = hz(note + 12 if k == 0 else note)
        for det, pan in ((-0.0025, 0.35), (0.0025, 0.65)):
            v = np.sin(2 * np.pi * f * (1 + det) * t) + 0.12 * np.sin(4 * np.pi * f * t)
            L += e * v * (1 - pan) * 0.06; R += e * v * pan * 0.06
    # bass: root, soft
    e = env(s, BAR * 0.9, 0.05, 0.6)
    v = np.sin(2 * np.pi * hz(ch[0] - 12) * t)
    L += e * v * 0.10; R += e * v * 0.10
    # electric piano: an eighth-note arpeggio, decaying tines
    for i, note in enumerate([ch[1], ch[2], ch[3], ch[4], ch[3], ch[2], ch[4] + 12 - 12, ch[3]]):
        st = s + i * BAR / 8
        if st >= secs: break
        i0 = int(st * SR); i1 = min(n, i0 + int(1.6 * SR))
        x = np.arange(i1 - i0) / SR
        f = hz(note + 12)
        v = (np.sin(2 * np.pi * f * x) * np.exp(-x * 2.6) + 0.25 * np.sin(2 * np.pi * 2 * f * x) * np.exp(-x * 7)) * np.minimum(1, x / 0.004)
        pan = 0.3 + 0.4 * ((i * 3) % 5) / 4
        g = 0.05 if i % 2 == 0 else 0.035
        L[i0:i1] += v * g * (1 - pan); R[i0:i1] += v * g * pan
    bar += 1

fade = np.minimum(1, np.minimum(t / 1.5, (secs - t) / 2.5))
L *= fade; R *= fade
peak = max(np.abs(L).max(), np.abs(R).max())
pcm = (np.stack([L, R], 1) / peak * 0.8 * 32767).astype(np.int16)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print(out, f"{secs:.1f}s")
