import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/aws-ai-practitioner/dashboard");
}
