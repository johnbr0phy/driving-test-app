// Low-poly world kit. Static scenery is merged into one flat-shaded,
// vertex-coloured mesh (one draw call); every moving actor is one more.
//
// Coordinates: s is metres along the road (forward), x is metres to the right
// of the road centre. three.js looks down -z, so world z = -s.

import * as THREE from "three";
import { createRng } from "./rng.js";
import { paintLabel, paintSign } from "./signs.js";

export const COLORS = {
  grass: "#7cb66a",
  grassDark: "#5f9a52",
  asphalt: "#4a4f57",
  asphaltDark: "#3b3f46",
  shoulder: "#8b8f96",
  sidewalk: "#c9ccd1",
  curb: "#a9adb3",
  white: "#f5f5f5",
  yellow: "#f7c948",
  pole: "#6b7280",
  trunk: "#7a5230",
  leaf: "#3f8f4f",
  leafDark: "#2f7a43",
  tire: "#1f2227",
  glass: "#22303f",
  player: "#f97316",
  red: "#dc2626",
  blue: "#2563eb",
  teal: "#0d9488",
  cream: "#f1e7d0",
  truck: "#e5e7eb",
  truckCab: "#2f6fb5",
  skin: "#e9b99a",
  hydrant: "#e11d48",
  sky: "#bfe3f5",
};

const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
const scratchColor = new THREE.Color();
const scratchVec = new THREE.Vector3();
const scratchMat = new THREE.Matrix4();
const scratchQuat = new THREE.Quaternion();
const scratchEuler = new THREE.Euler();

/** Accumulates triangles with a colour each; becomes one mesh. */
export class Batch {
  constructor() {
    this.positions = [];
    this.colors = [];
  }

  addGeometry(geometry, matrix, color) {
    const geom = geometry.index ? geometry.toNonIndexed() : geometry;
    const pos = geom.attributes.position;
    scratchColor.set(color);
    for (let i = 0; i < pos.count; i++) {
      scratchVec.fromBufferAttribute(pos, i);
      if (matrix) scratchVec.applyMatrix4(matrix);
      this.positions.push(scratchVec.x, scratchVec.y, scratchVec.z);
      this.colors.push(scratchColor.r, scratchColor.g, scratchColor.b);
    }
    return this;
  }

  /** A box by its centre and size, optionally turned about the vertical axis. */
  box(x, y, z, w, h, d, color, rotY = 0, rotX = 0) {
    scratchEuler.set(rotX, rotY, 0, "YXZ");
    scratchQuat.setFromEuler(scratchEuler);
    scratchMat.compose(new THREE.Vector3(x, y, z), scratchQuat, new THREE.Vector3(w, h, d));
    return this.addGeometry(UNIT_BOX, scratchMat, color);
  }

  /** A quad from four corners, counter-clockwise seen from its front. */
  quad(a, b, c, d, color) {
    scratchColor.set(color);
    for (const p of [a, b, c, a, c, d]) {
      this.positions.push(p[0], p[1], p[2]);
      this.colors.push(scratchColor.r, scratchColor.g, scratchColor.b);
    }
    return this;
  }

  get triangles() {
    return this.positions.length / 9;
  }

  toGeometry() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(this.colors, 3));
    geometry.computeVertexNormals(); // non-indexed, so every face is flat shaded
    return geometry;
  }
}

/**
 * @param {{ seed: string, heightAt?: (s:number)=>number, makeCanvas?: (w:number,h:number)=>any }} options
 * makeCanvas is absent in tests; signs then fall back to a plain yellow face.
 */
export function createWorld({ seed, heightAt = () => 0, makeCanvas = null }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.sky);
  scene.fog = new THREE.Fog(COLORS.sky, 90, 260);
  scene.add(new THREE.HemisphereLight("#ffffff", "#8a9a7a", 1.15));
  const sun = new THREE.DirectionalLight("#fff4d6", 1.5);
  sun.position.set(-30, 60, 20);
  scene.add(sun);

  const material = new THREE.MeshLambertMaterial({ vertexColors: true });
  const statics = new Batch();
  const rng = createRng(seed);
  const disposables = [material];
  const blinkers = [];

  const y = (s, lift = 0) => heightAt(s) + lift;
  /** World position for road coordinates. */
  const at = (s, x, lift = 0) => [x, y(s, lift), -s];

  function meshFrom(batch) {
    const geometry = batch.toGeometry();
    disposables.push(geometry);
    return new THREE.Mesh(geometry, material);
  }

  /** A strip that follows the hill: used for the ground, the road and long lines. */
  function strip(from, to, left, right, color, lift = 0, step = 4) {
    const fx = typeof left === "function" ? left : () => left;
    const gx = typeof right === "function" ? right : () => right;
    for (let s = from; s < to - 1e-6; s += step) {
      const e = Math.min(to, s + step);
      statics.quad(at(s, fx(s), lift), at(s, gx(s), lift), at(e, gx(e), lift), at(e, fx(e), lift), color);
    }
  }

  const world = {
    THREE,
    COLORS,
    scene,
    rng,
    statics,
    heightAt,
    at,
    strip,

    ground(from, to, color = COLORS.grass, halfWidth = 140) {
      strip(from, to, -halfWidth, halfWidth, color, -0.06, 8);
    },

    /** Asphalt between two x offsets (numbers or functions of s). */
    road(from, to, left = -3.5, right = 3.5, color = COLORS.asphalt) {
      strip(from, to, left, right, color, 0);
    },

    /** A painted line along the road. dash = [paint, gap] in metres, or null for solid. */
    line(from, to, x, color = COLORS.white, dash = null, width = 0.16) {
      const fx = typeof x === "function" ? x : () => x;
      if (!dash) {
        strip(from, to, (s) => fx(s) - width / 2, (s) => fx(s) + width / 2, color, 0.02, 4);
        return;
      }
      for (let s = from; s < to; s += dash[0] + dash[1]) {
        const e = Math.min(to, s + dash[0]);
        strip(s, e, (v) => fx(v) - width / 2, (v) => fx(v) + width / 2, color, 0.02, dash[0]);
      }
    },

    /** A painted bar across the road (stop line, crosswalk stripe). */
    bar(s, xFrom, xTo, depth = 0.5, color = COLORS.white) {
      statics.quad(at(s, xFrom, 0.025), at(s, xTo, 0.025), at(s + depth, xTo, 0.025), at(s + depth, xFrom, 0.025), color);
    },

    /** Zebra stripes across the road, starting at s. */
    crosswalk(s, xFrom, xTo, depth = 3) {
      for (let x = xFrom + 0.3; x < xTo - 0.3; x += 1.1) {
        world.bar(s, x, x + 0.6, depth);
      }
    },

    /** A box sitting on the ground at road coordinates. */
    block(s, x, w, h, d, color, lift = 0, rotY = 0) {
      statics.box(x, y(s, lift + h / 2), -s, w, h, d, color, rotY);
    },

    tree(s, x, scale = 1) {
      const base = y(s);
      const trunk = new THREE.CylinderGeometry(0.22 * scale, 0.3 * scale, 1.6 * scale, 5);
      statics.addGeometry(trunk, new THREE.Matrix4().makeTranslation(x, base + 0.8 * scale, -s), COLORS.trunk);
      const crown = new THREE.ConeGeometry(1.7 * scale, 4.2 * scale, 6);
      statics.addGeometry(
        crown,
        new THREE.Matrix4().makeTranslation(x, base + 3.5 * scale, -s),
        rng.next() > 0.5 ? COLORS.leaf : COLORS.leafDark,
      );
    },

    /** Seeded trees along both sides, clear of the road and of any s ranges in `skip`. */
    treeLine(from, to, { near = 9, far = 34, every = 11, skip = [], sides = [-1, 1] } = {}) {
      for (let s = from; s < to; s += every) {
        for (const side of sides) {
          if (rng.next() < 0.25) continue;
          const sj = s + rng.range(-3, 3);
          if (skip.some(([a, b]) => sj > a && sj < b)) continue;
          world.tree(sj, side * rng.range(near, far), rng.range(0.8, 1.5));
        }
      }
    },

    building(s, x, w, d, h, color) {
      world.block(s, x, w, h, d, color);
      world.block(s, x, w + 0.3, 0.4, d + 0.3, COLORS.pole, h);
      // A row of dark windows on the side facing the road.
      const face = x > 0 ? x - w / 2 - 0.02 : x + w / 2 + 0.02;
      for (let level = 2.2; level < h - 1; level += 3) {
        statics.box(face, y(s, level), -s, 0.06, 1.3, d * 0.8, COLORS.glass);
      }
    },

    /** Seeded buildings along one or both sides. */
    buildingLine(from, to, { setback = 13, sides = [-1, 1], skip = [] } = {}) {
      const palette = ["#d8c3a5", "#b8c4d0", "#c9b6d0", "#e2d4b7", "#aebfae", "#d9b3a0"];
      for (const side of sides) {
        let s = from;
        while (s < to) {
          const d = rng.range(9, 16);
          const w = rng.range(8, 12);
          const h = rng.range(6, 15);
          const mid = s + d / 2;
          if (!skip.some(([a, b]) => mid + d / 2 > a && mid - d / 2 < b)) {
            world.building(mid, side * (setback + w / 2), w, d, h, rng.pick(palette));
          }
          s += d + rng.range(1.5, 4);
        }
      }
    },

    pole(s, x, height = 3, thickness = 0.14) {
      world.block(s, x, thickness, height, thickness, COLORS.pole);
    },

    /**
     * A sign on a pole, facing drivers coming from behind (lower s).
     * Signs are drawn larger than life so a phone can read them.
     */
    sign(kind, s, x, { size = 2.2, height = 2.3 } = {}) {
      world.pole(s, x, height + size / 2);
      let faceMaterial;
      if (makeCanvas) {
        const canvas = paintSign(kind, makeCanvas(256, 256));
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        faceMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.4, fog: false });
        disposables.push(texture);
      } else {
        faceMaterial = new THREE.MeshBasicMaterial({ color: COLORS.yellow });
      }
      const geometry = new THREE.PlaneGeometry(size, size);
      disposables.push(faceMaterial, geometry);
      const mesh = new THREE.Mesh(geometry, faceMaterial);
      mesh.position.set(x, y(s, height + size / 2), -s + 0.12);
      mesh.name = `sign:${kind}`;
      scene.add(mesh);
      return mesh;
    },

    /** Flat text painted on the road, readable from the driver's side. */
    groundLabel(text, s, x, { width = 2.4, color = "#ffffff" } = {}) {
      if (!makeCanvas) return null;
      const canvas = paintLabel(text, makeCanvas(256, 96), color);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const faceMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
      const geometry = new THREE.PlaneGeometry(width, width * 0.375);
      disposables.push(texture, faceMaterial, geometry);
      const mesh = new THREE.Mesh(geometry, faceMaterial);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y(s, 0.05), -s);
      mesh.name = `label:${text}`;
      scene.add(mesh);
      return mesh;
    },

    /**
     * A lamp that can be switched: a signal lens, a light bar, a brake light.
     * Returns { mesh, set(on) }. Pass blink = { hz, phase } to have the stage flash it.
     */
    lamp(parent, [lx, ly, lz], [w, h, d], onColor, { offColor = "#2a2d33", blink = null } = {}) {
      const lampMaterial = new THREE.MeshBasicMaterial({ color: offColor, fog: false });
      const geometry = new THREE.BoxGeometry(w, h, d);
      disposables.push(lampMaterial, geometry);
      const mesh = new THREE.Mesh(geometry, lampMaterial);
      mesh.position.set(lx, ly, lz);
      (parent || scene).add(mesh);
      const lamp = {
        mesh,
        on: false,
        set(on) {
          if (lamp.on === on) return;
          lamp.on = on;
          lampMaterial.color.set(on ? onColor : offColor);
        },
      };
      if (blink) blinkers.push({ lamp, hz: blink.hz ?? 1, phase: blink.phase ?? 0, active: blink.active ?? true });
      return lamp;
    },

    /**
     * A signal head hanging over the road on a mast arm, with one flashing lens.
     * color: "red" | "yellow". Oversized on purpose.
     */
    beacon(s, { color = "red", armFrom = 6.5, x = 0, height = 11 } = {}) {
      world.pole(s, armFrom, height + 0.6, 0.28);
      statics.box((armFrom + x) / 2, y(s, height + 0.3), -s, Math.abs(armFrom - x) + 0.6, 0.2, 0.2, COLORS.pole);
      world.block(s, x, 1.7, 4.5, 0.7, "#facc15", height - 4.5); // yellow housing
      const lit = color === "red" ? "#ff2d2d" : "#ffd21a";
      const row = color === "red" ? 2 : 1; // red on top, yellow in the middle
      const lenses = [];
      for (let i = 0; i < 3; i++) {
        const ly = y(s, height - 3.75 + i * 1.5);
        const isLit = i === row;
        lenses.push(
          world.lamp(null, [x, ly, -s + 0.4], [1.15, 1.15, 0.12], lit, {
            // The flashing lens stays faintly coloured when dark, so a still frame still reads.
            offColor: isLit ? (color === "red" ? "#5b1414" : "#5c4a0a") : "#1b1d22",
            blink: isLit ? { hz: 1 } : null,
          }),
        );
      }
      return lenses[row];
    },

    hydrant(s, x) {
      const base = y(s);
      const body = new THREE.CylinderGeometry(0.28, 0.32, 0.9, 6);
      statics.addGeometry(body, new THREE.Matrix4().makeTranslation(x, base + 0.45, -s), COLORS.hydrant);
      const cap = new THREE.ConeGeometry(0.3, 0.3, 6);
      statics.addGeometry(cap, new THREE.Matrix4().makeTranslation(x, base + 1.05, -s), COLORS.hydrant);
      statics.box(x, base + 0.55, -s, 0.9, 0.2, 0.2, COLORS.hydrant);
    },

    /** One mesh per vehicle. kind: car | truck | police | fire. Nose points forward (+s). */
    vehicle(kind = "car", color = COLORS.blue) {
      const b = new Batch();
      const wheel = (wx, wz, r = 0.36) => b.box(wx, r, wz, 0.3, r * 2, r * 2, COLORS.tire);
      let length = 4.4;
      if (kind === "truck" || kind === "fire") {
        length = 8;
        const boxColor = kind === "fire" ? COLORS.red : color;
        const cabColor = kind === "fire" ? COLORS.red : COLORS.truckCab;
        b.box(0, 0.05, 0, 2.7, 0.04, 8.3, COLORS.asphaltDark); // shadow
        b.box(0, 2.0, 1.0, 2.5, 2.8, 5.8, boxColor); // cargo box
        b.box(0, 1.45, -3.0, 2.3, 1.9, 1.9, cabColor); // cab
        b.box(0, 1.85, -3.97, 2.0, 0.7, 0.06, COLORS.glass); // windshield
        b.box(0, 0.75, -3.98, 2.1, 0.25, 0.06, "#fde68a"); // headlights
        b.box(0, 0.9, 3.92, 2.3, 0.3, 0.06, "#b91c1c"); // tail lights
        b.box(0, 0.55, 3.9, 2.5, 0.25, 0.1, "#9ca3af"); // rear bumper
        if (kind === "fire") b.box(0, 2.0, 1.0, 2.54, 0.35, 5.84, COLORS.white);
        for (const wz of [-3.0, 1.2, 3.0]) {
          wheel(-1.15, wz, 0.48);
          wheel(1.15, wz, 0.48);
        }
      } else {
        const body = kind === "police" ? "#f8fafc" : color;
        b.box(0, 0.04, 0, 2.0, 0.04, 4.7, COLORS.asphaltDark); // shadow
        b.box(0, 0.66, 0, 1.8, 0.62, 4.4, body);
        b.box(0, 1.25, 0.25, 1.6, 0.6, 2.3, kind === "police" ? "#111827" : body);
        b.box(0, 1.27, 0.25, 1.64, 0.42, 2.0, COLORS.glass); // side windows
        b.box(0, 1.27, -0.92, 1.45, 0.42, 0.06, COLORS.glass); // windshield
        b.box(0, 1.27, 1.42, 1.45, 0.42, 0.06, COLORS.glass); // rear window
        b.box(-0.6, 0.72, -2.2, 0.4, 0.2, 0.06, "#fde68a");
        b.box(0.6, 0.72, -2.2, 0.4, 0.2, 0.06, "#fde68a");
        b.box(-0.6, 0.74, 2.2, 0.4, 0.2, 0.06, "#991b1b");
        b.box(0.6, 0.74, 2.2, 0.4, 0.2, 0.06, "#991b1b");
        for (const wz of [-1.4, 1.4]) {
          wheel(-0.85, wz);
          wheel(0.85, wz);
        }
      }
      const mesh = meshFrom(b);
      mesh.rotation.order = "YXZ";
      mesh.userData = { kind, length };
      mesh.name = `vehicle:${kind}`;
      scene.add(mesh);
      if (kind === "police" || kind === "fire") {
        const top = kind === "fire" ? 2.5 : 1.62;
        const fz = kind === "fire" ? -3.0 : 0.2;
        mesh.userData.lights = [
          world.lamp(mesh, [-0.45, top, fz], [0.7, 0.22, 0.4], "#ff2d2d", { blink: { hz: 3, active: false } }),
          world.lamp(mesh, [0.45, top, fz], [0.7, 0.22, 0.4], kind === "fire" ? "#ffffff" : "#3b82f6", {
            blink: { hz: 3, phase: 0.5, active: false },
          }),
        ];
      }
      return mesh;
    },

    /** Brake lights for the learner's car: one more small mesh, lit while slowing. */
    brakeLights(vehicle) {
      return world.lamp(vehicle, [0, 0.74, 2.23], [1.62, 0.22, 0.06], "#ff3b30", { offColor: "#7f1d1d" });
    },

    person(color = COLORS.blue) {
      const b = new Batch();
      b.box(0, 0.03, 0, 0.7, 0.03, 0.5, COLORS.asphaltDark);
      b.box(-0.13, 0.42, 0, 0.2, 0.84, 0.24, "#1f2937");
      b.box(0.13, 0.42, 0, 0.2, 0.84, 0.24, "#1f2937");
      b.box(0, 1.2, 0, 0.56, 0.74, 0.32, color);
      b.box(0, 1.76, 0, 0.34, 0.34, 0.34, COLORS.skin);
      const mesh = meshFrom(b);
      mesh.name = "person";
      scene.add(mesh);
      return mesh;
    },

    /** Any extra moving prop built from boxes: fn(batch) fills it. */
    prop(name, fill) {
      const b = new Batch();
      fill(b);
      const mesh = meshFrom(b);
      mesh.rotation.order = "YXZ";
      mesh.name = name;
      scene.add(mesh);
      return mesh;
    },

    /** Put an actor on the road. yaw > 0 turns the nose to the left. */
    place(object, s, x, { yaw = 0, lift = 0, pitch = null, roll = 0, visible = true } = {}) {
      object.visible = visible;
      object.position.set(x, y(s, lift), -s);
      const slope = pitch ?? Math.atan2(heightAt(s + 1) - heightAt(s - 1), 2);
      object.rotation.set(slope, yaw, roll, "YXZ");
    },

    /** Turn a police or fire light bar on or off. */
    flash(vehicle, on) {
      for (const lamp of vehicle.userData.lights || []) {
        const entry = blinkers.find((b) => b.lamp === lamp);
        if (entry) entry.active = on;
        if (!on) lamp.set(false);
      }
    },

    /** Called once after the builder has added all static scenery. */
    finish() {
      const mesh = meshFrom(statics);
      mesh.name = "static";
      scene.add(mesh);
      return mesh;
    },

    /** Flash every blinking lamp from one clock, so lights are in step and deterministic. */
    tickLamps(clock) {
      for (const b of blinkers) {
        if (!b.active) continue;
        b.lamp.set((clock * b.hz + b.phase) % 1 < 0.6);
      }
    },

    /** Rough count of draw calls: every visible mesh is one. */
    countMeshes() {
      let count = 0;
      scene.traverse((o) => {
        if (o.isMesh) count++;
      });
      return count;
    },

    dispose() {
      for (const item of disposables) item.dispose?.();
    },
  };
  return world;
}
