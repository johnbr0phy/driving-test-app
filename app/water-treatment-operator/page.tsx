import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/water-treatment-operator/dashboard");
}
