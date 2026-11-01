import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ap-world-history/dashboard");
}
