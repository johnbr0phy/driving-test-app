import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/az-104/dashboard");
}
