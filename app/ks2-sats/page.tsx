import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ks2-sats/dashboard");
}
