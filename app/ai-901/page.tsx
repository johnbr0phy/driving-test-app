import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ai-901/dashboard");
}
