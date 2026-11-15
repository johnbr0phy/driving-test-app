import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/wa-firearms-licence/dashboard");
}
