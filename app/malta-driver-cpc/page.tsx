import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/malta-driver-cpc/dashboard");
}
