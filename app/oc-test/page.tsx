import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/oc-test/dashboard");
}
