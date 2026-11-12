// Every page under /it is Italian: the Italy homepage and Italian exam landings.
export default function ItalianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="it">{children}</div>;
}
