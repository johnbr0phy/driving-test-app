// Rule: a BUMP / rough road warning sign. The answer is a speed: slow down
// before the surface changes, not on it.

import { buildScript } from "../runtime/machine.js";
import { MPH, clamp, drive, track } from "../runtime/motion.js";

const SIGN = 110;
const PATCH = [150, 186];

const PLAN = {
  intro: { duration: 5.5, caption: "A country road at 45 miles an hour. A yellow warning sign is coming up on the right." },
  decisions: {
    bump: {
      slow: { duration: 10, caption: "You ease off and brake before the rough patch, roll over it gently, then speed back up." },
      keep: {
        duration: 8,
        caption: "You hit the rough patch at 45. The car slams over the bumps and you fight the wheel onto the shoulder.",
        cues: [
          { at: 3.25, id: "thump" },
          { at: 3.3, id: "shake" },
          { at: 3.7, id: "thump" },
          { at: 4.2, id: "thump" },
          { at: 4.6, id: "shake" },
        ],
      },
      fast: {
        duration: 7.5,
        caption: "You speed up. The car leaves the ground over the bumps, lands hard and limps to the shoulder with a flat tire.",
        cues: [
          { at: 2.85, id: "thump" },
          { at: 2.9, id: "shake" },
          { at: 3.3, id: "thump" },
          { at: 3.8, id: "thump" },
          { at: 3.9, id: "shake" },
        ],
      },
    },
  },
};

export const describe = (record) => buildScript(record, PLAN);

const V = 45 * MPH;
const MOVES = {
  intro: { player: drive(85 - V * 5.5, [[0, V]]), px: () => 1.75, rough: 0 },
  "bump:slow": { player: drive(85, [[0, V], [0.4, V], [4.2, 8], [8.3, 8], [9.8, 14]]), px: () => 1.75, rough: 0.12 },
  "bump:keep": { player: drive(85, [[0, V], [5, V], [7.4, 0]]), px: track([[4.9, 1.75], [6.6, 4.6]]), rough: 1 },
  "bump:fast": { player: drive(85, [[0, V], [2.6, 27], [4.3, 24], [7, 0]]), px: track([[4.2, 1.75], [6, 4.6]]), rough: 1.5, flat: 4.4 },
};

export function build(world) {
  const { COLORS, rng } = world;
  world.ground(-80, 420);
  world.road(-80, 420, -3.5, 3.5);
  world.strip(-80, 420, 3.5, 5.8, COLORS.shoulder, -0.01);
  world.strip(-80, 420, -5.8, -3.5, COLORS.shoulder, -0.01);
  world.line(-80, 420, 3.35, COLORS.white);
  world.line(-80, 420, -3.35, COLORS.white);
  world.line(-80, PATCH[0], 0, COLORS.yellow, [3, 6], 0.2);
  world.line(PATCH[1], 420, 0, COLORS.yellow, [3, 6], 0.2);
  world.sign("bump", SIGN, 7.6, { size: 4.4, height: 1.6 });
  // The rough patch: darker, broken surface with raised lumps and holes.
  world.strip(PATCH[0], PATCH[1], -3.5, 3.5, COLORS.asphaltDark, 0.015, 3);
  for (let i = 0; i < 90; i++) {
    const s = rng.range(PATCH[0] + 1, PATCH[1] - 1);
    const x = rng.range(-3.1, 3.1);
    if (rng.next() < 0.6) world.block(s, x, rng.range(0.4, 0.9), rng.range(0.08, 0.18), rng.range(0.3, 0.7), "#5d636c", 0, rng.range(0, 3));
    else world.statics.box(x, 0.03, -s, rng.range(0.5, 1.1), 0.02, rng.range(0.4, 0.9), "#22252a", rng.range(0, 3));
  }
  world.treeLine(-60, 400, { near: 12, far: 40, every: 9 });

  const player = world.vehicle("car", COLORS.player);
  const brake = world.brakeLights(player);
  const oncoming = world.vehicle("car", COLORS.blue);
  const hubcap = world.prop("hubcap", (b) => b.box(0, 0.3, 0, 0.08, 0.6, 0.6, "#d1d5db"));

  return {
    update({ seg, t }) {
      const m = MOVES[seg];
      const s = m.player.s(t);
      const v = m.player.v(t);
      const x = m.px(t);
      const inPatch = s > PATCH[0] - 2 && s < PATCH[1] + 2 ? 1 : 0;
      const shakeAmount = inPatch * m.rough * clamp(v / V, 0, 1.4);
      const flat = m.flat && t > m.flat ? 1 : 0;
      world.place(player, s, x, {
        lift: Math.abs(Math.sin(s * 0.9)) * 0.45 * shakeAmount,
        pitch: Math.sin(s * 1.7) * 0.11 * shakeAmount,
        roll: Math.sin(s * 1.3 + 1) * 0.07 * shakeAmount + flat * 0.07,
        yaw: (m.px(t - 0.15) - m.px(t + 0.15)) * 0.2,
      });
      brake.set(m.player.v(t + 0.1) < v - 0.05);
      // An oncoming car early on, so the road feels lived in.
      const os = 230 - 20 * t;
      world.place(oncoming, os, -1.75, { yaw: Math.PI, visible: seg === "intro" && os > s - 30 });
      // A hubcap comes off when you take the patch at speed.
      const lost = m.rough >= 1 && s > PATCH[0] + 8;
      if (lost) {
        const since = (s - PATCH[0] - 8) / Math.max(v, 6);
        world.place(hubcap, PATCH[0] + 10 + Math.min(since, 2.5) * 9, 1 - Math.min(since, 2.5) * 2.2, { pitch: since * 9, lift: Math.abs(Math.sin(since * 6)) * 0.5 });
      } else {
        hubcap.visible = false;
      }
      return { focus: { s, x }, speedMph: Math.round(v / MPH), cam: { lookX: seg === "intro" ? 1.6 : 0.4, height: 3.6, back: 8.5, ahead: 20, tilt: 0.8 } };
    },
  };
}
