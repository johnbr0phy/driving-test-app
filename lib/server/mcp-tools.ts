import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export interface ToolContext {
  userId: string;
}

type ToolEntry = {
  name: string;
  description: string;
  register: (server: McpServer, ctx: ToolContext) => void;
};

const tools: ToolEntry[] = [
  {
    name: 'ping',
    description:
      'Health check. Returns the authenticated user\'s UID and a timestamp. Use to verify the MCP connection works.',
    register(server, ctx) {
      server.registerTool(
        'ping',
        {
          description: this.description,
          inputSchema: {},
        },
        async () => ({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                ok: true,
                userId: ctx.userId,
                timestamp: new Date().toISOString(),
              }),
            },
          ],
        }),
      );
    },
  },
];

export function registerTools(server: McpServer, ctx: ToolContext): void {
  for (const tool of tools) {
    tool.register(server, ctx);
  }
}
