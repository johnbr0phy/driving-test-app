// Rule: how close you may park to a crosswalk or a fire hydrant. The answer is
// a distance, and the distance is record data: it differs by state.

import { buildScript } from "../runtime/machine.js";
import { FT, MPH, drive, smooth, track } from "../runtime/motion.js";

const FEATURE = 120; // the near edge of the crosswalk, or the hydrant
const CAR_HALF = 2.2;
const START = 104.5;

/** The four bank answers, each a distance in feet, and the legal one. */
function optionsOf(record) {
  const options = record.decisions[0].options;
  return { options, legal: options.find((o) => o.correct).distanceFt };
}

export function describe(record) {
  const hydrant = record.params.feature === "hydrant";
  const decision = record.decisions[0];
  const { options, legal } = optionsOf(record);
  const branches = {};
  for (const option of options) {
    const ft = option.distanceFt;
    const safe = ft >= legal;
    const farther = ft > legal ? ` That is ${ft - legal} feet more than the law asks.` : "";
    branches[option.action] = hydrant
      ? safe
        ? { duration: 8.5, caption: `You park ${ft} feet from the hydrant. A fire engine pulls up and connects its hose with room to spare.${farther}` }
        : {
            duration: 8,
            caption: `You park ${ft} feet from the hydrant, too close. A fire engine arrives and cannot connect. It sounds its horn. Police lights come on.`,
            cues: [{ at: 5.6, id: "horn" }, { at: 6.4, id: "horn" }],
          }
      : safe
        ? { duration: 8.5, caption: `You park ${ft} feet back. A person steps into the crosswalk in plain view, and the car behind stops smoothly for them.${farther}` }
        : {
            duration: 8,
            caption: `You park ${ft} feet from the crosswalk, too close. A person steps out from behind your car. The next driver sees them late, brakes hard and honks. Police lights come on.`,
            cues: [{ at: 5.6, id: "horn" }, { at: 6.0, id: "shake" }],
          };
  }
  return buildScript(record, {
    intro: {
      duration: 7,
      caption: hydrant
        ? "A city street. You want to park at the curb, just before a fire hydrant."
        : "A city street. You want to park at the curb, just before a crosswalk.",
    },
    decisions: { [decision.id]: branches },
  });
}

export function build(world, record) {
  const { COLORS } = world;
  const hydrant = record.params.feature === "hydrant";
  const { options, legal } = optionsOf(record);

  world.ground(-40, 300, COLORS.sidewalk, 70);
  world.road(-40, 300, -6, 6);
  world.line(-40, hydrant ? 300 : FEATURE - 1, 0, COLORS.yellow, [3, 5], 0.2);
  world.line(-40, 300, 3.5, COLORS.white, [1.2, 2.4], 0.12);
  world.line(-40, 300, -3.5, COLORS.white, [1.2, 2.4], 0.12);
  world.strip(-40, hydrant ? 300 : FEATURE + 4, 6, 6.35, COLORS.curb, 0.16);
  world.strip(-40, hydrant ? 300 : FEATURE + 4, -6.35, -6, COLORS.curb, 0.16);
  if (hydrant) {
    world.hydrant(FEATURE, 7.0);
    world.buildingLine(-30, 280, { setback: 13 });
  } else {
    world.crosswalk(FEATURE, -6, 6, 3);
    world.strip(FEATURE + 4, FEATURE + 14, -70, 70, COLORS.asphalt, 0.001, 10);
    world.line(FEATURE + 15, 300, 0, COLORS.yellow, [3, 5], 0.2);
    world.strip(FEATURE + 14, 300, 6, 6.35, COLORS.curb, 0.16);
    world.strip(FEATURE + 14, 300, -6.35, -6, COLORS.curb, 0.16);
    world.buildingLine(-30, 280, { setback: 13, skip: [[FEATURE + 2, FEATURE + 16]] });
  }
  // Marks on the curb lane: how far back each choice would leave your bumper.
  for (const option of options) {
    const s = FEATURE - option.distanceFt * FT;
    world.bar(s - 0.11, 3.6, 6.9, 0.22, "#fde047");
    world.groundLabel(`${option.distanceFt} ft`, s, 9.4, { width: 3.6, color: "#111827" });
  }
  // Cars already parked further back.
  [30, 44, 52, 66].forEach((s, i) => {
    const car = world.vehicle("car", [COLORS.teal, COLORS.cream, COLORS.blue, COLORS.red][i]);
    world.place(car, s, 4.8);
  });

  const player = world.vehicle("car", COLORS.player);
  const brake = world.brakeLights(player);
  const other = world.vehicle(hydrant ? "fire" : "car", COLORS.blue);
  const police = world.vehicle("police");
  const walker = world.person("#7c3aed");
  const hose = world.prop("hose", (b) => b.box(0, 0.12, 0, 4.2, 0.16, 0.22, "#fde047"));

  const intro = drive(52, [[0, 9], [4, 9], [6.5, 3]]);

  return {
    update({ seg, t }) {
      let s;
      let x = 1.75;
      let v;
      let chosen = null;
      if (seg === "intro") {
        s = intro.s(t);
        v = intro.v(t);
      } else {
        chosen = options.find((o) => seg.endsWith(`:${o.action}`));
        const target = FEATURE - chosen.distanceFt * FT - CAR_HALF;
        const u = smooth(t / 3.2);
        s = START + (target - START) * u;
        x = 1.75 + 3.0 * smooth((t - 0.3) / 2.6);
        v = t < 3.2 ? ((target - START) / 3.2) * 1.5 * (1 - Math.abs(2 * (t / 3.2) - 1)) : 0;
      }
      const du = chosen ? smooth((t + 0.1 - 0.3) / 2.6) - smooth((t - 0.1 - 0.3) / 2.6) : 0;
      world.place(player, s, x, { yaw: -du * 1.6 });
      brake.set(seg !== "intro" ? t < 3.4 : t > 4);
      world.place(police, FEATURE - 5, -4.8, { yaw: Math.PI });

      const ok = chosen && chosen.distanceFt >= legal;
      let policeOn = false;
      hose.visible = false;
      if (!chosen) {
        other.visible = false;
        world.place(walker, FEATURE + 1.5, 7.6, { visible: !hydrant });
      } else if (hydrant) {
        // The fire engine pulls up beside the hydrant.
        const engine = drive(40, [[0, 0], [1.5, 0], [2.5, 18], [5.2, 18], [7, 0]]).s(t);
        world.place(other, Math.min(engine, FEATURE - 1), 1.9);
        world.flash(other, t > 1.5);
        world.place(walker, 0, 0, { visible: false });
        if (ok && t > 7.2) {
          world.place(hose, FEATURE + 0.6, 5.0);
          hose.visible = true;
        }
        policeOn = !ok && t > 6.8;
      } else {
        // A person crosses; the next driver has to be able to see them.
        const wx = ok
          ? track([[3.2, 7.6], [8.4, -0.5]], (u) => u)(t)
          : track([[3.6, 7.6], [6.0, 3.4], [6.25, 3.4], [6.7, 4.6]], (u) => u)(t);
        world.place(walker, FEATURE + 1.5, wx, { yaw: Math.PI / 2 });
        const car = ok ? drive(58, [[0, 10], [3.4, 10], [6.2, 0]]) : drive(58, [[0, 10], [5.4, 10], [6.3, 0]]);
        world.place(other, car.s(t), 1.75);
        policeOn = !ok && t > 6.8;
      }
      world.flash(police, policeOn);
      return {
        // As you roll up, the view moves ahead to the curb marks you are choosing between.
        focus: { s: chosen ? FEATURE - 9 : s + (FEATURE - 11 - s) * smooth((t - 3.5) / 3), x: 3.4 },
        speedMph: Math.round(v / MPH),
        cam: chosen ? { back: 12, height: 8, ahead: 6, lookX: 1.2, lookUp: 0, tilt: 0.3 } : { back: 8, height: 6.5, ahead: 13, lookX: 2.2, lookUp: 0, tilt: 0.5 },
      };
    },
  };
}
