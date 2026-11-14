import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/code-de-la-route/dashboard");
}
