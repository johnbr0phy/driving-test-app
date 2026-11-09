import { VOICE_RATE_CARD, VOICE_POST_INSTRUCTIONS_TOKENS } from '@/lib/voice-tutor/config';
export function realtimeSession(instructions: string) {
  return {
    type: 'realtime', model: VOICE_RATE_CARD.model, instructions, output_modalities: ['audio'],
    max_output_tokens: VOICE_RATE_CARD.maxOutputTokens, tools: [],
    audio: {
      input: { format: { type: 'audio/pcm', rate: 24000 }, turn_detection: { type: 'server_vad', create_response: false, interrupt_response: true, prefix_padding_ms: 300, silence_duration_ms: 500, threshold: 0.5 } },
      output: { format: { type: 'audio/pcm', rate: 24000 }, voice: 'marin' },
    },
    truncation: { type: 'retention_ratio', retention_ratio: 0.8, token_limits: { post_instructions: VOICE_POST_INSTRUCTIONS_TOKENS } },
  };
}
// Fail closed if the provider did not acknowledge every cost-control premise.
// Model aliases can resolve to a dated snapshot, but never another model family.
export function validRealtimeSession(s: any): boolean {
  return !!s && typeof s.model === 'string' && (s.model === VOICE_RATE_CARD.model || s.model.startsWith(`${VOICE_RATE_CARD.model}-20`)) &&
    s.max_output_tokens === VOICE_RATE_CARD.maxOutputTokens && Array.isArray(s.tools) && s.tools.length === 0 &&
    s.output_modalities?.length === 1 && s.output_modalities[0] === 'audio' &&
    s.audio?.input?.format?.type === 'audio/pcm' && s.audio.input.format.rate === 24000 &&
    !s.audio.input.transcription && s.audio.input.turn_detection?.type === 'server_vad' &&
    s.audio.input.turn_detection.create_response === false && s.audio.input.turn_detection.interrupt_response === true &&
    s.audio.input.turn_detection.idle_timeout_ms == null &&
    s.audio.output?.format?.type === 'audio/pcm' && s.audio.output.format.rate === 24000 &&
    s.truncation?.type === 'retention_ratio' && s.truncation.token_limits?.post_instructions === VOICE_POST_INSTRUCTIONS_TOKENS;
}
export class AudioRateGuard {
  private total = 0; private windowAt: number; private windowBytes = 0;
  constructor(private startedAt: number) { this.windowAt = startedAt; }
  accept(bytes: number, now = Date.now()): boolean {
    if (!Number.isInteger(bytes) || bytes <= 0 || bytes > 16384 || bytes % 2) return false;
    if (now - this.windowAt >= 1000) { this.windowAt = now; this.windowBytes = 0; }
    this.total += bytes; this.windowBytes += bytes;
    // At most two seconds of queued PCM per second, and a small startup burst.
    return this.windowBytes <= 96000 && this.total <= (now - this.startedAt + 2000) * 48 && this.total <= 120 * 48000;
  }
}
