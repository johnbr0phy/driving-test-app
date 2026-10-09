export default function EmtLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="emt" className="flex-1 flex flex-col">{children}</div>;
}
