import type { Metadata } from "next";
import { SharedExamAppLayout, sharedExamAppMetadata } from "@/components/exam/SharedExamAppLayout";

// Shared by every v1 and v2 exam (lib/examAppRoute.ts).
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return sharedExamAppMetadata(params);
}

export default function Layout({ params, children }: { params: Promise<{ slug: string }>; children: React.ReactNode }) {
  return <SharedExamAppLayout params={params}>{children}</SharedExamAppLayout>;
}
