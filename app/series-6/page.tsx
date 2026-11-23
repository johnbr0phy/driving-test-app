import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/series-6/dashboard");
}
