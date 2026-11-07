import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/romania-driver-cpc/dashboard");
}
