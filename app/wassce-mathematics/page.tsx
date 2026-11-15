import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/wassce-mathematics/dashboard");
}
