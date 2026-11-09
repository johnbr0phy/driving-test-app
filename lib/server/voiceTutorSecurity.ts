import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { VOICE_COOKIE, VoiceTutorError } from '@/lib/voice-tutor/config';

function secret(): string {
  const key = process.env.VOICE_TUTOR_COOKIE_SECRET;
  if (!key || key.length < 32) throw new VoiceTutorError('Voice pilot is unavailable.', 503, 'unavailable');
  return key;
}
function sign(text: string) { return createHmac('sha256', secret()).update(text).digest('base64url'); }
function unpack(token: string, purpose: string): string | null {
  if (token.length > 2048) return null;
  const [data, mac, extra] = token.split('.');
  if (!data || !mac || extra) return null;
  const expected = Buffer.from(sign(`${purpose}:${data}`));
  const actual = Buffer.from(mac);
  return actual.length === expected.length && timingSafeEqual(actual, expected) ? Buffer.from(data, 'base64url').toString('utf8') : null;
}
function pack(text: string, purpose: string) {
  const data = Buffer.from(text).toString('base64url');
  return `${data}.${sign(`${purpose}:${data}`)}`;
}
export function participant(request: NextRequest) {
  const existing = request.cookies.get(VOICE_COOKIE)?.value;
  const decoded = existing && unpack(existing, 'participant');
  const id = decoded && /^[a-f0-9-]{36}$/.test(decoded) ? decoded : randomUUID();
  return { id, cookie: pack(id, 'participant') };
}
export function requireSameOrigin(request: NextRequest) {
  if (request.headers.get('origin') !== new URL(request.url).origin) throw new VoiceTutorError('Open the tutor on Tigertest.', 403, 'origin');
}
export function voiceIpKey(request: NextRequest) {
  // Vercel overwrites this header. Never accept arbitrary X-Forwarded-For.
  // Other hosts must provide a trusted-proxy implementation before enabling.
  const ip = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : process.env.NODE_ENV === 'development' ? 'local-development' : null;
  if (!ip) throw new VoiceTutorError('Voice pilot IP controls are not configured.', 503, 'unavailable');
  return createHmac('sha256', secret()).update(`ip:${new Date().toISOString().slice(0, 10)}:${ip}`).digest('hex');
}
export interface VoiceTicket { participantId: string; sessionId: string; ipKey: string; expiresAt: number }
export function makeVoiceTicket(ticket: VoiceTicket) { return pack(JSON.stringify(ticket), 'relay'); }
export function readVoiceTicket(token: string, now = Date.now()): VoiceTicket {
  const raw = unpack(token, 'relay');
  if (!raw) throw new VoiceTutorError('Voice link expired. Start a new session.', 403, 'ticket');
  let ticket: VoiceTicket;
  try { ticket = JSON.parse(raw); } catch { throw new VoiceTutorError('Invalid voice link.', 403, 'ticket'); }
  if (!/^[a-f0-9-]{36}$/.test(ticket.participantId) || !/^[a-f0-9-]{36}$/.test(ticket.sessionId) || !/^[a-f0-9]{64}$/.test(ticket.ipKey) || !Number.isSafeInteger(ticket.expiresAt) || ticket.expiresAt <= now || ticket.expiresAt > now + 60000) throw new VoiceTutorError('Voice link expired.', 403, 'ticket');
  return ticket;
}
export function relayUrl(requestUrl?: string): string {
  let value = process.env.VOICE_TUTOR_RELAY_URL;
  // Vercel supports inbound WebSockets as of October 2026. Prefer the same
  // preview origin; an explicit URL remains available for the standalone relay.
  if (!value && requestUrl) {
    const sameOrigin = new URL('/api/voice-tutor/connect', requestUrl);
    sameOrigin.protocol = sameOrigin.protocol === 'https:' ? 'wss:' : 'ws:';
    value = sameOrigin.toString();
  }
  if (!value) throw new VoiceTutorError('Voice relay is not configured.', 503, 'unavailable');
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || (url.protocol !== 'wss:' && !(process.env.NODE_ENV === 'development' && url.protocol === 'ws:' && ['localhost', '127.0.0.1'].includes(url.hostname)))) throw new VoiceTutorError('Voice relay must use secure WebSockets.', 503, 'unavailable');
  return url.toString();
}
