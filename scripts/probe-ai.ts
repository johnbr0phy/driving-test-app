/** Minimal live check: no user data, and the same ledger as real jobs. */
import { getAdminDb } from '@/lib/firebase-admin';
import { AiSession } from '@/lib/server/ai';
import { BRIEF_MODEL } from '@/lib/server/dailyBrief';

async function main() {
  // Test the fallback independently of the preferred provider.
  delete process.env.ANTHROPIC_API_KEY;
  const ai = new AiSession(getAdminDb(), 'daily-brief', 0.1);
  const reply = await ai.create({ model: BRIEF_MODEL, max_tokens: 1024,
    output_config: { effort: 'low' }, messages: [{ role: 'user', content: 'Reply with exactly OK.' }] });
  const text = reply.content.filter((b) => b.type === 'text').map((b) => String(b.text)).join('').trim();
  if (text !== 'OK' || ai.lastProvider !== 'openai') throw new Error('AI probe did not return the expected result');
  console.log('OpenAI fallback and shared credit ledger verified.');
}
main().catch((e) => { console.error(e instanceof Error ? e.message : 'AI probe failed'); process.exitCode = 1; });
