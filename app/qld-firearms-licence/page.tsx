import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/qld-firearms-licence/dashboard");
}
