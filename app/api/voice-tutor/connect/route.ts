import { NextRequest } from 'next/server';
import { upgradeWebSocket } from '@vercel/functions';
import { voicePilotEnabled, VoiceTutorError } from '@/lib/voice-tutor/config';
import { requireSameOrigin, readVoiceTicket } from '@/lib/server/voiceTutorSecurity';
import { serveVoiceRelay } from '@/lib/server/voiceTutorRelay';
import { voiceError } from '@/lib/server/voiceTutorHttp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Vercel Fluid compute supports inbound WebSockets. Leave margin for a
// 120-second conversation, setup, and final usage persistence/cancellation.
export const maxDuration = 180;

export async function GET(request: NextRequest) {
  try {
    if (!voicePilotEnabled()) throw new VoiceTutorError('The voice pilot is not open yet.', 503, 'disabled');
    requireSameOrigin(request);
    const ticket = readVoiceTicket(request.nextUrl.searchParams.get('ticket') || '');
    return await upgradeWebSocket(async socket => {
      // Await ledger settlement, not just browser close. A disconnect can
      // precede cancelled-response usage by several seconds.
      await new Promise<void>((resolve, reject) => {
        void serveVoiceRelay(socket, ticket, { onFinished: resolve }).catch(reject);
      });
    }, { maxPayload: 16384 });
  } catch (error) { return voiceError(error); }
}
