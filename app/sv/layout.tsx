// Every page under /sv is Swedish: Swedish exam landings.
export default function SwedishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="sv">{children}</div>;
}
