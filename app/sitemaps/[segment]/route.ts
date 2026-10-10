import { buildSegment, isSitemapSegment, renderUrlset } from "@/lib/sitemaps";

// One sitemap per page family (see lib/sitemaps.ts). Re-rendered hourly so
// new school pages show up without a deploy.
export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segment: string }> }
) {
  const { segment: raw } = await params;
  const segment = raw.replace(/\.xml$/, "");
  if (!isSitemapSegment(segment)) return new Response("Not found", { status: 404 });

  return new Response(renderUrlset(await buildSegment(segment)), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
