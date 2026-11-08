require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { realtimeCost } = require('../lib/server/voiceTutorUsage.ts');
const { realtimeSession, validRealtimeSession, AudioRateGuard } = require('../lib/server/voiceTutorRealtime.ts');
const { voicePilotEnabled, VOICE_TURN_RESERVE_MICROUSD, VOICE_SESSION_RESERVE_MICROUSD } = require('../lib/voice-tutor/config.ts');
const { makeVoiceTicket, readVoiceTicket } = require('../lib/server/voiceTutorSecurity.ts');
function usage() { return { input_tokens: 300, output_tokens: 100, total_tokens: 400, input_token_details: { text_tokens: 100, audio_tokens: 200, cached_tokens: 100, cached_tokens_details: { text_tokens: 40, audio_tokens: 60 } }, output_token_details: { text_tokens: 20, audio_tokens: 80 } }; }
test('actual realtime billing subtracts cache subsets and includes both modalities', () => {
  const result = realtimeCost(usage());
  assert.equal(result.microusd, Math.ceil(60*4+40*.4+140*32+60*.4+20*24+80*64));
  assert.equal(result.usage.totalTokens, 400);
});
test('unknown, negative, mismatched, image and over-limit usage fail closed', () => {
  for (const modify of [u=>{delete u.input_token_details.audio_tokens}, u=>{u.input_token_details.cached_tokens=-1},u=>{u.output_tokens=1025},u=>{u.total_tokens=401},u=>{u.input_token_details.text_tokens=99},u=>{u.output_token_details.audio_tokens=79}]) {
    const u=usage(); modify(u); assert.throws(()=>realtimeCost(u));
  }
  assert.throws(()=>realtimeCost(null));
});
test('ceiling uses documented context/input/output caps, not speech duration estimates', () => {
  assert.equal(VOICE_TURN_RESERVE_MICROUSD, 128000*4+16000*32+1024*64);
  assert.equal(VOICE_SESSION_RESERVE_MICROUSD, VOICE_TURN_RESERVE_MICROUSD*10);
});
test('provider acknowledgment must preserve all control premises', () => {
  const s=realtimeSession('verified canonical context'); assert.equal(validRealtimeSession(s),true);
  for (const change of [s=>s.max_output_tokens='inf',s=>s.audio.input.turn_detection.create_response=true,s=>s.audio.input.transcription={model:'x'},s=>s.audio.input.turn_detection.idle_timeout_ms=6000,s=>s.truncation.token_limits.post_instructions=32000,s=>s.tools=[{name:'browse'}],s=>s.model='other-model']) {
    const bad=structuredClone(s);change(bad);assert.equal(validRealtimeSession(bad),false);
  }
});
test('browser audio cannot exceed PCM framing, live rate or total session limits', () => {
  const g=new AudioRateGuard(1000);assert.equal(g.accept(4096,1000),true);assert.equal(g.accept(1,1001),false);assert.equal(g.accept(16386,1001),false);
  const flood=new AudioRateGuard(1000);for(let i=0;i<5;i++)assert.equal(flood.accept(16384,1000),true);assert.equal(flood.accept(16384,1000),false);
});
test('pilot stays disabled without separate server switch, credentials and verified rules', () => {
  assert.equal(voicePilotEnabled({NEXT_PUBLIC_VOICE_TUTOR_PILOT:'true'}),false);
  const env={VOICE_TUTOR_PILOT:'true',OPENAI_API_KEY:'test-only',VOICE_TUTOR_COOKIE_SECRET:'x'.repeat(32),VOICE_TUTOR_RELAY_URL:'wss://example.invalid/voice',VOICE_TUTOR_LEDGER_RULES_VERIFIED:'true'};
  assert.equal(voicePilotEnabled(env),true);delete env.VOICE_TUTOR_LEDGER_RULES_VERIFIED;assert.equal(voicePilotEnabled(env),false);
});
test('relay tickets are authenticated, short lived and purpose specific', () => {
  process.env.VOICE_TUTOR_COOKIE_SECRET='unit-test-only-not-a-real-secret-123456789';
  const payload={participantId:'11111111-1111-1111-1111-111111111111',sessionId:'22222222-2222-2222-2222-222222222222',ipKey:'a'.repeat(64),expiresAt:Date.now()+30000};
  const token=makeVoiceTicket(payload);assert.deepEqual(readVoiceTicket(token),payload);
  assert.throws(()=>readVoiceTicket(token.slice(0,-1)+(token.endsWith('a')?'b':'a')));
  assert.throws(()=>readVoiceTicket(token,payload.expiresAt));assert.throws(()=>readVoiceTicket(token,Date.now()-120000));
});
test('canonical question grounding remaps shown letters, rejects tampering and diagrams', () => {
  const {loadVoiceQuestion,voiceQuestionKey,voiceInstructions}=require('../lib/server/voiceTutorQuestion.ts');
  const questions=require('../data/questions.json');const q=questions.find(q=>q.questionId==='U-001');
  const key=voiceQuestionKey({examId:'dmv',questionId:'U-001',optionOrder:'DCBA'});
  const lesson=loadVoiceQuestion(key,q.question);assert.equal(lesson.correctAnswer,'ABCD'['DCBA'.indexOf(q.correctAnswer)]);
  assert.ok(voiceInstructions(lesson).includes(q.explanation));assert.throws(()=>loadVoiceQuestion(key,'forged question'));
  assert.throws(()=>voiceQuestionKey({examId:'dmv',questionId:'U-001',optionOrder:'AAAA'}));
  assert.throws(()=>loadVoiceQuestion({...key,questionId:'U-002'}));
});
