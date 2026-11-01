import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/jamb-physics/dashboard");
}
