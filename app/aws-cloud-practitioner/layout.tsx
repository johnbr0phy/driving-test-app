import type { Metadata } from "next";
import { V2Shell } from "@/components/v2/V2Shell";
import { examV2AppMetadata } from "@/lib/examSeo";
import { AWS } from "@/lib/v2/exams/aws";

export const metadata: Metadata = examV2AppMetadata(AWS);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <V2Shell theme={AWS.theme}>{children}</V2Shell>;
}
