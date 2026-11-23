import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/gulf-pharmacist-exam/dashboard");
}
