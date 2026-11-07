# Tool Design & MCP Integration (`ccafTools`): official sources read, 6 November 2026

Claude API docs and Anthropic:
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
- https://platform.claude.com/docs/en/managed-agents/secure-deployment-risks
- https://www.anthropic.com/engineering/writing-tools-for-agents
- https://code.claude.com/docs/en/mcp

Model Context Protocol:
- https://modelcontextprotocol.io/docs/learn/architecture
- https://modelcontextprotocol.io/docs/learn/server-concepts
- https://modelcontextprotocol.io/specification/latest/index
- https://modelcontextprotocol.io/specification/latest/server/tools
- https://modelcontextprotocol.io/specification/latest/server/resources
- https://modelcontextprotocol.io/specification/latest/server/prompts
- https://modelcontextprotocol.io/specification/latest/basic/transports
- https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio.md
- https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http.md
- https://modelcontextprotocol.io/specification/latest/basic/authorization
- https://modelcontextprotocol.io/specification/latest/basic/authorization/security-considerations
- https://modelcontextprotocol.io/specification/latest/basic/security_best_practices

## Inferred items
TOL-016 and TOL-017 follow from the docs' guidance on instructive errors. No official page separates permanent from retryable errors or discusses empty results on timeouts.
