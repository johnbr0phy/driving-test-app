import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/poland-lek-medical-exam/dashboard");
}
