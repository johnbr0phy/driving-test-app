import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/comptia-server-plus/dashboard");
}
