import { VOICE_RATE_CARD, VoiceTutorError } from '@/lib/voice-tutor/config';
type Counts = Record<string, unknown>;
function count(value: unknown, name: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) throw new VoiceTutorError(`Missing or invalid ${name} usage`, 502, 'usage_unknown');
  return value as number;
}
/** Realtime response.done: cache counts are subsets, never extra input. */
export function realtimeCost(usage: unknown) {
  const u = usage as Counts | undefined;
  if (!u) throw new VoiceTutorError('Missing tutor usage', 502, 'usage_unknown');
  const input = count(u.input_tokens, 'input');
  const output = count(u.output_tokens, 'output');
  const total = count(u.total_tokens, 'total');
  const i = u.input_token_details as Counts | undefined;
  const o = u.output_token_details as Counts | undefined;
  const c = i?.cached_tokens_details as Counts | undefined;
  const inputTextTokens = count(i?.text_tokens, 'input text');
  const inputAudioTokens = count(i?.audio_tokens, 'input audio');
  const outputTextTokens = count(o?.text_tokens, 'output text');
  const outputAudioTokens = count(o?.audio_tokens, 'output audio');
  const cached = count(i?.cached_tokens, 'cached');
  const cachedTextTokens = cached === 0 ? 0 : count(c?.text_tokens, 'cached text');
  const cachedAudioTokens = cached === 0 ? 0 : count(c?.audio_tokens, 'cached audio');
  if (inputTextTokens + inputAudioTokens !== input || outputTextTokens + outputAudioTokens !== output ||
    cachedTextTokens + cachedAudioTokens !== cached || cachedTextTokens > inputTextTokens || cachedAudioTokens > inputAudioTokens ||
    total !== input + output || input > VOICE_RATE_CARD.contextTokens || output > VOICE_RATE_CARD.maxOutputTokens) {
    throw new VoiceTutorError('Tutor usage exceeded the bounded request', 502, 'usage_unknown');
  }
  const r = VOICE_RATE_CARD;
  const microusd = Math.ceil((inputTextTokens - cachedTextTokens) * r.textInput + cachedTextTokens * r.textCached +
    (inputAudioTokens - cachedAudioTokens) * r.audioInput + cachedAudioTokens * r.audioCached +
    outputTextTokens * r.textOutput + outputAudioTokens * r.audioOutput);
  return { microusd, usage: { inputTextTokens, inputAudioTokens, cachedTextTokens, cachedAudioTokens, outputTextTokens, outputAudioTokens, totalTokens: total } };
}
