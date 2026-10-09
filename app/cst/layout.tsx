export default function CSTLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cst" className="flex-1 flex flex-col">{children}</div>;
}
