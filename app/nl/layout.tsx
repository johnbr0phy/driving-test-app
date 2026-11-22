// Every page under /nl is Dutch: the Netherlands homepage and Dutch exam landings (Belgium and the Netherlands).
export default function DutchLayout({ children }: { children: React.ReactNode }) {
  return <div lang="nl">{children}</div>;
}
