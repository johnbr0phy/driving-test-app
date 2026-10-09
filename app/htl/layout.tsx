export default function HTLLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="htl" className="flex-1 flex flex-col">{children}</div>;
}
