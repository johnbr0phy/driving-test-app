import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/aws-cloud-practitioner/dashboard");
}
