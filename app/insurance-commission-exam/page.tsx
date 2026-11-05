import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/insurance-commission-exam/dashboard");
}
