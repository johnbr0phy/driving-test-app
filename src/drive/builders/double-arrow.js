// Rule: the double arrow sign (W12-1). Traffic may pass on either side of the
// island, so there is nothing to do but hold your lane.

import { buildScript } from "../runtime/machine.js";
import { MPH, drive, smooth, track } from "../runtime/motion.js";

const NOSE = 143; // where the island starts
const bulge = (s) => 3.4 * smooth((s - 128) / 30) * (1 - smooth((s - 196) / 30));
const laneX = (lane, s) => lane * (1.75 + bulge(s));

const PLAN = {
  intro: { duration: 6, caption: "A one-way street with two lanes. You are in the left lane. The road splits around an island ahead." },
  decisions: {
    split: {
      left: { duration: 9, caption: "You hold your lane and pass on the left of the island. The car beside you passes on the right. The lanes join again." },
      right: {
        duration: 7,
        caption: "You swing right, into the car beside you. It honks and brakes. You jerk back into your own lane.",
        cues: [
          { at: 0.7, id: "horn" },
          { at: 1.0, id: "shake" },
        ],
      },
      stop: {
        duration: 7,
        caption: "You stop in a moving lane. The car behind brakes hard, honks and swerves around you.",
        cues: [
          { at: 1.2, id: "horn" },
          { at: 1.6, id: "shake" },
          { at: 2.6, id: "horn" },
        ],
      },
    },
  },
};

export const describe = (record) => buildScript(record, PLAN);

const CRUISE = 13;
const MOVES = {
  intro: {
    player: drive(37, [[0, CRUISE]]),
    off: () => 0,
    neighbor: drive(40, [[0, CRUISE]]),
    noff: () => 0,
    follower: null,
  },
  "split:left": {
    player: drive(115, [[0, CRUISE]]),
    off: () => 0,
    neighbor: drive(118, [[0, CRUISE]]),
    noff: () => 0,
    follower: null,
  },
  "split:right": {
    player: drive(115, [[0, CRUISE], [1, 11], [2.5, CRUISE]]),
    off: track([[0.3, 0], [1.05, 2.3], [1.3, 2.3], [2.1, 0]]),
    neighbor: drive(118, [[0, CRUISE], [0.8, CRUISE], [1.6, 8], [4, 8], [6, CRUISE]]),
    noff: track([[0.7, 0], [1.2, 1.0], [2.6, 1.0], [3.6, 0]]),
    follower: null,
  },
  "split:stop": {
    player: drive(115, [[0, CRUISE], [0.2, CRUISE], [2.2, 0]]),
    off: () => 0,
    neighbor: drive(118, [[0, CRUISE]]),
    noff: () => 0,
    follower: { car: drive(99, [[0, CRUISE], [1.0, CRUISE], [2.0, 7], [3.2, 10], [6, CRUISE]]), lane: track([[1.0, -1], [1.9, 1]]) },
  },
};

export function build(world) {
  const { COLORS } = world;
  const left = (s) => -3.5 - bulge(s);
  const right = (s) => 3.5 + bulge(s);
  const islandHalf = (s) => Math.max(0, bulge(s) - 0.55);
  world.ground(-60, 420, COLORS.sidewalk, 60);
  world.road(-60, 420, left, right);
  world.line(-60, 420, (s) => left(s) + 0.15, COLORS.yellow);
  world.line(-60, 420, (s) => right(s) - 0.15, COLORS.white);
  world.line(-60, 126, 0, COLORS.white, [3, 5]);
  world.line(228, 420, 0, COLORS.white, [3, 5]);
  // The island: a raised kerb with grass, and solid white lines guiding both ways round it.
  world.strip(NOSE - 3, 214, (s) => -islandHalf(s), islandHalf, COLORS.curb, 0.22, 2);
  world.strip(NOSE + 2, 209, (s) => -Math.max(0, islandHalf(s) - 0.5), (s) => Math.max(0, islandHalf(s) - 0.5), COLORS.grass, 0.26, 2);
  world.line(126, 228, (s) => -islandHalf(s) - 0.35, COLORS.white);
  world.line(126, 228, (s) => islandHalf(s) + 0.35, COLORS.white);
  for (const s of [168, 184, 198]) world.tree(s, 0, 0.9);
  world.sign("doubleArrow", NOSE + 1, 0, { size: 3.4, height: 1.5 });
  world.buildingLine(-50, 400, { setback: 9 });

  const player = world.vehicle("car", COLORS.player);
  const brake = world.brakeLights(player);
  const neighbor = world.vehicle("car", COLORS.blue);
  const follower = world.vehicle("car", COLORS.teal);

  return {
    update({ seg, t }) {
      const m = MOVES[seg];
      const s = m.player.s(t);
      const x = laneX(-1, s) + m.off(t);
      const heading = (fn, at) => (fn(at - 1.5) - fn(at + 1.5)) / 3;
      world.place(player, s, x, { yaw: heading((v) => laneX(-1, v), s) + (m.off(t - 0.12) - m.off(t + 0.12)) * 0.35 });
      brake.set(m.player.v(t + 0.1) < m.player.v(t) - 0.05);
      const ns = m.neighbor.s(t);
      world.place(neighbor, ns, laneX(1, ns) + m.noff(t), { yaw: heading((v) => laneX(1, v), ns) });
      if (m.follower) {
        const fs = m.follower.car.s(t);
        const lane = m.follower.lane(t);
        world.place(follower, fs, lane * (1.75 + bulge(fs)), { yaw: (m.follower.lane(t - 0.12) - m.follower.lane(t + 0.12)) * 0.5 });
      } else {
        follower.visible = false;
      }
      return {
        focus: { s, x },
        speedMph: Math.round(m.player.v(t) / MPH),
        cam: seg === "split:stop" ? { back: 15, height: 6, ahead: 14, lookX: -x * 0.4 } : { back: 10, height: 4.4, ahead: 24, lookX: -x * 0.45 },
      };
    },
  };
}
