// The Sweden homepage is Swedish (lib/region.ts REGIONS[].lang). Someone who picked another
// language is served app/home-lang instead (middleware.ts), which this layout does not wrap.
export default function SwedenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="sv">{children}</div>;
}
