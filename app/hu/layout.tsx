// The Hungary homepage is Hungarian (lib/region.ts REGIONS[].lang), and so are the Hungarian exam
// landings under /hu. Someone who picked another language is served app/home-lang instead
// (middleware.ts), which this layout does not wrap.
export default function HungaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="hu">{children}</div>;
}
