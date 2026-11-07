# Sources for ccafPrompt (segment PRM)

Official Anthropic pages read on 2026-11-06. Questions are original wording.

- Prompting best practices (clarity, context, examples, XML tags, roles, long documents, format control, migrating from prefill, chaining): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Prompt engineering overview (prerequisites, when to prompt engineer): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- Prompting Claude Opus 4.8 (literal instruction following, code review harnesses, false positives and recall): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8
- Prompting Claude Sonnet 5.5 (JSON on reasoning tasks, max_tokens handling, reasoning_extraction refusals): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5
- Reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Increase output consistency (prefill note, constrain with examples): https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency
- Define success criteria and build evaluations: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
- Structured outputs (JSON outputs, strict tools, guarantees, invalid outputs, enum casing, schema limitations, compatibility): https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- Strict tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use
- Tool use overview: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- Define tools (tool_choice, forced tool use and its model restrictions): https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
- Batch processing (Message Batches API, custom_id, result types, best practices): https://platform.claude.com/docs/en/build-with-claude/batch-processing

## Items built on reasoning from the docs, not a sentence in them

- CCAF-PRM-026 (required field that allows null): the docs confirm null types and required fields; the design choice is inferred.
- CCAF-PRM-027 ("other" enum value): the docs confirm enums constrain output and that schema compliance is not semantic correctness; the "other" value itself is inferred.
- CCAF-PRM-032 (retry naming the failed check): the docs cover retries, self-correction and semantic correctness; the combined retry design is inferred.

## Review note
The docs guarantee structure only and never promise correct values, so the limit used in PRM-027 and PRM-032 is inferred, not stated.
