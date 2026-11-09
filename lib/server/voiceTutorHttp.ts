import { NextResponse } from 'next/server';
import { VoiceTutorError } from '@/lib/voice-tutor/config';
import { VoiceTutorLedgerError } from '@/lib/server/voiceTutorLedger';
export const noStore = { 'Cache-Control': 'no-store' };
export function voiceError(error: unknown) {
  if (error instanceof VoiceTutorLedgerError) {
    const messages: Record<string,string> = { daily_limit: 'You have reached today’s free voice limit. Try again tomorrow.', budget_exhausted: 'The free voice pilot budget is now used up.', session_active: 'End your other voice session first.', participant_busy: 'A previous voice session is still being checked. Please try later.', pilot_paused: 'The voice pilot is paused.', session_idle: 'This voice session ended after 30 seconds without speech.' };
    return NextResponse.json({ error: messages[error.code] ?? 'This voice session is unavailable. Please try later.', code: error.code }, { status: error.httpStatus, headers: noStore });
  }
  if (error instanceof VoiceTutorError) return NextResponse.json({ error: error.message, code: error.code }, { status: error.status, headers: noStore });
  // Provider errors may contain speech. Never log raw responses or requests.
  console.error('[voice-tutor] request failed', error instanceof Error ? error.name : 'unknown');
  return NextResponse.json({ error: 'Voice is temporarily unavailable. No automatic retry was made.' }, { status: 503, headers: noStore });
}
export async function smallJson(request: Request) {
  if (!request.body) throw new VoiceTutorError('Missing question.');
  const reader = request.body.getReader(); let bytes = 0; const chunks: Uint8Array[] = [];
  while (true) { const { done, value } = await reader.read(); if (done) break; bytes += value.length; if (bytes > 8000) { await reader.cancel(); throw new VoiceTutorError('Request too large.', 413); } chunks.push(value); }
  try { const value = JSON.parse(Buffer.concat(chunks).toString()); if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(); return value as Record<string,unknown>; }
  catch { throw new VoiceTutorError('Invalid question request.'); }
}
