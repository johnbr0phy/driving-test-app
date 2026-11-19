import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/title-insurance-agent/dashboard");
}
