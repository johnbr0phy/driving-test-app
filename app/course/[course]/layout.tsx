import type { Metadata } from "next";

// A teacher's course (docs/COURSE_REQUESTS.md): reached only through its class
// link, so never indexed or followed. The theme is the shared course block in
// globals.css ([data-theme^="course-"]).
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: Promise<{ course: string }> }) {
  const { course } = await params;
  return <div data-theme={`course-${course}`} className="flex-1 flex flex-col">{children}</div>;
}
