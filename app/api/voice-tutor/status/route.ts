import { NextRequest, NextResponse } from 'next/server';
import { voicePilotEnabled } from '@/lib/voice-tutor/config';
import { participant } from '@/lib/server/voiceTutorSecurity';
import { readVoiceTutorStatus } from '@/lib/server/voiceTutorLedger';
import { noStore, voiceError } from '@/lib/server/voiceTutorHttp';
export async function GET(request: NextRequest) {
  if (!voicePilotEnabled()) return NextResponse.json({ enabled: false }, { headers: noStore });
  try { const status = await readVoiceTutorStatus({ participantId: participant(request).id });
    return NextResponse.json({ enabled: !status.budget.paused, remainingUsd: status.budget.remainingMicrousd / 1000000, limits: status.limits }, { headers: noStore });
  } catch (error) { return voiceError(error); }
}
