import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { V2Shell } from "@/components/v2/V2Shell";
import { examAppMetadata, examV2AppMetadata } from "@/lib/examSeo";
import { examForAppSlug } from "@/lib/examAppRoute";

// Layout of the shared app/[slug]/test and app/[slug]/practice routes: the
// same wrapper and metadata each exam's own app/<slug>/layout.tsx gives its
// other pages (a data-theme div for v1, V2Shell for v2; noindex either way).

export async function sharedExamAppMetadata(params: Promise<{ slug: string }>): Promise<Metadata> {
  const route = examForAppSlug((await params).slug);
  if (!route) return { robots: { index: false, follow: true } };
  return route.kind === "v1" ? examAppMetadata(route.exam.id) : examV2AppMetadata(route.exam);
}

export async function SharedExamAppLayout({ params, children }: { params: Promise<{ slug: string }>; children: React.ReactNode }) {
  const route = examForAppSlug((await params).slug);
  if (!route) notFound();
  if (route.kind === "v2") return <V2Shell theme={route.exam.theme}>{children}</V2Shell>;
  return <div data-theme={route.exam.id} className="flex-1 flex flex-col">{children}</div>;
}
