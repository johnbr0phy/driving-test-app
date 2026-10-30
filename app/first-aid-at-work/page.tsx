import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/first-aid-at-work/dashboard");
}
