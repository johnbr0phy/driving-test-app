import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cct/dashboard");
}
