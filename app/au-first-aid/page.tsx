import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/au-first-aid/dashboard");
}
