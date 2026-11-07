// The Greece homepage is Greek (lib/region.ts REGIONS[].lang). Someone who picked another
// language is served app/home-lang instead (middleware.ts), which this layout does not wrap.
export default function GreeceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="el">{children}</div>;
}
