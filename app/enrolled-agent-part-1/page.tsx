import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/enrolled-agent-part-1/dashboard");
}
