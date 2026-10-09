export default function CnaLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="cna" className="flex-1 flex flex-col">{children}</div>;
}
