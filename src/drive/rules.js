// The five rules of v1, in the order of their score in DRIVE-PICKS.md.
// Plain data and lazy loaders: importing this file never pulls in three.js.

export const DRIVE_RULES = [
  {
    slug: "no-passing-zone",
    title: "The no-passing zone",
    short: "A slow truck, a hill and a pennant sign.",
    question: "What does a pennant-shaped sign mean?",
    summary:
      "The pennant is the only sign with that shape. It stands on the left side of the road, where a driver about to pull out is looking, and marks the start of a no-passing zone. From there the yellow line on your side is solid, and you stay in your lane until it is broken again.",
    points: [
      "The yellow pennant on the left side of the road means a no-passing zone starts here.",
      "A solid yellow line on your side of the center line means you may not pass.",
      "No-passing zones cover hills and curves, where you cannot see far enough ahead to pass safely.",
      "The shoulder is never a passing lane.",
    ],
    missRate: 46,
    load: () => import("./builders/no-passing-zone.js"),
  },
  {
    slug: "double-arrow",
    title: "The double arrow sign",
    short: "The road splits around an island. Which side?",
    question: "What does a double arrow sign mean?",
    summary:
      "A yellow diamond with two arrows pointing down and apart stands on an island or other obstruction in the road. It tells you traffic may pass on either side. It is the most-missed common question on Tigertest: many people read it as keep right, or as a lane ending.",
    points: [
      "The double arrow sign means traffic may pass on either side of the island or obstruction.",
      "You do not need to change lanes or stop: hold your lane and keep moving.",
      "It is different from a Keep Right sign, which allows one side only.",
    ],
    missRate: 58,
    load: () => import("./builders/double-arrow.js"),
  },
  {
    slug: "rough-road",
    title: "The bump warning sign",
    short: "45 mph and a yellow warning sign. Pick a speed.",
    question: "What does a sign with bumps mean?",
    summary:
      "A yellow diamond warning of a bump or a rough road means the surface ahead is uneven. The time to slow down is at the sign, before the surface changes. Braking on the rough surface itself is too late and can cost you control.",
    points: [
      "A BUMP or ROUGH ROAD sign warns of an uneven road surface ahead.",
      "Slow down before you reach the rough surface, not on it.",
      "Yellow diamond signs are warnings: they tell you what is coming so you can adjust your speed.",
    ],
    missRate: 49,
    load: () => import("./builders/rough-road.js"),
  },
  {
    slug: "flashing-signals",
    title: "Flashing red and flashing yellow",
    short: "Two junctions, two flashing lights, two different rules.",
    question: "What does a flashing red light mean? And a flashing yellow?",
    summary:
      "A flashing red light works like a stop sign: stop completely, yield, then go when it is safe. A flashing yellow light is a warning: slow down, look, and go through carefully without stopping. People miss these both ways, by rolling through the red and by stopping at the yellow.",
    points: [
      "Flashing red: stop completely, then go when it is safe. Treat it like a stop sign.",
      "Flashing yellow: slow down and proceed with caution. You do not need to stop.",
      "Slowing down for a flashing red is not enough: it must be a full stop.",
    ],
    missRate: 26,
    load: () => import("./builders/flashing-signals.js"),
  },
  {
    slug: "parking-clearance",
    title: "Parking near a crosswalk or hydrant",
    short: "An open curb by a crosswalk. How far back do you park?",
    question: "How close can you park to a crosswalk or a fire hydrant?",
    summary:
      "Most states follow the same two numbers: no parking within 20 feet of a crosswalk at an intersection, and none within 15 feet of a fire hydrant. The crosswalk distance keeps people who are about to cross in view of drivers. The hydrant distance keeps it reachable for firefighters. A few states use other numbers, so this scene changes with your state.",
    points: [
      "Most states: do not park within 20 feet of a crosswalk at an intersection.",
      "Most states: do not park within 15 feet of a fire hydrant.",
      "Some states differ. Oregon, for example, sets 10 feet for a hydrant.",
      "A car parked too close to a crosswalk hides people who are about to cross.",
    ],
    missRate: 43,
    load: () => import("./builders/parking-clearance.js"),
  },
];

export const DRIVE_SLUGS = DRIVE_RULES.map((rule) => rule.slug);

export function getDriveRule(slug) {
  return DRIVE_RULES.find((rule) => rule.slug === slug) || null;
}

export function nextDriveRule(slug) {
  const index = DRIVE_SLUGS.indexOf(slug);
  return DRIVE_RULES[(index + 1) % DRIVE_RULES.length];
}
