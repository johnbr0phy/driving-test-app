import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pmdc-nle/dashboard");
}
