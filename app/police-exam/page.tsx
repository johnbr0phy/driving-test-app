import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/police-exam/dashboard");
}
