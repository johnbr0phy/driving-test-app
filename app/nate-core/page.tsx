import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nate-core/dashboard");
}
