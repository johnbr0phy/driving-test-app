import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/zafirearm/dashboard");
}
