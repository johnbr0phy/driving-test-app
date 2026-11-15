import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/fortinet-fcf/dashboard");
}
