import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/nsca-cpt/dashboard");
}
