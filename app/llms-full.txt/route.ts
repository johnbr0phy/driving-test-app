import { renderLlmsFullTxt } from "@/lib/llmsTxt";

// Generated from the catalog and exam data; see lib/llmsTxt.ts.
export const dynamic = "force-static";

export function GET() {
  return new Response(renderLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
