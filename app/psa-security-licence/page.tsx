import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/psa-security-licence/dashboard");
}
