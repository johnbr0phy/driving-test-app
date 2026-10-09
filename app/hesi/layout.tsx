export default function HesiLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="hesi" className="flex-1 flex flex-col">{children}</div>;
}
