import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/rera-broker-exam/dashboard");
}
