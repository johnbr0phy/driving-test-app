/** Optional standalone relay. Vercel uses app/api/voice-tutor/connect directly.
 * Deploy only after docs/voice-tutor-pilot.md's launch checklist is complete.
 */
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { voicePilotEnabled } from '../../lib/voice-tutor/config';
import { readVoiceTicket } from '../../lib/server/voiceTutorSecurity';
import { serveVoiceRelay } from '../../lib/server/voiceTutorRelay';

const origin = process.env.VOICE_TUTOR_ALLOWED_ORIGIN;
if (!voicePilotEnabled() || !origin) throw new Error('Voice relay is disabled or missing configuration. See docs/voice-tutor-pilot.md.');
const server = createServer((req, res) => { res.writeHead(req.url === '/health' ? 200 : 404, { 'Content-Type': 'text/plain' }); res.end(req.url === '/health' ? 'voice relay\n' : 'not found\n'); });
const wss = new WebSocketServer({ noServer: true, maxPayload: 16384, perMessageDeflate: false });
const sessions = new Set<() => void>();
server.on('upgrade', (req, socket, head) => {
  // Never log URL: its ticket is a short-lived authentication secret.
  try {
    if (req.headers.origin !== origin || !voicePilotEnabled()) throw new Error('origin');
    const url = new URL(req.url || '', 'http://relay');
    if (url.pathname !== '/voice') throw new Error('path');
    const ticket = readVoiceTicket(url.searchParams.get('ticket') || '');
    wss.handleUpgrade(req, socket, head, client => { void serveVoiceRelay(client, ticket, {}, sessions); });
  } catch { socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n'); socket.destroy(); }
});


server.listen(Number(process.env.PORT || 8787), '0.0.0.0');
for (const signal of ['SIGTERM', 'SIGINT'] as const) process.on(signal, () => { server.close(); for (const close of sessions) close(); setTimeout(() => process.exit(0), 7000).unref(); });
