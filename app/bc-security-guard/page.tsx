import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/bc-security-guard/dashboard");
}
