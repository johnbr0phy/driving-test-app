import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/jamb-chemistry/dashboard");
}
