import { permanentRedirect } from "next/navigation";

export default async function RootRedirect({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  permanentRedirect(`/life-health-insurance/${encodeURIComponent(state)}/dashboard`);
}
