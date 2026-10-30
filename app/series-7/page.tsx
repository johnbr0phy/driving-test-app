import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/series-7/dashboard");
}
