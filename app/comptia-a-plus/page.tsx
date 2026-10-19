import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/comptia-a-plus/dashboard");
}
