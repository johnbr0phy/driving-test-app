import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cemap-2/dashboard");
}
