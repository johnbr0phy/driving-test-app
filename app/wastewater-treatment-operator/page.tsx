import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/wastewater-treatment-operator/dashboard");
}
