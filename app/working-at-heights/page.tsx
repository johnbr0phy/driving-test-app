import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/working-at-heights/dashboard");
}
