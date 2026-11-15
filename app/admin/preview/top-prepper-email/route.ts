import { topPrepperEmail } from "@/lib/email-templates";
import { voiceFor } from "@/lib/email-voice";

// The top prepper email with sample numbers, for the A/B tests tab's preview.
// No account data: the figures are made up for the picture.

export const dynamic = "force-static";

export function GET() {
  const html = topPrepperEmail(voiceFor("dmv"), { answers: 412, pct: 92 });
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
  });
}
