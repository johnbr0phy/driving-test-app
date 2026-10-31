import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/lto-exam/dashboard");
}
