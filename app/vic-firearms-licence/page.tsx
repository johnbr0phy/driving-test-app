import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/vic-firearms-licence/dashboard");
}
