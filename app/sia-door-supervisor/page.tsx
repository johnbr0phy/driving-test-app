import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/sia-door-supervisor/dashboard");
}
