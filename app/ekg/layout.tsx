export default function CetLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cet" className="flex-1 flex flex-col">{children}</div>;
}
