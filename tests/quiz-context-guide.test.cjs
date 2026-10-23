// Contract tests for the instructions actually exposed over MCP, not a model-compliance eval.
require('tsx/cjs');
const assert=require('node:assert/strict');
const {test}=require('node:test');
const {registerTools}=require('../lib/server/mcp-tools.ts');
const tools=new Map(),prompts=new Map();
registerTools({registerTool:(name,config,handler)=>tools.set(name,{config,handler}),registerPrompt:(name,config,handler)=>prompts.set(name,{config,handler})},{userId:'synthetic-guide-test'});
const promptText=material=>prompts.get('write_quiz').handler({material}).messages[0].content.text;
test('sparse Dave prompt requires factual clarification, not identity guessing or generation',()=>{
 const text=promptText('Make a quiz about my mate Dave.');
 for(const phrase of ['Do not generate yet','Who is playing and what is the occasion?','facts or stories about Dave','do not guess their identity','search for an arbitrary person','instead of generating or calling create_quiz'])assert.ok(text.includes(phrase),phrase);
 assert.ok(text.endsWith('Material:\nMake a quiz about my mate Dave.'));
});
test('rich educational source can proceed without a repeated questionnaire and without padding',()=>{
 const material='Make 10 revision questions for beginner biology students on these cell-organelle notes, focusing on functions. Nucleus: contains genetic material. Ribosome: assembles proteins. Mitochondrion: produces ATP during aerobic respiration.';
 const text=promptText(material);
 for(const phrase of ['Do not force a questionnaire','proceed without repeating questions','only six distinct useful questions','fewer than three','current, authoritative text','Cover the important ideas with a coherent topic plan'])assert.ok(text.includes(phrase),phrase);
 assert.ok(text.endsWith('Material:\n'+material));
});
test('guide tool and both authoring tools carry the context-first contract',async()=>{
 const guide=await tools.get('get_quiz_writing_guide').handler({});assert.match(guide.content[0].text,/Establish enough context/);
 for(const name of ['create_quiz','add_quiz_questions']){
 const description=tools.get(name).config.description;assert.match(description,/audience and level, purpose, scope, reliable source facts/);assert.match(description,/Prefer fewer distinct, supported questions/);
 }
 assert.match(promptText(),/Use the context and sources already in our conversation/);
});
