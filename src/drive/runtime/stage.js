// The stage: renderer, chase camera and the frame loop around one scene.
// three.js is imported here and in world.js only, and this module is only
// ever loaded with import() from a drive page.

import * as THREE from "three";
import { createAudio } from "./audio.js";
import { createMachine } from "./machine.js";
import { clamp, lerp } from "./motion.js";
import { createWorld } from "./world.js";

/** True when this browser can give us a WebGL context. */
export function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const DEFAULT_CAM = { back: 9, height: 4, ahead: 16, lookX: 0, lookUp: 1.2, side: 0, tilt: 1 };

/**
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas
 * @param {{ describe: Function, build: Function }} options.builder
 * @param {object} options.record
 * @param {boolean} [options.reducedMotion]
 * @param {(event: any) => void} [options.onEvent] machine events, plus { type: "frame" } once a second
 */
export function createStage({ canvas, builder, record, reducedMotion = false, onEvent = () => {} }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const camera = new THREE.PerspectiveCamera(60, 1, 0.5, 400);
  const audio = createAudio();

  let script = builder.describe(record);
  let world = null;
  let actors = null;
  let machine = null;
  let frame = null;
  let raf = 0;
  let last = 0;
  let clock = 0;
  let shake = 0;
  let disposed = false;
  const cam = { ...DEFAULT_CAM };
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  let camSnap = true;
  const fps = { frames: 0, since: 0, value: 0, min: Infinity };

  function setup() {
    world?.dispose();
    world = createWorld({
      seed: script.seed,
      heightAt: builder.heightAt ? (s) => builder.heightAt(s, record) : undefined,
      makeCanvas: (w, h) => {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        return c;
      },
    });
    actors = builder.build(world, record, script);
    world.finish();
    machine = createMachine(script, { reducedMotion });
    clock = 0;
    shake = 0;
    camSnap = true;
  }

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Portrait needs a taller view to keep the roadside signs in frame.
    camera.fov = camera.aspect < 0.8 ? 74 : camera.aspect < 1.2 ? 64 : 54;
    camera.updateProjectionMatrix();
  }

  function handle(events) {
    for (const event of events || []) {
      if (event.type === "cue") {
        if (event.id === "shake") shake = reducedMotion ? 0 : 1;
        else audio.play(event.id);
        continue;
      }
      if (event.type === "result") audio.play(event.ok ? "ding" : "buzz");
      onEvent(event);
    }
  }

  function draw(dt) {
    const view = machine.view();
    frame = actors.update({ ...view, clock }) || {};
    world.tickLamps(clock);

    const want = { ...DEFAULT_CAM, ...(frame.cam || {}) };
    const portrait = camera.aspect < 0.8;
    // Pitch the camera down so the road, not the sky, fills the picture;
    // a tall phone screen needs more of it. tilt scales that per scene.
    if (portrait) {
      want.back += 2.5;
      want.height += 1.6;
      want.lookUp -= 6 * want.tilt;
    } else {
      want.lookUp -= 2 * want.tilt;
    }
    const k = camSnap || reducedMotion ? 1 : 1 - Math.exp(-dt * 3.5);
    for (const key of Object.keys(DEFAULT_CAM)) cam[key] = lerp(cam[key], want[key], k);
    const focus = frame.focus || { s: 0, x: 0 };
    const h = world.heightAt(focus.s);
    const jitter = shake > 0.01 ? Math.sin(clock * 70) * 0.25 * shake : 0;
    camPos.set(focus.x * 0.85 + cam.side + jitter, world.heightAt(focus.s - cam.back) + cam.height, -(focus.s - cam.back));
    camLook.set(focus.x * 0.6 + cam.lookX, Math.max(h, world.heightAt(focus.s + cam.ahead)) * 0.5 + h * 0.5 + cam.lookUp, -(focus.s + cam.ahead));
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    camSnap = false;
    shake = Math.max(0, shake - dt * 2.2);
    renderer.render(world.scene, camera);
  }

  function tick(now) {
    if (disposed) return;
    raf = requestAnimationFrame(tick);
    const dt = clamp((now - last) / 1000, 0, 0.25);
    last = now;
    clock += dt;
    handle(machine.advance(dt));
    draw(dt);
    fps.frames++;
    fps.since += dt;
    if (fps.since >= 1) {
      fps.value = Math.round(fps.frames / fps.since);
      if (machine.state.phase === "play") fps.min = Math.min(fps.min, fps.value);
      fps.frames = 0;
      fps.since = 0;
      onEvent({ type: "frame" });
    }
  }

  setup();
  resize();
  draw(0);
  const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
    resize();
    draw(0);
  }) : null;
  observer?.observe(canvas);
  last = performance.now();
  raf = requestAnimationFrame(tick);

  return {
    script,
    /** Begin (or begin again). Call from a tap so sound is allowed. */
    start() {
      audio.unlock();
      if (machine.state.phase !== "idle") setup();
      handle(machine.start());
    },
    choose(optionId) {
      audio.unlock();
      const events = machine.choose(optionId);
      if (events) handle(events);
      return Boolean(events);
    },
    decision: () => machine.decision(),
    state: () => ({ ...machine.state, caption: script.segments[machine.state.seg].caption, speedMph: frame?.speedMph ?? null }),
    setMuted: (value) => audio.setMuted(value),
    stats: () => ({
      fps: fps.value,
      minFps: Number.isFinite(fps.min) ? fps.min : null,
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      meshes: world.countMeshes(),
      textures: renderer.info.memory.textures,
    }),
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      audio.dispose();
      world?.dispose();
      renderer.dispose();
    },
  };
}
