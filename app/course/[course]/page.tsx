import { permanentRedirect } from "next/navigation";

export default async function RootRedirect({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  permanentRedirect(`/course/${encodeURIComponent(course)}/dashboard`);
}
