import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/building-regulations/dashboard");
}
