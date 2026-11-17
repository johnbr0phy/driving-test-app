import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/alberta-security-guard/dashboard");
}
