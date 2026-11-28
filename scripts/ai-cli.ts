/** Local Messages gateway for the existing maintenance CLI. Keys never reach its tools. */
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { getAdminDb } from '@/lib/firebase-admin';
import { AiSession } from '@/lib/server/ai';
import { createAiGateway } from '@/lib/server/aiGateway';


async function main() {
  const [executable, ...args] = process.argv.slice(2);
  if (!executable) throw new Error('Missing CLI executable');
  const cap = Number(args[args.indexOf('--max-budget-usd') + 1]);
  if (!(cap > 0) || !process.env.AI_JOB) throw new Error('AI_JOB and a positive run budget are required');
  const ai = new AiSession(getAdminDb(), process.env.AI_JOB, cap);
  const token = randomBytes(32).toString('hex');
  const server = createAiGateway(ai, token);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Gateway failed to start');
  const env = { ...process.env };
  // Keep API and database credentials in this parent, out of Bash/WebFetch tool environments.
  for (const k of Object.keys(env)) if (/API_KEY|SERVICE_ACCOUNT|OPENAI_|FIREBASE_|CLAUDE_CODE_ENTRYPOINT|CLAUDE_CODE_ACTION|ANTHROPIC_AUTH_TOKEN/.test(k)) delete env[k];
  Object.assign(env, { ANTHROPIC_BASE_URL: `http://127.0.0.1:${address.port}`, ANTHROPIC_API_KEY: token,
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1', DISABLE_TELEMETRY: '1', DISABLE_ERROR_REPORTING: '1' });
  const child = spawn(executable, args, { env, stdio: 'inherit' });
  for (const signal of ['SIGTERM', 'SIGINT'] as const) process.on(signal, () => child.kill(signal));
  const code = await new Promise<number>((resolve, reject) => { child.on('error', reject); child.on('exit', (code) => resolve(code ?? 1)); });
  server.close();
  process.exitCode = code;
}
main().catch((e) => { console.error(e instanceof Error ? e.message : 'AI CLI failed'); process.exitCode = 1; });
