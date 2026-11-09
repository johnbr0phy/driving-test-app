import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/adminAuth';
import { readVoiceTutorStatus } from '@/lib/server/voiceTutorLedger';
import { noStore, voiceError } from '@/lib/server/voiceTutorHttp';
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request); if (denied) return denied;
  try { const { budget, metrics, limits } = await readVoiceTutorStatus({ participantId: 'aggregate-only' });
    return NextResponse.json({ budget, metrics, limits, measurement: 'Pseudonymous browsers, not verified people. Cost is API usage at the pinned rate card; infrastructure and tax are separate.' }, { headers: noStore });
  } catch (error) { return voiceError(error); }
}
