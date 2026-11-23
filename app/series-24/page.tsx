import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/series-24/dashboard");
}
