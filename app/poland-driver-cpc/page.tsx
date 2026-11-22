import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/poland-driver-cpc/dashboard");
}
