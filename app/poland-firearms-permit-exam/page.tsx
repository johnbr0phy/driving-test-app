import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/poland-firearms-permit-exam/dashboard");
}
