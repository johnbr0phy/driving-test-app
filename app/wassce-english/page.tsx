import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/wassce-english/dashboard");
}
