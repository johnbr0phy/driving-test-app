import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cpa-isc/dashboard");
}
