import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/tas-firearms-licence/dashboard");
}
