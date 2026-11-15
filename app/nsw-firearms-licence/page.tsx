import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nsw-firearms-licence/dashboard");
}
