// Every page under /pl is Polish: the Poland homepage and Polish exam landings.
export default function PolishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="pl">{children}</div>;
}
