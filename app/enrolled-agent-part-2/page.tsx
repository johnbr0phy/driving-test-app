import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/enrolled-agent-part-2/dashboard");
}
