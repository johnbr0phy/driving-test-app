// Every page under /el is Greek: Greek exam landings.
export default function GreekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="el">{children}</div>;
}
