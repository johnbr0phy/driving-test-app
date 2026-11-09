require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const { encodePcm16, decodePcm24, playedAudioMs, StreamingResampler } = require('../lib/voiceTutorAudio.ts');

test('PCM16 is little-endian and clips samples', () => {
  const pcm = encodePcm16(new Float32Array([-2, -1, 0, 1, 2]));
  const v = new DataView(pcm);
  assert.deepEqual(Array.from({ length: 5 }, (_, i) => v.getInt16(i * 2, true)), [-32768, -32768, 0, 32767, 32767]);
  const decoded = decodePcm24(Buffer.from(pcm).toString('base64'));
  assert.equal(decoded[0], -1); assert.equal(decoded[2], 0);
  assert.ok(Math.abs(decoded[4] - 1) < 0.0001);
  assert.throws(() => decodePcm24('AA=='));
});

test('streaming resampler preserves duration across irregular chunk boundaries', () => {
  for (const rate of [16000, 24000, 44100, 48000]) {
    const resampler = new StreamingResampler(rate, 24000);
    let count = 0;
    for (let i = 0; i < rate * 2; i += 128) {
      const result = resampler.push(new Float32Array(Math.min(128, rate * 2 - i)).fill(0.5));
      assert.ok(result.every(x => Math.abs(x - 0.5) < 0.00001));
      count += result.length;
    }
    assert.ok(Math.abs(count - 48000) <= 1, `${rate}: ${count}`);
  }
});

test('UI source guards consent, stale continuations, cleanup, free pilot and continuous duplex audio', () => {
  const source = fs.readFileSync('components/voice-tutor/VoiceTutor.tsx', 'utf8');
  const card = fs.readFileSync('components/TrainingCard.tsx', 'utf8');
  for (const marker of ['Start microphone', 'AI can make mistakes', 'streamed to OpenAI', 'does not store your audio', 'shared $100 pilot budget', 'Interrupt and speak', 'Tutor transcript', '120000', 'r.generation++', 'r.abort?.abort()', 'clearInterval(r.timer)', 'track.stop()', 'r.recorder.port.close()', 'r.context.close()', 'if (!alive(generation))', 'new WebSocket', 'socket.send(encodePcm16(samples))', "data.type === 'speech.started'", 'reportPlayback()', "type: 'end'", 'socket.bufferedAmount > 256000', '30 seconds without speech']) assert.ok(source.includes(marker), marker);
  assert.match(source, /questionText, language/);
  assert.match(card, /NEXT_PUBLIC_VOICE_TUTOR_PILOT === "true"/);
  assert.match(card, /optionOrder=\{question.optionOrder \?\? "ABCD"\}/);
  assert.match(card, /key=\{`\$\{reportExamId/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|FormData|voice-tutor\/turn|session.update/);
});

test('interruption reports heard milliseconds, never queued/generated duration', () => {
  const queue = [{ start: 10, duration: 1 }, { start: 11, duration: 1 }];
  assert.equal(playedAudioMs(200, queue, 9), 200);
  assert.equal(playedAudioMs(200, queue, 10.5), 700);
  assert.equal(playedAudioMs(200, queue, 11.5), 1700);
  assert.equal(playedAudioMs(200, queue, 15), 2200);
});
