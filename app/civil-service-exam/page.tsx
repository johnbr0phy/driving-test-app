import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/civil-service-exam/dashboard");
}
