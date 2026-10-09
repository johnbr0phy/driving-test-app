export default function HamLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ham" className="flex-1 flex flex-col">{children}</div>;
}
