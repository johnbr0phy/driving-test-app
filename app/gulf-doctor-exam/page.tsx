import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/gulf-doctor-exam/dashboard");
}
