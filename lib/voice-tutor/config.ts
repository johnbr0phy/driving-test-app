// Server-owned rates and limits. Verified against official docs 2026-11-08.
// No browser-supplied model, prompt, rates, tools or provider settings.
export const VOICE_RATE_CARD = {
  version: 'openai-standard-usd-2026-11-08',
  model: 'gpt-realtime-2.1',
  contextTokens: 128000,
  maxOutputTokens: 1024,
  textInput: 4,
  textCached: 0.4,
  textOutput: 24,
  audioInput: 32,
  audioCached: 0.4,
  audioOutput: 64,
} as const;
// Whole context as instruction TEXT + acknowledged 16k conversation cap at
// AUDIO input rate + 1024 output tokens at AUDIO output rate. This deliberately
// double-counts some context and depends on verifying session.updated caps.
export const VOICE_POST_INSTRUCTIONS_TOKENS = 16000;
export const VOICE_TURN_RESERVE_MICROUSD = 1_089_536;
export const VOICE_MAX_RESPONSES = 10;
export const VOICE_SESSION_RESERVE_MICROUSD = VOICE_TURN_RESERVE_MICROUSD * VOICE_MAX_RESPONSES;
export const VOICE_PROMPT_VERSION = 'tiger-grounded-realtime-v1';
export const VOICE_SAMPLE_RATE = 24000;
export const VOICE_COOKIE = 'tt-voice-pilot';

export function voicePilotEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.VOICE_TUTOR_PILOT === 'true' && !!env.OPENAI_API_KEY &&
    (env.VOICE_TUTOR_COOKIE_SECRET?.length ?? 0) >= 32 &&
    env.VOICE_TUTOR_LEDGER_RULES_VERIFIED === 'true' && !!env.VOICE_TUTOR_RELAY_URL;
}
export class VoiceTutorError extends Error {
  constructor(message: string, public status = 400, public code = 'invalid_request') { super(message); }
}
