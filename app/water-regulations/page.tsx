import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/water-regulations/dashboard");
}
