import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/private-pilot/dashboard");
}
