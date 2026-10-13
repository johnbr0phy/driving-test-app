import type { Metadata } from "next";
import { siteShareMetadata } from "@/lib/examSeo";

// The page is a client component; this only gives a shared link TigerTest's card instead of the DMV one.
export const metadata: Metadata = siteShareMetadata("Sign up for TigerTest: free practice tests");

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
