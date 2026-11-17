import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/isc2-sscp/dashboard");
}
