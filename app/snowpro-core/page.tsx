import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/snowpro-core/dashboard");
}
