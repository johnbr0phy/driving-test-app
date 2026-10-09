export default function AwsLayout({ children }: { children: React.ReactNode }) {
  return <div data-theme="aws" className="flex-1 flex flex-col">{children}</div>;
}
