import { getAdminAuth } from "@/lib/firebase-admin";
import { isInternalEmail } from "@/lib/internal";

// Uids of internal accounts (lib/internal), from one paged Auth listing.
// Cached briefly: the admin APIs call this on every cache miss.
const TTL_MS = 10 * 60_000;
let cached: { uids: Set<string>; at: number } | null = null;

export async function getInternalUids(): Promise<Set<string>> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.uids;
  const uids = new Set<string>();
  let pageToken: string | undefined;
  do {
    const page = await getAdminAuth().listUsers(1000, pageToken);
    for (const u of page.users) if (isInternalEmail(u.email)) uids.add(u.uid);
    pageToken = page.pageToken;
  } while (pageToken);
  cached = { uids, at: Date.now() };
  return uids;
}
