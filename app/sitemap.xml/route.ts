import { renderIndex } from "@/lib/sitemaps";

// Sitemap index. The per-family sitemaps live under /sitemaps/<segment>.xml.
export const dynamic = "force-static";

export function GET() {
  return new Response(renderIndex(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
