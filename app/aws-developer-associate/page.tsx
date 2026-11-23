import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/aws-developer-associate/dashboard");
}
