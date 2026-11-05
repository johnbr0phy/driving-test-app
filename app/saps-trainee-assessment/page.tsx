import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/saps-trainee-assessment/dashboard");
}
