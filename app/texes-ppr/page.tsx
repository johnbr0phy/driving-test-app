import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/texes-ppr/dashboard");
}
