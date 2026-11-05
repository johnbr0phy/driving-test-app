import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/spsv-entry-test/dashboard");
}
