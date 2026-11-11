// Rule: no-passing zone (pennant sign on the left, solid yellow line on your side).
// A slow truck, a hill that hides oncoming traffic, and the urge to pass.

import { buildScript } from "../runtime/machine.js";
import { MPH, drive, track } from "../runtime/motion.js";

const CREST = 235; // top of the hill
const ZONE_START = 172; // pennant sign and the start of the solid line
const ZONE_END = 255; // sight distance is back: the line breaks again
const RAIL_START = 214;

export const heightAt = (s) => 7 * Math.exp(-(((s - CREST) / 45) ** 2));

const PLAN = {
  intro: { duration: 7, caption: "You catch up with a slow truck on a two-lane road. A hill is ahead." },
  decisions: {
    pass: {
      stay: {
        duration: 12.6,
        caption: "You stay behind the truck. A car comes over the hill in the other lane. Past the hill the line is broken, and you pass.",
      },
      pass: {
        duration: 7.5,
        caption: "You pull out to pass. A car comes over the hill straight at you and swerves onto the shoulder.",
        cues: [
          { at: 2.6, id: "horn" },
          { at: 3.3, id: "shake" },
          { at: 3.6, id: "horn" },
        ],
      },
      shoulder: {
        duration: 7,
        caption: "You pull onto the right shoulder to pass. Gravel, then a guardrail: you brake hard and drop back.",
        cues: [
          { at: 1.3, id: "thump" },
          { at: 2.0, id: "thump" },
          { at: 2.7, id: "shake" },
          { at: 2.8, id: "horn" },
        ],
      },
    },
  },
};

export const describe = (record) => buildScript(record, PLAN);

const TRUCK = (t) => 56 + 15 * t;

const MOVES = {
  intro: {
    player: drive(21, [[0, 22], [2, 22], [4, 15]]),
    px: () => 1.75,
    truck: (t) => TRUCK(t),
    oncoming: null,
  },
  "pass:stay": {
    player: drive(147, [[0, 15], [7.4, 15], [9.4, 25]]),
    px: track([[7.4, 1.75], [8.5, -1.75], [10.8, -1.75], [11.9, 1.75]]),
    truck: (t) => TRUCK(7 + t),
    oncoming: { s: (t) => 283 - 25 * t, x: () => -1.75 },
  },
  "pass:pass": {
    player: drive(147, [[0, 15], [3, 26], [3.6, 22]]),
    px: track([[0.2, 1.75], [1.3, -1.75], [4.2, -1.75], [5.3, 1.75]]),
    truck: (t) => TRUCK(7 + t),
    oncoming: {
      s: drive(303, [[0, -25], [2.4, -25], [3.4, -14]]).s,
      x: track([[2.5, -1.75], [3.1, -4.7], [4.6, -4.7], [5.6, -1.75]]),
    },
  },
  "pass:shoulder": {
    player: drive(147, [[0, 15], [2.2, 22], [3.2, 4], [4.5, 4], [6, 13]]),
    px: track([[0.2, 1.75], [1.2, 4.5], [3.6, 4.5], [4.8, 1.75]]),
    truck: (t) => TRUCK(7 + t),
    oncoming: null,
  },
};

export function build(world) {
  const { COLORS } = world;
  world.ground(-80, 520);
  world.road(-80, 520, -3.5, 3.5);
  world.strip(-80, 520, 3.5, 5.6, COLORS.shoulder, -0.01);
  world.strip(-80, 520, -5.6, -3.5, COLORS.shoulder, -0.01);
  world.line(-80, 520, 3.35, COLORS.white);
  world.line(-80, 520, -3.35, COLORS.white);
  // Centre line: broken, then double solid over the hill, then broken again.
  world.line(-80, ZONE_START, 0, COLORS.yellow, [3, 6], 0.2);
  world.line(ZONE_START, ZONE_END, -0.2, COLORS.yellow, null, 0.2);
  world.line(ZONE_START, ZONE_END, 0.2, COLORS.yellow, null, 0.2);
  world.line(ZONE_END, 520, 0, COLORS.yellow, [3, 6], 0.2);
  world.sign("pennant", ZONE_START, -7.8, { size: 4.6, height: 1.6 });
  // Guardrail closing off the right shoulder near the top of the hill.
  for (let s = RAIL_START; s < 300; s += 4) {
    world.block(s, 4.3, 0.16, 0.8, 0.16, COLORS.pole);
    world.statics.box(4.3, world.heightAt(s + 2) + 0.7, -(s + 2), 0.1, 0.3, 4.2, "#d1d5db");
  }
  world.treeLine(-60, 500, { near: 11, far: 40, every: 9 });

  const player = world.vehicle("car", COLORS.player);
  const brake = world.brakeLights(player);
  const truck = world.vehicle("truck", COLORS.truck);
  const oncoming = world.vehicle("car", COLORS.red);

  return {
    update({ seg, t }) {
      const m = MOVES[seg];
      const s = m.player.s(t);
      const x = m.px(t);
      const onShoulder = x > 3.6;
      world.place(player, s, x, {
        yaw: (m.px(t - 0.15) - m.px(t + 0.15)) * 0.25,
        roll: onShoulder ? Math.sin(t * 31) * 0.035 : 0,
        lift: onShoulder ? Math.abs(Math.sin(t * 23)) * 0.06 : 0,
      });
      brake.set(m.player.v(t + 0.1) < m.player.v(t) - 0.05);
      world.place(truck, m.truck(t), 1.75);
      if (m.oncoming) {
        const os = m.oncoming.s(t);
        world.place(oncoming, os, m.oncoming.x(t), { yaw: Math.PI, visible: os > s - 40 });
      } else {
        oncoming.visible = false;
      }
      return {
        focus: { s, x },
        speedMph: Math.round(m.player.v(t) / MPH),
        cam: { lookX: seg === "intro" ? -1.6 : 0, height: 3.4, back: 8.5, ahead: 22, tilt: 0.8 },
      };
    },
  };
}
