// Rule: flashing signals. Flashing red is a stop sign; flashing yellow is
// "slow down and go carefully", not a stop. Two junctions, one of each.

import { buildScript } from "../runtime/machine.js";
import { MPH, drive, track } from "../runtime/motion.js";

const A = 140; // centre of the flashing-red junction
const A_LINE = 131;
const B = 235; // centre of the flashing-yellow junction

const PLAN = {
  intro: { duration: 5, caption: "A two-lane street. The signal at the junction ahead is flashing red." },
  decisions: {
    red: {
      stop: {
        duration: 11.6,
        caption: "You stop at the line. A car crosses in front of you. When it is clear you go. The next signal is flashing yellow.",
      },
      roll: {
        duration: 6.5,
        caption: "You slow but do not stop. A car coming from the right has to brake hard and honks. Police lights come on.",
        cues: [
          { at: 3.7, id: "horn" },
          { at: 4.1, id: "shake" },
        ],
      },
      go: {
        duration: 5,
        caption: "You drive straight through. A car from the right skids to a stop a few feet from your door. Police lights come on.",
        cues: [
          { at: 1.7, id: "horn" },
          { at: 2.1, id: "shake" },
        ],
      },
    },
    yellow: {
      caution: { duration: 5.5, caption: "You ease off, check both ways, and go through carefully. The waiting car stays put." },
      stop: {
        duration: 5.5,
        caption: "You stop on a flashing yellow. The driver behind did not expect it, brakes hard and honks.",
        cues: [
          { at: 2.6, id: "horn" },
          { at: 2.9, id: "shake" },
        ],
      },
      fast: {
        duration: 5,
        caption: "You speed up. The waiting car starts to pull out, sees you late and stops. You swerve around its nose.",
        cues: [
          { at: 1.9, id: "horn" },
          { at: 2.2, id: "shake" },
        ],
      },
    },
  },
};

export const describe = (record) => buildScript(record, PLAN);

const HOLD = 1e3;
const STOP = drive(105, [[0, 15], [0.2, 15], [3.0, 0], [5.2, 0], [7.7, 13]]);
const MOVES = {
  intro: { player: drive(30, [[0, 15]]), px: () => 1.75, cross: () => HOLD, side: () => 9.5, police: false },
  "red:stop": { player: STOP, px: () => 1.75, cross: (t) => 49 - 12 * t, side: () => 9.5, police: false },
  "red:roll": {
    player: drive(105, [[0, 15], [1.2, 7]]),
    px: () => 1.75,
    cross: track([[0, 60], [2.6, 22], [4.2, 6.6]], (u) => u),
    side: () => 9.5,
    police: 4.7,
  },
  "red:go": {
    player: drive(105, [[0, 15], [2.9, 15], [4.5, 6]]),
    px: track([[1.8, 1.75], [2.3, 0.5], [3.3, 1.75]]),
    cross: track([[0, 45], [1.1, 24], [2.2, 7]], (u) => u),
    side: () => 9.5,
    police: 2.8,
  },
  "yellow:caution": { player: drive(195, [[0, 13], [2, 9], [3.6, 9], [5, 13]]), px: () => 1.75, cross: () => HOLD, side: () => 9.5, police: false },
  "yellow:stop": {
    player: drive(195, [[0, 13], [0.2, 13], [3, 0]]),
    px: () => 1.75,
    cross: () => HOLD,
    side: () => 9.5,
    police: false,
    follower: drive(181, [[0, 13], [1.9, 13], [3.3, 0]]),
  },
  "yellow:fast": {
    player: drive(195, [[0, 13], [2, 21]]),
    px: track([[1.6, 1.75], [2.2, 0.1], [3.2, 1.75]]),
    cross: () => HOLD,
    side: track([[0.9, 9.5], [1.9, 5.6]]),
    police: false,
  },
};

function junction(world, centre, { stopLine }) {
  const { COLORS } = world;
  world.strip(centre - 4.5, centre + 4.5, -70, -3.5, COLORS.asphalt, 0, 9);
  world.strip(centre - 4.5, centre + 4.5, 3.5, 70, COLORS.asphalt, 0, 9);
  if (stopLine) world.bar(centre - 9, 0.15, 3.4, 0.6);
  world.statics.quad(...[[-70, centre], [-3.5, centre], [-3.5, centre + 0.16], [-70, centre + 0.16]].map(([x, s]) => world.at(s, x, 0.02)), COLORS.yellow);
  world.statics.quad(...[[3.5, centre], [70, centre], [70, centre + 0.16], [3.5, centre + 0.16]].map(([x, s]) => world.at(s, x, 0.02)), COLORS.yellow);
}

export function build(world) {
  const { COLORS } = world;
  world.ground(-60, 400, COLORS.grass, 90);
  world.road(-60, 400, -3.5, 3.5);
  world.strip(-60, 400, 3.5, 5.6, COLORS.sidewalk, 0.04);
  world.strip(-60, 400, -5.6, -3.5, COLORS.sidewalk, 0.04);
  for (const [from, to] of [[-60, A - 9], [A + 5, B - 5], [B + 5, 400]]) world.line(from, to, 0, COLORS.yellow, [3, 5], 0.2);
  junction(world, A, { stopLine: true });
  junction(world, B, { stopLine: false });
  world.beacon(A, { color: "red" });
  world.beacon(B, { color: "yellow" });
  // Open corners, so you (and the picture) can see what is coming on the side streets.
  const skip = [[A - 20, A + 20], [B - 20, B + 20]];
  world.buildingLine(-50, 380, { setback: 11, skip });
  world.treeLine(-50, 380, { near: 7.2, far: 8.5, every: 17, skip });

  const player = world.vehicle("car", COLORS.player);
  const brake = world.brakeLights(player);
  const cross = world.vehicle("car", COLORS.red);
  const side = world.vehicle("car", COLORS.teal);
  const follower = world.vehicle("car", COLORS.blue);
  const police = world.vehicle("police");

  return {
    update({ seg, t }) {
      const m = MOVES[seg];
      const s = m.player.s(t);
      const x = m.px(t);
      world.place(player, s, x, { yaw: (m.px(t - 0.12) - m.px(t + 0.12)) * 0.3 });
      brake.set(m.player.v(t + 0.1) < m.player.v(t) - 0.05 || m.player.v(t) < 0.2);
      const cx = m.cross(t);
      world.place(cross, A + 2.3, cx, { yaw: Math.PI / 2, visible: Math.abs(cx) < 75 });
      world.place(side, B - 2.3, m.side(t), { yaw: Math.PI / 2 });
      world.place(police, A - 2.3, -11, { yaw: -Math.PI / 2 });
      world.flash(police, m.police !== false && t >= m.police);
      if (m.follower) world.place(follower, m.follower.s(t), 1.75);
      else follower.visible = false;
      const wide = seg === "yellow:stop";
      return {
        focus: { s, x },
        speedMph: Math.round(m.player.v(t) / MPH),
        cam: wide ? { back: 17, height: 6.5, ahead: 10, lookX: 0, tilt: 0.6 } : { back: 9, height: 3.6, ahead: 22, lookX: 0.4, lookUp: 2.4, tilt: 0.55 },
      };
    },
  };
}
