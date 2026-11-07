// The Romania homepage is Romanian (lib/region.ts REGIONS[].lang), and so are the Romanian exam
// landings under /ro. Someone who picked another language is served app/home-lang instead
// (middleware.ts), which this layout does not wrap.
export default function RomaniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="ro">{children}</div>;
}
