import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/shsat/dashboard");
}
