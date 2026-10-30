import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/standard-first-aid/dashboard");
}
