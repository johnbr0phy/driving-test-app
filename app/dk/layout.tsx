// The Denmark homepage is Danish (lib/region.ts REGIONS[].lang). Someone who picked another
// language is served app/home-lang instead (middleware.ts), which this layout does not wrap.
export default function DenmarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="da">{children}</div>;
}
