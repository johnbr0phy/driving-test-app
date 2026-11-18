import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/servicenow-csa/dashboard");
}
