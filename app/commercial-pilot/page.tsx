import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/commercial-pilot/dashboard");
}
