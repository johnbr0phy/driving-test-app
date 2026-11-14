// Every page under /fr is French: the France homepage and translated and native French exam landings.
export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <div lang="fr">{children}</div>;
}
