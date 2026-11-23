import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/patente-nautica/dashboard");
}
