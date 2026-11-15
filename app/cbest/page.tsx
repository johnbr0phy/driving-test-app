import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cbest/dashboard");
}
