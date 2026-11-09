/** Browser PCM helpers. No recording is persisted. */
export function encodePcm16(samples: Float32Array): ArrayBuffer {
  const output = new ArrayBuffer(samples.length * 2);
  const view = new DataView(output);
  samples.forEach((value, i) => { const sample = Math.max(-1, Math.min(1, value)); view.setInt16(i * 2, Math.round(sample * (sample < 0 ? 32768 : 32767)), true); });
  return output;
}

export function decodePcm24(base64: string): Float32Array<ArrayBuffer> {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  if (bytes.length % 2) throw new Error('Invalid PCM audio');
  const view = new DataView(bytes.buffer);
  const result = new Float32Array(bytes.length / 2);
  for (let i = 0; i < result.length; i++) result[i] = view.getInt16(i * 2, true) / 32768;
  return result;
}

/** Carries fractional source positions across chunks to avoid timing drift. */
export class StreamingResampler {
  private pending = new Float32Array(0);
  private position = 0;
  constructor(private sourceRate: number, private targetRate: number) {}
  push(frame: Float32Array): Float32Array {
    if (this.sourceRate === this.targetRate) return frame;
    const joined = new Float32Array(this.pending.length + frame.length);
    joined.set(this.pending); joined.set(frame, this.pending.length);
    const step = this.sourceRate / this.targetRate;
    const result: number[] = [];
    while (this.position + step <= joined.length) {
      const end = this.position + step;
      let sum = 0;
      for (let i = Math.floor(this.position); i < Math.ceil(end); i++) sum += joined[i] * (Math.min(i + 1, end) - Math.max(i, this.position));
      result.push(sum / step); this.position = end;
    }
    const consumed = Math.floor(this.position);
    this.pending = joined.slice(consumed); this.position -= consumed;
    return new Float32Array(result);
  }
}

/** Only audio already heard counts toward a server-side interruption truncate. */
export function playedAudioMs(completedMs: number, queued: { start: number; duration: number }[], now: number): number {
  return Math.floor(completedMs + queued.reduce((sum, part) => sum + Math.max(0, Math.min(part.duration, now - part.start)) * 1000, 0));
}
