// Four tiny synthesized effects. No audio files, nothing to download.

export function createAudio() {
  let ctx = null;
  let muted = false;

  function ensure() {
    if (ctx || typeof window === "undefined") return ctx;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch {
      ctx = null;
    }
    return ctx;
  }

  function tone({ type = "sine", from, to = from, at = 0, length = 0.3, gain = 0.12 }) {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const t0 = ctx.currentTime + at;
    osc.type = type;
    osc.frequency.setValueAtTime(from, t0);
    if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t0 + length);
    amp.gain.setValueAtTime(0.0001, t0);
    amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + length);
    osc.connect(amp).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + length + 0.05);
  }

  const effects = {
    horn() {
      tone({ type: "square", from: 392, length: 0.55, gain: 0.07 });
      tone({ type: "square", from: 494, length: 0.55, gain: 0.07 });
    },
    thump() {
      tone({ type: "sine", from: 110, to: 45, length: 0.22, gain: 0.3 });
    },
    ding() {
      tone({ from: 880, length: 0.18 });
      tone({ from: 1320, at: 0.14, length: 0.3 });
    },
    buzz() {
      tone({ type: "sawtooth", from: 150, to: 110, length: 0.4, gain: 0.08 });
    },
  };

  return {
    /** Call from a tap or key press so the browser lets sound play. */
    unlock() {
      const c = ensure();
      if (c && c.state === "suspended") void c.resume();
    },
    setMuted(value) {
      muted = value;
    },
    play(id) {
      if (muted || !effects[id]) return;
      const c = ensure();
      if (!c || c.state !== "running") return;
      try {
        effects[id]();
      } catch {
        // Sound is a nicety; never let it break the scene.
      }
    },
    dispose() {
      if (ctx) void ctx.close().catch(() => {});
      ctx = null;
    },
  };
}

export const SOUND_IDS = ["horn", "thump", "ding", "buzz"];
