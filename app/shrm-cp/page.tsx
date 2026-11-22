import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/shrm-cp/dashboard");
}
