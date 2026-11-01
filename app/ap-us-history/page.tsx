import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ap-us-history/dashboard");
}
