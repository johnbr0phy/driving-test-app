import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { voicePilotEnabled, VOICE_COOKIE, VoiceTutorError } from '@/lib/voice-tutor/config';
import { participant, requireSameOrigin, voiceIpKey, makeVoiceTicket, relayUrl } from '@/lib/server/voiceTutorSecurity';
import { voiceQuestionKey, loadVoiceQuestion } from '@/lib/server/voiceTutorQuestion';
import { createVoiceSession, readVoiceTutorStatus } from '@/lib/server/voiceTutorLedger';
import { smallJson, noStore, voiceError } from '@/lib/server/voiceTutorHttp';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  try {
    if (!voicePilotEnabled()) throw new VoiceTutorError('The voice pilot is not open yet.', 503, 'disabled');
    requireSameOrigin(request);
    const body = await smallJson(request); const key = voiceQuestionKey(body);
    loadVoiceQuestion(key, body.questionText);
    const identity = participant(request); const ipKey = voiceIpKey(request); const sessionId = randomUUID();
    const url = relayUrl(request.url);
    const session = await createVoiceSession({ participantId: identity.id, ipKey, sessionId, questionKey: JSON.stringify(key) });
    const status = await readVoiceTutorStatus({ participantId: identity.id });
    const ticket = makeVoiceTicket({ participantId: identity.id, ipKey, sessionId, expiresAt: Date.now() + 30000 });
    const response = NextResponse.json({ sessionId, relayUrl: url, ticket, expiresAt: session.expiresAtMs, maxSeconds: 120, remainingUsd: status.budget.remainingMicrousd / 1000000 }, { headers: noStore });
    response.cookies.set(VOICE_COOKIE, identity.cookie, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', path: '/', maxAge: 7 * 86400 });
    return response;
  } catch (error) { return voiceError(error); }
}
