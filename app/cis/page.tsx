import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cis/dashboard");
}
