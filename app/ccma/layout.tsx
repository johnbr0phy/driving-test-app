export default function CcmaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ccma" className="flex-1 flex flex-col">{children}</div>;
}
