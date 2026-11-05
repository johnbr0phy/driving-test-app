import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/napolcom-exam/dashboard");
}
