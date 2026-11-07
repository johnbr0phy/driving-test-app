// Every page under /nl is Dutch: Dutch exam landings (Belgium, later the Netherlands).
export default function DutchLayout({ children }: { children: React.ReactNode }) {
  return <div lang="nl">{children}</div>;
}
