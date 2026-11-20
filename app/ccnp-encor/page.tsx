import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ccnp-encor/dashboard");
}
