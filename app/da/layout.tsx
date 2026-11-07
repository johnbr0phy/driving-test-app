// Every page under /da is Danish: Danish exam landings.
export default function DanishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="da">{children}</div>;
}
