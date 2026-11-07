import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/vigilante-de-seguridad/dashboard");
}
