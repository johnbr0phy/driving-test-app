// The Finland homepage is Finnish (lib/region.ts REGIONS[].lang), and so are the Finnish exam
// landings under /fi. Someone who picked another language is served app/home-lang instead
// (middleware.ts), which this layout does not wrap.
export default function FinlandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="fi">{children}</div>;
}
