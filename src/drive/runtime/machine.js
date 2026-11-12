// The scene state machine: pure logic, no three.js, no DOM.
//
// A script is a small graph: segments play for a fixed time and end in either
// a decision (time slows, tap targets appear) or a result. Each option of a
// decision names the segment that plays it out.

import { createRng } from "./rng.js";

/** Scene seconds before a decision in which time runs slow and the choices are up. */
export const SLOW_WINDOW = 0.5;
/** Time scale inside that window: 0.5 scene seconds take about four real ones. */
export const SLOW_SCALE = 0.12;

/**
 * Build a script from a record and a builder's plan.
 *
 * plan = {
 *   intro: { duration, caption, cues? },
 *   decisions: { [decisionId]: { [action]: { duration, caption, cues? } } },
 * }
 * Each decision in the record is a bank question: its options are the four
 * answers, each naming the action it plays. Options can share an action, but
 * an action is either right or wrong, never both. The right option leads to
 * the next decision, or the "ok" result after the last one; a wrong option
 * ends the scene with its consequence. Options are shuffled with the record's
 * seed (as the test shuffles them), so the order is stable per record.
 */
export function buildScript(record, plan) {
  const seed = `${record.rule}:${record.questionId}:${record.state}`;
  const rng = createRng(seed);
  const segments = {};
  const decisions = {};
  const list = record.decisions;
  segments.intro = { ...plan.intro, next: { decision: list[0].id } };
  list.forEach((decision, index) => {
    const branches = plan.decisions[decision.id];
    if (!branches) throw new Error(`No plan for decision ${decision.id}`);
    const nextDecision = list[index + 1];
    const options = rng.shuffle(decision.options).map((option) => {
      const segment = `${decision.id}:${option.action}`;
      const next = option.correct
        ? nextDecision
          ? { decision: nextDecision.id }
          : { result: { ok: true } }
        : { result: { ok: false } };
      if (!segments[segment]) {
        const branch = branches[option.action];
        if (!branch) throw new Error(`No plan for action ${decision.id}.${option.action}`);
        segments[segment] = { ...branch, next };
      } else if (JSON.stringify(segments[segment].next) !== JSON.stringify(next)) {
        throw new Error(`Action ${decision.id}.${option.action} is used by a right and a wrong answer`);
      }
      return { ...option, label: option.text, segment };
    });
    decisions[decision.id] = {
      id: decision.id,
      questionId: decision.questionId,
      prompt: decision.prompt,
      sign: decision.sign,
      signAlt: decision.signAlt,
      options,
    };
  });
  return { seed, start: "intro", segments, decisions };
}

/** Every path through a script: [{ choices: [optionId...], ok, duration }]. */
export function listBranches(script) {
  const out = [];
  const walk = (segmentId, choices, duration) => {
    const segment = script.segments[segmentId];
    const total = duration + segment.duration;
    if (segment.next.result) {
      out.push({ choices, ok: segment.next.result.ok, duration: total });
      return;
    }
    for (const option of script.decisions[segment.next.decision].options) {
      walk(option.segment, [...choices, option.id], total);
    }
  };
  walk(script.start, [], 0);
  return out;
}

export function createMachine(script, { reducedMotion = false } = {}) {
  const state = {
    phase: "idle", // idle | play | decide | result
    seg: script.start,
    t: 0,
    elapsed: 0,
    decisionId: null,
    pending: null,
    result: null,
    history: [],
  };
  let cueIndex = 0;

  const segment = () => script.segments[state.seg];

  function enter(segmentId, events) {
    state.seg = segmentId;
    state.t = 0;
    state.decisionId = null;
    state.pending = null;
    state.phase = "play";
    cueIndex = 0;
    events.push({ type: "segment", id: segmentId });
  }

  function finish(events) {
    const seg = segment();
    state.t = seg.duration;
    if (seg.next.result) {
      const last = state.history[state.history.length - 1] || null;
      state.phase = "result";
      state.result = { ok: seg.next.result.ok, decisionId: last?.decisionId ?? null, optionId: last?.optionId ?? null };
      events.push({ type: "result", ...state.result });
    } else if (state.pending) {
      enter(state.pending.segment, events);
    } else {
      state.phase = "decide";
      if (state.decisionId !== seg.next.decision) {
        state.decisionId = seg.next.decision;
        events.push({ type: "decision", id: state.decisionId });
      }
    }
  }

  function emitCues(events) {
    const cues = segment().cues || [];
    while (cueIndex < cues.length && cues[cueIndex].at <= state.t) {
      events.push({ type: "cue", id: cues[cueIndex].id, at: cues[cueIndex].at });
      cueIndex++;
    }
  }

  /** Reduced motion: no playback, just the still frame at the end of a segment. */
  function jump(events) {
    for (let guard = 0; guard < 8 && state.phase === "play"; guard++) {
      state.elapsed += segment().duration - state.t;
      finish(events);
    }
  }

  return {
    script,
    state,
    start() {
      const events = [];
      if (state.phase !== "idle") return events;
      enter(script.start, events);
      if (reducedMotion) jump(events);
      return events;
    },
    /** Advance by dt real seconds. Returns the events that happened. */
    advance(dt) {
      const events = [];
      if (state.phase !== "play" && state.phase !== "decide") return events;
      let left = dt;
      for (let guard = 0; guard < 6 && left > 1e-6; guard++) {
        if (state.phase !== "play" && state.phase !== "decide") break;
        const seg = segment();
        const remaining = seg.duration - state.t;
        const toDecision = Boolean(seg.next.decision) && !state.pending;
        const slow = toDecision && remaining <= SLOW_WINDOW;
        if (slow && state.phase === "play") {
          state.phase = "decide";
          state.decisionId = seg.next.decision;
          events.push({ type: "decision", id: state.decisionId });
        }
        if (remaining <= 1e-6) {
          if (state.phase === "decide" && !state.pending) {
            state.t = seg.duration; // frozen, waiting for a choice
            break;
          }
          finish(events);
          continue;
        }
        // Run at full speed up to the slow window, then slowly inside it.
        const scale = slow ? SLOW_SCALE : 1;
        const limit = toDecision && !slow ? remaining - SLOW_WINDOW : remaining;
        const step = Math.min(left * scale, limit);
        state.t += step;
        state.elapsed += step;
        left -= step / scale;
        emitCues(events);
        if (seg.duration - state.t <= 1e-6 && (state.pending || seg.next.result)) finish(events);
      }
      return events;
    },
    /** Pick an option of the open decision. Returns the events, or null if not allowed. */
    choose(optionId) {
      if (state.phase !== "decide" || state.pending) return null;
      const decision = script.decisions[state.decisionId];
      const option = decision.options.find((o) => o.id === optionId);
      if (!option) return null;
      const events = [{ type: "choice", decisionId: decision.id, optionId, correct: option.correct }];
      state.history.push({ decisionId: decision.id, optionId, correct: option.correct });
      state.pending = option;
      state.phase = "play";
      if (reducedMotion) {
        finish(events);
        jump(events);
      }
      return events;
    },
    decision() {
      return state.phase === "decide" ? script.decisions[state.decisionId] : null;
    },
    view() {
      const seg = segment();
      return { seg: state.seg, t: state.t, duration: seg.duration, phase: state.phase, elapsed: state.elapsed };
    },
  };
}
