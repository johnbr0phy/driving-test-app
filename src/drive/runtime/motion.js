// On-rails motion helpers. Everything is a pure function of segment time, so
// a scene can be drawn at any moment (and reduced motion can jump to stills).

export const MPH = 0.44704; // metres per second in one mph
export const FT = 0.3048; // metres in one foot

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const lerp = (a, b, u) => a + (b - a) * u;
export const smooth = (u) => {
  const c = clamp(u);
  return c * c * (3 - 2 * c);
};

/**
 * Keyframes to a function of time. keys: [[t, value], ...] sorted by t.
 * Values ease between keys; before the first and after the last they hold.
 */
export function track(keys, ease = smooth) {
  return (t) => {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [t0, v0] = keys[i - 1];
        const [t1, v1] = keys[i];
        return lerp(v0, v1, ease((t - t0) / (t1 - t0 || 1)));
      }
    }
    return keys[keys.length - 1][1];
  };
}

/**
 * Distance along the road from a speed profile. speeds: [[t, metresPerSecond], ...],
 * linear between keys, held after the last. Returns { s(t), v(t) }.
 */
export function drive(s0, speeds) {
  const v = (t) => {
    if (t <= speeds[0][0]) return speeds[0][1];
    for (let i = 1; i < speeds.length; i++) {
      if (t <= speeds[i][0]) {
        const [t0, v0] = speeds[i - 1];
        const [t1, v1] = speeds[i];
        return lerp(v0, v1, (t - t0) / (t1 - t0 || 1));
      }
    }
    return speeds[speeds.length - 1][1];
  };
  const s = (t) => {
    let total = s0;
    let prevT = speeds[0][0];
    let prevV = speeds[0][1];
    if (t <= prevT) return s0 + (t - prevT) * prevV;
    for (let i = 1; i < speeds.length; i++) {
      const [ti, vi] = speeds[i];
      if (t <= ti) {
        const vt = lerp(prevV, vi, (t - prevT) / (ti - prevT || 1));
        return total + ((prevV + vt) / 2) * (t - prevT);
      }
      total += ((prevV + vi) / 2) * (ti - prevT);
      prevT = ti;
      prevV = vi;
    }
    return total + prevV * (t - prevT);
  };
  return { s, v };
}
