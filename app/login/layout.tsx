import type { Metadata } from "next";
import { siteShareMetadata } from "@/lib/examSeo";

// The page is a client component; this only gives a shared link TigerTest's card instead of the DMV one.
export const metadata: Metadata = siteShareMetadata("Log in to TigerTest");

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
